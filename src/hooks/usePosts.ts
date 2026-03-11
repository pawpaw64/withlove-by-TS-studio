import type { Post } from "@/types/post";
import { useCategories } from "./useCategories";

interface PostFile {
  title?: string;
  excerpt?: string;
  category?: string;
  date?: string;
  image?: string;
  galleryImages?: string[];
  body?: unknown;
}

const modules = import.meta.glob<PostFile>("../../content/posts/*.json", {
  eager: true,
  import: "default",
});

export function usePosts(): Post[] {
  const categories = useCategories();
  const posts: Post[] = [];

  for (const [path, data] of Object.entries(modules)) {
    if (!data) continue;
    const filename = path.split("/").pop()?.replace(".json", "") ?? "";
    // category is stored as a reference path like "content/categories/wall-hangings" or "content/categories/wall-hangings.json"
    const catRef = data.category ?? "";
    // strip .json suffix if present, then get the slug
    const catSlug = catRef.split("/").pop()?.replace(/\.json$/, "") ?? "";
    // match by categoryId first, then by filename
    const cat = categories.find(
      (c) => c.id === catSlug || c._filename === catSlug
    );
    const catLabel = cat?.label || catSlug;
    posts.push({
      slug: filename,
      title: data.title ?? "",
      excerpt: data.excerpt ?? "",
      category: catLabel,
      date: data.date ?? "",
      image: data.image ?? "",
      galleryImages: data.galleryImages,
      body: data.body,
    });
  }

  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}
