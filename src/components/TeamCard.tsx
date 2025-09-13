import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Github, Linkedin, ExternalLink } from "lucide-react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Link } from "react-router-dom";

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
  const [showApply, setShowApply] = useState(false);
  const [form, setForm] = useState({ name: "", email: "", motivation: "" });
  const [submitted, setSubmitted] = useState(false);

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
            {(() => {
              let teamKey = "";
              if (title.toLowerCase().includes("web")) teamKey = "web";
              else if (title.toLowerCase().includes("artificial")) teamKey = "ai";
              else if (title.toLowerCase().includes("embedded")) teamKey = "embedded";
              else if (title.toLowerCase().includes("cyber")) teamKey = "cybersecurity";
              return (
                <Link to="/join-us" state={{ team: teamKey }} className="flex-1">
                  <Button variant="neon-outline" className="w-full">Apply to Join this Team</Button>
                </Link>
              );
            })()}
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

      <Dialog open={showApply} onOpenChange={open => { setShowApply(open); if (!open) setSubmitted(false); }}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Apply to Join {title}</DialogTitle>
          </DialogHeader>
          {submitted ? (
            <div className="py-8 text-center">
              <div className="text-2xl mb-2">🎉</div>
              <div className="font-semibold mb-1">Thank you for your application!</div>
              <div className="text-muted-foreground text-sm">We'll be in touch soon.</div>
            </div>
          ) : (
            <form
              className="space-y-4"
              onSubmit={e => {
                e.preventDefault();
                setSubmitted(true);
              }}
            >
              <div>
                <label className="block mb-1 text-sm font-medium">Team</label>
                <Input value={title} readOnly className="bg-muted/50 cursor-not-allowed" />
              </div>
              <div>
                <label className="block mb-1 text-sm font-medium">Name</label>
                <Input
                  required
                  value={form.name}
                  onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                  placeholder="Your Name"
                />
              </div>
              <div>
                <label className="block mb-1 text-sm font-medium">Email</label>
                <Input
                  required
                  type="email"
                  value={form.email}
                  onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                  placeholder="you@email.com"
                />
              </div>
              <div>
                <label className="block mb-1 text-sm font-medium">Why do you want to join?</label>
                <Textarea
                  required
                  value={form.motivation}
                  onChange={e => setForm(f => ({ ...f, motivation: e.target.value }))}
                  placeholder="Tell us why you're interested..."
                  rows={3}
                />
              </div>
              <DialogFooter>
                <Button type="submit" variant="neon" className="w-full">Submit Application</Button>
              </DialogFooter>
            </form>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default TeamCard;