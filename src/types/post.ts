export interface TutorialStep {
  title: string;
  description: string;
  image?: string;
}

export interface VideoTutorial {
  title: string;
  youtubeUrl: string;
}

export interface Post {
  slug: string;
  title: string;
  excerpt: string;
  category: string;
  date: string;
  image: string;
  difficulty?: string;
  timeEstimate?: string;
  materials?: string[];
  steps?: TutorialStep[];
  tips?: string[];
  videoTutorials?: VideoTutorial[];
  galleryImages?: string[];
  body?: unknown;
}

/** A category from content/categories/*.json */
export interface Category {
  /** Filename without .json — used for reference matching */
  id: string;
  label: string;
  image: string;
}
