# SVG Animation Pipeline

端到端 SVG 动画流水线：**自然语言描述 → LLM 生成 SVG → 程序化动画 → 按帧渲染 → FFmpeg 合成**

![Agent Loop](./output/agent-loop.gif)

## 核心特性

- **LLM 智能生成**：支持 OpenAI/Anthropic API，自然语言描述自动生成 SVG 动画
- **SVG 分层解析**：提取图层结构，校验兼容性
- **程序化动画**：关键帧引擎，24 种缓动函数，变换/颜色/路径插值
- **按帧渲染**：Puppeteer 无头浏览器逐帧渲染，DOM 元素缓存优化
- **FFmpeg 合成**：输出 GIF（调色板优化）、MP4 或 WebM
- **前端界面**：React + Vite 可视化编辑器，实时预览

## 快速开始

### 安装

```bash
# 主项目
npm install

# 后端 API
cd server && npm install && cd ..

# 前端界面
cd frontend && npm install && cd ..
```

### 环境要求

- Node.js 18+
- FFmpeg（通过 `@ffmpeg-installer/ffmpeg` 自动安装）
- OpenAI 或 Anthropic API Key

### 启动

```bash
# 终端 1：启动后端 API
cd server && npm run dev

# 终端 2：启动前端界面
cd frontend && npm run dev

# 访问 http://localhost:3000
```

## 使用方式

### 方式 1：LLM 自动生成（推荐）

```typescript
import { SVGAnimationPipeline } from 'svg-animation-pipeline';

const result = await SVGAnimationPipeline.fromDescription({
  description: '创建一个用户认证流程图，包含登录、验证、授权三个步骤',
  style: 'ppt-flat',
  llmConfig: {
    provider: 'openai',  // 或 'anthropic'
    apiKey: 'sk-...',
  },
  outputConfig: {
    output: './output/auth-flow.gif',
    fps: 30,
    duration: 6000,
  },
});

console.log('Output:', result.output);
console.log('Frames:', result.frames);
```

### 方式 2：手动定义动画

```typescript
import { SVGAnimationPipeline } from 'svg-animation-pipeline';

const pipeline = new SVGAnimationPipeline({
  input: 'logo.svg',  // 或 SVG 内容字符串
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

### 方式 3：LLM 单独调用

```typescript
import { LLMOrchestrator } from 'svg-animation-pipeline';

const orchestrator = new LLMOrchestrator({
  provider: 'openai',
  apiKey: 'sk-...',
});

const result = await orchestrator.generateDiagram({
  description: '系统架构图，展示微服务之间的调用关系',
  style: 'ppt-flat',
  dimensions: { width: 1400, height: 950 },
});

