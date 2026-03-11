import type { Category } from "@/types/post";

interface CategoryFile {
  categoryId?: string;
  label?: string;
  image?: string;
}

const modules = import.meta.glob<CategoryFile>(
  "../../content/categories/*.json",
  { eager: true, import: "default" },
);

export function useCategories(): Category[] {
  const categories: Category[] = [];

  for (const [path, data] of Object.entries(modules)) {
    if (!data) continue;
    const filename = path.split("/").pop()?.replace(".json", "") ?? "";
    categories.push({
      id: data.categoryId ?? filename,
      label: data.label ?? filename,
      image: data.image ?? "",
      /** the raw filename without .json so we can match references */
      _filename: filename,
    });
  }

  return categories;
}
