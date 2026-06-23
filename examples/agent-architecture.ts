/**
 * Example: AI Agent Architecture Diagram
 */

import { SVGAnimationPipeline } from '../src/pipeline';
import { ProgressInfo } from '../src/types';

const svgContent = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 700" width="1200" height="700">
  <defs>
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

    <linearGradient id="outputGradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#ec4899;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#f472b6;stop-opacity:1" />
    </linearGradient>

    <linearGradient id="envGradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#8b5cf6;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#a78bfa;stop-opacity:1" />
    </linearGradient>

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

    <marker id="arrowPurple" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
      <polygon points="0 0, 8 3, 0 6" fill="#8b5cf6"/>
    </marker>

    <marker id="arrowOrange" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
      <polygon points="0 0, 8 3, 0 6" fill="#f59e0b"/>
    </marker>

    <marker id="arrowGreen" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
      <polygon points="0 0, 8 3, 0 6" fill="#10b981"/>
    </marker>

    <marker id="arrowPink" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
      <polygon points="0 0, 8 3, 0 6" fill="#ec4899"/>
    </marker>
  </defs>

  <!-- Background -->
  <rect width="100%" height="100%" fill="url(#bgGradient)"/>

  <!-- Grid -->
  <g opacity="0.08">
    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#64748b" stroke-width="0.5"/>
    </pattern>
    <rect width="100%" height="100%" fill="url(#grid)"/>
  </g>

  <!-- TITLE -->
  <g id="title-group">
    <text x="600" y="45" text-anchor="middle" fill="#f8fafc" font-family="system-ui, sans-serif" font-size="28" font-weight="700">AI Agent Architecture</text>
    <text x="600" y="70" text-anchor="middle" fill="#94a3b8" font-family="system-ui, sans-serif" font-size="12">Autonomous Decision Making System</text>
  </g>

  <!-- USER INPUT (Left) -->
  <g id="user-input">
    <rect x="40" y="130" width="150" height="60" rx="10" fill="#1e293b" stroke="#475569" stroke-width="2"/>
    <text x="115" y="158" text-anchor="middle" fill="#e2e8f0" font-family="system-ui, sans-serif" font-size="13" font-weight="600">USER INPUT</text>
    <text x="115" y="175" text-anchor="middle" fill="#94a3b8" font-family="monospace" font-size="10">Task Request</text>
  </g>

  <!-- AGENT CORE (Center) -->
  <g id="agent-core">
    <rect id="agent-bg" x="340" y="110" width="360" height="220" rx="16" fill="#1e1b4b" stroke="url(#agentGradient)" stroke-width="2.5" filter="url(#softGlow)"/>
    <text x="520" y="140" text-anchor="middle" fill="#c4b5fd" font-family="system-ui, sans-serif" font-size="16" font-weight="700">AGENT CORE</text>

    <!-- Planning -->
    <g id="planning-module">
      <rect x="360" y="160" width="85" height="65" rx="8" fill="url(#agentGradient)" filter="url(#softGlow)"/>
      <text x="402" y="188" text-anchor="middle" fill="#fff" font-family="system-ui, sans-serif" font-size="11" font-weight="700">PLANNING</text>
      <text x="402" y="205" text-anchor="middle" fill="#e0e7ff" font-family="system-ui, sans-serif" font-size="9">Task Analysis</text>
    </g>

    <!-- Memory -->
    <g id="memory-module">
      <rect x="460" y="160" width="85" height="65" rx="8" fill="url(#memoryGradient)" filter="url(#softGlow)"/>
      <text x="502" y="188" text-anchor="middle" fill="#fff" font-family="system-ui, sans-serif" font-size="11" font-weight="700">MEMORY</text>
      <text x="502" y="205" text-anchor="middle" fill="#cffafe" font-family="system-ui, sans-serif" font-size="9">Context</text>
    </g>

    <!-- Tools Module -->
    <g id="tools-module">
      <rect x="560" y="160" width="85" height="65" rx="8" fill="url(#toolsGradient)" filter="url(#softGlow)"/>
      <text x="602" y="188" text-anchor="middle" fill="#fff" font-family="system-ui, sans-serif" font-size="11" font-weight="700">TOOLS</text>
      <text x="602" y="205" text-anchor="middle" fill="#d1fae5" font-family="system-ui, sans-serif" font-size="9">Plugin</text>
    </g>

    <!-- Reflection -->
    <g id="reflection-module">
      <rect x="360" y="245" width="85" height="65" rx="8" fill="url(#envGradient)" filter="url(#softGlow)"/>
      <text x="402" y="273" text-anchor="middle" fill="#fff" font-family="system-ui, sans-serif" font-size="11" font-weight="700">REFLECT</text>
      <text x="402" y="290" text-anchor="middle" fill="#e0e7ff" font-family="system-ui, sans-serif" font-size="9">Self-Eval</text>
    </g>

    <!-- Decision -->
    <g id="decision-module">
      <rect x="460" y="245" width="185" height="65" rx="8" fill="#312e81" stroke="#6366f1" stroke-width="1.5"/>
      <text x="552" y="273" text-anchor="middle" fill="#c4b5fd" font-family="system-ui, sans-serif" font-size="11" font-weight="700">ACTION DECISION</text>
      <text id="action-text" x="552" y="295" text-anchor="middle" fill="#a5b4fc" font-family="monospace" font-size="10">Processing...</text>
    </g>
  </g>

  <!-- LLM (Bottom Center) -->
  <g id="llm-section">
    <rect id="llm-bg" x="420" y="390" width="200" height="70" rx="12" fill="url(#llmGradient)" filter="url(#glow)"/>
    <text x="520" y="422" text-anchor="middle" fill="#fff" font-family="system-ui, sans-serif" font-size="20" font-weight="800">LLM</text>
    <text x="520" y="445" text-anchor="middle" fill="#fef3c7" font-family="system-ui, sans-serif" font-size="11">Large Language Model</text>
  </g>

  <!-- TOOLS LIST (Right) -->
  <g id="tools-section">
    <rect x="780" y="110" width="180" height="220" rx="12" fill="#064e3b" stroke="#10b981" stroke-width="1.5"/>
    <text x="870" y="140" text-anchor="middle" fill="#6ee7b7" font-family="system-ui, sans-serif" font-size="13" font-weight="700">TOOLS</text>

    <g id="tool-1">
      <rect x="795" y="160" width="150" height="40" rx="6" fill="#1e3a5f" stroke="#059669" stroke-width="1"/>
      <text x="870" y="185" text-anchor="middle" fill="#a7f3d0" font-family="system-ui, sans-serif" font-size="11" font-weight="500">Web Search</text>
    </g>

    <g id="tool-2">
      <rect x="795" y="210" width="150" height="40" rx="6" fill="#1e3a5f" stroke="#059669" stroke-width="1"/>
      <text x="870" y="235" text-anchor="middle" fill="#a7f3d0" font-family="system-ui, sans-serif" font-size="11" font-weight="500">Code Runner</text>
    </g>

    <g id="tool-3">
      <rect x="795" y="260" width="150" height="40" rx="6" fill="#1e3a5f" stroke="#059669" stroke-width="1"/>
      <text x="870" y="285" text-anchor="middle" fill="#a7f3d0" font-family="system-ui, sans-serif" font-size="11" font-weight="500">File System</text>
    </g>
  </g>

  <!-- ENVIRONMENT (Bottom Left) -->
  <g id="env-section">
    <rect x="40" y="390" width="160" height="90" rx="10" fill="#4c1d95" stroke="#8b5cf6" stroke-width="1.5"/>
    <text x="120" y="420" text-anchor="middle" fill="#c4b5fd" font-family="system-ui, sans-serif" font-size="13" font-weight="700">ENVIRONMENT</text>
    <text x="120" y="445" text-anchor="middle" fill="#a78bfa" font-family="system-ui, sans-serif" font-size="10">Real-time Data</text>
    <text x="120" y="462" text-anchor="middle" fill="#a78bfa" font-family="system-ui, sans-serif" font-size="10">External APIs</text>
  </g>

  <!-- OUTPUT (Bottom Center Right) -->
  <g id="output-section">
    <rect x="420" y="500" width="200" height="70" rx="12" fill="url(#outputGradient)" filter="url(#glow)"/>
    <text x="520" y="535" text-anchor="middle" fill="#fff" font-family="system-ui, sans-serif" font-size="16" font-weight="700">RESPONSE</text>
    <text x="520" y="555" text-anchor="middle" fill="#fce7f3" font-family="system-ui, sans-serif" font-size="11">Final Output</text>
  </g>

  <!-- LEGEND (Bottom Right) -->
  <g id="legend">
    <rect x="700" y="500" width="200" height="100" rx="10" fill="#1e293b" stroke="#334155" stroke-width="1"/>
    <text x="715" y="525" fill="#94a3b8" font-family="system-ui, sans-serif" font-size="10" font-weight="700">DATA FLOW</text>

    <line x1="715" y1="545" x2="745" y2="545" stroke="#8b5cf6" stroke-width="2"/>
    <text x="755" y="549" fill="#cbd5e1" font-family="system-ui, sans-serif" font-size="10">User Input</text>

    <line x1="715" y1="570" x2="745" y2="570" stroke="#f59e0b" stroke-width="2"/>
    <text x="755" y="574" fill="#cbd5e1" font-family="system-ui, sans-serif" font-size="10">LLM Process</text>

    <line x1="715" y1="595" x2="745" y2="595" stroke="#10b981" stroke-width="2"/>
    <text x="755" y="599" fill="#cbd5e1" font-family="system-ui, sans-serif" font-size="10">Tool Calls</text>
  </g>

  <!-- CONNECTION LINES -->
  <g id="connections" stroke-width="2" fill="none">
    <path id="line-user-agent" d="M 190 160 L 340 180" stroke="#8b5cf6" marker-end="url(#arrowPurple)" opacity="0"/>
    <path id="line-agent-llm" d="M 520 330 L 520 390" stroke="#f59e0b" marker-end="url(#arrowOrange)" opacity="0"/>
    <path id="line-agent-tools" d="M 700 195 L 780 200" stroke="#10b981" marker-end="url(#arrowGreen)" opacity="0"/>
    <path id="line-tools-agent" d="M 780 280 L 700 290" stroke="#10b981" marker-end="url(#arrowGreen)" opacity="0"/>
    <path id="line-llm-output" d="M 520 460 L 520 500" stroke="#ec4899" marker-end="url(#arrowPink)" opacity="0"/>
    <path id="line-env-agent" d="M 200 420 L 340 280" stroke="#8b5cf6" marker-end="url(#arrowPurple)" opacity="0"/>
  </g>
