/**
 * Example: Basic SVG path stroke animation
 *
 * This demonstrates a classic "draw-on" effect where a path
 * appears to be drawn progressively.
 */

import { SVGAnimationPipeline } from '../src/pipeline';
import { ProgressInfo } from '../src/types';

// Create SVG with a stroke animation
const svgContent = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 200" width="800" height="400">
  <defs>
    <style>
      .stroke-path {
        fill: none;
        stroke: #3498db;
        stroke-width: 4;
        stroke-linecap: round;
        stroke-linejoin: round;
        stroke-dasharray: 1000;
        stroke-dashoffset: 1000;
      }
    </style>
  </defs>

  <!-- Background -->
  <rect width="100%" height="100%" fill="#1a1a2e"/>

  <!-- Layer 1: Title text -->
  <text x="200" y="60" text-anchor="middle" fill="#ffffff" font-family="Arial" font-size="24" font-weight="bold">
    SVG Animation
  </text>

  <!-- Layer 2: The animated path -->
  <g id="stroke-layer">
    <path class="stroke-path" d="M 50 150 Q 100 50 200 100 T 350 150"/>

    <!-- Second path -->
    <path class="stroke-path" d="M 50 120 Q 150 80 200 120 T 350 120"
          style="stroke: #e74c3c; animation-delay: 0.5s;"/>
  </g>

  <!-- Layer 3: Fill animation overlay -->
  <g id="fill-layer" opacity="0">
    <circle cx="50" cy="150" r="8" fill="#3498db"/>
    <circle cx="350" cy="150" r="8" fill="#e74c3c"/>
  </g>
</svg>
`;

async function main() {
  console.log('Starting basic path animation example...\n');

  const pipeline = new SVGAnimationPipeline({
    input: svgContent, // Can be file path or SVG content
    output: './output/basic-path.gif',
    fps: 30,
    duration: 3000, // 3 seconds
    width: 800,
    height: 400,
    background: '#1a1a2e',
    quality: 'high',
  });

  // Add stroke-dashoffset animation
  pipeline.addAnimation({
    targets: '.stroke-path',
    keyframes: [
      { time: 0, properties: { strokeDashoffset: 1000, opacity: 1 } },
      { time: 1500, properties: { strokeDashoffset: 0 } },
      { time: 3000, properties: { strokeDashoffset: 0 } },
    ],
    easing: 'easeInOutQuad',
  });

  // Add fill layer fade in
  pipeline.addAnimation({
    targets: '#fill-layer',
    keyframes: [
      { time: 1500, properties: { opacity: 0 } },
      { time: 2000, properties: { opacity: 1 } },
      { time: 3000, properties: { opacity: 1 } },
    ],
    easing: 'easeOutQuad',
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
