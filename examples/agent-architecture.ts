/**
 * Example: Loop Engineering Internal Mechanism
 *
 * A highly detailed, flat vector-style system architecture diagram
 * with a light pastel color palette.
 */

import { SVGAnimationPipeline } from '../src/pipeline';
import { ProgressInfo } from '../src/types';

const svgContent = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1400 1000" width="1400" height="1000">
  <defs>
    <!-- Background -->
    <linearGradient id="bgGradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#f8fafc;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#e2e8f0;stop-opacity:1" />
    </linearGradient>

    <!-- Module Gradients -->
    <linearGradient id="triggerGradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#a5b4fc;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#818cf8;stop-opacity:1" />
    </linearGradient>

    <linearGradient id="coreGradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#c4b5fd;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#a78bfa;stop-opacity:1" />
    </linearGradient>

    <linearGradient id="thinkGradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#93c5fd;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#60a5fa;stop-opacity:1" />
    </linearGradient>

    <linearGradient id="actGradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#86efac;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#4ade80;stop-opacity:1" />
    </linearGradient>

    <linearGradient id="observeGradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#fda4af;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#fb7185;stop-opacity:1" />
    </linearGradient>

    <linearGradient id="memoryGradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#67e8f9;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#22d3ee;stop-opacity:1" />
    </linearGradient>

    <linearGradient id="safetyGradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#fca5a5;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#f87171;stop-opacity:1" />
    </linearGradient>

    <linearGradient id="toolsGradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#fcd34d;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#fbbf24;stop-opacity:1" />
    </linearGradient>

    <linearGradient id="outputGradient" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#6ee7b7;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#34d399;stop-opacity:1" />
    </linearGradient>

    <!-- Shadow Filter -->
    <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="4" stdDeviation="8" flood-color="#1e293b" flood-opacity="0.15"/>
    </filter>

    <filter id="softShadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="2" stdDeviation="4" flood-color="#1e293b" flood-opacity="0.1"/>
    </filter>

    <!-- Arrow Marker -->
    <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
      <polygon points="0 0, 10 3.5, 0 7" fill="#334155"/>
    </marker>

    <marker id="arrowheadLight" markerWidth="10" markerHeight="7" refX="9" refY="3.5" orient="auto">
      <polygon points="0 0, 10 3.5, 0 7" fill="#64748b"/>
    </marker>
  </defs>

  <!-- Background -->
  <rect width="100%" height="100%" fill="url(#bgGradient)"/>

  <!-- Subtle Grid -->
  <g opacity="0.3">
    <pattern id="smallGrid" width="20" height="20" patternUnits="userSpaceOnUse">
      <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#cbd5e1" stroke-width="0.5"/>
    </pattern>
    <rect width="100%" height="100%" fill="url(#smallGrid)"/>
  </g>

  <!-- ==================== TITLE ==================== -->
  <g id="title-group">
    <text x="700" y="45" text-anchor="middle" fill="#1e293b" font-family="system-ui, sans-serif" font-size="28" font-weight="700">Loop Engineering Internal Mechanism</text>
  </g>

  <!-- ==================== TRIGGER / INPUT ==================== -->
  <g id="trigger-section">
    <rect x="400" y="75" width="600" height="90" rx="16" fill="url(#triggerGradient)" filter="url(#shadow)"/>
    <text x="700" y="100" text-anchor="middle" fill="#1e1b4b" font-family="system-ui, sans-serif" font-size="16" font-weight="700">Trigger / Input</text>

    <!-- Icons Row -->
    <g id="trigger-icons">
      <!-- Message -->
      <g id="trigger-message">
        <rect x="450" y="115" width="100" height="40" rx="8" fill="#ffffff" filter="url(#softShadow)"/>
        <text x="500" y="135" text-anchor="middle" fill="#6366f1" font-family="system-ui, sans-serif" font-size="18">💬</text>
        <text x="500" y="150" text-anchor="middle" fill="#475569" font-family="system-ui, sans-serif" font-size="10">Message</text>
      </g>

      <!-- Event -->
      <g id="trigger-event">
        <rect x="565" y="115" width="100" height="40" rx="8" fill="#ffffff" filter="url(#softShadow)"/>
        <text x="615" y="135" text-anchor="middle" fill="#ec4899" font-family="system-ui, sans-serif" font-size="18">⚡</text>
        <text x="615" y="150" text-anchor="middle" fill="#475569" font-family="system-ui, sans-serif" font-size="10">Event</text>
      </g>

      <!-- API Call -->
      <g id="trigger-api">
        <rect x="680" y="115" width="100" height="40" rx="8" fill="#ffffff" filter="url(#softShadow)"/>
        <text x="730" y="135" text-anchor="middle" fill="#10b981" font-family="system-ui, sans-serif" font-size="18">🔗</text>
        <text x="730" y="150" text-anchor="middle" fill="#475569" font-family="system-ui, sans-serif" font-size="10">API Call</text>
      </g>

      <!-- Schedule -->
      <g id="trigger-schedule">
        <rect x="795" y="115" width="100" height="40" rx="8" fill="#ffffff" filter="url(#softShadow)"/>
        <text x="845" y="135" text-anchor="middle" fill="#f59e0b" font-family="system-ui, sans-serif" font-size="18">⏰</text>
        <text x="845" y="150" text-anchor="middle" fill="#475569" font-family="system-ui, sans-serif" font-size="10">Schedule</text>
      </g>
    </g>
  </g>

  <!-- ==================== COGNITIVE CORE ==================== -->
  <g id="cognitive-core">
    <rect x="150" y="200" width="1100" height="360" rx="24" fill="url(#coreGradient)" filter="url(#shadow)"/>
    <text x="700" y="235" text-anchor="middle" fill="#1e1b4b" font-family="system-ui, sans-serif" font-size="20" font-weight="800">Cognitive Core (智能体循环)</text>

    <!-- THINK Stage -->
    <g id="think-stage">
      <rect x="200" y="270" width="280" height="160" rx="16" fill="#ffffff" filter="url(#softShadow)"/>
      <rect x="200" y="270" width="280" height="36" rx="16" fill="url(#thinkGradient)"/>
      <rect x="200" y="290" width="280" height="16" fill="url(#thinkGradient)"/>
      <text x="340" y="293" text-anchor="middle" fill="#1e1b4b" font-family="system-ui, sans-serif" font-size="14" font-weight="700">Think</text>

      <!-- Cloud Icon -->
      <ellipse cx="280" cy="340" rx="25" ry="18" fill="#dbeafe"/>
      <ellipse cx="260" cy="345" rx="15" ry="12" fill="#dbeafe"/>
      <ellipse cx="300" cy="345" rx="18" ry="14" fill="#dbeafe"/>
      <circle cx="275" cy="355" r="3" fill="#3b82f6"/>
      <circle cx="285" cy="358" r="3" fill="#3b82f6"/>
      <circle cx="295" cy="355" r="3" fill="#3b82f6"/>

      <text x="340" y="400" text-anchor="middle" fill="#475569" font-family="system-ui, sans-serif" font-size="11">推理、规划、反思</text>
      <text x="340" y="418" text-anchor="middle" fill="#475569" font-family="system-ui, sans-serif" font-size="11">思维链</text>
    </g>

    <!-- ACT Stage -->
    <g id="act-stage">
      <rect x="560" y="270" width="280" height="160" rx="16" fill="#ffffff" filter="url(#softShadow)"/>
      <rect x="560" y="270" width="280" height="36" rx="16" fill="url(#actGradient)"/>
      <rect x="560" y="290" width="280" height="16" fill="url(#actGradient)"/>
      <text x="700" y="293" text-anchor="middle" fill="#1e1b4b" font-family="system-ui, sans-serif" font-size="14" font-weight="700">Act</text>

      <!-- Gear Icons -->
      <g transform="translate(620, 340)">
        <circle cx="0" cy="0" r="20" fill="#dcfce7" stroke="#22c55e" stroke-width="2"/>
        <circle cx="0" cy="0" r="8" fill="#ffffff"/>
        <g stroke="#22c55e" stroke-width="3">
          <line x1="0" y1="-20" x2="0" y2="-14"/>
          <line x1="0" y1="14" x2="0" y2="20"/>
          <line x1="-20" y1="0" x2="-14" y2="0"/>
          <line x1="14" y1="0" x2="20" y2="0"/>
          <line x1="-14" y1="-14" x2="-10" y2="-10"/>
          <line x1="10" y1="10" x2="14" y2="14"/>
          <line x1="-14" y1="14" x2="-10" y2="10"/>
          <line x1="10" y1="-10" x2="14" y2="-14"/>
        </g>
      </g>
      <g transform="translate(680, 355) scale(0.75)">
        <circle cx="0" cy="0" r="20" fill="#dcfce7" stroke="#22c55e" stroke-width="2"/>
        <circle cx="0" cy="0" r="8" fill="#ffffff"/>
        <g stroke="#22c55e" stroke-width="3">
          <line x1="0" y1="-20" x2="0" y2="-14"/>
          <line x1="0" y1="14" x2="0" y2="20"/>
          <line x1="-20" y1="0" x2="-14" y2="0"/>
          <line x1="14" y1="0" x2="20" y2="0"/>
          <line x1="-14" y1="-14" x2="-10" y2="-10"/>
          <line x1="10" y1="10" x2="14" y2="14"/>
          <line x1="-14" y1="14" x2="-10" y2="10"/>
          <line x1="10" y1="-10" x2="14" y2="-14"/>
        </g>
      </g>

      <text x="700" y="400" text-anchor="middle" fill="#475569" font-family="system-ui, sans-serif" font-size="11">选择工具、组装调用</text>
      <text x="700" y="418" text-anchor="middle" fill="#475569" font-family="system-ui, sans-serif" font-size="11">生成回复</text>
    </g>

    <!-- OBSERVE Stage -->
    <g id="observe-stage">
      <rect x="920" y="270" width="280" height="160" rx="16" fill="#ffffff" filter="url(#softShadow)"/>
      <rect x="920" y="270" width="280" height="36" rx="16" fill="url(#observeGradient)"/>
      <rect x="920" y="290" width="280" height="16" fill="url(#observeGradient)"/>
      <text x="1060" y="293" text-anchor="middle" fill="#1e1b4b" font-family="system-ui, sans-serif" font-size="14" font-weight="700">Observe</text>

      <!-- Eye Icon -->
      <ellipse cx="1000" cy="345" rx="35" ry="22" fill="#fee2e2"/>
      <ellipse cx="1000" cy="345" rx="28" ry="18" fill="#ffffff"/>
      <circle cx="1000" cy="345" r="12" fill="#f87171"/>
      <circle cx="1000" cy="345" r="6" fill="#1e293b"/>

      <text x="1060" y="400" text-anchor="middle" fill="#475569" font-family="system-ui, sans-serif" font-size="11">解析结果、更新状态</text>
      <text x="1060" y="418" text-anchor="middle" fill="#475569" font-family="system-ui, sans-serif" font-size="11">发现错误</text>
    </g>

    <!-- Cycle Arrows -->
    <g id="cycle-arrows" stroke="#475569" stroke-width="3" fill="none">
      <path d="M 485 350 L 555 350" marker-end="url(#arrowhead)"/>
      <path d="M 845 350 L 915 350" marker-end="url(#arrowhead)"/>
      <path d="M 1205 380 Q 1220 440 1100 450 Q 500 470 200 450 Q 180 430 195 380" stroke-dasharray="8,4"/>
    </g>

    <!-- Done Decision -->
    <g id="done-decision">
      <polygon points="700,465 780,530 700,595 620,530" fill="#ffffff" stroke="#1e293b" stroke-width="2" filter="url(#softShadow)"/>
      <text x="700" y="535" text-anchor="middle" fill="#1e293b" font-family="system-ui, sans-serif" font-size="14" font-weight="700">Done?</text>
    </g>

    <!-- Yes/No Arrows from Done -->
    <g id="done-arrows" stroke="#1e293b" stroke-width="2.5" fill="none">
      <path d="M 785 530 L 880 530" marker-end="url(#arrowhead)"/>
      <text x="820" y="520" text-anchor="middle" fill="#22c55e" font-family="system-ui, sans-serif" font-size="11" font-weight="600">Yes</text>

      <path d="M 700 600 L 700 660" marker-end="url(#arrowhead)"/>
      <text x="715" y="635" text-anchor="middle" fill="#f87171" font-family="system-ui, sans-serif" font-size="10">No</text>
    </g>
  </g>

  <!-- ==================== OUTPUT ==================== -->
  <g id="output-section">
    <rect x="900" y="515" width="140" height="80" rx="12" fill="url(#outputGradient)" filter="url(#shadow)"/>
    <text x="970" y="545" text-anchor="middle" fill="#1e1b4b" font-family="system-ui, sans-serif" font-size="13" font-weight="700">Output</text>
    <text x="970" y="580" text-anchor="middle" fill="#1e1b4b" font-family="system-ui, sans-serif" font-size="20">⬆️</text>
  </g>

  <!-- ==================== MEMORY ==================== -->
  <g id="memory-section">
    <rect x="80" y="620" width="280" height="150" rx="16" fill="url(#memoryGradient)" filter="url(#shadow)"/>
    <text x="220" y="655" text-anchor="middle" fill="#1e1b4b" font-family="system-ui, sans-serif" font-size="16" font-weight="700">Memory</text>

    <!-- Working Memory -->
    <g id="working-memory">
      <rect x="100" y="680" width="110" height="70" rx="10" fill="#ffffff" filter="url(#softShadow)"/>
      <text x="155" y="705" text-anchor="middle" fill="#0891b2" font-family="system-ui, sans-serif" font-size="14">📄</text>
      <text x="155" y="725" text-anchor="middle" fill="#475569" font-family="system-ui, sans-serif" font-size="11" font-weight="600">Working</text>
      <text x="155" y="740" text-anchor="middle" fill="#475569" font-family="system-ui, sans-serif" font-size="10">Memory</text>
    </g>

    <!-- Long-term Memory -->
    <g id="longterm-memory">
      <rect x="225" y="680" width="110" height="70" rx="10" fill="#ffffff" filter="url(#softShadow)"/>
      <text x="280" y="705" text-anchor="middle" fill="#0e7490" font-family="system-ui, sans-serif" font-size="14">🗄️</text>
      <text x="280" y="725" text-anchor="middle" fill="#475569" font-family="system-ui, sans-serif" font-size="11" font-weight="600">Long-term</text>
      <text x="280" y="740" text-anchor="middle" fill="#475569" font-family="system-ui, sans-serif" font-size="10">Memory</text>
    </g>
  </g>

  <!-- ==================== SAFETY LAYERS ==================== -->
  <g id="safety-section">
    <rect x="420" y="680" width="560" height="180" rx="16" fill="url(#safetyGradient)" filter="url(#shadow)"/>
    <text x="700" y="715" text-anchor="middle" fill="#1e1b4b" font-family="system-ui, sans-serif" font-size="16" font-weight="700">Safety Layers</text>

    <!-- Validation Capsules -->
    <g id="safety-capsules">
      <rect x="450" y="735" width="90" height="36" rx="18" fill="#ffffff" filter="url(#softShadow)"/>
      <text x="495" y="758" text-anchor="middle" fill="#ef4444" font-family="system-ui, sans-serif" font-size="12" font-weight="600">Validate</text>

      <rect x="555" y="735" width="90" height="36" rx="18" fill="#ffffff" filter="url(#softShadow)"/>
      <text x="600" y="758" text-anchor="middle" fill="#f59e0b" font-family="system-ui, sans-serif" font-size="12" font-weight="600">Scope</text>

      <rect x="660" y="735" width="90" height="36" rx="18" fill="#ffffff" filter="url(#softShadow)"/>
      <text x="705" y="758" text-anchor="middle" fill="#22c55e" font-family="system-ui, sans-serif" font-size="12" font-weight="600">Budget</text>

      <rect x="765" y="735" width="90" height="36" rx="18" fill="#ffffff" filter="url(#softShadow)"/>
      <text x="810" y="758" text-anchor="middle" fill="#6366f1" font-family="system-ui, sans-serif" font-size="12" font-weight="600">Allow</text>
    </g>

    <!-- Reject Box -->
    <g id="reject-box">
      <rect x="480" y="790" width="180" height="50" rx="10" fill="#ffffff" stroke="#ef4444" stroke-width="2" filter="url(#softShadow)"/>
      <text x="570" y="815" text-anchor="middle" fill="#ef4444" font-family="system-ui, sans-serif" font-size="11" font-weight="600">Reject + Replan</text>

      <!-- Arrow from capsules to reject -->
      <path d="M 540 773 L 540 785 L 570 785" stroke="#ef4444" stroke-width="2" fill="none" marker-end="url(#arrowhead)"/>
    </g>

    <!-- Checkmark -->
    <g id="check-box">
      <rect x="720" y="790" width="180" height="50" rx="10" fill="#ffffff" stroke="#22c55e" stroke-width="2" filter="url(#softShadow)"/>
      <text x="810" y="815" text-anchor="middle" fill="#22c55e" font-family="system-ui, sans-serif" font-size="11" font-weight="600">✅ Pass Safety</text>

      <!-- Arrow from capsules to check -->
      <path d="M 810 773 L 810 785" stroke="#22c55e" stroke-width="2" fill="none" marker-end="url(#arrowhead)"/>
    </g>
  </g>

  <!-- ==================== TOOL EXECUTION ==================== -->
  <g id="tools-section">
    <rect x="1040" y="620" width="280" height="200" rx="16" fill="url(#toolsGradient)" filter="url(#shadow)"/>
    <text x="1180" y="655" text-anchor="middle" fill="#1e1b4b" font-family="system-ui, sans-serif" font-size="16" font-weight="700">Tool Execution</text>

    <!-- Tool Types -->
    <g id="tool-types">
      <rect x="1060" y="680" width="240" height="45" rx="10" fill="#ffffff" filter="url(#softShadow)"/>
      <text x="1180" y="700" text-anchor="middle" fill="#ca8a04" font-family="system-ui, sans-serif" font-size="14">🛠️</text>
      <text x="1180" y="717" text-anchor="middle" fill="#475569" font-family="system-ui, sans-serif" font-size="11" font-weight="600">Tool Types</text>
    </g>

    <!-- Dispatch -->
    <g id="dispatch">
      <rect x="1060" y="735" width="240" height="45" rx="10" fill="#ffffff" filter="url(#softShadow)"/>
      <text x="1180" y="755" text-anchor="middle" fill="#ca8a04" font-family="system-ui, sans-serif" font-size="14">📡</text>
      <text x="1180" y="772" text-anchor="middle" fill="#475569" font-family="system-ui, sans-serif" font-size="11" font-weight="600">Dispatch</text>
    </g>

    <!-- Return Result -->
    <g id="return-result">
      <rect x="1060" y="790" width="240" height="45" rx="10" fill="#ffffff" filter="url(#softShadow)"/>
      <text x="1180" y="810" text-anchor="middle" fill="#ca8a04" font-family="system-ui, sans-serif" font-size="14">📥</text>
      <text x="1180" y="827" text-anchor="middle" fill="#475569" font-family="system-ui, sans-serif" font-size="11" font-weight="600">Return result to Observe</text>
    </g>
  </g>

  <!-- ==================== CONNECTING LINES ==================== -->
  <g id="connections" stroke="#475569" stroke-width="2" fill="none">
    <!-- Trigger to Core -->
    <path d="M 700 165 L 700 195" marker-end="url(#arrowheadLight)"/>

    <!-- Core to Memory -->
    <path d="M 220 565 L 220 620" marker-end="url(#arrowheadLight)"/>

    <!-- Core to Safety -->
    <path d="M 700 565 L 700 675" marker-end="url(#arrowheadLight)"/>

    <!-- Core to Tools -->
    <path d="M 1040 350 L 1040 620" marker-end="url(#arrowheadLight)"/>

    <!-- Done to Tools -->
    <path d="M 780 530 L 920 530 L 920 615" marker-end="url(#arrowheadLight)"/>
  </g>