console.log('SVG:', result.svg);
console.log('Animations:', result.animations);
```

## 支持的样式

| 样式 | 描述 | 适用场景 |
|------|------|----------|
| `ppt-flat` | 白色背景，马卡龙配色，细线条，圆角 | 商务 PPT、技术文档 |
| `dark-tech` | 深色背景，霓虹色，发光效果 | 技术演示、黑客风格 |
| `academic` | 纯白背景，衬线字体，专业风格 | 学术论文、研究报告 |
| `hand-drawn` | 手绘风格，粗线条，活泼配色 | 教学材料、创意展示 |

## 支持的 LLM 提供商

| 提供商 | 模型 | 说明 |
|--------|------|------|
| OpenAI | GPT-4o, GPT-4-turbo | 推荐 GPT-4o |
| Anthropic | Claude 3.5 Sonnet, Claude 3 Opus | 推荐 Claude 3.5 Sonnet |

## API 参考

### SVGAnimationPipeline

```typescript
new SVGAnimationPipeline(config: PipelineConfig, events?: PipelineEvents)
```

#### 配置项

| 选项 | 类型 | 默认值 | 描述 |
|------|------|--------|------|
| `input` | `string` | 必填 | SVG 文件路径或 SVG 内容字符串 |
| `output` | `string` | 必填 | 输出文件路径 (.gif, .mp4, .webm) |
| `fps` | `number` | 30 | 帧率 |
| `duration` | `number` | 必填 | 动画时长（毫秒） |
| `width` | `number` | 800 | 渲染宽度（像素） |
| `height` | `number` | 600 | 渲染高度（像素） |
| `background` | `string` | '#ffffff' | 背景颜色 |
| `quality` | `'low' \| 'medium' \| 'high'` | `'medium'` | 渲染质量 |
| `preserveNativeAnimations` | `boolean` | false | 保留 CSS/SMIL 动画 |

#### 方法

- `addAnimation(config)` - 添加动画配置
- `addAnimations(configs)` - 批量添加动画
- `setStyles(css)` - 注入 CSS 样式
- `on(event, handler)` - 注册事件处理器
- `render()` - 执行渲染流水线
- `getLayers()` - 获取 SVG 图层
- `getParsedSVG()` - 获取 SVG 元数据
- `close()` - 关闭浏览器资源

#### 静态方法

- `SVGAnimationPipeline.fromDescription(request)` - LLM 自动生成并渲染

### AnimationConfig

```typescript
{
  targets: string | string[],   // CSS 选择器
  keyframes: Keyframe[],        // 关键帧数组
  easing?: EasingType,          // 缓动函数
}
```

### Keyframe

```typescript
{
  time: number,                  // 时间（毫秒）
  properties: AnimatableProperties,
  easing?: EasingType,
}
```

### 缓动函数

| 名称 | 描述 |
|------|------|
| `linear` | 匀速 |
| `easeIn`, `easeOut`, `easeInOut` | 基础缓动 |
| `easeInQuad` ~ `easeInOutQuint` | 二次到五次缓动 |
| `easeInSine` ~ `easeInOutSine` | 正弦缓动 |
| `elastic`, `easeOutElastic` | 弹性缓动 |
| `bounce` | 弹跳缓动 |
| `spring` | 弹簧缓动 |

### 可动画属性

- `opacity` - 透明度 (0-1)
- `strokeDashoffset` / `strokeDasharray` - 描边动画
- `transform` - 变换 (translate, rotate, scale, skew)
- `d` - 路径形变 `{ start, end }`
- `fill` / `stroke` - 颜色（自动插值）
- `strokeWidth`, `fillOpacity`, `strokeOpacity`

## 流水线架构

```
┌─────────────────────────────────────────────────────────────────┐
│  Phase 1: 分层 (SVG Layering)                                   │
│  ┌──────────────┐    ┌──────────────┐    ┌──────────────────┐   │
│  │  SVG Loader  │───▶│  Validator   │───▶│  Layer Parser    │   │
│  └──────────────┘    └──────────────┘    └──────────────────┘   │
│                                                                  │
│  Phase 2: 动画 (Procedural Animation)                            │
│  ┌──────────────┐    ┌──────────────┐    ┌──────────────────┐   │
│  │   Keyframe   │───▶│  Interpolator│───▶│  Element Cache   │   │
│  └──────────────┘    └──────────────┘    └──────────────────┘   │
│                                                                  │
│  Phase 3: 渲染 (Per-Frame Rendering)                             │
│  ┌──────────────┐    ┌──────────────┐    ┌──────────────────┐   │
│  │  State       │───▶│  Puppeteer   │───▶│  Frame Buffer    │   │
│  │  Compute     │    │  Canvas      │    │  (PNG 输出)       │   │
│  └──────────────┘    └──────────────┘    └──────────────────┘   │
│                                                                  │
│  Phase 4: 合成 (FFmpeg Encoding)                                 │
│  ┌──────────────┐    ┌──────────────┐    ┌──────────────────┐   │
│  │  Frame Seq   │───▶│   FFmpeg     │───▶│  GIF / MP4 /     │   │
│  └──────────────┘    └──────────────┘    └──────────────────┘   │
└─────────────────────────────────────────────────────────────────┘
```

## 前端界面

### 功能

- 💬 聊天界面描述图表
- 👁️ 实时 SVG 预览
- ⚙️ API Key 配置
- 📊 生成状态显示

### 启动

```bash
# 后端 API (端口 3001)
cd server && npm run dev

# 前端界面 (端口 3000)
cd frontend && npm run dev
```

访问 http://localhost:3000

详见 [FRONTEND_README.md](./FRONTEND_README.md)

## 后端 API

### 端点

| 方法 | 路径 | 描述 |
|------|------|------|
| POST | `/api/diagram/preview` | 生成 SVG 预览（不渲染） |
| POST | `/api/diagram/generate` | 完整渲染（异步任务） |
| GET | `/api/diagram/status/:jobId` | 查询任务状态 |
| GET | `/api/diagram/download/:jobId` | 下载输出文件 |

### 示例请求

```bash
# 生成预览
curl -X POST http://localhost:3001/api/diagram/preview \
  -H "Content-Type: application/json" \
  -d '{
    "description": "用户登录流程图",
    "style": "ppt-flat",
    "llmConfig": {
      "provider": "openai",
      "apiKey": "sk-..."
    }
  }'
```

## 运行示例

```bash
# Agent Loop 架构图
npx ts-node examples/agent-loop.ts

# 分层视差场景
npx ts-node examples/layered-scene.ts

# 路径描边动画
npx ts-node examples/basic-path.ts

# 路径形变动画
npx ts-node examples/morph-demo.ts
```

## 项目结构

```
svg-animation-pipeline/
├── src/                          # 核心库
│   ├── index.ts                  # 主导出
│   ├── types.ts                  # 类型定义
│   ├── pipeline.ts               # 流水线主类
│   ├── llm/                      # LLM 集成
│   │   ├── index.ts              # LLMOrchestrator
│   │   ├── types.ts              # LLM 类型
│   │   ├── parser.ts             # 输出解析器
│   │   ├── validator.ts          # 验证器
│   │   ├── prompts/              # 提示词模板
│   │   └── providers/            # LLM 提供商
│   ├── animator/                 # 动画引擎
│   ├── renderer/                 # Puppeteer 渲染器
│   ├── encoder/                  # FFmpeg 编码器
│   ├── loader/                   # SVG 加载器
│   └── validator/                # SVG 验证器
├── server/                       # 后端 API
│   ├── index.ts                  # Express 服务器
│   └── routes/                   # API 路由
├── frontend/                     # 前端界面
│   └── src/
│       ├── App.tsx               # 主应用
│       └── components/           # React 组件
├── examples/                     # 示例文件
└── output/                       # 输出目录
```

## License

MIT
