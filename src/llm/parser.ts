/**
 * LLM Output Parser
 *
 * Parses LLM-generated JSON into AnimationConfig[]
 */

import { AnimationConfig, Keyframe, EasingType } from '../types';
import { ParsedLLMOutput, ValidationResult } from './types';

// ============================================================================
// Parse LLM Output
// ============================================================================

export function parseLLMOutput(rawOutput: string): ParsedLLMOutput {
  // Try to extract JSON from the response
  let jsonStr = rawOutput;

  // If response contains markdown code blocks, extract JSON
  const jsonMatch = rawOutput.match(/```(?:json)?\s*([\s\S]*?)```/);
  if (jsonMatch) {
    jsonStr = jsonMatch[1].trim();
  }

  // Try to find JSON object in the string
  const firstBrace = jsonStr.indexOf('{');
  const lastBrace = jsonStr.lastIndexOf('}');

  if (firstBrace === -1 || lastBrace === -1 || lastBrace <= firstBrace) {
    throw new Error('No valid JSON object found in LLM output');
  }

  jsonStr = jsonStr.substring(firstBrace, lastBrace + 1);

  let parsed: any;
  try {
    parsed = JSON.parse(jsonStr);
  } catch (error) {
    throw new Error(`Failed to parse JSON from LLM output: ${error}`);
  }

  // Validate required fields
  if (!parsed.svg || typeof parsed.svg !== 'string') {
    throw new Error('LLM output missing required "svg" field');
  }

  if (!parsed.animations || !Array.isArray(parsed.animations)) {
    throw new Error('LLM output missing required "animations" array');
  }

  // Parse and validate animations
  const animations = parsed.animations.map((anim: any, index: number) =>
    parseAnimationConfig(anim, index)
  );

  return {
    svg: parsed.svg,
    animations,
    css: parsed.css || undefined,
    explanation: parsed.explanation || undefined,
  };
}

// ============================================================================
// Parse Animation Config
// ============================================================================

function parseAnimationConfig(raw: any, index: number): AnimationConfig {
  // Validate targets
  if (!raw.targets) {
    throw new Error(`Animation ${index}: missing "targets" field`);
  }

  const targets = Array.isArray(raw.targets) ? raw.targets : [raw.targets];

  // Validate keyframes
  if (!raw.keyframes || !Array.isArray(raw.keyframes) || raw.keyframes.length === 0) {
    throw new Error(`Animation ${index}: missing or empty "keyframes" array`);
  }

  const keyframes = raw.keyframes.map((kf: any, kfIndex: number) =>
    parseKeyframe(kf, index, kfIndex)
  );

  // Sort keyframes by time
  keyframes.sort((a: Keyframe, b: Keyframe) => a.time - b.time);

  // Parse easing
  const easing = raw.easing ? validateEasing(raw.easing) : undefined;

  return {
    targets,
    keyframes,
    easing,
  };
}

// ============================================================================
// Parse Keyframe
// ============================================================================

function parseKeyframe(raw: any, animIndex: number, kfIndex: number): Keyframe {
  // Validate time
  if (typeof raw.time !== 'number' || raw.time < 0) {
    throw new Error(`Animation ${animIndex}, keyframe ${kfIndex}: invalid "time" value`);
  }

  // Validate properties
  if (!raw.properties || typeof raw.properties !== 'object') {
    throw new Error(`Animation ${animIndex}, keyframe ${kfIndex}: missing "properties" object`);
  }

  // Parse and validate properties
  const properties = parseProperties(raw.properties, animIndex, kfIndex);

  // Parse easing
  const easing = raw.easing ? validateEasing(raw.easing) : undefined;

  return {
    time: raw.time,
    properties,
    easing,
  };
}

// ============================================================================
// Parse Properties
// ============================================================================

function parseProperties(raw: any, animIndex: number, kfIndex: number): Record<string, any> {
  const properties: Record<string, any> = {};

  for (const [key, value] of Object.entries(raw)) {
    // Validate property name
    if (!isValidPropertyName(key)) {
      console.warn(`Animation ${animIndex}, keyframe ${kfIndex}: unknown property "${key}"`);
    }

    // Parse value based on property type
    properties[key] = parsePropertyValue(key, value, animIndex, kfIndex);
  }

  return properties;
}

// ============================================================================
// Parse Property Value
// ============================================================================

