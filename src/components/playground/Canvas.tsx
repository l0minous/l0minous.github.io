import { useRef, useEffect, useCallback } from 'react';
import type { ToolType, PatternType, Point } from './types';
import { PATTERNS } from './constants';

interface CanvasProps {
  tool: ToolType;
  brushSize: number;
  pattern: PatternType;
  mainCanvasRef: React.RefObject<HTMLCanvasElement | null>;
}

function createCanvasPattern(ctx: CanvasRenderingContext2D, patternType: PatternType): CanvasPattern | string {
  if (patternType === 'solid') return '#000000';
  if (patternType === 'white') return '#FFFFFF';

  const data = PATTERNS[patternType];
  const size = data.length;
  const patternCanvas = document.createElement('canvas');
  patternCanvas.width = size;
  patternCanvas.height = size;
  const pCtx = patternCanvas.getContext('2d')!;
  const imageData = pCtx.createImageData(size, size);

  for (let y = 0; y < size; y++) {
    for (let x = 0; x < size; x++) {
      const i = (y * size + x) * 4;
      const val = data[y][x] ? 0 : 255;
      imageData.data[i] = val;
      imageData.data[i + 1] = val;
      imageData.data[i + 2] = val;
      imageData.data[i + 3] = 255;
    }
  }

  pCtx.putImageData(imageData, 0, 0);
  return ctx.createPattern(patternCanvas, 'repeat')!;
}

function scanlineFill(ctx: CanvasRenderingContext2D, startX: number, startY: number, fillStyle: string | CanvasPattern) {
  const w = ctx.canvas.width;
  const h = ctx.canvas.height;
  const imageData = ctx.getImageData(0, 0, w, h);
  const data = imageData.data;

  const idx = (x: number, y: number) => (y * w + x) * 4;
  const si = idx(startX, startY);
  const tr = data[si], tg = data[si + 1], tb = data[si + 2], ta = data[si + 3];

  const match = (i: number) =>
    data[i] === tr && data[i + 1] === tg && data[i + 2] === tb && data[i + 3] === ta;

  const filled = new Uint8Array(w * h);
  const stack: [number, number][] = [[startX, startY]];

  while (stack.length > 0) {
    // eslint-disable-next-line prefer-const
    let [x, y] = stack.pop()!;
    if (y < 0 || y >= h) continue;

    while (x > 0 && match(idx(x - 1, y)) && !filled[(y * w + x - 1)]) x--;

    let spanAbove = false;
    let spanBelow = false;

    while (x < w && match(idx(x, y)) && !filled[y * w + x]) {
      filled[y * w + x] = 1;

      if (y > 0) {
        if (match(idx(x, y - 1)) && !filled[(y - 1) * w + x]) {
          if (!spanAbove) { stack.push([x, y - 1]); spanAbove = true; }
        } else {
          spanAbove = false;
        }
      }

      if (y < h - 1) {
        if (match(idx(x, y + 1)) && !filled[(y + 1) * w + x]) {
          if (!spanBelow) { stack.push([x, y + 1]); spanBelow = true; }
        } else {
          spanBelow = false;
        }
      }

      x++;
    }
  }

  const tempCanvas = document.createElement('canvas');
  tempCanvas.width = w;
  tempCanvas.height = h;
  const tempCtx = tempCanvas.getContext('2d')!;
  tempCtx.fillStyle = fillStyle;
  tempCtx.fillRect(0, 0, w, h);
  const patternData = tempCtx.getImageData(0, 0, w, h).data;

  for (let i = 0; i < filled.length; i++) {
    if (filled[i]) {
      const pi = i * 4;
      data[pi] = patternData[pi];
      data[pi + 1] = patternData[pi + 1];
      data[pi + 2] = patternData[pi + 2];
      data[pi + 3] = patternData[pi + 3];
    }
  }

  ctx.putImageData(imageData, 0, 0);
}

