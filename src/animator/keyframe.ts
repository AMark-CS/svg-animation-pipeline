/**
 * Keyframe type definitions and utilities
 */

import { Keyframe, AnimationConfig, EasingType } from '../types';

/**
 * Create a keyframe with time and properties
 */
export function createKeyframe(
  time: number,
  properties: Record<string, unknown>
): Keyframe {
  return {
    time,
    properties: properties as Keyframe['properties'],
  };
}

/**
 * Normalize keyframes to have easing values
 */
export function normalizeKeyframes(
  keyframes: Keyframe[],
  defaultEasing: EasingType = 'linear'
): Keyframe[] {
  // Sort by time
  const sorted = [...keyframes].sort((a, b) => a.time - b.time);

  // Fill in easing for each keyframe
  return sorted.map((kf, index) => ({
    ...kf,
    easing: kf.easing ?? (index < sorted.length - 1 ? defaultEasing : undefined),
  }));
}

/**
 * Get the keyframe pair for a given time
 */
export function getKeyframePair(
  keyframes: Keyframe[],
  time: number
): { start: Keyframe; end: Keyframe | null; progress: number } {
  const sorted = normalizeKeyframes(keyframes);

  // Before first keyframe
  if (time <= sorted[0].time) {
    return { start: sorted[0], end: null, progress: 0 };
  }

  // After last keyframe
  if (time >= sorted[sorted.length - 1].time) {
    return { start: sorted[sorted.length - 1], end: null, progress: 1 };
  }

  // Find the pair
  for (let i = 0; i < sorted.length - 1; i++) {
    if (time >= sorted[i].time && time < sorted[i + 1].time) {
      const startTime = sorted[i].time;
      const endTime = sorted[i + 1].time;
      const progress = (time - startTime) / (endTime - startTime);

      return {
        start: sorted[i],
        end: sorted[i + 1],
        progress,
      };
    }
  }

  // Fallback
  return { start: sorted[0], end: null, progress: 0 };
}

/**
 * Validate animation configuration
 */
export function validateAnimationConfig(config: AnimationConfig): string[] {
  const errors: string[] = [];

  if (!config.targets || (Array.isArray(config.targets) && config.targets.length === 0)) {
    errors.push('Animation must have at least one target');
  }

  if (!config.keyframes || config.keyframes.length === 0) {
    errors.push('Animation must have at least one keyframe');
  }

  if (config.keyframes.length > 0) {
    const times = config.keyframes.map((kf) => kf.time);
    if (new Set(times).size !== times.length) {
      errors.push('Keyframes must have unique time values');
    }
  }

  return errors;
}

/**
 * Merge multiple animations targeting the same element
 */
export function mergeAnimations(
  animations: AnimationConfig[]
): AnimationConfig[] {
  const targetMap = new Map<string, AnimationConfig>();

  for (const anim of animations) {
    const targets = Array.isArray(anim.targets) ? anim.targets : [anim.targets];
    for (const target of targets) {
      const existing = targetMap.get(target);
      if (existing) {
        // Merge keyframes
        targetMap.set(target, {
          ...existing,
          keyframes: [...existing.keyframes, ...anim.keyframes].sort(
            (a, b) => a.time - b.time
          ),
        });
      } else {
        targetMap.set(target, { ...anim, targets: target });
      }
    }
  }

  return Array.from(targetMap.values());
}

/**
 * Calculate total duration from keyframes
 */
export function getAnimationDuration(keyframes: Keyframe[]): number {
  if (keyframes.length === 0) return 0;
  return Math.max(...keyframes.map((kf) => kf.time));
}

/**
 * Scale keyframes to fit a specific duration
 */
export function scaleKeyframes(keyframes: Keyframe[], scale: number): Keyframe[] {
  return keyframes.map((kf) => ({
    ...kf,
    time: kf.time * scale,
  }));
}

/**
 * Offset keyframe times
 */
export function offsetKeyframes(keyframes: Keyframe[], offset: number): Keyframe[] {
  return keyframes.map((kf) => ({
    ...kf,
    time: kf.time + offset,
  }));
}
