/**
 * Example: Layered scene animation
 *
 * This demonstrates animating multiple layers with different timings,
 * creating a parallax-like effect.
 */

import { SVGAnimationPipeline, timeline } from '../src/pipeline';
import { ProgressInfo } from '../src/types';

const svgContent = `
<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 800 400" width="800" height="400">
  <!-- Background gradient layer -->
  <g id="background-layer">
    <defs>
      <linearGradient id="sky-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
        <stop offset="0%" style="stop-color:#0c1445;stop-opacity:1" />
        <stop offset="100%" style="stop-color:#4a69bd;stop-opacity:1" />
      </linearGradient>
    </defs>
    <rect width="100%" height="100%" fill="url(#sky-gradient)"/>
  </g>

  <!-- Stars layer (slow parallax) -->
  <g id="stars-layer">
    <circle cx="100" cy="80" r="1.5" fill="#ffffff" opacity="0.8"/>
    <circle cx="200" cy="120" r="1" fill="#ffffff" opacity="0.6"/>
    <circle cx="350" cy="60" r="2" fill="#ffffff" opacity="0.9"/>
    <circle cx="500" cy="100" r="1.5" fill="#ffffff" opacity="0.7"/>
    <circle cx="650" cy="70" r="1" fill="#ffffff" opacity="0.5"/>
    <circle cx="750" cy="130" r="1.5" fill="#ffffff" opacity="0.8"/>
  </g>

  <!-- Mountains layer (medium parallax) -->
  <g id="mountains-layer">
    <polygon points="0,400 150,250 300,400" fill="#1e3c72"/>
    <polygon points="200,400 400,200 600,400" fill="#1e3799"/>
    <polygon points="500,400 650,280 800,400" fill="#1e3c72"/>
  </g>

  <!-- Trees layer (fast parallax) -->
  <g id="trees-layer">
    <polygon points="50,400 70,320 90,400" fill="#0d501c"/>
    <polygon points="150,400 180,280 210,400" fill="#0a3d15"/>
    <polygon points="300,400 320,340 340,400" fill="#0d501c"/>
    <polygon points="500,400 540,250 580,400" fill="#0a3d15"/>
    <polygon points="700,400 730,300 760,400" fill="#0d501c"/>
  </g>

  <!-- Foreground grass -->
  <g id="grass-layer">
    <rect x="0" y="370" width="800" height="30" fill="#27ae60"/>
  </g>

  <!-- Title text -->
  <g id="title-layer" opacity="0">
    <text x="400" y="200" text-anchor="middle" fill="#ffffff" font-family="Georgia" font-size="48" font-weight="bold">
      Parallax World
    </text>
  </g>
</svg>
`;

async function main() {
  console.log('Starting layered scene example...\n');

  const pipeline = new SVGAnimationPipeline({
    input: svgContent,
    output: './output/layered-scene.gif',
    fps: 30,
    duration: 5000,
    width: 800,
    height: 400,
    background: '#0c1445',
    quality: 'high',
  });

  // Stars layer - slow horizontal movement (left)
  pipeline.addAnimation({
    targets: '#stars-layer',
    keyframes: [
      { time: 0, properties: { transform: { translate: [0, 0] } } },
      { time: 5000, properties: { transform: { translate: [-50, 0] } } },
    ],
    easing: 'linear',
  });

  // Mountains layer - medium horizontal movement (left)
  pipeline.addAnimation({
    targets: '#mountains-layer',
    keyframes: [
      { time: 0, properties: { transform: { translate: [0, 0] } } },
      { time: 5000, properties: { transform: { translate: [-100, 0] } } },
    ],
    easing: 'linear',
  });

  // Trees layer - fast horizontal movement (left)
  pipeline.addAnimation({
    targets: '#trees-layer',
    keyframes: [
      { time: 0, properties: { transform: { translate: [0, 0] } } },
      { time: 5000, properties: { transform: { translate: [-200, 0] } } },
    ],
    easing: 'linear',
  });

  // Title fade in with scale
  pipeline.addAnimation({
    targets: '#title-layer',
    keyframes: [
      { time: 0, properties: { opacity: 0, transform: { scale: 0.8 } } },
      { time: 1500, properties: { opacity: 1, transform: { scale: 1 } } },
      { time: 3500, properties: { opacity: 1, transform: { scale: 1 } } },
      { time: 5000, properties: { opacity: 0, transform: { scale: 1.1 } } },
    ],
    easing: 'easeInOutQuad',
  });

  // Grass subtle bounce
  pipeline.addAnimation({
    targets: '#grass-layer',
    keyframes: [
      { time: 0, properties: { transform: { translate: [0, 0] } } },
      { time: 250, properties: { transform: { translate: [0, -5] } } },
      { time: 500, properties: { transform: { translate: [0, 0] } } },
      { time: 750, properties: { transform: { translate: [0, -3] } } },
      { time: 1000, properties: { transform: { translate: [0, 0] } } },
    ],
    easing: 'easeOutQuad',
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
