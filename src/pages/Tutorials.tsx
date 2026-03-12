import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import {
  Clock,
  BarChart3,
  Play,
  ListOrdered,
  Search,
  X,
  ChevronDown,
} from "lucide-react";
import Header from "@/components/main_page/Header";
import Footer from "@/components/main_page/Footer";
import { usePosts } from "@/hooks/usePosts";
import { useCategories } from "@/hooks/useCategories";
import type { Post } from "@/types/post";

/* ─── helpers ─────────────────────────────────────── */
const SORT_OPTIONS = [
  { value: "newest", label: "Newest First" },
  { value: "oldest", label: "Oldest First" },
  { value: "difficulty", label: "By Difficulty" },
  { value: "steps", label: "Most Steps" },
];

const DIFFICULTY_ORDER: Record<string, number> = {
  Beginner: 0,
  Intermediate: 1,
  Advanced: 2,
};

function sortPosts(posts: Post[], by: string): Post[] {
  const copy = [...posts];
  if (by === "newest") return copy.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  if (by === "oldest") return copy.sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
  if (by === "difficulty") return copy.sort((a, b) => (DIFFICULTY_ORDER[a.difficulty ?? ""] ?? 0) - (DIFFICULTY_ORDER[b.difficulty ?? ""] ?? 0));
  if (by === "steps") return copy.sort((a, b) => (b.steps?.length ?? 0) - (a.steps?.length ?? 0));
  return copy;
}

function difficultyColor(d?: string) {
  if (d === "Beginner") return { bg: "hsl(142 50% 88%)", color: "hsl(142 40% 30%)" };
  if (d === "Intermediate") return { bg: "hsl(40 80% 88%)", color: "hsl(40 60% 30%)" };
  if (d === "Advanced") return { bg: "hsl(0 70% 88%)", color: "hsl(0 50% 35%)" };
  return { bg: "hsl(var(--muted))", color: "hsl(var(--muted-foreground))" };
}

/* ─── animated card ───────────────────────────────── */
function TutorialCard({ post, index }: { post: Post; index: number }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold: 0.12 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const hasVideos = (post.videoTutorials?.length ?? 0) > 0;
  const stepCount = post.steps?.length ?? 0;
  const dc = difficultyColor(post.difficulty);
  const formattedDate = post.date
    ? new Date(post.date).toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" })
    : "";

  return (
    <div
      ref={ref}
      className="tut-card"
      style={{
        opacity: visible ? 1 : 0,
        transform: visible ? "translateY(0) scale(1)" : "translateY(28px) scale(0.97)",
        transition: `opacity 0.45s ease ${index * 60}ms, transform 0.45s cubic-bezier(0.34,1.2,0.64,1) ${index * 60}ms`,
      }}
    >
      <Link to={`/post/${post.slug}`} className="block group h-full">
        {/* Thumbnail */}
        <div className="relative overflow-hidden rounded-xl aspect-video bg-muted">
          <img
            src={post.image}
            alt={post.title}
            loading="lazy"
            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          />

          {/* gradient overlay */}
          <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

          {/* top-left: video badge */}
          {hasVideos && (
            <span className="absolute top-2 left-2 flex items-center gap-1 text-[10px] font-body font-semibold px-2 py-0.5 rounded-full text-white"
              style={{ background: "hsl(0 80% 50%)" }}>
              <Play size={9} fill="white" /> {post.videoTutorials!.length} video{post.videoTutorials!.length > 1 ? "s" : ""}
            </span>
          )}

          {/* top-right: step count */}
          {stepCount > 0 && (
            <span className="absolute top-2 right-2 flex items-center gap-1 text-[10px] font-body font-semibold px-2 py-0.5 rounded-full text-white"
              style={{ background: "hsl(var(--primary) / 0.85)" }}>
              <ListOrdered size={9} /> {stepCount} steps
            </span>
          )}

          {/* bottom: hover play button */}
          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="w-12 h-12 rounded-full flex items-center justify-center text-white"
              style={{ background: "hsl(var(--primary) / 0.85)", backdropFilter: "blur(4px)" }}>
              <Play size={20} fill="white" />
            </div>
          </div>
        </div>

        {/* Info */}
        <div className="pt-3 pb-1 px-0.5 flex flex-col gap-1.5">
          {/* category chip */}
          <span className="w-fit text-[10px] font-body font-medium px-2.5 py-0.5 rounded-full"
            style={{ background: "hsl(var(--primary) / 0.12)", color: "hsl(var(--primary))", border: "1px solid hsl(var(--primary) / 0.25)" }}>
            {post.category}
          </span>

          {/* title */}
          <h3 className="font-display text-sm font-semibold text-foreground leading-snug line-clamp-2 group-hover:text-primary transition-colors duration-200">
            {post.title}
          </h3>

          {/* excerpt */}
          <p className="text-xs text-muted-foreground font-body line-clamp-2 leading-relaxed">
            {post.excerpt}
          </p>

          {/* meta row */}
          <div className="flex items-center gap-2 flex-wrap mt-0.5">
            {post.difficulty && (
              <span className="inline-flex items-center gap-1 text-[10px] font-body font-medium px-2 py-0.5 rounded-full"
                style={{ background: dc.bg, color: dc.color }}>
                <BarChart3 size={9} /> {post.difficulty}
              </span>
            )}
            {post.timeEstimate && (
              <span className="inline-flex items-center gap-1 text-[10px] text-muted-foreground font-body">
                <Clock size={9} /> {post.timeEstimate}
              </span>
            )}
            <span className="ml-auto text-[10px] text-muted-foreground font-body">{formattedDate}</span>
          </div>
        </div>
      </Link>
    </div>
  );
}

