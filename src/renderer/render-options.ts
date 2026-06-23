/**
 * Render options type definitions
 */

import { RenderOptions, BrowserConfig } from '../types';

/**
 * Default render options
 */
export const DEFAULT_RENDER_OPTIONS: Required<RenderOptions> = {
  width: 800,
  height: 600,
  background: '#ffffff',
  quality: 'medium',
  deviceScaleFactor: 2,
};

/**
 * Default browser configuration
 */
export const DEFAULT_BROWSER_CONFIG: BrowserConfig = {
  headless: true,
  args: [
    '--no-sandbox',
    '--disable-setuid-sandbox',
    '--disable-dev-shm-usage',
    '--disable-accelerated-2d-canvas',
    '--no-first-run',
    '--no-zygote',
    '--disable-gpu',
  ],
  timeout: 30000,
};

/**
 * Quality presets for rendering
 */
export const QUALITY_PRESETS: Record<
  NonNullable<RenderOptions['quality']>,
  { deviceScaleFactor: number; jpegQuality?: number; pngCompressionLevel?: number }
> = {
  low: {
    deviceScaleFactor: 1,
    jpegQuality: 60,
  },
  medium: {
    deviceScaleFactor: 2,
    jpegQuality: 80,
  },
  high: {
    deviceScaleFactor: 3,
    jpegQuality: 95,
  },
};

/**
 * Merge user options with defaults
 */
export function mergeRenderOptions(options?: Partial<RenderOptions>): Required<RenderOptions> {
  return {
    ...DEFAULT_RENDER_OPTIONS,
    ...options,
  };
}

/**
 * Merge browser config with defaults
 */
export function mergeBrowserConfig(config?: Partial<BrowserConfig>): BrowserConfig {
  return {
    ...DEFAULT_BROWSER_CONFIG,
    ...config,
  };
}
