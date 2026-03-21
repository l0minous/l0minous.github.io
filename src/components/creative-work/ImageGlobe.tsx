import { useState, useRef, useEffect, useMemo, useCallback } from 'react';

interface GalleryItem {
  id: number;
  label: string;
  sublabel: string;
  image: string;
  fullImage: string;
  link: string;
}

interface ImageGlobeProps {
  items: GalleryItem[];
  onItemClick: (item: GalleryItem) => void;
  isMobile: boolean;
}

const GOLDEN_RATIO = (1 + Math.sqrt(5)) / 2;

export function ImageGlobe({ items, onItemClick, isMobile }: ImageGlobeProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const sphereRef = useRef<HTMLDivElement>(null);

  const rotY = useRef(0);
  const rotX = useRef(0);
  const isDragging = useRef(false);
  const autoRotating = useRef(true);
  const dragStart = useRef({ x: 0, y: 0 });
  const rotStart = useRef({ x: 0, y: 0 });
  const dragDist = useRef(0);
  const velY = useRef(0);
  const velX = useRef(0);
  const lastPtr = useRef({ x: 0, y: 0 });
  const lastTime = useRef(0);
  const frameRef = useRef(0);

  const [size, setSize] = useState({ w: 0, h: 0 });
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  // Track container size
  useEffect(() => {
    const el = containerRef.current;
    if (!el) return;
    const update = () => setSize({ w: el.clientWidth, h: el.clientHeight });
    update();
    const ro = new ResizeObserver(update);
    ro.observe(el);
    return () => ro.disconnect();
  }, []);

  // Fibonacci sphere distribution
  const spherePoints = useMemo(() => {
    const count = items.length;
    return items.map((_, i) => {
      const theta = Math.acos(1 - (2 * (i + 0.5)) / count);
      const phi = (2 * Math.PI * i) / GOLDEN_RATIO;
      return { theta, phi };
    });
  }, [items.length]);

  const R = Math.min(size.w, size.h) * (isMobile ? 0.30 : 0.35);
  const perspective = isMobile ? 600 : 800;
  const cardW = isMobile ? 90 : 130;
  const cardH = cardW * 0.75;

  // Animation loop — only updates the sphere container's transform via ref (no React re-render)
  useEffect(() => {
    let running = true;
    const animate = () => {
      if (!running) return;

      if (!isDragging.current) {
        if (Math.abs(velY.current) > 0.0001 || Math.abs(velX.current) > 0.0001) {
          rotY.current += velY.current;
          rotX.current += velX.current;
          rotX.current = Math.max(-Math.PI / 3, Math.min(Math.PI / 3, rotX.current));
          velY.current *= 0.95;
          velX.current *= 0.95;
          if (Math.abs(velY.current) < 0.0001 && Math.abs(velX.current) < 0.0001) {
            velY.current = 0;
            velX.current = 0;
            autoRotating.current = true;
          }
        }
        if (autoRotating.current) {
          rotY.current += 0.003;
        }
      }

      if (sphereRef.current) {
        sphereRef.current.style.transform =
          `rotateX(${rotX.current}rad) rotateY(${rotY.current}rad)`;
      }

      frameRef.current = requestAnimationFrame(animate);
    };
    frameRef.current = requestAnimationFrame(animate);
    return () => {
      running = false;
      cancelAnimationFrame(frameRef.current);
    };
  }, []);

  // Use window-level listeners for move/up so we don't need pointer capture
  // (pointer capture steals events from 3D-transformed children)
  const onWindowMove = useRef<((e: PointerEvent) => void) | null>(null);
  const onWindowUp = useRef<((e: PointerEvent) => void) | null>(null);

  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    if ((e.target as HTMLElement).closest('button, a')) return;
    isDragging.current = true;
    autoRotating.current = false;
    dragDist.current = 0;
    dragStart.current = { x: e.clientX, y: e.clientY };
    rotStart.current = { x: rotX.current, y: rotY.current };
    lastPtr.current = { x: e.clientX, y: e.clientY };
    lastTime.current = Date.now();
    velY.current = 0;
    velX.current = 0;

    const moveHandler = (ev: PointerEvent) => {
      if (!isDragging.current) return;
      const now = Date.now();
      const dt = now - lastTime.current;
      const dx = ev.clientX - dragStart.current.x;
      const dy = ev.clientY - dragStart.current.y;
      dragDist.current = Math.sqrt(dx * dx + dy * dy);

      if (dt > 0) {
        velY.current = ((ev.clientX - lastPtr.current.x) / dt) * 0.012;
        velX.current = ((ev.clientY - lastPtr.current.y) / dt) * -0.012;
      }
      lastPtr.current = { x: ev.clientX, y: ev.clientY };
      lastTime.current = now;

      rotY.current = rotStart.current.y + dx * 0.005;
      const newRotX = rotStart.current.x - dy * 0.005;
      rotX.current = Math.max(-Math.PI / 3, Math.min(Math.PI / 3, newRotX));
    };

    const upHandler = () => {
      isDragging.current = false;
      if (Math.abs(velY.current) < 0.0005 && Math.abs(velX.current) < 0.0005) {
        autoRotating.current = true;
      }
      window.removeEventListener('pointermove', moveHandler);
      window.removeEventListener('pointerup', upHandler);
      onWindowMove.current = null;
      onWindowUp.current = null;
    };

    // Clean up any stale listeners
    if (onWindowMove.current) window.removeEventListener('pointermove', onWindowMove.current);
    if (onWindowUp.current) window.removeEventListener('pointerup', onWindowUp.current);

    onWindowMove.current = moveHandler;
    onWindowUp.current = upHandler;
    window.addEventListener('pointermove', moveHandler);
    window.addEventListener('pointerup', upHandler);
  }, []);

  // Cleanup window listeners on unmount
  useEffect(() => {
    return () => {
      if (onWindowMove.current) window.removeEventListener('pointermove', onWindowMove.current);
      if (onWindowUp.current) window.removeEventListener('pointerup', onWindowUp.current);
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        position: 'absolute',
        inset: 0,
        perspective: `${perspective}px`,
        cursor: 'grab',
      }}
      onPointerDown={handlePointerDown}
    >
      <div
        ref={sphereRef}
        style={{
          position: 'absolute',
          left: '50%',
          top: '50%',
          width: 0,
          height: 0,
          transformStyle: 'preserve-3d',
        }}
      >
        {items.map((item, i) => {
          const { theta, phi } = spherePoints[i];
          const isHovered = hoveredId === item.id;

          return (
            <div
              key={item.id}
              onMouseEnter={() => setHoveredId(item.id)}
              onMouseLeave={() => setHoveredId(null)}
              onClick={() => {
                if (dragDist.current < 5) {
                  onItemClick(item);
                }
              }}
              style={{
                position: 'absolute',
                width: cardW,
                transformStyle: 'preserve-3d',
                backfaceVisibility: 'hidden',
                transform: `rotateY(${phi}rad) rotateX(${Math.PI / 2 - theta}rad) translateZ(${R}px)`,
                marginLeft: -cardW / 2,
                marginTop: -cardH / 2,
                cursor: 'pointer',
              }}
            >
              {/* Image */}
              <div
                style={{
                  width: cardW,
                  height: cardH,
                  overflow: 'hidden',
                  borderRadius: '2px',
                  transform: isHovered ? 'scale(1.08)' : 'scale(1)',
                  boxShadow: isHovered
                    ? '0 0 20px rgba(224,238,223,0.2)'
                    : '0 2px 8px rgba(0,0,0,0.3)',
                  transition: 'transform 0.3s ease, box-shadow 0.3s ease',
                }}
              >
                <img
                  src={item.image}
                  alt={item.label}
                  draggable={false}
                  style={{
                    width: '100%',
                    height: '100%',
                    objectFit: 'cover',
                    display: 'block',
                  }}
                />
              </div>

            </div>
          );
        })}
      </div>
    </div>
  );
}
