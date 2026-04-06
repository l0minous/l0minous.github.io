import { useState, useEffect } from 'react';

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
  label: string;
  sublabel: string;
  image: string;
  fullImage: string;
  link: string;
  /** Degrees; negative = counter-clockwise (e.g. -90 fixes portrait stored as landscape). */
  rotateDeg?: number;
}

const galleryItems: GalleryItem[] = [
  { id: 1, label: 'PHOTOGRAPHY', sublabel: "23'-24'", image: '/globe-photos/35252532.webp', fullImage: '/globe-photos/full/35252532.webp', link: 'https://www.behance.net/gallery/172388003/Photography-(23-24)' },
  { id: 2, label: 'RANDOM', sublabel: 'MIXED WORKS', image: '/globe-photos/4353453.webp', fullImage: '/globe-photos/full/4353453.webp', link: 'https://www.behance.net/gallery/143400853/Random' },
  { id: 3, label: 'MISFITS GAMING', sublabel: 'GROUP', image: '/globe-photos/435643533.webp', fullImage: '/globe-photos/full/435643533.webp', link: 'https://www.behance.net/gallery/139084695/Misfits-Gaming-Group' },
  { id: 4, label: 'YFP GAMING', sublabel: 'BRANDING', image: '/globe-photos/436345.webp', fullImage: '/globe-photos/full/436345.webp', link: 'https://www.behance.net/gallery/134314573/YFP-GAMING' },
  { id: 5, label: 'YOUTUBE CONTENT', sublabel: 'THUMBNAILS / VIDEOS', image: '/globe-photos/43643643.webp', fullImage: '/globe-photos/full/43643643.webp', link: 'https://www.behance.net/gallery/122151765/YOUTUBE-CONTENT-(THUMBNAILS-VIDEOS)' },
  { id: 6, label: 'OATH PGC 2021', sublabel: 'ESPORTS', image: '/globe-photos/4574645.webp', fullImage: '/globe-photos/full/4574645.webp', link: 'https://www.behance.net/gallery/134314549/OATH-PGC-2021' },
  { id: 7, label: 'DARK ZERO', sublabel: 'VALORANT CONCEPT', image: '/globe-photos/463434634.webp', fullImage: '/globe-photos/full/463434634.webp', link: 'https://www.behance.net/gallery/122873407/DARK-ZERO-VALORANT-CONCEPT' },
  { id: 8, label: 'OATH GAMING', sublabel: 'Q3/Q4 2021', image: '/globe-photos/46354333.webp', fullImage: '/globe-photos/full/46354333.webp', link: 'https://www.behance.net/gallery/119547239/OATH-GAMING-2021-Q3Q4', rotateDeg: -90 },
  { id: 9, label: 'NRG VALORANT', sublabel: 'PROJECT', image: '/globe-photos/4636434.webp', fullImage: '/globe-photos/full/4636434.webp', link: 'https://www.behance.net/gallery/116433731/NRG-VALORANT-PROJECT' },
  { id: 10, label: 'OATH GAMING', sublabel: '2021', image: '/globe-photos/546744.webp', fullImage: '/globe-photos/full/546744.webp', link: 'https://www.behance.net/gallery/114167349/OATH-GAMING-2021' },
  { id: 11, label: 'OATH GAMING', sublabel: 'PGI.S GRAPHICS', image: '/globe-photos/5487845874.webp', fullImage: '/globe-photos/full/5487845874.webp', link: 'https://www.behance.net/gallery/113267671/OATH-GAMING-PGIS-GRAPHICS' },
  { id: 12, label: 'CREATIVE WORK', sublabel: 'I', image: '/globe-photos/568565.webp', fullImage: '/globe-photos/full/568565.webp', link: 'https://www.behance.net/dilerzaza' },
  { id: 13, label: 'CREATIVE WORK', sublabel: 'II', image: '/globe-photos/68656.webp', fullImage: '/globe-photos/full/68656.webp', link: 'https://www.behance.net/dilerzaza' },
  { id: 14, label: 'CREATIVE WORK', sublabel: 'III', image: '/globe-photos/IMG_8924.webp', fullImage: '/globe-photos/full/IMG_8924.webp', link: 'https://www.behance.net/dilerzaza' },
  { id: 15, label: 'CREATIVE WORK', sublabel: 'IV', image: '/globe-photos/screenshot-1.webp', fullImage: '/globe-photos/full/screenshot-1.webp', link: 'https://www.behance.net/dilerzaza' },
  { id: 16, label: 'CREATIVE WORK', sublabel: 'V', image: '/globe-photos/screenshot-2.webp', fullImage: '/globe-photos/full/screenshot-2.webp', link: 'https://www.behance.net/dilerzaza' },
  { id: 17, label: 'CREATIVE WORK', sublabel: 'VI', image: '/globe-photos/screenshot-3.webp', fullImage: '/globe-photos/full/screenshot-3.webp', link: 'https://www.behance.net/dilerzaza' },
  { id: 18, label: 'CREATIVE WORK', sublabel: 'VII', image: '/globe-photos/screenshot-4.webp', fullImage: '/globe-photos/full/screenshot-4.webp', link: 'https://www.behance.net/dilerzaza' },
  { id: 19, label: 'CREATIVE WORK', sublabel: 'VIII', image: '/globe-photos/screenshot-5.webp', fullImage: '/globe-photos/full/screenshot-5.webp', link: 'https://www.behance.net/dilerzaza' },
  { id: 20, label: 'PHOTOGRAPHY', sublabel: 'IX', image: '/creative-work/lamp-room-1.png', fullImage: '/creative-work/lamp-room-1.png', link: 'https://www.behance.net/dilerzaza' },
  { id: 21, label: 'PHOTOGRAPHY', sublabel: 'X', image: '/creative-work/lamp-room-2.png', fullImage: '/creative-work/lamp-room-2.png', link: 'https://www.behance.net/dilerzaza' },
  { id: 22, label: 'PHOTOGRAPHY', sublabel: 'XI', image: '/creative-work/cherry-blossoms.png', fullImage: '/creative-work/cherry-blossoms.png', link: 'https://www.behance.net/dilerzaza' },
  { id: 23, label: 'PHOTOGRAPHY', sublabel: 'XII', image: '/creative-work/night-street.png', fullImage: '/creative-work/night-street.png', link: 'https://www.behance.net/dilerzaza' },
  { id: 24, label: 'PHOTOGRAPHY', sublabel: 'XIII', image: '/creative-work/basketball-park.png', fullImage: '/creative-work/basketball-park.png', link: 'https://www.behance.net/dilerzaza' },
  { id: 25, label: 'PHOTOGRAPHY', sublabel: 'XIV', image: '/creative-work/night-festival.png', fullImage: '/creative-work/night-festival.png', link: 'https://www.behance.net/dilerzaza' },
  { id: 26, label: 'PHOTOGRAPHY', sublabel: 'XV', image: '/creative-work/basketball-player.png', fullImage: '/creative-work/basketball-player.png', link: 'https://www.behance.net/dilerzaza' },
  { id: 27, label: 'PHOTOGRAPHY', sublabel: 'XVI', image: '/creative-work/beach-sunset.png', fullImage: '/creative-work/beach-sunset.png', link: 'https://www.behance.net/dilerzaza' },
  { id: 28, label: 'PHOTOGRAPHY', sublabel: 'XVII', image: '/creative-work/river-rapids.png', fullImage: '/creative-work/river-rapids.png', link: 'https://www.behance.net/dilerzaza' },
  { id: 29, label: 'PHOTOGRAPHY', sublabel: 'XVIII', image: '/creative-work/basketball-layup.png', fullImage: '/creative-work/basketball-layup.png', link: 'https://www.behance.net/dilerzaza' },
  { id: 30, label: 'PHOTOGRAPHY', sublabel: 'XIX', image: '/creative-work/forest-bridge.png', fullImage: '/creative-work/forest-bridge.png', link: 'https://www.behance.net/dilerzaza' },
  { id: 31, label: 'PHOTOGRAPHY', sublabel: 'XX', image: '/creative-work/waterfront-terrace.png', fullImage: '/creative-work/waterfront-terrace.png', link: 'https://www.behance.net/dilerzaza' },
  { id: 32, label: 'PHOTOGRAPHY', sublabel: 'XXI', image: '/creative-work/antique-interior.png', fullImage: '/creative-work/antique-interior.png', link: 'https://www.behance.net/dilerzaza' },
  { id: 33, label: 'CREATIVE WORK', sublabel: 'XXII', image: '/creative-work/sfp-something-worth-fighting.png', fullImage: '/creative-work/sfp-something-worth-fighting.png', link: 'https://www.behance.net/dilerzaza' },
  { id: 34, label: 'PHOTOGRAPHY', sublabel: 'XXIII', image: '/creative-work/winter-city-street.png', fullImage: '/creative-work/winter-city-street.png', link: 'https://www.behance.net/dilerzaza' },
  { id: 35, label: 'PHOTOGRAPHY', sublabel: 'XXIV', image: '/creative-work/basketball-park-air.png', fullImage: '/creative-work/basketball-park-air.png', link: 'https://www.behance.net/dilerzaza' },
  { id: 36, label: 'PHOTOGRAPHY', sublabel: 'XXV', image: '/creative-work/night-fair-crowd.png', fullImage: '/creative-work/night-fair-crowd.png', link: 'https://www.behance.net/dilerzaza' },
  { id: 37, label: 'PHOTOGRAPHY', sublabel: 'XXVI', image: '/creative-work/basketball-court-group.png', fullImage: '/creative-work/basketball-court-group.png', link: 'https://www.behance.net/dilerzaza' },
];

