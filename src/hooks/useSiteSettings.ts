interface FooterLink {
  label: string;
  href: string;
}

export interface SocialLink {
  platform: string;
  label: string;
  url: string;
}

interface SiteSettings {
  brandName: string;
  heroImage: string;
  heroSubtitle: string;
  heroCtaText: string;
  heroCtaLink: string;
  blogSectionTitle: string;
  blogSectionSubtitle: string;
  footerDescription: string;
  facebookUrl: string;
  socialLinks: SocialLink[];
  newsletterTitle: string;
  newsletterDescription: string;
  emailPlaceholder: string;
  copyrightText: string;
  footerLinks: FooterLink[];
}

const modules = import.meta.glob<SiteSettings>(
  "../../content/site/*.json",
  { eager: true, import: "default" }
);

const entries = Object.values(modules);

export function useSiteSettings(): SiteSettings {
  return (
    entries[0] ?? {
      brandName: "withlovebyts",
      heroImage: "/uploads/watercolor-hero.jpg",
      heroSubtitle: "",
      heroCtaText: "Explore Works",
      heroCtaLink: "#posts",
      blogSectionTitle: "Explore Macrame Pieces",
      blogSectionSubtitle: "",
      footerDescription: "",
      facebookUrl: "",
      socialLinks: [],
      newsletterTitle: "Subscribe to Newsletter",
      newsletterDescription: "",
      emailPlaceholder: "",
      copyrightText: "by withlovebyts",
      footerLinks: [],
    }
  );
}
