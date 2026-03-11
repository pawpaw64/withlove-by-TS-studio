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

  for (const [, data] of Object.entries(modules)) {
    if (!data) continue;
    categories.push({
      id: data.categoryId ?? "",
      label: data.label ?? "",
      image: data.image ?? "",
    });
  }

  return categories;
}
