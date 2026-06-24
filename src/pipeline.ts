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
  ParsedSVG,
  SVGLayer,
} from './types';
import { SVGAnimator, ElementState } from './animator/svg-animator';
import { PuppeteerRenderer } from './renderer/puppeteer-renderer';
import { FFmpegEncoder } from './encoder/ffmpeg-encoder';
import { loadSVG, parseSVG } from './loader/svg-loader';
import { prepareForAnimation } from './validator/svg-validator';
import { LLMOrchestrator, LLMProviderConfig } from './llm';
import { DiagramStyle } from './llm/types';

export interface PipelineConfigInput {
  input: string;
  output: string;
  fps: number;
  duration: number;
  width: number;
  height: number;
  background?: string;
  quality?: 'low' | 'medium' | 'high';
  /** Preserve native SVG animations (CSS @keyframes + SMIL) for SVG-native animation workflows */
  preserveNativeAnimations?: boolean;
}

export interface LLMRenderRequest {
  description: string;
  style?: DiagramStyle;
  llmConfig: LLMProviderConfig;
  outputConfig?: Partial<PipelineConfigInput>;
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
  private parsedSvg: ParsedSVG | null = null;
  private initCacheScript: string = '';

  constructor(config: PipelineConfigInput, events?: PipelineEvents) {
    // Only resolve to absolute path if input looks like a file path
    // (doesn't start with '<' which indicates inline SVG content)
    const isInlineSVG = config.input.trimStart().startsWith('<');

    this.config = {
      ...config,
      input: isInlineSVG ? config.input : path.resolve(config.input),
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
   *
   * Phase 1: 分层 — Load SVG, parse layers, validate
   * Phase 2: 动画 — Set up animator, build cache, configure
   * Phase 3: 渲逐帧渲染 — Compute per-frame state, render via Puppeteer
   * Phase 4: 合成 — FFmpeg encode to GIF/MP4/WebM
   */
  async render(): Promise<RenderResult> {
    const startTime = Date.now();

    try {
      // Phase 1: 分层 — Load SVG, parse layer structure
      this.reportProgress('loading', 0, 0, 0, 'Parsing SVG layers...');
      await this.parseLayersPhase();

      // Phase 2: 动画 — Set up animator and renderer cache
      this.reportProgress('animating', 0, 0, 0, 'Setting up animations...');
      await this.setupAnimationPhase();

      // Phase 3: 渲逐帧渲染 — Render each frame
      this.reportProgress('rendering', 0, 0, 0, 'Rendering frames...');
      await this.renderPhase();

      // Phase 4: 合成 — Encode output via FFmpeg
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
   * Phase 1: 分层 — Load SVG, parse layers, validate
   */
  private async parseLayersPhase(): Promise<void> {
    // Load SVG file or content
    if (fs.existsSync(this.config.input)) {
      const svg = await loadSVG(this.config.input);
      this.parsedSvg = svg;
      const preserveNative = this.config.preserveNativeAnimations ?? !fs.existsSync(this.config.input);
      this.svgContent = prepareForAnimation(svg.raw, this.animations.map((a) => ({
        targets: Array.isArray(a.targets) ? a.targets[0] : a.targets,
        properties: Object.keys(a.keyframes[0]?.properties || {}),
      })), preserveNative);
    } else {
      // Treat input as SVG content
      const svg = parseSVG(this.config.input);
      this.parsedSvg = svg;
      const preserveNative = this.config.preserveNativeAnimations ?? true;
      this.svgContent = prepareForAnimation(this.config.input, [], preserveNative);
    }

    this.reportProgress('loading', 50, 0, 0, `SVG parsed: ${this.parsedSvg.layers.length} layers found`);
  }

  /**
   * Phase 2: 动画 — Set up animations, initialize renderer, cache DOM elements
   */
  private async setupAnimationPhase(): Promise<void> {
    // Register all animations with the animator
    for (const anim of this.animations) {
      this.animator.addAnimation(anim);
    }

    // Initialize renderer and load SVG
    await this.renderer.initialize();
    await this.renderer.loadSVG(this.svgContent, this.cssStyles);

    // Build element cache script for optimized per-frame rendering
    this.initCacheScript = this.animator.generateInitCacheScript();
    if (this.initCacheScript) {
      await this.renderer.initCache(this.initCacheScript);
    }

    const animatedSelectors = this.animator.getAnimatedSelectors();
    this.reportProgress('animating', 50, 0, 0, `Animation setup: ${animatedSelectors.length} selectors cached`);
  }

  /**
   * Phase 3: 渲逐帧渲染 — Compute per-frame state, render via Puppeteer
   */
  private async renderPhase(): Promise<void> {
    const totalFrames = Math.ceil((this.config.fps * this.config.duration) / 1000);
    const interval = 1000 / this.config.fps;

    this.framePaths = [];

    for (let i = 0; i < totalFrames; i++) {
      const time = i * interval;

      // Compute animation state at this time
      const states = this.animator.computeState(time);
      const stateScript = this.animator.generateOptimizedApplyScript(states);

      // Render frame using optimized cache
      const frame = await this.renderer.renderFrameOptimized(time, stateScript);

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
   * Get parsed SVG layers (available after parseLayersPhase)
   */
  getLayers(): SVGLayer[] {
    return this.parsedSvg?.layers || [];
  }

  /**
   * Get parsed SVG metadata (available after parseLayersPhase)
   */
  getParsedSVG(): ParsedSVG | null {
    return this.parsedSvg;
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

  /**
   * Generate and render diagram from natural language description using LLM
   *
   * This is a convenience method that:
   * 1. Calls LLM to generate SVG + animation config
   * 2. Creates pipeline with generated content
   * 3. Renders to output file
   *
   * @param request - LLM render request with description and config
   * @returns RenderResult with output path and metadata
   */
  static async fromDescription(request: LLMRenderRequest): Promise<RenderResult> {
    const orchestrator = new LLMOrchestrator(request.llmConfig);

    // Phase 1: LLM generates SVG + animation config
    const llmResponse = await orchestrator.generateDiagram({
      description: request.description,
      style: request.style,
      dimensions: {
        width: request.outputConfig?.width || 1400,
        height: request.outputConfig?.height || 950,
      },
    });

    // Phase 2: Create pipeline with generated content
    const outputConfig = request.outputConfig || {};
    const pipeline = new SVGAnimationPipeline({
      input: llmResponse.svg,
      output: outputConfig.output || './output/generated.gif',
      fps: outputConfig.fps || 30,
      duration: outputConfig.duration || 6000,
      width: outputConfig.width || 1400,
      height: outputConfig.height || 950,
      background: outputConfig.background,
      quality: outputConfig.quality,
      preserveNativeAnimations: !!llmResponse.css,
      ...outputConfig,
    });

    // Phase 3: Add LLM-generated animations
    pipeline.addAnimations(llmResponse.animations);

    // Phase 4: Set CSS if provided
    if (llmResponse.css) {
      pipeline.setStyles(llmResponse.css);
    }

    // Phase 5: Render
    return pipeline.render();
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
 * Follows the 4-stage pipeline: 分层 → 动画 → 渲染 → 合成
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
    preserveNativeAnimations?: boolean;
  }
): Promise<RenderResult> {
  // Parse SVG for dimensions and layer structure
  let width = options?.width || 800;
  let height = options?.height || 600;

  if (fs.existsSync(svgInput)) {
    const svg = await loadSVG(svgInput);
    width = options?.width || svg.width;
    height = options?.height || svg.height;
  } else {
    const svg = parseSVG(svgInput);
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
    preserveNativeAnimations: options?.preserveNativeAnimations ?? !fs.existsSync(svgInput),
  });

  pipeline.addAnimations(animations);

  return pipeline.render();
}
