/**
 * LLM Prompt Templates for SVG Diagram Generation
 */

import { DiagramRequest, DiagramStyle } from '../types';

// ============================================================================
// System Prompt
// ============================================================================

export const DIAGRAM_GENERATION_SYSTEM_PROMPT = `
You are an expert SVG diagram generator. Given a description, you produce:

1. A well-structured SVG with semantic layer IDs
2. Animation configurations for the SVG Animation Pipeline

## SVG Guidelines:
- Use <g id="..."> for each logical layer/group
- Use semantic IDs: "header-layer", "flow-arrows", "node-container"
- Keep SVG clean: no inline styles where classes work
- Use viewBox for responsive sizing
- Include proper xmlns attribute
- Use descriptive comments for sections

## Animation Config Format:
Return a JSON object with:
{
  "svg": "<svg>...</svg>",
  "animations": [
    {
      "targets": "#element-id",
      "keyframes": [
        { "time": 0, "properties": { "opacity": 0 } },
        { "time": 1000, "properties": { "opacity": 1 } }
      ],
      "easing": "easeOutQuad"
    }
  ],
  "css": "optional @keyframes for native animations",
  "explanation": "Brief explanation of the diagram structure"
}

## Style Presets:
- ppt-flat: White background (#fafbfc), pastel colors, thin strokes (1.5-2px), rounded corners, system-ui font
- dark-tech: Dark background (#0f1117), neon accents (#6366f1, #10b981, #ec4899), glow effects
- academic: Clean white, serif fonts, minimal color, professional
- hand-drawn: Sketch style, rough strokes, playful colors

## Animation Properties Supported:
- opacity (0-1)
- transform: { translate: [x, y], rotate: degrees, scale: [x, y] }
- fill, stroke (colors)
- strokeDashoffset, strokeDasharray
- d (path morphing with { start, end })
- strokeWidth, fillOpacity, strokeOpacity

## Easing Functions Available:
linear, easeIn, easeOut, easeInOut, easeInQuad, easeOutQuad, easeInOutQuad,
easeInCubic, easeOutCubic, easeInOutCubic, easeInQuart, easeOutQuart, easeInOutQuart,
easeInQuint, easeOutQuint, easeInOutQuint, easeInSine, easeOutSine, easeInOutSine,
easeOutBack, easeOutElastic, elastic, bounce, spring

## Important:
- Always return valid JSON
- SVG must be complete and self-contained
- Animations should be smooth and professional
- Use appropriate easing for natural motion
- Consider timing - stagger animations for visual interest
`;

// ============================================================================
// User Prompt Builder
// ============================================================================

export function buildUserPrompt(request: DiagramRequest): string {
  const { description, style, animations, outputFormat, dimensions } = request;

  let prompt = `Generate an SVG diagram for: ${description}\n\n`;

  prompt += `Style: ${style || 'ppt-flat'}\n`;
  prompt += `Dimensions: ${dimensions?.width || 1400}x${dimensions?.height || 950}\n`;

  if (outputFormat) {
    prompt += `Output format: ${outputFormat}\n`;
  }

  if (animations && animations.length > 0) {
    prompt += `\nAnimation hints:\n`;
    for (const hint of animations) {
      prompt += `- Target: "${hint.target}", Effect: ${hint.effect}`;
      if (hint.timing) {
        prompt += `, Timing: ${hint.timing}`;
      }
      prompt += '\n';
    }
  }

  prompt += `\nPlease generate a complete SVG with animations in the specified JSON format.`;

  return prompt;
}

// ============================================================================
// Style-Specific Prompts
// ============================================================================

export const STYLE_DESCRIPTIONS: Record<DiagramStyle, string> = {
  'ppt-flat': `
PPT Flat Style:
- Background: White (#fafbfc)
- Colors: Soft pastel macaron palette (light blue #eef0ff, light green #eefbf5, light pink #fff0f6, light yellow #fffbf0)
- Strokes: Thin 1.5-2px, rounded linecaps
- Typography: system-ui, sans-serif, clean hierarchy
- Icons: Geometric, minimal, 2px stroke weight
- Spacing: Generous padding, clear visual hierarchy
- Effects: Subtle shadows, no heavy gradients
  `,
  'dark-tech': `
Dark Tech Style:
- Background: Near-black (#0f1117)
- Colors: Vibrant neon accents (indigo #6366f1, emerald #10b981, rose #ec4899, amber #f59e0b)
- Strokes: 2px with glow effects
- Typography: system-ui, white text, tech aesthetic
- Icons: Clean monoline, neon highlights
- Effects: Box shadows with neon glow, subtle gradients
  `,
  'academic': `
Academic Style:
- Background: Pure white
- Colors: Muted, professional (grays, blues, subtle accents)
- Strokes: 1-1.5px, clean lines
- Typography: Serif for headers, sans-serif for body
- Icons: Simple, functional, no decoration
- Spacing: Structured, grid-based layout
- Effects: Minimal, focus on clarity
  `,
  'hand-drawn': `
Hand-Drawn Style:
- Background: Off-white (#faf8f5)
- Colors: Warm, playful palette
- Strokes: Slightly rough, variable width
- Typography: Casual, friendly fonts
- Icons: Sketchy, organic shapes
- Effects: Paper texture feel, informal layout
  `,
};

// ============================================================================
// Diagram Type Templates
// ============================================================================

export const DIAGRAM_TEMPLATES = {
  flowchart: `
Flowchart Guidelines:
- Use rectangles for processes, diamonds for decisions
- Clear arrow flow from top to bottom or left to right
- Label all connections
- Use color coding for different process types
  `,
  architecture: `
Architecture Diagram Guidelines:
- Use layered boxes for components
- Show data flow with arrows
- Group related components in containers
- Use consistent iconography for component types
  `,
  sequence: `
Sequence Diagram Guidelines:
- Vertical lifelines for each actor/service
- Horizontal arrows for messages
- Group related interactions
- Show timing and ordering
  `,
  mindmap: `
Mind Map Guidelines:
- Central topic in the middle
- Branching structure outward
- Color code branches
- Use icons for visual interest
  `,
};
