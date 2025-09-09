import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Lightbulb, ExternalLink } from "lucide-react";
import { format } from "date-fns";
import CountdownTimer from "./CountdownTimer";

interface UpcomingHackathonProps {
  name: string;
  date: Date;
  location: string;
  theme: string;
  description: string;
  registrationUrl?: string;
}

const UpcomingHackathonCard = ({ 
  name, 
  date, 
  location, 
  theme, 
  description, 
  registrationUrl 
}: UpcomingHackathonProps) => {
  return (
    <Card className="bg-card/50 backdrop-blur-sm border border-border/50 hover:border-primary/50 transition-all duration-300 hover:glow-neon group overflow-hidden">
      <div className="p-8">
        <div className="flex items-start justify-between mb-6">
          <div>
            <h3 className="text-2xl font-bold mb-2 group-hover:text-primary transition-colors">
              {name}
            </h3>
            <Badge variant="secondary" className="mb-4">
              <Lightbulb size={14} className="mr-1" />
              {theme}
            </Badge>
          </div>
          <div className="text-right text-sm text-muted-foreground">
            <div className="flex items-center gap-1 mb-1">
              <Calendar size={14} />
              {format(date, "MMM dd, yyyy")}
            </div>
            <div className="flex items-center gap-1">
              <MapPin size={14} />
              {location}
            </div>
          </div>
        </div>

        <p className="text-muted-foreground mb-6 leading-relaxed">
          {description}
        </p>

        <CountdownTimer targetDate={date} className="mb-6" />

        {registrationUrl && (
          <div className="flex justify-center">
            <Button variant="neon" asChild>
              <a href={registrationUrl} target="_blank" rel="noopener noreferrer">
                Register Now
                <ExternalLink size={16} className="ml-2" />
              </a>
            </Button>
          </div>
        )}
      </div>
      
      {/* Glow effect overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
    </Card>
  );
};

export default UpcomingHackathonCard;