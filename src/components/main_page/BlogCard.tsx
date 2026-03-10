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
    <article className="group bg-card rounded-lg overflow-hidden border border-border hover:shadow-lg transition-all duration-300 hover:-translate-y-1">
      <Link to={`/post/${slug}`} className="block">
        <div className="aspect-square overflow-hidden">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
            loading="lazy"
          />
        </div>
        <div className="p-5">
          <span className="inline-block text-xs font-body text-primary bg-peach/50 px-3 py-1 rounded-full mb-3">
            {category}
          </span>
          <h3 className="font-display text-lg font-semibold text-card-foreground mb-2 group-hover:text-primary transition-colors">
            {title}
          </h3>
          <p className="text-sm text-muted-foreground font-body mb-4 line-clamp-2">
            {excerpt}
          </p>
          <div className="flex items-center justify-between">
            <span className="text-xs text-muted-foreground font-body">{date}</span>
            <span className="text-sm font-body text-primary hover:underline">
              Read More →
            </span>
          </div>
        </div>
      </Link>
    </article>
  );
};

export default BlogCard;
