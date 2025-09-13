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

  const getAIResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase();
    
    // Greeting responses
    if (message.includes("hello") || message.includes("hi") || message.includes("hey")) {
      return "Hello! Welcome to Aqualix! I'm here to help you learn about our hackathon team. What would you like to know?";
    }
    
    // Joining and recruitment
    if (message.includes("join") || message.includes("application") || message.includes("recruit") || message.includes("apply")) {
      return "Great to hear you're interested in joining us! You can apply through our 'Join Us' page. We have openings in Web Development, AI, Embedded Systems, and Cyber Security teams. What's your area of interest?";
    }
    
    // Team and members
    if (message.includes("team") || message.includes("member") || message.includes("people") || message.includes("who")) {
      return "Our team consists of talented individuals across different domains. Check out our Teams page to meet our amazing members! We're a diverse group of developers, AI enthusiasts, hardware hackers, and security experts.";
    }
    
    // Hackathons and competitions
    if (message.includes("hackathon") || message.includes("competition") || message.includes("event") || message.includes("participate")) {
      return "We actively participate in hackathons and have achieved great results! Visit our Hackathons page to see our past achievements and upcoming events. We love the challenge and innovation that hackathons bring!";
    }
    
    // Contact information
    if (message.includes("contact") || message.includes("reach") || message.includes("email") || message.includes("social")) {
      return "You can reach us through our contact form at the bottom of the homepage, or connect with us on GitHub, LinkedIn, Instagram, and Discord! We're always happy to chat about collaborations and partnerships.";
    }
    
    // Technology and skills
    if (message.includes("technology") || message.includes("tech") || message.includes("skill") || message.includes("programming") || message.includes("code")) {
      return "We work with cutting-edge technologies! Our Web team uses React, Node.js, and modern frameworks. Our AI team works with machine learning and data science. Our Embedded team handles Arduino, IoT, and hardware projects. Our Cyber Security team focuses on ethical hacking and security research.";
    }
    
    // About Aqualix
    if (message.includes("aqualix") || message.includes("about") || message.includes("what is") || message.includes("tell me")) {
      return "Aqualix is a dynamic hackathon team focused on innovation across Web Development, AI, Embedded Systems, and Cyber Security! We're passionate about technology, learning, and building amazing projects together.";
    }
    
    // Location and meetings
    if (message.includes("where") || message.includes("location") || message.includes("meet") || message.includes("office")) {
      return "We're a diverse team that collaborates both online and at various hackathon venues! For specific meeting information or collaboration opportunities, feel free to reach out through our contact form.";
    }
    
    // Projects and portfolio
    if (message.includes("project") || message.includes("portfolio") || message.includes("work") || message.includes("built")) {
      return "We've worked on numerous exciting projects across all our domains! Check out our Hackathons page to see some of our achievements, and visit our Teams page to learn more about what each team specializes in.";
    }
    
    // Requirements and qualifications
    if (message.includes("requirement") || message.includes("qualification") || message.includes("experience") || message.includes("beginner")) {
      return "We welcome team members of all skill levels! Whether you're a beginner eager to learn or an experienced developer, there's a place for you at Aqualix. Passion and willingness to learn matter most to us!";
    }
    
    // Help and support
    if (message.includes("help") || message.includes("support") || message.includes("question") || message.includes("how")) {
      return "I'm here to help! You can ask me about our team structure, how to join, our technologies, past projects, or anything else about Aqualix. What specific information are you looking for?";
    }
    
    // Default fallback with context awareness
    if (message.length < 3) {
      return "Could you please provide a bit more detail? I'd love to help you learn more about Aqualix!";
    }
    
    // More intelligent fallback
    const fallbackResponses = [
      "That's an interesting question! While I might not have specific details about that, I can tell you that Aqualix is always exploring new technologies and opportunities. Feel free to contact us directly for more detailed information!",
      "I want to make sure I give you the most accurate information. Could you rephrase your question or let me know what specific aspect of Aqualix you're curious about?",
      "Great question! For the most up-to-date and detailed information about that topic, I'd recommend checking our website sections or reaching out through our contact form. Is there anything else about our team structure, joining process, or technologies I can help with?",
    ];
    
    return fallbackResponses[Math.floor(Math.random() * fallbackResponses.length)];
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