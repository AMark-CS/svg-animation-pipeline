/**
 * Example: Path morphing animation
 *
 * This demonstrates morphing between two SVG paths.
 */

import { SVGAnimationPipeline } from '../src/pipeline';
import { ProgressInfo } from '../src/types';

const svgContent = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 400 400" width="800" height="800">
  <defs>
    <linearGradient id="grad1" x1="0%" y1="0%" x2="100%" y2="100%">
      <stop offset="0%" style="stop-color:#3498db;stop-opacity:1" />
      <stop offset="100%" style="stop-color:#8e44ad;stop-opacity:1" />
    </linearGradient>
  </defs>

  <!-- Background -->
  <rect width="100%" height="100%" fill="#2c3e50"/>

  <!-- Title -->
  <text x="200" y="50" text-anchor="middle" fill="#ecf0f1" font-family="Arial" font-size="20">
    Path Morphing Demo
  </text>

  <!-- Morphing shape -->
  <path id="morph-shape"
        d="M 200 100
           C 280 100 320 160 320 200
           C 320 260 260 320 200 320
           C 140 320 80 260 80 200
           C 80 160 120 100 200 100 Z"
        fill="url(#grad1)"
        stroke="#ffffff"
        stroke-width="2"/>
</svg>
`;

// Path morphs from circle to star
const circlePath = 'M 200 100 C 280 100 320 160 320 200 C 320 260 260 320 200 320 C 140 320 80 260 80 200 C 80 160 120 100 200 100 Z';
const starPath = 'M 200 60 L 230 150 L 330 150 L 250 210 L 280 300 L 200 240 L 120 300 L 150 210 L 70 150 L 170 150 Z';

async function main() {
  console.log('Starting path morphing example...\n');

  const pipeline = new SVGAnimationPipeline({
    input: svgContent,
    output: './output/morph-demo.gif',
    fps: 30,
    duration: 4000,
    width: 800,
    height: 800,
    background: '#2c3e50',
    quality: 'high',
  });

  // Morph animation
  pipeline.addAnimation({
    targets: '#morph-shape',
    keyframes: [
      {
        time: 0,
        properties: {
          d: { start: circlePath, end: circlePath },
        },
      },
      {
        time: 2000,
        properties: {
          d: { start: circlePath, end: starPath },
        },
      },
      {
        time: 4000,
        properties: {
          d: { start: starPath, end: circlePath },
        },
      },
    ],
    easing: 'easeInOutCubic',
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
