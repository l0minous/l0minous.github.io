import { useEffect, useRef, useState } from 'react';
import type { CSSProperties } from 'react';
import { galleryImages } from './gallery-images';
import { getGalleryPreparation, prepareGallery } from './gallery-loader';
import './creative-work.css';

// Mix photographs, portraits and graphic work through the paper collage.
const collageOrder = [
  1, 23, 15, 22, 2, 20, 27,
  3, 26, 16, 28, 4, 38, 25,
  5, 34, 17, 30, 6, 40, 31,
  7, 8, 18, 24, 9, 41, 32,
  10, 29, 19, 43, 11, 36, 21,
  12, 37, 33, 35, 13, 39, 42, 14,
];
const collageRank = new Map(collageOrder.map((id, index) => [id, index]));
const collageImages = [...galleryImages]
  .sort((a, b) => (collageRank.get(a.id) ?? collageOrder.length) - (collageRank.get(b.id) ?? collageOrder.length));

// Size and spacing are fixed before images decode, so everything appears together.
const collageRhythm = [
  [100, 0, 12, 38], [76, 16, 22, 46], [96, 2, 45, 50],
  [82, 0, 0, 34], [100, 0, 30, 44], [68, 24, 12, 54],
  [90, 6, 48, 38], [100, 0, 7, 52], [78, 17, 38, 38],
  [96, 4, 10, 44], [86, 0, 46, 30], [72, 25, 20, 48],
];

export function CreativeWorkPage({ onBack }: { onBack: () => void }) {
  const [preparation, setPreparation] = useState(getGalleryPreparation);
  const [attempt, setAttempt] = useState(0);
  const [previewIndex, setPreviewIndex] = useState<number | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const selected = previewIndex === null ? null : collageImages[previewIndex];

  useEffect(() => {
    let active = true;
    prepareGallery(attempt > 0).then(result => { if (active) setPreparation(result); });
    return () => { active = false; };
  }, [attempt]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    if (previewIndex === null) {
      if (dialog.open) dialog.close();
      return;
    }
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    if (!dialog.open) dialog.showModal();
    const keyDown = (event: KeyboardEvent) => {
      if (event.key === 'ArrowRight' || event.key === 'ArrowLeft') {
        event.preventDefault();
        const direction = event.key === 'ArrowRight' ? 1 : -1;
        setPreviewIndex(index => ((index ?? 0) + direction + collageImages.length) % collageImages.length);
      }
    };
    window.addEventListener('keydown', keyDown);
    // Nearby larger images load quietly; the already decoded thumbnail remains visible.
    for (const offset of [-1, 1]) {
      const image = new Image();
      image.src = collageImages[(previewIndex + offset + collageImages.length) % collageImages.length].preview;
    }
    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener('keydown', keyDown);
    };
  }, [previewIndex]);

  const closePreview = () => setPreviewIndex(null);
  const movePreview = (direction: number) => setPreviewIndex(index => ((index ?? 0) + direction + collageImages.length) % collageImages.length);

  return <main className="work-archive">
    <header className="work-archive-topbar">
      <span>Diler Zaza</span>
      <h1>Creative work</h1>
      <button type="button" onClick={onBack}>Back</button>
    </header>

    <div className="work-archive-content" aria-busy={!preparation}>
      {!preparation && <p className="work-loading" role="status">Opening collection…</p>}
      {preparation && preparation.failed.length > 0 && <p className="work-loading" role="status">
        Some images could not load. <button type="button" onClick={() => { setPreparation(null); setAttempt(value => value + 1); }}>Retry</button>
      </p>}
      <ul className="work-grid" hidden={!preparation} aria-label="Creative work images">
        {collageImages.map((item, index) => {
          const [width, inset, top, gap] = collageRhythm[index % collageRhythm.length];
          const style = {
            '--piece-width': `${width}%`, '--piece-inset': `${inset}%`,
            '--piece-top': `${top}px`, '--piece-gap': `${gap}px`,
            '--piece-ratio': `${item.width} / ${item.height}`,
          } as CSSProperties;
          return <li key={item.id} className="work-tile" style={style}>
            <button type="button" className="work-thumbnail" disabled={preparation?.failed.includes(item.id)} onClick={() => setPreviewIndex(index)} aria-label={`Open ${item.title}, ${item.detail}`}>
              <span className="work-image-frame">
                {preparation?.failed.includes(item.id) ? <span className="work-missing">{item.title}</span> : <img src={item.thumbnail} alt={item.title} width={item.width} height={item.height} loading="eager" decoding="async" fetchPriority={index < 8 ? 'high' : 'auto'} draggable={false} />}
              </span>
            </button>
          </li>;
        })}
      </ul>
    </div>

    <dialog ref={dialogRef} className="work-viewer" aria-labelledby="work-preview-title" onCancel={event => { event.preventDefault(); closePreview(); }} onClose={closePreview} onClick={event => { if (event.target === event.currentTarget) closePreview(); }}>
      {selected && <>
        <header className="work-viewer-topbar"><span id="work-preview-title">{selected.title}</span><button type="button" onClick={closePreview} autoFocus>Close</button></header>
        <div className="work-viewer-stage" onClick={event => { if (event.target === event.currentTarget) closePreview(); }}>
          <div className="work-viewer-picture" style={{ width: `min(90vw, calc((100svh - 160px) * ${selected.width / selected.height}), 1600px)`, aspectRatio: `${selected.width} / ${selected.height}`, backgroundImage: `url("${selected.thumbnail}")` }}>
            <img key={selected.id} src={selected.preview} alt={selected.title} width={selected.width} height={selected.height} decoding="async" fetchPriority="high" draggable={false} />
          </div>
        </div>
        <footer className="work-viewer-footer">
          <button type="button" onClick={() => movePreview(-1)}>Previous image</button>
          <a href={selected.link} target="_blank" rel="noopener noreferrer">Behance</a>
          <button type="button" onClick={() => movePreview(1)}>Next image</button>
        </footer>
      </>}
    </dialog>
  </main>;
}
