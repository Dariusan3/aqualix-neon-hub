import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MessageCircle, X, Send } from "lucide-react";

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

const AIAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hi! I'm Aqualix AI Assistant. How can I help you learn more about our hackathon team?",
      isUser: false,
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  const mockResponses = [
    "Aqualix is a dynamic hackathon team focused on innovation across Web Development, AI, Embedded Systems, and Cyber Security!",
    "We participate in various hackathons and competitions. Check out our Teams page to see our amazing members!",
    "Interested in joining us? Visit our Join Us page to submit your application and become part of the Aqualix family!",
    "Our team specializes in cutting-edge technologies and we're always looking for passionate developers to join our ranks.",
    "You can find our past hackathon achievements on the Hackathons page. We've participated in some amazing events!",
    "Feel free to contact us through our contact form if you have any specific questions about collaborations or partnerships.",
  ];

  const getAIResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase();
    
    if (message.includes("join") || message.includes("application")) {
      return "Great! You can join our team by visiting the 'Join Us' page. We have openings in Web Development, AI, Embedded Systems, and Cyber Security teams.";
    } else if (message.includes("team") || message.includes("member")) {
      return "Our team consists of talented individuals across different domains. Check out our Teams page to meet our amazing members!";
    } else if (message.includes("hackathon") || message.includes("competition")) {
      return "We actively participate in hackathons and have achieved great results! Visit our Hackathons page to see our past achievements and upcoming events.";
    } else if (message.includes("contact") || message.includes("reach")) {
      return "You can reach us through our contact form at the bottom of the homepage, or connect with us on our social media channels!";
    } else if (message.includes("technology") || message.includes("tech")) {
      return "We work with cutting-edge technologies in Web Development (React, Node.js), AI/ML, Embedded Systems (Arduino, IoT), and Cyber Security.";
    } else {
      return mockResponses[Math.floor(Math.random() * mockResponses.length)];
    }
  };

  const handleSendMessage = () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      isUser: true,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    // Simulate AI response delay
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: getAIResponse(inputValue),
        isUser: false,
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, aiResponse]);
      setIsTyping(false);
    }, 1000 + Math.random() * 1000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSendMessage();
    }
  };

  useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollElement = scrollAreaRef.current.querySelector("[data-radix-scroll-area-viewport]");
      if (scrollElement) {
        scrollElement.scrollTop = scrollElement.scrollHeight;
      }
    }
  }, [messages]);

  return (
    <>
      {/* Chat Widget */}
      <div className="fixed bottom-6 right-6 z-50">
        {!isOpen && (
          <Button
            onClick={() => setIsOpen(true)}
            className="h-14 w-14 rounded-full bg-gradient-neon hover:scale-110 transition-all duration-300 shadow-lg hover:shadow-xl hover:shadow-primary/50"
            size="icon"
          >
            <MessageCircle className="h-6 w-6" />
          </Button>
        )}

        {isOpen && (
          <div className="bg-card border border-border rounded-lg shadow-2xl w-80 h-96 flex flex-col overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-neon px-4 py-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="w-2 h-2 bg-primary-foreground rounded-full animate-pulse"></div>
                <span className="font-semibold text-primary-foreground">Aqualix AI</span>
              </div>
              <Button
                onClick={() => setIsOpen(false)}
                variant="ghost"
                size="icon"
                className="h-6 w-6 text-primary-foreground hover:bg-primary-foreground/20"
              >
                <X className="h-4 w-4" />
              </Button>
            </div>

            {/* Messages */}
            <ScrollArea ref={scrollAreaRef} className="flex-1 p-4">
              <div className="space-y-3">
                {messages.map((message) => (
                  <div
                    key={message.id}
                    className={`flex ${message.isUser ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`max-w-[80%] rounded-lg px-3 py-2 text-sm ${
                        message.isUser
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted text-muted-foreground border border-border"
                      }`}
                    >
                      {message.text}
                    </div>
                  </div>
                ))}
                
                {isTyping && (
                  <div className="flex justify-start">
                    <div className="bg-muted border border-border rounded-lg px-3 py-2 text-sm text-muted-foreground">
                      <div className="flex gap-1">
                        <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "0ms" }}></div>
                        <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "150ms" }}></div>
                        <div className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: "300ms" }}></div>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </ScrollArea>

            {/* Input */}
            <div className="border-t border-border p-3">
              <div className="flex gap-2">
                <Input
                  value={inputValue}
                  onChange={(e) => setInputValue(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Ask me anything about Aqualix..."
                  className="flex-1 bg-background border-border focus:border-primary"
                />
                <Button
                  onClick={handleSendMessage}
                  size="icon"
                  className="bg-primary hover:bg-primary/90 shrink-0"
                  disabled={!inputValue.trim() || isTyping}
                >
                  <Send className="h-4 w-4" />
                </Button>
              </div>
            </div>
          </div>
        )}
      </div>
    </>
  );
};

export default AIAssistant;