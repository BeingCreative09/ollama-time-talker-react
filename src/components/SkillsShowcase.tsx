
import { useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";

const skillsData = {
  "Infrastructure": [
    { name: "AWS", level: 90 },
    { name: "Azure", level: 85 },
    { name: "Google Cloud", level: 80 },
    { name: "Terraform", level: 95 },
    { name: "Ansible", level: 90 }
  ],
  "CI/CD": [
    { name: "Jenkins", level: 95 },
    { name: "GitHub Actions", level: 90 },
    { name: "GitLab CI", level: 85 },
    { name: "ArgoCD", level: 80 },
    { name: "CircleCI", level: 75 }
  ],
  "Containerization": [
    { name: "Docker", level: 95 },
    { name: "Kubernetes", level: 90 },
    { name: "Helm", level: 85 },
    { name: "Docker Compose", level: 95 },
    { name: "Kubernetes Operators", level: 80 }
  ],
  "Monitoring": [
    { name: "Prometheus", level: 90 },
    { name: "Grafana", level: 95 },
    { name: "ELK Stack", level: 85 },
    { name: "Datadog", level: 80 },
    { name: "New Relic", level: 75 }
  ]
};

const SkillsShowcase = () => {
  const [hoveredSkill, setHoveredSkill] = useState<string | null>(null);

  return (
    <section id="skills" className="py-20">
      <div className="text-center mb-16">
        <Badge className="mb-4">Expertise</Badge>
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Technical Skills</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Specialized in modern DevOps practices with extensive experience in cloud infrastructure,
          containerization, and automation pipelines.
        </p>
      </div>
      
      <Tabs defaultValue="Infrastructure" className="w-full max-w-4xl mx-auto">
        <TabsList className="grid grid-cols-2 md:grid-cols-4 w-full mb-8">
          {Object.keys(skillsData).map((category) => (
            <TabsTrigger key={category} value={category} className="text-sm md:text-base">
              {category}
            </TabsTrigger>
          ))}
        </TabsList>
        
        {Object.entries(skillsData).map(([category, skills]) => (
          <TabsContent key={category} value={category} className="mt-0">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {skills.map((skill) => (
                <Card 
                  key={skill.name}
                  className={`transform transition-all duration-300 ${
                    hoveredSkill === skill.name ? "scale-105" : ""
                  }`}
                  onMouseEnter={() => setHoveredSkill(skill.name)}
                  onMouseLeave={() => setHoveredSkill(null)}
                >
                  <CardContent className="p-6">
                    <div className="text-xl font-bold mb-3">{skill.name}</div>
                    <div className="h-2 bg-secondary rounded-full overflow-hidden">
                      <div 
                        className="h-full bg-primary transition-all duration-1000 ease-out"
                        style={{ 
                          width: hoveredSkill === skill.name ? `${skill.level}%` : "0%"
                        }}
                      />
                    </div>
                    <div className="mt-2 text-right text-sm text-muted-foreground">
                      {hoveredSkill === skill.name ? `${skill.level}%` : "Hover to see proficiency"}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </section>
  );
};

export default SkillsShowcase;
