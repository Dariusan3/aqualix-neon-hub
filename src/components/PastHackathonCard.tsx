import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Lightbulb, Trophy, Users, Award } from "lucide-react";
import { format } from "date-fns";

interface Achievement {
  title: string;
  prize?: string;
  description: string;
}

interface PastHackathonProps {
  name: string;
  date: Date;
  location: string;
  theme: string;
  image: string;
  achievements: Achievement[];
  participants: number;
}

const PastHackathonCard = ({ 
  name, 
  date, 
  location, 
  theme, 
  image, 
  achievements,
  participants 
}: PastHackathonProps) => {
  return (
    <Card className="bg-card/50 backdrop-blur-sm border border-border/50 hover:border-secondary/50 transition-all duration-300 hover:glow-blue group overflow-hidden">
      {/* Image Section */}
      <div className="relative h-48 overflow-hidden">
        <img 
          src={image} 
          alt={name}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-card/80 to-transparent" />
        <div className="absolute bottom-4 left-4 right-4">
          <h3 className="text-xl font-bold text-white mb-1">{name}</h3>
          <div className="flex items-center gap-4 text-sm text-white/80">
            <div className="flex items-center gap-1">
              <Calendar size={14} />
              {format(date, "MMM yyyy")}
            </div>
            <div className="flex items-center gap-1">
              <MapPin size={14} />
              {location}
            </div>
          </div>
        </div>
      </div>

      {/* Content Section */}
      <div className="p-6">
        <div className="flex items-center justify-between mb-4">
          <Badge variant="secondary" className="mb-2">
            <Lightbulb size={14} className="mr-1" />
            {theme}
          </Badge>
          <div className="flex items-center gap-1 text-sm text-muted-foreground">
            <Users size={14} />
            {participants} participants
          </div>
        </div>

        {/* Achievements */}
        <div className="space-y-3">
          {achievements.map((achievement, index) => (
            <div key={index} className="flex items-start gap-3 p-3 bg-muted/30 rounded-lg border border-border/30">
              <div className="p-1 rounded-full bg-secondary/20 text-secondary mt-0.5">
                {achievement.prize ? <Trophy size={14} /> : <Award size={14} />}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h4 className="font-semibold text-sm">{achievement.title}</h4>
                  {achievement.prize && (
                    <Badge variant="outline" className="text-xs border-secondary/50 text-secondary">
                      {achievement.prize}
                    </Badge>
                  )}
                </div>
                <p className="text-xs text-muted-foreground">{achievement.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Glow effect overlay */}
      <div className="absolute inset-0 bg-gradient-to-br from-secondary/5 via-transparent to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
    </Card>
  );
};

export default PastHackathonCard;