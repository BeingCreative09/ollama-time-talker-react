
import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import { ArrowDown, Github, Linkedin } from "lucide-react";

interface ResumeHeroProps {
  scrollPosition: number;
}

const ResumeHero = ({ scrollPosition }: ResumeHeroProps) => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  
  useEffect(() => {
    const updateRoation = () => {
      if (titleRef.current) {
        titleRef.current.style.transform = `translateY(${scrollPosition * 0.2}px)`;
      }
    };
    updateRoation();
  }, [scrollPosition]);

  return (
    <section className="min-h-screen flex flex-col justify-center pt-16">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        <div className="space-y-6">
          <div className="space-y-2">
            <p className="text-lg font-medium text-primary animate-fade-in">Hello, I'm</p>
            <h1 
              ref={titleRef} 
              className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent"
            >
              Alex DevOps
            </h1>
            <p className="text-xl md:text-2xl text-muted-foreground mt-2 animate-fade-in" style={{ animationDelay: "200ms" }}>
              Senior DevOps Engineer & Kafka Expert
            </p>
          </div>
          
          <div className="prose prose-lg dark:prose-invert max-w-none animate-fade-in" style={{ animationDelay: "400ms" }}>
            <p>
              I build and optimize scalable infrastructure, automate deployments,
              and ensure systems run smoothly with modern cloud technologies.
            </p>
          </div>
          
          <div className="flex flex-wrap gap-4 animate-fade-in" style={{ animationDelay: "600ms" }}>
            <Button className="group">
              Download Resume
              <ArrowDown className="ml-2 group-hover:translate-y-1 transition-transform" />
            </Button>
            <Button variant="outline" className="gap-2">
              <Github className="h-4 w-4" />
              GitHub
            </Button>
            <Button variant="outline" className="gap-2">
              <Linkedin className="h-4 w-4" />
              LinkedIn
            </Button>
          </div>
        </div>
        
        <div className="relative h-[400px] lg:h-[500px] float-animation">
          <div className="glass-panel absolute inset-0 rounded-2xl overflow-hidden">
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-7xl md:text-9xl font-bold opacity-10">
                DevOps
              </div>
              <div className="absolute inset-0 grid grid-cols-3 grid-rows-3 gap-4 p-6">
                {Array.from({ length: 9 }).map((_, i) => (
                  <div 
                    key={i} 
                    className="rounded-lg bg-white/10 backdrop-blur-sm border border-white/10 shadow-lg transform hover:scale-105 transition-transform"
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
      
      <div className="absolute bottom-12 left-1/2 transform -translate-x-1/2 animate-bounce">
        <Button variant="ghost" size="icon" className="rounded-full h-12 w-12">
          <ArrowDown className="h-6 w-6" />
        </Button>
      </div>
    </section>
  );
};

export default ResumeHero;
