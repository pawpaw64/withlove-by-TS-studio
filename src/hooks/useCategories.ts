import type { Category } from "@/types/post";
import { allCategories } from "@/lib/categories";

export function useCategories(): Category[] {
  return allCategories();
}
