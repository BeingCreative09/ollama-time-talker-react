
import { useEffect, useRef, useState } from "react";
import { Carousel, CarouselContent, CarouselItem } from "@/components/ui/carousel";
import { Badge } from "@/components/ui/badge";
import { 
  Server, Database, Code, Globe, Layers, Activity,
  Settings, BarChart, GitBranch, Briefcase
} from "lucide-react";

interface Tool {
  name: string;
  category: string;
  icon: React.ReactNode;
  description: string;
}

const tools: Tool[] = [
  {
    name: "Kubernetes",
    category: "Container Orchestration",
    icon: <Layers className="h-10 w-10 text-primary" />,
    description: "Container orchestration for automating deployment, scaling, and management"
  },
  {
    name: "Docker",
    category: "Containerization",
    icon: <Server className="h-10 w-10 text-primary" />,
    description: "Platform for developing, shipping, and running applications in containers"
  },
  {
    name: "Terraform",
    category: "Infrastructure as Code",
    icon: <Globe className="h-10 w-10 text-primary" />,
    description: "Infrastructure as code tool for building, changing, and versioning infrastructure"
  },
  {
    name: "Jenkins",
    category: "CI/CD",
    icon: <Settings className="h-10 w-10 text-primary" />,
    description: "Open-source automation server for building, testing, and deploying code"
  },
  {
    name: "Prometheus",
    category: "Monitoring",
    icon: <BarChart className="h-10 w-10 text-primary" />,
    description: "Monitoring system and time series database for metrics collection"
  },
  {
    name: "Kafka",
    category: "Event Streaming",
    icon: <Activity className="h-10 w-10 text-primary" />,
    description: "Distributed event streaming platform for high-performance data pipelines"
  },
  {
    name: "GitLab",
    category: "Version Control",
    icon: <GitBranch className="h-10 w-10 text-primary" />,
    description: "Web-based DevOps lifecycle tool providing Git repository management"
  },
  {
    name: "AWS",
    category: "Cloud Platform",
    icon: <Database className="h-10 w-10 text-primary" />,
    description: "Comprehensive cloud computing platform with 200+ services"
  }
];

const DevOpsTools = () => {
  const [activeToolIndex, setActiveToolIndex] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const containerRef = useRef<HTMLDivElement>(null);
  
  useEffect(() => {
    const checkVisibility = () => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const isVisible = rect.top < window.innerHeight && rect.bottom > 0;
        setIsVisible(isVisible);
      }
    };
    
    window.addEventListener("scroll", checkVisibility);
    checkVisibility();
    
    return () => window.removeEventListener("scroll", checkVisibility);
  }, []);

  useEffect(() => {
    if (isVisible) {
      const interval = setInterval(() => {
        setActiveToolIndex(prev => (prev + 1) % tools.length);
      }, 3000);
      
      return () => clearInterval(interval);
    }
  }, [isVisible]);

  return (
    <section ref={containerRef} className="py-20">
      <div className="text-center mb-16">
        <Badge className="mb-4">Toolchain</Badge>
        <h2 className="text-3xl md:text-4xl font-bold mb-4">DevOps Arsenal</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          The cutting-edge tools I use to build reliable, scalable, and efficient infrastructure
        </p>
      </div>
      
      <div className="relative">
        {/* 3D Floating Tools Visualization */}
        <div className="relative h-[400px] mb-16">
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="relative w-[300px] h-[300px]">
              {tools.map((tool, index) => {
                const isActive = index === activeToolIndex;
                const angle = (index / tools.length) * Math.PI * 2;
                const radius = isActive ? 0 : 150;
                const x = Math.cos(angle) * radius;
                const y = Math.sin(angle) * radius;
                const scale = isActive ? 1.5 : 0.8;
                const opacity = isActive ? 1 : 0.6;
                
                return (
                  <div
                    key={tool.name}
                    className={`absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-1000 
                      ${isActive ? 'z-10' : 'z-0'} glass-panel p-6 rounded-xl`}
                    style={{
                      left: `calc(50% + ${x}px)`,
                      top: `calc(50% + ${y}px)`,
                      transform: `translate(-50%, -50%) scale(${scale})`,
                      opacity,
                    }}
                  >
                    <div className="flex flex-col items-center space-y-3">
                      {tool.icon}
                      <div className="text-lg font-bold">{tool.name}</div>
                      <div className="text-sm text-muted-foreground">{tool.category}</div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
        
        {/* Tool Details Carousel */}
        <Carousel className="w-full max-w-3xl mx-auto">
          <CarouselContent>
            {tools.map((tool, index) => (
              <CarouselItem key={tool.name}>
                <div 
                  className={`p-6 text-center transition-opacity duration-500 ${
                    index === activeToolIndex ? "opacity-100" : "opacity-0"
                  }`}
                >
                  <h3 className="text-2xl font-bold mb-2">{tool.name}</h3>
                  <p className="text-muted-foreground mb-4">{tool.category}</p>
                  <p>{tool.description}</p>
                </div>
              </CarouselItem>
            ))}
          </CarouselContent>
        </Carousel>
      </div>
    </section>
  );
};

export default DevOpsTools;
