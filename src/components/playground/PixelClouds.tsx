import { useRef, useEffect } from 'react';

// Cloud sprites — outlined: 0=transparent, 1=black, 2=white
const CLOUD_SPRITES: number[][][] = [
  // Cloud 1 — wide fluffy
  [
    [0,0,0,0,0,0,1,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,1,2,2,2,2,1,0,0,0,1,1,1,0,0,0,0,0,0,0],
    [0,0,0,1,1,2,2,2,2,2,2,1,1,1,2,2,2,1,0,0,0,0,0,0],
    [0,0,1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1,0,0,0,0,0],
    [0,1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1,0,0,0,0],
    [1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1,0,0,0],
    [1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1,0,0],
    [0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0],
  ],
  // Cloud 2 — small puff
  [
    [0,0,0,0,1,1,1,0,0,0,0,0,0,0],
    [0,0,0,1,2,2,2,1,0,0,0,0,0,0],
    [0,0,1,2,2,2,2,2,1,1,1,0,0,0],
    [0,1,2,2,2,2,2,2,2,2,2,1,0,0],
    [1,2,2,2,2,2,2,2,2,2,2,2,1,0],
    [1,2,2,2,2,2,2,2,2,2,2,2,2,1],
    [0,1,1,1,1,1,1,1,1,1,1,1,1,0],
  ],
  // Cloud 3 — medium double-bump
  [
    [0,0,0,0,0,1,1,1,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,1,2,2,2,1,0,0,0,1,1,0,0,0,0],
    [0,0,0,1,2,2,2,2,2,1,0,1,2,2,1,0,0,0],
    [0,0,1,2,2,2,2,2,2,2,1,2,2,2,2,1,0,0],
    [0,1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1,0],
    [1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1],
    [0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
  ],
  // Cloud 4 — large billowing
  [
    [0,0,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
    [0,0,0,0,0,0,0,1,2,2,2,1,0,0,0,0,0,0,1,1,1,1,0,0,0,0,0,0],
    [0,0,0,0,1,1,1,2,2,2,2,2,1,0,0,0,0,1,2,2,2,2,1,0,0,0,0,0],
    [0,0,0,1,2,2,2,2,2,2,2,2,2,1,0,0,1,2,2,2,2,2,2,1,0,0,0,0],
    [0,0,1,2,2,2,2,2,2,2,2,2,2,2,1,1,2,2,2,2,2,2,2,2,1,0,0,0],
    [0,1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1,0,0],
    [1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1,0],
    [1,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,2,1],
    [0,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,0],
  ],
];

// Pseudo-random function for deterministic noise
function pseudoRandom(x: number) {
  return ((Math.sin(x * 12.9898 + 78.233) * 43758.5453) % 1 + 1) % 1;
}

// 1D Value Noise
function noise(x: number) {
  const i = Math.floor(x);
  const f = x - i;
  // Smoothstep interpolation
  const u = f * f * (3 - 2 * f);
  return (1 - u) * pseudoRandom(i) + u * pseudoRandom(i + 1);
}

// Fractal Brownian Motion
function fbm(x: number, octaves: number) {
  let total = 0;
  let frequency = 1;
  let amplitude = 1;
  let maxValue = 0;
  for (let i = 0; i < octaves; i++) {
    total += noise(x * frequency) * amplitude;
    maxValue += amplitude;
    amplitude *= 0.5;
    frequency *= 2;
  }
  return total / maxValue;
}

// Generate a mountain layer using noise for a more natural, less pointy look
function generateMountainLayer(
  totalWidth: number,
  totalHeight: number,
  seed: number,
  baseLevel: number,
  scale: number = 3.0
): number[] {
  const heights = new Float32Array(totalWidth);

  for (let x = 0; x < totalWidth; x++) {
    // Map x to noise coordinate space
    const nx = (x / totalWidth) * scale + seed;
    
    // Base noise shape
    let n = fbm(nx, 6);
    
    // Make mountains steeper/more dramatic by squaring, but keep tops somewhat rounded
    // To avoid "pointy" spires, we don't use high powers. 
    // Squaring (n*n) makes valleys wider and peaks steeper.
    // Let's stick to n^1.5 or just n for broader mountains.
    // The user said "too pointy", so maybe just raw FBM or n^1.2
    n = Math.pow(n, 1.2);

    const h = baseLevel + (totalHeight * 0.8) * n;
    
    // Add extra pixel-level roughness
    const jagged = (Math.random() - 0.5) * 2;
    
    heights[x] = Math.floor(h + jagged);
  }

  return Array.from(heights);
}

interface Cloud {
  sprite: number;
  x: number;
  y: number;
  speed: number;
}

export function PixelClouds() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const cloudsRef = useRef<Cloud[]>([]);
  const animRef = useRef<number>(0);
  const farMountainsRef = useRef<number[]>([]);
  const nearMountainsRef = useRef<number[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const PX = 4;

    const resize = () => {
      canvas.width = Math.floor(window.innerWidth / PX);
      canvas.height = Math.floor(window.innerHeight / PX);

      const cw = canvas.width;
      const ch = canvas.height;

      // Far mountains — taller dramatic peaks (rendered with dither for depth)
      // Use lower frequency noise (scale 3.0) for massive background mountains
      farMountainsRef.current = generateMountainLayer(
        cw, 
        ch, 
        123.45, // Seed
        ch * 0.2, // Base level
        2.5 // Scale - wider mountains
      );

      // Near mountains — shorter, solid black, in front
      // Use higher frequency noise (scale 5.0) for closer hills
      nearMountainsRef.current = generateMountainLayer(
        cw, 
        ch, 
        678.90, // Seed
        ch * 0.1, // Base level
        4.0 // Scale
      );

      initClouds();
    };

    const initClouds = () => {
      const w = canvas.width;
      const h = canvas.height;
      cloudsRef.current = [];
      for (let i = 0; i < 6; i++) {
        cloudsRef.current.push({
          sprite: Math.floor(Math.random() * CLOUD_SPRITES.length),
          x: Math.random() * (w + 60) - 30,
          y: 3 + Math.floor(Math.random() * (h * 0.30)),
          speed: 0.04 + Math.random() * 0.10,
        });
      }
    };

    resize();
    window.addEventListener('resize', resize);

    const ctx = canvas.getContext('2d')!;

    const draw = () => {
      const cw = canvas.width;
      const ch = canvas.height;
      ctx.clearRect(0, 0, cw, ch);

      const farH = farMountainsRef.current;
      const nearH = nearMountainsRef.current;

      // ── Far mountains: dither pattern (checkerboard) for lighter shade ──
      if (farH.length > 0) {
        const imageData = ctx.createImageData(cw, ch);
        const data = imageData.data;

        for (let x = 0; x < cw; x++) {
          const h = farH[x] || 0;
          if (h <= 0) continue;
          const startY = ch - h;

          for (let y = startY; y < ch; y++) {
            // Checkerboard dither — only draw every other pixel
            if ((x + y) % 2 === 0) {
              const idx = (y * cw + x) * 4;
              data[idx] = 0;
              data[idx + 1] = 0;
              data[idx + 2] = 0;
              data[idx + 3] = 255;
            }
          }
        }

        // Snow caps on far peaks
        for (let x = 1; x < cw - 1; x++) {
          const h = farH[x] || 0;
          const hL = farH[x - 1] || 0;
          const hR = farH[x + 1] || 0;
          if (h > ch * 0.55 && h >= hL && h >= hR) {
            // White snow cap (full pixel, not dithered)
            for (let dy = 0; dy < Math.min(3, h); dy++) {
              const py = ch - h + dy;
              const spread = dy; // wider as we go down
              for (let dx = -spread; dx <= spread; dx++) {
                const px = x + dx;
                if (px >= 0 && px < cw && py >= 0 && py < ch) {
                  const idx = (py * cw + px) * 4;
                  data[idx] = 255;
                  data[idx + 1] = 255;
                  data[idx + 2] = 255;
                  data[idx + 3] = 255;
                }
              }
            }
          }
        }

        ctx.putImageData(imageData, 0, 0);
      }

      // ── Near mountains: solid black ──
      if (nearH.length > 0) {
        ctx.fillStyle = '#000';
        for (let x = 0; x < cw; x++) {
          const h = nearH[x] || 0;
          if (h > 0) {
            ctx.fillRect(x, ch - h, 1, h);
          }
        }

        // Snow highlights on near peaks
        ctx.fillStyle = '#FFF';
        for (let x = 1; x < cw - 1; x++) {
          const h = nearH[x] || 0;
          const hL = nearH[x - 1] || 0;
          const hR = nearH[x + 1] || 0;
          if (h > ch * 0.35 && h >= hL && h >= hR) {
            ctx.fillRect(x, ch - h, 1, 1);
            if (h > ch * 0.42) {
              ctx.fillRect(x, ch - h + 1, 1, 1);
              ctx.fillRect(x - 1, ch - h + 1, 1, 1);
              ctx.fillRect(x + 1, ch - h + 1, 1, 1);
            }
          }
        }

        // Ridge highlights on left slopes of near mountains
        ctx.fillStyle = '#FFF';
        for (let x = 2; x < cw - 1; x++) {
          const h = nearH[x] || 0;
          const hPrev = nearH[x - 1] || 0;
          if (h > hPrev + 1 && h > ch * 0.2) {
            const ridgeY = ch - h + Math.floor(h * 0.35);
            if (x % 3 === 0) {
              ctx.fillRect(x, ridgeY, 1, 1);
            }
          }
        }
      }

      // ── Ground plateau at the bottom ──
      ctx.fillStyle = '#000';
      const groundH = Math.floor(ch * 0.06);
      ctx.fillRect(0, ch - groundH, cw, groundH);

      // ── Clouds ──
      for (const cloud of cloudsRef.current) {
        const sprite = CLOUD_SPRITES[cloud.sprite];

        for (let row = 0; row < sprite.length; row++) {
          for (let col = 0; col < sprite[row].length; col++) {
            const pixel = sprite[row][col];
            if (pixel === 1) {
              ctx.fillStyle = '#000000';
              ctx.fillRect(Math.floor(cloud.x) + col, Math.floor(cloud.y) + row, 1, 1);
            } else if (pixel === 2) {
              ctx.fillStyle = '#FFFFFF';
              ctx.fillRect(Math.floor(cloud.x) + col, Math.floor(cloud.y) + row, 1, 1);
            }
          }
        }

        cloud.x += cloud.speed;

        const spriteW = sprite[0].length;
        if (cloud.x > cw + 5) {
          cloud.x = -spriteW - 5;
          cloud.y = 3 + Math.floor(Math.random() * (ch * 0.25));
        }
      }

      animRef.current = requestAnimationFrame(draw);
    };

    animRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener('resize', resize);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        imageRendering: 'pixelated',
        pointerEvents: 'none',
      }}
    />
  );
}
