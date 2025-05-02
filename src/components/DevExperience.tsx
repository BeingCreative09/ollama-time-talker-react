
import { useRef, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { 
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger 
} from "@/components/ui/collapsible";
import { ChartContainer, ChartLegend, ChartLegendContent } from "@/components/ui/chart";
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from "recharts";

const data = [
  {
    name: "Project A",
    complexity: 80,
    impact: 90,
    keywords: ["AWS", "Terraform", "Kubernetes"],
    description: "Built a fully automated CI/CD pipeline for a microservices architecture using AWS EKS, Terraform and GitLab CI"
  },
  {
    name: "Project B",
    complexity: 95,
    impact: 75,
    keywords: ["Kafka", "Kubernetes Operators", "Monitoring"],
    description: "Designed and implemented a custom Kafka operator for Kubernetes with automated failover and monitoring"
  },
  {
    name: "Project C",
    complexity: 70,
    impact: 95,
    keywords: ["Multi-Cloud", "Disaster Recovery", "High Availability"],
    description: "Implemented a multi-cloud infrastructure with 99.99% availability and comprehensive disaster recovery capabilities"
  },
  {
    name: "Project D",
    complexity: 85,
    impact: 85,
    keywords: ["Security", "Compliance", "Automation"],
    description: "Created an automated security scanning and compliance reporting system for containerized applications"
  },
];

const DevExperience = () => {
  const [selectedProject, setSelectedProject] = useState<string | null>(null);
  const cardsRef = useRef<HTMLDivElement>(null);
  
  const handleCardHover = (projectName: string) => {
    setSelectedProject(projectName);
  };
  
  return (
    <section className="py-20">
      <div className="text-center mb-16">
        <Badge className="mb-4">Experience</Badge>
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Project Highlights</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Key projects that demonstrate my expertise in complex DevOps challenges
        </p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        {/* Project visualization */}
        <div className="order-2 lg:order-1 h-[500px] flex items-center justify-center">
          <ChartContainer 
            config={{
              complexity: { color: "hsl(var(--primary))" },
              impact: { color: "hsl(var(--accent))" }
            }}
            className="w-full h-full"
          >
            <ResponsiveContainer>
              <BarChart
                data={data}
                layout="vertical"
                margin={{ top: 20, right: 30, left: 40, bottom: 5 }}
              >
                <XAxis type="number" domain={[0, 100]} />
                <YAxis 
                  type="category"
                  dataKey="name"
                  width={100}
                  tickLine={false}
                  axisLine={false}
                />
                <Tooltip />
                <Bar 
                  dataKey="complexity" 
                  stackId="a"
                  fill="currentColor"
                  className="fill-primary"
                  radius={[0, 4, 4, 0]}
                  onMouseOver={(data) => handleCardHover(data.name)}
                />
                <Bar 
                  dataKey="impact" 
                  stackId="b"
                  fill="currentColor"
                  className="fill-accent" 
                  radius={[0, 4, 4, 0]}
                  onMouseOver={(data) => handleCardHover(data.name)}
                />
              </BarChart>
            </ResponsiveContainer>
          </ChartContainer>
          
          <ChartLegend>
            <ChartLegendContent />
          </ChartLegend>
        </div>
        
        {/* Project details */}
        <div ref={cardsRef} className="order-1 lg:order-2 space-y-6">
          {data.map((project) => (
            <Collapsible
              key={project.name}
              open={selectedProject === project.name}
              onOpenChange={() => setSelectedProject(
                selectedProject === project.name ? null : project.name
              )}
            >
              <Card className={`transition-all duration-300 ${
                selectedProject === project.name 
                  ? "border-primary shadow-lg" 
                  : "hover:border-primary/50"
              }`}>
                <CollapsibleTrigger asChild>
                  <CardHeader className="cursor-pointer">
                    <div className="flex justify-between items-center">
                      <h3 className="text-xl font-bold">{project.name}</h3>
                      <div className="flex gap-2">
                        {project.keywords.map((keyword) => (
                          <Badge key={keyword} variant="outline">{keyword}</Badge>
                        ))}
                      </div>
                    </div>
                  </CardHeader>
                </CollapsibleTrigger>
                <CollapsibleContent>
                  <CardContent>
                    <p className="mb-4">{project.description}</p>
                    <div className="flex justify-between text-sm">
                      <div>
                        <span className="font-medium">Complexity:</span> {project.complexity}/100
                      </div>
                      <div>
                        <span className="font-medium">Business Impact:</span> {project.impact}/100
                      </div>
                    </div>
                  </CardContent>
                </CollapsibleContent>
              </Card>
            </Collapsible>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DevExperience;
