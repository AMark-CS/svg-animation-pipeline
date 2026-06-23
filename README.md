# SVG Animation Pipeline

End-to-end SVG animation pipeline: layered SVG → procedural animation → frame rendering → GIF/video encoding.

## Features

- **SVG Parsing**: Load and parse SVG files, extract layered structure
- **Procedural Animation**: Declare animations with keyframes and easing functions
- **Frame Rendering**: Render frames using Puppeteer (headless Chrome)
- **Video Encoding**: Output to GIF (with palette optimization) or MP4/WebM via FFmpeg

## Installation

```bash
npm install
```

## Prerequisites

- Node.js 18+
- FFmpeg (installed automatically via `@ffmpeg-installer/ffmpeg`)

## Quick Start

```typescript
import { SVGAnimationPipeline } from 'svg-animation-pipeline';

const pipeline = new SVGAnimationPipeline({
  input: 'logo.svg',
  output: 'output.gif',
  fps: 30,
  duration: 2000,
  width: 800,
  height: 600,
});

pipeline.addAnimation({
  targets: '#stroke-layer',
  keyframes: [
    { time: 0, properties: { strokeDashoffset: 1000, opacity: 0 } },
    { time: 1000, properties: { strokeDashoffset: 0, opacity: 1 } },
  ],
  easing: 'easeInOutQuad',
});

pipeline.on('progress', (progress) => {
  console.log(`${progress.percent}% - ${progress.message}`);
});

await pipeline.render();
```

## API Reference

### SVGAnimationPipeline

```typescript
new SVGAnimationPipeline(config: PipelineConfig, events?: PipelineEvents)
```

#### Configuration

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `input` | `string` | required | Path to SVG file or SVG content string |
| `output` | `string` | required | Output file path (.gif, .mp4, .webm) |
| `fps` | `number` | 30 | Frames per second |
| `duration` | `number` | required | Animation duration in milliseconds |
| `width` | `number` | 800 | Render width in pixels |
| `height` | `number` | 600 | Render height in pixels |
| `background` | `string` | '#ffffff' | Background color |
| `quality` | `'low' \| 'medium' \| 'high'` | `'medium'` | Render quality |

#### Methods

- `addAnimation(config: AnimationConfig)` - Add an animation
- `addAnimations(configs: AnimationConfig[])` - Add multiple animations
- `setStyles(css: string)` - Inject CSS styles
- `on(event, handler)` - Register event handlers
- `render()` - Execute the pipeline
- `close()` - Close browser resources

#### AnimationConfig

```typescript
{
  targets: string | string[],   // CSS selectors for target elements
  keyframes: Keyframe[],        // Array of keyframes
  easing?: EasingType,          // Default easing for this animation
}
```

#### Keyframe

```typescript
{
  time: number,                  // Time in milliseconds
  properties: AnimatableProperties,
  easing?: EasingType,           // Easing for this segment
}
```

### Easing Functions

| Name | Description |
|------|-------------|
| `linear` | Constant speed |
| `easeIn`, `easeOut`, `easeInOut` | Basic ease |
| `easeInQuad`, `easeOutQuad`, `easeInOutQuad` | Quadratic |
| `easeInCubic`, `easeOutCubic`, `easeInOutCubic` | Cubic |
| `easeInQuart`, `easeOutQuart`, `easeInOutQuart` | Quartic |
| `easeInQuint`, `easeOutQuint`, `easeInOutQuint` | Quintic |
| `easeInSine`, `easeOutSine`, `easeInOutSine` | Sine |
| `elastic` | Elastic bounce |
| `bounce` | Bounce effect |
| `spring` | Spring effect |

### Animatable Properties

- `opacity` - Element opacity (0-1)
- `strokeDashoffset` - Stroke dash offset for draw-on effects
- `transform` - Transform (translate, rotate, scale, skew)
- `d` - Path morphing (requires `{ start, end }` format)
- `fill` / `stroke` - Colors (interpolated automatically)
- `strokeWidth`, `fillOpacity`, `strokeOpacity`

## Examples

### AI Agent Architecture
![Agent Architecture](./output/agent-architecture.gif)

### Run Example

```bash
npx ts-node examples/agent-architecture.ts
```

## Architecture

```
┌─────────────────┐     ┌─────────────────┐
│   SVG Loader    │────▶│    Validator    │
│   (分层解析)     │     │   (SVG校验)     │
└─────────────────┘     └────────┬────────┘
                                 │
                                 ▼
┌─────────────────┐     ┌─────────────────┐
│    Animator     │────▶│  State Computer │
│   (关键帧引擎)   │     │   (状态计算)    │
└─────────────────┘     └────────┬────────┘
                                 │
                                 ▼
┌─────────────────┐     ┌─────────────────┐
│  Puppeteer      │◀────│    Frame        │
│  Renderer       │     │    Generator    │
└────────┬────────┘     └─────────────────┘
         │
         ▼
┌─────────────────┐
│   GIF Encoder   │
│    (ffmpeg)     │
└─────────────────┘
```

## License

MIT
