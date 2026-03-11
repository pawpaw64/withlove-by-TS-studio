import { Heart, Sparkles, Star, Flower2 } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/main_page/Header";
import Footer from "@/components/main_page/Footer";
import { useAboutContent } from "@/hooks/useAboutContent";
import { useSiteSettings } from "@/hooks/useSiteSettings";

const About = () => {
  const about = useAboutContent();
  const site = useSiteSettings();

  return (
    <div className="min-h-screen bg-background">
      <Header />

      {/* Hero wave section with creator photo */}
      <section className="relative overflow-hidden pt-16 pb-32">
        {/* Animated decorative circles */}
        <div className="absolute top-10 left-10 w-32 h-32 border-2 border-peach/40 rounded-full animate-[spin_20s_linear_infinite]" />
        <div className="absolute top-20 left-16 w-20 h-20 border border-blush/50 rounded-full animate-[spin_15s_linear_infinite_reverse]" />
        <div className="absolute top-8 right-16 w-24 h-24 border-2 border-primary/20 rounded-full animate-[spin_25s_linear_infinite]" />
        <div className="absolute bottom-20 right-10 w-16 h-16 border border-accent/30 rounded-full animate-[spin_18s_linear_infinite_reverse]" />
        <div className="absolute top-1/2 left-1/3 w-40 h-40 border border-peach/20 rounded-full animate-[spin_30s_linear_infinite]" />

        {/* Floating dots */}
        <div className="absolute top-24 right-1/4 w-3 h-3 bg-primary/30 rounded-full animate-bounce" style={{ animationDuration: "3s" }} />
        <div className="absolute bottom-32 left-1/4 w-2 h-2 bg-accent/40 rounded-full animate-bounce" style={{ animationDuration: "2.5s", animationDelay: "0.5s" }} />
        <div className="absolute top-40 left-1/2 w-4 h-4 bg-peach/40 rounded-full animate-bounce" style={{ animationDuration: "3.5s", animationDelay: "1s" }} />

        <div className="container mx-auto px-4 text-center relative z-10">
          <div className="flex justify-center mb-6">
            <div className="relative">
              <Flower2 size={36} className="text-primary/50 rotate-12" />
              <Sparkles size={18} className="text-accent absolute -top-2 -right-3 animate-pulse" />
            </div>
          </div>

          <h1 className="font-display text-4xl md:text-6xl font-bold mb-4">
            <span className="font-satisfy italic text-foreground">About </span>
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">{site.brandName}</span>
          </h1>
          <p className="text-muted-foreground font-body text-lg max-w-xl mx-auto mb-12 italic">
            {about.pageSubtitle}
          </p>

          {/* Creator photo with animated rings */}
          <div className="relative inline-block mb-8">
            {/* Animated orbiting rings */}
            <div className="absolute inset-[-20px] border-2 border-dashed border-peach/40 rounded-full animate-[spin_12s_linear_infinite]" />
            <div className="absolute inset-[-40px] border border-primary/20 rounded-full animate-[spin_20s_linear_infinite_reverse]" />
            <div className="absolute inset-[-60px] border border-blush/30 rounded-full animate-[spin_28s_linear_infinite]">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 w-3 h-3 bg-primary/50 rounded-full" />
            </div>
            <div className="absolute inset-[-80px] border border-accent/15 rounded-full animate-[spin_35s_linear_infinite_reverse]">
              <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-2 h-2 bg-accent/40 rounded-full" />
            </div>

            <div className="w-48 h-48 md:w-64 md:h-64 rounded-full overflow-hidden border-4 border-peach/60 shadow-xl relative z-10">
              <img
                src={about.creatorPhoto}
                alt={`Creator of ${site.brandName}`}
                className="w-full h-full object-cover"
              />
            </div>

            {/* Corner sparkles */}
            <Star size={16} className="absolute top-2 right-2 text-primary/50 animate-pulse" style={{ animationDelay: "0.5s" }} />
            <Star size={12} className="absolute bottom-4 left-0 text-accent/40 animate-pulse" style={{ animationDelay: "1s" }} />
          </div>
        </div>

        {/* Wave SVG divider */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
            <path
              d="M0,80 C240,120 480,40 720,80 C960,120 1200,40 1440,80 L1440,120 L0,120 Z"
              fill="hsl(var(--secondary))"
            />
            <path
              d="M0,90 C300,110 600,60 900,90 C1100,110 1300,70 1440,90 L1440,120 L0,120 Z"
              fill="hsl(var(--secondary))"
              fillOpacity="0.5"
            />
          </svg>
        </div>
      </section>

      {/* Bio section */}
      <section className="bg-secondary py-16 md:py-24">
        <div className="container mx-auto px-4 max-w-3xl">
          <div className="text-center mb-12">
            <h2 className="font-display text-3xl md:text-4xl font-bold text-foreground mb-2">
              Hi, I'm <span className="font-satisfy italic text-primary">{about.creatorName}</span>
            </h2>
            <div className="flex items-center justify-center gap-2 text-muted-foreground">
              <span className="w-8 h-px bg-primary/30" />
              <Heart size={14} className="text-accent" />
              <span className="w-8 h-px bg-primary/30" />
            </div>
          </div>

          <div className="space-y-6 font-body text-muted-foreground leading-relaxed text-center md:text-lg">
            <p>
              {about.bioParagraph1}
            </p>
            <p>
              {about.bioParagraph2}
            </p>
            <p>
              {about.bioParagraph3}
            </p>
          </div>
        </div>
      </section>

      {/* Values / What I Believe section */}
      <section className="relative py-16 md:py-24 overflow-hidden">
        {/* Subtle animated circles in background */}
        <div className="absolute top-10 right-20 w-48 h-48 border border-peach/15 rounded-full animate-[spin_40s_linear_infinite]" />
        <div className="absolute bottom-10 left-10 w-32 h-32 border border-blush/20 rounded-full animate-[spin_25s_linear_infinite_reverse]" />

        <div className="container mx-auto px-4 max-w-4xl relative z-10">
          <h2 className="font-display text-3xl md:text-4xl font-bold text-center text-foreground mb-12">
            What I <span className="font-satisfy italic text-primary">Believe</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {about.values.map((item, index) => {
              const icons = [
                <Heart className="text-accent" size={28} />,
                <Sparkles className="text-primary" size={28} />,
                <Flower2 className="text-accent" size={28} />,
              ];
              return (
                <div
                  key={item.title}
                  className="bg-card border border-border/40 rounded-2xl p-8 text-center hover:shadow-lg transition-shadow duration-300 group"
                >
                  <div className="w-14 h-14 bg-peach/30 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform duration-300">
                    {icons[index % icons.length]}
                  </div>
                  <h3 className="font-display text-lg font-semibold text-foreground mb-2">{item.title}</h3>
                  <p className="text-sm text-muted-foreground font-body leading-relaxed">{item.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA section with wave top */}
      <section className="relative">
        <div className="absolute top-0 left-0 right-0 rotate-180">
          <svg viewBox="0 0 1440 80" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full">
            <path
              d="M0,40 C360,80 720,0 1080,40 C1260,60 1380,20 1440,40 L1440,80 L0,80 Z"
              fill="hsl(var(--secondary))"
            />
          </svg>
        </div>
        <div className="bg-secondary pt-20 pb-16 text-center">
          <div className="container mx-auto px-4">
            <h2 className="font-display text-2xl md:text-3xl font-bold text-foreground mb-4">
              {about.ctaHeading}
            </h2>
            <p className="text-muted-foreground font-body mb-6 max-w-md mx-auto">
              {about.ctaDescription}
            </p>
            <div className="flex justify-center gap-4 flex-wrap">
              <Link
                to={about.ctaButton1Link}
                className="bg-primary text-primary-foreground px-8 py-3 rounded-full font-body hover:opacity-90 transition-opacity shadow-md"
              >
                {about.ctaButton1Label}
              </Link>
              <Link
                to={about.ctaButton2Link}
                className="border-2 border-primary/30 text-foreground px-8 py-3 rounded-full font-body hover:bg-card transition-colors"
              >
                {about.ctaButton2Label}
              </Link>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
