import { useState, useRef, useEffect, useCallback } from 'react';

function useIsMobile(breakpoint = 768) {
  const [isMobile, setIsMobile] = useState(
    typeof window !== 'undefined' ? window.innerWidth < breakpoint : false
  );
  useEffect(() => {
    const mql = window.matchMedia(`(max-width: ${breakpoint - 1}px)`);
    const handler = (e: MediaQueryListEvent) => setIsMobile(e.matches);
    mql.addEventListener('change', handler);
    setIsMobile(mql.matches);
    return () => mql.removeEventListener('change', handler);
  }, [breakpoint]);
  return isMobile;
}

interface GalleryItem {
  id: number;
  x: number;
  y: number;
  width: number;
  height: number;
  label: string;
  sublabel: string;
  image: string;
  link: string;
}

const galleryItems: GalleryItem[] = [
  {
    id: 1,
    x: 80,
    y: 100,
    width: 340,
    height: 260,
    label: 'MERCH DESIGN',
    sublabel: 'APPAREL',
    image: '/creative-work/merch-design.webp',
    link: 'https://www.behance.net/gallery/100754269/Merch-Design',
  },
  {
    id: 2,
    x: 520,
    y: 160,
    width: 220,
    height: 290,
    label: 'PHOTOGRAPHY',
    sublabel: "23'-24'",
    image: '/creative-work/photography.webp',
    link: 'https://www.behance.net/gallery/172388003/Photography-(23-24)',
  },
  {
    id: 3,
    x: 860,
    y: 80,
    width: 200,
    height: 260,
    label: 'RANDOM',
    sublabel: 'MIXED WORKS',
    image: '/creative-work/random.webp',
    link: 'https://www.behance.net/gallery/143400853/Random',
  },
  {
    id: 4,
    x: 60,
    y: 440,
    width: 260,
    height: 320,
    label: 'MISFITS GAMING',
    sublabel: 'GROUP',
    image: '/creative-work/misfits-gaming.webp',
    link: 'https://www.behance.net/gallery/139084695/Misfits-Gaming-Group',
  },
  {
    id: 5,
    x: 420,
    y: 520,
    width: 240,
    height: 200,
    label: 'YFP GAMING',
    sublabel: 'BRANDING',
    image: '/creative-work/yfp-gaming.webp',
    link: 'https://www.behance.net/gallery/134314573/YFP-GAMING',
  },
  {
    id: 6,
    x: 740,
    y: 400,
    width: 280,
    height: 220,
    label: 'YOUTUBE CONTENT',
    sublabel: 'THUMBNAILS / VIDEOS',
    image: '/creative-work/youtube-content.webp',
    link: 'https://www.behance.net/gallery/122151765/YOUTUBE-CONTENT-(THUMBNAILS-VIDEOS)',
  },
  {
    id: 7,
    x: 1120,
    y: 140,
    width: 260,
    height: 340,
    label: 'OATH PGC 2021',
    sublabel: 'ESPORTS',
    image: '/creative-work/oath-pgc-2021.webp',
    link: 'https://www.behance.net/gallery/134314549/OATH-PGC-2021',
  },
  {
    id: 8,
    x: 1100,
    y: 540,
    width: 300,
    height: 230,
    label: 'DARK ZERO',
    sublabel: 'VALORANT CONCEPT',
    image: '/creative-work/darkzero-valorant.webp',
    link: 'https://www.behance.net/gallery/122873407/DARK-ZERO-VALORANT-CONCEPT',
  },
  {
    id: 9,
    x: 1440,
    y: 80,
    width: 220,
    height: 280,
    label: 'OATH GAMING',
    sublabel: "Q3/Q4 2021",
    image: '/creative-work/oath-gaming-q3q4.webp',
    link: 'https://www.behance.net/gallery/119547239/OATH-GAMING-2021-Q3Q4',
  },
  {
    id: 10,
    x: 1460,
    y: 420,
    width: 240,
    height: 200,
    label: 'NRG VALORANT',
    sublabel: 'PROJECT',
    image: '/creative-work/nrg-valorant.webp',
    link: 'https://www.behance.net/gallery/116433731/NRG-VALORANT-PROJECT',
  },
  {
    id: 11,
    x: 180,
    y: 820,
    width: 300,
    height: 230,
    label: 'OATH GAMING',
    sublabel: '2021',
    image: '/creative-work/oath-gaming-2021.webp',
    link: 'https://www.behance.net/gallery/114167349/OATH-GAMING-2021',
  },
  {
    id: 12,
    x: 600,
    y: 780,
    width: 260,
    height: 320,
    label: 'OATH GAMING',
    sublabel: 'PGI.S GRAPHICS',
    image: '/creative-work/oath-pgis.webp',
    link: 'https://www.behance.net/gallery/113267671/OATH-GAMING-PGIS-GRAPHICS',
  },
];

