interface Value {
  title: string;
  description: string;
}

export interface AboutContent {
  pageSubtitle: string;
  creatorName: string;
  creatorPhoto: string;
  bioParagraph1: string;
  bioParagraph2: string;
  bioParagraph3: string;
  values: Value[];
  ctaHeading: string;
  ctaDescription: string;
  ctaButton1Label: string;
  ctaButton1Link: string;
  ctaButton2Label: string;
  ctaButton2Link: string;
}

const modules = import.meta.glob<AboutContent>(
  "../../content/about/*.json",
  { eager: true, import: "default" }
);

const entries = Object.values(modules);

export function useAboutContent(): AboutContent {
  return (
    entries[0] ?? {
      pageSubtitle: "",
      creatorName: "TS",
      creatorPhoto: "/uploads/creator.jpg",
      bioParagraph1: "",
      bioParagraph2: "",
      bioParagraph3: "",
      values: [],
      ctaHeading: "",
      ctaDescription: "",
      ctaButton1Label: "Browse Tutorials",
      ctaButton1Link: "/#posts",
      ctaButton2Label: "View Gallery",
      ctaButton2Link: "/gallery",
    }
  );
}
