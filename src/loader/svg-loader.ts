/**
 * SVG Loader - Parse and extract layered structure from SVG files
 */

import * as fs from 'fs';
import * as path from 'path';
import { ParsedSVG, SVGLayer, SVGElementInfo } from '../types';
import { validateSVG } from '../validator/svg-validator';

/**
 * Load SVG from file path
 */
export async function loadSVG(filePath: string): Promise<ParsedSVG> {
  const absolutePath = path.resolve(filePath);

  if (!fs.existsSync(absolutePath)) {
    throw new Error(`SVG file not found: ${absolutePath}`);
  }

  const content = await fs.promises.readFile(absolutePath, 'utf-8');
  return parseSVG(content);
}

/**
 * Parse SVG string content
 */
export function parseSVG(content: string): ParsedSVG {
  // Validate first
  const errors = validateSVG(content);
  if (errors.length > 0) {
    console.warn('SVG validation warnings:', errors);
  }

  // Extract dimensions
  const dimensions = extractDimensions(content);

  // Extract layers (groups with id or class)
  const layers = extractLayers(content);

  return {
    width: dimensions.width,
    height: dimensions.height,
    viewBox: dimensions.viewBox,
    layers,
    raw: content,
  };
}

/**
 * Extract width, height, and viewBox from SVG
 */
function extractDimensions(svg: string): { width: number; height: number; viewBox?: string } {
  let width = 800;
  let height = 600;
  let viewBox: string | undefined;

  // Extract viewBox
  const viewBoxMatch = svg.match(/viewBox=["']([^"']+)["']/);
  if (viewBoxMatch) {
    viewBox = viewBoxMatch[1];
    const parts = viewBox.split(/\s+/).map(Number);
    if (parts.length === 4) {
      width = parts[2];
      height = parts[3];
    }
  }

  // Extract width/height attributes
  const widthMatch = svg.match(/width=["'](\d+(?:\.\d+)?)/);
  const heightMatch = svg.match(/height=["'](\d+(?:\.\d+)?)/);

  if (widthMatch) width = parseFloat(widthMatch[1]);
  if (heightMatch) height = parseFloat(heightMatch[1]);

  // Handle percentages or unitless values
  if (!width || isNaN(width)) width = 800;
  if (!height || isNaN(height)) height = 600;

  return { width, height, viewBox };
}

/**
 * Extract layers from SVG (groups with id or class)
 */
function extractLayers(svg: string): SVGLayer[] {
  const layers: SVGLayer[] = [];

  // Match <g> elements with id or class
  const groupRegex = /<g([^>]*)>([\s\S]*?)<\/g>/gi;
  let match;

  while ((match = groupRegex.exec(svg)) !== null) {
    const attributes = match[1];
    const children = match[2];

    const idMatch = attributes.match(/id=["']([^"']+)["']/);
    const classMatch = attributes.match(/class=["']([^"']+)["']/);

    if (idMatch || classMatch) {
      layers.push({
        id: idMatch?.[1],
        className: classMatch?.[1],
        element: match[0],
        children: parseElementChildren(children),
        attributes: parseAttributes(attributes),
      });
    }
  }

  // If no layers found, treat the whole SVG as one layer
  if (layers.length === 0) {
    layers.push({
      element: svg,
      children: [],
      attributes: {},
    });
  }

  return layers;
}

/**
 * Parse child elements from a group
 */
function parseElementChildren(content: string): SVGElementInfo[] {
  const children: SVGElementInfo[] = [];

  // Match self-closing and regular tags
  const tagRegex = /<(\w+)([^>]*)(?:\/>|>([\s\S]*?)<\/\1>)/gi;
  let match;

  while ((match = tagRegex.exec(content)) !== null) {
    const tag = match[1];
    const attrs = match[2];
    const innerContent = match[3];

    children.push({
      tag,
      attributes: parseAttributes(attrs),
      content: innerContent?.trim(),
      children: innerContent ? parseElementChildren(innerContent) : undefined,
    });
  }

  return children;
}

/**
 * Parse attributes string into key-value object
 */
function parseAttributes(attrString: string): Record<string, string> {
  const attrs: Record<string, string> = {};

  const attrRegex = /(\w+(?:-\w+)*)=["']([^"']*)["']/g;
  let match;

  while ((match = attrRegex.exec(attrString)) !== null) {
    attrs[match[1]] = match[2];
  }

  return attrs;
}

/**
 * Filter layers by id or class name
 */
export function filterLayers(
  svg: ParsedSVG,
  filter: { id?: string | string[]; class?: string | string[] }
): SVGLayer[] {
  const ids = filter.id ? (Array.isArray(filter.id) ? filter.id : [filter.id]) : null;
  const classes = filter.class ? (Array.isArray(filter.class) ? filter.class : [filter.class]) : null;

  return svg.layers.filter((layer) => {
    if (ids && layer.id && ids.includes(layer.id)) return true;
    if (classes && layer.className && classes.some((c) => layer.className?.includes(c))) return true;
    return !ids && !classes;
  });
}

/**
 * Get SVG as string with only specified layers
 */
export function extractLayersSVG(svg: ParsedSVG, layerIds: string[]): string {
  const selectedLayers = svg.layers.filter((l) => l.id && layerIds.includes(l.id));
  return wrapInSVGDocument(svg, selectedLayers);
}

/**
 * Wrap layers in a complete SVG document
 */
function wrapInSVGDocument(svg: ParsedSVG, layers: SVGLayer[]): string {
  const widthAttr = svg.width ? `width="${svg.width}"` : '';
  const heightAttr = svg.height ? `height="${svg.height}"` : '';
  const viewBoxAttr = svg.viewBox ? `viewBox="${svg.viewBox}"` : '';

  const layersContent = layers.map((l) => l.element).join('\n');

  return `<svg xmlns="http://www.w3.org/2000/svg" ${widthAttr} ${heightAttr} ${viewBoxAttr}>
${layersContent}
</svg>`;
}

/**
 * Find element by selector within SVG
 */
export function findElement(svg: ParsedSVG, selector: string): SVGElementInfo | null {
  const { id, class: className, tag } = parseSelector(selector);

  for (const layer of svg.layers) {
    const found = findInChildren(layer.children, { id, class: className, tag });
    if (found) return found;
  }

  return null;
}

function parseSelector(selector: string): { id?: string; class?: string; tag?: string } {
  const result: { id?: string; class?: string; tag?: string } = {};

  // ID selector: #id
  const idMatch = selector.match(/#([^\s.[:]+)/);
  if (idMatch) result.id = idMatch[1];

  // Class selector: .class
  const classMatch = selector.match(/\.([^\s#[:]+)/);
  if (classMatch) result.class = classMatch[1];

  // Tag selector: tag or tag#id.class
  const tagMatch = selector.match(/^([a-zA-Z][a-zA-Z0-9]*)/);
  if (tagMatch) result.tag = tagMatch[1];

  return result;
}

function findInChildren(
  children: SVGElementInfo[],
  criteria: { id?: string; class?: string; tag?: string }
): SVGElementInfo | null {
  for (const child of children) {
    if (criteria.id && child.attributes.id === criteria.id) return child;
    if (criteria.class && child.attributes.class?.includes(criteria.class)) return child;
    if (criteria.tag && child.tag === criteria.tag) return child;

    if (child.children) {
      const found = findInChildren(child.children, criteria);
      if (found) return found;
    }
  }
  return null;
}
