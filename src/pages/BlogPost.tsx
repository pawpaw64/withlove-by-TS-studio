import { useParams, Link } from "react-router-dom";
import { useState } from "react";
import { ArrowLeft, BookOpen, Wrench, ListOrdered, Lightbulb, Clock, BarChart3, Play, Images, X, ChevronLeft, ChevronRight } from "lucide-react";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import Header from "@/components/main_page/Header";
import Footer from "@/components/main_page/Footer";
import { resolveCategory } from "@/lib/categories";
import type { Post, TutorialStep, VideoTutorial } from "@/types/post";

interface PostFile {
  title?: string;
  excerpt?: string;
  category?: string;
  date?: string;
  image?: string;
  difficulty?: string;
  timeEstimate?: string;
  materials?: string[];
  steps?: TutorialStep[];
  tips?: string[];
  videoTutorials?: VideoTutorial[];
  galleryImages?: string[];
  body?: unknown;
}

function extractYouTubeId(url: string): string | null {
  const match = url.match(/(?:youtu\.be\/|youtube\.com\/(?:watch\?v=|embed\/))([\w-]{11})/);
  return match ? match[1] : null;
}

const modules = import.meta.glob<PostFile>("../../content/posts/*.json", {
  eager: true,
  import: "default",
});

interface BodyNode {
  type: string;
  children?: BodyNode[];
  text?: string;
  bold?: boolean;
}

interface BodyRoot {
  type: "root";
  children: BodyNode[];
}

// Split the rich-text body into named sections based on h2 headings
function splitSections(body: unknown): { intro: BodyRoot; sections: { title: string; icon: React.ReactNode; content: BodyRoot }[] } {
  const root = body as BodyRoot | undefined;
  if (!root?.children) return { intro: { type: "root", children: [] }, sections: [] };

  const introChildren: BodyNode[] = [];
  const sections: { title: string; icon: React.ReactNode; content: BodyRoot }[] = [];
  let current: { title: string; children: BodyNode[] } | null = null;

  for (const node of root.children) {
    if (node.type === "h2") {
      if (current) {
        sections.push({ title: current.title, icon: getIcon(current.title), content: { type: "root", children: current.children } });
      }
      const title = extractText(node);
      current = { title, children: [] };
    } else if (current) {
      current.children.push(node);
    } else {
      introChildren.push(node);
    }
  }
  if (current) {
    sections.push({ title: current.title, icon: getIcon(current.title), content: { type: "root", children: current.children } });
  }

  return { intro: { type: "root", children: introChildren }, sections };
}

function extractText(node: BodyNode): string {
  if (node.text) return node.text;
  return node.children?.map(extractText).join("") ?? "";
}

function getIcon(title: string): React.ReactNode {
  const t = title.toLowerCase();
  if (t.includes("material")) return <Wrench className="w-5 h-5" />;
  if (t.includes("step") || t.includes("tutorial")) return <ListOrdered className="w-5 h-5" />;
  if (t.includes("tip")) return <Lightbulb className="w-5 h-5" />;
  return <BookOpen className="w-5 h-5" />;
}

