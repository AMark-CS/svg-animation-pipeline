/**
 * FFmpeg Encoder - Encode frame sequences to GIF/video
 */

import * as path from 'path';
import * as fs from 'fs';
import ffmpeg from 'fluent-ffmpeg';
import ffmpegPath from '@ffmpeg-installer/ffmpeg';
import { OutputFormat, EncodeOptions, GIFOptions, VideoOptions } from '../types';

// Set ffmpeg path
ffmpeg.setFfmpegPath(ffmpegPath.path);

export interface EncoderResult {
  output: string;
  format: OutputFormat;
  success: boolean;
  duration: number;
}

/**
 * FFmpeg-based video encoder
 */
export class FFmpegEncoder {
  private tempDir: string;
  private outputDir: string;

  constructor(tempDir?: string, outputDir?: string) {
    this.tempDir = tempDir || path.join(process.cwd(), '.svg-anim-temp');
    this.outputDir = outputDir || process.cwd();
  }

  /**
   * Encode frame sequence to GIF with palette optimization
   */
  async encodeGIF(
    framePaths: string[],
    outputPath: string,
    fps: number = 30,
    options?: Partial<GIFOptions>
  ): Promise<EncoderResult> {
    if (framePaths.length === 0) {
      throw new Error('No frames to encode');
    }

    const startTime = Date.now();
    const finalOutput = path.isAbsolute(outputPath)
      ? outputPath
      : path.join(this.outputDir, outputPath);

    // GIF with palette generation (two-pass for better quality)
    if (options?.palette !== false) {
      await this.encodeGIFWithPalette(framePaths, finalOutput, fps, options?.colors);
    } else {
      await this.encodeGIFSimple(framePaths, finalOutput, fps);
    }

    const duration = (Date.now() - startTime) / 1000;

    return {
      output: finalOutput,
      format: 'gif',
      success: true,
      duration,
    };
  }

  /**
   * Encode GIF with palette generation (high quality)
   */
  private async encodeGIFWithPalette(
    framePaths: string[],
    outputPath: string,
    fps: number,
    colors: number = 256
  ): Promise<void> {
    const palettePath = path.join(this.tempDir, 'palette.png');

    // Step 1: Generate palette
    await this.runCommand(
      (cmd) =>
        cmd
          .input(path.join(this.tempDir, 'frame%05d.png'))
          .inputFPS(fps)
          .outputOptions([`-vf`, `palettegen=max_colors=${colors}`])
          .output(palettePath)
    );

    // Step 2: Encode GIF using palette
    await this.runCommand(
      (cmd) =>
        cmd
          .input(path.join(this.tempDir, 'frame%05d.png'))
          .inputFPS(fps)
          .input(palettePath)
          .outputOptions([`-filter_complex`, '[0:v][1:v]paletteuse=dither=bayer:bayer_scale=5'])
          .output(outputPath)
    );

    // Clean up palette
    if (fs.existsSync(palettePath)) {
      await fs.promises.unlink(palettePath);
    }
  }

  /**
   * Encode GIF without palette (simple, lower quality)
   */
  private async encodeGIFSimple(
    framePaths: string[],
    outputPath: string,
    fps: number
  ): Promise<void> {
    // First, ensure frames are in correct format with padding
    const framePattern = path.join(this.tempDir, 'frame%05d.png');

    await this.runCommand(
      (cmd) =>
        cmd
          .input(framePattern)
          .inputFPS(fps)
          .output(outputPath)
    );
  }

  /**
   * Encode frame sequence to MP4 video
   */
  async encodeMP4(
    framePaths: string[],
    outputPath: string,
    fps: number = 30,
    options?: Partial<VideoOptions>
  ): Promise<EncoderResult> {
    if (framePaths.length === 0) {
      throw new Error('No frames to encode');
    }

    const startTime = Date.now();
    const finalOutput = path.isAbsolute(outputPath)
      ? outputPath
      : path.join(this.outputDir, outputPath);

    const codec = options?.codec || 'libx264';
    const bitrate = options?.bitrate || '8M';

    await this.runCommand(
      (cmd) =>
        cmd
          .input(path.join(this.tempDir, 'frame%05d.png'))
          .inputFPS(fps)
          .outputOptions([
            `-c:v ${codec}`,
            `-b:v ${bitrate}`,
            '-pix_fmt yuv420p',
          ])
          .output(finalOutput)
    );

    const duration = (Date.now() - startTime) / 1000;

    return {
      output: finalOutput,
      format: 'mp4',
      success: true,
      duration,
    };
  }

