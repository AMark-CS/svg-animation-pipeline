/**
 * SVG Animator - Interpolate SVG element properties based on keyframes
 */

import {
  Keyframe,
  AnimationConfig,
  AnimatableProperties,
  EasingType,
  InterpolatedProperties,
  TransformValue,
  PathMorphValue,
} from '../types';
import { getEasing, interpolate, interpolateColor } from './easing';
import { getKeyframePair, normalizeKeyframes } from './keyframe';

/**
 * Interpolated state for a single element
 */
export interface ElementState {
  selector: string;
  properties: InterpolatedProperties;
}

/**
 * Main animator class
 */
export class SVGAnimator {
  private animations: AnimationConfig[] = [];
  private totalDuration: number = 0;

  /**
   * Add an animation configuration
   */
  addAnimation(config: AnimationConfig): this {
    this.animations.push(config);
    this.totalDuration = Math.max(
      this.totalDuration,
      ...config.keyframes.map((kf) => kf.time)
    );
    return this;
  }

  /**
   * Add multiple animations at once
   */
  addAnimations(configs: AnimationConfig[]): this {
    for (const config of configs) {
      this.addAnimation(config);
    }
    return this;
  }

  /**
   * Get total animation duration
   */
  getDuration(): number {
    return this.totalDuration;
  }

  /**
   * Compute the state of all animated elements at a given time
   */
  computeState(time: number): ElementState[] {
    const states: ElementState[] = [];

    for (const animation of this.animations) {
      const selectors = Array.isArray(animation.targets)
        ? animation.targets
        : [animation.targets];

      for (const selector of selectors) {
        const properties = this.interpolateProperties(animation, time);
        states.push({ selector, properties });
      }
    }

    return states;
  }

  /**
   * Interpolate properties for a single animation at a given time
   */
  private interpolateProperties(
    animation: AnimationConfig,
    time: number
  ): InterpolatedProperties {
    const keyframes = normalizeKeyframes(animation.keyframes, animation.easing || 'linear');
    const { start, end, progress } = getKeyframePair(keyframes, time);

    if (!end) {
      return this.serializeProperties(start.properties);
    }

    // Apply easing to progress
    const easingFn = getEasing(end.easing || animation.easing || 'linear');
    const easedProgress = easingFn(progress);

    // Interpolate each property
    const result: InterpolatedProperties = {};

    for (const key of Object.keys(start.properties)) {
      const startValue = start.properties[key];
      const endValue = end.properties[key];

      if (startValue === undefined && endValue === undefined) {
        continue;
      }

      if (startValue === undefined) {
        result[key] = this.serializeValue(endValue);
        continue;
      }

      if (endValue === undefined) {
        result[key] = this.serializeValue(startValue);
        continue;
      }

      result[key] = this.interpolateValue(key, startValue, endValue, easedProgress);
    }

    return result;
  }

  /**
   * Interpolate a single property value
   */
  private interpolateValue(
    key: string,
    start: unknown,
    end: unknown,
    progress: number
  ): string | number | undefined {
    // Handle transform specially
    if (key === 'transform') {
      return this.interpolateTransform(
        start as TransformValue,
        end as TransformValue,
        progress
      );
    }

    // Handle path morphing
    if (key === 'd' && typeof start === 'object' && typeof end === 'object') {
      return this.interpolatePath(
        { start: (start as PathMorphValue).start, end: (end as PathMorphValue).end },
        progress
      );
    }

    // Handle color interpolation
    if ((key === 'fill' || key === 'stroke') && typeof start === 'string' && typeof end === 'string') {
      return interpolateColor(start, end, progress);
    }

    // Handle color objects
    if (
      (key === 'fill' || key === 'stroke') &&
      typeof start === 'object' &&
      typeof end === 'object'
    ) {
      return interpolateColor(
        start as unknown as string,
        end as unknown as string,
        progress
      );
    }

    // Handle numeric interpolation
    if (typeof start === 'number' && typeof end === 'number') {
      return interpolate(start, end, progress);
    }

    // Handle stroke-dasharray as number
    if ((key === 'strokeDashoffset' || key === 'strokeDasharray') && typeof start === 'number') {
      return interpolate(start as number, end as number, progress);
    }

    // Handle strings that look like numbers
    if (typeof start === 'string' && typeof end === 'string') {
      const startNum = parseFloat(start);
      const endNum = parseFloat(end);
      if (!isNaN(startNum) && !isNaN(endNum)) {
        return interpolate(startNum, endNum, progress);
      }
    }

    // Fallback: use end value
    return this.serializeValue(end);
  }

