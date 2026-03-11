import { useParams, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import Header from "@/components/main_page/Header";
import Footer from "@/components/main_page/Footer";
import BlogCard from "@/components/main_page/BlogCard";
import CategoryCircle from "@/components/main_page/CategoryCircle";
import { useCategories } from "@/hooks/useCategories";
import { usePosts } from "@/hooks/usePosts";

const CategoryPage = () => {
  const { id } = useParams<{ id: string }>();
  const categories = useCategories();
  const posts = usePosts();

  const category = categories.find((c) => c.id === id);
  const filteredPosts = posts.filter((p) => {
    const match = categories.find((c) => c.id === id);
    return match ? p.category === match.label : false;
  });

  if (!category) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="container mx-auto px-4 py-24 text-center">
          <h1 className="text-3xl font-display font-bold text-foreground mb-4">Category Not Found</h1>
          <Link to="/" className="text-primary hover:underline font-body">← Back to Home</Link>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero banner */}
      <section className="relative h-56 md:h-72 overflow-hidden">
        <img src={category.image} alt={category.label} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-transparent" />
        <div className="absolute inset-0 flex flex-col items-center justify-end pb-8">
          <Link to="/" className="absolute top-6 left-6 flex items-center gap-1.5 text-sm font-body text-foreground/80 hover:text-primary transition-colors">
            <ArrowLeft className="w-4 h-4" /> Back
          </Link>
          <h1 className="text-3xl md:text-4xl font-display font-bold text-foreground">{category.label}</h1>
          <p className="text-muted-foreground font-body text-sm mt-1">
            {filteredPosts.length} {filteredPosts.length === 1 ? "piece" : "pieces"}
          </p>
        </div>
      </section>

      {/* Other categories */}
      <section className="container mx-auto px-4 pt-10 pb-4">
        <h2 className="text-center text-lg font-display font-semibold text-foreground mb-6">Browse Categories</h2>
        <div className="flex gap-5 overflow-x-auto scrollbar-hide justify-center px-2 pb-2" style={{ scrollbarWidth: "none" }}>
          {categories.map((cat) => (
            <Link key={cat.id} to={`/category/${cat.id}`}>
              <CategoryCircle category={cat} isActive={cat.id === id} onClick={() => {}} />
            </Link>
          ))}
        </div>
      </section>

      {/* Works grid */}
      <section className="container mx-auto px-4 py-12">
        <div className="text-center mb-8">
          <h2 className="text-xl md:text-2xl font-display font-semibold text-foreground mb-1">
            {category.label} Works
          </h2>
          <div className="w-16 h-0.5 bg-primary/50 mx-auto rounded-full" />
        </div>

        {filteredPosts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {filteredPosts.map((post) => (
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
        ) : (
          <div className="text-center py-16">
            <p className="text-muted-foreground font-body text-lg mb-2">No pieces yet in this category</p>
            <p className="text-muted-foreground/60 font-body text-sm">Check back soon for new creations!</p>
          </div>
        )}
      </section>

      <Footer />
    </div>
  );
};

export default CategoryPage;
