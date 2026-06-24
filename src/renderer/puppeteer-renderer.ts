/**
 * Puppeteer Renderer - Render SVG frames using headless Chrome
 */

import * as path from 'path';
import * as fs from 'fs';
import puppeteer, { Browser, Page } from 'puppeteer';
import {
  RenderOptions,
  BrowserConfig,
  FrameData,
} from '../types';
import {
  mergeRenderOptions,
  mergeBrowserConfig,
  QUALITY_PRESETS,
} from './render-options';

export interface PuppeteerRendererOptions {
  render?: Partial<RenderOptions>;
  browser?: Partial<BrowserConfig>;
}

/**
 * Puppeteer-based frame renderer
 */
export class PuppeteerRenderer {
  private browser: Browser | null = null;
  private page: Page | null = null;
  private options: Required<RenderOptions>;
  private browserConfig: BrowserConfig;
  private tempDir: string;
  private initialized: boolean = false;

  constructor(options?: PuppeteerRendererOptions) {
    this.options = mergeRenderOptions(options?.render);
    this.browserConfig = mergeBrowserConfig(options?.browser);
    this.tempDir = path.join(process.cwd(), '.svg-anim-temp');
  }

  /**
   * Initialize browser and page
   */
  async initialize(): Promise<void> {
    if (this.initialized) return;

    // Create temp directory
    if (!fs.existsSync(this.tempDir)) {
      fs.mkdirSync(this.tempDir, { recursive: true });
    }

    // Launch browser
    this.browser = await puppeteer.launch({
      headless: this.browserConfig.headless,
      args: this.browserConfig.args,
    });

    // Create page
    this.page = await this.browser.newPage();

    // Set viewport
    const qualityPreset = QUALITY_PRESETS[this.options.quality];
    await this.page.setViewport({
      width: this.options.width,
      height: this.options.height,
      deviceScaleFactor: qualityPreset.deviceScaleFactor,
    });

    // Disable external resources
    await this.page.setRequestInterception(true);
    this.page.on('request', (request) => {
      const url = request.url();
      if (
        url.startsWith('http://') ||
        url.startsWith('https://') ||
        url.startsWith('//')
      ) {
        if (!url.startsWith('data:') && !url.startsWith('blob:')) {
          request.abort();
          return;
        }
      }
      request.continue();
    });

    this.initialized = true;
  }

  /**
   * Get the current page instance
   */
  getPage(): Page {
    if (!this.page) {
      throw new Error('Renderer not initialized. Call initialize() first.');
    }
    return this.page;
  }

  /**
   * Load SVG content into the page
   */
  async loadSVG(svgContent: string, cssStyles?: string): Promise<void> {
    const page = this.getPage();

    // Wrap SVG in HTML document with optional CSS
    const html = this.createHTMLDocument(svgContent, cssStyles);

    await page.setContent(html, { waitUntil: 'domcontentloaded' });

    // Brief pause for initial rendering
    await new Promise((resolve) => setTimeout(resolve, 50));
  }

  /**
   * Create HTML document wrapper for SVG
   */
  private createHTMLDocument(svg: string, css?: string): string {
    // Wrap SVG with explicit dimensions
    const wrappedSvg = svg.replace(
      '<svg',
      `<svg width="${this.options.width}" height="${this.options.height}"`
    );

    return `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <title>SVG Animation</title>
  <style>
    * { margin: 0; padding: 0; box-sizing: border-box; }
    html, body {
      width: ${this.options.width}px;
      height: ${this.options.height}px;
      overflow: hidden;
      background: ${this.options.background};
    }
    svg { display: block; }
    ${css || ''}
  </style>
</head>
<body>
  ${wrappedSvg}
</body>
</html>
    `.trim();
  }

  /**
   * Apply animation state to SVG elements
   */
  async applyState(stateScript: string): Promise<void> {
    const page = this.getPage();
    await page.evaluate(stateScript);
  }

  /**
   * Initialize DOM element cache for animated selectors (run once after SVG load)
   */
  async initCache(initCacheScript: string): Promise<void> {
    const page = this.getPage();
    await page.evaluate(initCacheScript);
  }

  /**
   * Render a single frame using optimized cached element references
   */
  async renderFrameOptimized(time: number, optimizedScript: string): Promise<FrameData> {
    const page = this.getPage();

    // Apply animation state via cached references
    await page.evaluate(optimizedScript);

    // Capture screenshot
    const buffer = await page.screenshot({
      type: 'png',
      omitBackground: false,
    });

    return {
      time,
      index: Math.round(time),
      buffer: buffer as Buffer,
    };
  }