  /**
   * Interpolate transform values
   */
  private interpolateTransform(
    start: TransformValue | undefined,
    end: TransformValue | undefined,
    progress: number
  ): string {
    const defaultTransform: TransformValue = {};

    const s = start || defaultTransform;
    const e = end || defaultTransform;

    const parts: string[] = [];

    // Translate
    if (s.translate || e.translate) {
      const sx = s.translate?.[0] ?? 0;
      const sy = s.translate?.[1] ?? 0;
      const ex = e.translate?.[0] ?? 0;
      const ey = e.translate?.[1] ?? 0;
      const x = interpolate(sx, ex, progress);
      const y = interpolate(sy, ey, progress);
      parts.push(`translate(${x}, ${y})`);
    }

    // Rotate
    if (s.rotate !== undefined || e.rotate !== undefined) {
      if (typeof s.rotate === 'number' && typeof e.rotate === 'number') {
        const angle = interpolate(s.rotate, e.rotate, progress);
        parts.push(`rotate(${angle})`);
      } else if (Array.isArray(s.rotate) && Array.isArray(e.rotate)) {
        const angle = interpolate(s.rotate[0], e.rotate[0], progress);
        const cx = interpolate(s.rotate[1], e.rotate[1], progress);
        const cy = interpolate(s.rotate[2], e.rotate[2], progress);
        parts.push(`rotate(${angle}, ${cx}, ${cy})`);
      } else {
        const angle = s.rotate ?? e.rotate;
        if (typeof angle === 'number') {
          parts.push(`rotate(${angle})`);
        }
      }
    }

    // Scale
    if (s.scale !== undefined || e.scale !== undefined) {
      if (typeof s.scale === 'number' && typeof e.scale === 'number') {
        const scale = interpolate(s.scale, e.scale, progress);
        parts.push(`scale(${scale})`);
      } else if (typeof s.scale === 'object' && typeof e.scale === 'object') {
        const sx = s.scale?.[0] ?? 1;
        const sy = s.scale?.[1] ?? sx;
        const ex = e.scale?.[0] ?? 1;
        const ey = e.scale?.[1] ?? ex;
        parts.push(`scale(${interpolate(sx, ex, progress)}, ${interpolate(sy, ey, progress)})`);
      } else {
        const scale = (s.scale ?? e.scale) as number | [number, number];
        if (typeof scale === 'number') {
          parts.push(`scale(${scale})`);
        }
      }
    }

    // Skew
    if (s.skewX !== undefined || e.skewX !== undefined) {
      const skew = interpolate(s.skewX ?? 0, e.skewX ?? 0, progress);
      parts.push(`skewX(${skew})`);
    }

    if (s.skewY !== undefined || e.skewY !== undefined) {
      const skew = interpolate(s.skewY ?? 0, e.skewY ?? 0, progress);
      parts.push(`skewY(${skew})`);
    }

    return parts.join(' ');
  }

  /**
   * Interpolate SVG path using morphPaths algorithm
   */
  private interpolatePath(
    morph: PathMorphValue,
    progress: number
  ): string {
    // Simple linear interpolation between path strings
    // For production, use a proper path morphing library like flubber
    const startPoints = this.extractPathPoints(morph.start);
    const endPoints = this.extractPathPoints(morph.end);

    // Normalize point counts
    const maxPoints = Math.max(startPoints.length, endPoints.length);
    const normalizedStart = this.normalizePathPoints(startPoints, maxPoints);
    const normalizedEnd = this.normalizePathPoints(endPoints, maxPoints);

    // Interpolate each point
    const interpolated = normalizedStart.map((sp, i) => {
      const ep = normalizedEnd[i];
      return {
        x: interpolate(sp.x, ep.x, progress),
        y: interpolate(sp.y, ep.y, progress),
        cmd: progress < 0.5 ? sp.cmd : ep.cmd,
      };
    });

    return this.pointsToPath(interpolated);
  }

