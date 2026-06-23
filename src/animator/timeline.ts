/**
 * Timeline utilities for creating keyframes
 */

import { Keyframe, EasingType } from '../types';

/**
 * Timeline helper class for creating keyframes with a fluent API
 */
export class Timeline {
  private keyframes: Keyframe[] = [];

  /**
   * Add a keyframe at a specific time
   */
  at(time: number, properties: Record<string, unknown>, easing?: EasingType): this {
    this.keyframes.push({
      time,
      properties: properties as Keyframe['properties'],
      easing,
    });
    return this;
  }

  /**
   * Add a keyframe at the start (time 0)
   */
  from(properties: Record<string, unknown>): this {
    return this.at(0, properties);
  }

  /**
   * Add a keyframe at the end (relative to duration)
   */
  to(duration: number, properties: Record<string, unknown>, easing?: EasingType): this {
    return this.at(duration, properties, easing);
  }

  /**
   * Add keyframes at evenly spaced intervals
   */
  stagger(
    duration: number,
    count: number,
    propertyFactory: (index: number) => Record<string, unknown>,
    easing?: EasingType
  ): this {
    const interval = duration / (count - 1 || 1);
    for (let i = 0; i < count; i++) {
      this.at(i * interval, propertyFactory(i), easing);
    }
    return this;
  }

  /**
   * Get all keyframes
   */
  getKeyframes(): Keyframe[] {
    return [...this.keyframes].sort((a, b) => a.time - b.time);
  }

  /**
   * Clear all keyframes
   */
  reset(): this {
    this.keyframes = [];
    return this;
  }
}

/**
 * Create a new timeline instance
 */
export function timeline(): Timeline {
  return new Timeline();
}

/**
 * Static keyframe helpers for use outside of timeline chains
 */
export const keyframeAt = (
  time: number,
  properties: Record<string, unknown>,
  easing?: EasingType
): Keyframe => ({
  time,
  properties: properties as Keyframe['properties'],
  easing,
});

/**
 * Create multiple keyframes with stagger
 */
export function staggerKeyframes(
  duration: number,
  count: number,
  propertyFactory: (index: number) => { time: number; properties: Record<string, unknown> },
  easing?: EasingType
): Keyframe[] {
  return Array.from({ length: count }, (_, i) => {
    const { time, properties } = propertyFactory(i);
    return keyframeAt(time, properties, easing);
  });
}

/**
 * Create a keyframe set for a simple two-point animation
 */
export function simpleAnimation(
  from: Record<string, unknown>,
  to: Record<string, unknown>,
  duration: number,
  easing?: EasingType
): Keyframe[] {
  return [
    keyframeAt(0, from),
    keyframeAt(duration, to, easing),
  ];
}

/**
 * Create a ping-pong (back and forth) animation
 */
export function pingPongAnimation(
  start: Record<string, unknown>,
  end: Record<string, unknown>,
  duration: number,
  easing?: EasingType
): Keyframe[] {
  return [
    keyframeAt(0, start),
    keyframeAt(duration / 2, end, easing),
    keyframeAt(duration, start, easing),
  ];
}

/**
 * Create a looped animation
 */
export function loopAnimation(
  keyframes: Keyframe[],
  iterations: number
): Keyframe[] {
  const duration = Math.max(...keyframes.map((kf) => kf.time));
  const result: Keyframe[] = [];

  for (let i = 0; i < iterations; i++) {
    const offset = i * duration;
    for (const kf of keyframes) {
      result.push({
        ...kf,
        time: kf.time + offset,
      });
    }
  }

  return result;
}
