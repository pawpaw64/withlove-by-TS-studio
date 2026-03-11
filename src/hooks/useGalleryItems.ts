import { usePosts } from "./usePosts";

export interface GalleryItem {
  title: string;
  category: string;
  image: string;
  gridSpan: string;
  /** Where this item came from */
  source?: "manual" | "bulk" | "post";
  /** If source is "post", the slug of that post */
  postSlug?: string;
}

/* ── 1. Manual gallery items (content/gallery/*.json) ── */

const manualModules = import.meta.glob<GalleryItem>(
  "../../content/gallery/*.json",
  { eager: true, import: "default" }
);

/* ── 2. Bulk-import batches (content/gallery-bulk/*.json) ── */

interface BulkGalleryFile {
  folderName?: string;
  category?: string;
  defaultGridSpan?: string;
  images?: string[];
}

const bulkModules = import.meta.glob<BulkGalleryFile>(
  "../../content/gallery-bulk/*.json",
  { eager: true, import: "default" }
);

/* ── helper: derive a human title from a filename ── */

function titleFromPath(imgPath: string): string {
  const name = imgPath.split("/").pop()?.replace(/\.\w+$/, "") ?? "";
  return name
    .replace(/[-_]+/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

/* ── hook ── */

export function useGalleryItems(): GalleryItem[] {
  const posts = usePosts();

  // --- source 1: manual gallery entries ---
  const manual: GalleryItem[] = Object.values(manualModules).map((item) => ({
    ...item,
    source: "manual" as const,
  }));

  // --- source 2: bulk-import batches ---
  const bulk: GalleryItem[] = [];
  for (const data of Object.values(bulkModules)) {
    if (!data?.images?.length) continue;
    for (const img of data.images) {
      if (!img) continue;
      bulk.push({
        title: titleFromPath(img),
        category: data.category || "Uncategorized",
        image: img,
        gridSpan: data.defaultGridSpan ?? "",
        source: "bulk",
      });
    }
  }

  // --- source 3: blog-post images (cover + galleryImages) ---
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

  // --- merge & deduplicate (manual wins over bulk wins over post) ---
  const seen = new Set<string>();
  const result: GalleryItem[] = [];

  for (const item of [...manual, ...bulk, ...postItems]) {
    if (!item.image || seen.has(item.image)) continue;
    seen.add(item.image);
    result.push(item);
  }

  return result;
}
