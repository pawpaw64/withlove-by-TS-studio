import heroImg from "@/assets/watercolor-hero.jpg";

const HeroSection = () => {
  return (
    <section className="relative overflow-hidden">
      <img
        src={heroImg}
        alt="Watercolor background"
        className="absolute inset-0 w-full h-full object-cover opacity-60"
      />
      <div className="relative container mx-auto px-4 py-20 md:py-32 text-center">
        <h1 className="text-4xl md:text-6xl lg:text-7xl font-display font-bold text-foreground mb-4 animate-fade-in">
          withlovebyts
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-8 font-body animate-fade-in" style={{ animationDelay: "0.2s" }}>
          Handcrafted macrame art made with love. Discover tutorials, inspiration, and the beauty of knotting.
        </p>
        <div className="flex justify-center gap-4 animate-fade-in" style={{ animationDelay: "0.4s" }}>
          <a
            href="#posts"
            className="bg-primary text-primary-foreground px-8 py-3 rounded-full font-body text-sm hover:opacity-90 transition-opacity"
          >
            Explore Posts
          </a>
          <a
            href="#subscribe"
            className="border border-foreground/20 text-foreground px-8 py-3 rounded-full font-body text-sm hover:bg-secondary transition-colors"
          >
            Subscribe
          </a>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
