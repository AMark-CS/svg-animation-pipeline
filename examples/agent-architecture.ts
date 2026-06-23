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
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1200 800" width="1200" height="800">
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

    <linearGradient id="envGradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#8b5cf6;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#a78bfa;stop-opacity:1" />
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

    <marker id="arrowheadPurple" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
      <polygon points="0 0, 10 3.5, 0 7" fill="#8b5cf6"/>
    </marker>

    <marker id="arrowheadOrange" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
      <polygon points="0 0, 10 3.5, 0 7" fill="#f59e0b"/>
    </marker>

    <marker id="arrowheadGreen" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
      <polygon points="0 0, 10 3.5, 0 7" fill="#10b981"/>
    </marker>
  </defs>

  <!-- Background -->
  <rect width="100%" height="100%" fill="url(#bgGradient)"/>

  <!-- Grid Pattern -->
  <g opacity="0.08">
    <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
      <path d="M 40 0 L 0 0 0 40" fill="none" stroke="#64748b" stroke-width="0.5"/>
    </pattern>
    <rect width="100%" height="100%" fill="url(#grid)"/>
  </g>

  <!-- ==================== TITLE ==================== -->
  <g id="title-group">
    <text x="600" y="55" text-anchor="middle" fill="#f8fafc" font-family="system-ui, sans-serif" font-size="32" font-weight="700">
      AI Agent Architecture
    </text>
    <text x="600" y="85" text-anchor="middle" fill="#94a3b8" font-family="system-ui, sans-serif" font-size="14">
      Autonomous Decision Making System with LLM Integration
    </text>
  </g>

  <!-- ==================== USER INPUT ==================== -->
  <g id="user-input">
    <rect x="50" y="180" width="180" height="70" rx="12" fill="#1e293b" stroke="#475569" stroke-width="2"/>
    <text x="140" y="210" text-anchor="middle" fill="#e2e8f0" font-family="system-ui, sans-serif" font-size="14" font-weight="600">USER INPUT</text>
    <text x="140" y="235" text-anchor="middle" fill="#94a3b8" font-family="monospace" font-size="11">Task Request</text>
  </g>

  <!-- ==================== AGENT CORE ==================== -->
  <g id="agent-core">
    <!-- Main Container -->
    <rect id="agent-bg" x="380" y="130" width="380" height="280" rx="20" fill="#1e1b4b" stroke="url(#agentGradient)" stroke-width="3" filter="url(#softGlow)"/>

    <!-- Title -->
    <text x="570" y="165" text-anchor="middle" fill="#c4b5fd" font-family="system-ui, sans-serif" font-size="18" font-weight="700">AGENT CORE</text>

    <!-- Planning Module -->
    <g id="planning-module">
      <rect x="410" y="190" width="100" height="80" rx="10" fill="url(#agentGradient)" filter="url(#softGlow)"/>
      <text x="460" y="222" text-anchor="middle" fill="#ffffff" font-family="system-ui, sans-serif" font-size="12" font-weight="700">PLANNING</text>
      <text x="460" y="242" text-anchor="middle" fill="#e0e7ff" font-family="system-ui, sans-serif" font-size="10">Task Analysis</text>
      <text x="460" y="258" text-anchor="middle" fill="#e0e7ff" font-family="system-ui, sans-serif" font-size="10">Strategy</text>
    </g>

    <!-- Memory Module -->
    <g id="memory-module">
      <rect x="525" y="190" width="100" height="80" rx="10" fill="url(#memoryGradient)" filter="url(#softGlow)"/>
      <text x="575" y="222" text-anchor="middle" fill="#ffffff" font-family="system-ui, sans-serif" font-size="12" font-weight="700">MEMORY</text>
      <text x="575" y="242" text-anchor="middle" fill="#cffafe" font-family="system-ui, sans-serif" font-size="10">Context</text>
      <text x="575" y="258" text-anchor="middle" fill="#cffafe" font-family="system-ui, sans-serif" font-size="10">History</text>
    </g>

    <!-- Tools Module -->
    <g id="tools-module">
      <rect x="640" y="190" width="100" height="80" rx="10" fill="url(#toolsGradient)" filter="url(#softGlow)"/>
      <text x="690" y="222" text-anchor="middle" fill="#ffffff" font-family="system-ui, sans-serif" font-size="12" font-weight="700">TOOLS</text>
      <text x="690" y="242" text-anchor="middle" fill="#d1fae5" font-family="system-ui, sans-serif" font-size="10">Plugin</text>
      <text x="690" y="258" text-anchor="middle" fill="#d1fae5" font-family="system-ui, sans-serif" font-size="10">Execution</text>
    </g>

    <!-- Reflection Module -->
    <g id="reflection-module">
      <rect x="410" y="290" width="100" height="80" rx="10" fill="url(#envGradient)" filter="url(#softGlow)"/>
      <text x="460" y="322" text-anchor="middle" fill="#ffffff" font-family="system-ui, sans-serif" font-size="12" font-weight="700">REFLECT</text>
      <text x="460" y="342" text-anchor="middle" fill="#e0e7ff" font-family="system-ui, sans-serif" font-size="10">Self-Eval</text>
      <text x="460" y="358" text-anchor="middle" fill="#e0e7ff" font-family="system-ui, sans-serif" font-size="10">Refine</text>
    </g>

    <!-- Decision Output -->
    <g id="decision-module">
      <rect x="525" y="310" width="215" height="70" rx="10" fill="#312e81" stroke="#6366f1" stroke-width="2"/>
      <text x="632" y="342" text-anchor="middle" fill="#c4b5fd" font-family="system-ui, sans-serif" font-size="12" font-weight="700">ACTION DECISION</text>
      <text id="action-text" x="632" y="365" text-anchor="middle" fill="#a5b4fc" font-family="monospace" font-size="11">Processing...</text>
    </g>
  </g>

  <!-- ==================== LLM ==================== -->
  <g id="llm-section">
    <rect id="llm-bg" x="450" y="470" width="260" height="90" rx="16" fill="url(#llmGradient)" filter="url(#glow)"/>
    <text x="580" y="505" text-anchor="middle" fill="#ffffff" font-family="system-ui, sans-serif" font-size="22" font-weight="800">LLM</text>
    <text x="580" y="535" text-anchor="middle" fill="#fef3c7" font-family="system-ui, sans-serif" font-size="12">Large Language Model</text>
  </g>

  <!-- ==================== TOOLS LIST ==================== -->
  <g id="tools-section">
    <rect x="900" y="130" width="220" height="280" rx="16" fill="#064e3b" stroke="#10b981" stroke-width="2"/>
    <text x="1010" y="170" text-anchor="middle" fill="#6ee7b7" font-family="system-ui, sans-serif" font-size="16" font-weight="700">AVAILABLE TOOLS</text>

    <!-- Tool Items -->
    <g id="tool-1">
      <rect x="920" y="195" width="180" height="50" rx="8" fill="url(#toolItemGradient)" stroke="#059669" stroke-width="1.5"/>
      <text x="1010" y="225" text-anchor="middle" fill="#a7f3d0" font-family="system-ui, sans-serif" font-size="13" font-weight="600">Web Search</text>
    </g>

    <g id="tool-2">
      <rect x="920" y="260" width="180" height="50" rx="8" fill="url(#toolItemGradient)" stroke="#059669" stroke-width="1.5"/>
      <text x="1010" y="290" text-anchor="middle" fill="#a7f3d0" font-family="system-ui, sans-serif" font-size="13" font-weight="600">Code Runner</text>
    </g>

    <g id="tool-3">
      <rect x="920" y="325" width="180" height="50" rx="8" fill="url(#toolItemGradient)" stroke="#059669" stroke-width="1.5"/>
      <text x="1010" y="355" text-anchor="middle" fill="#a7f3d0" font-family="system-ui, sans-serif" font-size="13" font-weight="600">File System</text>
    </g>
  </g>

  <!-- ==================== ENVIRONMENT ==================== -->
  <g id="env-section">
    <rect x="50" y="500" width="200" height="100" rx="12" fill="#4c1d95" stroke="#8b5cf6" stroke-width="2"/>
    <text x="150" y="535" text-anchor="middle" fill="#c4b5fd" font-family="system-ui, sans-serif" font-size="14" font-weight="700">ENVIRONMENT</text>
    <text x="150" y="560" text-anchor="middle" fill="#a78bfa" font-family="system-ui, sans-serif" font-size="11">Real-time Data</text>
    <text x="150" y="580" text-anchor="middle" fill="#a78bfa" font-family="system-ui, sans-serif" font-size="11">External APIs</text>
  </g>

  <!-- ==================== OUTPUT ==================== -->
  <g id="output-section">
    <rect x="450" y="610" width="260" height="90" rx="16" fill="url(#outputGradient)" filter="url(#glow)"/>
    <text x="580" y="650" text-anchor="middle" fill="#ffffff" font-family="system-ui, sans-serif" font-size="18" font-weight="700">RESPONSE</text>
    <text x="580" y="680" text-anchor="middle" fill="#fce7f3" font-family="system-ui, sans-serif" font-size="12">Final Output to User</text>
  </g>

  <!-- ==================== CONNECTION LINES ==================== -->
  <g id="connections" stroke-width="2.5" fill="none">
    <!-- User to Agent -->
    <path id="line-user-agent" d="M 230 215 L 380 250" stroke="#64748b" marker-end="url(#arrowhead)" opacity="0.7"/>

    <!-- Agent to LLM -->
    <path id="line-agent-llm" d="M 570 410 L 570 470" stroke="#f59e0b" marker-end="url(#arrowheadOrange)" opacity="0.8"/>

    <!-- Agent to Tools -->
    <path id="line-agent-tools" d="M 760 250 L 900 270" stroke="#10b981" marker-end="url(#arrowheadGreen)" opacity="0.8"/>

    <!-- Tools to Agent -->
    <path id="line-tools-agent" d="M 900 310 L 760 310" stroke="#10b981" marker-end="url(#arrowhead)" opacity="0.5"/>

    <!-- LLM to Output -->
    <path id="line-llm-output" d="M 580 560 L 580 610" stroke="#ec4899" marker-end="url(#arrowheadPurple)" opacity="0.8"/>

    <!-- Environment to Agent -->
    <path id="line-env-agent" d="M 250 550 L 380 380" stroke="#8b5cf6" marker-end="url(#arrowheadPurple)" opacity="0.6"/>
  </g>

  <!-- ==================== LEGEND ==================== -->
  <g id="legend">
    <rect x="780" y="620" width="180" height="120" rx="12" fill="#1e293b" stroke="#334155" stroke-width="1.5"/>
    <text x="800" y="648" fill="#94a3b8" font-family="system-ui, sans-serif" font-size="11" font-weight="700">DATA FLOW LEGEND</text>

    <line x1="800" y1="670" x2="830" y2="670" stroke="#64748b" stroke-width="2"/>
    <text x="840" y="674" fill="#cbd5e1" font-family="system-ui, sans-serif" font-size="10">User Input</text>

    <line x1="800" y1="695" x2="830" y2="695" stroke="#f59e0b" stroke-width="2"/>
    <text x="840" y="699" fill="#cbd5e1" font-family="system-ui, sans-serif" font-size="10">LLM Processing</text>

    <line x1="800" y1="720" x2="830" y2="720" stroke="#10b981" stroke-width="2"/>
    <text x="840" y="724" fill="#cbd5e1" font-family="system-ui, sans-serif" font-size="10">Tool Calls</text>

    <line x1="800" y1="745" x2="830" y2="745" stroke="#8b5cf6" stroke-width="2"/>
    <text x="840" y="749" fill="#cbd5e1" font-family="system-ui, sans-serif" font-size="10">Environment</text>
  </g>
