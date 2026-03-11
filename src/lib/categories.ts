import type { Category } from "@/types/post";

/**
 * All category JSON files, eagerly loaded at build time.
 * Key = relative path like "../../content/categories/wall-hangings.json"
 */
const modules = import.meta.glob<{ label?: string; image?: string }>(
  "../../content/categories/*.json",
  { eager: true, import: "default" },
);

/** Parsed list of every category (built once, cached). */
let _cache: Category[] | null = null;

export function allCategories(): Category[] {
  if (_cache) return _cache;
  _cache = [];
  for (const [path, data] of Object.entries(modules)) {
    if (!data) continue;
    const id = path.split("/").pop()!.replace(".json", "");
    _cache.push({
      id,
      label: data.label ?? id,
      image: data.image ?? "",
    });
  }
  return _cache;
}

/**
 * Resolve a TinaCMS category reference path (e.g. "content/categories/wall-hangings")
 * to the human-readable label. Falls back to the slug if no match is found.
 */
export function resolveCategory(ref: string | undefined | null): string {
  if (!ref) return "";
  // Extract the slug from a reference path like "content/categories/wall-hangings"
  const slug = ref.split("/").pop()?.replace(/\.json$/, "") ?? "";
  const cat = allCategories().find((c) => c.id === slug);
  return cat?.label ?? slug;
}
