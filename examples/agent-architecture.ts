/**
 * Example: AI Agent Architecture Diagram
 *
 * Visualizes an AI Agent system with:
 * - Agent Core (Planning, Memory, Tools)
 * - LLM Integration
 * - Tool System
 * - Data Flow Animation
 */

import { SVGAnimationPipeline } from '../src/pipeline';
import { ProgressInfo } from '../src/types';

const svgContent = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 900 600" width="900" height="600">
  <defs>
    <!-- Gradients -->
    <linearGradient id="bgGradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#0a0a1a;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#1a1a3a;stop-opacity:1" />
    </linearGradient>

    <linearGradient id="agentGradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#6366f1;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#8b5cf6;stop-opacity:1" />
    </linearGradient>

    <linearGradient id="llmGradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#f59e0b;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#f97316;stop-opacity:1" />
    </linearGradient>

    <linearGradient id="memoryGradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#06b6d4;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#22d3ee;stop-opacity:1" />
    </linearGradient>

    <linearGradient id="toolsGradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#10b981;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#34d399;stop-opacity:1" />
    </linearGradient>

    <linearGradient id="toolItemGradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#1e3a5f;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#0f172a;stop-opacity:1" />
    </linearGradient>

    <linearGradient id="outputGradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#ec4899;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#f472b6;stop-opacity:1" />
    </linearGradient>

    <!-- Glow Filter -->
    <filter id="glow" x="-50%" y="-50%" width="200%" height="200%">
      <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
      <feMerge>
        <feMergeNode in="coloredBlur"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>

    <filter id="softGlow" x="-50%" y="-50%" width="200%" height="200%">
      <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
      <feMerge>
        <feMergeNode in="coloredBlur"/>
        <feMergeNode in="SourceGraphic"/>
      </feMerge>
    </filter>

    <!-- Arrow Marker -->
    <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
      <polygon points="0 0, 10 3.5, 0 7" fill="#64748b"/>
    </marker>

    <marker id="arrowheadActive" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
      <polygon points="0 0, 10 3.5, 0 7" fill="#8b5cf6"/>
    </marker>
  </defs>

  <!-- Background -->
  <rect width="100%" height="100%" fill="url(#bgGradient)"/>

  <!-- Grid Pattern -->
  <g opacity="0.1">
    <pattern id="grid" width="30" height="30" patternUnits="userSpaceOnUse">
      <path d="M 30 0 L 0 0 0 30" fill="none" stroke="#64748b" stroke-width="0.5"/>
    </pattern>
    <rect width="100%" height="100%" fill="url(#grid)"/>
  </g>

  <!-- ==================== TITLE ==================== -->
  <g id="title-group">
    <text x="450" y="45" text-anchor="middle" fill="#f8fafc" font-family="system-ui, sans-serif" font-size="24" font-weight="600">
      AI Agent Architecture
    </text>
    <text x="450" y="70" text-anchor="middle" fill="#94a3b8" font-family="system-ui, sans-serif" font-size="12">
      Autonomous Decision Making System
    </text>
  </g>

  <!-- ==================== USER INPUT ==================== -->
  <g id="user-input">
    <rect x="50" y="120" width="140" height="50" rx="8" fill="#1e293b" stroke="#475569" stroke-width="1.5"/>
    <text x="120" y="140" text-anchor="middle" fill="#e2e8f0" font-family="system-ui, sans-serif" font-size="11" font-weight="500">USER INPUT</text>
    <text x="120" y="158" text-anchor="middle" fill="#94a3b8" font-family="monospace" font-size="9">Task Request</text>
  </g>

  <!-- ==================== AGENT CORE ==================== -->
  <g id="agent-core">
    <!-- Main Container -->
    <rect id="agent-bg" x="300" y="100" width="300" height="200" rx="16" fill="#1e1b4b" stroke="url(#agentGradient)" stroke-width="2" filter="url(#softGlow)"/>

    <!-- Title -->
    <text x="450" y="130" text-anchor="middle" fill="#c4b5fd" font-family="system-ui, sans-serif" font-size="14" font-weight="600">AGENT CORE</text>

    <!-- Planning Module -->
    <g id="planning-module">
      <rect x="320" y="145" width="80" height="60" rx="8" fill="url(#agentGradient)" filter="url(#softGlow)"/>
      <text x="360" y="168" text-anchor="middle" fill="#ffffff" font-family="system-ui, sans-serif" font-size="10" font-weight="600">PLANNING</text>
      <text x="360" y="182" text-anchor="middle" fill="#e0e7ff" font-family="system-ui, sans-serif" font-size="8">Task Analysis</text>
      <text x="360" y="194" text-anchor="middle" fill="#e0e7ff" font-family="system-ui, sans-serif" font-size="8">Strategy</text>
    </g>

    <!-- Memory Module -->
    <g id="memory-module">
      <rect x="410" y="145" width="80" height="60" rx="8" fill="url(#memoryGradient)" filter="url(#softGlow)"/>
      <text x="450" y="168" text-anchor="middle" fill="#ffffff" font-family="system-ui, sans-serif" font-size="10" font-weight="600">MEMORY</text>
      <text x="450" y="182" text-anchor="middle" fill="#cffafe" font-family="system-ui, sans-serif" font-size="8">Context</text>
      <text x="450" y="194" text-anchor="middle" fill="#cffafe" font-family="system-ui, sans-serif" font-size="8">History</text>
    </g>

    <!-- Tools Module -->
    <g id="tools-module">
      <rect x="500" y="145" width="80" height="60" rx="8" fill="url(#toolsGradient)" filter="url(#softGlow)"/>
      <text x="540" y="168" text-anchor="middle" fill="#ffffff" font-family="system-ui, sans-serif" font-size="10" font-weight="600">TOOLS</text>
      <text x="540" y="182" text-anchor="middle" fill="#d1fae5" font-family="system-ui, sans-serif" font-size="8">Plugin</text>
      <text x="540" y="194" text-anchor="middle" fill="#d1fae5" font-family="system-ui, sans-serif" font-size="8">Execution</text>
    </g>

    <!-- Decision Output -->
    <g id="decision-module">
      <rect x="360" y="220" width="180" height="60" rx="8" fill="#312e81" stroke="#6366f1" stroke-width="1.5"/>
      <text x="450" y="245" text-anchor="middle" fill="#c4b5fd" font-family="system-ui, sans-serif" font-size="10" font-weight="600">ACTION DECISION</text>
      <text id="action-text" x="450" y="265" text-anchor="middle" fill="#a5b4fc" font-family="monospace" font-size="9">Waiting for input...</text>
    </g>
  </g>

  <!-- ==================== LLM ==================== -->
  <g id="llm-section">
    <rect id="llm-bg" x="350" y="340" width="200" height="70" rx="12" fill="url(#llmGradient)" filter="url(#glow)"/>
    <text x="450" y="368" text-anchor="middle" fill="#ffffff" font-family="system-ui, sans-serif" font-size="16" font-weight="700">LLM</text>
    <text x="450" y="390" text-anchor="middle" fill="#fef3c7" font-family="system-ui, sans-serif" font-size="10">Large Language Model</text>
  </g>

  <!-- ==================== TOOLS LIST ==================== -->
  <g id="tools-section">
    <rect x="700" y="100" width="160" height="200" rx="12" fill="#064e3b" stroke="#10b981" stroke-width="1.5"/>
    <text x="780" y="130" text-anchor="middle" fill="#6ee7b7" font-family="system-ui, sans-serif" font-size="12" font-weight="600">AVAILABLE TOOLS</text>

    <!-- Tool Items -->
    <g id="tool-1">
      <rect x="715" y="145" width="130" height="35" rx="6" fill="url(#toolItemGradient)" stroke="#059669" stroke-width="1"/>
      <text x="780" y="165" text-anchor="middle" fill="#a7f3d0" font-family="system-ui, sans-serif" font-size="9" font-weight="500">🔍 Web Search</text>
    </g>

    <g id="tool-2">
      <rect x="715" y="190" width="130" height="35" rx="6" fill="url(#toolItemGradient)" stroke="#059669" stroke-width="1"/>
      <text x="780" y="210" text-anchor="middle" fill="#a7f3d0" font-family="system-ui, sans-serif" font-size="9" font-weight="500">💻 Code Runner</text>
    </g>

    <g id="tool-3">
      <rect x="715" y="235" width="130" height="35" rx="6" fill="url(#toolItemGradient)" stroke="#059669" stroke-width="1"/>
      <text x="780" y="255" text-anchor="middle" fill="#a7f3d0" font-family="system-ui, sans-serif" font-size="9" font-weight="500">📄 File System</text>
    </g>
  </g>

  <!-- ==================== OUTPUT ==================== -->
  <g id="output-section">
    <rect x="350" y="450" width="200" height="70" rx="12" fill="url(#outputGradient)" filter="url(#glow)"/>
    <text x="450" y="480" text-anchor="middle" fill="#ffffff" font-family="system-ui, sans-serif" font-size="14" font-weight="600">RESPONSE</text>
    <text x="450" y="500" text-anchor="middle" fill="#fce7f3" font-family="system-ui, sans-serif" font-size="10">Final Output</text>
  </g>

  <!-- ==================== CONNECTION LINES ==================== -->
  <g id="connections" stroke-width="2" fill="none">
    <!-- User to Agent -->
    <path id="line-user-agent" d="M 190 145 L 300 150" stroke="#64748b" marker-end="url(#arrowhead)" opacity="0.6"/>

    <!-- Agent to LLM -->
    <path id="line-agent-llm" d="M 450 300 L 450 340" stroke="#64748b" marker-end="url(#arrowhead)" opacity="0.6"/>

    <!-- Agent to Tools -->
    <path id="line-agent-tools" d="M 600 200 L 700 200" stroke="#64748b" marker-end="url(#arrowhead)" opacity="0.6"/>

    <!-- LLM to Output -->
    <path id="line-llm-output" d="M 450 410 L 450 450" stroke="#64748b" marker-end="url(#arrowhead)" opacity="0.6"/>
  </g>

  <!-- ==================== DATA FLOW PARTICLES ==================== -->
  <g id="particles">
    <!-- Will be animated -->
    <circle id="particle-1" r="4" fill="#8b5cf6" filter="url(#glow)" opacity="0"/>
    <circle id="particle-2" r="4" fill="#f59e0b" filter="url(#glow)" opacity="0"/>
    <circle id="particle-3" r="4" fill="#10b981" filter="url(#glow)" opacity="0"/>
    <circle id="particle-4" r="4" fill="#ec4899" filter="url(#glow)" opacity="0"/>
  </g>

  <!-- ==================== LEGEND ==================== -->
  <g id="legend" transform="translate(50, 500)">
    <rect width="180" height="80" rx="8" fill="#1e293b" stroke="#334155" stroke-width="1"/>
    <text x="15" y="20" fill="#94a3b8" font-family="system-ui, sans-serif" font-size="9" font-weight="600">DATA FLOW</text>

    <circle cx="25" cy="40" r="6" fill="#8b5cf6"/>
    <text x="40" y="44" fill="#cbd5e1" font-family="system-ui, sans-serif" font-size="9">User → Agent</text>

    <circle cx="25" cy="60" r="6" fill="#f59e0b"/>
    <text x="40" y="64" fill="#cbd5e1" font-family="system-ui, sans-serif" font-size="9">Agent → LLM</text>
  </g>
