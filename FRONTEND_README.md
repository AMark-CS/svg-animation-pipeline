# SVG Animation Pipeline - Frontend & Backend

## Architecture

```
Frontend (React + Vite)  →  Backend API (Express)  →  LLM (OpenAI/Anthropic)
         ↓                         ↓                         ↓
    Chat Interface           SVG Animation Pipeline      SVG + Animation Config
         ↓                         ↓
    SVG Preview              Puppeteer + FFmpeg
         ↓                         ↓
    Export Dialog            GIF / MP4 / WebM
```

## Quick Start

### 1. Install Dependencies

```bash
# Root project
npm install

# Server
cd server && npm install && cd ..

# Frontend
cd frontend && npm install && cd ..
```

### 2. Start Development Servers

```bash
# Terminal 1: Start Backend API
cd server && npm run dev

# Terminal 2: Start Frontend
cd frontend && npm run dev
```

### 3. Open Frontend

Open http://localhost:3000 in your browser.

## API Endpoints

### POST /api/diagram/preview
Generate SVG preview only (no rendering).

**Request:**
```json
{
  "description": "Create a flowchart showing user authentication",
  "style": "ppt-flat",
  "llmConfig": {
    "provider": "openai",
    "apiKey": "sk-..."
  }
}
```

**Response:**
```json
{
  "svg": "<svg>...</svg>",
  "animations": [...],
  "explanation": "Flowchart with...",
  "tokens": { "input": 150, "output": 500 }
}
```

### POST /api/diagram/generate
Generate and render diagram to GIF/MP4.

**Request:**
```json
{
  "description": "Create a flowchart showing user authentication",
  "style": "ppt-flat",
  "llmConfig": {
    "provider": "openai",
    "apiKey": "sk-..."
  },
  "outputConfig": {
    "output": "./output/auth-flow.gif",
    "fps": 30,
    "duration": 6000
  }
}
```

**Response:**
```json
{
  "jobId": "job-1234567890-abc123",
  "status": "queued",
  "message": "Diagram generation started"
}
```

### GET /api/diagram/status/:jobId
Get job status and progress.

### GET /api/diagram/download/:jobId
Download generated output file.

## Supported Styles

- **ppt-flat**: White background, pastel colors, thin strokes, rounded corners
- **dark-tech**: Dark background, neon accents, glow effects
- **academic**: Clean white, serif fonts, minimal color
- **hand-drawn**: Sketch style, rough strokes, playful colors

## Supported LLM Providers

- **OpenAI**: GPT-4o, GPT-4-turbo, etc.
- **Anthropic**: Claude 3.5 Sonnet, Claude 3 Opus, etc.

## Environment Variables

### Server
- `PORT`: Server port (default: 3001)
- `NODE_ENV`: Environment (development/production)

### Frontend
- `VITE_API_URL`: Backend API URL (default: http://localhost:3001)
