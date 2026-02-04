import Navbar from "@/components/landing/Navbar";
import Hero from "@/components/landing/Hero";
import Services from "@/components/landing/Services";
import Stats from "@/components/landing/Stats";
import Pricing from "@/components/landing/Pricing";
import CTA from "@/components/landing/CTA";
import Footer from "@/components/landing/Footer";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <Hero />
      <Services />
      <Stats />
      <Pricing />
      <CTA />
      <Footer />
    </div>
  );
};

export default Index;