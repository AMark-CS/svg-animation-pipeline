/**
 * Agent Loop Mechanism — Flat PPT-Style Architecture Diagram
 *
 * All modules visible from the start, continuous dynamic animation:
 * - Animated flow arrows (moving dashes + dots)
 * - Spinning gears (clockwise / counter-clockwise)
 * - Pulsing Done? diamond
 * - Breathing section backgrounds
 * - Flashing safety gates
 * - Shimmering memory icons
 * - Pulsing tool dispatch icons
 */

import { SVGAnimationPipeline } from '../src/pipeline';
import { ProgressInfo } from '../src/types';

const svgContent = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1400 950" width="1400" height="950">
  <defs>
    <style>
      /* Flowing dash animations */
      @keyframes dashFlow {
        to { stroke-dashoffset: -24; }
      }
      @keyframes dashCycle {
        to { stroke-dashoffset: -20; }
      }
      @keyframes dashReject {
        to { stroke-dashoffset: -16; }
      }
      .flow-line { animation: dashFlow 1.2s linear infinite; }
      .cycle-line { animation: dashCycle 2s linear infinite; }
      .reject-line { animation: dashReject 1s linear infinite; }

      /* Gear spin */
      @keyframes spinCW { to { transform: rotate(360deg); } }
      @keyframes spinCCW { to { transform: rotate(-360deg); } }
      .gear-cw { animation: spinCW 4s linear infinite; transform-origin: center; }
      .gear-ccw { animation: spinCCW 3s linear infinite; transform-origin: center; }

      /* Pulse breathe */
      @keyframes breathe {
        0%, 100% { opacity: 1; }
        50% { opacity: 0.78; }
      }
      @keyframes breatheSlow {
        0%, 100% { opacity: 0.92; }
        50% { opacity: 0.65; }
      }
      .breathe { animation: breathe 2.5s ease-in-out infinite; }
      .breathe-slow { animation: breatheSlow 3.5s ease-in-out infinite; }

      /* Flash safety gates */
      @keyframes flashA {
        0%, 100% { fill: #fff; stroke-width: 1; }
        50% { fill: #fef2f2; stroke-width: 2; }
      }
      @keyframes flashB {
        0%, 100% { fill: #fff; stroke-width: 1; }
        50% { fill: #fff7ed; stroke-width: 2; }
      }
      @keyframes flashC {
        0%, 100% { fill: #fff; stroke-width: 1; }
        50% { fill: #fefce8; stroke-width: 2; }
      }
      @keyframes flashD {
        0%, 100% { fill: #fff; stroke-width: 1; }
        50% { fill: #f0fdf4; stroke-width: 2; }
      }
      @keyframes rejectPulse {
        0%, 100% { opacity: 0.8; }
        50% { opacity: 1; }
      }
      .flash-a { animation: flashA 1.6s ease-in-out infinite; }
      .flash-b { animation: flashB 1.6s ease-in-out infinite 0.4s; }
      .flash-c { animation: flashC 1.6s ease-in-out infinite 0.8s; }
      .flash-d { animation: flashD 1.6s ease-in-out infinite 1.2s; }
      .reject-pulse { animation: rejectPulse 1.4s ease-in-out infinite; }

      /* Shimmer */
      @keyframes shimmer {
        0%, 100% { opacity: 0.5; }
        50% { opacity: 1; }
      }
      .shimmer { animation: shimmer 1.8s ease-in-out infinite; }

      /* Send pulse */
      @keyframes sendPulse {
        0%, 100% { opacity: 0.7; transform: translateX(0); }
        50% { opacity: 1; transform: translateX(3px); }
      }
      .send-pulse { animation: sendPulse 1.2s ease-in-out infinite; transform-origin: center; }

      /* Diamond bounce */
      @keyframes diamondBounce {
        0%, 100% { transform: scale(1); }
        40% { transform: scale(1.1); }
        70% { transform: scale(0.94); }
      }
      .diamond-bounce { animation: diamondBounce 2.2s ease-in-out infinite; transform-origin: 660px 470px; }

      /* Tool pulse */
      @keyframes toolPulse {
        0%, 100% { opacity: 0.85; }
        50% { opacity: 1; }
      }
      .tool-pulse { animation: toolPulse 2s ease-in-out infinite; }
    </style>

    <!-- Arrow markers -->
    <marker id="arrGray" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
      <polygon points="0 0, 8 3, 0 6" fill="#64748b"/>
    </marker>
    <marker id="arrLight" markerWidth="6" markerHeight="5" refX="5" refY="2.5" orient="auto">
      <polygon points="0 0, 6 2.5, 0 5" fill="#94a3b8"/>
    </marker>
    <marker id="arrGreen" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
      <polygon points="0 0, 8 3, 0 6" fill="#22c55e"/>
    </marker>
    <marker id="arrRed" markerWidth="8" markerHeight="6" refX="7" refY="3" orient="auto">
      <polygon points="0 0, 8 3, 0 6" fill="#ef4444"/>
    </marker>
  </defs>

  <!-- Background -->
  <rect width="1400" height="950" fill="#fafbfc"/>

  <!-- ============================================================ -->
  <!-- SECTION 1: TRIGGER / INPUT -->
  <!-- ============================================================ -->
  <g id="trigger-section" class="breathe-slow">
    <rect x="250" y="25" width="900" height="105" rx="14" fill="#f5f0fa" stroke="#d8cce8" stroke-width="1.5"/>
    <text x="275" y="52" fill="#5b4a6a" font-family="system-ui,sans-serif" font-size="16" font-weight="700">Trigger / Input</text>

    <!-- Message -->
    <g id="trigger-message">
      <rect x="290" y="65" width="170" height="50" rx="8" fill="#ffffff" stroke="#e2d8ef" stroke-width="1"/>
      <rect x="306" y="80" width="18" height="13" rx="3" fill="none" stroke="#8b7e9b" stroke-width="1.3"/>
      <polygon points="310,93 314,98 318,93" fill="none" stroke="#8b7e9b" stroke-width="1.3"/>
      <text x="332" y="95" fill="#6b5e7b" font-family="system-ui,sans-serif" font-size="13">消息输入</text>
    </g>

    <!-- Event -->
    <g id="trigger-event">
      <rect x="480" y="65" width="170" height="50" rx="8" fill="#ffffff" stroke="#e2d8ef" stroke-width="1"/>
      <rect x="496" y="78" width="16" height="15" rx="2" fill="none" stroke="#8b7e9b" stroke-width="1.3"/>
      <line x1="496" y1="84" x2="512" y2="84" stroke="#8b7e9b" stroke-width="1.3"/>
      <line x1="500" y1="78" x2="500" y2="75" stroke="#8b7e9b" stroke-width="1.3"/>
      <line x1="508" y1="78" x2="508" y2="75" stroke="#8b7e9b" stroke-width="1.3"/>
      <text x="520" y="95" fill="#6b5e7b" font-family="system-ui,sans-serif" font-size="13">日历事件</text>
    </g>

    <!-- API -->
    <g id="trigger-api">
      <rect x="670" y="65" width="170" height="50" rx="8" fill="#ffffff" stroke="#e2d8ef" stroke-width="1"/>
      <circle cx="692" cy="88" r="4" fill="none" stroke="#8b7e9b" stroke-width="1.3"/>
      <circle cx="704" cy="88" r="4" fill="none" stroke="#8b7e9b" stroke-width="1.3"/>
      <line x1="696" y1="88" x2="700" y2="88" stroke="#8b7e9b" stroke-width="1.3"/>
      <text x="716" y="95" fill="#6b5e7b" font-family="system-ui,sans-serif" font-size="13">API 调用</text>
    </g>

    <!-- Schedule -->
    <g id="trigger-schedule">
      <rect x="860" y="65" width="170" height="50" rx="8" fill="#ffffff" stroke="#e2d8ef" stroke-width="1"/>
      <circle cx="882" cy="89" r="8" fill="none" stroke="#8b7e9b" stroke-width="1.3"/>
      <line x1="882" y1="89" x2="882" y2="84" stroke="#8b7e9b" stroke-width="1.3"/>
      <line x1="882" y1="89" x2="886" y2="91" stroke="#8b7e9b" stroke-width="1.3"/>
      <text x="898" y="95" fill="#6b5e7b" font-family="system-ui,sans-serif" font-size="13">定时调度</text>
    </g>
  </g>

  <!-- Arrow Trigger → Core -->
  <line x1="700" y1="130" x2="700" y2="155" stroke="#64748b" stroke-width="2" marker-end="url(#arrGray)"/>

  <!-- ============================================================ -->
  <!-- SECTION 2: COGNITIVE CORE -->
  <!-- ============================================================ -->
  <g id="cognitive-core">
    <rect x="100" y="155" width="1200" height="350" rx="18" fill="#f8f7fb" stroke="#e0dce8" stroke-width="1.5"/>
    <text x="700" y="185" text-anchor="middle" fill="#4a3f5c" font-family="system-ui,sans-serif" font-size="18" font-weight="800">Cognitive Core · 智能体循环</text>

    <!-- THINK -->
    <g id="think-stage" class="breathe">
      <rect x="160" y="210" width="300" height="160" rx="12" fill="#eef2ff" stroke="#c7d2fe" stroke-width="1.2"/>
      <rect x="160" y="210" width="300" height="34" rx="12" fill="#dbe4ff"/>
      <rect x="160" y="232" width="300" height="12" fill="#dbe4ff"/>
      <text x="310" y="233" text-anchor="middle" fill="#4338ca" font-family="system-ui,sans-serif" font-size="14" font-weight="700">Think</text>
      <!-- Cloud icon with shimmer dots -->
      <ellipse cx="270" cy="280" rx="22" ry="14" fill="none" stroke="#6366f1" stroke-width="1.3"/>
      <ellipse cx="256" cy="284" rx="12" ry="9" fill="none" stroke="#6366f1" stroke-width="1.3"/>
      <ellipse cx="284" cy="284" rx="14" ry="10" fill="none" stroke="#6366f1" stroke-width="1.3"/>
      <circle cx="262" cy="292" r="2.5" fill="#818cf8" class="shimmer"/>
      <circle cx="270" cy="294" r="2.5" fill="#818cf8" class="shimmer" style="animation-delay:0.4s"/>
      <circle cx="278" cy="292" r="2.5" fill="#818cf8" class="shimmer" style="animation-delay:0.8s"/>
      <text x="310" y="340" text-anchor="middle" fill="#4a4a6a" font-family="system-ui,sans-serif" font-size="11">推理 · 规划 · 反思</text>
      <text x="310" y="358" text-anchor="middle" fill="#6b6b8a" font-family="system-ui,sans-serif" font-size="10">思维链 · Chain-of-Thought</text>
    </g>

    <!-- Arrow Think → Act (animated dashes + moving dot) -->
    <line x1="460" y1="290" x2="540" y2="290" stroke="#64748b" stroke-width="2" stroke-dasharray="8,4" class="flow-line" marker-end="url(#arrGray)"/>
    <circle r="4" fill="#6366f1">
      <animateMotion dur="1.5s" repeatCount="indefinite" path="M 460 290 L 540 290"/>
    </circle>

    <!-- ACT -->
    <g id="act-stage" class="breathe" style="animation-delay:0.8s">
      <rect x="550" y="210" width="300" height="160" rx="12" fill="#ecfdf5" stroke="#a7f3d0" stroke-width="1.2"/>
      <rect x="550" y="210" width="300" height="34" rx="12" fill="#d1fae5"/>
      <rect x="550" y="232" width="300" height="12" fill="#d1fae5"/>
      <text x="700" y="233" text-anchor="middle" fill="#065f46" font-family="system-ui,sans-serif" font-size="14" font-weight="700">Act</text>
      <!-- Big gear CW -->
      <g transform="translate(660, 275)" class="gear-cw">
        <circle cx="0" cy="0" r="16" fill="none" stroke="#10b981" stroke-width="1.3"/>
        <circle cx="0" cy="0" r="6" fill="none" stroke="#10b981" stroke-width="1.3"/>
        <line x1="0" y1="-16" x2="0" y2="-11" stroke="#10b981" stroke-width="2"/>
        <line x1="0" y1="11" x2="0" y2="16" stroke="#10b981" stroke-width="2"/>
        <line x1="-16" y1="0" x2="-11" y2="0" stroke="#10b981" stroke-width="2"/>
        <line x1="11" y1="0" x2="16" y2="0" stroke="#10b981" stroke-width="2"/>
        <line x1="-11" y1="-11" x2="-8" y2="-8" stroke="#10b981" stroke-width="2"/>
        <line x1="8" y1="8" x2="11" y2="11" stroke="#10b981" stroke-width="2"/>
        <line x1="-11" y1="11" x2="-8" y2="8" stroke="#10b981" stroke-width="2"/>
        <line x1="8" y1="-8" x2="11" y2="-11" stroke="#10b981" stroke-width="2"/>
      </g>
      <!-- Small gear CCW -->
      <g transform="translate(720, 290)" class="gear-ccw">
        <circle cx="0" cy="0" r="16" fill="none" stroke="#34d399" stroke-width="1.3"/>
        <circle cx="0" cy="0" r="6" fill="none" stroke="#34d399" stroke-width="1.3"/>
        <line x1="0" y1="-16" x2="0" y2="-11" stroke="#34d399" stroke-width="2"/>
        <line x1="0" y1="11" x2="0" y2="16" stroke="#34d399" stroke-width="2"/>
        <line x1="-16" y1="0" x2="-11" y2="0" stroke="#34d399" stroke-width="2"/>
        <line x1="11" y1="0" x2="16" y2="0" stroke="#34d399" stroke-width="2"/>
        <line x1="-11" y1="-11" x2="-8" y2="-8" stroke="#34d399" stroke-width="2"/>
        <line x1="8" y1="8" x2="11" y2="11" stroke="#34d399" stroke-width="2"/>
        <line x1="-11" y1="11" x2="-8" y2="8" stroke="#34d399" stroke-width="2"/>
        <line x1="8" y1="-8" x2="11" y2="-11" stroke="#34d399" stroke-width="2"/>
      </g>
      <text x="700" y="340" text-anchor="middle" fill="#4a4a6a" font-family="system-ui,sans-serif" font-size="11">选择工具 · 组装调用</text>
      <text x="700" y="358" text-anchor="middle" fill="#6b6b8a" font-family="system-ui,sans-serif" font-size="10">工具选择 · 编排调度</text>
    </g>

    <!-- Arrow Act → Observe -->
    <line x1="850" y1="290" x2="930" y2="290" stroke="#64748b" stroke-width="2" stroke-dasharray="8,4" class="flow-line" style="animation-delay:0.5s" marker-end="url(#arrGray)"/>
    <circle r="4" fill="#10b981">
      <animateMotion dur="1.5s" repeatCount="indefinite" begin="0.75s" path="M 850 290 L 930 290"/>
    </circle>

    <!-- OBSERVE -->
    <g id="observe-stage" class="breathe" style="animation-delay:1.6s">
      <rect x="940" y="210" width="300" height="160" rx="12" fill="#fdf2f8" stroke="#fbcfe8" stroke-width="1.2"/>
      <rect x="940" y="210" width="300" height="34" rx="12" fill="#fce7f3"/>
      <rect x="940" y="232" width="300" height="12" fill="#fce7f3"/>
      <text x="1090" y="233" text-anchor="middle" fill="#9d174d" font-family="system-ui,sans-serif" font-size="14" font-weight="700">Observe</text>
      <!-- Eye with pulsing pupil -->
      <ellipse cx="1050" cy="282" rx="28" ry="16" fill="none" stroke="#ec4899" stroke-width="1.3"/>
      <ellipse cx="1050" cy="282" rx="22" ry="12" fill="none" stroke="#ec4899" stroke-width="1.3"/>
      <circle cx="1050" cy="282" r="9" fill="none" stroke="#ec4899" stroke-width="1.3"/>
      <circle cx="1050" cy="282" r="5" fill="#be185d">
        <animate attributeName="r" values="4;6;4" dur="1.5s" repeatCount="indefinite"/>
        <animate attributeName="fill-opacity" values="1;0.5;1" dur="1.5s" repeatCount="indefinite"/>
      </circle>
      <text x="1090" y="340" text-anchor="middle" fill="#4a4a6a" font-family="system-ui,sans-serif" font-size="11">解析结果 · 更新状态</text>
      <text x="1090" y="358" text-anchor="middle" fill="#6b6b8a" font-family="system-ui,sans-serif" font-size="10">结果解析 · 状态更新</text>
    </g>

    <!-- Cycle dashed arrow Observe → Think -->
    <path d="M 1200 290 Q 1220 290 1220 320 Q 1220 400 700 400 Q 180 400 180 340 Q 180 320 200 310"
          fill="none" stroke="#94a3b8" stroke-width="2" stroke-dasharray="8,4" class="cycle-line" marker-end="url(#arrLight)"/>
    <circle r="5" fill="#94a3b8" opacity="0.9">
      <animateMotion dur="3s" repeatCount="indefinite" path="M 1200 290 Q 1220 290 1220 320 Q 1220 400 700 400 Q 180 400 180 340 Q 180 320 200 310"/>
    </circle>

    <!-- Done diamond -->
    <g id="done-decision" class="diamond-bounce">
      <polygon points="660,430 740,470 660,510 580,470" fill="#ffffff" stroke="#475569" stroke-width="1.5"/>
      <text x="660" y="475" text-anchor="middle" fill="#1e293b" font-family="system-ui,sans-serif" font-size="14" font-weight="700">Done?</text>
    </g>

    <!-- Arrow Observe → Done -->
    <path d="M 1090 370 L 1090 420 Q 1090 430 1080 430 L 745 430" fill="none" stroke="#64748b" stroke-width="1.8" marker-end="url(#arrGray)"/>
    <circle r="4" fill="#ec4899">
      <animateMotion dur="1.8s" repeatCount="indefinite" path="M 1090 370 L 1090 420 Q 1090 430 1080 430 L 745 430"/>
    </circle>

    <!-- Yes → Output -->
    <line x1="740" y1="470" x2="960" y2="470" stroke="#22c55e" stroke-width="2" stroke-dasharray="8,4" class="flow-line" style="animation-delay:0.3s" marker-end="url(#arrGreen)"/>
    <text x="850" y="462" text-anchor="middle" fill="#22c55e" font-family="system-ui,sans-serif" font-size="11" font-weight="600">Yes</text>

    <!-- No → back to Think -->
    <path d="M 660 510 L 660 545 Q 660 560 640 560 L 310 560 Q 270 560 270 535 L 270 375"
          fill="none" stroke="#ef4444" stroke-width="2" stroke-dasharray="6,3" class="reject-line" marker-end="url(#arrRed)"/>
    <circle r="4" fill="#ef4444" opacity="0.9">
      <animateMotion dur="2s" repeatCount="indefinite" path="M 660 510 L 660 545 Q 660 560 640 560 L 310 560 Q 270 560 270 535 L 270 375"/>
    </circle>
    <text x="675" y="538" fill="#ef4444" font-family="system-ui,sans-serif" font-size="10" font-weight="600">No</text>

    <!-- Output box -->
    <g id="output-box">
      <rect x="970" y="445" width="110" height="50" rx="8" fill="#d1fae5" stroke="#6ee7b7" stroke-width="1.2"/>
      <text x="1025" y="468" text-anchor="middle" fill="#065f46" font-family="system-ui,sans-serif" font-size="11" font-weight="600">Output</text>
      <text x="1025" y="484" text-anchor="middle" fill="#065f46" font-family="system-ui,sans-serif" font-size="16">⬆</text>
    </g>
  </g>

  <!-- Arrows Core → Bottom -->
  <line x1="290" y1="505" x2="290" y2="535" stroke="#64748b" stroke-width="1.8" class="flow-line" marker-end="url(#arrGray)"/>
  <line x1="700" y1="505" x2="700" y2="535" stroke="#64748b" stroke-width="1.8" class="flow-line" style="animation-delay:0.5s" marker-end="url(#arrGray)"/>
  <line x1="1150" y1="505" x2="1150" y2="535" stroke="#64748b" stroke-width="1.8" class="flow-line" style="animation-delay:1s" marker-end="url(#arrGray)"/>

  <!-- ============================================================ -->
  <!-- BOTTOM THREE COLUMNS -->
  <!-- ============================================================ -->

  <!-- LEFT: Memory -->
  <g id="memory-section" class="breathe-slow" style="animation-delay:0.5s">
    <rect x="60" y="535" width="400" height="370" rx="14" fill="#f8fafe" stroke="#dbeafe" stroke-width="1.5"/>
    <text x="260" y="565" text-anchor="middle" fill="#1e40af" font-family="system-ui,sans-serif" font-size="16" font-weight="700">Memory · 记忆</text>

    <!-- Working Memory -->
    <g id="working-memory">
      <rect x="85" y="595" width="350" height="110" rx="10" fill="#ffffff" stroke="#bfdbfe" stroke-width="1"/>
      <text x="260" y="622" text-anchor="middle" fill="#2563eb" font-family="system-ui,sans-serif" font-size="13" font-weight="700">Working Memory</text>
      <!-- Animated stack -->
      <rect x="170" y="638" width="28" height="6" rx="2" fill="#93c5fd" stroke="#60a5fa" stroke-width="0.8" class="shimmer"/>
      <rect x="168" y="648" width="32" height="6" rx="2" fill="#bfdbfe" stroke="#93c5fd" stroke-width="0.8" class="shimmer" style="animation-delay:0.3s"/>
      <rect x="166" y="658" width="36" height="6" rx="2" fill="#dbeafe" stroke="#93c5fd" stroke-width="0.8" class="shimmer" style="animation-delay:0.6s"/>
      <text x="260" y="680" text-anchor="middle" fill="#4a4a6a" font-family="system-ui,sans-serif" font-size="11">短期上下文窗口</text>
      <text x="260" y="696" text-anchor="middle" fill="#6b6b8a" font-family="system-ui,sans-serif" font-size="10">会话历史 · 工具调用记录</text>
    </g>

    <!-- Long-term Memory -->
    <g id="longterm-memory">
      <rect x="85" y="720" width="350" height="110" rx="10" fill="#ffffff" stroke="#bfdbfe" stroke-width="1"/>
      <text x="260" y="747" text-anchor="middle" fill="#2563eb" font-family="system-ui,sans-serif" font-size="13" font-weight="700">Long-term Memory</text>
      <!-- Animated database -->
      <ellipse cx="200" cy="768" rx="14" ry="5" fill="none" stroke="#60a5fa" stroke-width="1.2">
        <animate attributeName="stroke-opacity" values="1;0.3;1" dur="2s" repeatCount="indefinite"/>
      </ellipse>
      <line x1="186" y1="768" x2="186" y2="783" stroke="#60a5fa" stroke-width="1.2">
        <animate attributeName="stroke-opacity" values="1;0.3;1" dur="2s" repeatCount="indefinite"/>
      </line>
      <line x1="214" y1="768" x2="214" y2="783" stroke="#60a5fa" stroke-width="1.2">
        <animate attributeName="stroke-opacity" values="1;0.3;1" dur="2s" repeatCount="indefinite" begin="0.5s"/>
      </line>
      <ellipse cx="200" cy="783" rx="14" ry="5" fill="none" stroke="#60a5fa" stroke-width="1.2">
        <animate attributeName="stroke-opacity" values="1;0.3;1" dur="2s" repeatCount="indefinite" begin="1s"/>
      </ellipse>
      <ellipse cx="200" cy="775" rx="14" ry="5" fill="none" stroke="#93c5fd" stroke-width="0.8">
        <animate attributeName="stroke-opacity" values="0.8;0.2;0.8" dur="2s" repeatCount="indefinite" begin="1.5s"/>
      </ellipse>
      <text x="260" y="805" text-anchor="middle" fill="#4a4a6a" font-family="system-ui,sans-serif" font-size="11">长期向量知识库</text>
      <text x="260" y="821" text-anchor="middle" fill="#6b6b8a" font-family="system-ui,sans-serif" font-size="10">RAG · 知识图谱</text>
    </g>
  </g>

  <!-- CENTER: Safety Layers -->
  <g id="safety-section" class="breathe-slow" style="animation-delay:1s">
    <rect x="490" y="535" width="420" height="370" rx="14" fill="#fefbfb" stroke="#fecaca" stroke-width="1.5"/>
    <text x="700" y="565" text-anchor="middle" fill="#991b1b" font-family="system-ui,sans-serif" font-size="16" font-weight="700">Safety Layers · 安全校验</text>

    <!-- 4 Safety Gates -->
    <g id="safety-gates">
      <!-- Validate -->
      <rect x="520" y="595" width="80" height="60" rx="8" stroke="#fca5a5" stroke-width="1" class="flash-a"/>
      <text x="560" y="618" text-anchor="middle" fill="#dc2626" font-family="system-ui,sans-serif" font-size="16">🛡</text>
      <text x="560" y="642" text-anchor="middle" fill="#991b1b" font-family="system-ui,sans-serif" font-size="11" font-weight="600">Validate</text>
      <text x="560" y="654" text-anchor="middle" fill="#6b6b8a" font-family="system-ui,sans-serif" font-size="9">输入校验</text>
      <!-- Arrow -->
      <line x1="600" y1="625" x2="620" y2="625" stroke="#cbd5e1" stroke-width="1.5" stroke-dasharray="4,3" class="flow-line" marker-end="url(#arrLight)"/>

      <!-- Scope -->
      <rect x="624" y="595" width="80" height="60" rx="8" stroke="#fdba74" stroke-width="1" class="flash-b"/>
      <text x="664" y="618" text-anchor="middle" fill="#ea580c" font-family="system-ui,sans-serif" font-size="16">🔐</text>
      <text x="664" y="642" text-anchor="middle" fill="#9a3412" font-family="system-ui,sans-serif" font-size="11" font-weight="600">Scope</text>
      <text x="664" y="654" text-anchor="middle" fill="#6b6b8a" font-family="system-ui,sans-serif" font-size="9">权限范围</text>
      <!-- Arrow -->
      <line x1="704" y1="625" x2="724" y2="625" stroke="#cbd5e1" stroke-width="1.5" stroke-dasharray="4,3" class="flow-line" style="animation-delay:0.5s" marker-end="url(#arrLight)"/>

      <!-- Budget -->
      <rect x="728" y="595" width="80" height="60" rx="8" stroke="#fde68a" stroke-width="1" class="flash-c"/>
      <text x="768" y="618" text-anchor="middle" fill="#ca8a04" font-family="system-ui,sans-serif" font-size="16">💰</text>
      <text x="768" y="642" text-anchor="middle" fill="#854d0e" font-family="system-ui,sans-serif" font-size="11" font-weight="600">Budget</text>
      <text x="768" y="654" text-anchor="middle" fill="#6b6b8a" font-family="system-ui,sans-serif" font-size="9">成本限速</text>
      <!-- Arrow -->
      <line x1="808" y1="625" x2="828" y2="625" stroke="#cbd5e1" stroke-width="1.5" stroke-dasharray="4,3" class="flow-line" style="animation-delay:1s" marker-end="url(#arrLight)"/>

      <!-- Allow -->
      <rect x="832" y="595" width="70" height="60" rx="8" stroke="#86efac" stroke-width="1" class="flash-d"/>
      <text x="867" y="620" text-anchor="middle" fill="#16a34a" font-family="system-ui,sans-serif" font-size="16">✅</text>
      <text x="867" y="644" text-anchor="middle" fill="#166534" font-family="system-ui,sans-serif" font-size="11" font-weight="600">Allow</text>
    </g>

    <!-- Pass → -->
    <path d="M 902 625 L 925 625 Q 930 625 930 635 L 930 700" fill="none" stroke="#22c55e" stroke-width="1.8" stroke-dasharray="6,3" class="flow-line" style="animation-delay:0.7s" marker-end="url(#arrGreen)"/>
    <circle r="3.5" fill="#22c55e">
      <animateMotion dur="2s" repeatCount="indefinite" path="M 902 625 L 925 625 Q 930 625 930 635 L 930 700"/>
    </circle>
    <text x="912" y="658" fill="#22c55e" font-family="system-ui,sans-serif" font-size="9" font-weight="600">通过</text>

    <!-- Reject path -->
    <path d="M 630 655 L 630 700 Q 630 710 645 710 L 700 710" fill="none" stroke="#ef4444" stroke-width="1.5" stroke-dasharray="5,3" class="reject-line" marker-end="url(#arrRed)"/>
    <text x="640" y="680" fill="#ef4444" font-family="system-ui,sans-serif" font-size="9" font-weight="600">拒绝</text>

    <!-- Reject + Replan box -->
    <g id="reject-box" class="reject-pulse">
      <rect x="570" y="712" width="260" height="50" rx="8" fill="#fef2f2" stroke="#fca5a5" stroke-width="1"/>
      <text x="700" y="734" text-anchor="middle" fill="#dc2626" font-family="system-ui,sans-serif" font-size="12" font-weight="600">↻ Reject + Replan</text>
      <text x="700" y="751" text-anchor="middle" fill="#6b6b8a" font-family="system-ui,sans-serif" font-size="10">拒绝并重新规划，回流至 Think</text>
    </g>

    <!-- Pass indicator -->
    <g id="pass-indicator">
      <rect x="920" y="770" width="80" height="30" rx="6" fill="#f0fdf4" stroke="#86efac" stroke-width="1"/>
      <text x="960" y="790" text-anchor="middle" fill="#166534" font-family="system-ui,sans-serif" font-size="11" font-weight="600">→ 调度分发</text>
    </g>
  </g>

  <!-- RIGHT: Tool Execution -->
  <g id="tools-section" class="breathe-slow" style="animation-delay:1.5s">
    <rect x="940" y="535" width="400" height="370" rx="14" fill="#fffdf5" stroke="#fde68a" stroke-width="1.5"/>
    <text x="1140" y="565" text-anchor="middle" fill="#92400e" font-family="system-ui,sans-serif" font-size="16" font-weight="700">Tool Execution · 工具执行</text>

    <!-- Tool Types -->
    <g id="tool-types" class="tool-pulse">
      <rect x="965" y="600" width="350" height="80" rx="10" fill="#ffffff" stroke="#fde68a" stroke-width="1"/>
      <text x="1140" y="625" text-anchor="middle" fill="#a16207" font-family="system-ui,sans-serif" font-size="13" font-weight="700">Tool Types · 工具类型</text>
      <g transform="translate(1020, 642)">
        <rect x="-10" y="-6" width="20" height="12" rx="2" fill="none" stroke="#d97706" stroke-width="1.2"/>
        <circle cx="0" cy="0" r="4" fill="none" stroke="#d97706" stroke-width="1.2"/>
      </g>
      <text x="1140" y="658" text-anchor="middle" fill="#4a4a6a" font-family="system-ui,sans-serif" font-size="10">Bash · API · 文件读写 · 浏览器 · MCP</text>
      <text x="1140" y="674" text-anchor="middle" fill="#6b6b8a" font-family="system-ui,sans-serif" font-size="10">函数调用 · 插件系统 · 自定义工具</text>
    </g>

    <!-- Dispatch -->
    <g id="dispatch-box" class="tool-pulse">
      <rect x="965" y="700" width="350" height="80" rx="10" fill="#ffffff" stroke="#fde68a" stroke-width="1"/>
      <text x="1140" y="725" text-anchor="middle" fill="#a16207" font-family="system-ui,sans-serif" font-size="13" font-weight="700">Dispatch · 调度分发</text>
      <g transform="translate(1018, 742)" class="send-pulse">
        <polygon points="0,4 10,10 0,16" fill="none" stroke="#d97706" stroke-width="1.2"/>
        <line x1="10" y1="10" x2="18" y2="4" stroke="#d97706" stroke-width="1.2"/>
        <line x1="10" y1="10" x2="18" y2="16" stroke="#d97706" stroke-width="1.2"/>
      </g>
      <text x="1140" y="758" text-anchor="middle" fill="#4a4a6a" font-family="system-ui,sans-serif" font-size="10">并行调度 · 超时重试 · 结果聚合</text>
      <text x="1140" y="774" text-anchor="middle" fill="#6b6b8a" font-family="system-ui,sans-serif" font-size="10">限流 · 降级 · 熔断</text>
    </g>

    <!-- Return Result -->
    <g id="return-box" class="tool-pulse" style="animation-delay:1s">
      <rect x="965" y="800" width="350" height="80" rx="10" fill="#ffffff" stroke="#fde68a" stroke-width="1"/>
      <text x="1140" y="825" text-anchor="middle" fill="#a16207" font-family="system-ui,sans-serif" font-size="13" font-weight="700">Return Result · 结果回传</text>
      <g transform="translate(1018, 842)" class="send-pulse" style="animation-delay:0.7s">
        <path d="M 18 10 L 2 10 L 6 6 M 2 10 L 6 14" fill="none" stroke="#d97706" stroke-width="1.2"/>
        <rect x="0" y="4" width="18" height="12" rx="2" fill="none" stroke="#d97706" stroke-width="1.2"/>
      </g>
      <text x="1140" y="858" text-anchor="middle" fill="#4a4a6a" font-family="system-ui,sans-serif" font-size="10">结果解析 · 格式化 · 输入 Observe</text>
      <text x="1140" y="874" text-anchor="middle" fill="#6b6b8a" font-family="system-ui,sans-serif" font-size="10">结构化输出 · 错误码映射</text>
    </g>
  </g>
</svg>
`;

async function main() {
  console.log('Agent Loop — Continuous Animation\n');

  const pipeline = new SVGAnimationPipeline({
    input: svgContent,
    output: './output/agent-loop.gif',
    fps: 30,
    duration: 6000,
    width: 1400,
    height: 950,
    background: '#fafbfc',
    quality: 'high',
  });

  // All modules visible from start — CSS/SMIL animations run continuously.
  // No entrance animations needed.

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
