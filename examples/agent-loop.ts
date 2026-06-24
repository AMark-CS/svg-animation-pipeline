/**
 * Agent Loop Mechanism — Refined Premium PPT Style
 *
 * Improvements:
 * - Better visual hierarchy with consistent spacing
 * - More refined, professional icon designs
 * - Improved color harmony and contrast
 * - Cleaner typography with better hierarchy
 * - More elegant arrow paths
 * - Better overall composition and balance
 */

import { SVGAnimationPipeline } from '../src/pipeline';
import { ProgressInfo } from '../src/types';

const svgContent = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1600 1050" width="1600" height="1050">
  <defs>
    <style>
      /* ── Flow animations ── */
      @keyframes dashFlow {
        to { stroke-dashoffset: -24; }
      }
      @keyframes dashCycle {
        to { stroke-dashoffset: -22; }
      }
      .flow-line  { animation: dashFlow 10s linear infinite; }
      .cycle-line { animation: dashCycle 14s linear infinite; }

      /* ── Breathing ── */
      @keyframes breathe {
        0%, 100% { opacity: 1; }
        50%       { opacity: 0.88; }
      }
      @keyframes breatheSlow {
        0%, 100% { opacity: 0.95; }
        50%       { opacity: 0.75; }
      }
      .breathe      { animation: breathe      14s ease-in-out infinite; }
      .breathe-slow { animation: breatheSlow 20s ease-in-out infinite; }

      /* ── Safety flash ── */
      @keyframes flashA {
        0%, 100% { fill: #fff; stroke-width: 1.3; }
        50%       { fill: #fff5f5; stroke-width: 2; }
      }
      @keyframes flashB {
        0%, 100% { fill: #fff; stroke-width: 1.3; }
        50%       { fill: #fff7ed; stroke-width: 2; }
      }
      @keyframes flashC {
        0%, 100% { fill: #fff; stroke-width: 1.3; }
        50%       { fill: #fefce8; stroke-width: 2; }
      }
      @keyframes flashD {
        0%, 100% { fill: #fff; stroke-width: 1.3; }
        50%       { fill: #f0fdf4; stroke-width: 2; }
      }
      @keyframes rejectPulse {
        0%, 100% { opacity: 0.7; }
        50%       { opacity: 1; }
      }
      .flash-a { animation: flashA 12s ease-in-out infinite; }
      .flash-b { animation: flashB 12s ease-in-out infinite 3s; }
      .flash-c { animation: flashC 12s ease-in-out infinite 6s; }
      .flash-d { animation: flashD 12s ease-in-out infinite 9s; }
      .reject-pulse { animation: rejectPulse 10s ease-in-out infinite; }

      /* ── Shimmer ── */
      @keyframes shimmer {
        0%, 100% { opacity: 0.35; }
        50%       { opacity: 1; }
      }
      .shimmer { animation: shimmer 12s ease-in-out infinite; }

      /* ── Send pulse ── */
      @keyframes sendPulse {
        0%, 100% { opacity: 0.65; transform: translateX(0); }
        50%       { opacity: 1;    transform: translateX(4px); }
      }
      .send-pulse { animation: sendPulse 9s ease-in-out infinite; transform-origin: center; }

      /* ── Diamond bounce ── */
      @keyframes diamondBounce {
        0%, 100% { transform: scale(1); }
        30%       { transform: scale(1.07); }
        60%       { transform: scale(0.96); }
      }
      .diamond-bounce { animation: diamondBounce 14s ease-in-out infinite; transform-origin: 760px 520px; }

      /* ── Tool pulse ── */
      @keyframes toolPulse {
        0%, 100% { opacity: 0.85; }
        50%       { opacity: 1; }
      }
      .tool-pulse { animation: toolPulse 14s ease-in-out infinite; }
    </style>

    <!-- Arrow markers -->
    <marker id="arr"     viewBox="0 0 10 8" markerWidth="8" markerHeight="6" refX="8" refY="4" orient="auto">
      <polygon points="0 1, 10 4, 0 7" fill="#64748b"/>
    </marker>
    <marker id="arrLt"   viewBox="0 0 10 8" markerWidth="6" markerHeight="5" refX="8" refY="4" orient="auto">
      <polygon points="0 1, 10 4, 0 7" fill="#94a3b8"/>
    </marker>
    <marker id="arrGrn"  viewBox="0 0 10 8" markerWidth="8" markerHeight="6" refX="8" refY="4" orient="auto">
      <polygon points="0 1, 10 4, 0 7" fill="#22c55e"/>
    </marker>
    <marker id="arrRed"  viewBox="0 0 10 8" markerWidth="8" markerHeight="6" refX="8" refY="4" orient="auto">
      <polygon points="0 1, 10 4, 0 7" fill="#ef4444"/>
    </marker>
  </defs>

  <!-- ── Background ── -->
  <rect width="1600" height="1050" fill="#fafbfc"/>

  <!-- ══════════════════════════════════════════════════════════ -->
  <!-- SECTION 1: TRIGGER / INPUT                               -->
  <!-- ══════════════════════════════════════════════════════════ -->
  <g id="trigger-section" class="breathe-slow">
    <rect x="180" y="30" width="1240" height="95" rx="16" fill="#f0e8ff" stroke="#d0b8f0" stroke-width="1.2"/>
    <text x="210" y="60" fill="#4a3070" font-family="system-ui,sans-serif" font-size="15" font-weight="600" letter-spacing="0.3">Trigger / Input</text>

    <!-- 4 trigger icons — evenly spaced -->
    <!-- Message -->
    <g id="trigger-message">
      <rect x="220" y="72" width="230" height="40" rx="10" fill="#fff" stroke="#e8d8f8" stroke-width="1"/>
      <path d="M 242 84 h 14 a 3 3 0 0 1 3 3 v 8 a 3 3 0 0 1 -3 3 h -8 l -4 4 v -4 h -2 a 3 3 0 0 1 -3 -3 v -8 a 3 3 0 0 1 3 -3 z"
            fill="none" stroke="#9b7fc4" stroke-width="1.5"/>
      <line x1="248" y1="89" x2="254" y2="89" stroke="#b8a0d8" stroke-width="1.5" stroke-linecap="round"/>
      <line x1="248" y1="93" x2="252" y2="93" stroke="#b8a0d8" stroke-width="1.5" stroke-linecap="round"/>
      <text x="268" y="98" fill="#5a4070" font-family="system-ui,sans-serif" font-size="12">消息输入</text>
    </g>

    <!-- Calendar -->
    <g id="trigger-event">
      <rect x="470" y="72" width="230" height="40" rx="10" fill="#fff" stroke="#e8d8f8" stroke-width="1"/>
      <rect x="490" y="81" width="18" height="16" rx="3" fill="none" stroke="#9b7fc4" stroke-width="1.5"/>
      <line x1="490" y1="87" x2="508" y2="87" stroke="#9b7fc4" stroke-width="1.5"/>
      <line x1="495" y1="79" x2="495" y2="83" stroke="#9b7fc4" stroke-width="1.5" stroke-linecap="round"/>
      <line x1="504" y1="79" x2="504" y2="83" stroke="#9b7fc4" stroke-width="1.5" stroke-linecap="round"/>
      <circle cx="495" cy="93" r="1.3" fill="#b8a0d8"/>
      <circle cx="500" cy="93" r="1.3" fill="#b8a0d8"/>
      <circle cx="505" cy="93" r="1.3" fill="#b8a0d8"/>
      <text x="518" y="98" fill="#5a4070" font-family="system-ui,sans-serif" font-size="12">日历事件</text>
    </g>

    <!-- API -->
    <g id="trigger-api">
      <rect x="720" y="72" width="230" height="40" rx="10" fill="#fff" stroke="#e8d8f8" stroke-width="1"/>
      <circle cx="742" cy="92" r="5" fill="none" stroke="#9b7fc4" stroke-width="1.5"/>
      <circle cx="757" cy="92" r="5" fill="none" stroke="#9b7fc4" stroke-width="1.5"/>
      <circle cx="772" cy="92" r="5" fill="none" stroke="#9b7fc4" stroke-width="1.5"/>
      <line x1="747" y1="92" x2="752" y2="92" stroke="#b8a0d8" stroke-width="1.5"/>
      <line x1="762" y1="92" x2="767" y2="92" stroke="#b8a0d8" stroke-width="1.5"/>
      <text x="786" y="98" fill="#5a4070" font-family="system-ui,sans-serif" font-size="12">API 调用</text>
    </g>

    <!-- Schedule -->
    <g id="trigger-schedule">
      <rect x="970" y="72" width="230" height="40" rx="10" fill="#fff" stroke="#e8d8f8" stroke-width="1"/>
      <circle cx="992" cy="92" r="9" fill="none" stroke="#9b7fc4" stroke-width="1.5"/>
      <line x1="992" y1="92" x2="992" y2="86" stroke="#9b7fc4" stroke-width="1.8" stroke-linecap="round"/>
      <line x1="992" y1="92" x2="997" y2="95" stroke="#9b7fc4" stroke-width="1.8" stroke-linecap="round"/>
      <circle cx="992" cy="92" r="1.5" fill="#b8a0d8"/>
      <text x="1010" y="98" fill="#5a4070" font-family="system-ui,sans-serif" font-size="12">定时调度</text>
    </g>
  </g>

  <!-- Arrow Trigger → Core -->
  <line x1="800" y1="125" x2="800" y2="150" stroke="#64748b" stroke-width="1.8" marker-end="url(#arr)"/>

  <!-- ══════════════════════════════════════════════════════════ -->
  <!-- SECTION 2: COGNITIVE CORE                               -->
  <!-- ══════════════════════════════════════════════════════════ -->
  <g id="cognitive-core">
    <rect x="80" y="150" width="1440" height="380" rx="20" fill="#f8f5ff" stroke="#d8cce8" stroke-width="1.2"/>
    <text x="800" y="183" text-anchor="middle" fill="#3d2860" font-family="system-ui,sans-serif" font-size="17" font-weight="700" letter-spacing="0.3">Cognitive Core · 智能体循环</text>

    <!-- ── THINK ── -->
    <g id="think-stage" class="breathe">
      <rect x="130" y="215" width="360" height="175" rx="14" fill="#eef0ff" stroke="#c0c8f0" stroke-width="1.2"/>
      <rect x="130" y="215" width="360" height="34" rx="14" fill="#dde0ff"/>
      <rect x="130" y="237" width="360" height="12" fill="#dde0ff"/>
      <text x="310" y="238" text-anchor="middle" fill="#3840b0" font-family="system-ui,sans-serif" font-size="13" font-weight="600">Think</text>

      <!-- Cloud icon -->
      <ellipse cx="265" cy="295" rx="28" ry="17" fill="none" stroke="#6366f1" stroke-width="1.8"/>
      <ellipse cx="245" cy="300" rx="17" ry="12" fill="none" stroke="#6366f1" stroke-width="1.8"/>
      <ellipse cx="288" cy="298" rx="20" ry="14" fill="none" stroke="#6366f1" stroke-width="1.8"/>
      <circle cx="258" cy="310" r="2.5" fill="#818cf8" class="shimmer"/>
      <circle cx="268" cy="312" r="2.5" fill="#818cf8" class="shimmer" style="animation-delay:0.5s"/>
      <circle cx="278" cy="310" r="2.5" fill="#818cf8" class="shimmer" style="animation-delay:1s"/>

      <text x="310" y="355" text-anchor="middle" fill="#4a4a6a" font-family="system-ui,sans-serif" font-size="10.5">推理 · 规划 · 反思</text>
      <text x="310" y="370" text-anchor="middle" fill="#8888a8" font-family="system-ui,sans-serif" font-size="9.5">思维链 · Chain-of-Thought</text>
    </g>

    <!-- Arrow Think → Act -->
    <line x1="490" y1="302" x2="580" y2="302" stroke="#64748b" stroke-width="1.6" stroke-dasharray="8,4" class="flow-line" marker-end="url(#arr)"/>
    <circle r="4" fill="#6366f1" opacity="0.8">
      <animateMotion dur="4s" repeatCount="indefinite" path="M 490 302 L 580 302"/>
    </circle>

    <!-- ── ACT ── -->
    <g id="act-stage" class="breathe" style="animation-delay:1.5s">
      <rect x="590" y="215" width="360" height="175" rx="14" fill="#eefbf5" stroke="#a0e8c8" stroke-width="1.2"/>
      <rect x="590" y="215" width="360" height="34" rx="14" fill="#d8f8e8"/>
      <rect x="590" y="237" width="360" height="12" fill="#d8f8e8"/>
      <text x="770" y="238" text-anchor="middle" fill="#0a6838" font-family="system-ui,sans-serif" font-size="13" font-weight="600">Act</text>

      <!-- Gears -->
      <g transform="translate(710, 295)">
        <g>
          <circle cx="0" cy="0" r="20" fill="none" stroke="#10b981" stroke-width="1.8"/>
          <circle cx="0" cy="0" r="7"  fill="none" stroke="#10b981" stroke-width="1.8"/>
          ${[0,45,90,135,180,225,270,315].map(a => {
            const r = a * Math.PI / 180;
            return `<line x1="${(Math.cos(r)*20).toFixed(1)}" y1="${(Math.sin(r)*20).toFixed(1)}" x2="${(Math.cos(r)*13).toFixed(1)}" y2="${(Math.sin(r)*13).toFixed(1)}" stroke="#10b981" stroke-width="2.5" stroke-linecap="round"/>`;
          }).join('')}
          <animateTransform attributeName="transform" type="rotate" from="0 0 0" to="360 0 0" dur="30s" repeatCount="indefinite"/>
        </g>
      </g>
      <g transform="translate(775, 310)">
        <g>
          <circle cx="0" cy="0" r="20" fill="none" stroke="#34d399" stroke-width="1.8"/>
          <circle cx="0" cy="0" r="7"  fill="none" stroke="#34d399" stroke-width="1.8"/>
          ${[0,45,90,135,180,225,270,315].map(a => {
            const r = a * Math.PI / 180;
            return `<line x1="${(Math.cos(r)*20).toFixed(1)}" y1="${(Math.sin(r)*20).toFixed(1)}" x2="${(Math.cos(r)*13).toFixed(1)}" y2="${(Math.sin(r)*13).toFixed(1)}" stroke="#34d399" stroke-width="2.5" stroke-linecap="round"/>`;
          }).join('')}
          <animateTransform attributeName="transform" type="rotate" from="0 0 0" to="-360 0 0" dur="24s" repeatCount="indefinite"/>
        </g>
      </g>

      <text x="770" y="360" text-anchor="middle" fill="#4a4a6a" font-family="system-ui,sans-serif" font-size="10.5">选择工具 · 组装调用</text>
      <text x="770" y="375" text-anchor="middle" fill="#8888a8" font-family="system-ui,sans-serif" font-size="9.5">工具选择 · 编排调度</text>
    </g>

    <!-- Arrow Act → Observe -->
    <line x1="950" y1="302" x2="1040" y2="302" stroke="#64748b" stroke-width="1.6" stroke-dasharray="8,4" class="flow-line" style="animation-delay:1s" marker-end="url(#arr)"/>
    <circle r="4" fill="#10b981" opacity="0.8">
      <animateMotion dur="4s" repeatCount="indefinite" begin="2s" path="M 950 302 L 1040 302"/>
    </circle>

    <!-- ── OBSERVE ── -->
    <g id="observe-stage" class="breathe" style="animation-delay:3s">
      <rect x="1050" y="215" width="360" height="175" rx="14" fill="#fff0f6" stroke="#f0b0d0" stroke-width="1.2"/>
      <rect x="1050" y="215" width="360" height="34" rx="14" fill="#ffe0f0"/>
      <rect x="1050" y="237" width="360" height="12" fill="#ffe0f0"/>
      <text x="1230" y="238" text-anchor="middle" fill="#881050" font-family="system-ui,sans-serif" font-size="13" font-weight="600">Observe</text>

      <!-- Eye icon -->
      <path d="M 1165 295 Q 1230 270 1210 295 Q 1230 320 1165 295 Z" fill="none" stroke="#ec4899" stroke-width="1.8"/>
      <circle cx="1230" cy="295" r="13" fill="none" stroke="#ec4899" stroke-width="1.8"/>
      <circle cx="1230" cy="295" r="6" fill="#be185d">
        <animate attributeName="r" values="5;7;5" dur="2.5s" repeatCount="indefinite"/>
        <animate attributeName="fill-opacity" values="1;0.5;1" dur="2.5s" repeatCount="indefinite"/>
      </circle>

      <text x="1230" y="355" text-anchor="middle" fill="#4a4a6a" font-family="system-ui,sans-serif" font-size="10.5">解析结果 · 更新状态</text>
      <text x="1230" y="370" text-anchor="middle" fill="#8888a8" font-family="system-ui,sans-serif" font-size="9.5">结果解析 · 状态更新</text>
    </g>

    <!-- Cycle dashed arrow Observe → Think -->
    <path d="M 1380 302 Q 1400 302 1400 325 Q 1400 420 800 420 Q 200 420 200 345 Q 200 315 220 305"
          fill="none" stroke="#94a3b8" stroke-width="1.8" stroke-dasharray="8,4" class="cycle-line" marker-end="url(#arrLt)"/>
    <circle r="5" fill="#94a3b8" opacity="0.7">
      <animateMotion dur="8s" repeatCount="indefinite" path="M 1380 302 Q 1400 302 1400 325 Q 1400 420 800 420 Q 200 420 200 345 Q 200 315 220 305"/>
    </circle>

    <!-- Done diamond -->
    <g id="done-decision" class="diamond-bounce">
      <polygon points="760,470 840,512 760,554 680,512" fill="#fff" stroke="#475569" stroke-width="1.6"/>
      <text x="760" y="518" text-anchor="middle" fill="#1e293b" font-family="system-ui,sans-serif" font-size="13" font-weight="600">Done?</text>
    </g>

    <!-- Arrow Observe → Done -->
    <path d="M 1230 390 L 1230 462 Q 1230 472 1220 472 L 845 472" fill="none" stroke="#64748b" stroke-width="1.6" marker-end="url(#arr)"/>
    <circle r="4" fill="#ec4899" opacity="0.8">
      <animateMotion dur="5s" repeatCount="indefinite" path="M 1230 390 L 1230 462 Q 1230 472 1220 472 L 845 472"/>
    </circle>

    <!-- Yes → Output -->
    <line x1="840" y1="512" x2="1060" y2="512" stroke="#22c55e" stroke-width="1.6" stroke-dasharray="8,4" class="flow-line" style="animation-delay:0.6s" marker-end="url(#arrGrn)"/>
    <text x="950" y="505" text-anchor="middle" fill="#22c55e" font-family="system-ui,sans-serif" font-size="10" font-weight="600">Yes</text>

    <!-- No → Think -->
    <path d="M 760 554 L 760 590 Q 760 605 740 605 L 380 605 Q 340 605 340 585 L 340 395"
          fill="none" stroke="#ef4444" stroke-width="1.6" stroke-dasharray="6,4" class="flow-line" style="animation-delay:0.5s" marker-end="url(#arrRed)"/>
    <circle r="4" fill="#ef4444" opacity="0.8">
      <animateMotion dur="5.5s" repeatCount="indefinite" path="M 760 554 L 760 590 Q 760 605 740 605 L 380 605 Q 340 605 340 585 L 340 395"/>
    </circle>
    <text x="775" y="588" fill="#ef4444" font-family="system-ui,sans-serif" font-size="10" font-weight="600">No</text>

    <!-- Output box -->
    <g id="output-box">
      <rect x="1070" y="488" width="110" height="50" rx="10" fill="#e8fff0" stroke="#86efac" stroke-width="1.2"/>
      <text x="1125" y="510" text-anchor="middle" fill="#15803d" font-family="system-ui,sans-serif" font-size="11" font-weight="600">Output</text>
      <text x="1125" y="528" text-anchor="middle" fill="#15803d" font-family="system-ui,sans-serif" font-size="14">↑</text>
    </g>
  </g>

  <!-- Arrows Core → Bottom -->
  <line x1="340" y1="530" x2="340" y2="560" stroke="#64748b" stroke-width="1.4" stroke-dasharray="5,3" class="flow-line" marker-end="url(#arr)"/>
  <line x1="800" y1="530" x2="800" y2="560" stroke="#64748b" stroke-width="1.4" stroke-dasharray="5,3" class="flow-line" style="animation-delay:0.5s" marker-end="url(#arr)"/>
  <line x1="1300" y1="530" x2="1300" y2="560" stroke="#64748b" stroke-width="1.4" stroke-dasharray="5,3" class="flow-line" style="animation-delay:1s" marker-end="url(#arr)"/>

  <!-- ══════════════════════════════════════════════════════════ -->
  <!-- BOTTOM THREE COLUMNS                                     -->
  <!-- ══════════════════════════════════════════════════════════ -->

  <!-- ── LEFT: Memory ── -->
  <g id="memory-section" class="breathe-slow" style="animation-delay:0.5s">
    <rect x="50" y="560" width="500" height="440" rx="16" fill="#eef0ff" stroke="#c0c8f0" stroke-width="1.2"/>
    <text x="300" y="592" text-anchor="middle" fill="#2e38a0" font-family="system-ui,sans-serif" font-size="15" font-weight="700" letter-spacing="0.3">Memory · 记忆</text>

    <!-- Working Memory -->
    <g id="working-memory">
      <rect x="78" y="612" width="444" height="150" rx="12" fill="#fff" stroke="#d0d8f8" stroke-width="1"/>
      <text x="300" y="640" text-anchor="middle" fill="#3848b8" font-family="system-ui,sans-serif" font-size="12" font-weight="600">Working Memory</text>

      <!-- Document stack -->
      <rect x="165" y="660" width="44" height="6" rx="2.5" fill="#c0c8f8" class="shimmer"/>
      <rect x="161" y="670" width="52" height="6" rx="2.5" fill="#d0d8ff" class="shimmer" style="animation-delay:0.4s"/>
      <rect x="157" y="680" width="60" height="6" rx="2.5" fill="#e0e4ff" class="shimmer" style="animation-delay:0.8s"/>
      <rect x="153" y="690" width="68" height="6" rx="2.5" fill="#eef0ff" class="shimmer" style="animation-delay:1.2s"/>
      <rect x="149" y="700" width="76" height="6" rx="2.5" fill="#f4f4ff" class="shimmer" style="animation-delay:1.6s"/>

      <text x="300" y="730" text-anchor="middle" fill="#4a4a6a" font-family="system-ui,sans-serif" font-size="10.5">短期上下文窗口</text>
      <text x="300" y="745" text-anchor="middle" fill="#8888a8" font-family="system-ui,sans-serif" font-size="9.5">会话历史 · 工具调用记录</text>
    </g>

    <!-- Long-term Memory -->
    <g id="longterm-memory">
      <rect x="78" y="778" width="444" height="150" rx="12" fill="#fff" stroke="#d0d8f8" stroke-width="1"/>
      <text x="300" y="806" text-anchor="middle" fill="#3848b8" font-family="system-ui,sans-serif" font-size="12" font-weight="600">Long-term Memory</text>

      <!-- Database cylinder -->
      <ellipse cx="220" cy="840" rx="20" ry="6" fill="none" stroke="#6080d0" stroke-width="1.6">
        <animate attributeName="stroke-opacity" values="1;0.3;1" dur="4s" repeatCount="indefinite"/>
      </ellipse>
      <line x1="200" y1="840" x2="200" y2="860" stroke="#6080d0" stroke-width="1.6">
        <animate attributeName="stroke-opacity" values="1;0.3;1" dur="4s" repeatCount="indefinite"/>
      </line>
      <line x1="240" y1="840" x2="240" y2="860" stroke="#6080d0" stroke-width="1.6">
        <animate attributeName="stroke-opacity" values="1;0.3;1" dur="4s" repeatCount="indefinite" begin="0.8s"/>
      </line>
      <ellipse cx="220" cy="860" rx="20" ry="6" fill="none" stroke="#6080d0" stroke-width="1.6">
        <animate attributeName="stroke-opacity" values="1;0.3;1" dur="4s" repeatCount="indefinite" begin="1.6s"/>
      </ellipse>
      <ellipse cx="220" cy="850" rx="20" ry="6" fill="none" stroke="#90a8e0" stroke-width="1">
        <animate attributeName="stroke-opacity" values="0.8;0.2;0.8" dur="4s" repeatCount="indefinite" begin="2.4s"/>
      </ellipse>

      <text x="300" y="890" text-anchor="middle" fill="#4a4a6a" font-family="system-ui,sans-serif" font-size="10.5">长期向量知识库</text>
      <text x="300" y="905" text-anchor="middle" fill="#8888a8" font-family="system-ui,sans-serif" font-size="9.5">RAG · 知识图谱</text>
    </g>
  </g>

  <!-- ── CENTER: Safety ── -->
  <g id="safety-section" class="breathe-slow" style="animation-delay:1s">
    <rect x="575" y="560" width="450" height="440" rx="16" fill="#fff5f5" stroke="#f0b8b8" stroke-width="1.2"/>
    <text x="800" y="592" text-anchor="middle" fill="#882020" font-family="system-ui,sans-serif" font-size="15" font-weight="700" letter-spacing="0.3">Safety Layers · 安全校验</text>

    <!-- 4 Safety Gates -->
    <g id="safety-gates">
      <!-- Validate -->
      <rect x="600" y="620" width="94" height="75" rx="10" stroke="#f08080" stroke-width="1.2" class="flash-a"/>
      <path d="M 647 638 L 632 643 L 632 660 Q 632 672 647 678 Q 662 672 662 660 L 662 643 Z" fill="none" stroke="#dc2626" stroke-width="1.8" stroke-linejoin="round"/>
      <polyline points="639,654 644,660 656,648" fill="none" stroke="#dc2626" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
      <text x="647" y="688" text-anchor="middle" fill="#882020" font-family="system-ui,sans-serif" font-size="9.5" font-weight="600">Validate</text>
      <text x="647" y="700" text-anchor="middle" fill="#8888a8" font-family="system-ui,sans-serif" font-size="8.5">输入校验</text>
      <line x1="694" y1="658" x2="712" y2="658" stroke="#cbd5e1" stroke-width="1.4" stroke-dasharray="4,3" class="flow-line" marker-end="url(#arrLt)"/>

      <!-- Scope -->
      <rect x="718" y="620" width="94" height="75" rx="10" stroke="#f0a060" stroke-width="1.2" class="flash-b"/>
      <rect x="749" y="650" width="20" height="16" rx="3" fill="none" stroke="#d97706" stroke-width="1.8"/>
      <path d="M 753 650 L 753 642 Q 753 636 759 636 Q 765 636 765 642 L 765 650" fill="none" stroke="#d97706" stroke-width="1.8" stroke-linecap="round"/>
      <circle cx="759" cy="657" r="2" fill="#d97706"/>
      <text x="765" y="688" text-anchor="middle" fill="#885010" font-family="system-ui,sans-serif" font-size="9.5" font-weight="600">Scope</text>
      <text x="765" y="700" text-anchor="middle" fill="#8888a8" font-family="system-ui,sans-serif" font-size="8.5">权限范围</text>
      <line x1="812" y1="658" x2="830" y2="658" stroke="#cbd5e1" stroke-width="1.4" stroke-dasharray="4,3" class="flow-line" style="animation-delay:0.6s" marker-end="url(#arrLt)"/>

      <!-- Budget -->
      <rect x="836" y="620" width="94" height="75" rx="10" stroke="#e0c840" stroke-width="1.2" class="flash-c"/>
      <ellipse cx="872" cy="648" rx="13" ry="4" fill="none" stroke="#b8a020" stroke-width="1.8"/>
      <ellipse cx="877" cy="655" rx="13" ry="4" fill="none" stroke="#b8a020" stroke-width="1.8"/>
      <ellipse cx="872" cy="662" rx="13" ry="4" fill="none" stroke="#b8a020" stroke-width="1.8"/>
      <text x="883" y="688" text-anchor="middle" fill="#886810" font-family="system-ui,sans-serif" font-size="9.5" font-weight="600">Budget</text>
      <text x="883" y="700" text-anchor="middle" fill="#8888a8" font-family="system-ui,sans-serif" font-size="8.5">成本限速</text>
      <line x1="930" y1="658" x2="948" y2="658" stroke="#cbd5e1" stroke-width="1.4" stroke-dasharray="4,3" class="flow-line" style="animation-delay:1.2s" marker-end="url(#arrLt)"/>

      <!-- Allow -->
      <rect x="954" y="620" width="60" height="75" rx="10" stroke="#80e0a0" stroke-width="1.2" class="flash-d"/>
      <circle cx="984" cy="652" r="14" fill="none" stroke="#16a34a" stroke-width="1.8"/>
      <polyline points="977,652 982,658 992,646" fill="none" stroke="#16a34a" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>
      <text x="984" y="688" text-anchor="middle" fill="#106030" font-family="system-ui,sans-serif" font-size="9.5" font-weight="600">Allow</text>
    </g>

    <!-- Pass → -->
    <path d="M 1014 658 L 1035 658 Q 1042 658 1042 668 L 1042 760" fill="none" stroke="#22c55e" stroke-width="1.4" stroke-dasharray="5,3" class="flow-line" style="animation-delay:1.5s" marker-end="url(#arrGrn)"/>
    <circle r="3.5" fill="#22c55e" opacity="0.8">
      <animateMotion dur="4s" repeatCount="indefinite" path="M 1014 658 L 1035 658 Q 1042 658 1042 668 L 1042 760"/>
    </circle>
    <text x="1028" y="710" fill="#22c55e" font-family="system-ui,sans-serif" font-size="8.5" font-weight="600">通过</text>

    <!-- Reject -->
    <path d="M 720 695 L 720 765 Q 720 780 735 780 L 790 780" fill="none" stroke="#ef4444" stroke-width="1.4" stroke-dasharray="5,3" class="flow-line" style="animation-delay:0.5s" marker-end="url(#arrRed)"/>
    <text x="735" y="735" fill="#ef4444" font-family="system-ui,sans-serif" font-size="8.5" font-weight="600">拒绝</text>

    <!-- Reject + Replan -->
    <g id="reject-box" class="reject-pulse">
      <rect x="600" y="785" width="340" height="50" rx="10" fill="#fff5f5" stroke="#f08080" stroke-width="1"/>
      <text x="770" y="808" text-anchor="middle" fill="#dc2626" font-family="system-ui,sans-serif" font-size="11" font-weight="600">↻ Reject + Replan</text>
      <text x="770" y="825" text-anchor="middle" fill="#8888a8" font-family="system-ui,sans-serif" font-size="9">拒绝并重新规划，回流至 Think</text>
    </g>
  </g>

  <!-- ── RIGHT: Tools ── -->
  <g id="tools-section" class="breathe-slow" style="animation-delay:1.5s">
    <rect x="1050" y="560" width="500" height="440" rx="16" fill="#fffbf0" stroke="#f0d880" stroke-width="1.2"/>
    <text x="1300" y="592" text-anchor="middle" fill="#886810" font-family="system-ui,sans-serif" font-size="15" font-weight="700" letter-spacing="0.3">Tool Execution · 工具执行</text>

    <!-- Tool Types -->
    <g id="tool-types" class="tool-pulse">
      <rect x="1078" y="625" width="444" height="95" rx="12" fill="#fff" stroke="#f0d880" stroke-width="1"/>
      <text x="1300" y="653" text-anchor="middle" fill="#907010" font-family="system-ui,sans-serif" font-size="12" font-weight="600">Tool Types · 工具类型</text>
      <g transform="translate(1148, 685)">
        <rect x="-6" y="-10" width="12" height="14" rx="2.5" fill="none" stroke="#b89010" stroke-width="1.6"/>
        <circle cx="0" cy="0" r="4.5" fill="none" stroke="#b89010" stroke-width="1.6"/>
        <line x1="-6" y1="-10" x2="-9" y2="-13" stroke="#b89010" stroke-width="1.6" stroke-linecap="round"/>
        <line x1="6"  y1="-10" x2="9"  y2="-13" stroke="#b89010" stroke-width="1.6" stroke-linecap="round"/>
        <line x1="-6" y1="4"   x2="-9" y2="7"   stroke="#b89010" stroke-width="1.6" stroke-linecap="round"/>
        <line x1="6"  y1="4"   x2="9"  y2="7"   stroke="#b89010" stroke-width="1.6" stroke-linecap="round"/>
      </g>
      <text x="1300" y="685" text-anchor="middle" fill="#4a4a6a" font-family="system-ui,sans-serif" font-size="9.5">Bash · API · 文件读写 · 浏览器 · MCP</text>
      <text x="1300" y="700" text-anchor="middle" fill="#8888a8" font-family="system-ui,sans-serif" font-size="8.5">函数调用 · 插件系统 · 自定义工具</text>
    </g>

    <!-- Dispatch -->
    <g id="dispatch-box" class="tool-pulse">
      <rect x="1078" y="738" width="444" height="95" rx="12" fill="#fff" stroke="#f0d880" stroke-width="1"/>
      <text x="1300" y="766" text-anchor="middle" fill="#907010" font-family="system-ui,sans-serif" font-size="12" font-weight="600">Dispatch · 调度分发</text>
      <g transform="translate(1148, 798)" class="send-pulse">
        <circle cx="0" cy="0" r="11" fill="none" stroke="#b89010" stroke-width="1.6"/>
        <line x1="0" y1="-11" x2="0" y2="-5" stroke="#b89010" stroke-width="1.6" stroke-linecap="round"/>
        <line x1="0" y1="-11" x2="-3.5" y2="-6.5" stroke="#b89010" stroke-width="1.6" stroke-linecap="round"/>
        <line x1="0" y1="-11" x2="3.5"  y2="-6.5" stroke="#b89010" stroke-width="1.6" stroke-linecap="round"/>
        <line x1="0" y1="0" x2="0" y2="11" stroke="#b89010" stroke-width="1.4" stroke-linecap="round"/>
        <line x1="0" y1="0" x2="-3.5" y2="3.5" stroke="#b89010" stroke-width="1.4" stroke-linecap="round"/>
        <line x1="0" y1="0" x2="3.5" y2="3.5" stroke="#b89010" stroke-width="1.4" stroke-linecap="round"/>
      </g>
      <text x="1300" y="798" text-anchor="middle" fill="#4a4a6a" font-family="system-ui,sans-serif" font-size="9.5">并行调度 · 超时重试 · 结果聚合</text>
      <text x="1300" y="813" text-anchor="middle" fill="#8888a8" font-family="system-ui,sans-serif" font-size="8.5">限流 · 降级 · 熔断</text>
    </g>

    <!-- Return Result -->
    <g id="return-box" class="tool-pulse" style="animation-delay:1.2s">
      <rect x="1078" y="851" width="444" height="95" rx="12" fill="#fff" stroke="#f0d880" stroke-width="1"/>
      <text x="1300" y="879" text-anchor="middle" fill="#907010" font-family="system-ui,sans-serif" font-size="12" font-weight="600">Return Result · 结果回传</text>
      <g transform="translate(1148, 911)" class="send-pulse" style="animation-delay:1s">
        <path d="M 14 9 Q -7 9 -7 -1 L -11 -1 L -7 4 L -7 -7" fill="none" stroke="#b89010" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/>
        <line x1="-11" y1="-1" x2="-11" y2="9" stroke="#b89010" stroke-width="1.6" stroke-linecap="round"/>
      </g>
      <text x="1300" y="911" text-anchor="middle" fill="#4a4a6a" font-family="system-ui,sans-serif" font-size="9.5">结果解析 · 格式化 · 输入 Observe</text>
      <text x="1300" y="926" text-anchor="middle" fill="#8888a8" font-family="system-ui,sans-serif" font-size="8.5">结构化输出 · 错误码映射</text>
    </g>
  </g>
</svg>
`;

async function main() {
  console.log('Agent Loop — Refined Premium PPT Style\n');

  const pipeline = new SVGAnimationPipeline({
    input: svgContent,
    output: './output/agent-loop.gif',
    fps: 30,
    duration: 6000,
    width: 1600,
    height: 1050,
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
