import { useState, useEffect, useRef } from "react";
import { Menu, X, Facebook, Instagram, Youtube, Globe, Mail, MessageCircle, Video } from "lucide-react";
import { Link } from "react-router-dom";
import { useSiteSettings } from "@/hooks/useSiteSettings";
import type { SocialLink } from "@/hooks/useSiteSettings";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Tutorials", href: "/#posts" },
  { label: "Gallery", href: "/gallery" },
];

function getPlatformIcon(platform: string) {
  switch (platform) {
    case "Facebook": return <Facebook size={18} />;
    case "Instagram": return <Instagram size={18} />;
    case "YouTube": return <Youtube size={18} />;
    case "TikTok": return <Video size={18} />;
    case "WhatsApp": return <MessageCircle size={18} />;
    case "Email": return <Mail size={18} />;
    default: return <Globe size={18} />;
  }
}

function getPlatformColor(platform: string) {
  switch (platform) {
    case "Facebook": return "#1877F2";
    case "Instagram": return "#E4405F";
    case "YouTube": return "#FF0000";
    case "TikTok": return "#000000";
    case "WhatsApp": return "#25D366";
    case "Email": return "hsl(15 60% 65%)";
    default: return "hsl(15 60% 65%)";
  }
}

/* ── Contact Popup ──────────────────────────────────────── */