const PAGE_BG = 'linear-gradient(90deg, rgba(0, 0, 0, 0.05) 0%, rgba(0, 0, 0, 0.05) 100%), linear-gradient(90deg, rgb(221, 222, 206) 0%, rgb(221, 222, 206) 100%)';

function GalleryTileImage({ item }: { item: GalleryItem }) {
  const [natural, setNatural] = useState<{ w: number; h: number } | null>(null);
  const rot = item.rotateDeg;

  if (rot == null) {
    return (
      <img
        src={item.fullImage}
        alt={item.label}
        draggable={false}
        style={{
          width: '100%',
          height: 'auto',
          display: 'block',
        }}
      />
    );
  }

  const pad = natural && natural.h > 0 ? `${(natural.w / natural.h) * 100}%` : undefined;
  const widthPct = natural && natural.h > 0 ? `${(natural.w / natural.h) * 100}%` : '100%';

  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        ...(pad ? { paddingBottom: pad } : { minHeight: '140px' }),
        overflow: 'hidden',
      }}
    >
      <img
        src={item.fullImage}
        alt={item.label}
        draggable={false}
        onLoad={(e) => {
          const { naturalWidth: nw, naturalHeight: nh } = e.currentTarget;
          if (nw > 0 && nh > 0) {
            setNatural({ w: nw, h: nh });
          }
        }}
        style={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          width: widthPct,
          height: 'auto',
          maxWidth: 'none',
          transform: `translate(-50%, -50%) rotate(${rot}deg)`,
          transformOrigin: 'center center',
        }}
      />
    </div>
  );
}