  /**
   * Encode frame sequence to WebM video
   */
  async encodeWebM(
    framePaths: string[],
    outputPath: string,
    fps: number = 30,
    options?: Partial<VideoOptions>
  ): Promise<EncoderResult> {
    if (framePaths.length === 0) {
      throw new Error('No frames to encode');
    }

    const startTime = Date.now();
    const finalOutput = path.isAbsolute(outputPath)
      ? outputPath
      : path.join(this.outputDir, outputPath);

    const bitrate = options?.bitrate || '4M';

    await this.runCommand(
      (cmd) =>
        cmd
          .input(path.join(this.tempDir, 'frame%05d.png'))
          .inputFPS(fps)
          .outputOptions([
            '-c:v libvpx-vp9',
            `-b:v ${bitrate}`,
            '-pix_fmt yuv420p',
          ])
          .output(finalOutput)
    );

    const duration = (Date.now() - startTime) / 1000;

    return {
      output: finalOutput,
      format: 'webm',
      success: true,
      duration,
    };
  }

  /**
   * Encode with format auto-detection from extension
   */
  async encode(
    framePaths: string[],
    outputPath: string,
    fps: number = 30,
    options?: Partial<EncodeOptions>
  ): Promise<EncoderResult> {
    const ext = path.extname(outputPath).toLowerCase();

    switch (ext) {
      case '.gif':
        return this.encodeGIF(framePaths, outputPath, fps, options as Partial<GIFOptions>);
      case '.mp4':
        return this.encodeMP4(framePaths, outputPath, fps, options as Partial<VideoOptions>);
      case '.webm':
        return this.encodeWebM(framePaths, outputPath, fps, options as Partial<VideoOptions>);
      default:
        throw new Error(`Unsupported output format: ${ext}`);
    }
  }

  /**
   * Run ffmpeg command with promise wrapper
   */
  private runCommand(
    setup: (cmd: ffmpeg.FfmpegCommand) => ffmpeg.FfmpegCommand
  ): Promise<void> {
    return new Promise((resolve, reject) => {
      const cmd = setup(ffmpeg());
      cmd.on('end', () => resolve());
      cmd.on('error', (err, stdout, stderr) => {
        console.error('FFmpeg stdout:', stdout);
        console.error('FFmpeg stderr:', stderr);
        reject(err);
      });
      cmd.run();
    });
  }

  /**
   * Get video info (duration, resolution, etc.)
   */
  async getVideoInfo(videoPath: string): Promise<{
    duration: number;
    width: number;
    height: number;
    fps: number;
  } | null> {
    return new Promise((resolve) => {
      ffmpeg.ffprobe(videoPath, (err, metadata) => {
        if (err || !metadata) {
          resolve(null);
          return;
        }

        const videoStream = metadata.streams.find((s) => s.codec_type === 'video');
        if (!videoStream) {
          resolve(null);
          return;
        }

        resolve({
          duration: metadata.format.duration || 0,
          width: videoStream.width || 0,
          height: videoStream.height || 0,
          fps: videoStream.r_frame_rate
            ? eval(videoStream.r_frame_rate as unknown as string)
            : 0,
        });
      });
    });
  }

  /**
   * Clean up temporary files (keep final output)
   */
  async cleanupTempFiles(keepFrames: boolean = false): Promise<void> {
    if (keepFrames) return;

    if (fs.existsSync(this.tempDir)) {
      const files = await fs.promises.readdir(this.tempDir);
      await Promise.all(
        files.map(async (file) => {
          const filepath = path.join(this.tempDir, file);
          await fs.promises.unlink(filepath);
        })
      );
    }
  }
}

/**
 * Create encoder instance
 */
export function createEncoder(tempDir?: string, outputDir?: string): FFmpegEncoder {
  return new FFmpegEncoder(tempDir, outputDir);
}
