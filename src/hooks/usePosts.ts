import type { Post } from "@/types/post";
import { resolveCategory } from "@/lib/categories";

interface PostFile {
  title?: string;
  excerpt?: string;
  category?: string;
  date?: string;
  image?: string;
  difficulty?: string;
  timeEstimate?: string;
  materials?: string[];
  steps?: { title?: string; description?: string; image?: string }[];
  tips?: string[];
  videoTutorials?: { title?: string; youtubeUrl?: string }[];
  galleryImages?: string[];
  body?: unknown;
}

const modules = import.meta.glob<PostFile>("../../content/posts/*.json", {
  eager: true,
  import: "default",
});

export function usePosts(): Post[] {
  const posts: Post[] = [];

  for (const [path, data] of Object.entries(modules)) {
    if (!data) continue;
    const slug = path.split("/").pop()?.replace(".json", "") ?? "";
    posts.push({
      slug,
      title: data.title ?? "",
      excerpt: data.excerpt ?? "",
      category: resolveCategory(data.category),
      date: data.date ?? "",
      image: data.image ?? "",
      difficulty: data.difficulty,
      timeEstimate: data.timeEstimate,
      materials: data.materials,
      steps: data.steps as Post["steps"],
      tips: data.tips,
      videoTutorials: data.videoTutorials as Post["videoTutorials"],
      galleryImages: data.galleryImages,
      body: data.body,
    });
  }

  return posts.sort(
    (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime(),
  );
}
