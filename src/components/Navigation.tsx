import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Navigation = () => {
  return (
    <nav className="flex gap-4">
      <Link to="/teams">
        <Button variant="ghost"  className="
            inline-flex h-12 animate-shimmer items-center justify-center 
            rounded-md border border-slate-800 bg-[linear-gradient(110deg,#000103,45%,#1e2631,55%,#000103)] 
            bg-[length:200%_100%] px-6 font-medium text-slate-400 transition-colors
             focus:outline-none focus:ring-2 focus:ring-slate-400 focus:ring-offset-2
              focus:ring-offset-slate-50
            ">
          Teams
        </Button>
      </Link>
      <Link to="/hackathons">
        <Button variant="ghost" className="text-muted-foreground hover:text-neon hover:bg-neon/10 transition-all duration-300">
          Hackathons
        </Button>
      </Link>
      <Link to="/join-us">
        <Button variant="ghost" className="text-muted-foreground hover:text-neon hover:bg-neon/10 transition-all duration-300">
          Join Us
        </Button>
      </Link>
    </nav>
  );
};

export default Navigation;