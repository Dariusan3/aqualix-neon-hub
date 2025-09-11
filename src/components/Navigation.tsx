import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Navigation = () => {
  return (
    <nav className="flex gap-4">
      <Link to="/teams">
        <Button variant="ghost" className="text-muted-foreground hover:text-neon hover:bg-neon/10 transition-all duration-300">
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