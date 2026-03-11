import { useState } from "react";
import { X } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/main_page/Header";
import Footer from "@/components/main_page/Footer";
import { useGalleryItems } from "@/hooks/useGalleryItems";

const Gallery = () => {
  const galleryItems = useGalleryItems();
  const [activeCategory, setActiveCategory] = useState("All");
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);

  const categories = ["All", ...Array.from(new Set(galleryItems.map(i => i.category)))];
  const filtered = activeCategory === "All" ? galleryItems : galleryItems.filter(i => i.category === activeCategory);

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Hero */}
      <section className="container mx-auto px-4 pt-16 pb-8 text-center">
        <h1 className="font-display text-4xl md:text-6xl font-bold text-foreground mb-3">
          Gallery
        </h1>
        <p className="text-muted-foreground font-body italic max-w-md mx-auto mb-8">
          A curated collection of handcrafted macrame pieces
        </p>

        {/* Category filter pills */}
        <div className="flex flex-wrap justify-center gap-2 mb-12">
          {categories.map(cat => (
            <button
              key={cat}
              onClick={() => setActiveCategory(cat)}
              className={`px-5 py-1.5 rounded-full text-sm font-body transition-all duration-300 border ${
                activeCategory === cat
                  ? "bg-primary text-primary-foreground border-primary"
                  : "bg-card text-muted-foreground border-border hover:border-primary/40"
              }`}
            >
              {cat}
            </button>
          ))}
        </div>
      </section>

      {/* Masonry-style grid */}
      <section className="container mx-auto px-4 pb-24">
        <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
          {filtered.map((item, idx) => (
            <div
              key={item.title}
              onClick={() => setLightboxIndex(idx)}
              className="break-inside-avoid group cursor-pointer relative overflow-hidden rounded-xl border border-border"
            >
              <img
                src={item.image}
                alt={item.title}
                loading="lazy"
                className="w-full object-cover group-hover:scale-105 transition-transform duration-500"
              />
              {/* Overlay on hover */}
              <div className="absolute inset-0 bg-gradient-to-t from-foreground/70 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                <span className="text-xs font-body text-peach bg-foreground/30 px-2 py-0.5 rounded-full w-fit mb-1 backdrop-blur-sm">
                  {item.category}
                </span>
                <h3 className="font-display text-lg text-primary-foreground font-semibold">
                  {item.title}
                </h3>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Lightbox */}
      {lightboxIndex !== null && (
        <div
          className="fixed inset-0 z-50 bg-foreground/80 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setLightboxIndex(null)}
        >
          <button
            className="absolute top-6 right-6 text-primary-foreground hover:text-primary transition-colors"
            onClick={() => setLightboxIndex(null)}
          >
            <X size={32} />
          </button>
          <img
            src={filtered[lightboxIndex].image}
            alt={filtered[lightboxIndex].title}
            className="max-h-[85vh] max-w-[90vw] object-contain rounded-xl shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />
          <div className="absolute bottom-8 text-center" onClick={(e) => e.stopPropagation()}>
            <h3 className="font-display text-xl text-primary-foreground font-semibold">
              {filtered[lightboxIndex].title}
            </h3>
            <span className="text-sm text-peach font-body">{filtered[lightboxIndex].category}</span>
          </div>
        </div>
      )}

      <Footer />
    </div>
  );
};

export default Gallery;