</svg>
`;

async function main() {
  console.log('Starting Agent Architecture animation...\n');

  const pipeline = new SVGAnimationPipeline({
    input: svgContent,
    output: './output/agent-architecture.gif',
    fps: 30,
    duration: 6000,
    width: 900,
    height: 600,
    background: '#0a0a1a',
    quality: 'high',
  });

  // 1. Fade in title
  pipeline.addAnimation({
    targets: '#title-group',
    keyframes: [
      { time: 0, properties: { opacity: 0 } },
      { time: 500, properties: { opacity: 1 } },
      { time: 5500, properties: { opacity: 1 } },
      { time: 6000, properties: { opacity: 0 } },
    ],
    easing: 'easeOutQuad',
  });

  // 2. User input appears
  pipeline.addAnimation({
    targets: '#user-input',
    keyframes: [
      { time: 500, properties: { opacity: 0, transform: { translate: [-20, 0] } } },
      { time: 1000, properties: { opacity: 1, transform: { translate: [0, 0] } } },
    ],
    easing: 'easeOutQuad',
  });

  // 3. Agent core fades in
  pipeline.addAnimation({
    targets: '#agent-bg',
    keyframes: [
      { time: 800, properties: { opacity: 0 } },
      { time: 1300, properties: { opacity: 1 } },
    ],
    easing: 'easeOutQuad',
  });

  // 4. Planning module
  pipeline.addAnimation({
    targets: '#planning-module',
    keyframes: [
      { time: 1300, properties: { opacity: 0, transform: { scale: 0.8 } } },
      { time: 1800, properties: { opacity: 1, transform: { scale: 1 } } },
    ],
    easing: 'easeOutBack',
  });

  // 5. Memory module
  pipeline.addAnimation({
    targets: '#memory-module',
    keyframes: [
      { time: 1500, properties: { opacity: 0, transform: { scale: 0.8 } } },
      { time: 2000, properties: { opacity: 1, transform: { scale: 1 } } },
    ],
    easing: 'easeOutBack',
  });

  // 6. Tools module
  pipeline.addAnimation({
    targets: '#tools-module',
    keyframes: [
      { time: 1700, properties: { opacity: 0, transform: { scale: 0.8 } } },
      { time: 2200, properties: { opacity: 1, transform: { scale: 1 } } },
    ],
    easing: 'easeOutBack',
  });

  // 7. Decision module
  pipeline.addAnimation({
    targets: '#decision-module',
    keyframes: [
      { time: 2200, properties: { opacity: 0 } },
      { time: 2700, properties: { opacity: 1 } },
    ],
    easing: 'easeOutQuad',
  });

  // 8. LLM section
  pipeline.addAnimation({
    targets: '#llm-bg',
    keyframes: [
      { time: 2700, properties: { opacity: 0, transform: { scale: 0.9 } } },
      { time: 3200, properties: { opacity: 1, transform: { scale: 1 } } },
    ],
    easing: 'easeOutElastic',
  });

  // 9. Tools section
  pipeline.addAnimation({
    targets: '#tools-section',
    keyframes: [
      { time: 2700, properties: { opacity: 0, transform: { translate: [30, 0] } } },
      { time: 3200, properties: { opacity: 1, transform: { translate: [0, 0] } } },
    ],
    easing: 'easeOutQuad',
  });

  // 10. Tool items staggered
  pipeline.addAnimation({
    targets: '#tool-1',
    keyframes: [
      { time: 3200, properties: { opacity: 0 } },
      { time: 3500, properties: { opacity: 1 } },
    ],
    easing: 'easeOutQuad',
  });

  pipeline.addAnimation({
    targets: '#tool-2',
    keyframes: [
      { time: 3400, properties: { opacity: 0 } },
      { time: 3700, properties: { opacity: 1 } },
    ],
    easing: 'easeOutQuad',
  });

  pipeline.addAnimation({
    targets: '#tool-3',
    keyframes: [
      { time: 3600, properties: { opacity: 0 } },
      { time: 3900, properties: { opacity: 1 } },
    ],
    easing: 'easeOutQuad',
  });

  // 11. Output section
  pipeline.addAnimation({
    targets: '#output-section',
    keyframes: [
      { time: 3900, properties: { opacity: 0, transform: { translate: [0, 20] } } },
      { time: 4400, properties: { opacity: 1, transform: { translate: [0, 0] } } },
    ],
    easing: 'easeOutQuad',
  });

  // 12. Connection lines animate in
  pipeline.addAnimation({
    targets: '#line-user-agent',
    keyframes: [
      { time: 1000, properties: { opacity: 0 } },
      { time: 1500, properties: { opacity: 0.8 } },
    ],
    easing: 'easeOutQuad',
  });

  pipeline.addAnimation({
    targets: '#line-agent-llm',
    keyframes: [
      { time: 2700, properties: { opacity: 0 } },
      { time: 3000, properties: { opacity: 0.8 } },
    ],
    easing: 'easeOutQuad',
  });

  pipeline.addAnimation({
    targets: '#line-agent-tools',
    keyframes: [
      { time: 2700, properties: { opacity: 0 } },
      { time: 3000, properties: { opacity: 0.8 } },
    ],
    easing: 'easeOutQuad',
  });

  pipeline.addAnimation({
    targets: '#line-llm-output',
    keyframes: [
      { time: 3900, properties: { opacity: 0 } },
      { time: 4200, properties: { opacity: 0.8 } },
    ],
    easing: 'easeOutQuad',
  });

  // 13. Legend
  pipeline.addAnimation({
    targets: '#legend',
    keyframes: [
      { time: 4400, properties: { opacity: 0 } },
      { time: 4900, properties: { opacity: 1 } },
      { time: 5500, properties: { opacity: 1 } },
      { time: 6000, properties: { opacity: 0 } },
    ],
    easing: 'easeOutQuad',
  });

  // 14. Pulse effect on Agent Core (continuous)
  pipeline.addAnimation({
    targets: '#agent-bg',
    keyframes: [
      { time: 3000, properties: { strokeDashoffset: 0 } },
      { time: 3500, properties: { strokeDashoffset: 50 } },
      { time: 4000, properties: { strokeDashoffset: 0 } },
      { time: 4500, properties: { strokeDashoffset: 50 } },
      { time: 5000, properties: { strokeDashoffset: 0 } },
    ],
    easing: 'easeInOutQuad',
  });

  // 15. LLM pulse
  pipeline.addAnimation({
    targets: '#llm-bg',
    keyframes: [
      { time: 3200, properties: { opacity: 1 } },
      { time: 3700, properties: { opacity: 0.7 } },
      { time: 4200, properties: { opacity: 1 } },
      { time: 4700, properties: { opacity: 0.7 } },
      { time: 5200, properties: { opacity: 1 } },
    ],
    easing: 'easeInOutSine',
  });

  // Progress callback
  pipeline.on('progress', (progress: ProgressInfo) => {
    const bar = '█'.repeat(Math.floor(progress.percent / 5)) + '░'.repeat(20 - Math.floor(progress.percent / 5));
    process.stdout.write(`\r[${bar}] ${progress.percent}% ${progress.message || ''}`);
  });

  const result = await pipeline.render();

  console.log('\n\n✅ Render complete!');
  console.log(`   Output: ${result.output}`);
  console.log(`   Frames: ${result.frames}`);
  console.log(`   Duration: ${result.duration.toFixed(2)}s`);
}

main().catch(console.error);