</svg>
`;

async function main() {
  console.log('Starting Agent Architecture animation...\n');

  const pipeline = new SVGAnimationPipeline({
    input: svgContent,
    output: './output/agent-architecture.gif',
    fps: 30,
    duration: 5000,
    width: 1200,
    height: 800,
    background: '#0a0a1a',
    quality: 'high',
  });

  // 1. Fade in title
  pipeline.addAnimation({
    targets: '#title-group',
    keyframes: [
      { time: 0, properties: { opacity: 0 } },
      { time: 400, properties: { opacity: 1 } },
      { time: 4600, properties: { opacity: 1 } },
      { time: 5000, properties: { opacity: 0 } },
    ],
    easing: 'easeOutQuad',
  });

  // 2. User input appears
  pipeline.addAnimation({
    targets: '#user-input',
    keyframes: [
      { time: 300, properties: { opacity: 0, transform: { translate: [-30, 0] } } },
      { time: 700, properties: { opacity: 1, transform: { translate: [0, 0] } } },
    ],
    easing: 'easeOutQuad',
  });

  // 3. Agent core fades in
  pipeline.addAnimation({
    targets: '#agent-bg',
    keyframes: [
      { time: 600, properties: { opacity: 0 } },
      { time: 1000, properties: { opacity: 1 } },
    ],
    easing: 'easeOutQuad',
  });

  // 4. Planning module
  pipeline.addAnimation({
    targets: '#planning-module',
    keyframes: [
      { time: 1000, properties: { opacity: 0, transform: { scale: 0.8 } } },
      { time: 1400, properties: { opacity: 1, transform: { scale: 1 } } },
    ],
    easing: 'easeOutBack',
  });

  // 5. Memory module
  pipeline.addAnimation({
    targets: '#memory-module',
    keyframes: [
      { time: 1200, properties: { opacity: 0, transform: { scale: 0.8 } } },
      { time: 1600, properties: { opacity: 1, transform: { scale: 1 } } },
    ],
    easing: 'easeOutBack',
  });

  // 6. Tools module
  pipeline.addAnimation({
    targets: '#tools-module',
    keyframes: [
      { time: 1400, properties: { opacity: 0, transform: { scale: 0.8 } } },
      { time: 1800, properties: { opacity: 1, transform: { scale: 1 } } },
    ],
    easing: 'easeOutBack',
  });

  // 7. Reflection module
  pipeline.addAnimation({
    targets: '#reflection-module',
    keyframes: [
      { time: 1600, properties: { opacity: 0, transform: { scale: 0.8 } } },
      { time: 2000, properties: { opacity: 1, transform: { scale: 1 } } },
    ],
    easing: 'easeOutBack',
  });

  // 8. Decision module
  pipeline.addAnimation({
    targets: '#decision-module',
    keyframes: [
      { time: 1800, properties: { opacity: 0 } },
      { time: 2200, properties: { opacity: 1 } },
    ],
    easing: 'easeOutQuad',
  });

  // 9. LLM section
  pipeline.addAnimation({
    targets: '#llm-bg',
    keyframes: [
      { time: 2200, properties: { opacity: 0, transform: { scale: 0.9 } } },
      { time: 2600, properties: { opacity: 1, transform: { scale: 1 } } },
    ],
    easing: 'easeOutElastic',
  });

  // 10. Tools section
  pipeline.addAnimation({
    targets: '#tools-section',
    keyframes: [
      { time: 2200, properties: { opacity: 0, transform: { translate: [30, 0] } } },
      { time: 2600, properties: { opacity: 1, transform: { translate: [0, 0] } } },
    ],
    easing: 'easeOutQuad',
  });

  // 11. Tool items staggered
  pipeline.addAnimation({
    targets: '#tool-1',
    keyframes: [
      { time: 2600, properties: { opacity: 0 } },
      { time: 2900, properties: { opacity: 1 } },
    ],
    easing: 'easeOutQuad',
  });

  pipeline.addAnimation({
    targets: '#tool-2',
    keyframes: [
      { time: 2800, properties: { opacity: 0 } },
      { time: 3100, properties: { opacity: 1 } },
    ],
    easing: 'easeOutQuad',
  });

  pipeline.addAnimation({
    targets: '#tool-3',
    keyframes: [
      { time: 3000, properties: { opacity: 0 } },
      { time: 3300, properties: { opacity: 1 } },
    ],
    easing: 'easeOutQuad',
  });

  // 12. Environment section
  pipeline.addAnimation({
    targets: '#env-section',
    keyframes: [
      { time: 2500, properties: { opacity: 0, transform: { translate: [-20, 0] } } },
      { time: 2900, properties: { opacity: 1, transform: { translate: [0, 0] } } },
    ],
    easing: 'easeOutQuad',
  });

  // 13. Output section
  pipeline.addAnimation({
    targets: '#output-section',
    keyframes: [
      { time: 3300, properties: { opacity: 0, transform: { translate: [0, 20] } } },
      { time: 3700, properties: { opacity: 1, transform: { translate: [0, 0] } } },
    ],
    easing: 'easeOutQuad',
  });

  // 14. Connection lines animate in
  pipeline.addAnimation({
    targets: '#line-user-agent',
    keyframes: [
      { time: 700, properties: { opacity: 0 } },
      { time: 1000, properties: { opacity: 0.8 } },
    ],
    easing: 'easeOutQuad',
  });

  pipeline.addAnimation({
    targets: '#line-agent-llm',
    keyframes: [
      { time: 2200, properties: { opacity: 0 } },
      { time: 2500, properties: { opacity: 0.9 } },
    ],
    easing: 'easeOutQuad',
  });

  pipeline.addAnimation({
    targets: '#line-agent-tools',
    keyframes: [
      { time: 2200, properties: { opacity: 0 } },
      { time: 2500, properties: { opacity: 0.9 } },
    ],
    easing: 'easeOutQuad',
  });

  pipeline.addAnimation({
    targets: '#line-tools-agent',
    keyframes: [
      { time: 2500, properties: { opacity: 0 } },
      { time: 2800, properties: { opacity: 0.6 } },
    ],
    easing: 'easeOutQuad',
  });

  pipeline.addAnimation({
    targets: '#line-llm-output',
    keyframes: [
      { time: 3300, properties: { opacity: 0 } },
      { time: 3600, properties: { opacity: 0.9 } },
    ],
    easing: 'easeOutQuad',
  });

  pipeline.addAnimation({
    targets: '#line-env-agent',
    keyframes: [
      { time: 2900, properties: { opacity: 0 } },
      { time: 3200, properties: { opacity: 0.7 } },
    ],
    easing: 'easeOutQuad',
  });

  // 15. Legend
  pipeline.addAnimation({
    targets: '#legend',
    keyframes: [
      { time: 3700, properties: { opacity: 0 } },
      { time: 4100, properties: { opacity: 1 } },
      { time: 4600, properties: { opacity: 1 } },
      { time: 5000, properties: { opacity: 0 } },
    ],
    easing: 'easeOutQuad',
  });

  // 16. Pulse effect on Agent Core
  pipeline.addAnimation({
    targets: '#agent-bg',
    keyframes: [
      { time: 2500, properties: { opacity: 1 } },
      { time: 2800, properties: { opacity: 0.7 } },
      { time: 3100, properties: { opacity: 1 } },
      { time: 3400, properties: { opacity: 0.7 } },
      { time: 3700, properties: { opacity: 1 } },
    ],
    easing: 'easeInOutSine',
  });

  // 17. LLM pulse
  pipeline.addAnimation({
    targets: '#llm-bg',
    keyframes: [
      { time: 2600, properties: { opacity: 1 } },
      { time: 2950, properties: { opacity: 0.7 } },
      { time: 3300, properties: { opacity: 1 } },
      { time: 3650, properties: { opacity: 0.7 } },
      { time: 4000, properties: { opacity: 1 } },
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
