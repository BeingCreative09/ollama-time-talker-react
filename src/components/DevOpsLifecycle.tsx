
import { useEffect, useRef, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { 
  GitBranch, 
  Server, 
  Database, 
  Code, 
  Cloud, 
  Terminal, 
  Wrench,
  ServerCog
} from "lucide-react";

interface LifecycleStage {
  name: string;
  icon: React.ReactNode;
  description: string;
  color: string;
}

const lifecycleStages: LifecycleStage[] = [
  {
    name: "Plan",
    icon: <GitBranch className="h-8 w-8" />,
    description: "Project planning, requirements gathering, and sprint management",
    color: "from-blue-500 to-blue-600"
  },
  {
    name: "Code",
    icon: <Code className="h-8 w-8" />,
    description: "Writing and reviewing code with best practices",
    color: "from-indigo-500 to-indigo-600"
  },
  {
    name: "Build",
    icon: <Wrench className="h-8 w-8" />,
    description: "Building and packaging applications",
    color: "from-purple-500 to-purple-600"
  },
  {
    name: "Test",
    icon: <Terminal className="h-8 w-8" />,
    description: "Automated testing and quality assurance",
    color: "from-fuchsia-500 to-fuchsia-600"
  },
  {
    name: "Deploy",
    icon: <Cloud className="h-8 w-8" />,
    description: "Continuous deployment to production environments",
    color: "from-pink-500 to-pink-600"
  },
  {
    name: "Operate",
    icon: <Server className="h-8 w-8" />,
    description: "System operations and infrastructure management",
    color: "from-red-500 to-red-600"
  },
  {
    name: "Monitor",
    icon: <ServerCog className="h-8 w-8" />,
    description: "Performance monitoring and alerting",
    color: "from-orange-500 to-orange-600"
  },
  {
    name: "Optimize",
    icon: <Database className="h-8 w-8" />,
    description: "Continuous improvement and optimization",
    color: "from-amber-500 to-amber-600"
  }
];

const DevOpsLifecycle = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [activeStage, setActiveStage] = useState(0);
  const [isVisible, setIsVisible] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const animationRef = useRef<number | null>(null);

  // Detect when section is visible
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

  // Mouse movement handler
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (containerRef.current) {
        const rect = containerRef.current.getBoundingClientRect();
        const x = (e.clientX - rect.left) / rect.width;
        const y = (e.clientY - rect.top) / rect.height;
        setMousePosition({ x, y });
      }
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  // Rotate through stages
  useEffect(() => {
    if (isVisible) {
      const interval = setInterval(() => {
        setActiveStage(prev => (prev + 1) % lifecycleStages.length);
      }, 3000);
      
      return () => clearInterval(interval);
    }
  }, [isVisible]);

  // Canvas animation
  useEffect(() => {
    if (!isVisible || !canvasRef.current) return;

    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Set canvas size
    const resizeCanvas = () => {
      const { width, height } = canvas.getBoundingClientRect();
      canvas.width = width * window.devicePixelRatio;
      canvas.height = height * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Particles
    const particles: {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      color: string;
      life: number;
      maxLife: number;
    }[] = [];

    const createParticles = () => {
      if (particles.length > 100) return;
      
      const stageIndex = activeStage;
      const colors = ['#8B5CF6', '#6366F1', '#EC4899', '#F43F5E'];
      
      for (let i = 0; i < 3; i++) {
        const angle = (stageIndex / lifecycleStages.length) * Math.PI * 2;
        const distance = 150;
        const x = canvas.width / 2 + Math.cos(angle) * distance;
        const y = canvas.height / 2 + Math.sin(angle) * distance;

        particles.push({
          x: x + (Math.random() - 0.5) * 50,
          y: y + (Math.random() - 0.5) * 50,
          size: Math.random() * 4 + 1,
          speedX: (Math.random() - 0.5) * 2,
          speedY: (Math.random() - 0.5) * 2,
          color: colors[Math.floor(Math.random() * colors.length)],
          life: 0,
          maxLife: 100 + Math.random() * 100
        });
      }
    };

    const updateParticles = () => {
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        p.life++;
        
        if (p.life > p.maxLife) {
          particles.splice(i, 1);
          i--;
          continue;
        }

        p.x += p.speedX;
        p.y += p.speedY;
        p.size *= 0.99;
      }
    };

    const drawParticles = () => {
      for (const p of particles) {
        const opacity = 1 - (p.life / p.maxLife);
        ctx.globalAlpha = opacity;
        ctx.fillStyle = p.color;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fill();
      }
      ctx.globalAlpha = 1;
    };

    const drawConnections = () => {
      const radius = 150;
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      
      ctx.lineWidth = 2;
      ctx.strokeStyle = '#8B5CF680';
      
      // Draw the circular path
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
      ctx.stroke();

      // Draw stage points and connections
      lifecycleStages.forEach((_, index) => {
        const angle = (index / lifecycleStages.length) * Math.PI * 2;
        const x = centerX + Math.cos(angle) * radius;
        const y = centerY + Math.sin(angle) * radius;
        
        // Draw point
        ctx.fillStyle = index === activeStage ? '#EC4899' : '#8B5CF6';
        ctx.beginPath();
        ctx.arc(x, y, index === activeStage ? 8 : 5, 0, Math.PI * 2);
        ctx.fill();
        
        // Draw connection to next point
        if (index < lifecycleStages.length - 1) {
          const nextAngle = ((index + 1) / lifecycleStages.length) * Math.PI * 2;
          const nextX = centerX + Math.cos(nextAngle) * radius;
          const nextY = centerY + Math.sin(nextAngle) * radius;
          
          ctx.beginPath();
          ctx.moveTo(x, y);
          ctx.lineTo(nextX, nextY);
          ctx.stroke();
        }
      });

      // Connect last point to first point
      const firstAngle = 0;
      const lastAngle = ((lifecycleStages.length - 1) / lifecycleStages.length) * Math.PI * 2;
      
      const firstX = centerX + Math.cos(firstAngle) * radius;
      const firstY = centerY + Math.sin(firstAngle) * radius;
      
      const lastX = centerX + Math.cos(lastAngle) * radius;
      const lastY = centerY + Math.sin(lastAngle) * radius;
      
      ctx.beginPath();
      ctx.moveTo(lastX, lastY);
      ctx.lineTo(firstX, firstY);
      ctx.stroke();

      // Draw animated cursor on active stage
      const stageAngle = (activeStage / lifecycleStages.length) * Math.PI * 2;
      const cursorX = centerX + Math.cos(stageAngle) * radius;
      const cursorY = centerY + Math.sin(stageAngle) * radius;
      
      ctx.fillStyle = '#EC4899';
      ctx.beginPath();
      ctx.arc(cursorX, cursorY, 10, 0, Math.PI * 2);
      ctx.fill();
      
      // Highlight line between stages for animation
      const progress = (Date.now() % 3000) / 3000; // 3 seconds cycle
      const currentIndex = activeStage;
      const nextIndex = (activeStage + 1) % lifecycleStages.length;
      
      const currentAngle = (currentIndex / lifecycleStages.length) * Math.PI * 2;
      const nextAngle = (nextIndex / lifecycleStages.length) * Math.PI * 2;
      
      const currentX = centerX + Math.cos(currentAngle) * radius;
      const currentY = centerY + Math.sin(currentAngle) * radius;
      
      const nextX = centerX + Math.cos(nextAngle) * radius;
      const nextY = centerY + Math.sin(nextAngle) * radius;
      
      // Draw gradient line with animation
      const gradientLine = ctx.createLinearGradient(currentX, currentY, nextX, nextY);
      gradientLine.addColorStop(0, '#8B5CF6');
      gradientLine.addColorStop(progress, '#EC4899');
      gradientLine.addColorStop(1, '#8B5CF6');
      
      ctx.lineWidth = 4;
      ctx.strokeStyle = gradientLine;
      ctx.beginPath();
      ctx.moveTo(currentX, currentY);
      ctx.lineTo(nextX, nextY);
      ctx.stroke();
      
      // Reset line width
      ctx.lineWidth = 2;
    };

    // 3D effect with mouse tracking
    const drawMouseEffect = () => {
      const { x, y } = mousePosition;
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      
      // Calculate perspective shift based on mouse position
      const shiftX = (x - 0.5) * 30;
      const shiftY = (y - 0.5) * 30;
      
      // Apply perspective to canvas
      ctx.save();
      ctx.translate(centerX, centerY);
      ctx.transform(
        1, 0, 
        0, 1, 
        shiftX, shiftY
      );
      ctx.translate(-centerX, -centerY);
      
      // Draw actual content here with perspective
      drawConnections();
      
      // Restore canvas
      ctx.restore();
    };

    const animate = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      createParticles();
      updateParticles();
      
      drawMouseEffect();
      drawParticles();
      
      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      window.removeEventListener('resize', resizeCanvas);
    };
  }, [isVisible, activeStage, mousePosition]);

  return (
    <section ref={containerRef} className="py-20 relative overflow-hidden">
      <div className="text-center mb-8">
        <Badge variant="outline" className="mb-4">DevOps Process</Badge>
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Continuous Lifecycle</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Modern DevOps embraces a continuous cycle of planning, development, delivery, and feedback
        </p>
      </div>
      
      <div className="relative h-[500px] mx-auto max-w-4xl">
        {/* 3D Canvas Background */}
        <canvas 
          ref={canvasRef} 
          className="absolute inset-0 w-full h-full z-0"
          style={{ width: '100%', height: '100%' }}
        />
        
        {/* Active Stage Details */}
        <div className="absolute inset-0 flex items-center justify-center z-10 pointer-events-none">
          <div className="glass-panel p-8 rounded-xl animate-scale-in max-w-md text-center">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-primary to-accent mb-4">
              {lifecycleStages[activeStage].icon}
            </div>
            <h3 className="text-2xl font-bold mb-2">{lifecycleStages[activeStage].name}</h3>
            <p className="text-muted-foreground">{lifecycleStages[activeStage].description}</p>
          </div>
        </div>
      </div>
      
      {/* Stage Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12 max-w-4xl mx-auto">
        {lifecycleStages.map((stage, index) => (
          <div 
            key={stage.name}
            onClick={() => setActiveStage(index)}
            className={`glass-panel p-4 rounded-xl cursor-pointer transition-all duration-300 
              ${index === activeStage ? 'ring-2 ring-primary scale-105' : 'hover:scale-105'}`}
          >
            <div className={`inline-flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br ${stage.color} mb-3`}>
              {stage.icon}
            </div>
            <h4 className="font-bold">{stage.name}</h4>
          </div>
        ))}
      </div>
    </section>
  );
};

export default DevOpsLifecycle;
