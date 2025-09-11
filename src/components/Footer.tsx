import { Button } from "@/components/ui/button";
import { Github, Linkedin, Instagram, MessageCircle } from "lucide-react";

const Footer = () => {
  const socialLinks = [
    {
      name: "GitHub",
      icon: Github,
      url: "https://github.com/aqualix-team",
      hoverColor: "hover:text-green-400"
    },
    {
      name: "LinkedIn", 
      icon: Linkedin,
      url: "https://linkedin.com/company/aqualix",
      hoverColor: "hover:text-blue-400"
    },
    {
      name: "Instagram",
      icon: Instagram,
      url: "https://instagram.com/aqualix_team",
      hoverColor: "hover:text-pink-400"
    },
    {
      name: "Discord",
      icon: MessageCircle,
      url: "https://discord.gg/aqualix",
      hoverColor: "hover:text-purple-400"
    }
  ];

  return (
    <footer className="border-t border-border/20 bg-background/95 backdrop-blur-sm">
      <div className="container mx-auto px-6 py-12">
        <div className="flex flex-col items-center space-y-8">
          {/* Logo/Brand */}
          <div className="text-center">
            <h3 className="text-2xl font-bold mb-2">
              <span className="bg-gradient-neon bg-clip-text text-transparent glow-neon">
                Aqualix
              </span>
            </h3>
            <p className="text-muted-foreground">
              Innovating at Hackathons
            </p>
          </div>

          {/* Social Links */}
          <div className="flex items-center space-x-6">
            {socialLinks.map((social) => {
              const IconComponent = social.icon;
              return (
                <a
                  key={social.name}
                  href={social.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group"
                  aria-label={`Follow us on ${social.name}`}
                >
                  <Button
                    variant="ghost"
                    size="icon"
                    className={`text-muted-foreground transition-all duration-300 ${social.hoverColor} hover:scale-110 hover:shadow-glow group-hover:bg-transparent`}
                  >
                    <IconComponent className="w-5 h-5" />
                  </Button>
                </a>
              );
            })}
          </div>

          {/* Quick Links */}
          <div className="flex flex-wrap justify-center gap-6 text-sm">
            <a 
              href="/teams" 
              className="text-muted-foreground hover:text-neon transition-colors duration-300 story-link"
            >
              Teams
            </a>
            <a 
              href="/hackathons" 
              className="text-muted-foreground hover:text-neon transition-colors duration-300 story-link"
            >
              Hackathons
            </a>
            <a 
              href="/join-us" 
              className="text-muted-foreground hover:text-neon transition-colors duration-300 story-link"
            >
              Join Us
            </a>
            <a 
              href="#contact" 
              className="text-muted-foreground hover:text-neon transition-colors duration-300 story-link"
            >
              Contact
            </a>
          </div>

          {/* Divider */}
          <div className="w-full max-w-md h-px bg-gradient-to-r from-transparent via-border to-transparent opacity-50" />

          {/* Copyright */}
          <div className="text-center text-muted-foreground text-sm">
            <p>© 2025 Aqualix Hackathon Team</p>
            <p className="mt-1 text-xs">
              Built with passion for innovation 🚀
            </p>
          </div>

          {/* Decorative glow effect */}
          <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 w-32 h-1 bg-gradient-neon opacity-30 blur-sm" />
        </div>
      </div>
    </footer>
  );
};

export default Footer;