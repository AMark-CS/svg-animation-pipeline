# SVG Animation Pipeline

端到端 SVG 动画流水线：**SVG 分层 → 程序化动画 → 按帧渲染 → FFmpeg 合成**

## Features

- **SVG 分层解析**：加载 SVG 文件，提取图层结构，校验兼容性
- **程序化动画**：关键帧引擎，支持 24 种缓动函数，变换/颜色/路径插值
- **按帧渲染**：Puppeteer 无头浏览器逐帧渲染，DOM 元素缓存优化
- **FFmpeg 合成**：输出 GIF（调色板优化）、MP4 或 WebM
- **LLM 集成**：支持 OpenAI/Anthropic API，自然语言描述生成 SVG 动画
- **前端界面**：React + Vite 构建的可视化编辑器

## Installation

```bash
npm install
```

## Prerequisites

- Node.js 18+
- FFmpeg（通过 `@ffmpeg-installer/ffmpeg` 自动安装）
- OpenAI 或 Anthropic API Key（用于 LLM 集成）

## Quick Start

### 基础用法

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

### LLM 集成用法

```typescript
import { SVGAnimationPipeline } from 'svg-animation-pipeline';

const result = await SVGAnimationPipeline.fromDescription({
  description: '创建一个用户认证流程图',
  style: 'ppt-flat',
  llmConfig: {
    provider: 'openai',
    apiKey: 'sk-...',
  },
  outputConfig: {
    output: './output/auth-flow.gif',
    fps: 30,
    duration: 6000,
  },
});

console.log('Output:', result.output);
```

## API Reference

### SVGAnimationPipeline

```typescript
new SVGAnimationPipeline(config: PipelineConfig, events?: PipelineEvents)
```

#### Configuration

| Option | Type | Default | Description |
|--------|------|---------|-------------|
| `input` | `string` | required | SVG 文件路径或 SVG 内容字符串 |
| `output` | `string` | required | 输出文件路径 (.gif, .mp4, .webm) |
| `fps` | `number` | 30 | 帧率 (Frames per second) |
| `duration` | `number` | required | 动画时长 (毫秒) |
| `width` | `number` | 800 | 渲染宽度 (像素) |
| `height` | `number` | 600 | 渲染高度 (像素) |
| `background` | `string` | '#ffffff' | 背景颜色 |
| `quality` | `'low' \| 'medium' \| 'high'` | `'medium'` | 渲染质量 |

#### Methods

- `addAnimation(config: AnimationConfig)` - 添加一个动画
- `addAnimations(configs: AnimationConfig[])` - 批量添加动画
- `setStyles(css: string)` - 注入 CSS 样式
- `on(event, handler)` - 注册事件处理器
- `render()` - 执行流水线
- `getLayers()` - 获取解析后的 SVG 图层
- `getParsedSVG()` - 获取解析后的 SVG 元数据
- `close()` - 关闭浏览器资源

#### AnimationConfig

```typescript
{
  targets: string | string[],   // 目标元素的 CSS 选择器
  keyframes: Keyframe[],        // 关键帧数组
  easing?: EasingType,          // 默认缓动函数
}
```

#### Keyframe

```typescript
{
  time: number,                  // 时间 (毫秒)
  properties: AnimatableProperties,
  easing?: EasingType,           // 该段的缓动函数
}
```

### Easing Functions

| 名称 | 描述 |
|------|------|
| `linear` | 匀速 |
| `easeIn`, `easeOut`, `easeInOut` | 基础缓动 |
| `easeInQuad`, `easeOutQuad`, `easeInOutQuad` | 二次缓动 |
| `easeInCubic`, `easeOutCubic`, `easeInOutCubic` | 三次缓动 |
| `easeInQuart`, `easeOutQuart`, `easeInOutQuart` | 四次缓动 |
| `easeInQuint`, `easeOutQuint`, `easeInOutQuint` | 五次缓动 |
| `easeInSine`, `easeOutSine`, `easeInOutSine` | 正弦缓动 |
| `elastic`, `easeOutElastic` | 弹性缓动 |
| `bounce` | 弹跳缓动 |
| `spring` | 弹簧缓动 |

