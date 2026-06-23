/**
 * Easing functions for animations
 * Based on GSAP and CSS easing functions
 */

import { EasingFunction, EasingType } from '../types';

// ============================================================================
// Basic Easing Functions
// ============================================================================

export const linear: EasingFunction = (t) => t;

export const easeIn: EasingFunction = (t) => t * t;
export const easeOut: EasingFunction = (t) => t * (2 - t);
export const easeInOut: EasingFunction = (t) =>
  t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;

// ============================================================================
// Quadratic Easing
// ============================================================================

export const easeInQuad: EasingFunction = (t) => t * t;
export const easeOutQuad: EasingFunction = (t) => t * (2 - t);
export const easeInOutQuad: EasingFunction = (t) =>
  t < 0.5 ? 2 * t * t : -1 + (4 - 2 * t) * t;

// ============================================================================
// Cubic Easing
// ============================================================================

export const easeInCubic: EasingFunction = (t) => t * t * t;
export const easeOutCubic: EasingFunction = (t) => --t * t * t + 1;
export const easeInOutCubic: EasingFunction = (t) =>
  t < 0.5 ? 4 * t * t * t : (t - 1) * (2 * t - 2) * (2 * t - 2) + 1;

// ============================================================================
// Quartic Easing
// ============================================================================

export const easeInQuart: EasingFunction = (t) => t * t * t * t;
export const easeOutQuart: EasingFunction = (t) => 1 - --t * t * t * t;
export const easeInOutQuart: EasingFunction = (t) =>
  t < 0.5 ? 8 * t * t * t * t : 1 - 8 * --t * t * t * t;

// ============================================================================
// Quintic Easing
// ============================================================================

export const easeInQuint: EasingFunction = (t) => t * t * t * t * t;
export const easeOutQuint: EasingFunction = (t) => 1 + --t * t * t * t * t;
export const easeInOutQuint: EasingFunction = (t) =>
  t < 0.5 ? 16 * t * t * t * t * t : 1 + 16 * --t * t * t * t * t;

// ============================================================================
// Sine Easing
// ============================================================================

export const easeInSine: EasingFunction = (t) => 1 - Math.cos((t * Math.PI) / 2);
export const easeOutSine: EasingFunction = (t) => Math.sin((t * Math.PI) / 2);
export const easeInOutSine: EasingFunction = (t) =>
  -(Math.cos(Math.PI * t) - 1) / 2;

// ============================================================================
// Elastic Easing
// ============================================================================

export const elastic: EasingFunction = (t) => {
  const c4 = (2 * Math.PI) / 3;
  return t === 0
    ? 0
    : t === 1
    ? 1
    : Math.pow(2, -10 * t) * Math.sin((t * 10 - 0.75) * c4) + 1;
};

// ============================================================================
// Bounce Easing
// ============================================================================

export const bounce: EasingFunction = (t) => {
  const n1 = 7.5625;
  const d1 = 2.75;

  if (t < 1 / d1) {
    return n1 * t * t;
  } else if (t < 2 / d1) {
    return n1 * (t -= 1.5 / d1) * t + 0.75;
  } else if (t < 2.5 / d1) {
    return n1 * (t -= 2.25 / d1) * t + 0.9375;
  } else {
    return n1 * (t -= 2.625 / d1) * t + 0.984375;
  }
};

// ============================================================================
// Spring Easing (simplified)
// ============================================================================

export const spring: EasingFunction = (t) => {
  const c4 = (2 * Math.PI) / 3;
  return t === 0
    ? 0
    : t === 1
    ? 1
    : Math.pow(2, -10 * t) * Math.sin((t * 10 - 0.75) * c4) + 1;
};

// ============================================================================
// Ease Out Back (overshoot)
// ============================================================================

export const easeOutBack: EasingFunction = (t) => {
  const c1 = 1.70158;
  const c3 = c1 + 1;
  return 1 + c3 * Math.pow(t - 1, 3) + c1 * Math.pow(t - 1, 2);
};

// ============================================================================
// Ease Out Elastic
// ============================================================================

export const easeOutElastic: EasingFunction = (t) => {
  const c4 = (2 * Math.PI) / 3;
  return t === 0
    ? 0
    : t === 1
    ? 1
    : Math.pow(2, -10 * t) * Math.sin((t * 10 - 0.75) * c4) + 1;
};

