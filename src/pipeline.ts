/**
 * SVG Animation Pipeline - Main orchestrator
 */

import * as path from 'path';
import * as fs from 'fs';
import {
  PipelineConfig,
  PipelineOptions,
  PipelineEvents,
  ProgressInfo,
  AnimationConfig,
  RenderResult,
  FrameData,
} from './types';
import { SVGAnimator, ElementState } from './animator/svg-animator';
import { PuppeteerRenderer } from './renderer/puppeteer-renderer';
import { FFmpegEncoder } from './encoder/ffmpeg-encoder';
import { loadSVG, parseSVG } from './loader/svg-loader';
import { prepareForAnimation } from './validator/svg-validator';

export interface PipelineConfigInput {
  input: string;
  output: string;
  fps: number;
  duration: number;
  width: number;
  height: number;
  background?: string;
  quality?: 'low' | 'medium' | 'high';
}

/**
 * Main SVG Animation Pipeline
 */
export class SVGAnimationPipeline {
  private config: PipelineOptions;
  private animations: AnimationConfig[] = [];
  private events: PipelineEvents = {};
  private animator: SVGAnimator;
  private renderer: PuppeteerRenderer;
  private encoder: FFmpegEncoder;
  private svgContent: string = '';
  private cssStyles: string = '';
  private tempDir: string;
  private framePaths: string[] = [];

  constructor(config: PipelineConfigInput, events?: PipelineEvents) {
    this.config = {
      ...config,
      input: path.resolve(config.input),
      output: path.resolve(config.output),
      background: config.background || '#ffffff',
      quality: config.quality || 'medium',
      tempDir: path.join(process.cwd(), '.svg-anim-temp'),
      keepFrames: false,
    };

    this.events = events || {};
    this.tempDir = this.config.tempDir ?? path.join(process.cwd(), '.svg-anim-temp');

    // Initialize components
    this.animator = new SVGAnimator();
    this.renderer = new PuppeteerRenderer({
      render: {
        width: this.config.width,
        height: this.config.height,
        background: this.config.background,
        quality: this.config.quality,
      },
    });
    this.encoder = new FFmpegEncoder(this.tempDir, path.dirname(this.config.output));
  }

  /**
   * Add an animation configuration
   */
  addAnimation(config: AnimationConfig): this {
    this.animations.push(config);
    return this;
  }

  /**
   * Add multiple animations at once
   */
  addAnimations(configs: AnimationConfig[]): this {
    this.animations.push(...configs);
    return this;
  }

  /**
   * Set CSS styles to inject
   */
  setStyles(css: string): this {
    this.cssStyles = css;
    return this;
  }

  /**
   * Set custom event handlers
   */
  on(event: 'progress' | 'error' | 'frame', handler: PipelineEvents['progress'] | PipelineEvents['error'] | PipelineEvents['frame']): this {
    if (event === 'progress') this.events.progress = handler as PipelineEvents['progress'];
    if (event === 'error') this.events.error = handler as PipelineEvents['error'];
    if (event === 'frame') this.events.frame = handler as PipelineEvents['frame'];
    return this;
  }

  /**
   * Run the complete pipeline
   */
  async render(): Promise<RenderResult> {
    const startTime = Date.now();

    try {
      // Phase 1: Load and validate SVG
      this.reportProgress('loading', 0, 0, 0, 'Loading SVG...');
      await this.loadPhase();

      // Phase 2: Render frames
      this.reportProgress('rendering', 0, 0, 0, 'Rendering frames...');
      await this.renderPhase();

      // Phase 3: Encode output
      this.reportProgress('encoding', 0, 0, 0, 'Encoding output...');
      await this.encodePhase();

      // Cleanup
      if (!this.config.keepFrames) {
        await this.encoder.cleanupTempFiles();
      }

      const result: RenderResult = {
        output: this.config.output,
        frames: this.framePaths.length,
        duration: (Date.now() - startTime) / 1000,
        fps: this.config.fps,
      };

      this.reportProgress('encoding', 100, this.framePaths.length, this.framePaths.length, 'Complete!');

      return result;
    } catch (error) {
      this.events.error?.(error as Error);
      throw error;
    } finally {
      await this.close();
    }
  }