  /**
   * Extract points from SVG path d attribute
   */
  private extractPathPoints(d: string): { x: number; y: number; cmd: string }[] {
    const points: { x: number; y: number; cmd: string }[] = [];
    const commands = d.match(/[MmLlHhVvCcSsQqTtAaZz][^MmLlHhVvCcSsQqTtAaZz]*/g) || [];

    let currentX = 0;
    let currentY = 0;

    for (const cmd of commands) {
      const type = cmd[0];
      const args = cmd
        .slice(1)
        .trim()
        .split(/[\s,]+/)
        .map(parseFloat)
        .filter((n) => !isNaN(n));

      switch (type) {
        case 'M':
          currentX = args[0];
          currentY = args[1];
          points.push({ x: currentX, y: currentY, cmd: 'M' });
          break;
        case 'm':
          currentX += args[0];
          currentY += args[1];
          points.push({ x: currentX, y: currentY, cmd: 'M' });
          break;
        case 'L':
          currentX = args[0];
          currentY = args[1];
          points.push({ x: currentX, y: currentY, cmd: 'L' });
          break;
        case 'l':
          currentX += args[0];
          currentY += args[1];
          points.push({ x: currentX, y: currentY, cmd: 'L' });
          break;
        case 'H':
          currentX = args[0];
          points.push({ x: currentX, y: currentY, cmd: 'L' });
          break;
        case 'h':
          currentX += args[0];
          points.push({ x: currentX, y: currentY, cmd: 'L' });
          break;
        case 'V':
          currentY = args[0];
          points.push({ x: currentX, y: currentY, cmd: 'L' });
          break;
        case 'v':
          currentY += args[0];
          points.push({ x: currentX, y: currentY, cmd: 'L' });
          break;
        case 'C':
          // Cubic bezier - store control points and end point
          points.push({ x: args[0], y: args[1], cmd: 'C' });
          points.push({ x: args[2], y: args[3], cmd: 'C' });
          currentX = args[4];
          currentY = args[5];
          points.push({ x: currentX, y: currentY, cmd: 'C' });
          break;
        case 'c':
          points.push({ x: currentX + args[0], y: currentY + args[1], cmd: 'C' });
          points.push({ x: currentX + args[2], y: currentY + args[3], cmd: 'C' });
          currentX += args[4];
          currentY += args[5];
          points.push({ x: currentX, y: currentY, cmd: 'C' });
          break;
        case 'Q':
          points.push({ x: args[0], y: args[1], cmd: 'Q' });
          currentX = args[2];
          currentY = args[3];
          points.push({ x: currentX, y: currentY, cmd: 'Q' });
          break;
        case 'q':
          points.push({ x: currentX + args[0], y: currentY + args[1], cmd: 'Q' });
          currentX += args[2];
          currentY += args[3];
          points.push({ x: currentX, y: currentY, cmd: 'Q' });
          break;
        case 'Z':
        case 'z':
          points.push({ x: currentX, y: currentY, cmd: 'Z' });
          break;
        default:
          // Handle implicit L commands after M
          if (args.length >= 2) {
            currentX = args[0];
            currentY = args[1];
            points.push({ x: currentX, y: currentY, cmd: 'L' });
          }
      }
    }

    return points;
  }

  /**
   * Normalize path points to same count
   */
  private normalizePathPoints(
    points: { x: number; y: number; cmd: string }[],
    targetCount: number
  ): { x: number; y: number; cmd: string }[] {
    if (points.length === targetCount) return points;

    if (points.length < targetCount) {
      // Need to add points - interpolate
      const result = [...points];
      const step = (points.length - 1) / (targetCount - 1 || 1);

      for (let i = points.length; i < targetCount; i++) {
        const index = Math.floor(step * (i - points.length + 1));
        const t = (step * (i - points.length + 1)) % 1;
        const p1 = points[Math.min(index, points.length - 1)];
        const p2 = points[Math.min(index + 1, points.length - 1)];
        result.push({
          x: interpolate(p1.x, p2.x, t),
          y: interpolate(p1.y, p2.y, t),
          cmd: p1.cmd,
        });
      }

      return result;
    }

    // Need to reduce points - sample
    const result: { x: number; y: number; cmd: string }[] = [];
    const step = (points.length - 1) / (targetCount - 1 || 1);

    for (let i = 0; i < targetCount; i++) {
      const index = Math.min(Math.floor(step * i), points.length - 1);
      result.push(points[index]);
    }

    return result;
  }

  /**
   * Convert points back to path string
   */
  private pointsToPath(points: { x: number; y: number; cmd: string }[]): string {
    return points
      .map((p, i) => {
        if (p.cmd === 'Z') return 'Z';
        if (p.cmd === 'M') return `M ${p.x.toFixed(2)} ${p.y.toFixed(2)}`;
        return `${p.x.toFixed(2)} ${p.y.toFixed(2)}`;
      })
      .join(' ')
      .replace(/^(\d)/, 'M $1');
  }

  /**
   * Serialize properties to CSS/SVG attribute format
   */
  private serializeProperties(props: AnimatableProperties): InterpolatedProperties {
    const result: InterpolatedProperties = {};

    for (const [key, value] of Object.entries(props)) {
      result[key] = this.serializeValue(value);
    }

    return result;
  }

  /**
   * Serialize a single value
   */
  private serializeValue(value: unknown): string | number | undefined {
    if (value === undefined || value === null) return undefined;
    if (typeof value === 'number') return value;
    if (typeof value === 'string') return value;
    if (typeof value === 'object') {
      if ('r' in value && 'g' in value && 'b' in value) {
        const c = value as { r: number; g: number; b: number; a?: number };
        return c.a !== undefined ? `rgba(${c.r}, ${c.g}, ${c.b}, ${c.a})` : `rgb(${c.r}, ${c.g}, ${c.b})`;
      }
      if ('start' in value && 'end' in value) {
        return (value as PathMorphValue).start;
      }
    }
    return String(value);
  }

  /**
   * Generate JavaScript code to apply animation state to SVG
   */
  generateApplyScript(states: ElementState[]): string {
    const stateJson = JSON.stringify(
      states.map((s) => ({ selector: s.selector, properties: s.properties }))
    );

    return `
      (function() {
        const states = ${stateJson};
        states.forEach(function(state) {
          var elements = document.querySelectorAll(state.selector);
          elements.forEach(function(el) {
            Object.entries(state.properties).forEach(function(entry) {
              var key = entry[0];
              var value = entry[1];
              if (value !== undefined && value !== null) {
                el.setAttribute(key, value);
              }
            });
          });
        });
      })();
    `;
  }
}
