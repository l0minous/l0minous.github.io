import { useRef, useEffect } from 'react';
import type { PatternType } from './types';
import { PATTERNS, BRUSH_SIZES } from './constants';

interface PatternPaletteProps {
  activePattern: PatternType;
  onPatternChange: (pattern: PatternType) => void;
  brushSize: number;
  onBrushSizeChange: (size: number) => void;
}

function PatternSwatch({ pattern, isActive, onClick }: { pattern: PatternType; isActive: boolean; onClick: () => void }) {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const data = PATTERNS[pattern];
    const size = data.length;
    const imageData = ctx.createImageData(16, 16);
    for (let y = 0; y < 16; y++) {
      for (let x = 0; x < 16; x++) {
        const i = (y * 16 + x) * 4;
        const val = data[y % size][x % size] ? 0 : 255;
        imageData.data[i] = val;
        imageData.data[i + 1] = val;
        imageData.data[i + 2] = val;
        imageData.data[i + 3] = 255;
      }
    }
    ctx.putImageData(imageData, 0, 0);
  }, [pattern]);

  return (
    <button
      onClick={onClick}
      style={{
        width: '28px',
        height: '28px',
        border: isActive ? '3px solid #000' : '2px solid #000',
        padding: 0,
        cursor: 'pointer',
        backgroundColor: 'transparent',
        flexShrink: 0,
      }}
    >
      <canvas
        ref={canvasRef}
        width={16}
        height={16}
        style={{
          width: '100%',
          height: '100%',
          imageRendering: 'pixelated',
          display: 'block',
        }}
      />
    </button>
  );
}

const patternKeys = Object.keys(PATTERNS) as PatternType[];

export function PatternPalette({ activePattern, onPatternChange, brushSize, onBrushSizeChange }: PatternPaletteProps) {
  return (
    <div
      style={{
        height: '44px',
        backgroundColor: '#FFFFFF',
        borderTop: '2px solid #000000',
        display: 'flex',
        alignItems: 'center',
        padding: '0 8px',
        gap: '3px',
        flexShrink: 0,
        fontFamily: '"Chicago", "Geneva", "Monaco", "Courier New", monospace',
        fontSize: '10px',
        color: '#000000',
      }}
    >
      {patternKeys.map((p) => (
        <PatternSwatch
          key={p}
          pattern={p}
          isActive={activePattern === p}
          onClick={() => onPatternChange(p)}
        />
      ))}

      {/* Separator */}
      <div style={{ width: '2px', height: '28px', backgroundColor: '#000', margin: '0 6px', flexShrink: 0 }} />

      {/* Brush sizes */}
      {BRUSH_SIZES.map((size) => {
        const isActive = brushSize === size;
        return (
          <button
            key={size}
            onClick={() => onBrushSizeChange(size)}
            style={{
              width: '30px',
              height: '30px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              border: isActive ? '3px solid #000' : '2px solid #000',
              backgroundColor: '#FFF',
              cursor: 'pointer',
              padding: 0,
              flexShrink: 0,
            }}
          >
            <div
              style={{
                width: `${Math.min(size + 2, 18)}px`,
                height: `${Math.min(size + 2, 18)}px`,
                backgroundColor: '#000',
                borderRadius: '50%',
              }}
            />
          </button>
        );
      })}
    </div>
  );
}
