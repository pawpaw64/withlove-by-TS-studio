import type { Post } from "@/types/post";

interface PostFile {
  title?: string;
  excerpt?: string;
  category?: string;
  date?: string;
  image?: string;
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
    const filename = path.split("/").pop()?.replace(".json", "") ?? "";
    posts.push({
      slug: filename,
      title: data.title ?? "",
      excerpt: data.excerpt ?? "",
      category: data.category ?? "",
      date: data.date ?? "",
      image: data.image ?? "",
      body: data.body,
    });
  }

  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}