export function CreativeWorkPage({ onBack }: { onBack: () => void }) {
  const isMobile = useIsMobile();
  const [previewItem, setPreviewItem] = useState<GalleryItem | null>(null);

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
      style={{
        minHeight: '100vh',
        backgroundImage: PAGE_BG,
      }}
    >
      {/* Header */}
      <div
        className="font-['Helvetica:Light',sans-serif]"
        style={{
          position: 'sticky',
          top: 0,
          zIndex: 20,
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: isMobile ? '12px 16px' : '20px 32px',
          backgroundImage: PAGE_BG,
          color: '#000000',
          fontSize: 'clamp(0.75rem, 0.9vw, 14px)',
          letterSpacing: '0.08em',
          textTransform: 'uppercase',
        }}
      >
        <span>DILER ZAZA</span>
        <button
          onClick={onBack}
          className="font-['Helvetica:Light',sans-serif] hover:opacity-70 transition-opacity duration-300"
          style={{
            background: 'none',
            border: 'none',
            color: '#000000',
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

      {/* Masonry Grid */}
      <div
        style={{
          maxWidth: '1512px',
          margin: '0 auto',
          padding: isMobile ? '20px 8px 60px' : '30px 32px 80px',
          columnCount: isMobile ? 1 : 4,
          columnGap: isMobile ? '6px' : '6px',
        }}
      >
        {galleryItems.map((item) => (
          <div
            key={item.id}
            style={{
              cursor: 'pointer',
              breakInside: 'avoid',
              marginBottom: '6px',
              overflow: 'hidden',
            }}
            onClick={() => setPreviewItem(item)}
          >
            <GalleryTileImage item={item} />
          </div>
        ))}
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
              maxWidth: 'min(96vw, 3200px)',
              maxHeight: 'min(96vh, 3200px)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '12px',
              boxSizing: 'border-box',
              animation: 'scaleIn 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
              transform: 'translateZ(0)',
            }}
          >
            <img
              key={previewItem.fullImage}
              src={previewItem.fullImage}
              alt={previewItem.label}
              draggable={false}
              decoding="sync"
              fetchPriority="high"
              style={{
                maxWidth: previewItem.rotateDeg != null ? 'min(96vh, 3200px)' : 'min(96vw, 3200px)',
                maxHeight: previewItem.rotateDeg != null ? 'min(96vw, 3200px)' : 'min(96vh, 3200px)',
                width: 'auto',
                height: 'auto',
                objectFit: 'contain',
                objectPosition: 'center',
                display: 'block',
                transform: previewItem.rotateDeg != null ? `rotate(${previewItem.rotateDeg}deg)` : undefined,
                backfaceVisibility: 'hidden',
                WebkitBackfaceVisibility: 'hidden',
              }}
            />
          </div>
        </div>
      )}
    </div>
  );
}
