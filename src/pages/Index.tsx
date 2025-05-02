
import { useEffect, useState } from "react";
import ResumeHero from "@/components/ResumeHero";
import SkillsShowcase from "@/components/SkillsShowcase";
import DevOpsTools from "@/components/DevOpsTools";
import DevExperience from "@/components/DevExperience";
import ContactSection from "@/components/ContactSection";
import DevOpsLifecycle from "@/components/DevOpsLifecycle";

const Index = () => {
  const [scrollPosition, setScrollPosition] = useState(0);
  
  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <div className="relative">
        {/* Background elements */}
        <div className="absolute inset-0 opacity-50 pointer-events-none">
          <div className="absolute top-[20%] left-[10%] w-64 h-64 rounded-full bg-gradient-to-r from-primary/20 to-primary/10 blur-3xl" />
          <div className="absolute top-[40%] right-[15%] w-72 h-72 rounded-full bg-gradient-to-r from-accent/30 to-primary/10 blur-3xl" />
        </div>

        {/* Main content */}
        <div className="container mx-auto relative z-10">
          <ResumeHero scrollPosition={scrollPosition} />
          <SkillsShowcase />
          <DevOpsLifecycle />
          <DevOpsTools />
          <DevExperience />
          <ContactSection />
        </div>
      </div>
    </div>
  );
};

export default Index;
