import BlogCard from "./BlogCard";
import blog1 from "@/assets/blog-1.jpg";
import blog2 from "@/assets/blog-2.jpg";
import blog3 from "@/assets/blog-3.jpg";
import blog4 from "@/assets/blog-4.jpg";
import blog5 from "@/assets/blog-5.jpg";
import blog6 from "@/assets/blog-6.jpg";

const posts = [
  {
    image: blog1,
    title: "Getting Started with Macrame Wall Hangings",
    excerpt: "Learn the basic knots and techniques to create your very first macrame wall hanging. A perfect beginner project.",
    date: "Mar 8, 2026",
    category: "Tutorial",
  },
  {
    image: blog2,
    title: "DIY Macrame Plant Hangers",
    excerpt: "Bring nature indoors with these beautiful macrame plant hangers. Simple designs that add bohemian charm to any room.",
    date: "Mar 5, 2026",
    category: "DIY",
  },
  {
    image: blog3,
    title: "Mastering the Square Knot",
    excerpt: "The square knot is the foundation of macrame. Here's a step-by-step guide to perfecting this essential technique.",
    date: "Mar 1, 2026",
    category: "Tutorial",
  },
  {
    image: blog4,
    title: "Boho Dreamcatcher Macrame Fusion",
    excerpt: "Combine macrame with dreamcatcher elements for stunning wall decor that brings warmth and good vibes to your space.",
    date: "Feb 25, 2026",
    category: "Inspiration",
  },
  {
    image: blog5,
    title: "Macrame Table Runner Patterns",
    excerpt: "Elevate your dining table with handcrafted macrame table runners. Perfect for special occasions and everyday beauty.",
    date: "Feb 20, 2026",
    category: "Patterns",
  },
  {
    image: blog6,
    title: "Tiny Treasures: Macrame Keychains",
    excerpt: "Small projects, big impact. Learn to make adorable macrame keychains — great for gifts and craft markets.",
    date: "Feb 15, 2026",
    category: "DIY",
  },
];

const BlogGrid = () => {
  return (
    <section id="posts" className="container mx-auto px-4 py-16 md:py-24">
      <div className="text-center mb-12">
        <h2 className="text-3xl md:text-4xl font-display font-bold text-foreground mb-3">
          Latest Posts
        </h2>
        <p className="text-muted-foreground font-body max-w-lg mx-auto">
          Tutorials, inspiration, and everything macrame
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {posts.map((post) => (
          <BlogCard key={post.title} {...post} />
        ))}
      </div>
    </section>
  );
};

export default BlogGrid;
