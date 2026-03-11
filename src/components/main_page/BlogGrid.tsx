import { useState, useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import BlogCard from "./BlogCard";
import CategoryCircle from "./CategoryCircle";
import { usePosts } from "@/hooks/usePosts";
import { useCategories } from "@/hooks/useCategories";
import { useSiteSettings } from "@/hooks/useSiteSettings";

const BlogGrid = () => {
  const posts = usePosts();
  const categories = useCategories();
  const site = useSiteSettings();
  const [activeCategory, setActiveCategory] = useState<string | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const [isHovering, setIsHovering] = useState(false);

  const scroll = (direction: "left" | "right") => {
    if (scrollRef.current) {
      const scrollAmount = 300;
      scrollRef.current.scrollBy({
        left: direction === "left" ? -scrollAmount : scrollAmount,
        behavior: "smooth",
      });
    }
  };

  return (
    <section id="posts" className="container mx-auto px-4 py-16 md:py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-3">
          {site.blogSectionTitle}
        </h2>
        <p className="text-muted-foreground font-body italic max-w-lg mx-auto">
          {site.blogSectionSubtitle}
        </p>
      </div>

      {/* Category circles - horizontal scrollable with floating animation */}
      <div className="relative w-full mb-12">
        {/* Scroll buttons */}
        <button
          onClick={() => scroll("left")}
          className="absolute -left-3 md:-left-6 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-card border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-colors shadow-sm"
          aria-label="Scroll left"
        >
          <ChevronLeft className="w-4 h-4" />
        </button>
        <button
          onClick={() => scroll("right")}
          className="absolute -right-3 md:-right-6 top-1/2 -translate-y-1/2 z-10 w-8 h-8 rounded-full bg-card border border-border flex items-center justify-center text-muted-foreground hover:text-primary hover:border-primary transition-colors shadow-sm"
          aria-label="Scroll right"
        >
          <ChevronRight className="w-4 h-4" />
        </button>

        {/* Scrollable container */}
        <div
          ref={scrollRef}
          className="flex gap-6 md:gap-8 overflow-x-auto scrollbar-hide px-4 py-2"
          style={{ scrollbarWidth: "none", msOverflowStyle: "none" }}
          onMouseEnter={() => setIsHovering(true)}
          onMouseLeave={() => setIsHovering(false)}
        >
          {/* "All" category with floating animation */}
          <button
            onClick={() => setActiveCategory(null)}
            className="flex flex-col items-center gap-2.5 group flex-shrink-0"
          >
            <div
              className={`relative w-20 h-20 md:w-24 md:h-24 rounded-full p-1 transition-all duration-300 flex items-center justify-center bg-card border-2 ${
                activeCategory === null
                  ? "border-primary ring-2 ring-primary ring-offset-2 ring-offset-background"
                  : "border-border group-hover:border-primary/50"
              } ${!isHovering ? "animate-float" : ""}`}
              style={{
                animation: !isHovering ? "float 3s ease-in-out infinite" : "none",
              }}
            >
              <span className="font-display text-lg md:text-xl font-semibold text-primary">All</span>
            </div>
            <span
              className={`text-xs md:text-sm font-body font-medium transition-colors whitespace-nowrap ${
                activeCategory === null ? "text-primary" : "text-muted-foreground group-hover:text-foreground"
              }`}
            >
              All Pieces
            </span>
          </button>

          {categories.map((cat, index) => (
            <div
              key={cat.id}
              className={`${!isHovering ? "animate-float" : ""}`}
              style={{
                animation: !isHovering ? `float ${3 + index * 0.2}s ease-in-out infinite` : "none",
                animationDelay: !isHovering ? `${index * 0.15}s` : "0s",
              }}
            >
              <CategoryCircle
                category={cat}
                isActive={activeCategory === cat.id}
                onClick={setActiveCategory}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Featured Works */}
      <div className="text-center mb-8">
        <h3 className="text-xl md:text-2xl font-display font-semibold text-foreground mb-1">
          {activeCategory
            ? categories.find((c) => c.id === activeCategory)?.label
            : "Featured Works"}
        </h3>
        <div className="w-16 h-0.5 bg-primary/50 mx-auto rounded-full" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
        {posts
          .filter((post) => {
            if (!activeCategory) return true;
            const activeCatLabel = categories.find((c) => c.id === activeCategory)?.label;
            return post.category === activeCatLabel;
          })
          .map((post) => (
            <BlogCard
              key={post.slug}
              slug={post.slug}
              image={post.image}
              title={post.title}
              excerpt={post.excerpt}
              date={post.date}
              category={post.category}
            />
          ))}
      </div>

      <style>{`
        @keyframes float {
          0% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
          100% {
            transform: translateY(0px);
          }
        }
        
        .animate-float {
          animation: float 3s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
};

export default BlogGrid;