import d1 from "@/assets/d1.jpg";
import d2 from "@/assets/d2.jpg";
import d3 from "@/assets/d3.jpg";
import d4 from "@/assets/d4.jpg";
import d5 from "@/assets/d5.jpg";
import d6 from "@/assets/d6.jpg";

export interface Category {
  id: string;
  label: string;
  image: string;
}

export const categories: Category[] = [
  { id: "wall-hangings", label: "Wall Hangings", image: d1 },
  { id: "plant-hangers", label: "Plant Hangers", image: d2 },
  { id: "dreamcatchers", label: "Dreamcatchers", image: d3 },
  { id: "table-runners", label: "Table Runners", image: d4 },
  { id: "keychains", label: "Keychains", image: d5 },
  { id: "home-decor", label: "Home Decor", image: d6 },
];