</svg>
`;

async function main() {
  console.log('Starting Agent Architecture animation...\n');

  const pipeline = new SVGAnimationPipeline({
    input: svgContent,
    output: './output/agent-architecture.gif',
    fps: 30,
    duration: 4500,
    width: 1200,
    height: 700,
    background: '#0a0a1a',
    quality: 'high',
  });

  // Title
  pipeline.addAnimation({
    targets: '#title-group',
    keyframes: [
      { time: 0, properties: { opacity: 0 } },
      { time: 300, properties: { opacity: 1 } },
      { time: 4200, properties: { opacity: 1 } },
      { time: 4500, properties: { opacity: 0 } },
    ],
    easing: 'easeOutQuad',
  });

  // User input
  pipeline.addAnimation({
    targets: '#user-input',
    keyframes: [
      { time: 200, properties: { opacity: 0, transform: { translate: [-30, 0] } } },
      { time: 500, properties: { opacity: 1, transform: { translate: [0, 0] } } },
    ],
    easing: 'easeOutQuad',
  });

  // Agent core
  pipeline.addAnimation({
    targets: '#agent-bg',
    keyframes: [
      { time: 400, properties: { opacity: 0 } },
      { time: 700, properties: { opacity: 1 } },
    ],
    easing: 'easeOutQuad',
  });

  // Modules with stagger
  pipeline.addAnimation({
    targets: '#planning-module',
    keyframes: [
      { time: 700, properties: { opacity: 0, transform: { scale: 0.8 } } },
      { time: 1000, properties: { opacity: 1, transform: { scale: 1 } } },
    ],
    easing: 'easeOutBack',
  });

  pipeline.addAnimation({
    targets: '#memory-module',
    keyframes: [
      { time: 850, properties: { opacity: 0, transform: { scale: 0.8 } } },
      { time: 1150, properties: { opacity: 1, transform: { scale: 1 } } },
    ],
    easing: 'easeOutBack',
  });

  pipeline.addAnimation({
    targets: '#tools-module',
    keyframes: [
      { time: 1000, properties: { opacity: 0, transform: { scale: 0.8 } } },
      { time: 1300, properties: { opacity: 1, transform: { scale: 1 } } },
    ],
    easing: 'easeOutBack',
  });

  pipeline.addAnimation({
    targets: '#reflection-module',
    keyframes: [
      { time: 1150, properties: { opacity: 0, transform: { scale: 0.8 } } },
      { time: 1450, properties: { opacity: 1, transform: { scale: 1 } } },
    ],
    easing: 'easeOutBack',
  });

  pipeline.addAnimation({
    targets: '#decision-module',
    keyframes: [
      { time: 1300, properties: { opacity: 0 } },
      { time: 1600, properties: { opacity: 1 } },
    ],
    easing: 'easeOutQuad',
  });

  // LLM
  pipeline.addAnimation({
    targets: '#llm-bg',
    keyframes: [
      { time: 1600, properties: { opacity: 0, transform: { scale: 0.9 } } },
      { time: 1900, properties: { opacity: 1, transform: { scale: 1 } } },
    ],
    easing: 'easeOutElastic',
  });

  // Tools section
  pipeline.addAnimation({
    targets: '#tools-section',
    keyframes: [
      { time: 1600, properties: { opacity: 0, transform: { translate: [30, 0] } } },
      { time: 1900, properties: { opacity: 1, transform: { translate: [0, 0] } } },
    ],
    easing: 'easeOutQuad',
  });

  // Tool items
  pipeline.addAnimation({ targets: '#tool-1', keyframes: [{ time: 1900, properties: { opacity: 0 } }, { time: 2100, properties: { opacity: 1 } }], easing: 'easeOutQuad' });
  pipeline.addAnimation({ targets: '#tool-2', keyframes: [{ time: 2050, properties: { opacity: 0 } }, { time: 2250, properties: { opacity: 1 } }], easing: 'easeOutQuad' });
  pipeline.addAnimation({ targets: '#tool-3', keyframes: [{ time: 2200, properties: { opacity: 0 } }, { time: 2400, properties: { opacity: 1 } }], easing: 'easeOutQuad' });

  // Environment
  pipeline.addAnimation({
    targets: '#env-section',
    keyframes: [
      { time: 1700, properties: { opacity: 0, transform: { translate: [-20, 0] } } },
      { time: 2000, properties: { opacity: 1, transform: { translate: [0, 0] } } },
    ],
    easing: 'easeOutQuad',
  });

  // Output
  pipeline.addAnimation({
    targets: '#output-section',
    keyframes: [
      { time: 2500, properties: { opacity: 0, transform: { translate: [0, 20] } } },
      { time: 2800, properties: { opacity: 1, transform: { translate: [0, 0] } } },
    ],
    easing: 'easeOutQuad',
  });

  // Legend
  pipeline.addAnimation({
    targets: '#legend',
    keyframes: [
      { time: 2800, properties: { opacity: 0 } },
      { time: 3100, properties: { opacity: 1 } },
      { time: 4200, properties: { opacity: 1 } },
      { time: 4500, properties: { opacity: 0 } },
    ],
    easing: 'easeOutQuad',
  });

  // Connection lines
  pipeline.addAnimation({
    targets: '#line-user-agent',
    keyframes: [
      { time: 500, properties: { opacity: 0 } },
      { time: 800, properties: { opacity: 0.8 } },
    ],
    easing: 'easeOutQuad',
  });

  pipeline.addAnimation({
    targets: '#line-agent-llm',
    keyframes: [
      { time: 1600, properties: { opacity: 0 } },
      { time: 1850, properties: { opacity: 0.9 } },
    ],
    easing: 'easeOutQuad',
  });

  pipeline.addAnimation({
    targets: '#line-agent-tools',
    keyframes: [
      { time: 1600, properties: { opacity: 0 } },
      { time: 1850, properties: { opacity: 0.9 } },
    ],
    easing: 'easeOutQuad',
  });

  pipeline.addAnimation({
    targets: '#line-tools-agent',
    keyframes: [
      { time: 1900, properties: { opacity: 0 } },
      { time: 2150, properties: { opacity: 0.6 } },
    ],
    easing: 'easeOutQuad',
  });

  pipeline.addAnimation({
    targets: '#line-llm-output',
    keyframes: [
      { time: 2500, properties: { opacity: 0 } },
      { time: 2750, properties: { opacity: 0.9 } },
    ],
    easing: 'easeOutQuad',
  });

  pipeline.addAnimation({
    targets: '#line-env-agent',
    keyframes: [
      { time: 2000, properties: { opacity: 0 } },
      { time: 2250, properties: { opacity: 0.7 } },
    ],
    easing: 'easeOutQuad',
  });

  // Pulse effects
  pipeline.addAnimation({
    targets: '#agent-bg',
    keyframes: [
      { time: 2000, properties: { opacity: 1 } },
      { time: 2250, properties: { opacity: 0.7 } },
      { time: 2500, properties: { opacity: 1 } },
    ],
    easing: 'easeInOutSine',
  });

  pipeline.addAnimation({
    targets: '#llm-bg',
    keyframes: [
      { time: 1900, properties: { opacity: 1 } },
      { time: 2150, properties: { opacity: 0.7 } },
      { time: 2400, properties: { opacity: 1 } },
    ],
    easing: 'easeInOutSine',
  });

  pipeline.on('progress', (progress: ProgressInfo) => {
    const bar = '█'.repeat(Math.floor(progress.percent / 5)) + '░'.repeat(20 - Math.floor(progress.percent / 5));
    process.stdout.write(`\r[${bar}] ${progress.percent}% ${progress.message || ''}`);
  });

  const result = await pipeline.render();

  console.log('\n\n✅ Render complete!');
  console.log(`   Output: ${result.output}`);
  console.log(`   Frames: ${result.frames}`);
}

main().catch(console.error);
