import { galleryImages } from './gallery-images';

export interface GalleryPreparation { failed: number[] }
let pending: Promise<GalleryPreparation> | null = null;
let prepared: GalleryPreparation | null = null;

export function getGalleryPreparation() { return prepared; }

export function prepareGallery(retry = false): Promise<GalleryPreparation> {
  if (retry) { pending = null; prepared = null; }
  if (!pending) {
    pending = Promise.all(galleryImages.map(item => new Promise<number | null>(resolve => {
      const image = new Image();
      image.decoding = 'async';
      image.onload = () => {
        if (typeof image.decode === 'function') {
          image.decode().then(() => resolve(null), () => resolve(image.naturalWidth ? null : item.id));
        } else resolve(null);
      };
      image.onerror = () => resolve(item.id);
      image.src = item.thumbnail;
    }))).then(results => {
      prepared = { failed: results.filter((id): id is number => id !== null) };
      return prepared;
    });
  }
  return pending;
}
