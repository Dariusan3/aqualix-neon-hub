import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";

const HeroSection = () => {
  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center px-6 overflow-hidden">
      {/* Navigation */}
      <div className="absolute top-8 right-8 z-20">
        <Navigation />
      </div>
      
      {/* Background glow effects */}
      <div className="absolute inset-0 bg-gradient-glow opacity-30" />
      <div className="absolute top-1/4 left-1/4 w-64 h-64 bg-primary/10 rounded-full blur-3xl animate-float" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-secondary/10 rounded-full blur-3xl animate-float" style={{ animationDelay: "1s" }} />
      
      {/* Content */}
      <div className="relative z-10 text-center max-w-6xl mx-auto">
        <h1 className="text-5xl md:text-7xl font-black mb-6 leading-tight">
          We are{" "}
          <span className="bg-gradient-neon bg-clip-text text-transparent glow-neon animate-glow">
            Aqualix
          </span>
          {" "}—<br />
          Innovating at Hackathons
        </h1>
        
        <p className="text-xl md:text-2xl text-muted-foreground mb-12 max-w-3xl mx-auto leading-relaxed">
          A community of builders in{" "}
          <span className="text-primary font-semibold">Web</span>,{" "}
          <span className="text-secondary font-semibold">AI</span>,{" "}
          <span className="text-primary font-semibold">Embedded</span> &{" "}
          <span className="text-secondary font-semibold">Cyber Security</span>.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-6 justify-center items-center">
          <Link to="/teams">
            <Button variant="neon" size="lg" className="text-lg px-8 py-4">
              Meet the Teams
            </Button>
          </Link>
          <Link to="/join-us">
            <Button variant="neon-outline" size="lg" className="text-lg px-8 py-4">
              Join Aqualix
            </Button>
          </Link>
        </div>
      </div>
      
      {/* Scroll indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
        <div className="w-1 h-8 bg-gradient-to-b from-primary to-transparent rounded-full" />
      </div>
    </section>
  );
};

export default HeroSection;