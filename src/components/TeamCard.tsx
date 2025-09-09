import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Github, Linkedin, ExternalLink } from "lucide-react";

interface Member {
  id: number;
  name: string;
  role: string;
  photo: string;
  skills: string[];
  github?: string;
  linkedin?: string;
}

interface TeamCardProps {
  title: string;
  description: string;
  icon: React.ReactNode;
  members: Member[];
  color: "primary" | "secondary";
}

const TeamCard = ({ title, description, icon, members, color }: TeamCardProps) => {
  const [showMembers, setShowMembers] = useState(false);

  return (
    <div className="space-y-6">
      {/* Team Card */}
      <Card className="bg-card/50 backdrop-blur-sm border border-border/50 hover:border-primary/50 transition-all duration-300 hover:glow-neon group">
        <div className="p-8">
          <div className="flex items-center gap-4 mb-6">
            <div className={`p-3 rounded-lg ${color === 'primary' ? 'bg-primary/20 text-primary' : 'bg-secondary/20 text-secondary'} group-hover:animate-pulse`}>
              {icon}
            </div>
            <h3 className="text-2xl font-bold">{title}</h3>
          </div>
          
          <p className="text-muted-foreground mb-6 leading-relaxed">
            {description}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4">
            <Button
              variant="neon"
              onClick={() => setShowMembers(!showMembers)}
              className="flex-1"
            >
              {showMembers ? "Hide Members" : "Meet the Members"}
            </Button>
            <Button variant="neon-outline" className="flex-1">
              Apply to Join this Team
            </Button>
          </div>
        </div>
      </Card>

      {/* Members Grid */}
      {showMembers && (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 animate-fade-in">
          {members.map((member) => (
            <Card key={member.id} className="bg-card/50 backdrop-blur-sm border border-border/50 hover:border-primary/30 transition-all duration-300 hover:scale-105 group">
              <div className="p-6">
                <div className="flex flex-col items-center text-center">
                  <div className="w-20 h-20 rounded-full overflow-hidden mb-4 border-2 border-primary/20 group-hover:border-primary/50 transition-colors">
                    <img
                      src={member.photo}
                      alt={member.name}
                      className="w-full h-full object-cover"
                    />
                  </div>
                  
                  <h4 className="text-lg font-semibold text-foreground mb-1">
                    {member.name}
                  </h4>
                  
                  <p className="text-muted-foreground mb-4">
                    {member.role}
                  </p>
                  
                  <div className="flex flex-wrap gap-2 mb-4 justify-center">
                    {member.skills.map((skill, index) => (
                      <Badge key={index} variant="secondary" className="text-xs">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                  
                  <div className="flex gap-3">
                    {member.github && (
                      <a
                        href={member.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-lg bg-muted/50 hover:bg-primary/20 hover:text-primary transition-all duration-200 hover:scale-110"
                      >
                        <Github size={18} />
                      </a>
                    )}
                    {member.linkedin && (
                      <a
                        href={member.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-lg bg-muted/50 hover:bg-secondary/20 hover:text-secondary transition-all duration-200 hover:scale-110"
                      >
                        <Linkedin size={18} />
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </Card>
          ))}
        </div>
      )}
    </div>
  );
};

export default TeamCard;