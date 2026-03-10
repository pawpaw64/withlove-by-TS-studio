import { useState } from "react";
import { Menu, X } from "lucide-react";

const navLinks = ["Home", "Tutorials", "Gallery", "About", "Contact"];

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b border-border">
      <div className="container mx-auto flex items-center justify-between py-4 px-4">
        <a href="/" className="font-display text-2xl md:text-3xl font-bold text-foreground tracking-wide italic">
          withlovebyts
        </a>

        <nav className="hidden md:flex items-center gap-8">
          {navLinks.map((link) => (
            <a
              key={link}
              href="#"
              className="text-sm font-body text-muted-foreground hover:text-primary transition-colors"
            >
              {link}
            </a>
          ))}
          <a
            href="#subscribe"
            className="bg-primary text-primary-foreground text-sm px-5 py-2 rounded-full hover:opacity-90 transition-opacity"
          >
            Subscribe
          </a>
        </nav>

        <button
          className="md:hidden text-foreground"
          onClick={() => setMobileOpen(!mobileOpen)}
        >
          {mobileOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {mobileOpen && (
        <div className="md:hidden bg-background border-t border-border px-4 pb-4">
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
            className="inline-block mt-2 bg-primary text-primary-foreground text-sm px-5 py-2 rounded-full"
          >
            Subscribe
          </a>
        </div>
      )}
    </header>
  );
};

export default Header;