function parsePropertyValue(key: string, value: any, animIndex: number, kfIndex: number): any {
  // Handle transform specially
  if (key === 'transform') {
    return parseTransform(value, animIndex, kfIndex);
  }

  // Handle path morphing
  if (key === 'd' && typeof value === 'object' && value.start && value.end) {
    return { start: String(value.start), end: String(value.end) };
  }

  // Handle colors
  if (key === 'fill' || key === 'stroke') {
    return parseColor(value);
  }

  // Handle numeric values
  if (typeof value === 'number') {
    return value;
  }

  // Handle string values
  if (typeof value === 'string') {
    // Try to parse as number
    const num = parseFloat(value);
    if (!isNaN(num) && String(num) === value.trim()) {
      return num;
    }
    return value;
  }

  // Return as-is for other types
  return value;
}

// ============================================================================
// Parse Transform
// ============================================================================

function parseTransform(value: any, animIndex: number, kfIndex: number): any {
  if (typeof value === 'string') {
    return value;
  }

  if (typeof value !== 'object') {
    throw new Error(`Animation ${animIndex}, keyframe ${kfIndex}: invalid transform value`);
  }

  const transform: any = {};

  // Parse translate
  if (value.translate) {
    if (Array.isArray(value.translate) && value.translate.length === 2) {
      transform.translate = [Number(value.translate[0]), Number(value.translate[1])];
    } else {
      throw new Error(`Animation ${animIndex}, keyframe ${kfIndex}: invalid translate format`);
    }
  }

  // Parse rotate
  if (value.rotate !== undefined) {
    if (typeof value.rotate === 'number') {
      transform.rotate = value.rotate;
    } else if (Array.isArray(value.rotate) && value.rotate.length === 3) {
      transform.rotate = [Number(value.rotate[0]), Number(value.rotate[1]), Number(value.rotate[2])];
    } else {
      throw new Error(`Animation ${animIndex}, keyframe ${kfIndex}: invalid rotate format`);
    }
  }

  // Parse scale
  if (value.scale !== undefined) {
    if (typeof value.scale === 'number') {
      transform.scale = value.scale;
    } else if (Array.isArray(value.scale) && value.scale.length === 2) {
      transform.scale = [Number(value.scale[0]), Number(value.scale[1])];
    } else {
      throw new Error(`Animation ${animIndex}, keyframe ${kfIndex}: invalid scale format`);
    }
  }

  // Parse skewX/skewY
  if (value.skewX !== undefined) {
    transform.skewX = Number(value.skewX);
  }
  if (value.skewY !== undefined) {
    transform.skewY = Number(value.skewY);
  }

  return transform;
}

// ============================================================================
// Parse Color
// ============================================================================

function parseColor(value: any): any {
  if (typeof value === 'string') {
    return value;
  }

  if (typeof value === 'object' && value.r !== undefined && value.g !== undefined && value.b !== undefined) {
    return {
      r: Number(value.r),
      g: Number(value.g),
      b: Number(value.b),
      a: value.a !== undefined ? Number(value.a) : undefined,
    };
  }

  return value;
}

// ============================================================================
// Validate Easing
// ============================================================================

const VALID_EASINGS: EasingType[] = [
  'linear', 'easeIn', 'easeOut', 'easeInOut',
  'easeInQuad', 'easeOutQuad', 'easeInOutQuad',
  'easeInCubic', 'easeOutCubic', 'easeInOutCubic',
  'easeInQuart', 'easeOutQuart', 'easeInOutQuart',
  'easeInQuint', 'easeOutQuint', 'easeInOutQuint',
  'easeInSine', 'easeOutSine', 'easeInOutSine',
  'easeOutBack', 'easeOutElastic', 'elastic', 'bounce', 'spring',
];

function validateEasing(value: string): EasingType {
  if (VALID_EASINGS.includes(value as EasingType)) {
    return value as EasingType;
  }

  console.warn(`Unknown easing "${value}", falling back to "linear"`);
  return 'linear';
}

// ============================================================================
// Validate Property Name
// ============================================================================

const VALID_PROPERTIES = new Set([
  'opacity', 'strokeDashoffset', 'strokeDasharray', 'transform', 'd',
  'fill', 'stroke', 'fillOpacity', 'strokeOpacity', 'strokeWidth',
  'r', 'rx', 'ry', 'cx', 'cy', 'x', 'y', 'width', 'height',
]);

function isValidPropertyName(name: string): boolean {
  return VALID_PROPERTIES.has(name) || name.startsWith('data-');
}
