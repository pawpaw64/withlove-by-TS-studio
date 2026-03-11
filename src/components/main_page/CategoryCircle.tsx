import type { Category } from "@/types/post";
import { Link } from "react-router-dom";

interface CategoryCircleProps {
  category: Category;
  isActive: boolean;
  onClick?: (id: string) => void;
  linkTo?: string;
}

const CategoryCircle = ({ category, isActive, onClick, linkTo }: CategoryCircleProps) => {
  const content = (
    <div className="flex flex-col items-center gap-2.5 group flex-shrink-0">

      {/* Decorative ring container */}
      <div
        className={`relative w-20 h-20 md:w-24 md:h-24 rounded-full p-1 transition-all duration-300 ${
          isActive
            ? "ring-2 ring-primary ring-offset-2 ring-offset-background"
            : "ring-1 ring-border group-hover:ring-primary/50"
        }`}
      >
        {/* Corner dots */}
        <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2.5 h-2.5 rounded-full border-2 border-primary bg-background z-10" />
        <div className="absolute -bottom-1 left-1/2 -translate-x-1/2 w-2.5 h-2.5 rounded-full border-2 border-primary bg-background z-10" />
        <div className="absolute top-1/2 -left-1 -translate-y-1/2 w-2.5 h-2.5 rounded-full border-2 border-primary bg-background z-10" />
        <div className="absolute top-1/2 -right-1 -translate-y-1/2 w-2.5 h-2.5 rounded-full border-2 border-primary bg-background z-10" />

        {/* Image */}
        <div className="w-full h-full rounded-full overflow-hidden border-2 border-card">
          <img
            src={category.image}
            alt={category.label}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
            loading="lazy"
          />
        </div>
      </div>

      {/* Label */}
      <span
        className={`text-xs md:text-sm font-body font-medium transition-colors whitespace-nowrap ${
          isActive ? "text-primary" : "text-muted-foreground group-hover:text-foreground"
        }`}
      >
        {category.label}
      </span>
    </div>
  );

  if (linkTo) {
    return <Link to={linkTo}>{content}</Link>;
  }

  return (
    <button onClick={() => onClick?.(category.id)} className="cursor-pointer">
      {content}
    </button>
  );
};

export default CategoryCircle;
