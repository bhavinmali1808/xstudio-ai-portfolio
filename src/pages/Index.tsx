import { Navbar } from "@/components/layout/Navbar";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";
import { Services } from "@/components/sections/Services";
import { AIFocus } from "@/components/sections/AIFocus";
import { VideoCarousel } from "@/components/sections/VideoCarousel";
import { Portfolio } from "@/components/sections/Portfolio";
import { WhyChooseUs } from "@/components/sections/WhyChooseUs";
import { Process } from "@/components/sections/Process";
import { TeamPerspectives } from "@/components/sections/TeamPerspectives";
import { Contact } from "@/components/sections/Contact";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppButton } from "@/components/WhatsAppButton";

const Index = () => {
  return (
    <div className="min-h-screen bg-[#F4F0E7] text-[#263536] overflow-x-hidden">
      <Navbar />
      <main>
        <Hero />
        <About />
        <Services />
        <AIFocus />
        <VideoCarousel />
        <Portfolio />
        <WhyChooseUs />
        <Process />
        <TeamPerspectives />
        <Contact />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