function ContactPopup({ links, onClose }: { links: SocialLink[]; onClose: () => void }) {
  const overlayRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  // mount → animate in
  useEffect(() => {
    requestAnimationFrame(() => setVisible(true));
  }, []);

  const handleClose = () => {
    setVisible(false);
    setTimeout(onClose, 350); // wait for exit animation
  };

  return (
    <div
      ref={overlayRef}
      onClick={(e) => { if (e.target === overlayRef.current) handleClose(); }}
      className="fixed inset-0 z-[100] flex items-center justify-center px-4"
      style={{
        background: visible ? "rgba(0,0,0,0.35)" : "rgba(0,0,0,0)",
        backdropFilter: visible ? "blur(6px)" : "blur(0px)",
        transition: "background 350ms ease, backdrop-filter 350ms ease",
      }}
    >
      <div
        className="relative w-full max-w-sm rounded-3xl overflow-hidden shadow-2xl"
        style={{
          background: "hsl(30 50% 97%)",
          border: "1.5px solid hsl(30 30% 88%)",
          transform: visible ? "scale(1) translateY(0)" : "scale(0.85) translateY(24px)",
          opacity: visible ? 1 : 0,
          transition: "transform 400ms cubic-bezier(0.34,1.56,0.64,1), opacity 300ms ease",
        }}
      >
        {/* decorative top wave */}
        <div className="h-28 relative overflow-hidden" style={{ background: "linear-gradient(135deg, hsl(15 60% 65%), hsl(345 45% 75%))" }}>
          {/* animated macramé-knot dots */}
          <svg className="absolute inset-0 w-full h-full opacity-20" viewBox="0 0 400 120" preserveAspectRatio="none">
            <circle cx="40" cy="30" r="8" fill="white">
              <animate attributeName="cy" values="30;22;30" dur="3s" repeatCount="indefinite" />
            </circle>
            <circle cx="120" cy="50" r="6" fill="white">
              <animate attributeName="cy" values="50;40;50" dur="2.5s" repeatCount="indefinite" />
            </circle>
            <circle cx="200" cy="25" r="10" fill="white">
              <animate attributeName="cy" values="25;15;25" dur="3.5s" repeatCount="indefinite" />
            </circle>
            <circle cx="280" cy="55" r="5" fill="white">
              <animate attributeName="cy" values="55;47;55" dur="2.8s" repeatCount="indefinite" />
            </circle>
            <circle cx="360" cy="35" r="7" fill="white">
              <animate attributeName="cy" values="35;27;35" dur="3.2s" repeatCount="indefinite" />
            </circle>
            {/* hanging threads */}
            <line x1="40" y1="38" x2="40" y2="100" stroke="white" strokeWidth="1">
              <animate attributeName="y2" values="100;90;100" dur="3s" repeatCount="indefinite" />
            </line>
            <line x1="120" y1="56" x2="120" y2="105" stroke="white" strokeWidth="1">
              <animate attributeName="y2" values="105;95;105" dur="2.5s" repeatCount="indefinite" />
            </line>
            <line x1="200" y1="35" x2="200" y2="110" stroke="white" strokeWidth="1">
              <animate attributeName="y2" values="110;98;110" dur="3.5s" repeatCount="indefinite" />
            </line>
            <line x1="280" y1="60" x2="280" y2="95" stroke="white" strokeWidth="1">
              <animate attributeName="y2" values="95;87;95" dur="2.8s" repeatCount="indefinite" />
            </line>
            <line x1="360" y1="42" x2="360" y2="100" stroke="white" strokeWidth="1">
              <animate attributeName="y2" values="100;92;100" dur="3.2s" repeatCount="indefinite" />
            </line>
          </svg>

          <div className="relative z-10 flex flex-col items-center justify-center h-full">
            <span className="text-white font-display text-xl font-semibold">Get in Touch</span>
            <span className="text-white/70 text-sm font-body mt-1">We'd love to hear from you!</span>
          </div>

          {/* close button */}
          <button
            onClick={handleClose}
            className="absolute top-3 right-3 z-20 w-8 h-8 rounded-full flex items-center justify-center bg-white/20 hover:bg-white/40 transition-colors text-white"
            aria-label="Close"
          >
            <X size={16} />
          </button>
        </div>

        {/* links list */}
        <div className="p-5 space-y-3">
          {links.map((link, i) => (
            <a
              key={i}
              href={link.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex items-center gap-3 px-4 py-3 rounded-2xl transition-all duration-200 hover:shadow-md"
              style={{
                background: "hsl(30 40% 95%)",
                border: "1.5px solid hsl(30 30% 88%)",
                animationDelay: `${i * 80}ms`,
                animation: visible ? `contactLinkIn 400ms ${i * 80}ms both cubic-bezier(0.34,1.56,0.64,1)` : "none",
              }}
            >
              <span
                className="flex items-center justify-center w-9 h-9 rounded-full text-white shrink-0 transition-transform duration-200 group-hover:scale-110"
                style={{ background: getPlatformColor(link.platform) }}
              >
                {getPlatformIcon(link.platform)}
              </span>
              <div className="flex-1 min-w-0">
                <span className="block font-display font-semibold text-sm" style={{ color: "hsl(20 25% 20%)" }}>
                  {link.platform}
                </span>
                <span className="block text-xs font-body truncate" style={{ color: "hsl(20 15% 45%)" }}>
                  {link.label}
                </span>
              </div>
              <span className="text-xs font-body opacity-0 group-hover:opacity-100 transition-opacity" style={{ color: "hsl(15 60% 65%)" }}>
                Visit →
              </span>
            </a>
          ))}

          {links.length === 0 && (
            <p className="text-center text-sm font-body py-4" style={{ color: "hsl(20 15% 45%)" }}>
              No contact links configured yet.
            </p>
          )}
        </div>
      </div>

      {/* keyframe for staggered link entrance */}
      <style>{`
        @keyframes contactLinkIn {
          from { opacity: 0; transform: translateY(12px) scale(0.95); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
      `}</style>
    </div>
  );
}

/* ── Header ─────────────────────────────────────────────── */

const Header = () => {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const settings = useSiteSettings();

  // Build links: prefer socialLinks, fallback to legacy facebookUrl
  const contactLinks: SocialLink[] =
    settings.socialLinks && settings.socialLinks.length > 0
      ? settings.socialLinks
      : settings.facebookUrl
        ? [{ platform: "Facebook", label: "Facebook Page", url: settings.facebookUrl }]
        : [];

  return (
    <>
      <header className="sticky top-0 z-50 bg-background/70 backdrop-blur-md border-b border-border/40">
        <div className="container mx-auto flex items-center justify-between py-3 px-4">
          <div className="w-24 md:w-32" />

          <nav className="hidden md:flex items-center gap-8 bg-secondary/30 px-6 py-2 rounded-full backdrop-blur-sm border border-border/20">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                to={link.href}
                className="text-md font-body text-muted-foreground hover:text-primary transition-colors"
              >
                {link.label}
              </Link>
            ))}
            <button
              onClick={() => setContactOpen(true)}
              className="bg-primary text-primary-foreground text-md px-5 py-1.5 rounded-full hover:opacity-90 transition-opacity shadow-sm"
            >
              Contact
            </button>
          </nav>

          <div className="w-24 md:w-32" />

          <button
            className="md:hidden text-foreground"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {mobileOpen && (
          <div className="md:hidden bg-background/95 backdrop-blur-md border-t border-border/40 px-4 pb-4">
            {navLinks.map((link) => (
              <Link
                key={link.label}
                to={link.href}
                className="block py-2 text-muted-foreground hover:text-primary transition-colors font-body"
                onClick={() => setMobileOpen(false)}
              >
                {link.label}
              </Link>
            ))}
            <button
              onClick={() => { setMobileOpen(false); setContactOpen(true); }}
              className="inline-block mt-2 bg-primary text-primary-foreground text-md px-5 py-2 rounded-full"
            >
              Contact
            </button>
          </div>
        )}
      </header>

      {contactOpen && <ContactPopup links={contactLinks} onClose={() => setContactOpen(false)} />}
    </>
  );
};

export default Header;
