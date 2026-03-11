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

export interface Category {
  id: string;
  label: string;
  image: string;
  /** raw filename (without .json) for reference matching */
  _filename?: string;
}