</svg>
`;

async function main() {
  console.log('Starting Loop Engineering animation...\n');

  const pipeline = new SVGAnimationPipeline({
    input: svgContent,
    output: './output/loop-engineering.gif',
    fps: 30,
    duration: 8000,
    width: 1400,
    height: 1000,
    background: '#f8fafc',
    quality: 'low',
  });

  // Title fade in
  pipeline.addAnimation({
    targets: '#title-group',
    keyframes: [
      { time: 0, properties: { opacity: 0, transform: { translate: [0, -20] } } },
      { time: 500, properties: { opacity: 1, transform: { translate: [0, 0] } } },
      { time: 7500, properties: { opacity: 1, transform: { translate: [0, 0] } } },
      { time: 8000, properties: { opacity: 0 } },
    ],
    easing: 'easeOutQuad',
  });

  // Trigger section
  pipeline.addAnimation({
    targets: '#trigger-section',
    keyframes: [
      { time: 300, properties: { opacity: 0, transform: { translate: [0, -30] } } },
      { time: 800, properties: { opacity: 1, transform: { translate: [0, 0] } } },
    ],
    easing: 'easeOutQuad',
  });

  // Trigger icons stagger
  pipeline.addAnimation({ targets: '#trigger-message', keyframes: [{ time: 800, properties: { opacity: 0, transform: { scale: 0.5 } } }, { time: 1100, properties: { opacity: 1, transform: { scale: 1 } } }], easing: 'easeOutBack' });
  pipeline.addAnimation({ targets: '#trigger-event', keyframes: [{ time: 950, properties: { opacity: 0, transform: { scale: 0.5 } } }, { time: 1250, properties: { opacity: 1, transform: { scale: 1 } } }], easing: 'easeOutBack' });
  pipeline.addAnimation({ targets: '#trigger-api', keyframes: [{ time: 1100, properties: { opacity: 0, transform: { scale: 0.5 } } }, { time: 1400, properties: { opacity: 1, transform: { scale: 1 } } }], easing: 'easeOutBack' });
  pipeline.addAnimation({ targets: '#trigger-schedule', keyframes: [{ time: 1250, properties: { opacity: 0, transform: { scale: 0.5 } } }, { time: 1550, properties: { opacity: 1, transform: { scale: 1 } } }], easing: 'easeOutBack' });

  // Cognitive Core
  pipeline.addAnimation({
    targets: '#cognitive-core',
    keyframes: [
      { time: 1000, properties: { opacity: 0, transform: { scale: 0.95 } } },
      { time: 1500, properties: { opacity: 1, transform: { scale: 1 } } },
    ],
    easing: 'easeOutQuad',
  });

  // Think stage
  pipeline.addAnimation({
    targets: '#think-stage',
    keyframes: [
      { time: 1500, properties: { opacity: 0, transform: { translate: [-30, 0] } } },
      { time: 1900, properties: { opacity: 1, transform: { translate: [0, 0] } } },
    ],
    easing: 'easeOutBack',
  });

  // Act stage
  pipeline.addAnimation({
    targets: '#act-stage',
    keyframes: [
      { time: 1700, properties: { opacity: 0, transform: { translate: [0, -30] } } },
      { time: 2100, properties: { opacity: 1, transform: { translate: [0, 0] } } },
    ],
    easing: 'easeOutBack',
  });

  // Observe stage
  pipeline.addAnimation({
    targets: '#observe-stage',
    keyframes: [
      { time: 1900, properties: { opacity: 0, transform: { translate: [30, 0] } } },
      { time: 2300, properties: { opacity: 1, transform: { translate: [0, 0] } } },
    ],
    easing: 'easeOutBack',
  });

  // Cycle arrows
  pipeline.addAnimation({
    targets: '#cycle-arrows',
    keyframes: [
      { time: 2100, properties: { opacity: 0 } },
      { time: 2500, properties: { opacity: 1 } },
    ],
    easing: 'easeOutQuad',
  });

  // Done decision
  pipeline.addAnimation({
    targets: '#done-decision',
    keyframes: [
      { time: 2300, properties: { opacity: 0, transform: { scale: 0.5 } } },
      { time: 2700, properties: { opacity: 1, transform: { scale: 1 } } },
    ],
    easing: 'easeOutElastic',
  });

  // Done arrows
  pipeline.addAnimation({
    targets: '#done-arrows',
    keyframes: [
      { time: 2700, properties: { opacity: 0 } },
      { time: 3000, properties: { opacity: 1 } },
    ],
    easing: 'easeOutQuad',
  });

  // Output section
  pipeline.addAnimation({
    targets: '#output-section',
    keyframes: [
      { time: 3000, properties: { opacity: 0, transform: { scale: 0.8 } } },
      { time: 3400, properties: { opacity: 1, transform: { scale: 1 } } },
    ],
    easing: 'easeOutBack',
  });

  // Memory section
  pipeline.addAnimation({
    targets: '#memory-section',
    keyframes: [
      { time: 3200, properties: { opacity: 0, transform: { translate: [-30, 0] } } },
      { time: 3600, properties: { opacity: 1, transform: { translate: [0, 0] } } },
    ],
    easing: 'easeOutBack',
  });

  // Working/Long-term memory
  pipeline.addAnimation({ targets: '#working-memory', keyframes: [{ time: 3600, properties: { opacity: 0 } }, { time: 3900, properties: { opacity: 1 } }], easing: 'easeOutQuad' });
  pipeline.addAnimation({ targets: '#longterm-memory', keyframes: [{ time: 3800, properties: { opacity: 0 } }, { time: 4100, properties: { opacity: 1 } }], easing: 'easeOutQuad' });

  // Safety section
  pipeline.addAnimation({
    targets: '#safety-section',
    keyframes: [
      { time: 3400, properties: { opacity: 0, transform: { translate: [0, 30] } } },
      { time: 3800, properties: { opacity: 1, transform: { translate: [0, 0] } } },
    ],
    easing: 'easeOutBack',
  });

  // Safety capsules stagger
  pipeline.addAnimation({ targets: '#safety-capsules rect:nth-child(1)', keyframes: [{ time: 3800, properties: { opacity: 0, transform: { scale: 0 } } }, { time: 4100, properties: { opacity: 1, transform: { scale: 1 } } }], easing: 'easeOutBack' });
  pipeline.addAnimation({ targets: '#safety-capsules rect:nth-child(2)', keyframes: [{ time: 3950, properties: { opacity: 0, transform: { scale: 0 } } }, { time: 4250, properties: { opacity: 1, transform: { scale: 1 } } }], easing: 'easeOutBack' });
  pipeline.addAnimation({ targets: '#safety-capsules rect:nth-child(3)', keyframes: [{ time: 4100, properties: { opacity: 0, transform: { scale: 0 } } }, { time: 4400, properties: { opacity: 1, transform: { scale: 1 } } }], easing: 'easeOutBack' });
  pipeline.addAnimation({ targets: '#safety-capsules rect:nth-child(4)', keyframes: [{ time: 4250, properties: { opacity: 0, transform: { scale: 0 } } }, { time: 4550, properties: { opacity: 1, transform: { scale: 1 } } }], easing: 'easeOutBack' });

  // Reject and Check boxes
  pipeline.addAnimation({ targets: '#reject-box', keyframes: [{ time: 4400, properties: { opacity: 0 } }, { time: 4700, properties: { opacity: 1 } }], easing: 'easeOutQuad' });
  pipeline.addAnimation({ targets: '#check-box', keyframes: [{ time: 4600, properties: { opacity: 0 } }, { time: 4900, properties: { opacity: 1 } }], easing: 'easeOutQuad' });

  // Tools section
  pipeline.addAnimation({
    targets: '#tools-section',
    keyframes: [
      { time: 3800, properties: { opacity: 0, transform: { translate: [30, 0] } } },
      { time: 4200, properties: { opacity: 1, transform: { translate: [0, 0] } } },
    ],
    easing: 'easeOutBack',
  });

  // Tool items stagger
  pipeline.addAnimation({ targets: '#tool-types', keyframes: [{ time: 4200, properties: { opacity: 0, transform: { translate: [20, 0] } } }, { time: 4500, properties: { opacity: 1, transform: { translate: [0, 0] } } }], easing: 'easeOutQuad' });
  pipeline.addAnimation({ targets: '#dispatch', keyframes: [{ time: 4450, properties: { opacity: 0, transform: { translate: [20, 0] } } }, { time: 4750, properties: { opacity: 1, transform: { translate: [0, 0] } } }], easing: 'easeOutQuad' });
  pipeline.addAnimation({ targets: '#return-result', keyframes: [{ time: 4700, properties: { opacity: 0, transform: { translate: [20, 0] } } }, { time: 5000, properties: { opacity: 1, transform: { translate: [0, 0] } } }], easing: 'easeOutQuad' });

  // Connections
  pipeline.addAnimation({
    targets: '#connections',
    keyframes: [
      { time: 3500, properties: { opacity: 0 } },
      { time: 4000, properties: { opacity: 1 } },
    ],
    easing: 'easeOutQuad',
  });

  // Subtle pulse on Cognitive Core
  pipeline.addAnimation({
    targets: '#cognitive-core',
    keyframes: [
      { time: 5000, properties: { opacity: 1 } },
      { time: 5200, properties: { opacity: 0.85 } },
      { time: 5400, properties: { opacity: 1 } },
      { time: 5600, properties: { opacity: 0.85 } },
      { time: 5800, properties: { opacity: 1 } },
      { time: 6000, properties: { opacity: 0.85 } },
      { time: 6200, properties: { opacity: 1 } },
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
