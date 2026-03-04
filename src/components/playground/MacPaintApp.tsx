import { useState, useEffect, useRef } from 'react';
import type { ToolType, PatternType } from './types';
import { MenuBar } from './MenuBar';
import { ToolPalette } from './ToolPalette';
import { PatternPalette } from './PatternPalette';
import { Canvas } from './Canvas';
import { PixelClouds } from './PixelClouds';

interface MacPaintAppProps {
  onClose: () => void;
}

export function MacPaintApp({ onClose }: MacPaintAppProps) {
  const [activeTool, setActiveTool] = useState<ToolType>('pencil');
  const [activePattern, setActivePattern] = useState<PatternType>('solid');
  const [brushSize, setBrushSize] = useState(3);
  const mainCanvasRef = useRef<HTMLCanvasElement>(null);

  // Escape key to close
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', handleKey);
    return () => window.removeEventListener('keydown', handleKey);
  }, [onClose]);

  // Lock body scroll
  useEffect(() => {
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = prev; };
  }, []);

  const handleClear = () => {
    const canvas = mainCanvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d')!;
    ctx.fillStyle = '#FFFFFF';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
  };

  const handleSave = () => {
    const canvas = mainCanvasRef.current;
    if (!canvas) return;
    const link = document.createElement('a');
    link.download = 'playground.png';
    link.href = canvas.toDataURL('image/png');
    link.click();
  };

  return (
    <div
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: 100,
        // Checkerboard dither background simulating Mac desktop gray
        background: 'repeating-conic-gradient(#000 0% 25%, #fff 0% 50%) 0 0 / 4px 4px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        fontFamily: '"Press Start 2P", "Chicago", "Geneva", "Monaco", "Courier New", monospace',
        color: '#000000',
        imageRendering: 'pixelated',
      }}
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      {/* Animated pixel clouds behind the window */}
      <PixelClouds />

      {/* The Window */}
      <div
        style={{
          position: 'relative',
          zIndex: 1,
          width: '85vw',
          maxWidth: '1024px',
          height: '82vh',
          maxHeight: '720px',
          backgroundColor: '#FFFFFF',
          border: '3px solid #000000',
          display: 'flex',
          flexDirection: 'column',
          boxShadow: '4px 4px 0px #000000',
        }}
      >
        {/* Title Bar */}
        <div
          style={{
            height: '26px',
            display: 'flex',
            alignItems: 'center',
            borderBottom: '2px solid #000',
            flexShrink: 0,
            position: 'relative',
            overflow: 'hidden',
          }}
        >
          {/* Horizontal stripes background */}
          <div
            style={{
              position: 'absolute',
              inset: 0,
              background: 'repeating-linear-gradient(to bottom, #000 0px, #000 1px, #fff 1px, #fff 3px)',
            }}
          />

          {/* Close box */}
          <button
            onClick={onClose}
            style={{
              position: 'relative',
              zIndex: 1,
              width: '20px',
              height: '20px',
              margin: '0 6px',
              border: '2px solid #000',
              backgroundColor: '#FFF',
              cursor: 'pointer',
              flexShrink: 0,
              padding: 0,
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#000',
            }}
          >
            <svg width="10" height="10" viewBox="0 0 10 10" style={{ display: 'block' }}>
              <line x1="1" y1="1" x2="9" y2="9" stroke="#000" strokeWidth="2" />
              <line x1="9" y1="1" x2="1" y2="9" stroke="#000" strokeWidth="2" />
            </svg>
          </button>

          {/* Title */}
          <div
            style={{
              position: 'relative',
              zIndex: 1,
              margin: '0 auto',
              padding: '2px 16px',
              backgroundColor: '#FFF',
              fontSize: '9px',
              fontWeight: 'bold',
              whiteSpace: 'nowrap',
              lineHeight: '18px',
              border: '1px solid #000',
            }}
          >
            Playground
          </div>

          {/* Spacer for symmetry */}
          <div style={{ width: '34px', flexShrink: 0 }} />
        </div>

        {/* Menu Bar */}
        <MenuBar onClear={handleClear} onSave={handleSave} />

        {/* Main content area */}
        <div style={{ display: 'flex', flex: 1, overflow: 'hidden' }}>
          {/* Tool Palette */}
          <ToolPalette activeTool={activeTool} onToolChange={setActiveTool} />

          {/* Canvas area with inset border */}
          <div style={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            overflow: 'hidden',
            border: '2px solid #000',
            margin: '2px',
          }}>
            <Canvas
              tool={activeTool}
              brushSize={brushSize}
              pattern={activePattern}
              mainCanvasRef={mainCanvasRef}
            />
          </div>
        </div>

        {/* Pattern Palette */}
        <PatternPalette
          activePattern={activePattern}
          onPatternChange={setActivePattern}
          brushSize={brushSize}
          onBrushSizeChange={setBrushSize}
        />
      </div>
    </div>
  );
}
