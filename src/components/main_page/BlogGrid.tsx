import BlogCard from "./BlogCard";
import { posts } from "@/data/posts";

const BlogGrid = () => {
  return (
    <section id="posts" className="container mx-auto px-4 py-16 md:py-16">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-3">
          Explore Macrame Pieces
        </h2>
        <p className="text-muted-foreground font-body italic max-w-lg mx-auto">
          Tutorials, inspiration, and everything macrame
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((post) => (
          <BlogCard key={post.slug} slug={post.slug} image={post.image} title={post.title} excerpt={post.excerpt} date={post.date} category={post.category} />
        ))}
      </div>
    </section>
  );
};

export default BlogGrid;