const CANVAS_WIDTH = 1800;
const CANVAS_HEIGHT = 1150;

export function CreativeWorkPage({ onBack }: { onBack: () => void }) {
  const isMobile = useIsMobile();
  const containerRef = useRef<HTMLDivElement>(null);
  const [offset, setOffset] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const dragStart = useRef({ x: 0, y: 0 });
  const offsetStart = useRef({ x: 0, y: 0 });
  const velocity = useRef({ x: 0, y: 0 });
  const lastPos = useRef({ x: 0, y: 0 });
  const lastTime = useRef(0);
  const animFrame = useRef<number>(0);
  const dragDistance = useRef(0);
  const [hoveredItem, setHoveredItem] = useState<number | null>(null);
  const [previewItem, setPreviewItem] = useState<GalleryItem | null>(null);

  useEffect(() => {
    if (containerRef.current) {
      const vw = containerRef.current.clientWidth;
      const vh = containerRef.current.clientHeight;
      setOffset({
        x: (vw - CANVAS_WIDTH) / 2,
        y: (vh - CANVAS_HEIGHT) / 2,
      });
    }
  }, []);

  const clampOffset = useCallback((x: number, y: number) => {
    if (!containerRef.current) return { x, y };
    const vw = containerRef.current.clientWidth;
    const vh = containerRef.current.clientHeight;
    const padding = 200;
    return {
      x: Math.max(-(CANVAS_WIDTH - padding), Math.min(vw - padding, x)),
      y: Math.max(-(CANVAS_HEIGHT - padding), Math.min(vh - padding, y)),
    };
  }, []);

  const handlePointerDown = useCallback((e: React.PointerEvent) => {
    if ((e.target as HTMLElement).closest('button, a')) return;
    if (previewItem) return;
    setIsDragging(true);
    dragDistance.current = 0;
    dragStart.current = { x: e.clientX, y: e.clientY };
    offsetStart.current = { ...offset };
    lastPos.current = { x: e.clientX, y: e.clientY };
    lastTime.current = Date.now();
    velocity.current = { x: 0, y: 0 };
    cancelAnimationFrame(animFrame.current);
    (e.target as HTMLElement).setPointerCapture?.(e.pointerId);
  }, [offset, previewItem]);

  const handlePointerMove = useCallback((e: React.PointerEvent) => {
    if (!isDragging) return;
    const now = Date.now();
    const dt = now - lastTime.current;
    if (dt > 0) {
      velocity.current = {
        x: (e.clientX - lastPos.current.x) / dt * 16,
        y: (e.clientY - lastPos.current.y) / dt * 16,
      };
    }
    lastPos.current = { x: e.clientX, y: e.clientY };
    lastTime.current = now;

    const dx = e.clientX - dragStart.current.x;
    const dy = e.clientY - dragStart.current.y;
    dragDistance.current = Math.sqrt(dx * dx + dy * dy);
    const newOffset = clampOffset(
      offsetStart.current.x + dx,
      offsetStart.current.y + dy
    );
    setOffset(newOffset);
  }, [isDragging, clampOffset]);

  const handlePointerUp = useCallback(() => {
    if (!isDragging) return;
    setIsDragging(false);

    const vx = velocity.current.x;
    const vy = velocity.current.y;
    if (Math.abs(vx) > 0.5 || Math.abs(vy) > 0.5) {
      let currentVx = vx;
      let currentVy = vy;
      let currentOffset = { ...offset };

      const animate = () => {
        currentVx *= 0.95;
        currentVy *= 0.95;
        if (Math.abs(currentVx) < 0.1 && Math.abs(currentVy) < 0.1) return;
        currentOffset = clampOffset(
          currentOffset.x + currentVx,
          currentOffset.y + currentVy
        );
        setOffset({ ...currentOffset });
        animFrame.current = requestAnimationFrame(animate);
      };
      animFrame.current = requestAnimationFrame(animate);
    }
  }, [isDragging, offset, clampOffset]);

  const handleItemClick = useCallback((item: GalleryItem) => {
    if (dragDistance.current > 5) return;
    setPreviewItem(item);
  }, []);

  useEffect(() => {
    return () => cancelAnimationFrame(animFrame.current);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && previewItem) {
        setPreviewItem(null);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [previewItem]);

  return (
    <div
      ref={containerRef}
      style={{
        position: 'fixed',
        inset: 0,
        background: '#000000',
        overflow: 'hidden',
        cursor: previewItem ? 'default' : isDragging ? 'grabbing' : 'grab',
        userSelect: 'none',
      }}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerUp}
    >
      {/* Header */}
      <div
        className="font-['Helvetica:Light',sans-serif]"
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          right: 0,
          zIndex: 20,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: isMobile ? '12px 16px' : '20px 32px',
          pointerEvents: 'none',
          color: '#e0eedf',
          fontSize: 'clamp(0.75rem, 0.9vw, 14px)',
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
        }}
      >
        <span>DILER ZAZA</span>
        {!isMobile && <span>CREATIVE WORK</span>}
        {!isMobile && <span>GALLERY ({galleryItems.length})</span>}
        <button
          onClick={onBack}
          className="font-['Helvetica:Light',sans-serif] hover:opacity-70 transition-opacity duration-300"
          style={{
            pointerEvents: 'auto',
            background: 'none',
            border: 'none',
            color: '#e0eedf',
            fontSize: 'clamp(0.75rem, 0.9vw, 14px)',
            letterSpacing: '0.08em',
            cursor: 'pointer',
            textTransform: 'uppercase',
            padding: '4px 0',
          }}
        >
          BACK
        </button>
      </div>

      {/* Canvas */}
      <div
        style={{
          position: 'absolute',
          left: offset.x,
          top: offset.y,
          width: CANVAS_WIDTH,
          height: CANVAS_HEIGHT,
          willChange: 'transform',
        }}
      >
        {/* Crosshair center marker */}
        <div
          style={{
            position: 'absolute',
            left: CANVAS_WIDTH / 2 - 10,
            top: CANVAS_HEIGHT / 2 - 10,
            width: 20,
            height: 20,
            pointerEvents: 'none',
          }}
        >
          <svg width="20" height="20" viewBox="0 0 20 20">
            <line x1="10" y1="2" x2="10" y2="18" stroke="#c4392d" strokeWidth="1" />
            <line x1="2" y1="10" x2="18" y2="10" stroke="#c4392d" strokeWidth="1" />
            <circle cx="10" cy="10" r="5" fill="none" stroke="#c4392d" strokeWidth="1" />
          </svg>
        </div>

        {/* Gallery items */}
        {galleryItems.map((item) => (
          <div
            key={item.id}
            onMouseEnter={() => setHoveredItem(item.id)}
            onMouseLeave={() => setHoveredItem(null)}
            onPointerUp={() => handleItemClick(item)}
            style={{
              position: 'absolute',
              left: item.x,
              top: item.y,
              width: item.width,
              cursor: isDragging ? 'grabbing' : 'pointer',
            }}
          >
            {/* Label above image */}
            <div
              className="font-['Helvetica:Light',sans-serif]"
              style={{
                fontSize: 'clamp(0.5rem, 0.65vw, 10px)',
                letterSpacing: '0.1em',
                color: '#e0eedf',
                marginBottom: '6px',
                lineHeight: 1.4,
                textTransform: 'uppercase',
              }}
            >
              <div>{item.label}</div>
              <div style={{ opacity: 0.5 }}>{item.sublabel}</div>
            </div>

            {/* Image */}
            <div
              style={{
                width: item.width,
                height: item.height,
                overflow: 'hidden',
                transition: 'transform 0.4s cubic-bezier(0.25, 0.1, 0.25, 1), box-shadow 0.4s ease',
                transform: hoveredItem === item.id ? 'scale(1.03)' : 'scale(1)',
                boxShadow: hoveredItem === item.id
                  ? '0 8px 30px rgba(255,255,255,0.06)'
                  : 'none',
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
        ))}
      </div>

      {/* Bottom bar */}
      <div
        className="font-['Helvetica:Light',sans-serif]"
        style={{
          position: 'fixed',
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 20,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: isMobile ? '12px 16px' : '20px 32px',
          pointerEvents: 'none',
          color: '#e0eedf',
          fontSize: 'clamp(0.625rem, 0.75vw, 11px)',
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
        }}
      >
        <span style={{ opacity: 0.4 }}>L0MINOUS</span>
        <span style={{ opacity: 0.4 }}>DRAG TO EXPLORE</span>
      </div>

      {/* Preview overlay */}
      {previewItem && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            zIndex: 50,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            background: 'rgba(0,0,0,0.85)',
            backdropFilter: 'blur(8px)',
            cursor: 'default',
            animation: 'fadeIn 0.3s ease',
          }}
          onClick={() => setPreviewItem(null)}
        >
          <style>{`
            @keyframes fadeIn { from { opacity: 0; } to { opacity: 1; } }
            @keyframes scaleIn { from { opacity: 0; transform: scale(0.92); } to { opacity: 1; transform: scale(1); } }
          `}</style>
          <div
            style={{
              maxWidth: '80vw',
              maxHeight: '80vh',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '24px',
              animation: 'scaleIn 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Preview image */}
            <div style={{ overflow: 'hidden' }}>
              <img
                src={previewItem.image}
                alt={previewItem.label}
                draggable={false}
                style={{
                  maxWidth: '80vw',
                  maxHeight: '65vh',
                  objectFit: 'contain',
                  display: 'block',
                }}
              />
            </div>

            {/* Preview info */}
            <div
              className="font-['Helvetica:Light',sans-serif]"
              style={{
                color: '#e0eedf',
                textAlign: 'center',
                letterSpacing: '0.1em',
                textTransform: 'uppercase',
              }}
            >
              <div style={{ fontSize: 'clamp(0.75rem, 1vw, 16px)', marginBottom: '4px' }}>
                {previewItem.label}
              </div>
              <div style={{ fontSize: 'clamp(0.625rem, 0.8vw, 12px)', opacity: 0.5 }}>
                {previewItem.sublabel}
              </div>
            </div>

            {/* Actions */}
            <div style={{ display: 'flex', gap: '12px' }}>
              <a
                href={previewItem.link}
                target="_blank"
                rel="noopener noreferrer"
                className="font-['Helvetica:Light',sans-serif] hover:opacity-100 transition-opacity duration-300"
                style={{
                  background: 'none',
                  border: '1px solid rgba(224,238,223,0.3)',
                  color: '#e0eedf',
                  fontSize: 'clamp(0.5rem, 0.65vw, 10px)',
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  padding: '8px 20px',
                  cursor: 'pointer',
                  opacity: 0.7,
                  textDecoration: 'none',
                }}
              >
                VIEW ON BEHANCE
              </a>
              <button
                onClick={() => setPreviewItem(null)}
                className="font-['Helvetica:Light',sans-serif] hover:opacity-100 transition-opacity duration-300"
                style={{
                  background: 'none',
                  border: '1px solid rgba(224,238,223,0.15)',
                  color: '#e0eedf',
                  fontSize: 'clamp(0.5rem, 0.65vw, 10px)',
                  letterSpacing: '0.15em',
                  textTransform: 'uppercase',
                  padding: '8px 20px',
                  cursor: 'pointer',
                  opacity: 0.5,
                }}
              >
                CLOSE
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}