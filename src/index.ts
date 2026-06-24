/**
 * SVG Animation Pipeline - Main exports
 */

// Types
export * from './types';

// Animator
export { SVGAnimator, ElementState } from './animator/svg-animator';
export { timeline, keyframeAt, simpleAnimation, pingPongAnimation, loopAnimation } from './animator/timeline';
export { getEasing, interpolate, interpolateColor, easings } from './animator/easing';

// Loader
export { loadSVG, parseSVG, filterLayers, extractLayersSVG, findElement } from './loader/svg-loader';

// Validator
export { validateSVG, sanitizeSVG, prepareForAnimation, hasSMILAnimation } from './validator/svg-validator';

// Renderer
export { PuppeteerRenderer, createRenderer } from './renderer/puppeteer-renderer';
export { mergeRenderOptions, mergeBrowserConfig, QUALITY_PRESETS } from './renderer/render-options';

// Encoder
export { FFmpegEncoder, createEncoder } from './encoder/ffmpeg-encoder';

// LLM Integration
export { LLMOrchestrator, createLLMOrchestrator } from './llm';
export type { DiagramRequest, LLMResponse, LLMProviderConfig, DiagramStyle, AnimationHint } from './llm/types';

// Pipeline
export { SVGAnimationPipeline, createPipeline, renderSVGAnimation } from './pipeline';
export type { PipelineConfigInput, LLMRenderRequest } from './pipeline';
