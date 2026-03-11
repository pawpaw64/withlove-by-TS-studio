export interface GalleryItem {
  title: string;
  category: string;
  image: string;
  gridSpan: string;
}

const modules = import.meta.glob<GalleryItem>(
  "../../content/gallery/*.json",
  { eager: true, import: "default" }
);

export function useGalleryItems(): GalleryItem[] {
  return Object.values(modules);
}
