import Header from "@/components/main_page/Header";
import HeroSection from "@/components/main_page/HeroSection";
import BlogGrid from "@/components/main_page/BlogGrid";
import Footer from "@/components/main_page/Footer";


// Main page component that combines all sections
const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <HeroSection/>
      
      <Header />
     
      <BlogGrid />
      <Footer />
    </div>
  );
};

export default Index;
