
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Briefcase, Calendar, Mail, MapPin, MessageSquare, Phone 
} from "lucide-react";

const ContactSection = () => {
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);
  
  const contactOptions = [
    {
      id: "email",
      icon: <Mail className="h-6 w-6" />,
      title: "Email Me",
      value: "alex@devops.expert",
      action: "Send Email"
    },
    {
      id: "call",
      icon: <Phone className="h-6 w-6" />,
      title: "Call Me",
      value: "+1 (555) 123-4567",
      action: "Call Now"
    },
    {
      id: "message",
      icon: <MessageSquare className="h-6 w-6" />,
      title: "Message Me",
      value: "Available for chat",
      action: "Start Chat"
    },
    {
      id: "meeting",
      icon: <Calendar className="h-6 w-6" />,
      title: "Schedule Meeting",
      value: "Check availability",
      action: "Book Time"
    }
  ];

  return (
    <section id="contact" className="py-20">
      <div className="text-center mb-16">
        <Badge className="mb-4">Contact</Badge>
        <h2 className="text-3xl md:text-4xl font-bold mb-4">Get In Touch</h2>
        <p className="text-muted-foreground max-w-2xl mx-auto">
          Interested in collaborating or have a project in mind? Let's discuss how I can help.
        </p>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
        <Card className="overflow-hidden">
          <CardContent className="p-0">
            <div className="glass-panel h-full p-6 space-y-4">
              <div className="flex items-center gap-3">
                <Briefcase className="h-5 w-5 text-primary" />
                <h3 className="text-xl font-bold">Work Inquiries</h3>
              </div>
              <p>
                Available for freelance projects, consulting, and full-time opportunities
                in DevOps, infrastructure automation, and Kafka implementation.
              </p>
              <div className="flex items-center gap-3 mt-4">
                <MapPin className="h-5 w-5 text-primary" />
                <span>Remote | San Francisco, CA</span>
              </div>
              <Button className="w-full mt-4">Send Work Inquiry</Button>
            </div>
          </CardContent>
        </Card>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {contactOptions.map((option) => (
            <Card 
              key={option.id}
              className={`transform transition-all duration-300 overflow-hidden ${
                hoveredCard === option.id ? "scale-105" : ""
              }`}
              onMouseEnter={() => setHoveredCard(option.id)}
              onMouseLeave={() => setHoveredCard(null)}
            >
              <CardContent className="p-6 flex flex-col h-full">
                <div className="mb-4 text-primary">{option.icon}</div>
                <h3 className="text-lg font-bold">{option.title}</h3>
                <p className="text-sm text-muted-foreground mb-4">{option.value}</p>
                <Button 
                  variant="outline" 
                  size="sm" 
                  className="mt-auto self-start"
                >
                  {option.action}
                </Button>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
      
      <div className="text-center mt-16">
        <p className="text-sm text-muted-foreground">
          © {new Date().getFullYear()} Alex DevOps. All rights reserved.
        </p>
      </div>
    </section>
  );
};

export default ContactSection;