### Animatable Properties

- `opacity` - 元素透明度 (0-1)
- `strokeDashoffset` / `strokeDasharray` - 描边动画（绘制效果）
- `transform` - 变换 (translate, rotate, scale, skew)
- `d` - 路径形变 (需要 `{ start, end }` 格式)
- `fill` / `stroke` - 颜色 (自动插值)
- `strokeWidth`, `fillOpacity`, `strokeOpacity`

## 流水线架构

```
┌──────────────────────────────────────────────────────────────────┐
│  Phase 1: 分层 (SVG Layering)                                    │
│  ┌──────────────┐    ┌──────────────┐    ┌──────────────────┐    │
│  │  SVG Loader  │───▶│  Validator   │───▶│  Layer Parser    │    │
│  │  (文件加载)   │    │  (SVG校验)   │    │  (图层提取)       │    │
│  └──────────────┘    └──────────────┘    └──────────────────┘    │
│                                                                   │
│  Phase 2: 动画 (Procedural Animation)                             │
│  ┌──────────────┐    ┌──────────────┐    ┌──────────────────┐    │
│  │   Keyframe   │───▶│  Interpolator│───▶│  Element Cache   │    │
│  │   (关键帧)    │    │  (插值计算)   │    │  (DOM元素缓存)    │    │
│  └──────────────┘    └──────────────┘    └──────────────────┘    │
│                                                                   │
│  Phase 3: 渲染 (Per-Frame Rendering)                              │
│  ┌──────────────┐    ┌──────────────┐    ┌──────────────────┐    │
│  │  State       │───▶│  Puppeteer   │───▶│  Frame Buffer    │    │
│  │  Compute     │    │  Canvas      │    │  (PNG输出)        │    │
│  └──────────────┘    └──────────────┘    └──────────────────┘    │
│                                                                   │
│  Phase 4: 合成 (FFmpeg Encoding)                                  │
│  ┌──────────────┐    ┌──────────────┐    ┌──────────────────┐    │
│  │  Frame Seq   │───▶│   FFmpeg     │───▶│  GIF / MP4 /     │    │
│  │  (帧序列)     │    │  (编码合成)   │    │  WebM Output     │    │
│  └──────────────┘    └──────────────┘    └──────────────────┘    │
└──────────────────────────────────────────────────────────────────┘
```

## LLM 集成

### 支持的 LLM 提供商

- **OpenAI**: GPT-4o, GPT-4-turbo
- **Anthropic**: Claude 3.5 Sonnet, Claude 3 Opus

### 支持的样式

- **ppt-flat**: 白色背景，马卡龙配色，细线条，圆角
- **dark-tech**: 深色背景，霓虹色，发光效果
- **academic**: 纯白背景，衬线字体，专业风格
- **hand-drawn**: 手绘风格，粗线条，活泼配色

### 使用示例

```typescript
import { LLMOrchestrator } from 'svg-animation-pipeline';

const orchestrator = new LLMOrchestrator({
  provider: 'openai',
  apiKey: 'sk-...',
});

const result = await orchestrator.generateDiagram({
  description: '创建一个系统架构图',
  style: 'ppt-flat',
  dimensions: { width: 1400, height: 950 },
});

console.log('SVG:', result.svg);
console.log('Animations:', result.animations);
```

## 前端界面

### 启动开发服务器

```bash
# 启动后端 API
cd server && npm run dev

# 启动前端
cd frontend && npm run dev
```

### 功能

- 聊天界面描述图表
- 实时 SVG 预览
- 动画时间线编辑
- 导出 GIF/MP4/WebM

详见 [FRONTEND_README.md](./FRONTEND_README.md)

## Examples

### Agent Loop Mechanism
![Agent Loop](./output/agent-loop.gif)

### Run Examples

```bash
npx ts-node examples/agent-loop.ts
npx ts-node examples/layered-scene.ts
npx ts-node examples/basic-path.ts
npx ts-node examples/morph-demo.ts
```

## License

MIT