function getPost(slug: string | undefined): Post | undefined {
  if (!slug) return undefined;
  for (const [path, data] of Object.entries(modules)) {
    const filename = path.split("/").pop()?.replace(".json", "") ?? "";
    if (filename === slug && data) {
      return {
        slug: filename,
        title: data.title ?? "",
        excerpt: data.excerpt ?? "",
        category: resolveCategory(data.category),
        date: data.date ?? "",
        image: data.image ?? "",
        difficulty: data.difficulty,
        timeEstimate: data.timeEstimate,
        materials: data.materials,
        steps: data.steps,
        tips: data.tips,
        videoTutorials: data.videoTutorials,
        galleryImages: data.galleryImages,
        body: data.body,
      };
    }
  }
  return undefined;
}

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = getPost(slug);
  const [openSection, setOpenSection] = useState<number>(0);
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const galleryImages = post.galleryImages?.filter(Boolean) ?? [];

  if (!post) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <h1 className="font-display text-3xl text-foreground mb-4">Post not found</h1>
          <Link to="/" className="text-primary hover:underline font-body">← Back to Home</Link>
        </div>
      </div>
    );
  }

  const formattedDate = post.date
    ? new Date(post.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
    : "";

  const { intro, sections } = splitSections(post.body);

  return (
    <div className="min-h-screen blog-post-theme" style={{
      "--bp-bg": "340 30% 97%",
      "--bp-card": "340 35% 94%",
      "--bp-accent": "345 55% 80%",
      "--bp-accent-strong": "345 60% 70%",
      "--bp-muted": "340 20% 55%",
      "--bp-fg": "340 25% 18%",
      "--bp-border": "340 30% 88%",
    } as React.CSSProperties}>
      <div style={{ background: "hsl(var(--bp-bg))" }}>
        <Header />

        {/* Hero image */}
        <div className="relative h-[40vh] md:h-[50vh] overflow-hidden">
          <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
          <div className="absolute inset-0" style={{ background: "linear-gradient(to top, hsl(var(--bp-bg)), hsl(var(--bp-bg) / 0.3), transparent)" }} />
          <div className="absolute bottom-0 left-0 right-0 container mx-auto px-4 pb-8">
            <Link to="/" className="inline-flex items-center gap-1 text-sm opacity-80 hover:opacity-100 font-body mb-3 transition-opacity" style={{ color: "hsl(var(--primary-foreground))" }}>
              <ArrowLeft size={16} /> Back to Blog
            </Link>
            <span className="block text-xs font-body px-3 py-1 rounded-full w-fit mb-2 backdrop-blur-sm" style={{ background: "hsl(var(--bp-accent-strong) / 0.6)", color: "white" }}>
              {post.category}
            </span>
            <h1 className="font-display text-3xl md:text-5xl font-bold max-w-3xl" style={{ color: "hsl(var(--primary-foreground))" }}>
              {post.title}
            </h1>
            <p className="text-sm mt-2 font-body" style={{ color: "hsl(var(--primary-foreground) / 0.7)" }}>{formattedDate}</p>
          </div>
        </div>

        <div className="container mx-auto px-4 py-12 max-w-6xl">
         <div className={galleryImages.length > 0 ? "flex flex-col lg:flex-row gap-8" : ""}>
          {/* Main content */}
          <div className={galleryImages.length > 0 ? "flex-1 min-w-0" : "max-w-4xl mx-auto w-full"}>
          {/* Difficulty & Time badges */}
          {(post.difficulty || post.timeEstimate) && (
            <div className="flex flex-wrap gap-3 mb-8">
              {post.difficulty && (
                <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-body font-medium" style={{ background: "hsl(var(--bp-card))", color: "hsl(var(--bp-accent-strong))", border: "1.5px solid hsl(var(--bp-border))" }}>
                  <BarChart3 size={15} /> {post.difficulty}
                </span>
              )}
              {post.timeEstimate && (
                <span className="inline-flex items-center gap-1.5 px-4 py-2 rounded-full text-sm font-body font-medium" style={{ background: "hsl(var(--bp-card))", color: "hsl(var(--bp-accent-strong))", border: "1.5px solid hsl(var(--bp-border))" }}>
                  <Clock size={15} /> {post.timeEstimate}
                </span>
              )}
            </div>
          )}

          {/* Intro */}
          {intro.children.length > 0 && (
            <div className="prose prose-lg max-w-none font-body mb-10 prose-headings:font-display" style={{ color: "hsl(var(--bp-muted))" }}>
              <TinaMarkdown content={intro as Parameters<typeof TinaMarkdown>[0]["content"]} />
            </div>
          )}

          {/* Materials */}
          {post.materials && post.materials.length > 0 && (
            <div className="rounded-2xl p-6 mb-8" style={{ background: "hsl(var(--bp-card))", border: "1.5px solid hsl(var(--bp-border))" }}>
              <h3 className="font-display text-lg font-semibold flex items-center gap-2 mb-4" style={{ color: "hsl(var(--bp-fg))" }}>
                <Wrench size={18} style={{ color: "hsl(var(--bp-accent-strong))" }} /> Materials Needed
              </h3>
              <ul className="space-y-2 font-body text-sm" style={{ color: "hsl(var(--bp-muted))" }}>
                {post.materials.map((m, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0" style={{ background: "hsl(var(--bp-accent-strong))" }} />
                    {m}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Tutorial Steps */}
          {post.steps && post.steps.length > 0 && (
            <div className="mb-8">
              <h3 className="font-display text-lg font-semibold flex items-center gap-2 mb-5" style={{ color: "hsl(var(--bp-fg))" }}>
                <ListOrdered size={18} style={{ color: "hsl(var(--bp-accent-strong))" }} /> Step-by-Step Tutorial
              </h3>
              <div className="space-y-5">
                {post.steps.map((step, i) => (
                  <div key={i} className="rounded-2xl p-5 flex gap-4" style={{ background: "hsl(var(--bp-card))", border: "1.5px solid hsl(var(--bp-border))" }}>
                    <span className="flex items-center justify-center w-8 h-8 rounded-full shrink-0 text-sm font-bold text-white" style={{ background: "hsl(var(--bp-accent-strong))" }}>
                      {i + 1}
                    </span>
                    <div className="flex-1">
                      <h4 className="font-display font-semibold mb-1" style={{ color: "hsl(var(--bp-fg))" }}>{step.title}</h4>
                      <p className="font-body text-sm" style={{ color: "hsl(var(--bp-muted))" }}>{step.description}</p>
                      {step.image && (
                        <img src={step.image} alt={step.title} className="mt-3 rounded-xl w-full max-h-64 object-cover" />
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Tips */}
          {post.tips && post.tips.length > 0 && (
            <div className="rounded-2xl p-6 mb-8" style={{ background: "hsl(var(--bp-accent) / 0.15)", border: "1.5px solid hsl(var(--bp-border))" }}>
              <h3 className="font-display text-lg font-semibold flex items-center gap-2 mb-4" style={{ color: "hsl(var(--bp-fg))" }}>
                <Lightbulb size={18} style={{ color: "hsl(var(--bp-accent-strong))" }} /> Tips & Tricks
              </h3>
              <ul className="space-y-2 font-body text-sm" style={{ color: "hsl(var(--bp-muted))" }}>
                {post.tips.map((tip, i) => (
                  <li key={i} className="flex items-start gap-2">
                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0" style={{ background: "hsl(var(--bp-accent-strong))" }} />
                    {tip}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Video Tutorials */}
          {post.videoTutorials && post.videoTutorials.length > 0 && (
            <div className="mb-8">
              <h3 className="font-display text-lg font-semibold flex items-center gap-2 mb-5" style={{ color: "hsl(var(--bp-fg))" }}>
                <Play size={18} style={{ color: "hsl(var(--bp-accent-strong))" }} /> Video Tutorials
              </h3>
              <div className="grid gap-5">
                {post.videoTutorials.map((vid, i) => {
                  const videoId = extractYouTubeId(vid.youtubeUrl);
                  if (!videoId) return null;
                  return (
                    <div key={i} className="rounded-2xl overflow-hidden" style={{ background: "hsl(var(--bp-card))", border: "1.5px solid hsl(var(--bp-border))" }}>
                      <div className="aspect-video">
                        <iframe
                          src={`https://www.youtube-nocookie.com/embed/${videoId}`}
                          title={vid.title}
                          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                          allowFullScreen
                          className="w-full h-full"
                        />
                      </div>
                      <p className="px-5 py-3 font-display font-semibold text-sm" style={{ color: "hsl(var(--bp-fg))" }}>{vid.title}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Sections as expandable cards */}
          <div className="space-y-4">
            {sections.map((section, i) => {
              const isOpen = openSection === i;
              return (
                <div
                  key={i}
                  className="rounded-2xl overflow-hidden transition-all duration-300"
                  style={{
                    background: isOpen ? "hsl(var(--bp-card))" : "hsl(var(--bp-bg))",
                    border: `1.5px solid hsl(var(--bp-border))`,
                  }}
                >
                  <button
                    onClick={() => setOpenSection(isOpen ? -1 : i)}
                    className="w-full flex items-center gap-3 px-6 py-4 text-left transition-colors hover:opacity-90"
                  >
                    <span
                      className="flex items-center justify-center w-10 h-10 rounded-full shrink-0"
                      style={{ background: "hsl(var(--bp-accent) / 0.35)", color: "hsl(var(--bp-accent-strong))" }}
                    >
                      {section.icon}
                    </span>
                    <span className="font-display text-lg font-semibold flex-1" style={{ color: "hsl(var(--bp-fg))" }}>
                      {section.title}
                    </span>
                    <span
                      className="text-xl transition-transform duration-300"
                      style={{ transform: isOpen ? "rotate(45deg)" : "rotate(0deg)", color: "hsl(var(--bp-accent-strong))" }}
                    >
                      +
                    </span>
                  </button>

                  <div
                    className="transition-all duration-300 overflow-hidden"
                    style={{ maxHeight: isOpen ? "2000px" : "0px", opacity: isOpen ? 1 : 0 }}
                  >
                    <div className="px-6 pb-6 prose prose-lg max-w-none font-body prose-headings:font-display prose-strong:font-semibold" style={{ color: "hsl(var(--bp-muted))" }}>
                      <TinaMarkdown content={section.content as Parameters<typeof TinaMarkdown>[0]["content"]} />
                    </div>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Back link */}
          <div className="text-center mt-12">
            <Link
              to="/"
              className="inline-flex items-center gap-2 px-8 py-3 rounded-full font-body hover:opacity-90 transition-opacity text-white"
              style={{ background: "hsl(var(--bp-accent-strong))" }}
            >
              <ArrowLeft size={16} /> Back to All Posts
            </Link>
          </div>
          </div>{/* end main content */}

          {/* Side Gallery */}
          {galleryImages.length > 0 && (
            <aside className="lg:w-80 xl:w-96 shrink-0">
              <div className="lg:sticky lg:top-8">
                <h3 className="font-display text-lg font-semibold flex items-center gap-2 mb-4" style={{ color: "hsl(var(--bp-fg))" }}>
                  <Images size={18} style={{ color: "hsl(var(--bp-accent-strong))" }} /> Gallery
                </h3>
                <div className="grid grid-cols-2 lg:grid-cols-1 gap-3">
                  {galleryImages.map((img, i) => (
                    <button
                      key={i}
                      onClick={() => setLightboxIndex(i)}
                      className="rounded-xl overflow-hidden transition-transform hover:scale-[1.03] focus:outline-none focus:ring-2 focus:ring-offset-2"
                      style={{ border: "1.5px solid hsl(var(--bp-border))", focusRingColor: "hsl(var(--bp-accent-strong))" } as React.CSSProperties}
                    >
                      <img src={img} alt={`Gallery image ${i + 1}`} className="w-full aspect-[4/3] object-cover" loading="lazy" />
                    </button>
                  ))}
                </div>
              </div>
            </aside>
          )}
         </div>{/* end flex row */}
        </div>

        {/* Lightbox overlay */}
        {lightboxIndex !== null && galleryImages.length > 0 && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm"
            onClick={() => setLightboxIndex(null)}
          >
            <button
              onClick={() => setLightboxIndex(null)}
              className="absolute top-4 right-4 text-white/80 hover:text-white transition-colors z-10"
              aria-label="Close lightbox"
            >
              <X size={28} />
            </button>

            {galleryImages.length > 1 && (
              <>
                <button
                  onClick={(e) => { e.stopPropagation(); setLightboxIndex((lightboxIndex - 1 + galleryImages.length) % galleryImages.length); }}
                  className="absolute left-4 text-white/80 hover:text-white transition-colors z-10"
                  aria-label="Previous image"
                >
                  <ChevronLeft size={36} />
                </button>
                <button
                  onClick={(e) => { e.stopPropagation(); setLightboxIndex((lightboxIndex + 1) % galleryImages.length); }}
                  className="absolute right-4 text-white/80 hover:text-white transition-colors z-10"
                  aria-label="Next image"
                >
                  <ChevronRight size={36} />
                </button>
              </>
            )}

            <img
              src={galleryImages[lightboxIndex]}
              alt={`Gallery image ${lightboxIndex + 1}`}
              className="max-h-[85vh] max-w-[90vw] rounded-xl object-contain shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            />

            <span className="absolute bottom-4 text-white/60 text-sm font-body">
              {lightboxIndex + 1} / {galleryImages.length}
            </span>
          </div>
        )}

        <Footer />
      </div>
    </div>
  );
};

export default BlogPost;
