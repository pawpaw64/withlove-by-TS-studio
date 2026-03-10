import { useState } from "react";
import { Menu, X } from "lucide-react";
import { Link } from "react-router-dom";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Tutorials", href: "/#posts" },
  { label: "Gallery", href: "/gallery" },
  { label: "About", href: "/#subscribe" },
];

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-background/70 backdrop-blur-md border-b border-border/40">
      <div className="container mx-auto flex items-center justify-between py-3 px-4">
        {/* Empty div for spacing (left side) */}
        <div className="w-24 md:w-32" />
        
        {/* Centered navigation */}
        <nav className="hidden md:flex items-center gap-8 bg-secondary/30 px-6 py-2 rounded-full backdrop-blur-sm border border-border/20">
          {navLinks.map((link) => (
            <a
              key={link}
              href="#"
              className="text-md font-body text-muted-foreground hover:text-primary transition-colors"
            >
              {link}
            </a>
          ))}
          <a
            href="#subscribe"
            className="bg-primary text-primary-foreground text-md px-5 py-1.5 rounded-full hover:opacity-90 transition-opacity shadow-sm"
          >
           Contact
          </a>
        </nav>

        {/* Empty div for spacing (right side) */}
        <div className="w-24 md:w-32" />

        {/* Mobile menu button */}
        <button
          className="md:hidden text-foreground"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden bg-background/95 backdrop-blur-md border-t border-border/40 px-4 pb-4">
          {navLinks.map((link) => (
            <a
              key={link}
              href="#"
              className="block py-2 text-muted-foreground hover:text-primary transition-colors font-body"
            >
              {link}
            </a>
          ))}
          <a
            href="#subscribe"
            className="inline-block mt-2 bg-primary text-primary-foreground text-md px-5 py-2 rounded-full"
          >
            Subscribe
          </a>
        </div>
      )}
    </header>
  );
};

export default Header;