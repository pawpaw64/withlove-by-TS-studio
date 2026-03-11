export interface Post {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  image: string;
  body?: unknown;
}

export interface Category {
  id: string;
  label: string;
  image: string;
}
