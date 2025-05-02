
import { useEffect, useState } from "react";
import ResumeHero from "@/components/ResumeHero";
import SkillsShowcase from "@/components/SkillsShowcase";
import DevOpsTools from "@/components/DevOpsTools";
import DevExperience from "@/components/DevExperience";
import ContactSection from "@/components/ContactSection";
import DevOpsLifecycle from "@/components/DevOpsLifecycle";
import ProgressIndicator from "@/components/ProgressIndicator";
import { motion, AnimatePresence } from "framer-motion";

const Index = () => {
  const [scrollPosition, setScrollPosition] = useState(0);
  const [currentSection, setCurrentSection] = useState(0);
  
  useEffect(() => {
    const handleScroll = () => {
      setScrollPosition(window.scrollY);
      
      // Calculate which section is currently visible
      const sections = document.querySelectorAll('section');
      const viewportHeight = window.innerHeight;
      const currentPos = window.scrollY + (viewportHeight / 2);
      
      sections.forEach((section, index) => {
        const rect = section.getBoundingClientRect();
        const absoluteTop = window.scrollY + rect.top;
        const absoluteBottom = absoluteTop + rect.height;
        
        if (currentPos >= absoluteTop && currentPos <= absoluteBottom) {
          setCurrentSection(index);
        }
      });
    };
    
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const sections = [
    "Home",
    "Skills",
    "DevOps Lifecycle",
    "Tools",
    "Experience",
    "Contact"
  ];

  return (
    <div className="min-h-screen bg-background overflow-x-hidden">
      <div className="relative">
        {/* Background elements */}
        <div className="absolute inset-0 opacity-50 pointer-events-none">
          <div className="absolute top-[20%] left-[10%] w-64 h-64 rounded-full bg-gradient-to-r from-primary/20 to-primary/10 blur-3xl" />
          <div className="absolute top-[40%] right-[15%] w-72 h-72 rounded-full bg-gradient-to-r from-accent/30 to-primary/10 blur-3xl" />
          <div className="absolute bottom-[20%] left-[30%] w-80 h-80 rounded-full bg-gradient-to-r from-purple-500/20 to-pink-500/10 blur-3xl" />
        </div>
        
        {/* Progress indicator */}
        <div className="fixed right-10 top-1/2 transform -translate-y-1/2 z-50">
          <ProgressIndicator 
            sections={sections} 
            currentSection={currentSection}
          />
        </div>

        {/* Main content */}
        <AnimatePresence mode="wait">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="container mx-auto relative z-10"
          >
            <ResumeHero scrollPosition={scrollPosition} />
            
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: 0.2 }}
            >
              <SkillsShowcase />
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: 0.2 }}
            >
              <DevOpsLifecycle />
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: 0.2 }}
            >
              <DevOpsTools />
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: 0.2 }}
            >
              <DevExperience />
            </motion.div>
            
            <motion.div 
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: 0.2 }}
            >
              <ContactSection />
            </motion.div>
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default Index;
