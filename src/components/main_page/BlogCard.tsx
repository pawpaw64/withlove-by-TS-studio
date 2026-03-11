import { Link } from "react-router-dom";

interface BlogCardProps {
  slug: string;
  image: string;
  title: string;
  excerpt: string;
  date: string;
  category: string;
}

const BlogCard = ({ slug, image, title, excerpt, date, category }: BlogCardProps) => {
  return (
    <article className="group">
      <Link to={`/post/${slug}`} className="block">
        {/* Frame container */}
        <div className="relative mb-4">
          {/* Decorative frame */}
          <div className="relative border-2 border-border rounded-2xl p-2.5 bg-card">
            {/* Corner & edge decorative circles */}
            <div className="absolute -top-1.5 -left-1.5 w-3 h-3 rounded-full border-2 border-primary bg-background z-10" />
            <div className="absolute -top-1.5 -right-1.5 w-3 h-3 rounded-full border-2 border-primary bg-background z-10" />
            <div className="absolute -bottom-1.5 -left-1.5 w-3 h-3 rounded-full border-2 border-primary bg-background z-10" />
            <div className="absolute -bottom-1.5 -right-1.5 w-3 h-3 rounded-full border-2 border-primary bg-background z-10" />
            {/* Mid-edge circles */}
            <div className="absolute top-1/2 -left-1.5 -translate-y-1/2 w-3 h-3 rounded-full border-2 border-muted-foreground/30 bg-background z-10" />
            <div className="absolute -top-1.5 left-1/2 -translate-x-1/2 w-3 h-3 rounded-full border-2 border-muted-foreground/30 bg-background z-10" />

            {/* Vertical category tag */}
            <div className="absolute -left-0.5 top-8 z-20">
              <span className="inline-block bg-primary text-primary-foreground text-[10px] font-body font-medium px-1.5 py-3 rounded-r-md tracking-wider"
                style={{ writingMode: "vertical-rl", textOrientation: "mixed" }}
              >
                {category}
              </span>
            </div>

            {/* Image */}
            <div className="rounded-xl overflow-hidden aspect-[4/3]">
              <img
                src={image}
                alt={title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                loading="lazy"
              />
            </div>
          </div>
        </div>

        {/* Content below frame */}
        <h3 className="font-display text-base font-semibold text-card-foreground mb-1.5 group-hover:text-primary transition-colors leading-snug">
          {title}
        </h3>
        <p className="text-xs text-muted-foreground font-body mb-3 line-clamp-2 leading-relaxed">
          {excerpt}
        </p>
        <div className="flex items-center justify-between">
          <span className="inline-block text-xs font-body text-primary border border-primary/40 px-3 py-1 rounded-full hover:bg-primary hover:text-primary-foreground transition-colors">
            Read More
          </span>
          <span className="text-[11px] text-muted-foreground font-body">{date}</span>
        </div>
      </Link>
    </article>
  );
};

export default BlogCard;
