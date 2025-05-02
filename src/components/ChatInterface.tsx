
import { useState, useEffect, FormEvent, useRef } from "react";
import { ArrowUp, Cpu, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { Model, ollamaService } from "@/services/ollamaService";
import { getTimeBasedGreeting, getUsernameFromSystem } from "@/utils/timeUtils";
import { useToast } from "@/hooks/use-toast";

interface Message {
  role: "user" | "assistant";
  content: string;
}

export default function ChatInterface() {
  const [models, setModels] = useState<Model[]>([]);
  const [selectedModel, setSelectedModel] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [message, setMessage] = useState<string>("");
  const [chatHistory, setChatHistory] = useState<Message[]>([]);
  const [isProcessing, setIsProcessing] = useState<boolean>(false);
  const { toast } = useToast();
  const messageEndRef = useRef<HTMLDivElement>(null);
  
  const greeting = getTimeBasedGreeting();
  const username = getUsernameFromSystem();
  
  useEffect(() => {
    fetchModels();
  }, []);
  
  useEffect(() => {
    scrollToBottom();
  }, [chatHistory]);
  
  const fetchModels = async () => {
    setLoading(true);
    try {
      const availableModels = await ollamaService.getModels();
      setModels(availableModels);
      if (availableModels.length > 0) {
        setSelectedModel(availableModels[0].name);
      }
    } catch (error) {
      toast({
        title: "Error fetching models",
        description: "Could not connect to Ollama API. Is it running?",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };
  
  const handleSendMessage = async (e: FormEvent) => {
    e.preventDefault();
    
    if (!message.trim() || !selectedModel) return;
    
    const userMessage = message.trim();
    setMessage("");
    
    // Add user message to chat history
    setChatHistory((prev) => [...prev, { role: "user", content: userMessage }]);
    
    setIsProcessing(true);
    try {
      const response = await ollamaService.chatCompletion(selectedModel, userMessage);
      
      // Add assistant response to chat history
      setChatHistory((prev) => [...prev, { role: "assistant", content: response }]);
    } catch (error) {
      toast({
        title: "Error processing message",
        description: "Failed to get response from the model",
        variant: "destructive",
      });
    } finally {
      setIsProcessing(false);
    }
  };
  
  const handleModelChange = (value: string) => {
    setSelectedModel(value);
  };
  
  const scrollToBottom = () => {
    messageEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };
  
  return (
    <div className="container mx-auto max-w-4xl min-h-screen py-8 px-4 flex flex-col">
      <div className="flex items-center justify-center mb-12 mt-4 text-4xl font-light">
        <div className="glass-panel py-4 px-8 rounded-2xl flex items-center gap-4 float-animation">
          <Cpu className="text-primary h-8 w-8" />
          <h1 className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            {greeting}, {username}
          </h1>
        </div>
      </div>
      
      <div className="flex-1 mb-6 overflow-y-auto glass-panel rounded-2xl p-6">
        {chatHistory.length === 0 ? (
          <div className="text-center text-muted-foreground h-full flex flex-col items-center justify-center">
            <MessageSquare className="h-12 w-12 mb-4 text-primary/50" />
            <p className="text-lg">Start a conversation with your AI assistant</p>
            <p className="text-sm mt-2">Select a model and type a message below</p>
          </div>
        ) : (
          <div className="space-y-6">
            {chatHistory.map((msg, index) => (
              <div 
                key={index} 
                className={`p-4 rounded-2xl transition-all duration-300 ${
                  msg.role === "user" 
                    ? "bg-primary/10 border border-primary/20 ml-8" 
                    : "bg-accent/20 border border-accent/20 mr-8"
                }`}
              >
                <p className="text-base">{msg.content}</p>
              </div>
            ))}
            <div ref={messageEndRef} />
          </div>
        )}
      </div>
      
      <form onSubmit={handleSendMessage} className="relative">
        <Textarea
          placeholder="How can I help you today?"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          className="w-full pr-14 min-h-28 rounded-2xl glass-panel focus-visible:ring-primary"
          disabled={loading || !selectedModel || isProcessing}
        />
        <div className="absolute bottom-4 right-4 flex items-center gap-2">
          <Select 
            value={selectedModel || ""} 
            onValueChange={handleModelChange}
            disabled={loading || models.length === 0}
          >
            <SelectTrigger className="w-40 h-12 rounded-xl bg-white/70 dark:bg-black/40">
              <SelectValue placeholder={loading ? "Loading..." : "Select model"} />
            </SelectTrigger>
            <SelectContent className="border border-primary/20">
              {models.map((model) => (
                <SelectItem key={model.name} value={model.name}>
                  {model.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          
          <Button 
            type="submit" 
            size="icon" 
            disabled={!message.trim() || loading || !selectedModel || isProcessing}
            className="rounded-full h-12 w-12 bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/30"
          >
            <ArrowUp className="h-5 w-5" />
          </Button>
        </div>
      </form>
    </div>
  );
}
