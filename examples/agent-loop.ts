/**
 * Agent Loop Mechanism — Premium Flat PPT Style
 *
 * Refined icons, slower animations, clean layout with no overlap.
 * Icons inspired by modern design systems (Feather, Lucide, Phosphor)
 *
 * Design:
 * - Pure white background
 * - Soft pastel macaron accents
 * - 2px clean strokes, rounded linecaps/linejoins
 * - 6-10s animation cycles (slow, professional)
 * - 1600x1050 canvas for better spacing
 * - Generous padding between all modules
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

      /* ── Gear spin (using SMIL for proper transform-origin) ── */
      .gear-cw  { transform-box: fill-box; transform-origin: center; }
      .gear-ccw { transform-box: fill-box; transform-origin: center; }

      /* ── Breathing ── */
      @keyframes breathe {
        0%, 100% { opacity: 1; }
        50%       { opacity: 0.85; }
      }
      @keyframes breatheSlow {
        0%, 100% { opacity: 0.95; }
        50%       { opacity: 0.72; }
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
    <rect x="200" y="28" width="1200" height="100" rx="16" fill="#f0e8ff" stroke="#d0b8f0" stroke-width="1.2"/>
    <text x="230" y="58" fill="#4a3070" font-family="system-ui,sans-serif" font-size="16" font-weight="600" letter-spacing="0.5">Trigger / Input</text>

    <!-- Message — speech bubble -->
    <g id="trigger-message">
      <rect x="245" y="72" width="220" height="42" rx="10" fill="#fff" stroke="#e8d8f8" stroke-width="1"/>
      <path d="M 266 84 h 16 a 3 3 0 0 1 3 3 v 10 a 3 3 0 0 1 -3 3 h -10 l -5 5 v -5 h -1 a 3 3 0 0 1 -3 -3 v -10 a 3 3 0 0 1 3 -3 z"
            fill="none" stroke="#9b7fc4" stroke-width="1.6"/>
      <line x1="272" y1="90" x2="279" y2="90" stroke="#b8a0d8" stroke-width="1.6" stroke-linecap="round"/>
      <line x1="272" y1="94" x2="276" y2="94" stroke="#b8a0d8" stroke-width="1.6" stroke-linecap="round"/>
      <text x="300" y="100" fill="#5a4070" font-family="system-ui,sans-serif" font-size="13">消息输入</text>
    </g>

    <!-- Calendar -->
    <g id="trigger-event">
      <rect x="483" y="72" width="220" height="42" rx="10" fill="#fff" stroke="#e8d8f8" stroke-width="1"/>
      <rect x="503" y="82" width="20" height="18" rx="4" fill="none" stroke="#9b7fc4" stroke-width="1.6"/>
      <line x1="503" y1="89" x2="523" y2="89" stroke="#9b7fc4" stroke-width="1.6"/>
      <line x1="508" y1="79" x2="508" y2="84" stroke="#9b7fc4" stroke-width="1.6" stroke-linecap="round"/>
      <line x1="518" y1="79" x2="518" y2="84" stroke="#9b7fc4" stroke-width="1.6" stroke-linecap="round"/>
      <circle cx="508" cy="95" r="1.5" fill="#b8a0d8"/>
      <circle cx="513" cy="95" r="1.5" fill="#b8a0d8"/>
      <circle cx="518" cy="95" r="1.5" fill="#b8a0d8"/>
      <text x="534" y="100" fill="#5a4070" font-family="system-ui,sans-serif" font-size="13">日历事件</text>
    </g>

    <!-- API — linked nodes -->
    <g id="trigger-api">
      <rect x="721" y="72" width="220" height="42" rx="10" fill="#fff" stroke="#e8d8f8" stroke-width="1"/>
      <circle cx="744" cy="93" r="6" fill="none" stroke="#9b7fc4" stroke-width="1.6"/>
      <circle cx="762" cy="93" r="6" fill="none" stroke="#9b7fc4" stroke-width="1.6"/>
      <circle cx="780" cy="93" r="6" fill="none" stroke="#9b7fc4" stroke-width="1.6"/>
      <line x1="750" y1="93" x2="756" y2="93" stroke="#b8a0d8" stroke-width="1.6"/>
      <line x1="768" y1="93" x2="774" y2="93" stroke="#b8a0d8" stroke-width="1.6"/>
      <text x="796" y="100" fill="#5a4070" font-family="system-ui,sans-serif" font-size="13">API 调用</text>
    </g>

    <!-- Clock -->
    <g id="trigger-schedule">
      <rect x="959" y="72" width="220" height="42" rx="10" fill="#fff" stroke="#e8d8f8" stroke-width="1"/>
      <circle cx="982" cy="93" r="10" fill="none" stroke="#9b7fc4" stroke-width="1.6"/>
      <line x1="982" y1="93" x2="982" y2="86" stroke="#9b7fc4" stroke-width="2" stroke-linecap="round"/>
      <line x1="982" y1="93" x2="988" y2="96" stroke="#9b7fc4" stroke-width="2" stroke-linecap="round"/>
      <circle cx="982" cy="93" r="1.8" fill="#b8a0d8"/>
      <text x="1000" y="100" fill="#5a4070" font-family="system-ui,sans-serif" font-size="13">定时调度</text>
    </g>
  </g>

  <!-- Arrow Trigger → Core -->
  <line x1="800" y1="128" x2="800" y2="155" stroke="#64748b" stroke-width="1.8" marker-end="url(#arr)"/>

  <!-- ══════════════════════════════════════════════════════════ -->
  <!-- SECTION 2: COGNITIVE CORE                               -->
  <!-- ══════════════════════════════════════════════════════════ -->
  <g id="cognitive-core">
    <rect x="80" y="155" width="1440" height="380" rx="20" fill="#f8f5ff" stroke="#d8cce8" stroke-width="1.2"/>
    <text x="800" y="188" text-anchor="middle" fill="#3d2860" font-family="system-ui,sans-serif" font-size="18" font-weight="700" letter-spacing="0.5">Cognitive Core · 智能体循环</text>

    <!-- ── THINK ── -->
    <g id="think-stage" class="breathe">
      <rect x="130" y="220" width="370" height="180" rx="14" fill="#eef0ff" stroke="#c0c8f0" stroke-width="1.3"/>
      <rect x="130" y="220" width="370" height="36" rx="14" fill="#dde0ff"/>
      <rect x="130" y="244" width="370" height="12" fill="#dde0ff"/>
      <text x="315" y="244" text-anchor="middle" fill="#3840b0" font-family="system-ui,sans-serif" font-size="14" font-weight="600">Think</text>

      <!-- Cloud icon — elegant -->
      <ellipse cx="270" cy="300" rx="30" ry="18" fill="none" stroke="#6366f1" stroke-width="2"/>
      <ellipse cx="248" cy="305" rx="18" ry="13" fill="none" stroke="#6366f1" stroke-width="2"/>
      <ellipse cx="295" cy="303" rx="22" ry="15" fill="none" stroke="#6366f1" stroke-width="2"/>
      <circle cx="260" cy="316" r="3" fill="#818cf8" class="shimmer"/>
      <circle cx="272" cy="318" r="3" fill="#818cf8" class="shimmer" style="animation-delay:0.6s"/>
      <circle cx="284" cy="316" r="3" fill="#818cf8" class="shimmer" style="animation-delay:1.2s"/>

      <text x="315" y="365" text-anchor="middle" fill="#4a4a6a" font-family="system-ui,sans-serif" font-size="11">推理 · 规划 · 反思</text>
      <text x="315" y="382" text-anchor="middle" fill="#8888a8" font-family="system-ui,sans-serif" font-size="10">思维链 · Chain-of-Thought</text>
    </g>

    <!-- Arrow Think → Act -->
    <line x1="500" y1="310" x2="590" y2="310" stroke="#64748b" stroke-width="1.8" stroke-dasharray="9,5" class="flow-line" marker-end="url(#arr)"/>
    <circle r="5" fill="#6366f1" opacity="0.8">
      <animateMotion dur="4s" repeatCount="indefinite" path="M 500 310 L 590 310"/>
    </circle>

    <!-- ── ACT ── -->
    <g id="act-stage" class="breathe" style="animation-delay:1.5s">
      <rect x="600" y="220" width="370" height="180" rx="14" fill="#eefbf5" stroke="#a0e8c8" stroke-width="1.3"/>
      <rect x="600" y="220" width="370" height="36" rx="14" fill="#d8f8e8"/>
      <rect x="600" y="244" width="370" height="12" fill="#d8f8e8"/>
      <text x="785" y="244" text-anchor="middle" fill="#0a6838" font-family="system-ui,sans-serif" font-size="14" font-weight="600">Act</text>

      <!-- Gears — clean calculated teeth with SMIL animation -->
      <g transform="translate(720, 300)">
        <circle cx="0" cy="0" r="22" fill="none" stroke="#10b981" stroke-width="2"/>
        <circle cx="0" cy="0" r="8"  fill="none" stroke="#10b981" stroke-width="2"/>
        ${[0,45,90,135,180,225,270,315].map(a => {
          const r = a * Math.PI / 180;
          return `<line x1="${(Math.cos(r)*22).toFixed(1)}" y1="${(Math.sin(r)*22).toFixed(1)}" x2="${(Math.cos(r)*14).toFixed(1)}" y2="${(Math.sin(r)*14).toFixed(1)}" stroke="#10b981" stroke-width="3" stroke-linecap="round"/>`;
        }).join('')}
        <animateTransform attributeName="transform" type="rotate" from="0 0 0" to="360 0 0" dur="30s" repeatCount="indefinite" additive="sum"/>
      </g>
      <g transform="translate(790, 318)">
        <circle cx="0" cy="0" r="22" fill="none" stroke="#34d399" stroke-width="2"/>
        <circle cx="0" cy="0" r="8"  fill="none" stroke="#34d399" stroke-width="2"/>
        ${[0,45,90,135,180,225,270,315].map(a => {
          const r = a * Math.PI / 180;
          return `<line x1="${(Math.cos(r)*22).toFixed(1)}" y1="${(Math.sin(r)*22).toFixed(1)}" x2="${(Math.cos(r)*14).toFixed(1)}" y2="${(Math.sin(r)*14).toFixed(1)}" stroke="#34d399" stroke-width="3" stroke-linecap="round"/>`;
        }).join('')}
        <animateTransform attributeName="transform" type="rotate" from="0 0 0" to="-360 0 0" dur="24s" repeatCount="indefinite" additive="sum"/>
      </g>

      <text x="785" y="370" text-anchor="middle" fill="#4a4a6a" font-family="system-ui,sans-serif" font-size="11">选择工具 · 组装调用</text>
      <text x="785" y="387" text-anchor="middle" fill="#8888a8" font-family="system-ui,sans-serif" font-size="10">工具选择 · 编排调度</text>
    </g>

    <!-- Arrow Act → Observe -->
    <line x1="970" y1="310" x2="1060" y2="310" stroke="#64748b" stroke-width="1.8" stroke-dasharray="9,5" class="flow-line" style="animation-delay:1s" marker-end="url(#arr)"/>
    <circle r="5" fill="#10b981" opacity="0.8">
      <animateMotion dur="4s" repeatCount="indefinite" begin="2s" path="M 970 310 L 1060 310"/>
    </circle>

    <!-- ── OBSERVE ── -->
    <g id="observe-stage" class="breathe" style="animation-delay:3s">
      <rect x="1070" y="220" width="370" height="180" rx="14" fill="#fff0f6" stroke="#f0b0d0" stroke-width="1.3"/>
      <rect x="1070" y="220" width="370" height="36" rx="14" fill="#ffe0f0"/>
      <rect x="1070" y="244" width="370" height="12" fill="#ffe0f0"/>
      <text x="1255" y="244" text-anchor="middle" fill="#881050" font-family="system-ui,sans-serif" font-size="14" font-weight="600">Observe</text>

      <!-- Eye — elegant almond -->
      <path d="M 1180 300 Q 1255 272 1230 300 Q 1255 328 1180 300 Z" fill="none" stroke="#ec4899" stroke-width="2"/>
      <circle cx="1255" cy="300" r="14" fill="none" stroke="#ec4899" stroke-width="2"/>
      <circle cx="1255" cy="300" r="7" fill="#be185d">
        <animate attributeName="r" values="5;8;5" dur="2.5s" repeatCount="indefinite"/>
        <animate attributeName="fill-opacity" values="1;0.5;1" dur="2.5s" repeatCount="indefinite"/>
      </circle>

      <text x="1255" y="370" text-anchor="middle" fill="#4a4a6a" font-family="system-ui,sans-serif" font-size="11">解析结果 · 更新状态</text>
      <text x="1255" y="387" text-anchor="middle" fill="#8888a8" font-family="system-ui,sans-serif" font-size="10">结果解析 · 状态更新</text>
    </g>

    <!-- Cycle dashed arrow Observe → Think -->
    <path d="M 1400 310 Q 1420 310 1420 340 Q 1420 430 800 430 Q 180 430 180 350 Q 180 320 200 310"
          fill="none" stroke="#94a3b8" stroke-width="2" stroke-dasharray="9,5" class="cycle-line" marker-end="url(#arrLt)"/>
    <circle r="6" fill="#94a3b8" opacity="0.7">
      <animateMotion dur="8s" repeatCount="indefinite" path="M 1400 310 Q 1420 310 1420 340 Q 1420 430 800 430 Q 180 430 180 350 Q 180 320 200 310"/>
    </circle>

    <!-- Done diamond -->
    <g id="done-decision" class="diamond-bounce">
      <polygon points="760,475 840,520 760,565 680,520" fill="#fff" stroke="#475569" stroke-width="1.8"/>
      <text x="760" y="526" text-anchor="middle" fill="#1e293b" font-family="system-ui,sans-serif" font-size="14" font-weight="600">Done?</text>
    </g>

    <!-- Arrow Observe → Done -->
    <path d="M 1255 400 L 1255 470 Q 1255 480 1240 480 L 845 480" fill="none" stroke="#64748b" stroke-width="1.8" marker-end="url(#arr)"/>
    <circle r="5" fill="#ec4899" opacity="0.8">
      <animateMotion dur="5s" repeatCount="indefinite" path="M 1255 400 L 1255 470 Q 1255 480 1240 480 L 845 480"/>
    </circle>

    <!-- Yes → Output -->
    <line x1="840" y1="520" x2="1080" y2="520" stroke="#22c55e" stroke-width="1.8" stroke-dasharray="9,5" class="flow-line" style="animation-delay:0.6s" marker-end="url(#arrGrn)"/>
    <text x="960" y="512" text-anchor="middle" fill="#22c55e" font-family="system-ui,sans-serif" font-size="11" font-weight="600">Yes</text>

    <!-- No → Think -->
    <path d="M 760 565 L 760 600 Q 760 615 740 615 L 370 615 Q 330 615 330 590 L 330 405"
          fill="none" stroke="#ef4444" stroke-width="1.8" stroke-dasharray="7,4" class="flow-line" style="animation-delay:0.5s" marker-end="url(#arrRed)"/>
    <circle r="5" fill="#ef4444" opacity="0.8">
      <animateMotion dur="5.5s" repeatCount="indefinite" path="M 760 565 L 760 600 Q 760 615 740 615 L 370 615 Q 330 615 330 590 L 330 405"/>
    </circle>
    <text x="775" y="598" fill="#ef4444" font-family="system-ui,sans-serif" font-size="11" font-weight="600">No</text>

    <!-- Output box -->
    <g id="output-box">
      <rect x="1090" y="495" width="120" height="55" rx="10" fill="#e8fff0" stroke="#86efac" stroke-width="1.3"/>
      <text x="1150" y="520" text-anchor="middle" fill="#15803d" font-family="system-ui,sans-serif" font-size="12" font-weight="600">Output</text>
      <text x="1150" y="540" text-anchor="middle" fill="#15803d" font-family="system-ui,sans-serif" font-size="16">↑</text>
    </g>
  </g>

  <!-- Arrows Core → Bottom -->
  <line x1="340" y1="535" x2="340" y2="570" stroke="#64748b" stroke-width="1.5" stroke-dasharray="6,4" class="flow-line" marker-end="url(#arr)"/>
  <line x1="800" y1="535" x2="800" y2="570" stroke="#64748b" stroke-width="1.5" stroke-dasharray="6,4" class="flow-line" style="animation-delay:0.5s" marker-end="url(#arr)"/>
  <line x1="1300" y1="535" x2="1300" y2="570" stroke="#64748b" stroke-width="1.5" stroke-dasharray="6,4" class="flow-line" style="animation-delay:1s" marker-end="url(#arr)"/>

  <!-- ══════════════════════════════════════════════════════════ -->
  <!-- BOTTOM THREE COLUMNS                                     -->
  <!-- ══════════════════════════════════════════════════════════ -->

  <!-- ── LEFT: Memory ── -->
  <g id="memory-section" class="breathe-slow" style="animation-delay:0.5s">
    <rect x="50" y="570" width="500" height="430" rx="16" fill="#eef0ff" stroke="#c0c8f0" stroke-width="1.3"/>
    <text x="300" y="602" text-anchor="middle" fill="#2e38a0" font-family="system-ui,sans-serif" font-size="16" font-weight="700" letter-spacing="0.5">Memory · 记忆</text>

    <!-- Working Memory -->
    <g id="working-memory">
      <rect x="78" y="630" width="444" height="140" rx="12" fill="#fff" stroke="#d0d8f8" stroke-width="1"/>
      <text x="300" y="660" text-anchor="middle" fill="#3848b8" font-family="system-ui,sans-serif" font-size="13" font-weight="600">Working Memory</text>
      <!-- Document stack — elegant layered -->
      <rect x="155" y="680" width="44" height="6" rx="2.5" fill="#c0c8f8" class="shimmer"/>
      <rect x="151" y="690" width="52" height="6" rx="2.5" fill="#d0d8ff" class="shimmer" style="animation-delay:0.4s"/>
      <rect x="147" y="700" width="60" height="6" rx="2.5" fill="#e0e4ff" class="shimmer" style="animation-delay:0.8s"/>
      <rect x="143" y="710" width="68" height="6" rx="2.5" fill="#eef0ff" class="shimmer" style="animation-delay:1.2s"/>
      <rect x="139" y="720" width="76" height="6" rx="2.5" fill="#f4f4ff" class="shimmer" style="animation-delay:1.6s"/>
      <text x="300" y="745" text-anchor="middle" fill="#4a4a6a" font-family="system-ui,sans-serif" font-size="11">短期上下文窗口</text>
      <text x="300" y="760" text-anchor="middle" fill="#8888a8" font-family="system-ui,sans-serif" font-size="10">会话历史 · 工具调用记录</text>
    </g>

    <!-- Long-term Memory -->
    <g id="longterm-memory">
      <rect x="78" y="790" width="444" height="140" rx="12" fill="#fff" stroke="#d0d8f8" stroke-width="1"/>
      <text x="300" y="820" text-anchor="middle" fill="#3848b8" font-family="system-ui,sans-serif" font-size="13" font-weight="600">Long-term Memory</text>
      <!-- Database cylinder — clean -->
      <ellipse cx="215" cy="850" rx="20" ry="6" fill="none" stroke="#6080d0" stroke-width="1.8">
        <animate attributeName="stroke-opacity" values="1;0.3;1" dur="4s" repeatCount="indefinite"/>
      </ellipse>
      <line x1="195" y1="850" x2="195" y2="870" stroke="#6080d0" stroke-width="1.8">
        <animate attributeName="stroke-opacity" values="1;0.3;1" dur="4s" repeatCount="indefinite"/>
      </line>
      <line x1="235" y1="850" x2="235" y2="870" stroke="#6080d0" stroke-width="1.8">
        <animate attributeName="stroke-opacity" values="1;0.3;1" dur="4s" repeatCount="indefinite" begin="0.8s"/>
      </line>
      <ellipse cx="215" cy="870" rx="20" ry="6" fill="none" stroke="#6080d0" stroke-width="1.8">
        <animate attributeName="stroke-opacity" values="1;0.3;1" dur="4s" repeatCount="indefinite" begin="1.6s"/>
      </ellipse>
      <ellipse cx="215" cy="860" rx="20" ry="6" fill="none" stroke="#90a8e0" stroke-width="1.2">
        <animate attributeName="stroke-opacity" values="0.8;0.2;0.8" dur="4s" repeatCount="indefinite" begin="2.4s"/>
      </ellipse>
      <text x="300" y="895" text-anchor="middle" fill="#4a4a6a" font-family="system-ui,sans-serif" font-size="11">长期向量知识库</text>
      <text x="300" y="910" text-anchor="middle" fill="#8888a8" font-family="system-ui,sans-serif" font-size="10">RAG · 知识图谱</text>
    </g>
  </g>

  <!-- ── CENTER: Safety ── -->
  <g id="safety-section" class="breathe-slow" style="animation-delay:1s">
    <rect x="575" y="570" width="450" height="430" rx="16" fill="#fff5f5" stroke="#f0b8b8" stroke-width="1.3"/>
    <text x="800" y="602" text-anchor="middle" fill="#882020" font-family="system-ui,sans-serif" font-size="16" font-weight="700" letter-spacing="0.5">Safety Layers · 安全校验</text>

    <!-- 4 Safety Gates — refined icons -->
    <g id="safety-gates">
      <!-- Validate — Shield with checkmark -->
      <rect x="600" y="630" width="96" height="80" rx="10" stroke="#f08080" stroke-width="1.3" class="flash-a"/>
      <path d="M 648 648 L 632 654 L 632 674 Q 632 688 648 696 Q 664 688 664 674 L 664 654 Z" fill="none" stroke="#dc2626" stroke-width="2" stroke-linejoin="round"/>
      <polyline points="639,666 645,674 658,658" fill="none" stroke="#dc2626" stroke-width="2.2" stroke-linecap="round" stroke-linejoin="round"/>
      <text x="648" y="702" text-anchor="middle" fill="#882020" font-family="system-ui,sans-serif" font-size="10" font-weight="600">Validate</text>
      <text x="648" y="716" text-anchor="middle" fill="#8888a8" font-family="system-ui,sans-serif" font-size="9">输入校验</text>
      <line x1="696" y1="670" x2="714" y2="670" stroke="#cbd5e1" stroke-width="1.5" stroke-dasharray="4,3" class="flow-line" marker-end="url(#arrLt)"/>

      <!-- Scope — Padlock -->
      <rect x="720" y="630" width="96" height="80" rx="10" stroke="#f0a060" stroke-width="1.3" class="flash-b"/>
      <rect x="752" y="662" width="22" height="18" rx="4" fill="none" stroke="#d97706" stroke-width="2"/>
      <path d="M 757 662 L 757 652 Q 757 644 763 644 Q 769 644 769 652 L 769 662" fill="none" stroke="#d97706" stroke-width="2" stroke-linecap="round"/>
      <circle cx="763" cy="670" r="2.5" fill="#d97706"/>
      <text x="768" y="702" text-anchor="middle" fill="#885010" font-family="system-ui,sans-serif" font-size="10" font-weight="600">Scope</text>
      <text x="768" y="716" text-anchor="middle" fill="#8888a8" font-family="system-ui,sans-serif" font-size="9">权限范围</text>
      <line x1="816" y1="670" x2="834" y2="670" stroke="#cbd5e1" stroke-width="1.5" stroke-dasharray="4,3" class="flow-line" style="animation-delay:0.6s" marker-end="url(#arrLt)"/>

      <!-- Budget — Stack of coins -->
      <rect x="840" y="630" width="96" height="80" rx="10" stroke="#e0c840" stroke-width="1.3" class="flash-c"/>
      <ellipse cx="876" cy="654" rx="15" ry="5" fill="none" stroke="#b8a020" stroke-width="2"/>
      <ellipse cx="882" cy="662" rx="15" ry="5" fill="none" stroke="#b8a020" stroke-width="2"/>
      <ellipse cx="876" cy="670" rx="15" ry="5" fill="none" stroke="#b8a020" stroke-width="2"/>
      <text x="888" y="702" text-anchor="middle" fill="#886810" font-family="system-ui,sans-serif" font-size="10" font-weight="600">Budget</text>
      <text x="888" y="716" text-anchor="middle" fill="#8888a8" font-family="system-ui,sans-serif" font-size="9">成本限速</text>
      <line x1="936" y1="670" x2="954" y2="670" stroke="#cbd5e1" stroke-width="1.5" stroke-dasharray="4,3" class="flow-line" style="animation-delay:1.2s" marker-end="url(#arrLt)"/>

      <!-- Allow — Checkmark in circle -->
      <rect x="960" y="630" width="80" height="80" rx="10" stroke="#80e0a0" stroke-width="1.3" class="flash-d"/>
      <circle cx="1000" cy="664" r="16" fill="none" stroke="#16a34a" stroke-width="2"/>
      <polyline points="991,664 997,672 1010,656" fill="none" stroke="#16a34a" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round"/>
      <text x="1000" y="702" text-anchor="middle" fill="#106030" font-family="system-ui,sans-serif" font-size="10" font-weight="600">Allow</text>
    </g>

    <!-- Pass → -->
    <path d="M 1040 670 L 1060 670 Q 1068 670 1068 680 L 1068 770" fill="none" stroke="#22c55e" stroke-width="1.5" stroke-dasharray="6,4" class="flow-line" style="animation-delay:1.5s" marker-end="url(#arrGrn)"/>
    <circle r="4" fill="#22c55e" opacity="0.8">
      <animateMotion dur="4s" repeatCount="indefinite" path="M 1040 670 L 1060 670 Q 1068 670 1068 680 L 1068 770"/>
    </circle>
    <text x="1052" y="715" fill="#22c55e" font-family="system-ui,sans-serif" font-size="9" font-weight="600">通过</text>

    <!-- Reject -->
    <path d="M 725 710 L 725 775 Q 725 790 742 790 L 800 790" fill="none" stroke="#ef4444" stroke-width="1.5" stroke-dasharray="5,3" class="flow-line" style="animation-delay:0.5s" marker-end="url(#arrRed)"/>
    <text x="740" y="745" fill="#ef4444" font-family="system-ui,sans-serif" font-size="9" font-weight="600">拒绝</text>

    <!-- Reject + Replan -->
    <g id="reject-box" class="reject-pulse">
      <rect x="600" y="795" width="340" height="55" rx="10" fill="#fff5f5" stroke="#f08080" stroke-width="1"/>
      <text x="770" y="820" text-anchor="middle" fill="#dc2626" font-family="system-ui,sans-serif" font-size="12" font-weight="600">↻ Reject + Replan</text>
      <text x="770" y="838" text-anchor="middle" fill="#8888a8" font-family="system-ui,sans-serif" font-size="10">拒绝并重新规划，回流至 Think</text>
    </g>

    <!-- Pass indicator -->
    <g id="pass-indicator">
      <rect x="1050" y="860" width="100" height="32" rx="7" fill="#e8fff0" stroke="#86efac" stroke-width="1"/>
      <text x="1100" y="880" text-anchor="middle" fill="#15803d" font-family="system-ui,sans-serif" font-size="11" font-weight="600">→ 调度分发</text>
    </g>
  </g>

  <!-- ── RIGHT: Tools ── -->
  <g id="tools-section" class="breathe-slow" style="animation-delay:1.5s">
    <rect x="1050" y="570" width="500" height="430" rx="16" fill="#fffbf0" stroke="#f0d880" stroke-width="1.3"/>
    <text x="1300" y="602" text-anchor="middle" fill="#886810" font-family="system-ui,sans-serif" font-size="16" font-weight="700" letter-spacing="0.5">Tool Execution · 工具执行</text>

    <!-- Tool Types — wrench icon -->
    <g id="tool-types" class="tool-pulse">
      <rect x="1078" y="635" width="444" height="100" rx="12" fill="#fff" stroke="#f0d880" stroke-width="1"/>
      <text x="1300" y="665" text-anchor="middle" fill="#907010" font-family="system-ui,sans-serif" font-size="13" font-weight="600">Tool Types · 工具类型</text>
      <g transform="translate(1145, 700)">
        <rect x="-7" y="-11" width="14" height="16" rx="3" fill="none" stroke="#b89010" stroke-width="1.8"/>
        <circle cx="0" cy="0" r="5" fill="none" stroke="#b89010" stroke-width="1.8"/>
        <line x1="-7" y1="-11" x2="-11" y2="-15" stroke="#b89010" stroke-width="1.8" stroke-linecap="round"/>
        <line x1="7"  y1="-11" x2="11"  y2="-15" stroke="#b89010" stroke-width="1.8" stroke-linecap="round"/>
        <line x1="-7" y1="5"   x2="-11" y2="9"   stroke="#b89010" stroke-width="1.8" stroke-linecap="round"/>
        <line x1="7"  y1="5"   x2="11"  y2="9"   stroke="#b89010" stroke-width="1.8" stroke-linecap="round"/>
      </g>
      <text x="1300" y="700" text-anchor="middle" fill="#4a4a6a" font-family="system-ui,sans-serif" font-size="10">Bash · API · 文件读写 · 浏览器 · MCP</text>
      <text x="1300" y="716" text-anchor="middle" fill="#8888a8" font-family="system-ui,sans-serif" font-size="9">函数调用 · 插件系统 · 自定义工具</text>
    </g>

    <!-- Dispatch — compass icon -->
    <g id="dispatch-box" class="tool-pulse">
      <rect x="1078" y="755" width="444" height="100" rx="12" fill="#fff" stroke="#f0d880" stroke-width="1"/>
      <text x="1300" y="785" text-anchor="middle" fill="#907010" font-family="system-ui,sans-serif" font-size="13" font-weight="600">Dispatch · 调度分发</text>
      <g transform="translate(1145, 820)" class="send-pulse">
        <circle cx="0" cy="0" r="12" fill="none" stroke="#b89010" stroke-width="1.8"/>
        <line x1="0" y1="-12" x2="0" y2="-6" stroke="#b89010" stroke-width="1.8" stroke-linecap="round"/>
        <line x1="0" y1="-12" x2="-4" y2="-7" stroke="#b89010" stroke-width="1.8" stroke-linecap="round"/>
        <line x1="0" y1="-12" x2="4"  y2="-7" stroke="#b89010" stroke-width="1.8" stroke-linecap="round"/>
        <line x1="0" y1="0" x2="0" y2="12" stroke="#b89010" stroke-width="1.5" stroke-linecap="round"/>
        <line x1="0" y1="0" x2="-4" y2="4" stroke="#b89010" stroke-width="1.5" stroke-linecap="round"/>
        <line x1="0" y1="0" x2="4" y2="4" stroke="#b89010" stroke-width="1.5" stroke-linecap="round"/>
      </g>
      <text x="1300" y="820" text-anchor="middle" fill="#4a4a6a" font-family="system-ui,sans-serif" font-size="10">并行调度 · 超时重试 · 结果聚合</text>
      <text x="1300" y="836" text-anchor="middle" fill="#8888a8" font-family="system-ui,sans-serif" font-size="9">限流 · 降级 · 熔断</text>
    </g>

    <!-- Return Result — reply arrow -->
    <g id="return-box" class="tool-pulse" style="animation-delay:1.2s">
      <rect x="1078" y="875" width="444" height="100" rx="12" fill="#fff" stroke="#f0d880" stroke-width="1"/>
      <text x="1300" y="905" text-anchor="middle" fill="#907010" font-family="system-ui,sans-serif" font-size="13" font-weight="600">Return Result · 结果回传</text>
      <g transform="translate(1145, 940)" class="send-pulse" style="animation-delay:1s">
        <path d="M 16 10 Q -8 10 -8 -2 L -12 -2 L -8 4 L -8 -8" fill="none" stroke="#b89010" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round"/>
        <line x1="-12" y1="-2" x2="-12" y2="10" stroke="#b89010" stroke-width="1.8" stroke-linecap="round"/>
      </g>
      <text x="1300" y="940" text-anchor="middle" fill="#4a4a6a" font-family="system-ui,sans-serif" font-size="10">结果解析 · 格式化 · 输入 Observe</text>
      <text x="1300" y="956" text-anchor="middle" fill="#8888a8" font-family="system-ui,sans-serif" font-size="9">结构化输出 · 错误码映射</text>
    </g>
  </g>
</svg>
`;

async function main() {
  console.log('Agent Loop — Premium Flat PPT Style\n');

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