  /**
   * Phase 1: Load and prepare SVG
   */
  private async loadPhase(): Promise<void> {
    // Load SVG file
    if (fs.existsSync(this.config.input)) {
      const svg = await loadSVG(this.config.input);
      this.svgContent = prepareForAnimation(svg.raw, this.animations.map((a) => ({
        targets: Array.isArray(a.targets) ? a.targets[0] : a.targets,
        properties: Object.keys(a.keyframes[0]?.properties || {}),
      })));
    } else {
      // Treat input as SVG content
      this.svgContent = prepareForAnimation(this.config.input, []);
    }

    // Add animations to animator
    for (const anim of this.animations) {
      this.animator.addAnimation(anim);
    }

    // Initialize renderer
    await this.renderer.initialize();
    await this.renderer.loadSVG(this.svgContent, this.cssStyles);

    this.reportProgress('loading', 25, 0, 0, 'SVG loaded and validated');
  }

  /**
   * Phase 2: Render all frames
   */
  private async renderPhase(): Promise<void> {
    const totalFrames = Math.ceil((this.config.fps * this.config.duration) / 1000);
    const interval = 1000 / this.config.fps;

    this.framePaths = [];

    for (let i = 0; i < totalFrames; i++) {
      const time = i * interval;

      // Compute animation state at this time
      const states = this.animator.computeState(time);
      const stateScript = this.animator.generateApplyScript(states);

      // Render frame
      const frame = await this.renderer.renderFrame(time, stateScript);

      // Save frame to temp directory
      const framePath = await this.renderer.saveFrame(frame, `frame${String(i).padStart(5, '0')}.png`);
      this.framePaths.push(framePath);

      // Report progress
      const percent = Math.round(((i + 1) / totalFrames) * 100);
      this.reportProgress('rendering', percent, i + 1, totalFrames, `Rendering frame ${i + 1}/${totalFrames}`);

      this.events.frame?.(frame);
    }
  }

  /**
   * Phase 3: Encode to output format
   */
  private async encodePhase(): Promise<void> {
    const ext = path.extname(this.config.output).toLowerCase();

    switch (ext) {
      case '.gif':
        await this.encoder.encodeGIF(this.framePaths, this.config.output, this.config.fps);
        break;
      case '.mp4':
        await this.encoder.encodeMP4(this.framePaths, this.config.output, this.config.fps);
        break;
      case '.webm':
        await this.encoder.encodeWebM(this.framePaths, this.config.output, this.config.fps);
        break;
      default:
        throw new Error(`Unsupported output format: ${ext}`);
    }

    this.reportProgress('encoding', 100, this.framePaths.length, this.framePaths.length, 'Encoding complete');
  }

  /**
   * Report progress to event handlers
   */
  private reportProgress(
    phase: ProgressInfo['phase'],
    percent: number,
    currentFrame: number,
    totalFrames: number,
    message?: string
  ): void {
    this.events.progress?.({
      phase,
      percent,
      currentFrame,
      totalFrames,
      message,
    });
  }

  /**
   * Close all resources
   */
  async close(): Promise<void> {
    await this.renderer.close();
  }

  /**
   * Get animation duration
   */
  getDuration(): number {
    return this.config.duration;
  }

  /**
   * Get configured FPS
   */
  getFPS(): number {
    return this.config.fps;
  }
}

/**
 * Create a new pipeline instance
 */
export function createPipeline(
  config: PipelineConfigInput,
  events?: PipelineEvents
): SVGAnimationPipeline {
  return new SVGAnimationPipeline(config, events);
}

/**
 * Convenience method to render SVG animation with minimal configuration
 */
export async function renderSVGAnimation(
  svgInput: string,
  outputPath: string,
  fps: number,
  duration: number,
  animations: AnimationConfig[],
  options?: {
    width?: number;
    height?: number;
    background?: string;
    quality?: 'low' | 'medium' | 'high';
  }
): Promise<RenderResult> {
  // Get SVG dimensions if not specified
  let width = options?.width || 800;
  let height = options?.height || 600;

  if (fs.existsSync(svgInput)) {
    const svg = await loadSVG(svgInput);
    width = options?.width || svg.width;
    height = options?.height || svg.height;
  }

  const pipeline = new SVGAnimationPipeline({
    input: svgInput,
    output: outputPath,
    fps,
    duration,
    width,
    height,
    background: options?.background,
    quality: options?.quality,
  });

  pipeline.addAnimations(animations);

  return pipeline.render();
}
