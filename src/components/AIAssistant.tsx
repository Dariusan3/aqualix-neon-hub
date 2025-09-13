import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { MessageCircle, X, Send, Settings } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Message {
  id: string;
  text: string;
  isUser: boolean;
  timestamp: Date;
}

const AIAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [showApiKeyInput, setShowApiKeyInput] = useState(false);
  const [apiKey, setApiKey] = useState("");
  const [tempApiKey, setTempApiKey] = useState("");
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      text: "Hi! I'm Aqualix AI Assistant powered by real AI. I have full context about our hackathon team. How can I help you today?",
      isUser: false,
      timestamp: new Date(),
    },
  ]);
  const [inputValue, setInputValue] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const scrollAreaRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  // Load API key from localStorage on component mount
  useEffect(() => {
    const savedApiKey = localStorage.getItem("openai_api_key");
    if (savedApiKey) {
      setApiKey(savedApiKey);
    }
  }, []);

  const AQUALIX_CONTEXT = `
You are Aqualix AI Assistant, representing the Aqualix hackathon team. Here's everything you need to know:

ABOUT AQUALIX:
- We are a dynamic hackathon team focused on innovation across Web Development, AI, Embedded Systems, and Cyber Security
- We participate in various hackathons and competitions with great success
- We welcome team members of all skill levels - passion and willingness to learn matter most

OUR TEAMS:
1. Web Development Team: Uses React, Node.js, and modern web frameworks
2. AI Team: Works with machine learning, data science, and AI technologies
3. Embedded Systems Team: Handles Arduino, IoT, and hardware projects  
4. Cyber Security Team: Focuses on ethical hacking and security research

HOW TO JOIN:
- Visit our "Join Us" page to submit an application
- We have openings in all four team areas
- Application includes: Name, Email, LinkedIn/GitHub, Preferred Team, Motivation, and optional CV upload

CONTACT & SOCIAL:
- Contact form available on our homepage
- Social media: GitHub, LinkedIn, Instagram, Discord
- We're always open to collaborations and partnerships

WEBSITE SECTIONS:
- Home: Overview and contact form
- Teams: Meet our amazing team members
- Hackathons: Past achievements and upcoming events
- Join Us: Application form for new members

Always be helpful, enthusiastic, and encourage visitors to explore our different pages and consider joining our team!
`;

  const getAIResponse = async (userMessage: string): Promise<string> => {
    if (!apiKey) {
      return "I need an OpenAI API key to provide intelligent responses. Please click the settings button to add your API key. For now, I can tell you that Aqualix is a dynamic hackathon team with Web Development, AI, Embedded Systems, and Cyber Security teams!";
    }

    try {
      const response = await fetch('https://api.openai.com/v1/chat/completions', {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${apiKey}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          model: 'gpt-3.5-turbo',
          messages: [
            {
              role: 'system',
              content: AQUALIX_CONTEXT
            },
            {
              role: 'user',
              content: userMessage
            }
          ],
          max_tokens: 200,
          temperature: 0.7,
        }),
      });

      if (!response.ok) {
        throw new Error(`API Error: ${response.status}`);
      }

      const data = await response.json();
      return data.choices[0]?.message?.content || "I'm having trouble processing that right now. Could you try rephrasing your question?";
      
    } catch (error) {
      console.error('AI Response Error:', error);
      toast({
        title: "AI Error",
        description: "There was an issue getting an AI response. Please check your API key.",
        variant: "destructive"
      });
      return "I'm experiencing some technical difficulties. Please try again or contact us directly through our contact form.";
    }
  };

  const saveApiKey = () => {
    if (tempApiKey.trim()) {
      setApiKey(tempApiKey);
      localStorage.setItem("openai_api_key", tempApiKey);
      setTempApiKey("");
      setShowApiKeyInput(false);
      toast({
        title: "API Key Saved",
        description: "Your OpenAI API key has been saved locally.",
      });
    }
  };

  const handleSendMessage = async () => {
    if (!inputValue.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      text: inputValue,
      isUser: true,
      timestamp: new Date(),
    };

    const currentInput = inputValue;
    setMessages((prev) => [...prev, userMessage]);
    setInputValue("");
    setIsTyping(true);

    try {
      const aiResponseText = await getAIResponse(currentInput);
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: aiResponseText,
        isUser: false,
        timestamp: new Date(),
      };
      
      setMessages((prev) => [...prev, aiResponse]);
    } catch (error) {
      console.error('Error getting AI response:', error);
      const errorResponse: Message = {
        id: (Date.now() + 1).toString(),
        text: "Sorry, I'm having trouble responding right now. Please try again later or contact us directly!",
        isUser: false,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, errorResponse]);
    } finally {
      setIsTyping(false);
    }
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
                <span className="font-semibold text-primary-foreground">
                  Aqualix AI {apiKey ? "🤖" : "⚙️"}
                </span>
              </div>
              <div className="flex gap-1">
                <Button
                  onClick={() => setShowApiKeyInput(!showApiKeyInput)}
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6 text-primary-foreground hover:bg-primary-foreground/20"
                  title={apiKey ? "API Key configured" : "Configure API Key"}
                >
                  <Settings className="h-4 w-4" />
                </Button>
                <Button
                  onClick={() => setIsOpen(false)}
                  variant="ghost"
                  size="icon"
                  className="h-6 w-6 text-primary-foreground hover:bg-primary-foreground/20"
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>

            {/* API Key Input */}
            {showApiKeyInput && (
              <div className="p-3 border-b border-border bg-muted/50">
                <div className="text-xs text-muted-foreground mb-2">
                  Enter your OpenAI API Key for real AI responses:
                </div>
                <div className="flex gap-2">
                  <Input
                    type="password"
                    value={tempApiKey}
                    onChange={(e) => setTempApiKey(e.target.value)}
                    placeholder="sk-..."
                    className="text-xs"
                  />
                  <Button onClick={saveApiKey} size="sm" className="px-2">
                    Save
                  </Button>
                </div>
                <div className="text-xs text-muted-foreground mt-1">
                  Your key is stored locally and never shared.
                </div>
              </div>
            )}

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