// ============================================================================
// Easing Registry
// ============================================================================

export const easings: Record<EasingType, EasingFunction> = {
  linear,
  easeIn,
  easeOut,
  easeInOut,
  easeInQuad,
  easeOutQuad,
  easeInOutQuad,
  easeInCubic,
  easeOutCubic,
  easeInOutCubic,
  easeInQuart,
  easeOutQuart,
  easeInOutQuart,
  easeInQuint,
  easeOutQuint,
  easeInOutQuint,
  easeInSine,
  easeOutSine,
  easeInOutSine,
  easeOutBack,
  easeOutElastic,
  elastic,
  bounce,
  spring,
};

/**
 * Get easing function by name or return the function directly
 */
export function getEasing(type: EasingType | EasingFunction): EasingFunction {
  if (typeof type === 'function') {
    return type;
  }
  return easings[type] || linear;
}

/**
 * Create a custom easing function from control points
 */
export function cubicBezier(
  x1: number,
  y1: number,
  x2: number,
  y2: number
): EasingFunction {
  return (t) => {
    // Newton-Raphson iteration to find the parameter value
    let x = t;
    for (let i = 0; i < 8; i++) {
      const currentX = bezierValue(x, x1, x2) - t;
      if (Math.abs(currentX) < 1e-6) break;
      x -= currentX / bezierDerivative(x, x1, x2);
    }
    return bezierValue(x, y1, y2);
  };
}

function bezierValue(t: number, p1: number, p2: number): number {
  const t2 = t * t;
  const t3 = t2 * t;
  return 3 * p1 * t * (1 - t) * (1 - t) + 3 * p2 * t2 * (1 - t) + t3;
}

function bezierDerivative(t: number, p1: number, p2: number): number {
  const t2 = t * t;
  return (
    3 * p1 * (1 - t) * (1 - t) -
    6 * p1 * t * (1 - t) +
    6 * p2 * t * (1 - t) -
    3 * p2 * t2
  );
}

// ============================================================================
// Interpolation Utilities
// ============================================================================

/**
 * Interpolate between two values
 */
export function interpolate(
  start: number,
  end: number,
  progress: number
): number {
  return start + (end - start) * progress;
}

/**
 * Interpolate between two colors
 */
export function interpolateColor(
  start: string | { r: number; g: number; b: number; a?: number },
  end: string | { r: number; g: number; b: number; a?: number },
  progress: number
): string {
  const startColor = parseColor(start);
  const endColor = parseColor(end);

  const r = Math.round(startColor.r + (endColor.r - startColor.r) * progress);
  const g = Math.round(startColor.g + (endColor.g - startColor.g) * progress);
  const b = Math.round(startColor.b + (endColor.b - startColor.b) * progress);
  const a = (startColor.a ?? 1) + ((endColor.a ?? 1) - (startColor.a ?? 1)) * progress;

  return a < 1 ? `rgba(${r}, ${g}, ${b}, ${a.toFixed(2)})` : `rgb(${r}, ${g}, ${b})`;
}

function parseColor(
  color: string | { r: number; g: number; b: number; a?: number }
): { r: number; g: number; b: number; a: number } {
  if (typeof color !== 'string') {
    return { r: color.r, g: color.g, b: color.b, a: color.a ?? 1 };
  }

  // Handle hex colors
  if (color.startsWith('#')) {
    const hex = color.slice(1);
    if (hex.length === 3) {
      return {
        r: parseInt(hex[0] + hex[0], 16),
        g: parseInt(hex[1] + hex[1], 16),
        b: parseInt(hex[2] + hex[2], 16),
        a: 1,
      };
    }
    return {
      r: parseInt(hex.slice(0, 2), 16),
      g: parseInt(hex.slice(2, 4), 16),
      b: parseInt(hex.slice(4, 6), 16),
      a: 1,
    };
  }

  // Handle rgb/rgba
  const match = color.match(/rgba?\((\d+),\s*(\d+),\s*(\d+)(?:,\s*([\d.]+))?\)/);
  if (match) {
    return {
      r: parseInt(match[1]),
      g: parseInt(match[2]),
      b: parseInt(match[3]),
      a: match[4] ? parseFloat(match[4]) : 1,
    };
  }

  // Default fallback
  return { r: 0, g: 0, b: 0, a: 1 };
}