// Pixel scale — canvas renders at 1/PX_SCALE of container, CSS upscales with pixelated rendering
const PX_SCALE = 4;

export function Canvas({ tool, brushSize, pattern, mainCanvasRef }: CanvasProps) {
  const previewCanvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const isDrawing = useRef(false);
  const startPoint = useRef<Point | null>(null);
  const lastPoint = useRef<Point | null>(null);

  useEffect(() => {
    const container = containerRef.current;
    const main = mainCanvasRef.current;
    const preview = previewCanvasRef.current;
    if (!container || !main || !preview) return;

    const resize = () => {
      const rect = container.getBoundingClientRect();
      const w = Math.floor(rect.width / PX_SCALE);
      const h = Math.floor(rect.height / PX_SCALE);

      const tempCanvas = document.createElement('canvas');
      tempCanvas.width = main.width;
      tempCanvas.height = main.height;
      const tmpCtx = tempCanvas.getContext('2d')!;
      tmpCtx.imageSmoothingEnabled = false;
      tmpCtx.drawImage(main, 0, 0);

      main.width = w;
      main.height = h;
      preview.width = w;
      preview.height = h;

      const ctx = main.getContext('2d')!;
      ctx.imageSmoothingEnabled = false;
      const pCtx = preview.getContext('2d')!;
      pCtx.imageSmoothingEnabled = false;

      ctx.fillStyle = '#FFFFFF';
      ctx.fillRect(0, 0, w, h);
      ctx.drawImage(tempCanvas, 0, 0);
    };

    resize();
    const observer = new ResizeObserver(resize);
    observer.observe(container);
    return () => observer.disconnect();
  }, [mainCanvasRef]);

  // Use container rect for coordinate mapping — most reliable approach
  const getPoint = useCallback((e: React.PointerEvent): Point => {
    const container = containerRef.current!;
    const main = mainCanvasRef.current!;
    const rect = container.getBoundingClientRect();
    return {
      x: Math.round((e.clientX - rect.left) / rect.width * main.width),
      y: Math.round((e.clientY - rect.top) / rect.height * main.height),
    };
  }, [mainCanvasRef]);

  const getStrokeStyle = useCallback((ctx: CanvasRenderingContext2D) => {
    if (tool === 'eraser') return '#FFFFFF';
    return createCanvasPattern(ctx, pattern);
  }, [tool, pattern]);

  const drawLine = useCallback((ctx: CanvasRenderingContext2D, from: Point, to: Point, size: number, style: string | CanvasPattern) => {
    ctx.imageSmoothingEnabled = false;
    ctx.strokeStyle = style;
    ctx.lineWidth = size;
    ctx.lineCap = 'square';
    ctx.lineJoin = 'miter';
    ctx.beginPath();
    ctx.moveTo(from.x, from.y);
    ctx.lineTo(to.x, to.y);
    ctx.stroke();
  }, []);

  const sprayDots = useCallback((ctx: CanvasRenderingContext2D, center: Point, radius: number, style: string | CanvasPattern) => {
    ctx.fillStyle = style;
    const density = Math.floor(radius * 3);
    for (let i = 0; i < density; i++) {
      const angle = Math.random() * Math.PI * 2;
      const r = Math.random() * radius;
      const x = Math.floor(center.x + Math.cos(angle) * r);
      const y = Math.floor(center.y + Math.sin(angle) * r);
      ctx.fillRect(x, y, 1, 1);
    }
  }, []);

  const drawShapePreview = useCallback((from: Point, to: Point) => {
    const preview = previewCanvasRef.current;
    if (!preview) return;
    const ctx = preview.getContext('2d')!;
    ctx.imageSmoothingEnabled = false;
    ctx.clearRect(0, 0, preview.width, preview.height);

    ctx.strokeStyle = '#000000';
    ctx.fillStyle = '#000000';
    ctx.lineWidth = brushSize;
    ctx.lineCap = 'square';
    ctx.lineJoin = 'miter';

    switch (tool) {
      case 'line':
        ctx.beginPath();
        ctx.moveTo(from.x, from.y);
        ctx.lineTo(to.x, to.y);
        ctx.stroke();
        break;
      case 'rectangle':
        ctx.strokeRect(
          Math.min(from.x, to.x), Math.min(from.y, to.y),
          Math.abs(to.x - from.x), Math.abs(to.y - from.y)
        );
        break;
      case 'filledRectangle':
        ctx.fillRect(
          Math.min(from.x, to.x), Math.min(from.y, to.y),
          Math.abs(to.x - from.x), Math.abs(to.y - from.y)
        );
        break;
      case 'oval': {
        const cx = (from.x + to.x) / 2;
        const cy = (from.y + to.y) / 2;
        const rx = Math.abs(to.x - from.x) / 2;
        const ry = Math.abs(to.y - from.y) / 2;
        ctx.beginPath();
        ctx.ellipse(cx, cy, rx, ry, 0, 0, Math.PI * 2);
        ctx.stroke();
        break;
      }
      case 'filledOval': {
        const cx2 = (from.x + to.x) / 2;
        const cy2 = (from.y + to.y) / 2;
        const rx2 = Math.abs(to.x - from.x) / 2;
        const ry2 = Math.abs(to.y - from.y) / 2;
        ctx.beginPath();
        ctx.ellipse(cx2, cy2, rx2, ry2, 0, 0, Math.PI * 2);
        ctx.fill();
        break;
      }
    }
  }, [tool, brushSize]);

  const commitShape = useCallback((from: Point, to: Point) => {
    const main = mainCanvasRef.current;
    if (!main) return;
    const ctx = main.getContext('2d')!;
    ctx.imageSmoothingEnabled = false;

    const style = getStrokeStyle(ctx);
    ctx.strokeStyle = style;
    ctx.fillStyle = style;
    ctx.lineWidth = brushSize;
    ctx.lineCap = 'square';
    ctx.lineJoin = 'miter';

    switch (tool) {
      case 'line':
        ctx.beginPath();
        ctx.moveTo(from.x, from.y);
        ctx.lineTo(to.x, to.y);
        ctx.stroke();
        break;
      case 'rectangle':
        ctx.strokeRect(
          Math.min(from.x, to.x), Math.min(from.y, to.y),
          Math.abs(to.x - from.x), Math.abs(to.y - from.y)
        );
        break;
      case 'filledRectangle':
        ctx.fillRect(
          Math.min(from.x, to.x), Math.min(from.y, to.y),
          Math.abs(to.x - from.x), Math.abs(to.y - from.y)
        );
        break;
      case 'oval': {
        const cx = (from.x + to.x) / 2;
        const cy = (from.y + to.y) / 2;
        const rx = Math.abs(to.x - from.x) / 2;
        const ry = Math.abs(to.y - from.y) / 2;
        ctx.beginPath();
        ctx.ellipse(cx, cy, rx, ry, 0, 0, Math.PI * 2);
        ctx.stroke();
        break;
      }
      case 'filledOval': {
        const cx2 = (from.x + to.x) / 2;
        const cy2 = (from.y + to.y) / 2;
        const rx2 = Math.abs(to.x - from.x) / 2;
        const ry2 = Math.abs(to.y - from.y) / 2;
        ctx.beginPath();
        ctx.ellipse(cx2, cy2, rx2, ry2, 0, 0, Math.PI * 2);
        ctx.fill();
        break;
      }
    }
  }, [tool, brushSize, getStrokeStyle, mainCanvasRef]);

  const isShapeTool = tool === 'line' || tool === 'rectangle' || tool === 'filledRectangle' || tool === 'oval' || tool === 'filledOval';

  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    const point = getPoint(e);
    isDrawing.current = true;
    startPoint.current = point;
    lastPoint.current = point;

    (e.target as HTMLElement).setPointerCapture(e.pointerId);

    if (tool === 'fillBucket') {
      const main = mainCanvasRef.current;
      if (!main) return;
      const ctx = main.getContext('2d')!;
      const style = getStrokeStyle(ctx);
      scanlineFill(ctx, point.x, point.y, style);
      isDrawing.current = false;
      return;
    }

    if (tool === 'pencil' || tool === 'eraser') {
      const main = mainCanvasRef.current;
      if (!main) return;
      const ctx = main.getContext('2d')!;
      ctx.imageSmoothingEnabled = false;
      const style = getStrokeStyle(ctx);
      ctx.fillStyle = style;
      const half = Math.floor(brushSize / 2);
      ctx.fillRect(point.x - half, point.y - half, brushSize, brushSize);
    }

    if (tool === 'sprayCan') {
      const main = mainCanvasRef.current;
      if (!main) return;
      const ctx = main.getContext('2d')!;
      ctx.imageSmoothingEnabled = false;
      const style = getStrokeStyle(ctx);
      sprayDots(ctx, point, brushSize * 2, style);
    }
  }, [tool, brushSize, getPoint, getStrokeStyle, mainCanvasRef, sprayDots]);

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    if (!isDrawing.current) return;
    const point = getPoint(e);

    if (tool === 'pencil' || tool === 'eraser') {
      const main = mainCanvasRef.current;
      if (!main || !lastPoint.current) return;
      const ctx = main.getContext('2d')!;
      ctx.imageSmoothingEnabled = false;
      const style = getStrokeStyle(ctx);
      drawLine(ctx, lastPoint.current, point, brushSize, style);
      lastPoint.current = point;
      return;
    }

    if (tool === 'sprayCan') {
      const main = mainCanvasRef.current;
      if (!main) return;
      const ctx = main.getContext('2d')!;
      ctx.imageSmoothingEnabled = false;
      const style = getStrokeStyle(ctx);
      sprayDots(ctx, point, brushSize * 2, style);
      lastPoint.current = point;
      return;
    }

    if (isShapeTool && startPoint.current) {
      drawShapePreview(startPoint.current, point);
    }
  }, [tool, brushSize, isShapeTool, getPoint, getStrokeStyle, drawLine, drawShapePreview, mainCanvasRef, sprayDots]);

  const handlePointerUp = useCallback(() => {
    if (!isDrawing.current) return;
    isDrawing.current = false;
    startPoint.current = null;
    lastPoint.current = null;
  }, []);

  const handlePointerUpWithEvent = useCallback((e: React.PointerEvent) => {
    if (!isDrawing.current) return;

    if (isShapeTool && startPoint.current) {
      const endPoint = getPoint(e);
      const preview = previewCanvasRef.current;
      if (preview) {
        const ctx = preview.getContext('2d')!;
        ctx.clearRect(0, 0, preview.width, preview.height);
      }
      commitShape(startPoint.current, endPoint);
    }

    isDrawing.current = false;
    startPoint.current = null;
    lastPoint.current = null;
  }, [isShapeTool, getPoint, commitShape]);

  const cursorStyle = (() => {
    switch (tool) {
      case 'pencil': return 'crosshair';
      case 'eraser': return 'cell';
      case 'fillBucket': return 'crosshair';
      case 'sprayCan': return 'crosshair';
      default: return 'crosshair';
    }
  })();

  return (
    <div
      ref={containerRef}
      style={{
        flex: 1,
        position: 'relative',
        overflow: 'hidden',
        backgroundColor: '#FFFFFF',
      }}
    >
      <canvas
        ref={mainCanvasRef}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          imageRendering: 'pixelated',
        }}
      />
      <canvas
        ref={previewCanvasRef}
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          width: '100%',
          height: '100%',
          imageRendering: 'pixelated',
          cursor: cursorStyle,
          touchAction: 'none',
        }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUpWithEvent}
        onPointerLeave={handlePointerUp}
      />
    </div>
  );
}