/* ─── main page ───────────────────────────────────── */
const Tutorials = () => {
  const allPosts = usePosts();
  const categories = useCategories();

  // Only posts that have steps or videoTutorials (real tutorials)
  const tutorialPosts = allPosts.filter(
    (p) => (p.steps && p.steps.length > 0) || (p.videoTutorials && p.videoTutorials.length > 0)
  );

  const [activeCategory, setActiveCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("newest");
  const [sortOpen, setSortOpen] = useState(false);
  const [headerVisible, setHeaderVisible] = useState(false);

  useEffect(() => {
    requestAnimationFrame(() => setHeaderVisible(true));
  }, []);

  const categoryLabels = ["All", ...categories.map((c) => c.label)];

  const filtered = sortPosts(
    tutorialPosts.filter((p) => {
      const matchCat = activeCategory === "All" || p.category === activeCategory;
      const matchSearch = search === "" ||
        p.title.toLowerCase().includes(search.toLowerCase()) ||
        p.excerpt.toLowerCase().includes(search.toLowerCase());
      return matchCat && matchSearch;
    }),
    sortBy
  );

  const sortLabel = SORT_OPTIONS.find((o) => o.value === sortBy)?.label ?? "Sort";

  return (
    <div className="min-h-screen bg-background">
      <style>{`
        .tut-card {
          background: hsl(var(--card));
          border-radius: 14px;
          padding: 10px;
          border: 1.5px solid hsl(var(--border));
          transition: box-shadow 0.3s ease, border-color 0.3s ease, transform 0.3s ease;
        }
        .tut-card:hover {
          box-shadow: 0 8px 28px hsl(var(--primary) / 0.18);
          border-color: hsl(var(--primary) / 0.4);
          transform: translateY(-3px);
        }
        .tut-pill-active {
          background: hsl(var(--primary));
          color: hsl(var(--primary-foreground));
          border-color: hsl(var(--primary));
        }
        .tut-pill {
          background: hsl(var(--card));
          color: hsl(var(--muted-foreground));
          border-color: hsl(var(--border));
        }
        .tut-pill:hover {
          border-color: hsl(var(--primary) / 0.5);
          color: hsl(var(--primary));
        }
        .tut-sort-menu {
          animation: dropIn 0.2s cubic-bezier(0.34,1.56,0.64,1) forwards;
        }
        @keyframes dropIn {
          from { opacity: 0; transform: translateY(-8px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0)    scale(1);    }
        }
        @keyframes shimmer {
          0%   { background-position: -200% center; }
          100% { background-position: 200%  center; }
        }
        .tut-hero-title {
          background: linear-gradient(90deg, hsl(var(--primary)), hsl(var(--accent)), hsl(var(--primary)));
          background-size: 200% auto;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: shimmer 4s linear infinite;
        }
      `}</style>

      <Header />

      {/* ── Hero ── */}
      <section className="container mx-auto px-4 pt-16 pb-8 text-center">
        <div
          style={{
            opacity: headerVisible ? 1 : 0,
            transform: headerVisible ? "translateY(0)" : "translateY(20px)",
            transition: "opacity 0.6s ease, transform 0.6s cubic-bezier(0.34,1.2,0.64,1)",
          }}
        >
          <span className="inline-flex items-center gap-1.5 text-xs font-body font-medium px-3 py-1 rounded-full mb-4"
            style={{ background: "hsl(var(--primary) / 0.12)", color: "hsl(var(--primary))", border: "1px solid hsl(var(--primary) / 0.25)" }}>
            <Play size={11} fill="currentColor" /> {tutorialPosts.length} Tutorials
          </span>

          <h1 className="tut-hero-title font-display text-4xl md:text-6xl font-bold mb-3">
            Tutorials
          </h1>
          <p className="text-muted-foreground font-body italic max-w-md mx-auto mb-10">
            Step-by-step macrame guides — from beginner knots to advanced patterns
          </p>
        </div>

        {/* Search */}
        <div
          className="relative max-w-md mx-auto mb-8"
          style={{
            opacity: headerVisible ? 1 : 0,
            transform: headerVisible ? "translateY(0)" : "translateY(16px)",
            transition: "opacity 0.6s ease 0.1s, transform 0.6s cubic-bezier(0.34,1.2,0.64,1) 0.1s",
          }}
        >
          <Search size={15} className="absolute left-4 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search tutorials…"
            className="w-full pl-10 pr-10 py-2.5 rounded-full text-sm font-body bg-card border border-border focus:outline-none focus:ring-2 focus:ring-ring text-foreground placeholder:text-muted-foreground"
          />
          {search && (
            <button onClick={() => setSearch("")} className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors">
              <X size={14} />
            </button>
          )}
        </div>

        {/* Category filter pills */}
        <div
          className="flex flex-wrap justify-center gap-2 mb-4"
          style={{
            opacity: headerVisible ? 1 : 0,
            transform: headerVisible ? "translateY(0)" : "translateY(12px)",
            transition: "opacity 0.6s ease 0.18s, transform 0.6s cubic-bezier(0.34,1.2,0.64,1) 0.18s",
          }}
        >
          {categoryLabels.map((cat) => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`tut-pill px-5 py-1.5 rounded-full text-sm font-body border transition-all duration-200 ${activeCategory === cat ? "tut-pill-active" : ""}`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* ── Toolbar ── */}
      <section className="container mx-auto px-4 mb-6">
        <div className="flex items-center justify-between">
          <p className="text-sm text-muted-foreground font-body">
            <span className="font-semibold text-foreground">{filtered.length}</span> tutorial{filtered.length !== 1 ? "s" : ""}
            {activeCategory !== "All" && <> in <span className="text-primary">{activeCategory}</span></>}
            {search && <> matching "<span className="text-primary">{search}</span>"</>}
          </p>

          {/* Sort dropdown */}
          <div className="relative">
            <button
              onClick={() => setSortOpen((o) => !o)}
              className="inline-flex items-center gap-1.5 text-sm font-body px-4 py-1.5 rounded-full border transition-all duration-200 hover:border-primary/40"
              style={{ background: "hsl(var(--card))", borderColor: "hsl(var(--border))", color: "hsl(var(--muted-foreground))" }}
            >
              {sortLabel}
              <ChevronDown size={13} className={`transition-transform duration-200 ${sortOpen ? "rotate-180" : ""}`} />
            </button>
            {sortOpen && (
              <div className="tut-sort-menu absolute right-0 top-full mt-1.5 w-44 rounded-xl overflow-hidden shadow-lg z-20"
                style={{ background: "hsl(var(--card))", border: "1.5px solid hsl(var(--border))" }}>
                {SORT_OPTIONS.map((opt) => (
                  <button
                    key={opt.value}
                    onClick={() => { setSortBy(opt.value); setSortOpen(false); }}
                    className="w-full text-left px-4 py-2.5 text-sm font-body transition-colors hover:bg-primary/10 hover:text-primary"
                    style={{ color: sortBy === opt.value ? "hsl(var(--primary))" : "hsl(var(--foreground))", fontWeight: sortBy === opt.value ? 600 : 400 }}
                  >
                    {opt.label}
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ── Grid ── */}
      <section className="container mx-auto px-4 pb-24">
        {filtered.length === 0 ? (
          <div className="text-center py-24">
            <p className="font-display text-2xl text-muted-foreground mb-2">No tutorials found</p>
            <p className="text-sm text-muted-foreground font-body">Try a different category or search term.</p>
            <button
              onClick={() => { setActiveCategory("All"); setSearch(""); }}
              className="mt-6 px-6 py-2 rounded-full text-sm font-body text-primary border border-primary/40 hover:bg-primary hover:text-primary-foreground transition-all duration-200"
            >
              Clear filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {filtered.map((post, i) => (
              <TutorialCard key={post.slug} post={post} index={i} />
            ))}
          </div>
        )}
      </section>

      <Footer />
    </div>
  );
};

export default Tutorials;
