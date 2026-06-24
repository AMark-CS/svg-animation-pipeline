/**
 * SVG Validator - Validate SVG content and check for compatibility
 */

export interface ValidationError {
  line?: number;
  message: string;
  severity: 'error' | 'warning';
}

const SUPPORTED_ELEMENTS = [
  'svg', 'g', 'path', 'rect', 'circle', 'ellipse', 'line', 'polyline', 'polygon',
  'text', 'tspan', 'defs', 'use', 'symbol', 'clipPath', 'mask', 'linearGradient',
  'radialGradient', 'stop', 'filter', 'feGaussianBlur', 'feOffset', 'feBlend',
  'feColorMatrix', 'feMerge', 'image', 'style', 'title', 'desc',
];

const ANIMATABLE_ATTRIBUTES = [
  'opacity', 'fill', 'stroke', 'stroke-width', 'stroke-dashoffset', 'stroke-dasharray',
  'fill-opacity', 'stroke-opacity', 'transform', 'd', 'x', 'y', 'width', 'height',
  'r', 'rx', 'ry', 'cx', 'cy', 'points', 'offset',
];

const UNSUPPORTED_FEATURES = [
  { pattern: /foreignObject/gi, message: 'foreignObject is not fully supported' },
  { pattern: /script/gi, message: 'Script elements are removed for security' },
  { pattern: /onclick|onload|onerror|onmouse/gi, message: 'Event handlers are removed' },
  { pattern: /xlink:href=["']http/gi, message: 'External resource references are not supported' },
];

/**
 * Validate SVG content and return errors/warnings
 */
export function validateSVG(svg: string): ValidationError[] {
  const errors: ValidationError[] = [];

  // Basic structure check
  if (!svg.includes('<svg')) {
    errors.push({ message: 'Missing <svg> root element', severity: 'error' });
    return errors;
  }

  // Check for unsupported features
  for (const feature of UNSUPPORTED_FEATURES) {
    if (feature.pattern.test(svg)) {
      errors.push({ message: feature.message, severity: 'warning' });
    }
  }

  // Check for unsupported elements
  const elementMatches = svg.match(/<(\w+)/g) || [];
  const uniqueElements = [...new Set(elementMatches.map((m) => m.slice(1)))];

  for (const element of uniqueElements) {
    if (!SUPPORTED_ELEMENTS.includes(element.toLowerCase())) {
      errors.push({
        message: `Element <${element}> may not be fully supported`,
        severity: 'warning',
      });
    }
  }

  // Check for external references
  if (/href=["']http|src=["']http|xlink:href=["']http/gi.test(svg)) {
    errors.push({
      message: 'External HTTP references will be blocked',
      severity: 'warning',
    });
  }

  // Check for animation attributes that need special handling
  if (/animateTransform|animateMotion|animateColor/gi.test(svg)) {
    errors.push({
      message: 'SMIL animations detected - these will be replaced by programmatic animation',
      severity: 'warning',
    });
  }

  // Check for potential issues with stroke-dasharray/dashoffset
  if (/stroke-dasharray|stroke-dashoffset/gi.test(svg)) {
    errors.push({
      message: 'stroke-dasharray/dashoffset found - ensure path has explicit stroke-dasharray',
      severity: 'warning',
    });
  }

  return errors;
}

/**
 * Sanitize SVG for rendering (remove scripts, event handlers, etc.)
 */
export function sanitizeSVG(svg: string): string {
  let sanitized = svg;

  // Remove script tags and content
  sanitized = sanitized.replace(/<script[\s\S]*?<\/script>/gi, '');

  // Remove event handlers
  sanitized = sanitized.replace(/\s+on\w+=["'][^"']*["']/gi, '');

  // Remove external references (keep only data URIs)
  sanitized = sanitized.replace(/\s+(href|src|xlink:href)=["']http[^"']*["']/gi, '');

  // Remove use elements with external references
  sanitized = sanitized.replace(/<use[^>]*href=["'][^"']*["'][^>]*>/gi, (match) => {
    if (match.includes('http')) return '';
    return match;
  });

  return sanitized;
}

/**
 * Check if SVG has animations defined
 */
export function hasSMILAnimation(svg: string): boolean {
  return /<animateTransform|<animateMotion|<animateColor|<animate[^>]*>/gi.test(svg);
}

/**
 * Extract animation-related elements for later processing
 */
export function extractAnimationElements(svg: string): {
  smilAnimations: string[];
  cssAnimations: string[];
} {
  // Extract SMIL animations
  const smilRegex = /<animate[^>]*>|<\/animate>|<animateTransform[^>]*>|<\/animateTransform>|<animateMotion[^>]*>|<\/animateMotion>/gi;
  const smilAnimations = svg.match(smilRegex) || [];

  // Extract CSS animations
  const styleBlocks = svg.match(/<style[^>]*>[\s\S]*?<\/style>/gi) || [];
  const cssKeyframesRegex = /@keyframes\s+[\w-]+\s*\{[\s\S]*?\}/gi;
  const cssAnimations = [
    ...(svg.match(cssKeyframesRegex) || []),
    ...styleBlocks.flatMap((block) => [...(block.match(/@keyframes\s+[\w-]+\s*\{[\s\S]*?\}/gi) || [])]),
  ];

  return { smilAnimations, cssAnimations };
}

/**
 * Prepare SVG for rendering
 *
 * @param svg - Raw SVG content
 * @param animations - Programmatic animation configs (keyframe-based)
 * @param preserveNativeAnimations - If true, keeps CSS @keyframes and SMIL animations
 *                                    (use when rendering SVG-native animated diagrams)
 */
export function prepareForAnimation(
  svg: string,
  animations: { targets: string; properties: string[] }[],
  preserveNativeAnimations: boolean = false
): string {
  let prepared = sanitizeSVG(svg);

  if (preserveNativeAnimations) {
    // Keep all native SVG animations (CSS @keyframes + SMIL)
    // for SVG-native animation workflows
    return prepared;
  }

  // Remove SMIL animations (they conflict with programmatic approach)
  prepared = prepared.replace(/<animate[^>]*>|<\/animate>|<animateTransform[^>]*>|<\/animateTransform>|<animateMotion[^>]*>|<\/animateMotion>/gi, '');

  // Remove CSS @keyframes from style tags (programmatic animation handles them)
  prepared = prepared.replace(/<style[^>]*>[\s\S]*?<\/style>/gi, (match) => {
    return match.replace(/@keyframes\s+[\w-]+\s*\{[\s\S]*?\}/gi, '');
  });

  return prepared;
}
