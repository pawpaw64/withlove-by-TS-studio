import { Heart } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-secondary border-t border-border">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-display text-xl font-bold text-foreground italic mb-3">
              withlovebyts
            </h3>
            <p className="text-sm text-muted-foreground font-body leading-relaxed">
              Handcrafted macrame art and tutorials. Every knot tied with love and care.
            </p>
          </div>

          <div>
            <h4 className="font-display text-sm font-semibold text-foreground mb-3 uppercase tracking-wider">
              Quick Links
            </h4>
            <ul className="space-y-2">
              {["Tutorials", "Gallery", "About", "Contact"].map((link) => (
                <li key={link}>
                  <a href="https://www.facebook.com/withlovebyts" className="text-sm text-muted-foreground hover:text-primary transition-colors font-body">
                    {link}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div id="subscribe">
            <h4 className="font-display text-sm font-semibold text-foreground mb-3 uppercase tracking-wider">
              Subscribe to Newsletter
            </h4>
            <p className="text-sm text-muted-foreground font-body mb-3">
              Get macrame tips and new patterns delivered to your inbox.
            </p>
            <form className="flex gap-2" onSubmit={(e) => e.preventDefault()}>
              <input
                type="email"
                placeholder="tsum64@gmail.com"
                className="flex-1 bg-background border border-border rounded-full px-4 py-2 text-sm font-body text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring"
              />
              <button
                type="submit"
                className="bg-primary text-primary-foreground text-sm px-5 py-2 rounded-full hover:opacity-90 transition-opacity font-body"
              >
                Join
              </button>
            </form>
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-border text-center">
          <p className="text-xs text-muted-foreground font-body flex items-center justify-center gap-1">
            Made with <Heart size={12} className="text-accent" /> by withlovebyts
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
