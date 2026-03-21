import { useRef, useEffect } from 'react';

interface Star {
  x: number;
  y: number;
  brightness: number;
  twinkleSpeed: number;
  twinkleOffset: number;
  size: number;
}

interface ShootingStar {
  x: number;
  y: number;
  vx: number;
  vy: number;
  length: number;
  life: number;
  maxLife: number;
}

type ShipPhase = 'sparkle-in' | 'hovering' | 'sparkle-out' | 'done';

interface Spaceship {
  x: number;
  y: number;
  baseY: number;
  phase: ShipPhase;
  phaseTime: number;
  hoverDuration: number;
  sparkleRadius: number;
  bobOffset: number;
}

// UFO saucer sprite (9x5) — 0=transparent, brightness values 1-255
// Dome + wide body + windows, soft shading (no solid grays)
const UFO_SPRITE = [
  [0,  0,  0, 90,120, 90,  0,  0,  0],
  [0,  0, 90,150,255,150, 90,  0,  0],
  [0,120,200,200,180,200,200,120,  0],
  [80,180, 50,180, 50,180, 50,180, 80],
  [0,  0, 80,100,120,100, 80,  0,  0],
];

const UFO_W = UFO_SPRITE[0].length;
const UFO_H = UFO_SPRITE.length;

export function PixelGalaxy() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const starsRef = useRef<Star[]>([]);
  const shootingStarsRef = useRef<ShootingStar[]>([]);
  const shipRef = useRef<Spaceship | null>(null);
  const animRef = useRef(0);
  const timeRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const PX = 4;

    const initScene = () => {
      canvas.width = Math.floor(window.innerWidth / PX);
      canvas.height = Math.floor(window.innerHeight / PX);
      const cw = canvas.width;
      const ch = canvas.height;

      const stars: Star[] = [];
      const starCount = Math.floor((cw * ch) / 60);
      for (let i = 0; i < starCount; i++) {
        stars.push({
          x: Math.floor(Math.random() * cw),
          y: Math.floor(Math.random() * ch),
          brightness: 0.3 + Math.random() * 0.7,
          twinkleSpeed: 0.5 + Math.random() * 2,
          twinkleOffset: Math.random() * Math.PI * 2,
          size: Math.random() < 0.08 ? 2 : 1,
        });
      }
      starsRef.current = stars;
      shootingStarsRef.current = [];
    };

    initScene();
    window.addEventListener('resize', initScene);

    const ctx = canvas.getContext('2d')!;

    const spawnShootingStar = (cw: number, ch: number) => {
      const angle = (Math.PI / 6) + Math.random() * (Math.PI / 4);
      const speed = 1.5 + Math.random() * 2;
      shootingStarsRef.current.push({
        x: Math.floor(Math.random() * cw * 0.8),
        y: Math.floor(Math.random() * ch * 0.4),
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        length: 4 + Math.floor(Math.random() * 6),
        life: 0,
        maxLife: 30 + Math.floor(Math.random() * 40),
      });
    };

    const spawnShip = (cw: number, ch: number) => {
      const margin = 20;
      const x = margin + Math.floor(Math.random() * (cw - margin * 2));
      const y = margin + Math.floor(Math.random() * (ch - margin * 2));
      shipRef.current = {
        x,
        y,
        baseY: y,
        phase: 'sparkle-in',
        phaseTime: 0,
        hoverDuration: 180 + Math.floor(Math.random() * 200),
        sparkleRadius: 0,
        bobOffset: Math.random() * Math.PI * 2,
      };
    };

    const drawSparkle = (
      data: Uint8ClampedArray,
      cw: number,
      ch: number,
      cx: number,
      cy: number,
      radius: number,
      brightness: number,
    ) => {
      const b = Math.floor(brightness * 255);
      if (b < 10) return;

      const setPixel = (px: number, py: number, val: number) => {
        if (px < 0 || px >= cw || py < 0 || py >= ch) return;
        const idx = (py * cw + px) * 4;
        data[idx] = Math.max(data[idx], val);
        data[idx + 1] = Math.max(data[idx + 1], val);
        data[idx + 2] = Math.max(data[idx + 2], val);
        data[idx + 3] = 255;
      };

      setPixel(Math.floor(cx), Math.floor(cy), b);

      const r = Math.floor(radius);
      for (let i = 1; i <= r; i++) {
        const fade = Math.floor(b * (1 - i / (r + 1)));
        setPixel(Math.floor(cx) - i, Math.floor(cy), fade);
        setPixel(Math.floor(cx) + i, Math.floor(cy), fade);
        setPixel(Math.floor(cx), Math.floor(cy) - i, fade);
        setPixel(Math.floor(cx), Math.floor(cy) + i, fade);
      }

      const dr = Math.floor(radius * 0.5);
      for (let i = 1; i <= dr; i++) {
        const fade = Math.floor(b * 0.6 * (1 - i / (dr + 1)));
        setPixel(Math.floor(cx) - i, Math.floor(cy) - i, fade);
        setPixel(Math.floor(cx) + i, Math.floor(cy) - i, fade);
        setPixel(Math.floor(cx) - i, Math.floor(cy) + i, fade);
        setPixel(Math.floor(cx) + i, Math.floor(cy) + i, fade);
      }
    };

    const drawUFO = (
      data: Uint8ClampedArray,
      cw: number,
      ch: number,
      sx: number,
      sy: number,
      opacity: number,
    ) => {
      const ox = Math.floor(sx) - Math.floor(UFO_W / 2);
      const oy = Math.floor(sy) - Math.floor(UFO_H / 2);
      for (let row = 0; row < UFO_H; row++) {
        for (let col = 0; col < UFO_W; col++) {
          const b = UFO_SPRITE[row][col];
          if (b === 0) continue;
          const px = ox + col;
          const py = oy + row;
          if (px < 0 || px >= cw || py < 0 || py >= ch) continue;
          const idx = (py * cw + px) * 4;
          const val = Math.floor(b * opacity);
          data[idx] = Math.max(data[idx], val);
          data[idx + 1] = Math.max(data[idx + 1], val);
          data[idx + 2] = Math.max(data[idx + 2], val);
          data[idx + 3] = 255;
        }
      }
    };

    const SPARKLE_DURATION = 50;

    const draw = () => {
      const cw = canvas.width;
      const ch = canvas.height;
      timeRef.current += 0.016;
      const t = timeRef.current;

      const imageData = ctx.createImageData(cw, ch);
      const data = imageData.data;

      // Stars
      for (const star of starsRef.current) {
        const twinkle = 0.5 + 0.5 * Math.sin(t * star.twinkleSpeed + star.twinkleOffset);
        const b = Math.floor(star.brightness * twinkle * 255);
        if (b < 30) continue;

        const idx = (star.y * cw + star.x) * 4;
        data[idx] = b;
        data[idx + 1] = b;
        data[idx + 2] = b;
        data[idx + 3] = 255;

        if (star.size === 2 && b > 100) {
          const neighbors = [
            [star.x - 1, star.y],
            [star.x + 1, star.y],
            [star.x, star.y - 1],
            [star.x, star.y + 1],
          ];
          const dimB = Math.floor(b * 0.4);
          for (const [nx, ny] of neighbors) {
            if (nx >= 0 && nx < cw && ny >= 0 && ny < ch) {
              const ni = (ny * cw + nx) * 4;
              data[ni] = Math.max(data[ni], dimB);
              data[ni + 1] = Math.max(data[ni + 1], dimB);
              data[ni + 2] = Math.max(data[ni + 2], dimB);
              data[ni + 3] = 255;
            }
          }
        }
      }

      // Shooting stars
      for (const ss of shootingStarsRef.current) {
        const progress = ss.life / ss.maxLife;
        const alpha = progress < 0.2
          ? progress / 0.2
          : 1 - (progress - 0.2) / 0.8;
        const b = Math.floor(alpha * 255);

        for (let i = 0; i < ss.length; i++) {
          const trailFade = 1 - i / ss.length;
          const px = Math.floor(ss.x - ss.vx * i * 0.5);
          const py = Math.floor(ss.y - ss.vy * i * 0.5);
          if (px >= 0 && px < cw && py >= 0 && py < ch) {
            const idx = (py * cw + px) * 4;
            const val = Math.floor(b * trailFade);
            data[idx] = Math.max(data[idx], val);
            data[idx + 1] = Math.max(data[idx + 1], val);
            data[idx + 2] = Math.max(data[idx + 2], val);
            data[idx + 3] = 255;
          }
        }

        ss.x += ss.vx;
        ss.y += ss.vy;
        ss.life++;
      }

      shootingStarsRef.current = shootingStarsRef.current.filter(
        (ss) => ss.life < ss.maxLife
      );

      if (Math.random() < 0.02) {
        spawnShootingStar(cw, ch);
      }

      // UFO
      const ship = shipRef.current;
      if (ship) {
        ship.phaseTime++;

        if (ship.phase === 'sparkle-in') {
          const p = ship.phaseTime / SPARKLE_DURATION;
          const easedP = 1 - Math.pow(1 - p, 2);
          ship.sparkleRadius = easedP * 10;
          // Brightness: ramp up fast then hold
          const brightness = Math.min(1, p * 2.5);
          drawSparkle(data, cw, ch, ship.x, ship.baseY, ship.sparkleRadius, brightness);

          // Start fading in the UFO in the second half of sparkle
          if (p > 0.5) {
            const ufoOpacity = (p - 0.5) * 2;
            const bobY = ship.baseY + Math.sin(t * 1.5 + ship.bobOffset) * 1.5;
            drawUFO(data, cw, ch, ship.x, bobY, ufoOpacity);
          }

          if (ship.phaseTime >= SPARKLE_DURATION) {
            ship.phase = 'hovering';
            ship.phaseTime = 0;
          }
        } else if (ship.phase === 'hovering') {
          // Gentle bob up and down
          const bobY = ship.baseY + Math.sin(t * 1.5 + ship.bobOffset) * 2;
          drawUFO(data, cw, ch, ship.x, bobY, 1);

          if (ship.phaseTime >= ship.hoverDuration) {
            ship.phase = 'sparkle-out';
            ship.phaseTime = 0;
          }
        } else if (ship.phase === 'sparkle-out') {
          const p = ship.phaseTime / SPARKLE_DURATION;
          // UFO fades out quickly
          const ufoOpacity = Math.max(0, 1 - p * 2);
          if (ufoOpacity > 0) {
            const bobY = ship.baseY + Math.sin(t * 1.5 + ship.bobOffset) * 2;
            drawUFO(data, cw, ch, ship.x, bobY, ufoOpacity);
          }
          // Sparkle grows then shrinks
          const sparkleP = p < 0.4 ? p / 0.4 : (1 - p) / 0.6;
          const easedSparkle = 1 - Math.pow(1 - sparkleP, 2);
          ship.sparkleRadius = easedSparkle * 12;
          drawSparkle(data, cw, ch, ship.x, ship.baseY, ship.sparkleRadius, sparkleP);

          if (ship.phaseTime >= SPARKLE_DURATION) {
            ship.phase = 'done';
          }
        }

        if (ship.phase === 'done') {
          shipRef.current = null;
        }
      }

      // Randomly spawn UFO (rare)
      if (!shipRef.current && Math.random() < 0.002) {
        spawnShip(cw, ch);
      }

      ctx.putImageData(imageData, 0, 0);
      animRef.current = requestAnimationFrame(draw);
    };

    animRef.current = requestAnimationFrame(draw);

    return () => {
      cancelAnimationFrame(animRef.current);
      window.removeEventListener('resize', initScene);
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
