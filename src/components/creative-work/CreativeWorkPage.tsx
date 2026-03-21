import { useState, useEffect } from 'react';
import { ImageGlobe } from './ImageGlobe';
import { PixelGalaxy } from './PixelGalaxy';

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
}

const galleryItems: GalleryItem[] = [
  { id: 1, label: 'MERCH DESIGN', sublabel: 'APPAREL', image: '/globe-photos/345435.webp', fullImage: '/globe-photos/full/345435.webp', link: 'https://www.behance.net/gallery/100754269/Merch-Design' },
  { id: 2, label: 'PHOTOGRAPHY', sublabel: "23'-24'", image: '/globe-photos/35252532.webp', fullImage: '/globe-photos/full/35252532.webp', link: 'https://www.behance.net/gallery/172388003/Photography-(23-24)' },
  { id: 3, label: 'RANDOM', sublabel: 'MIXED WORKS', image: '/globe-photos/4353453.webp', fullImage: '/globe-photos/full/4353453.webp', link: 'https://www.behance.net/gallery/143400853/Random' },
  { id: 4, label: 'MISFITS GAMING', sublabel: 'GROUP', image: '/globe-photos/435643533.webp', fullImage: '/globe-photos/full/435643533.webp', link: 'https://www.behance.net/gallery/139084695/Misfits-Gaming-Group' },
  { id: 5, label: 'YFP GAMING', sublabel: 'BRANDING', image: '/globe-photos/436345.webp', fullImage: '/globe-photos/full/436345.webp', link: 'https://www.behance.net/gallery/134314573/YFP-GAMING' },
  { id: 6, label: 'YOUTUBE CONTENT', sublabel: 'THUMBNAILS / VIDEOS', image: '/globe-photos/43643643.webp', fullImage: '/globe-photos/full/43643643.webp', link: 'https://www.behance.net/gallery/122151765/YOUTUBE-CONTENT-(THUMBNAILS-VIDEOS)' },
  { id: 7, label: 'OATH PGC 2021', sublabel: 'ESPORTS', image: '/globe-photos/4574645.webp', fullImage: '/globe-photos/full/4574645.webp', link: 'https://www.behance.net/gallery/134314549/OATH-PGC-2021' },
  { id: 8, label: 'DARK ZERO', sublabel: 'VALORANT CONCEPT', image: '/globe-photos/463434634.webp', fullImage: '/globe-photos/full/463434634.webp', link: 'https://www.behance.net/gallery/122873407/DARK-ZERO-VALORANT-CONCEPT' },
  { id: 9, label: 'OATH GAMING', sublabel: 'Q3/Q4 2021', image: '/globe-photos/46354333.webp', fullImage: '/globe-photos/full/46354333.webp', link: 'https://www.behance.net/gallery/119547239/OATH-GAMING-2021-Q3Q4' },
  { id: 10, label: 'NRG VALORANT', sublabel: 'PROJECT', image: '/globe-photos/4636434.webp', fullImage: '/globe-photos/full/4636434.webp', link: 'https://www.behance.net/gallery/116433731/NRG-VALORANT-PROJECT' },
  { id: 11, label: 'OATH GAMING', sublabel: '2021', image: '/globe-photos/546744.webp', fullImage: '/globe-photos/full/546744.webp', link: 'https://www.behance.net/gallery/114167349/OATH-GAMING-2021' },
  { id: 12, label: 'OATH GAMING', sublabel: 'PGI.S GRAPHICS', image: '/globe-photos/5487845874.webp', fullImage: '/globe-photos/full/5487845874.webp', link: 'https://www.behance.net/gallery/113267671/OATH-GAMING-PGIS-GRAPHICS' },
  { id: 13, label: 'CREATIVE WORK', sublabel: 'I', image: '/globe-photos/568565.webp', fullImage: '/globe-photos/full/568565.webp', link: 'https://www.behance.net/dilerzaza' },
  { id: 14, label: 'CREATIVE WORK', sublabel: 'II', image: '/globe-photos/68656.webp', fullImage: '/globe-photos/full/68656.webp', link: 'https://www.behance.net/dilerzaza' },
  { id: 15, label: 'CREATIVE WORK', sublabel: 'III', image: '/globe-photos/IMG_8924.webp', fullImage: '/globe-photos/full/IMG_8924.webp', link: 'https://www.behance.net/dilerzaza' },
  { id: 16, label: 'CREATIVE WORK', sublabel: 'IV', image: '/globe-photos/screenshot-1.webp', fullImage: '/globe-photos/full/screenshot-1.webp', link: 'https://www.behance.net/dilerzaza' },
  { id: 17, label: 'CREATIVE WORK', sublabel: 'V', image: '/globe-photos/screenshot-2.webp', fullImage: '/globe-photos/full/screenshot-2.webp', link: 'https://www.behance.net/dilerzaza' },
  { id: 18, label: 'CREATIVE WORK', sublabel: 'VI', image: '/globe-photos/screenshot-3.webp', fullImage: '/globe-photos/full/screenshot-3.webp', link: 'https://www.behance.net/dilerzaza' },
  { id: 19, label: 'CREATIVE WORK', sublabel: 'VII', image: '/globe-photos/screenshot-4.webp', fullImage: '/globe-photos/full/screenshot-4.webp', link: 'https://www.behance.net/dilerzaza' },
  { id: 20, label: 'CREATIVE WORK', sublabel: 'VIII', image: '/globe-photos/screenshot-5.webp', fullImage: '/globe-photos/full/screenshot-5.webp', link: 'https://www.behance.net/dilerzaza' },
];

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
        position: 'fixed',
        inset: 0,
        background: '#000000',
        overflow: 'hidden',
        userSelect: 'none',
      }}
    >
      <PixelGalaxy />

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

      {/* Globe */}
      <ImageGlobe
        items={galleryItems}
        onItemClick={(item) => setPreviewItem(item)}
        isMobile={isMobile}
      />

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
        <span style={{ opacity: 0.4 }}>DRAG TO ROTATE</span>
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
          <img
            src={previewItem.fullImage}
            alt={previewItem.label}
            draggable={false}
            style={{
              maxWidth: '90vw',
              maxHeight: '90vh',
              objectFit: 'contain',
              display: 'block',
              animation: 'scaleIn 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
            }}
          />
        </div>
      )}
    </div>
  );
}
