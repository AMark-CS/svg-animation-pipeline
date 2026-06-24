/**
 * Agent Loop Mechanism — Beautiful Flat PPT-Style Architecture Diagram
 *
 * All modules visible from the start, continuous dynamic animation:
 * - Flowing dashed arrows
 * - Moving dots along paths
 * - Spinning gears (CW/CCW)
 * - Breathing sections
 * - Flashing safety gates
 * - Shimmering memory icons
 * - Pulsing dispatch icons
 */

import { SVGAnimationPipeline } from '../src/pipeline';
import { ProgressInfo } from '../src/types';

const svgContent = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1400 950" width="1400" height="950">
  <defs>
    <style>
      /* ── Arrow flow animations ── */
      @keyframes dashFlow {
        to { stroke-dashoffset: -24; }
      }
      @keyframes dashCycle {
        to { stroke-dashoffset: -22; }
      }
      @keyframes dashReject {
        to { stroke-dashoffset: -16; }
      }
      .flow-line { animation: dashFlow 1.2s linear infinite; }
      .cycle-line { animation: dashCycle 1.8s linear infinite; }
      .reject-line { animation: dashReject 1s linear infinite; }

      /* ── Gear spin ── */
      @keyframes spinCW  { to { transform: rotate(360deg); } }
      @keyframes spinCCW { to { transform: rotate(-360deg); } }
      .gear-cw  { animation: spinCW  4s linear infinite; transform-origin: center; }
      .gear-ccw { animation: spinCCW 3s linear infinite; transform-origin: center; }

      /* ── Breathing opacity ── */
      @keyframes breathe {
        0%, 100% { opacity: 1; }
        50%       { opacity: 0.80; }
      }
      @keyframes breatheSlow {
        0%, 100% { opacity: 0.90; }
        50%       { opacity: 0.65; }
      }
      .breathe      { animation: breathe      2.4s ease-in-out infinite; }
      .breathe-slow { animation: breatheSlow 3.4s ease-in-out infinite; }

      /* ── Safety gate flash ── */
      @keyframes flashA {
        0%, 100% { fill: #fff; stroke-width: 1.2; }
        50%       { fill: #fff1f2; stroke-width: 2; }
      }
      @keyframes flashB {
        0%, 100% { fill: #fff; stroke-width: 1.2; }
        50%       { fill: #fff7ed; stroke-width: 2; }
      }
      @keyframes flashC {
        0%, 100% { fill: #fff; stroke-width: 1.2; }
        50%       { fill: #fefce8; stroke-width: 2; }
      }
      @keyframes flashD {
        0%, 100% { fill: #fff; stroke-width: 1.2; }
        50%       { fill: #f0fdf4; stroke-width: 2; }
      }
      @keyframes rejectPulse {
        0%, 100% { opacity: 0.75; }
        50%       { opacity: 1; }
      }
      .flash-a { animation: flashA 1.6s ease-in-out infinite; }
      .flash-b { animation: flashB 1.6s ease-in-out infinite 0.4s; }
      .flash-c { animation: flashC 1.6s ease-in-out infinite 0.8s; }
      .flash-d { animation: flashD 1.6s ease-in-out infinite 1.2s; }
      .reject-pulse { animation: rejectPulse 1.4s ease-in-out infinite; }

      /* ── Shimmer ── */
      @keyframes shimmer {
        0%, 100% { opacity: 0.4; }
        50%       { opacity: 1; }
      }
      .shimmer { animation: shimmer 1.8s ease-in-out infinite; }

      /* ── Send pulse ── */
      @keyframes sendPulse {
        0%, 100% { opacity: 0.7; transform: translateX(0); }
        50%       { opacity: 1;   transform: translateX(4px); }
      }
      .send-pulse { animation: sendPulse 1.2s ease-in-out infinite; transform-origin: center; }

      /* ── Diamond bounce ── */
      @keyframes diamondBounce {
        0%, 100% { transform: scale(1);    }
        35%       { transform: scale(1.1); }
        65%       { transform: scale(0.94); }
      }
      .diamond-bounce { animation: diamondBounce 2.2s ease-in-out infinite; transform-origin: 660px 470px; }

      /* ── Tool pulse ── */
      @keyframes toolPulse {
        0%, 100% { opacity: 0.82; }
        50%       { opacity: 1; }
      }
      .tool-pulse { animation: toolPulse 2s ease-in-out infinite; }
    </style>

    <!-- Arrow markers -->
    <marker id="arrGray"  viewBox="0 0 10 8" markerWidth="8" markerHeight="6" refX="8" refY="4" orient="auto">
      <polygon points="0 1, 10 4, 0 7" fill="#64748b"/>
    </marker>
    <marker id="arrLight" viewBox="0 0 10 8" markerWidth="6" markerHeight="5" refX="8" refY="4" orient="auto">
      <polygon points="0 1, 10 4, 0 7" fill="#94a3b8"/>
    </marker>
    <marker id="arrGreen" viewBox="0 0 10 8" markerWidth="8" markerHeight="6" refX="8" refY="4" orient="auto">
      <polygon points="0 1, 10 4, 0 7" fill="#22c55e"/>
    </marker>
    <marker id="arrRed"   viewBox="0 0 10 8" markerWidth="8" markerHeight="6" refX="8" refY="4" orient="auto">
      <polygon points="0 1, 10 4, 0 7" fill="#ef4444"/>
    </marker>
  </defs>

  <!-- ── Background ── -->
  <rect width="1400" height="950" fill="#fafbfc"/>

  <!-- ══════════════════════════════════════════════════════════ -->
  <!-- SECTION 1: TRIGGER / INPUT                               -->
  <!-- ══════════════════════════════════════════════════════════ -->
  <g id="trigger-section" class="breathe-slow">
    <!-- Background card -->
    <rect x="250" y="25" width="900" height="105" rx="16" fill="#f4efff" stroke="#d8cce8" stroke-width="1.5"/>
    <text x="275" y="52" fill="#4a3875" font-family="system-ui,sans-serif" font-size="16" font-weight="700" letter-spacing="0.3">Trigger / Input</text>

    <!-- Message icon — elegant chat bubble -->
    <g id="trigger-message">
      <rect x="290" y="65" width="170" height="50" rx="10" fill="#ffffff" stroke="#e2d8ef" stroke-width="1.2"/>
      <rect x="304" y="77" width="24" height="18" rx="5" fill="none" stroke="#a78bcd" stroke-width="1.5"/>
      <line x1="308" y1="84" x2="324" y2="84" stroke="#c4b0de" stroke-width="1.5" stroke-linecap="round"/>
      <line x1="308" y1="89" x2="319" y2="89" stroke="#c4b0de" stroke-width="1.5" stroke-linecap="round"/>
      <polygon points="310,95 316,100 320,95" fill="none" stroke="#a78bcd" stroke-width="1.5" stroke-linejoin="round"/>
      <text x="340" y="96" fill="#6b5e8a" font-family="system-ui,sans-serif" font-size="13">消息输入</text>
    </g>

    <!-- Calendar icon — clean grid -->
    <g id="trigger-event">
      <rect x="480" y="65" width="170" height="50" rx="10" fill="#ffffff" stroke="#e2d8ef" stroke-width="1.2"/>
      <rect x="494" y="76" width="22" height="20" rx="4" fill="none" stroke="#a78bcd" stroke-width="1.5"/>
      <line x1="494" y1="82" x2="516" y2="82" stroke="#a78bcd" stroke-width="1.5"/>
      <line x1="499" y1="74" x2="499" y2="78" stroke="#a78bcd" stroke-width="1.5" stroke-linecap="round"/>
      <line x1="511" y1="74" x2="511" y2="78" stroke="#a78bcd" stroke-width="1.5" stroke-linecap="round"/>
      <circle cx="500" cy="90" r="1.5" fill="#c4b0de"/>
      <circle cx="505" cy="90" r="1.5" fill="#c4b0de"/>
      <circle cx="510" cy="90" r="1.5" fill="#c4b0de"/>
      <text x="532" y="96" fill="#6b5e8a" font-family="system-ui,sans-serif" font-size="13">日历事件</text>
    </g>

    <!-- API icon — connected nodes -->
    <g id="trigger-api">
      <rect x="670" y="65" width="170" height="50" rx="10" fill="#ffffff" stroke="#e2d8ef" stroke-width="1.2"/>
      <circle cx="692" cy="88" r="6" fill="none" stroke="#a78bcd" stroke-width="1.5"/>
      <circle cx="710" cy="88" r="6" fill="none" stroke="#a78bcd" stroke-width="1.5"/>
      <circle cx="728" cy="88" r="6" fill="none" stroke="#a78bcd" stroke-width="1.5"/>
      <line x1="698" y1="88" x2="704" y2="88" stroke="#c4b0de" stroke-width="1.5"/>
      <line x1="716" y1="88" x2="722" y2="88" stroke="#c4b0de" stroke-width="1.5"/>
      <text x="744" y="96" fill="#6b5e8a" font-family="system-ui,sans-serif" font-size="13">API 调用</text>
    </g>

    <!-- Clock icon — clean tick marks -->
    <g id="trigger-schedule">
      <rect x="860" y="65" width="170" height="50" rx="10" fill="#ffffff" stroke="#e2d8ef" stroke-width="1.2"/>
      <circle cx="882" cy="89" r="11" fill="none" stroke="#a78bcd" stroke-width="1.5"/>
      <line x1="882" y1="89" x2="882" y2="81" stroke="#a78bcd" stroke-width="1.5" stroke-linecap="round"/>
      <line x1="882" y1="89" x2="888" y2="92" stroke="#a78bcd" stroke-width="1.5" stroke-linecap="round"/>
      <line x1="882" y1="89" x2="890" y2="89" stroke="#c4b0de" stroke-width="1" stroke-linecap="round" stroke-dasharray="2,3"/>
      <text x="900" y="96" fill="#6b5e8a" font-family="system-ui,sans-serif" font-size="13">定时调度</text>
    </g>
  </g>

  <!-- Arrow: Trigger → Core -->
  <line x1="700" y1="130" x2="700" y2="155" stroke="#64748b" stroke-width="2" marker-end="url(#arrGray)"/>

  <!-- ══════════════════════════════════════════════════════════ -->
  <!-- SECTION 2: COGNITIVE CORE                                 -->
  <!-- ══════════════════════════════════════════════════════════ -->
  <g id="cognitive-core">
    <rect x="100" y="155" width="1200" height="350" rx="20" fill="#f6f4ff" stroke="#e0dce8" stroke-width="1.5"/>
    <text x="700" y="185" text-anchor="middle" fill="#3d3260" font-family="system-ui,sans-serif" font-size="19" font-weight="800" letter-spacing="0.5">Cognitive Core · 智能体循环</text>

    <!-- ── THINK ── -->
    <g id="think-stage" class="breathe">
      <rect x="160" y="210" width="300" height="160" rx="14" fill="#eef0ff" stroke="#c7d2fe" stroke-width="1.5"/>
      <rect x="160" y="210" width="300" height="36" rx="14" fill="#dde4ff"/>
      <rect x="160" y="234" width="300" height="12" fill="#dde4ff"/>
      <text x="310" y="234" text-anchor="middle" fill="#3b44cc" font-family="system-ui,sans-serif" font-size="14" font-weight="700">Think</text>

      <!-- Elegant cloud with dots -->
      <ellipse cx="268" cy="282" rx="26" ry="16" fill="none" stroke="#6366f1" stroke-width="1.6"/>
      <ellipse cx="250" cy="287" rx="15" ry="11" fill="none" stroke="#6366f1" stroke-width="1.6"/>
      <ellipse cx="288" cy="286" rx="18" ry="12" fill="none" stroke="#6366f1" stroke-width="1.6"/>
      <!-- Shimmering dots inside cloud -->
      <circle cx="258" cy="293" r="3" fill="#818cf8" class="shimmer"/>
      <circle cx="268" cy="295" r="3" fill="#818cf8" class="shimmer" style="animation-delay:0.4s"/>
      <circle cx="278" cy="293" r="3" fill="#818cf8" class="shimmer" style="animation-delay:0.8s"/>

      <text x="310" y="340" text-anchor="middle" fill="#4a4a6a" font-family="system-ui,sans-serif" font-size="11">推理 · 规划 · 反思</text>
      <text x="310" y="358" text-anchor="middle" fill="#8080a8" font-family="system-ui,sans-serif" font-size="10">思维链 · Chain-of-Thought</text>
    </g>

    <!-- Arrow Think → Act -->
    <line x1="460" y1="290" x2="540" y2="290" stroke="#64748b" stroke-width="2" stroke-dasharray="9,5" class="flow-line" marker-end="url(#arrGray)"/>
    <circle r="5" fill="#6366f1">
      <animateMotion dur="1.5s" repeatCount="indefinite" path="M 460 290 L 540 290"/>
    </circle>

    <!-- ── ACT ── -->
    <g id="act-stage" class="breathe" style="animation-delay:0.8s">
      <rect x="550" y="210" width="300" height="160" rx="14" fill="#edfbf5" stroke="#a7f3d0" stroke-width="1.5"/>
      <rect x="550" y="210" width="300" height="36" rx="14" fill="#d8f8e8"/>
      <rect x="550" y="234" width="300" height="12" fill="#d8f8e8"/>
      <text x="700" y="234" text-anchor="middle" fill="#046030" font-family="system-ui,sans-serif" font-size="14" font-weight="700">Act</text>

      <!-- Big gear CW -->
      <g transform="translate(655, 272)" class="gear-cw">
        <circle cx="0" cy="0" r="18" fill="none" stroke="#10b981" stroke-width="1.6"/>
        <circle cx="0" cy="0" r="7"  fill="none" stroke="#10b981" stroke-width="1.6"/>
        ${[0,45,90,135,180,225,270,315].map(a => {
          const rad = a * Math.PI / 180;
          const x1 = Math.cos(rad) * 18, y1 = Math.sin(rad) * 18;
          const x2 = Math.cos(rad) * 12, y2 = Math.sin(rad) * 12;
          return `<line x1="${x1.toFixed(1)}" y1="${y1.toFixed(1)}" x2="${x2.toFixed(1)}" y2="${y2.toFixed(1)}" stroke="#10b981" stroke-width="2.5"/>`;
        }).join('')}
      </g>
      <!-- Small gear CCW -->
      <g transform="translate(720, 292)" class="gear-ccw">
        <circle cx="0" cy="0" r="18" fill="none" stroke="#34d399" stroke-width="1.6"/>
        <circle cx="0" cy="0" r="7"  fill="none" stroke="#34d399" stroke-width="1.6"/>
        ${[0,45,90,135,180,225,270,315].map(a => {
          const rad = a * Math.PI / 180;
          const x1 = Math.cos(rad) * 18, y1 = Math.sin(rad) * 18;
          const x2 = Math.cos(rad) * 12, y2 = Math.sin(rad) * 12;
          return `<line x1="${x1.toFixed(1)}" y1="${y1.toFixed(1)}" x2="${x2.toFixed(1)}" y2="${y2.toFixed(1)}" stroke="#34d399" stroke-width="2.5"/>`;
        }).join('')}
      </g>

      <text x="700" y="340" text-anchor="middle" fill="#4a4a6a" font-family="system-ui,sans-serif" font-size="11">选择工具 · 组装调用</text>
      <text x="700" y="358" text-anchor="middle" fill="#8080a8" font-family="system-ui,sans-serif" font-size="10">工具选择 · 编排调度</text>
    </g>

    <!-- Arrow Act → Observe -->
    <line x1="850" y1="290" x2="930" y2="290" stroke="#64748b" stroke-width="2" stroke-dasharray="9,5" class="flow-line" style="animation-delay:0.5s" marker-end="url(#arrGray)"/>
    <circle r="5" fill="#10b981">
      <animateMotion dur="1.5s" repeatCount="indefinite" begin="0.75s" path="M 850 290 L 930 290"/>
    </circle>

    <!-- ── OBSERVE ── -->
    <g id="observe-stage" class="breathe" style="animation-delay:1.6s">
      <rect x="940" y="210" width="300" height="160" rx="14" fill="#fef2f8" stroke="#fbcfe8" stroke-width="1.5"/>
      <rect x="940" y="210" width="300" height="36" rx="14" fill="#fce8f3"/>
      <rect x="940" y="234" width="300" height="12" fill="#fce8f3"/>
      <text x="1090" y="234" text-anchor="middle" fill="#9d1645" font-family="system-ui,sans-serif" font-size="14" font-weight="700">Observe</text>

      <!-- Elegant eye -->
      <path d="M 1022 282 Q 1050 262 1078 282 Q 1050 302 1022 282 Z" fill="none" stroke="#ec4899" stroke-width="1.6"/>
      <circle cx="1050" cy="282" r="11" fill="none" stroke="#ec4899" stroke-width="1.6"/>
      <circle cx="1050" cy="282" r="6"  fill="#be185d">
        <animate attributeName="r"         values="4;7;4"       dur="1.5s" repeatCount="indefinite"/>
        <animate attributeName="fill-opacity" values="1;0.5;1" dur="1.5s" repeatCount="indefinite"/>
      </circle>

      <text x="1090" y="340" text-anchor="middle" fill="#4a4a6a" font-family="system-ui,sans-serif" font-size="11">解析结果 · 更新状态</text>
      <text x="1090" y="358" text-anchor="middle" fill="#8080a8" font-family="system-ui,sans-serif" font-size="10">结果解析 · 状态更新</text>
    </g>

    <!-- Cycle dashed arrow Observe → Think -->
    <path d="M 1200 290 Q 1220 290 1220 322 Q 1220 402 700 402 Q 180 402 180 342 Q 180 322 200 312"
          fill="none" stroke="#94a3b8" stroke-width="2" stroke-dasharray="9,5" class="cycle-line" marker-end="url(#arrLight)"/>
    <circle r="6" fill="#94a3b8">
      <animateMotion dur="3s" repeatCount="indefinite" path="M 1200 290 Q 1220 290 1220 322 Q 1220 402 700 402 Q 180 402 180 342 Q 180 322 200 312"/>
    </circle>

    <!-- Done diamond -->
    <g id="done-decision" class="diamond-bounce">
      <polygon points="660,430 740,470 660,510 580,470" fill="#ffffff" stroke="#475569" stroke-width="1.8"/>
      <text x="660" y="476" text-anchor="middle" fill="#1e293b" font-family="system-ui,sans-serif" font-size="14" font-weight="700">Done?</text>
    </g>

    <!-- Arrow Observe → Done -->
    <path d="M 1090 370 L 1090 420 Q 1090 430 1080 430 L 745 430" fill="none" stroke="#64748b" stroke-width="1.8" marker-end="url(#arrGray)"/>
    <circle r="5" fill="#ec4899">
      <animateMotion dur="1.8s" repeatCount="indefinite" path="M 1090 370 L 1090 420 Q 1090 430 1080 430 L 745 430"/>
    </circle>

    <!-- Yes → Output -->
    <line x1="740" y1="470" x2="960" y2="470" stroke="#22c55e" stroke-width="2" stroke-dasharray="9,5" class="flow-line" style="animation-delay:0.3s" marker-end="url(#arrGreen)"/>
    <text x="850" y="462" text-anchor="middle" fill="#22c55e" font-family="system-ui,sans-serif" font-size="11" font-weight="600">Yes</text>

    <!-- No → back to Think -->
    <path d="M 660 510 L 660 546 Q 660 562 640 562 L 310 562 Q 270 562 270 537 L 270 375"
          fill="none" stroke="#ef4444" stroke-width="2" stroke-dasharray="7,4" class="reject-line" marker-end="url(#arrRed)"/>
    <circle r="5" fill="#ef4444">
      <animateMotion dur="2s" repeatCount="indefinite" path="M 660 510 L 660 546 Q 660 562 640 562 L 310 562 Q 270 562 270 537 L 270 375"/>
    </circle>
    <text x="675" y="538" fill="#ef4444" font-family="system-ui,sans-serif" font-size="10" font-weight="600">No</text>

    <!-- Output box -->
    <g id="output-box">
      <rect x="970" y="445" width="110" height="50" rx="10" fill="#d8f8e8" stroke="#6ee7b7" stroke-width="1.5"/>
      <text x="1025" y="469" text-anchor="middle" fill="#046030" font-family="system-ui,sans-serif" font-size="11" font-weight="600">Output</text>
      <text x="1025" y="486" text-anchor="middle" fill="#046030" font-family="system-ui,sans-serif" font-size="16">↑</text>
    </g>
  </g>

  <!-- Arrows Core → Bottom sections -->
  <line x1="290" y1="505" x2="290" y2="535" stroke="#64748b" stroke-width="1.8" stroke-dasharray="7,4" class="flow-line" marker-end="url(#arrGray)"/>
  <line x1="700" y1="505" x2="700" y2="535" stroke="#64748b" stroke-width="1.8" stroke-dasharray="7,4" class="flow-line" style="animation-delay:0.5s" marker-end="url(#arrGray)"/>
  <line x1="1150" y1="505" x2="1150" y2="535" stroke="#64748b" stroke-width="1.8" stroke-dasharray="7,4" class="flow-line" style="animation-delay:1s" marker-end="url(#arrGray)"/>

  <!-- ══════════════════════════════════════════════════════════ -->
  <!-- BOTTOM THREE COLUMNS                                     -->
  <!-- ══════════════════════════════════════════════════════════ -->

  <!-- ── LEFT: Memory ── -->
  <g id="memory-section" class="breathe-slow" style="animation-delay:0.5s">
    <rect x="60" y="535" width="400" height="370" rx="16" fill="#eef2ff" stroke="#c7d2fe" stroke-width="1.5"/>
    <text x="260" y="565" text-anchor="middle" fill="#1e3a8a" font-family="system-ui,sans-serif" font-size="16" font-weight="700" letter-spacing="0.3">Memory · 记忆</text>

    <!-- Working Memory -->
    <g id="working-memory">
      <rect x="85" y="595" width="350" height="115" rx="12" fill="#ffffff" stroke="#bfdbfe" stroke-width="1.2"/>
      <text x="260" y="622" text-anchor="middle" fill="#1d4ed8" font-family="system-ui,sans-serif" font-size="13" font-weight="700">Working Memory</text>

      <!-- Elegant document stack -->
      <rect x="150" y="635" width="44" height="6"  rx="3" fill="#93c5fd" stroke="#60a5fa" stroke-width="0.8" class="shimmer"/>
      <rect x="148" y="645" width="48" height="6"  rx="3" fill="#bfdbfe" stroke="#93c5fd" stroke-width="0.8" class="shimmer" style="animation-delay:0.3s"/>
      <rect x="146" y="655" width="52" height="6"  rx="3" fill="#dbeafe" stroke="#93c5fd" stroke-width="0.8" class="shimmer" style="animation-delay:0.6s"/>
      <rect x="144" y="665" width="56" height="6"  rx="3" fill="#eef2ff" stroke="#93c5fd" stroke-width="0.8" class="shimmer" style="animation-delay:0.9s"/>

      <text x="260" y="692" text-anchor="middle" fill="#4a4a6a" font-family="system-ui,sans-serif" font-size="11">短期上下文窗口</text>
      <text x="260" y="703" text-anchor="middle" fill="#8080a8" font-family="system-ui,sans-serif" font-size="10">会话历史 · 工具调用记录</text>
    </g>

    <!-- Long-term Memory -->
    <g id="longterm-memory">
      <rect x="85" y="725" width="350" height="115" rx="12" fill="#ffffff" stroke="#bfdbfe" stroke-width="1.2"/>
      <text x="260" y="752" text-anchor="middle" fill="#1d4ed8" font-family="system-ui,sans-serif" font-size="13" font-weight="700">Long-term Memory</text>

      <!-- Elegant database cylinder -->
      <ellipse cx="190" cy="778" rx="20" ry="7" fill="none" stroke="#60a5fa" stroke-width="1.6">
        <animate attributeName="stroke-opacity" values="1;0.3;1" dur="2.2s" repeatCount="indefinite"/>
      </ellipse>
      <line x1="170" y1="778" x2="170" y2="794" stroke="#60a5fa" stroke-width="1.6">
        <animate attributeName="stroke-opacity" values="1;0.3;1" dur="2.2s" repeatCount="indefinite"/>
      </line>
      <line x1="210" y1="778" x2="210" y2="794" stroke="#60a5fa" stroke-width="1.6">
        <animate attributeName="stroke-opacity" values="1;0.3;1" dur="2.2s" repeatCount="indefinite" begin="0.5s"/>
      </line>
      <ellipse cx="190" cy="794" rx="20" ry="7" fill="none" stroke="#60a5fa" stroke-width="1.6">
        <animate attributeName="stroke-opacity" values="1;0.3;1" dur="2.2s" repeatCount="indefinite" begin="1s"/>
      </ellipse>
      <ellipse cx="190" cy="786" rx="20" ry="7" fill="none" stroke="#93c5fd" stroke-width="1">
        <animate attributeName="stroke-opacity" values="0.8;0.2;0.8" dur="2.2s" repeatCount="indefinite" begin="1.5s"/>
      </ellipse>

      <text x="260" y="822" text-anchor="middle" fill="#4a4a6a" font-family="system-ui,sans-serif" font-size="11">长期向量知识库</text>
      <text x="260" y="833" text-anchor="middle" fill="#8080a8" font-family="system-ui,sans-serif" font-size="10">RAG · 知识图谱</text>
    </g>
  </g>

  <!-- ── CENTER: Safety Layers ── -->
  <g id="safety-section" class="breathe-slow" style="animation-delay:1s">
    <rect x="490" y="535" width="420" height="370" rx="16" fill="#fff5f5" stroke="#fecaca" stroke-width="1.5"/>
    <text x="700" y="565" text-anchor="middle" fill="#991b1b" font-family="system-ui,sans-serif" font-size="16" font-weight="700" letter-spacing="0.3">Safety Layers · 安全校验</text>

    <!-- 4 Safety Gates -->
    <g id="safety-gates">
      <!-- Validate -->
      <rect x="520" y="595" width="82" height="62" rx="10" stroke="#fca5a5" stroke-width="1.2" class="flash-a"/>
      <!-- Shield icon -->
      <path d="M 560 614 L 548 618 L 548 631 Q 548 640 560 645 Q 572 640 572 631 L 572 618 Z" fill="none" stroke="#dc2626" stroke-width="1.5" stroke-linejoin="round"/>
      <polyline points="553,626 558,631 567,621" fill="none" stroke="#dc2626" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
      <text x="560" y="650" text-anchor="middle" fill="#991b1b" font-family="system-ui,sans-serif" font-size="10" font-weight="600">Validate</text>
      <text x="560" y="662" text-anchor="middle" fill="#8080a8" font-family="system-ui,sans-serif" font-size="9">输入校验</text>
      <!-- Arrow -->
      <line x1="602" y1="626" x2="622" y2="626" stroke="#cbd5e1" stroke-width="1.5" stroke-dasharray="4,3" class="flow-line" marker-end="url(#arrLight)"/>

      <!-- Scope -->
      <rect x="626" y="595" width="82" height="62" rx="10" stroke="#fdba74" stroke-width="1.2" class="flash-b"/>
      <!-- Lock icon -->
      <rect x="660" y="623" width="16" height="13" rx="3" fill="none" stroke="#ea580c" stroke-width="1.5"/>
      <path d="M 664 623 L 664 617 Q 664 612 668 612 Q 672 612 672 617 L 672 623" fill="none" stroke="#ea580c" stroke-width="1.5" stroke-linecap="round"/>
      <circle cx="668" cy="629" r="2" fill="#ea580c"/>
      <text x="667" y="650" text-anchor="middle" fill="#9a3412" font-family="system-ui,sans-serif" font-size="10" font-weight="600">Scope</text>
      <text x="667" y="662" text-anchor="middle" fill="#8080a8" font-family="system-ui,sans-serif" font-size="9">权限范围</text>
      <!-- Arrow -->
      <line x1="708" y1="626" x2="728" y2="626" stroke="#cbd5e1" stroke-width="1.5" stroke-dasharray="4,3" class="flow-line" style="animation-delay:0.5s" marker-end="url(#arrLight)"/>

      <!-- Budget -->
      <rect x="732" y="595" width="82" height="62" rx="10" stroke="#fde68a" stroke-width="1.2" class="flash-c"/>
      <!-- Coins icon -->
      <ellipse cx="763" cy="621" rx="9" ry="4" fill="none" stroke="#ca8a04" stroke-width="1.5"/>
      <ellipse cx="768" cy="626" rx="9" ry="4" fill="none" stroke="#ca8a04" stroke-width="1.5"/>
      <ellipse cx="763" cy="631" rx="9" ry="4" fill="none" stroke="#ca8a04" stroke-width="1.5"/>
      <text x="773" y="650" text-anchor="middle" fill="#854d0e" font-family="system-ui,sans-serif" font-size="10" font-weight="600">Budget</text>
      <text x="773" y="662" text-anchor="middle" fill="#8080a8" font-family="system-ui,sans-serif" font-size="9">成本限速</text>
      <!-- Arrow -->
      <line x1="814" y1="626" x2="834" y2="626" stroke="#cbd5e1" stroke-width="1.5" stroke-dasharray="4,3" class="flow-line" style="animation-delay:1s" marker-end="url(#arrLight)"/>

      <!-- Allow -->
      <rect x="838" y="595" width="68" height="62" rx="10" stroke="#86efac" stroke-width="1.2" class="flash-d"/>
      <!-- Checkmark in circle -->
      <circle cx="872" cy="622" r="12" fill="none" stroke="#16a34a" stroke-width="1.5"/>
      <polyline points="865,622 870,627 880,617" fill="none" stroke="#16a34a" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <text x="872" y="650" text-anchor="middle" fill="#166534" font-family="system-ui,sans-serif" font-size="10" font-weight="600">Allow</text>
    </g>

    <!-- Pass -->
    <path d="M 906 626 L 925 626 Q 932 626 932 636 L 932 700" fill="none" stroke="#22c55e" stroke-width="1.8" stroke-dasharray="6,4" class="flow-line" style="animation-delay:0.7s" marker-end="url(#arrGreen)"/>
    <circle r="4" fill="#22c55e">
      <animateMotion dur="2s" repeatCount="indefinite" path="M 906 626 L 925 626 Q 932 626 932 636 L 932 700"/>
    </circle>
    <text x="916" y="660" fill="#22c55e" font-family="system-ui,sans-serif" font-size="9" font-weight="600">通过</text>

    <!-- Reject -->
    <path d="M 630 657 L 630 700 Q 630 712 645 712 L 700 712" fill="none" stroke="#ef4444" stroke-width="1.5" stroke-dasharray="5,3" class="reject-line" marker-end="url(#arrRed)"/>
    <text x="640" y="682" fill="#ef4444" font-family="system-ui,sans-serif" font-size="9" font-weight="600">拒绝</text>

    <!-- Reject + Replan -->
    <g id="reject-box" class="reject-pulse">
      <rect x="570" y="715" width="260" height="50" rx="10" fill="#fef2f2" stroke="#fca5a5" stroke-width="1.2"/>
      <text x="700" y="737" text-anchor="middle" fill="#dc2626" font-family="system-ui,sans-serif" font-size="12" font-weight="600">↻ Reject + Replan</text>
      <text x="700" y="754" text-anchor="middle" fill="#8080a8" font-family="system-ui,sans-serif" font-size="10">拒绝并重新规划，回流至 Think</text>
    </g>

    <!-- Pass indicator -->
    <g id="pass-indicator">
      <rect x="920" y="770" width="88" height="30" rx="6" fill="#f0fdf4" stroke="#86efac" stroke-width="1"/>
      <text x="964" y="790" text-anchor="middle" fill="#166534" font-family="system-ui,sans-serif" font-size="11" font-weight="600">→ 调度分发</text>
    </g>
  </g>

  <!-- ── RIGHT: Tool Execution ── -->
  <g id="tools-section" class="breathe-slow" style="animation-delay:1.5s">
    <rect x="940" y="535" width="400" height="370" rx="16" fill="#fffbf0" stroke="#fde68a" stroke-width="1.5"/>
    <text x="1140" y="565" text-anchor="middle" fill="#78350f" font-family="system-ui,sans-serif" font-size="16" font-weight="700" letter-spacing="0.3">Tool Execution · 工具执行</text>

    <!-- Tool Types -->
    <g id="tool-types" class="tool-pulse">
      <rect x="965" y="600" width="350" height="80" rx="12" fill="#ffffff" stroke="#fde68a" stroke-width="1.2"/>
      <text x="1140" y="625" text-anchor="middle" fill="#92400e" font-family="system-ui,sans-serif" font-size="13" font-weight="700">Tool Types · 工具类型</text>
      <!-- Wrench icon -->
      <g transform="translate(1020, 642)">
        <rect x="-6" y="-10" width="12" height="14" rx="3" fill="none" stroke="#d97706" stroke-width="1.5"/>
        <circle cx="0" cy="0" r="5" fill="none" stroke="#d97706" stroke-width="1.5"/>
        <line x1="-6" y1="-10" x2="-9" y2="-14" stroke="#d97706" stroke-width="1.5" stroke-linecap="round"/>
        <line x1="6" y1="-10" x2="9" y2="-14" stroke="#d97706" stroke-width="1.5" stroke-linecap="round"/>
        <line x1="-6" y1="4" x2="-9" y2="8" stroke="#d97706" stroke-width="1.5" stroke-linecap="round"/>
        <line x1="6" y1="4" x2="9" y2="8" stroke="#d97706" stroke-width="1.5" stroke-linecap="round"/>
      </g>
      <text x="1140" y="658" text-anchor="middle" fill="#4a4a6a" font-family="system-ui,sans-serif" font-size="10">Bash · API · 文件读写 · 浏览器 · MCP</text>
      <text x="1140" y="674" text-anchor="middle" fill="#8080a8" font-family="system-ui,sans-serif" font-size="10">函数调用 · 插件系统 · 自定义工具</text>
    </g>

    <!-- Dispatch -->
    <g id="dispatch-box" class="tool-pulse">
      <rect x="965" y="700" width="350" height="80" rx="12" fill="#ffffff" stroke="#fde68a" stroke-width="1.2"/>
      <text x="1140" y="725" text-anchor="middle" fill="#92400e" font-family="system-ui,sans-serif" font-size="13" font-weight="700">Dispatch · 调度分发</text>
      <!-- Send / dispatch icon -->
      <g transform="translate(1018, 742)" class="send-pulse">
        <circle cx="5" cy="10" r="5" fill="none" stroke="#d97706" stroke-width="1.5"/>
        <line x1="5" y1="10" x2="5" y2="5" stroke="#d97706" stroke-width="1.5" stroke-linecap="round"/>
        <line x1="5" y1="10" x2="1" y2="7" stroke="#d97706" stroke-width="1.5" stroke-linecap="round"/>
        <line x1="5" y1="10" x2="9" y2="7" stroke="#d97706" stroke-width="1.5" stroke-linecap="round"/>
        <line x1="5" y1="10" x2="5" y2="18" stroke="#d97706" stroke-width="1.5" stroke-linecap="round"/>
      </g>
      <text x="1140" y="758" text-anchor="middle" fill="#4a4a6a" font-family="system-ui,sans-serif" font-size="10">并行调度 · 超时重试 · 结果聚合</text>
      <text x="1140" y="774" text-anchor="middle" fill="#8080a8" font-family="system-ui,sans-serif" font-size="10">限流 · 降级 · 熔断</text>
    </g>

    <!-- Return Result -->
    <g id="return-box" class="tool-pulse" style="animation-delay:1s">
      <rect x="965" y="800" width="350" height="80" rx="12" fill="#ffffff" stroke="#fde68a" stroke-width="1.2"/>
      <text x="1140" y="825" text-anchor="middle" fill="#92400e" font-family="system-ui,sans-serif" font-size="13" font-weight="700">Return Result · 结果回传</text>
      <!-- Return / reply icon -->
      <g transform="translate(1018, 842)" class="send-pulse" style="animation-delay:0.7s">
        <path d="M 18 10 Q 10 10 10 4" fill="none" stroke="#d97706" stroke-width="1.5" stroke-linecap="round"/>
        <path d="M 10 4 L 5 4 L 10 9" fill="none" stroke="#d97706" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        <path d="M 10 10 Q 10 16 18 16" fill="none" stroke="#d97706" stroke-width="1.5" stroke-linecap="round"/>
        <path d="M 18 16 L 23 16 L 18 11" fill="none" stroke="#d97706" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round"/>
        <line x1="10" y1="4" x2="10" y2="16" stroke="#d97706" stroke-width="1.5" stroke-linecap="round"/>
      </g>
      <text x="1140" y="858" text-anchor="middle" fill="#4a4a6a" font-family="system-ui,sans-serif" font-size="10">结果解析 · 格式化 · 输入 Observe</text>
      <text x="1140" y="874" text-anchor="middle" fill="#8080a8" font-family="system-ui,sans-serif" font-size="10">结构化输出 · 错误码映射</text>
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
    preserveNativeAnimations: true,
  });

  // All modules visible from start — CSS/SMIL animations run continuously.

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
