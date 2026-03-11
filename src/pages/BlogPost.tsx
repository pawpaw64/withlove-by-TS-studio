import { useParams, Link } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { TinaMarkdown } from "tinacms/dist/rich-text";
import Header from "@/components/main_page/Header";
import Footer from "@/components/main_page/Footer";
import type { Post } from "@/types/post";

interface PostFile {
  title?: string;
  excerpt?: string;
  category?: string;
  date?: string;
  image?: string;
  body?: unknown;
}

const modules = import.meta.glob<PostFile>("../../content/posts/*.json", {
  eager: true,
  import: "default",
});

function getPost(slug: string | undefined): Post | undefined {
  if (!slug) return undefined;
  for (const [path, data] of Object.entries(modules)) {
    const filename = path.split("/").pop()?.replace(".json", "") ?? "";
    if (filename === slug && data) {
      return {
        slug: filename,
        title: data.title ?? "",
        excerpt: data.excerpt ?? "",
        category: data.category ?? "",
        date: data.date ?? "",
        image: data.image ?? "",
        body: data.body,
      };
    }
  }
  return undefined;
}

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = getPost(slug);

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

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero image */}
      <div className="relative h-[40vh] md:h-[50vh] overflow-hidden">
        <img src={post.image} alt={post.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/30 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 container mx-auto px-4 pb-8">
          <Link to="/" className="inline-flex items-center gap-1 text-sm text-primary-foreground/80 hover:text-primary-foreground font-body mb-3 transition-colors">
            <ArrowLeft size={16} /> Back to Blog
          </Link>
          <span className="block text-xs font-body text-peach bg-foreground/30 px-3 py-1 rounded-full w-fit mb-2 backdrop-blur-sm">
            {post.category}
          </span>
          <h1 className="font-display text-3xl md:text-5xl font-bold text-primary-foreground max-w-3xl">
            {post.title}
          </h1>
          <p className="text-primary-foreground/70 font-body text-sm mt-2">{formattedDate}</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 max-w-4xl">
        {/* Rich-text body */}
        <div className="prose prose-lg max-w-none font-body text-muted-foreground prose-headings:font-display prose-headings:text-foreground prose-strong:text-foreground prose-a:text-primary">
          {post.body ? (
            <TinaMarkdown content={post.body as Parameters<typeof TinaMarkdown>[0]["content"]} />
          ) : (
            <p className="italic">No content yet.</p>
          )}
        </div>

        {/* Back link */}
        <div className="text-center mt-12">
          <Link
            to="/"
            className="inline-flex items-center gap-2 bg-primary text-primary-foreground px-8 py-3 rounded-full font-body hover:opacity-90 transition-opacity"
          >
            <ArrowLeft size={16} /> Back to All Posts
          </Link>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default BlogPost;
