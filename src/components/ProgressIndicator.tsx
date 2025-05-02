
import { useState, useEffect } from "react";
import { motion } from "framer-motion";

interface ProgressIndicatorProps {
  sections: string[];
  currentSection: number;
}

const ProgressIndicator = ({ sections, currentSection }: ProgressIndicatorProps) => {
  const [scrollProgress, setScrollProgress] = useState(0);
  
  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      const progress = (window.scrollY / totalHeight) * 100;
      setScrollProgress(progress);
    };
    
    window.addEventListener("scroll", handleScroll);
    handleScroll(); // Initialize on mount
    
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (index: number) => {
    const sections = document.querySelectorAll('section');
    if (sections[index]) {
      sections[index].scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="flex flex-col items-center gap-4">
      {/* Overall progress indicator */}
      <div className="h-32 w-1 bg-white/10 rounded-full relative">
        <motion.div 
          className="absolute bottom-0 w-full bg-gradient-to-t from-primary to-accent rounded-full"
          initial={{ height: 0 }}
          animate={{ height: `${scrollProgress}%` }}
          transition={{ type: "spring", stiffness: 300, damping: 30 }}
        />
      </div>
      
      {/* Section indicators */}
      <div className="flex flex-col gap-3">
        {sections.map((section, index) => (
          <div 
            key={section}
            onClick={() => scrollToSection(index)}
            className="relative cursor-pointer group"
          >
            <motion.div 
              className={`w-3 h-3 rounded-full transition-all duration-300 ${
                currentSection === index 
                  ? "bg-primary scale-125" 
                  : "bg-white/30 hover:bg-white/50"
              }`}
              whileHover={{ scale: 1.2 }}
              whileTap={{ scale: 0.9 }}
            />
            
            {/* Tooltip */}
            <div className="absolute right-full mr-3 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity">
              <div className="bg-background/80 backdrop-blur-sm px-2 py-1 rounded text-xs whitespace-nowrap border border-white/10">
                {section}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProgressIndicator;
