import { Sparkles, Flower2 } from "lucide-react";
import { useSiteSettings } from "@/hooks/useSiteSettings";

const HeroSection = () => {
  const site = useSiteSettings();

  return (
    <section className="relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute -top-20 -right-20 w-64 h-64 bg-peach/30 rounded-full blur-3xl" />
        <div className="absolute -bottom-20 -left-20 w-64 h-64 bg-primary/20 rounded-full blur-3xl" />
      </div>

      <img
        src={site.heroImage}
        alt="Watercolor background"
        className="absolute inset-0 w-full h-full object-cover opacity-60"
      />
      
      <div className="relative container mx-auto py-12 md:py-20 px-4 text-center">
        {/* Decorative knot icon above title */}
        <div className="flex justify-center mb-6 animate-fade-in">
          <div className="relative">
            <Flower2 size={40} className="text-primary/60 rotate-45" />
            <Sparkles size={20} className="text-accent absolute -top-2 -right-2 animate-pulse" />
          </div>
        </div>

        {/* Main title with unique font combination */}
        <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold mb-4 animate-fade-in">
          <span className="relative inline-block ">
             <span className="relative z-10 font-satisfy  italic tracking-wide text-foreground">
              With
            </span>
          </span>
          <span className="relative inline-block mx-2">
           <span className="relative z-10 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              love
            </span>
            <span className="absolute -bottom-2 left-0 w-full h-3 bg-peach/30 -rotate-1 rounded-full" />
          </span>
          <span className="relative inline-block">
            <span className="relative z-10 font-satisfy text-3xl italic tracking-tight text-foreground">
              by
            </span>
            <span className="absolute -top-1 -right-4 text-4xl text-primary/30">✦</span>
          </span>
          <span className="relative inline-block">
            <span className="relative z-10 bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              TS
            </span>
            <span className="absolute -top-1 -right-4 text-4xl text-primary/30">✦</span>
          </span>
        </h1>

        {/* Alternative version with more traditional styling if you prefer */}
        {/* <h1 className="font-display text-5xl md:text-7xl lg:text-8xl font-bold mb-4 animate-fade-in">
          <span className="bg-gradient-to-r from-primary via-accent to-primary bg-clip-text text-transparent">
            withlovebyts
          </span>
        </h1> */}

        <p className="text-lg md:text-2xl text-muted-foreground max-w-2xl mx-auto mb-8 italic animate-fade-in relative" style={{ animationDelay: "0.2s" }}>
          <span className="relative inline-block">
            <span className="absolute -left-6 top-1/2 -translate-y-1/2 w-4 h-px bg-primary/30 hidden md:block " />
            {site.heroSubtitle}
            <span className="absolute -right-6 top-1/2 -translate-y-1/2 w-4 h-px bg-primary/30 hidden md:block" />
          </span>
        </p>
        
        <div className="flex justify-center gap-4 animate-fade-in relative" style={{ animationDelay: "0.4s" }}>
          {/* Decorative dots */}
          <div className="absolute left-1/4 -bottom-8 w-2 h-2 bg-primary/40 rounded-full hidden md:block" />
          <div className="absolute right-1/4 -bottom-12 w-3 h-3 bg-peach/50 rounded-full hidden md:block" />
          
          <a
            href={site.heroCtaLink}
            className="bg-primary text-primary-foreground px-8 py-3 rounded-full font-body text-lg hover:opacity-90 transition-opacity shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 transition-all duration-300"
          >
            {site.heroCtaText}
          </a>
          {/* <a
            href="#subscribe"
            className="border-2 border-primary/30 text-foreground px-8 py-3 rounded-full font-body text-lg hover:bg-secondary/80 transition-all duration-300 backdrop-blur-sm"
          >
            Subscribe
          </a> */}
        </div>

        {/* Decorative wave at bottom */}
        <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-t from-background/20 to-transparent pointer-events-none" />
      </div>
    </section>
  );
};

export default HeroSection;