  /**
   * Apply state and return frame data
   */
  async renderFrame(time: number, stateScript: string): Promise<FrameData> {
    const page = this.getPage();

    // Apply animation state
    await page.evaluate(stateScript);

    // Wait for rendering
    await new Promise((resolve) => setTimeout(resolve, 16));

    // Capture screenshot
    const buffer = await page.screenshot({
      type: 'png',
      omitBackground: false,
    });

    return {
      time,
      index: Math.round(time),
      buffer: buffer as Buffer,
    };
  }

  /**
   * Render multiple frames
   */
  async renderFrames(
    fps: number,
    duration: number,
    stateGenerator: (time: number) => string,
    onProgress?: (frame: number, total: number) => void
  ): Promise<FrameData[]> {
    const totalFrames = Math.ceil((fps * duration) / 1000);
    const interval = 1000 / fps;
    const frames: FrameData[] = [];

    for (let i = 0; i < totalFrames; i++) {
      const time = i * interval;
      const stateScript = stateGenerator(time);

      try {
        const frame = await this.renderFrameWithRetry(time, stateScript);
        frames.push(frame);
        onProgress?.(i + 1, totalFrames);
      } catch (error) {
        console.error(`Failed to render frame ${i} after retries:`, error);
        throw error;
      }
    }

    return frames;
  }

  /**
   * Render a single frame with retry logic
   */
  private async renderFrameWithRetry(
    time: number,
    stateScript: string,
    maxRetries: number = 3
  ): Promise<FrameData> {
    let lastError: Error | null = null;

    for (let attempt = 1; attempt <= maxRetries; attempt++) {
      try {
        // If retry, ensure page is still valid
        if (attempt > 1) {
          await this.ensurePageValid();
        }

        return await this.renderFrame(time, stateScript);
      } catch (error) {
        lastError = error as Error;

        if (attempt < maxRetries) {
          // Exponential backoff
          const delay = Math.pow(2, attempt) * 100;
          console.warn(`Frame render failed (attempt ${attempt}), retrying in ${delay}ms...`);
          await this.sleep(delay);

          // Reinitialize if needed
          await this.ensurePageValid();
        }
      }
    }

    throw lastError || new Error('Frame render failed after max retries');
  }

  /**
   * Ensure page is still valid, recreate if needed
   */
  private async ensurePageValid(): Promise<void> {
    if (!this.page || !this.browser) {
      await this.initialize();
      return;
    }

    try {
      // Test if page is still responsive
      await this.page.title();
    } catch {
      // Page is dead, recreate
      console.warn('Page became invalid, recreating...');
      await this.close();
      await this.initialize();
    }
  }

  /**
   * Save frame to disk
   */
  async saveFrame(frame: FrameData, filename: string): Promise<string> {
    const filepath = path.join(this.tempDir, filename);

    if (frame.buffer) {
      await fs.promises.writeFile(filepath, frame.buffer);
    } else if (frame.path) {
      await fs.promises.copyFile(frame.path, filepath);
    }

    return filepath;
  }

  /**
   * Save frames to numbered PNG files
   */
  async saveFrames(frames: FrameData[], prefix: string = 'frame'): Promise<string[]> {
    const paths: string[] = [];

    for (let i = 0; i < frames.length; i++) {
      const filename = `${prefix}${String(i).padStart(5, '0')}.png`;
      const filepath = await this.saveFrame(frames[i], filename);
      paths.push(filepath);
    }

    return paths;
  }

  /**
   * Get temp directory path
   */
  getTempDir(): string {
    return this.tempDir;
  }

  /**
   * Clean up temp directory
   */
  async cleanup(): Promise<void> {
    if (fs.existsSync(this.tempDir)) {
      const files = await fs.promises.readdir(this.tempDir);
      await Promise.all(
        files.map((file) => fs.promises.unlink(path.join(this.tempDir, file)))
      );
      await fs.promises.rmdir(this.tempDir);
    }
  }

  /**
   * Close browser and page
   */
  async close(): Promise<void> {
    if (this.page) {
      await this.page.close();
      this.page = null;
    }

    if (this.browser) {
      await this.browser.close();
      this.browser = null;
    }

    this.initialized = false;
  }

  /**
   * Sleep helper
   */
  private sleep(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}

/**
 * Create a renderer with default options
 */
export function createRenderer(options?: PuppeteerRendererOptions): PuppeteerRenderer {
  return new PuppeteerRenderer(options);
}
