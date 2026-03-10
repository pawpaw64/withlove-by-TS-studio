import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Clock, Ruler, BarChart3, Scissors } from "lucide-react";
import Header from "@/components/main_page/Header";
import Footer from "@/components/main_page/Footer";
import { posts } from "@/data/posts";

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = posts.find(p => p.slug === slug);

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
          <p className="text-primary-foreground/70 font-body text-sm mt-2">{post.date}</p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-12 max-w-4xl">
        {/* Quick info cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-12">
          {[
            { icon: BarChart3, label: "Difficulty", value: post.difficulty },
            { icon: Clock, label: "Time", value: post.timeEstimate },
            { icon: Ruler, label: "Finished Size", value: post.size },
            { icon: Scissors, label: "Materials", value: `${post.materials.length} items` },
          ].map(({ icon: Icon, label, value }) => (
            <div key={label} className="bg-card border border-border rounded-xl p-4 text-center">
              <Icon size={20} className="mx-auto text-primary mb-1" />
              <p className="text-xs text-muted-foreground font-body">{label}</p>
              <p className="font-display text-sm font-semibold text-foreground">{value}</p>
            </div>
          ))}
        </div>

        {/* Content */}
        <div className="space-y-5 mb-12">
          {post.content.map((paragraph, i) => (
            <p key={i} className="text-muted-foreground font-body leading-relaxed text-base">
              {paragraph}
            </p>
          ))}
        </div>

        {/* Materials section */}
        <div className="bg-peach/20 border border-peach/40 rounded-2xl p-6 md:p-8 mb-12">
          <h2 className="font-display text-2xl font-bold text-foreground mb-4 flex items-center gap-2">
            <Scissors size={22} className="text-primary" />
            Materials Needed
          </h2>
          <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
            {post.materials.map((material, i) => (
              <li key={i} className="flex items-start gap-2 font-body text-sm text-foreground">
                <span className="w-1.5 h-1.5 mt-2 rounded-full bg-primary shrink-0" />
                {material}
              </li>
            ))}
          </ul>
        </div>

        {/* Size info */}
        <div className="bg-blush/20 border border-blush/40 rounded-2xl p-6 md:p-8 mb-12">
          <h2 className="font-display text-2xl font-bold text-foreground mb-2 flex items-center gap-2">
            <Ruler size={22} className="text-accent" />
            Finished Size
          </h2>
          <p className="font-body text-muted-foreground">{post.size}</p>
          <div className="mt-3 flex gap-4">
            <div className="bg-card rounded-xl px-4 py-2 border border-border">
              <p className="text-xs text-muted-foreground font-body">Difficulty</p>
              <p className="font-display text-sm font-semibold text-foreground">{post.difficulty}</p>
            </div>
            <div className="bg-card rounded-xl px-4 py-2 border border-border">
              <p className="text-xs text-muted-foreground font-body">Time</p>
              <p className="font-display text-sm font-semibold text-foreground">{post.timeEstimate}</p>
            </div>
          </div>
        </div>

        {/* Tutorial steps */}
        <div className="mb-12">
          <h2 className="font-display text-2xl font-bold text-foreground mb-6">
            Step-by-Step Tutorial
          </h2>
          <div className="space-y-4">
            {post.steps.map((step, i) => (
              <div key={i} className="flex gap-4 items-start">
                <div className="w-8 h-8 rounded-full bg-primary text-primary-foreground flex items-center justify-center text-sm font-display font-bold shrink-0">
                  {i + 1}
                </div>
                <p className="font-body text-muted-foreground leading-relaxed pt-1">{step}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Tips */}
        <div className="bg-cream border border-border rounded-2xl p-6 md:p-8 mb-12">
          <h2 className="font-display text-2xl font-bold text-foreground mb-4">
            💡 Tips & Tricks
          </h2>
          <ul className="space-y-3">
            {post.tips.map((tip, i) => (
              <li key={i} className="flex items-start gap-2 font-body text-sm text-muted-foreground">
                <span className="text-primary font-bold">✦</span>
                {tip}
              </li>
            ))}
          </ul>
        </div>

        {/* Back link */}
        <div className="text-center">
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
