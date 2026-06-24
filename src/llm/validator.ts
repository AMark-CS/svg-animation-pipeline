/**
 * LLM Output Validator
 *
 * Validates LLM-generated SVG and animation configs
 */

import { ValidationResult, ParsedLLMOutput } from './types';
import { validateSVG } from '../validator/svg-validator';
import { validateAnimationConfig } from '../animator/keyframe';

// ============================================================================
// Validate LLM Output
// ============================================================================

export function validateLLMOutput(output: ParsedLLMOutput): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  // Validate SVG
  const svgValidation = validateSVG(output.svg);
  for (const error of svgValidation) {
    if (error.severity === 'error') {
      errors.push(`SVG: ${error.message}`);
    } else {
      warnings.push(`SVG: ${error.message}`);
    }
  }

  // Validate animations
  if (!output.animations || output.animations.length === 0) {
    warnings.push('No animations defined');
  } else {
    for (let i = 0; i < output.animations.length; i++) {
      const animErrors = validateAnimationConfig(output.animations[i]);
      for (const error of animErrors) {
        errors.push(`Animation ${i}: ${error}`);
      }
    }
  }

  // Validate CSS if present
  if (output.css) {
    // Basic CSS validation - check for syntax errors
    if (output.css.includes('{') && !output.css.includes('}')) {
      errors.push('CSS: Unclosed braces detected');
    }
  }

  return {
    valid: errors.length === 0,
    errors,
    warnings: warnings.length > 0 ? warnings : undefined,
  };
}

// ============================================================================
// Validate SVG Structure
// ============================================================================

export function validateSVGStructure(svg: string): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  // Check for required SVG tag
  if (!svg.includes('<svg')) {
    errors.push('Missing <svg> root element');
  }

  // Check for viewBox
  if (!svg.includes('viewBox')) {
    warnings.push('SVG missing viewBox attribute - may not scale properly');
  }

  // Check for xmlns
  if (!svg.includes('xmlns="http://www.w3.org/2000/svg"')) {
    warnings.push('SVG missing xmlns attribute');
  }

  // Check for semantic IDs
  const idMatches = svg.match(/id="([^"]+)"/g) || [];
  if (idMatches.length === 0) {
    warnings.push('SVG has no element IDs - animations may not target elements correctly');
  }

  // Check for <g> groups
  const groupMatches = svg.match(/<g[^>]*>/g) || [];
  if (groupMatches.length === 0) {
    warnings.push('SVG has no <g> groups - consider grouping related elements');
  }

  return {
    valid: errors.length === 0,
    errors,
    warnings: warnings.length > 0 ? warnings : undefined,
  };
}

// ============================================================================
// Validate Animation Targets Exist in SVG
// ============================================================================

export function validateAnimationTargets(svg: string, animations: { targets: string | string[] }[]): ValidationResult {
  const errors: string[] = [];
  const warnings: string[] = [];

  // Extract all IDs from SVG
  const idMatches = svg.match(/id="([^"]+)"/g) || [];
  const svgIds = new Set(idMatches.map(m => m.match(/id="([^"]+)"/)?.[1]).filter(Boolean));

  // Extract all classes from SVG
  const classMatches = svg.match(/class="([^"]+)"/g) || [];
  const svgClasses = new Set(
    classMatches.flatMap(m => {
      const match = m.match(/class="([^"]+)"/);
      return match ? match[1].split(/\s+/) : [];
    })
  );

  // Check each animation target
  for (let i = 0; i < animations.length; i++) {
    const targets = Array.isArray(animations[i].targets) ? animations[i].targets : [animations[i].targets];

    for (const target of targets) {
      if (typeof target === 'string' && target.startsWith('#')) {
        // ID selector
        const id = target.substring(1);
        if (!svgIds.has(id)) {
          warnings.push(`Animation ${i}: Target ID "${id}" not found in SVG`);
        }
      } else if (typeof target === 'string' && target.startsWith('.')) {
        // Class selector
        const className = target.substring(1);
        if (!svgClasses.has(className)) {
          warnings.push(`Animation ${i}: Target class "${className}" not found in SVG`);
        }
      }
    }
  }

  return {
    valid: errors.length === 0,
    errors,
    warnings: warnings.length > 0 ? warnings : undefined,
  };
}
