import { usePosts } from "./usePosts";
import { resolveCategory } from "@/lib/categories";

export interface GalleryItem {
  title: string;
  category: string;
  image: string;
  gridSpan: string;
  /** Where this item came from */
  source: "gallery" | "post";
  /** If source is "post", the slug of that post */
  postSlug?: string;
}

/* ── Manual gallery items (content/gallery/*.json) ── */

interface GalleryFile {
  title?: string;
  category?: string; // TinaCMS reference path
  image?: string;
  gridSpan?: string;
}

const galleryModules = import.meta.glob<GalleryFile>(
  "../../content/gallery/*.json",
  { eager: true, import: "default" },
);

/* ── Hook ── */

export function useGalleryItems(): GalleryItem[] {
  const posts = usePosts();

  // --- source 1: manual gallery entries ---
  const manual: GalleryItem[] = Object.values(galleryModules)
    .filter(Boolean)
    .map((item) => ({
      title: item.title ?? "",
      category: resolveCategory(item.category),
      image: item.image ?? "",
      gridSpan: item.gridSpan ?? "",
      source: "gallery" as const,
    }));

  // --- source 2: blog-post images (cover + galleryImages) ---
  const postItems: GalleryItem[] = [];
  for (const post of posts) {
    if (post.image) {
      postItems.push({
        title: post.title,
        category: post.category,
        image: post.image,
        gridSpan: "",
        source: "post",
        postSlug: post.slug,
      });
    }
    if (post.galleryImages) {
      for (let i = 0; i < post.galleryImages.length; i++) {
        const img = post.galleryImages[i];
        if (!img) continue;
        postItems.push({
          title: `${post.title} (${i + 1})`,
          category: post.category,
          image: img,
          gridSpan: "",
          source: "post",
          postSlug: post.slug,
        });
      }
    }
  }

  // --- merge & deduplicate (gallery-first wins over post) ---
  const seen = new Set<string>();
  const result: GalleryItem[] = [];

  for (const item of [...manual, ...postItems]) {
    if (!item.image || seen.has(item.image)) continue;
    seen.add(item.image);
    result.push(item);
  }

  return result;
}
