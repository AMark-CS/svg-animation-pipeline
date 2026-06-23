/**
 * Core type definitions for SVG Animation Pipeline
 */

// ============================================================================
// Easing Types
// ============================================================================

export type EasingType =
  | 'linear'
  | 'easeIn'
  | 'easeOut'
  | 'easeInOut'
  | 'easeInQuad'
  | 'easeOutQuad'
  | 'easeInOutQuad'
  | 'easeInCubic'
  | 'easeOutCubic'
  | 'easeInOutCubic'
  | 'easeInQuart'
  | 'easeOutQuart'
  | 'easeInOutQuart'
  | 'easeInQuint'
  | 'easeOutQuint'
  | 'easeInOutQuint'
  | 'easeInSine'
  | 'easeOutSine'
  | 'easeInOutSine'
  | 'easeOutBack'
  | 'easeOutElastic'
  | 'elastic'
  | 'bounce'
  | 'spring';

export type EasingFunction = (t: number) => number;

// ============================================================================
// Keyframe Types
// ============================================================================

export interface Keyframe {
  /** Time in milliseconds */
  time: number;
  properties: AnimatableProperties;
  easing?: EasingType;
}

export interface AnimationConfig {
  targets: string | string[];
  keyframes: Keyframe[];
  easing?: EasingType;
}

// ============================================================================
// Property Types
// ============================================================================

export interface AnimatableProperties {
  opacity?: number;
  strokeDashoffset?: number;
  strokeDasharray?: number | string;
  transform?: TransformValue;
  d?: PathMorphValue;
  fill?: ColorValue | string;
  stroke?: ColorValue | string;
  fillOpacity?: number;
  strokeOpacity?: number;
  strokeWidth?: number;
  r?: number;
  rx?: number;
  ry?: number;
  cx?: number;
  cy?: number;
  x?: number | string;
  y?: number | string;
  width?: number | string;
  height?: number | string;
  [key: string]: unknown;
}

export interface TransformValue {
  translate?: [number, number];
  rotate?: number | [number, number, number];
  scale?: number | [number, number];
  skewX?: number;
  skewY?: number;
}

export interface PathMorphValue {
  start: string;
  end: string;
}

export interface ColorValue {
  r: number;
  g: number;
  b: number;
  a?: number;
}

// ============================================================================
// SVG Layer Types
// ============================================================================

export interface SVGLayer {
  id?: string;
  className?: string;
  element: string;
  children: SVGElementInfo[];
  attributes: Record<string, string>;
}

export interface SVGElementInfo {
  tag: string;
  attributes: Record<string, string>;
  content?: string;
  children?: SVGElementInfo[];
}

export interface ParsedSVG {
  width: number;
  height: number;
  viewBox?: string;
  layers: SVGLayer[];
  raw: string;
}

// ============================================================================
// Pipeline Types
// ============================================================================

export interface PipelineConfig {
  input: string;
  output: string;
  fps: number;
  duration: number;
  width: number;
  height: number;
  background?: string;
  quality?: 'low' | 'medium' | 'high';
}

export interface PipelineOptions extends PipelineConfig {
  tempDir?: string;
  keepFrames?: boolean;
}

export interface RenderResult {
  output: string;
  frames: number;
  duration: number;
  fps: number;
}

export interface FrameData {
  time: number;
  index: number;
  buffer?: Buffer;
  path?: string;
}

// ============================================================================
// Event Types
// ============================================================================

export type ProgressCallback = (progress: ProgressInfo) => void;
export type ErrorCallback = (error: Error) => void;
export type FrameCallback = (frame: FrameData) => void;

export interface ProgressInfo {
  phase: 'loading' | 'animating' | 'rendering' | 'encoding';
  percent: number;
  currentFrame: number;
  totalFrames: number;
  message?: string;
}

export interface PipelineEvents {
  progress?: ProgressCallback;
  error?: ErrorCallback;
  frame?: FrameCallback;
}

// ============================================================================
// Renderer Types
// ============================================================================

export interface RenderOptions {
  width: number;
  height: number;
  background?: string;
  quality?: 'low' | 'medium' | 'high';
  deviceScaleFactor?: number;
}

export interface BrowserConfig {
  headless?: boolean;
  args?: string[];
  timeout?: number;
}

// ============================================================================
// Encoder Types
// ============================================================================

export type OutputFormat = 'gif' | 'mp4' | 'webm';

export interface EncodeOptions {
  format: OutputFormat;
  fps?: number;
  quality?: 'low' | 'medium' | 'high';
  lossless?: boolean;
  palette?: boolean;
}

export interface GIFOptions extends EncodeOptions {
  format: 'gif';
  palette?: boolean;
  colors?: number;
}

export interface VideoOptions extends EncodeOptions {
  format: 'mp4' | 'webm';
  codec?: string;
  bitrate?: string;
}

// ============================================================================
// Animation State
// ============================================================================

export interface AnimationState {
  time: number;
  properties: Map<string, AnimatableProperties>;
}

export interface InterpolatedProperties {
  [key: string]: string | number | undefined;
}
