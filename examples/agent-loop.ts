/**
 * Agent Loop Mechanism — Flat Business Tech PPT Style
 *
 * Daily Dose of DS inspired: clean minimal icons, smooth animations,
 * professional academic presentation quality.
 *
 * Design:
 * - White minimal background, pastel macaron palette
 * - Thin 1.5-2px strokes, rounded linecaps
 * - Geometric clean icons (no emoji)
 * - Slow smooth animations (4-8s cycles)
 * - All modules visible from start, no entrance
 */

import { SVGAnimationPipeline } from '../src/pipeline';
import { ProgressInfo } from '../src/types';

const svgContent = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1400 950" width="1400" height="950">
  <defs>
    <style>
      /* ── Flow animations ── */
      @keyframes dashFlow {
        to { stroke-dashoffset: -24; }
      }
      @keyframes dashCycle {
        to { stroke-dashoffset: -20; }
      }
      @keyframes dashReject {
        to { stroke-dashoffset: -16; }
      }
      .flow-line    { animation: dashFlow 2.4s linear infinite; }
      .cycle-line   { animation: dashCycle 3.6s linear infinite; }
      .reject-line  { animation: dashReject 2s linear infinite; }

      /* ── Gear spin ── */
      @keyframes spinCW  { to { transform: rotate(360deg); } }
      @keyframes spinCCW { to { transform: rotate(-360deg); } }
      .gear-cw  { animation: spinCW  8s linear infinite; transform-origin: center; }
      .gear-ccw { animation: spinCCW 6s linear infinite; transform-origin: center; }

      /* ── Breathing ── */
      @keyframes breathe {
        0%, 100% { opacity: 1; }
        50%       { opacity: 0.82; }
      }
      @keyframes breatheSlow {
        0%, 100% { opacity: 0.92; }
        50%       { opacity: 0.68; }
      }
      .breathe      { animation: breathe      4.8s ease-in-out infinite; }
      .breathe-slow { animation: breatheSlow 6.8s ease-in-out infinite; }

      /* ── Safety flash ── */
      @keyframes flashA {
        0%, 100% { fill: #fff; stroke-width: 1.2; }
        50%       { fill: #fff5f5; stroke-width: 2; }
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
      .flash-a { animation: flashA 3.2s ease-in-out infinite; }
      .flash-b { animation: flashB 3.2s ease-in-out infinite 0.8s; }
      .flash-c { animation: flashC 3.2s ease-in-out infinite 1.6s; }
      .flash-d { animation: flashD 3.2s ease-in-out infinite 2.4s; }
      .reject-pulse { animation: rejectPulse 2.8s ease-in-out infinite; }

      /* ── Shimmer ── */
      @keyframes shimmer {
        0%, 100% { opacity: 0.4; }
        50%       { opacity: 1; }
      }
      .shimmer { animation: shimmer 3.6s ease-in-out infinite; }

      /* ── Send pulse ── */
      @keyframes sendPulse {
        0%, 100% { opacity: 0.7; transform: translateX(0); }
        50%       { opacity: 1;   transform: translateX(4px); }
      }
      .send-pulse { animation: sendPulse 2.4s ease-in-out infinite; transform-origin: center; }

      /* ── Diamond bounce ── */
      @keyframes diamondBounce {
        0%, 100% { transform: scale(1); }
        35%       { transform: scale(1.08); }
        65%       { transform: scale(0.95); }
      }
      .diamond-bounce { animation: diamondBounce 4.4s ease-in-out infinite; transform-origin: 660px 470px; }

      /* ── Tool pulse ── */
      @keyframes toolPulse {
        0%, 100% { opacity: 0.85; }
        50%       { opacity: 1; }
      }
      .tool-pulse { animation: toolPulse 4s ease-in-out infinite; }
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
    <rect x="250" y="25" width="900" height="105" rx="14" fill="#f0e8ff" stroke="#d0b8f0" stroke-width="1.2"/>
    <text x="275" y="52" fill="#4a3070" font-family="system-ui,sans-serif" font-size="15" font-weight="600" letter-spacing="0.5">Trigger / Input</text>

    <!-- Message — clean chat bubble -->
    <g id="trigger-message">
      <rect x="290" y="66" width="170" height="48" rx="9" fill="#fff" stroke="#e8d8f8" stroke-width="1"/>
      <rect x="305" y="79" width="20" height="15" rx="4" fill="none" stroke="#9b7fc4" stroke-width="1.4"/>
      <line x1="309" y1="85" x2="321" y2="85" stroke="#b8a0d8" stroke-width="1.4" stroke-linecap="round"/>
      <line x1="309" y1="89" x2="317" y2="89" stroke="#b8a0d8" stroke-width="1.4" stroke-linecap="round"/>
      <polygon points="311,94 315,98 319,94" fill="none" stroke="#9b7fc4" stroke-width="1.4" stroke-linejoin="round"/>
      <text x="335" y="96" fill="#5a4070" font-family="system-ui,sans-serif" font-size="12">消息输入</text>
    </g>

    <!-- Calendar — grid icon -->
    <g id="trigger-event">
      <rect x="478" y="66" width="170" height="48" rx="9" fill="#fff" stroke="#e8d8f8" stroke-width="1"/>
      <rect x="493" y="78" width="18" height="16" rx="3" fill="none" stroke="#9b7fc4" stroke-width="1.4"/>
      <line x1="493" y1="84" x2="511" y2="84" stroke="#9b7fc4" stroke-width="1.4"/>
      <line x1="497" y1="76" x2="497" y2="80" stroke="#9b7fc4" stroke-width="1.4" stroke-linecap="round"/>
      <line x1="507" y1="76" x2="507" y2="80" stroke="#9b7fc4" stroke-width="1.4" stroke-linecap="round"/>
      <circle cx="498" cy="90" r="1.3" fill="#b8a0d8"/>
      <circle cx="503" cy="90" r="1.3" fill="#b8a0d8"/>
      <circle cx="508" cy="90" r="1.3" fill="#b8a0d8"/>
      <text x="519" y="96" fill="#5a4070" font-family="system-ui,sans-serif" font-size="12">日历事件</text>
    </g>

    <!-- API — connected nodes -->
    <g id="trigger-api">
      <rect x="666" y="66" width="170" height="48" rx="9" fill="#fff" stroke="#e8d8f8" stroke-width="1"/>
      <circle cx="688" cy="89" r="5" fill="none" stroke="#9b7fc4" stroke-width="1.4"/>
      <circle cx="703" cy="89" r="5" fill="none" stroke="#9b7fc4" stroke-width="1.4"/>
      <circle cx="718" cy="89" r="5" fill="none" stroke="#9b7fc4" stroke-width="1.4"/>
      <line x1="693" y1="89" x2="698" y2="89" stroke="#b8a0d8" stroke-width="1.4"/>
      <line x1="708" y1="89" x2="713" y2="89" stroke="#b8a0d8" stroke-width="1.4"/>
      <text x="730" y="96" fill="#5a4070" font-family="system-ui,sans-serif" font-size="12">API 调用</text>
    </g>

    <!-- Clock — schedule -->
    <g id="trigger-schedule">
      <rect x="854" y="66" width="170" height="48" rx="9" fill="#fff" stroke="#e8d8f8" stroke-width="1"/>
      <circle cx="876" cy="89" r="9" fill="none" stroke="#9b7fc4" stroke-width="1.4"/>
      <line x1="876" y1="89" x2="876" y2="83" stroke="#9b7fc4" stroke-width="1.4" stroke-linecap="round"/>
      <line x1="876" y1="89" x2="881" y2="92" stroke="#9b7fc4" stroke-width="1.4" stroke-linecap="round"/>
      <circle cx="876" cy="89" r="1.5" fill="#b8a0d8"/>
      <text x="892" y="96" fill="#5a4070" font-family="system-ui,sans-serif" font-size="12">定时调度</text>
    </g>
  </g>

  <!-- Arrow Trigger → Core -->
  <line x1="700" y1="130" x2="700" y2="155" stroke="#64748b" stroke-width="1.8" marker-end="url(#arrGray)"/>

  <!-- ══════════════════════════════════════════════════════════ -->
  <!-- SECTION 2: COGNITIVE CORE                               -->
  <!-- ══════════════════════════════════════════════════════════ -->
  <g id="cognitive-core">
    <rect x="100" y="155" width="1200" height="350" rx="18" fill="#f8f5ff" stroke="#d8cce8" stroke-width="1.2"/>
    <text x="700" y="185" text-anchor="middle" fill="#3d2860" font-family="system-ui,sans-serif" font-size="17" font-weight="700" letter-spacing="0.5">Cognitive Core · 智能体循环</text>

    <!-- ── THINK ── -->
    <g id="think-stage" class="breathe">
      <rect x="160" y="210" width="300" height="155" rx="12" fill="#eef0ff" stroke="#c0c8f0" stroke-width="1.2"/>
      <rect x="160" y="210" width="300" height="34" rx="12" fill="#dde0ff"/>
      <rect x="160" y="232" width="300" height="12" fill="#dde0ff"/>
      <text x="310" y="233" text-anchor="middle" fill="#3840b0" font-family="system-ui,sans-serif" font-size="13" font-weight="600">Think</text>

      <!-- Cloud icon — clean geometric -->
      <ellipse cx="265" cy="280" rx="24" ry="14" fill="none" stroke="#6366f1" stroke-width="1.5"/>
      <ellipse cx="248" cy="284" rx="14" ry="10" fill="none" stroke="#6366f1" stroke-width="1.5"/>
      <ellipse cx="284" cy="283" rx="16" ry="11" fill="none" stroke="#6366f1" stroke-width="1.5"/>
      <circle cx="256" cy="292" r="2.5" fill="#818cf8" class="shimmer"/>
      <circle cx="265" cy="294" r="2.5" fill="#818cf8" class="shimmer" style="animation-delay:0.5s"/>
      <circle cx="274" cy="292" r="2.5" fill="#818cf8" class="shimmer" style="animation-delay:1s"/>

      <text x="310" y="335" text-anchor="middle" fill="#4a4a6a" font-family="system-ui,sans-serif" font-size="10.5">推理 · 规划 · 反思</text>
      <text x="310" y="350" text-anchor="middle" fill="#8888a8" font-family="system-ui,sans-serif" font-size="9.5">思维链 · Chain-of-Thought</text>
    </g>

    <!-- Arrow Think → Act -->
    <line x1="460" y1="288" x2="540" y2="288" stroke="#64748b" stroke-width="1.8" stroke-dasharray="8,4" class="flow-line" marker-end="url(#arrGray)"/>
    <circle r="4" fill="#6366f1">
      <animateMotion dur="3s" repeatCount="indefinite" path="M 460 288 L 540 288"/>
    </circle>

    <!-- ── ACT ── -->
    <g id="act-stage" class="breathe" style="animation-delay:1s">
      <rect x="550" y="210" width="300" height="155" rx="12" fill="#eefbf5" stroke="#a0e8c8" stroke-width="1.2"/>
      <rect x="550" y="210" width="300" height="34" rx="12" fill="#d8f8e8"/>
      <rect x="550" y="232" width="300" height="12" fill="#d8f8e8"/>
      <text x="700" y="233" text-anchor="middle" fill="#0a6838" font-family="system-ui,sans-serif" font-size="13" font-weight="600">Act</text>

      <!-- Gears — clean with calculated teeth -->
      <g transform="translate(655, 275)" class="gear-cw">
        <circle cx="0" cy="0" r="16" fill="none" stroke="#10b981" stroke-width="1.5"/>
        <circle cx="0" cy="0" r="6"  fill="none" stroke="#10b981" stroke-width="1.5"/>
        ${[0,45,90,135,180,225,270,315].map(a => {
          const r = a * Math.PI / 180;
          return `<line x1="${(Math.cos(r)*16).toFixed(1)}" y1="${(Math.sin(r)*16).toFixed(1)}" x2="${(Math.cos(r)*11).toFixed(1)}" y2="${(Math.sin(r)*11).toFixed(1)}" stroke="#10b981" stroke-width="2" stroke-linecap="round"/>`;
        }).join('')}
      </g>
      <g transform="translate(715, 290)" class="gear-ccw">
        <circle cx="0" cy="0" r="16" fill="none" stroke="#34d399" stroke-width="1.5"/>
        <circle cx="0" cy="0" r="6"  fill="none" stroke="#34d399" stroke-width="1.5"/>
        ${[0,45,90,135,180,225,270,315].map(a => {
          const r = a * Math.PI / 180;
          return `<line x1="${(Math.cos(r)*16).toFixed(1)}" y1="${(Math.sin(r)*16).toFixed(1)}" x2="${(Math.cos(r)*11).toFixed(1)}" y2="${(Math.sin(r)*11).toFixed(1)}" stroke="#34d399" stroke-width="2" stroke-linecap="round"/>`;
        }).join('')}
      </g>

      <text x="700" y="335" text-anchor="middle" fill="#4a4a6a" font-family="system-ui,sans-serif" font-size="10.5">选择工具 · 组装调用</text>
      <text x="700" y="350" text-anchor="middle" fill="#8888a8" font-family="system-ui,sans-serif" font-size="9.5">工具选择 · 编排调度</text>
    </g>

    <!-- Arrow Act → Observe -->
    <line x1="850" y1="288" x2="930" y2="288" stroke="#64748b" stroke-width="1.8" stroke-dasharray="8,4" class="flow-line" style="animation-delay:0.8s" marker-end="url(#arrGray)"/>
    <circle r="4" fill="#10b981">
      <animateMotion dur="3s" repeatCount="indefinite" begin="1.5s" path="M 850 288 L 930 288"/>
    </circle>

    <!-- ── OBSERVE ── -->
    <g id="observe-stage" class="breathe" style="animation-delay:2s">
      <rect x="940" y="210" width="300" height="155" rx="12" fill="#fff0f6" stroke="#f0b0d0" stroke-width="1.2"/>
      <rect x="940" y="210" width="300" height="34" rx="12" fill="#ffe0f0"/>
      <rect x="940" y="232" width="300" height="12" fill="#ffe0f0"/>
      <text x="1090" y="233" text-anchor="middle" fill="#881050" font-family="system-ui,sans-serif" font-size="13" font-weight="600">Observe</text>

      <!-- Eye icon — clean almond shape -->
      <path d="M 1022 280 Q 1090 258 1058 280 Q 1090 302 1022 280 Z" fill="none" stroke="#ec4899" stroke-width="1.5"/>
      <circle cx="1050" cy="280" r="10" fill="none" stroke="#ec4899" stroke-width="1.5"/>
      <circle cx="1050" cy="280" r="5" fill="#be185d">
        <animate attributeName="r" values="4;6;4" dur="2s" repeatCount="indefinite"/>
        <animate attributeName="fill-opacity" values="1;0.5;1" dur="2s" repeatCount="indefinite"/>
      </circle>

      <text x="1090" y="335" text-anchor="middle" fill="#4a4a6a" font-family="system-ui,sans-serif" font-size="10.5">解析结果 · 更新状态</text>
      <text x="1090" y="350" text-anchor="middle" fill="#8888a8" font-family="system-ui,sans-serif" font-size="9.5">结果解析 · 状态更新</text>
    </g>

    <!-- Cycle dashed arrow Observe → Think -->
    <path d="M 1200 288 Q 1218 288 1218 320 Q 1218 400 700 400 Q 182 400 182 340 Q 182 310 200 300"
          fill="none" stroke="#94a3b8" stroke-width="1.8" stroke-dasharray="8,4" class="cycle-line" marker-end="url(#arrLight)"/>
    <circle r="5" fill="#94a3b8" opacity="0.8">
      <animateMotion dur="6s" repeatCount="indefinite" path="M 1200 288 Q 1218 288 1218 320 Q 1218 400 700 400 Q 182 400 182 340 Q 182 310 200 300"/>
    </circle>

    <!-- Done diamond -->
    <g id="done-decision" class="diamond-bounce">
      <polygon points="660,430 740,470 660,510 580,470" fill="#fff" stroke="#475569" stroke-width="1.5"/>
      <text x="660" y="476" text-anchor="middle" fill="#1e293b" font-family="system-ui,sans-serif" font-size="13" font-weight="600">Done?</text>
    </g>

    <!-- Arrow Observe → Done -->
    <path d="M 1090 365 L 1090 418 Q 1090 430 1080 430 L 745 430" fill="none" stroke="#64748b" stroke-width="1.8" marker-end="url(#arrGray)"/>
    <circle r="4" fill="#ec4899">
      <animateMotion dur="4s" repeatCount="indefinite" path="M 1090 365 L 1090 418 Q 1090 430 1080 430 L 745 430"/>
    </circle>

    <!-- Yes → Output -->
    <line x1="740" y1="470" x2="960" y2="470" stroke="#22c55e" stroke-width="1.8" stroke-dasharray="8,4" class="flow-line" style="animation-delay:0.5s" marker-end="url(#arrGreen)"/>
    <text x="850" y="462" text-anchor="middle" fill="#22c55e" font-family="system-ui,sans-serif" font-size="10" font-weight="600">Yes</text>

    <!-- No → Think -->
    <path d="M 660 510 L 660 545 Q 660 560 640 560 L 310 560 Q 270 560 270 535 L 270 370"
          fill="none" stroke="#ef4444" stroke-width="1.8" stroke-dasharray="6,4" class="reject-line" marker-end="url(#arrRed)"/>
    <circle r="4" fill="#ef4444" opacity="0.8">
      <animateMotion dur="4.5s" repeatCount="indefinite" path="M 660 510 L 660 545 Q 660 560 640 560 L 310 560 Q 270 560 270 535 L 270 370"/>
    </circle>
    <text x="675" y="538" fill="#ef4444" font-family="system-ui,sans-serif" font-size="10" font-weight="600">No</text>

    <!-- Output box -->
    <g id="output-box">
      <rect x="970" y="445" width="108" height="50" rx="9" fill="#e8fff0" stroke="#86efac" stroke-width="1.2"/>
      <text x="1024" y="468" text-anchor="middle" fill="#15803d" font-family="system-ui,sans-serif" font-size="11" font-weight="600">Output</text>
      <text x="1024" y="486" text-anchor="middle" fill="#15803d" font-family="system-ui,sans-serif" font-size="14">↑</text>
    </g>
  </g>

  <!-- Arrows Core → Bottom -->
  <line x1="290" y1="505" x2="290" y2="535" stroke="#64748b" stroke-width="1.5" stroke-dasharray="6,4" class="flow-line" marker-end="url(#arrGray)"/>
  <line x1="700" y1="505" x2="700" y2="535" stroke="#64748b" stroke-width="1.5" stroke-dasharray="6,4" class="flow-line" style="animation-delay:0.5s" marker-end="url(#arrGray)"/>
  <line x1="1150" y1="505" x2="1150" y2="535" stroke="#64748b" stroke-width="1.5" stroke-dasharray="6,4" class="flow-line" style="animation-delay:1s" marker-end="url(#arrGray)"/>

  <!-- ══════════════════════════════════════════════════════════ -->
  <!-- BOTTOM THREE COLUMNS                                     -->
  <!-- ══════════════════════════════════════════════════════════ -->

  <!-- ── LEFT: Memory ── -->
  <g id="memory-section" class="breathe-slow" style="animation-delay:0.5s">
    <rect x="60" y="535" width="400" height="370" rx="14" fill="#eef0ff" stroke="#c0c8f0" stroke-width="1.2"/>
    <text x="260" y="563" text-anchor="middle" fill="#2e38a0" font-family="system-ui,sans-serif" font-size="15" font-weight="700" letter-spacing="0.3">Memory · 记忆</text>

    <!-- Working Memory -->
    <g id="working-memory">
      <rect x="85" y="590" width="350" height="115" rx="10" fill="#fff" stroke="#d0d8f8" stroke-width="1"/>
      <text x="260" y="617" text-anchor="middle" fill="#3848b8" font-family="system-ui,sans-serif" font-size="12" font-weight="600">Working Memory</text>
      <!-- Document stack — clean layers -->
      <rect x="158" y="633" width="36" height="5" rx="2" fill="#c0c8f8" class="shimmer"/>
      <rect x="155" y="641" width="42" height="5" rx="2" fill="#d0d8ff" class="shimmer" style="animation-delay:0.3s"/>
      <rect x="152" y="649" width="48" height="5" rx="2" fill="#e0e4ff" class="shimmer" style="animation-delay:0.6s"/>
      <rect x="149" y="657" width="54" height="5" rx="2" fill="#eef0ff" class="shimmer" style="animation-delay:0.9s"/>
      <text x="260" y="685" text-anchor="middle" fill="#4a4a6a" font-family="system-ui,sans-serif" font-size="10.5">短期上下文窗口</text>
      <text x="260" y="697" text-anchor="middle" fill="#8888a8" font-family="system-ui,sans-serif" font-size="9.5">会话历史 · 工具调用记录</text>
    </g>

    <!-- Long-term Memory -->
    <g id="longterm-memory">
      <rect x="85" y="720" width="350" height="115" rx="10" fill="#fff" stroke="#d0d8f8" stroke-width="1"/>
      <text x="260" y="747" text-anchor="middle" fill="#3848b8" font-family="system-ui,sans-serif" font-size="12" font-weight="600">Long-term Memory</text>
      <!-- Database cylinder — clean -->
      <ellipse cx="196" cy="770" rx="16" ry="5" fill="none" stroke="#6080d0" stroke-width="1.4">
        <animate attributeName="stroke-opacity" values="1;0.3;1" dur="3s" repeatCount="indefinite"/>
      </ellipse>
      <line x1="180" y1="770" x2="180" y2="786" stroke="#6080d0" stroke-width="1.4">
        <animate attributeName="stroke-opacity" values="1;0.3;1" dur="3s" repeatCount="indefinite"/>
      </line>
      <line x1="212" y1="770" x2="212" y2="786" stroke="#6080d0" stroke-width="1.4">
        <animate attributeName="stroke-opacity" values="1;0.3;1" dur="3s" repeatCount="indefinite" begin="0.6s"/>
      </line>
      <ellipse cx="196" cy="786" rx="16" ry="5" fill="none" stroke="#6080d0" stroke-width="1.4">
        <animate attributeName="stroke-opacity" values="1;0.3;1" dur="3s" repeatCount="indefinite" begin="1.2s"/>
      </ellipse>
      <ellipse cx="196" cy="778" rx="16" ry="5" fill="none" stroke="#90a8e0" stroke-width="1">
        <animate attributeName="stroke-opacity" values="0.8;0.2;0.8" dur="3s" repeatCount="indefinite" begin="1.8s"/>
      </ellipse>
      <text x="260" y="812" text-anchor="middle" fill="#4a4a6a" font-family="system-ui,sans-serif" font-size="10.5">长期向量知识库</text>
      <text x="260" y="824" text-anchor="middle" fill="#8888a8" font-family="system-ui,sans-serif" font-size="9.5">RAG · 知识图谱</text>
    </g>
  </g>

  <!-- ── CENTER: Safety ── -->
  <g id="safety-section" class="breathe-slow" style="animation-delay:1s">
    <rect x="490" y="535" width="420" height="370" rx="14" fill="#fff5f5" stroke="#f0b8b8" stroke-width="1.2"/>
    <text x="700" y="563" text-anchor="middle" fill="#882020" font-family="system-ui,sans-serif" font-size="15" font-weight="700" letter-spacing="0.3">Safety Layers · 安全校验</text>

    <!-- 4 Safety Gates — clean geometric icons -->
    <g id="safety-gates">
      <!-- Validate — Shield -->
      <rect x="518" y="590" width="82" height="62" rx="9" stroke="#f08080" stroke-width="1.2" class="flash-a"/>
      <path d="M 558 610 L 544 615 L 544 630 Q 544 642 558 648 Q 572 642 572 630 L 572 615 Z" fill="none" stroke="#dc2626" stroke-width="1.5" stroke-linejoin="round"/>
      <polyline points="550,624 555,630 565,618" fill="none" stroke="#dc2626" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
      <text x="559" y="646" text-anchor="middle" fill="#882020" font-family="system-ui,sans-serif" font-size="9.5" font-weight="600">Validate</text>
      <text x="559" y="658" text-anchor="middle" fill="#8888a8" font-family="system-ui,sans-serif" font-size="8.5">输入校验</text>
      <line x1="600" y1="621" x2="618" y2="621" stroke="#cbd5e1" stroke-width="1.4" stroke-dasharray="4,3" class="flow-line" marker-end="url(#arrLight)"/>

      <!-- Scope — Lock -->
      <rect x="622" y="590" width="82" height="62" rx="9" stroke="#f0a060" stroke-width="1.2" class="flash-b"/>
      <rect x="653" y="620" width="18" height="14" rx="3" fill="none" stroke="#d97706" stroke-width="1.4"/>
      <path d="M 657 620 L 657 613 Q 657 608 662 608 Q 667 608 667 613 L 667 620" fill="none" stroke="#d97706" stroke-width="1.5" stroke-linecap="round"/>
      <circle cx="662" cy="626" r="1.8" fill="#d97706"/>
      <text x="663" y="646" text-anchor="middle" fill="#885010" font-family="system-ui,sans-serif" font-size="9.5" font-weight="600">Scope</text>
      <text x="663" y="658" text-anchor="middle" fill="#8888a8" font-family="system-ui,sans-serif" font-size="8.5">权限范围</text>
      <line x1="704" y1="621" x2="722" y2="621" stroke="#cbd5e1" stroke-width="1.4" stroke-dasharray="4,3" class="flow-line" style="animation-delay:0.5s" marker-end="url(#arrLight)"/>

      <!-- Budget — Coins -->
      <rect x="726" y="590" width="82" height="62" rx="9" stroke="#e0c840" stroke-width="1.2" class="flash-c"/>
      <ellipse cx="760" cy="614" rx="12" ry="4" fill="none" stroke="#b8a020" stroke-width="1.4"/>
      <ellipse cx="766" cy="620" rx="12" ry="4" fill="none" stroke="#b8a020" stroke-width="1.4"/>
      <ellipse cx="760" cy="626" rx="12" ry="4" fill="none" stroke="#b8a020" stroke-width="1.4"/>
      <text x="767" y="646" text-anchor="middle" fill="#886810" font-family="system-ui,sans-serif" font-size="9.5" font-weight="600">Budget</text>
      <text x="767" y="658" text-anchor="middle" fill="#8888a8" font-family="system-ui,sans-serif" font-size="8.5">成本限速</text>
      <line x1="808" y1="621" x2="826" y2="621" stroke="#cbd5e1" stroke-width="1.4" stroke-dasharray="4,3" class="flow-line" style="animation-delay:1s" marker-end="url(#arrLight)"/>

      <!-- Allow — Checkmark circle -->
      <rect x="830" y="590" width="68" height="62" rx="9" stroke="#80e0a0" stroke-width="1.2" class="flash-d"/>
      <circle cx="864" cy="616" r="14" fill="none" stroke="#16a34a" stroke-width="1.5"/>
      <polyline points="856,616 862,622 873,610" fill="none" stroke="#16a34a" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <text x="864" y="646" text-anchor="middle" fill="#106030" font-family="system-ui,sans-serif" font-size="9.5" font-weight="600">Allow</text>
    </g>

    <!-- Pass → -->
    <path d="M 898 621 L 920 621 Q 928 621 928 631 L 928 700" fill="none" stroke="#22c55e" stroke-width="1.5" stroke-dasharray="5,4" class="flow-line" style="animation-delay:1.2s" marker-end="url(#arrGreen)"/>
    <circle r="3.5" fill="#22c55e">
      <animateMotion dur="3s" repeatCount="indefinite" path="M 898 621 L 920 621 Q 928 621 928 631 L 928 700"/>
    </circle>
    <text x="912" y="658" fill="#22c55e" font-family="system-ui,sans-serif" font-size="8.5" font-weight="600">通过</text>

    <!-- Reject -->
    <path d="M 628 652 L 628 700 Q 628 710 642 710 L 698 710" fill="none" stroke="#ef4444" stroke-width="1.4" stroke-dasharray="5,3" class="reject-line" marker-end="url(#arrRed)"/>
    <text x="638" y="678" fill="#ef4444" font-family="system-ui,sans-serif" font-size="8.5" font-weight="600">拒绝</text>

    <!-- Reject + Replan -->
    <g id="reject-box" class="reject-pulse">
      <rect x="570" y="712" width="258" height="48" rx="9" fill="#fff5f5" stroke="#f08080" stroke-width="1"/>
      <text x="699" y="734" text-anchor="middle" fill="#dc2626" font-family="system-ui,sans-serif" font-size="11" font-weight="600">↻ Reject + Replan</text>
      <text x="699" y="750" text-anchor="middle" fill="#8888a8" font-family="system-ui,sans-serif" font-size="9">拒绝并重新规划，回流至 Think</text>
    </g>

    <!-- Pass indicator -->
    <g id="pass-indicator">
      <rect x="920" y="770" width="86" height="28" rx="6" fill="#e8fff0" stroke="#86efac" stroke-width="1"/>
      <text x="963" y="789" text-anchor="middle" fill="#15803d" font-family="system-ui,sans-serif" font-size="10" font-weight="600">→ 调度分发</text>
    </g>
  </g>

  <!-- ── RIGHT: Tools ── -->
  <g id="tools-section" class="breathe-slow" style="animation-delay:1.5s">
    <rect x="940" y="535" width="400" height="370" rx="14" fill="#fffbf0" stroke="#f0d880" stroke-width="1.2"/>
    <text x="1140" y="563" text-anchor="middle" fill="#886810" font-family="system-ui,sans-serif" font-size="15" font-weight="700" letter-spacing="0.3">Tool Execution · 工具执行</text>

    <!-- Tool Types — wrench icon -->
    <g id="tool-types" class="tool-pulse">
      <rect x="965" y="595" width="350" height="80" rx="10" fill="#fff" stroke="#f0d880" stroke-width="1"/>
      <text x="1140" y="620" text-anchor="middle" fill="#907010" font-family="system-ui,sans-serif" font-size="12" font-weight="600">Tool Types · 工具类型</text>
      <g transform="translate(1020, 644)">
        <rect x="-5" y="-8" width="10" height="12" rx="2" fill="none" stroke="#b89010" stroke-width="1.4"/>
        <circle cx="0" cy="0" r="4" fill="none" stroke="#b89010" stroke-width="1.4"/>
        <line x1="-5" y1="-8" x2="-8" y2="-12" stroke="#b89010" stroke-width="1.4" stroke-linecap="round"/>
        <line x1="5"  y1="-8" x2="8"  y2="-12" stroke="#b89010" stroke-width="1.4" stroke-linecap="round"/>
        <line x1="-5" y1="4"  x2="-8" y2="8"  stroke="#b89010" stroke-width="1.4" stroke-linecap="round"/>
        <line x1="5"  y1="4"  x2="8"  y2="8"  stroke="#b89010" stroke-width="1.4" stroke-linecap="round"/>
      </g>
      <text x="1140" y="655" text-anchor="middle" fill="#4a4a6a" font-family="system-ui,sans-serif" font-size="9.5">Bash · API · 文件读写 · 浏览器 · MCP</text>
      <text x="1140" y="668" text-anchor="middle" fill="#8888a8" font-family="system-ui,sans-serif" font-size="9">函数调用 · 插件系统 · 自定义工具</text>
    </g>

    <!-- Dispatch — compass/send icon -->
    <g id="dispatch-box" class="tool-pulse">
      <rect x="965" y="690" width="350" height="80" rx="10" fill="#fff" stroke="#f0d880" stroke-width="1"/>
      <text x="1140" y="715" text-anchor="middle" fill="#907010" font-family="system-ui,sans-serif" font-size="12" font-weight="600">Dispatch · 调度分发</text>
      <g transform="translate(1020, 740)" class="send-pulse">
        <circle cx="0" cy="0" r="10" fill="none" stroke="#b89010" stroke-width="1.4"/>
        <line x1="0" y1="-10" x2="0" y2="-5" stroke="#b89010" stroke-width="1.4" stroke-linecap="round"/>
        <line x1="0" y1="-10" x2="-3" y2="-6" stroke="#b89010" stroke-width="1.4" stroke-linecap="round"/>
        <line x1="0" y1="-10" x2="3"  y2="-6" stroke="#b89010" stroke-width="1.4" stroke-linecap="round"/>
        <line x1="0" y1="0" x2="0" y2="10" stroke="#b89010" stroke-width="1.2" stroke-linecap="round"/>
        <line x1="0" y1="0" x2="-3" y2="3" stroke="#b89010" stroke-width="1.2" stroke-linecap="round"/>
        <line x1="0" y1="0" x2="3" y2="3" stroke="#b89010" stroke-width="1.2" stroke-linecap="round"/>
      </g>
      <text x="1140" y="750" text-anchor="middle" fill="#4a4a6a" font-family="system-ui,sans-serif" font-size="9.5">并行调度 · 超时重试 · 结果聚合</text>
      <text x="1140" y="763" text-anchor="middle" fill="#8888a8" font-family="system-ui,sans-serif" font-size="9">限流 · 降级 · 熔断</text>
    </g>

    <!-- Return Result — reply icon -->
    <g id="return-box" class="tool-pulse" style="animation-delay:1s">
      <rect x="965" y="785" width="350" height="80" rx="10" fill="#fff" stroke="#f0d880" stroke-width="1"/>
      <text x="1140" y="810" text-anchor="middle" fill="#907010" font-family="system-ui,sans-serif" font-size="12" font-weight="600">Return Result · 结果回传</text>
      <g transform="translate(1020, 836)" class="send-pulse" style="animation-delay:0.8s">
        <path d="M 12 8 Q -6 8 -6 -4 L -10 -4 L -6 1 L -6 -8" fill="none" stroke="#b89010" stroke-width="1.4" stroke-linecap="round" stroke-linejoin="round"/>
        <line x1="-10" y1="-4" x2="-10" y2="8" stroke="#b89010" stroke-width="1.4" stroke-linecap="round"/>
      </g>
      <text x="1140" y="846" text-anchor="middle" fill="#4a4a6a" font-family="system-ui,sans-serif" font-size="9.5">结果解析 · 格式化 · 输入 Observe</text>
      <text x="1140" y="859" text-anchor="middle" fill="#8888a8" font-family="system-ui,sans-serif" font-size="9">结构化输出 · 错误码映射</text>
    </g>
  </g>
</svg>
`;

async function main() {
  console.log('Agent Loop — Flat Business Tech PPT Style\n');

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
