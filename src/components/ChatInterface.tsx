
import { useState, useEffect, FormEvent, useRef } from "react";
import { ArrowUp } from "lucide-react";
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
    <div className="container mx-auto max-w-3xl min-h-screen py-8 px-4 flex flex-col">
      <div className="flex items-center justify-center mb-8 text-3xl font-light">
        <span className="text-primary mr-3">✺</span>
        <h1>{greeting}, {username}</h1>
      </div>
      
      <div className="flex-1 mb-4 overflow-y-auto bg-secondary/20 rounded-lg p-4">
        {chatHistory.length === 0 ? (
          <div className="text-center text-muted-foreground h-full flex items-center justify-center">
            <p>Start a conversation</p>
          </div>
        ) : (
          <div className="space-y-4">
            {chatHistory.map((msg, index) => (
              <div 
                key={index} 
                className={`p-3 rounded-lg ${msg.role === "user" ? "bg-secondary ml-12" : "bg-primary/10 mr-12"}`}
              >
                <p>{msg.content}</p>
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
          className="w-full pr-14 min-h-24 rounded-xl"
          disabled={loading || !selectedModel || isProcessing}
        />
        <div className="absolute bottom-4 right-4 flex items-center gap-2">
          <Select 
            value={selectedModel || ""} 
            onValueChange={handleModelChange}
            disabled={loading || models.length === 0}
          >
            <SelectTrigger className="w-32 h-10">
              <SelectValue placeholder={loading ? "Loading..." : "Model"} />
            </SelectTrigger>
            <SelectContent>
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
            className="rounded-full h-10 w-10"
          >
            <ArrowUp className="h-5 w-5" />
          </Button>
        </div>
      </form>
    </div>
  );
}
