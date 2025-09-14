import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ExternalLink, MapPin, Calendar, Lightbulb, Trophy } from "lucide-react";
import { Link } from "react-router-dom";

interface TimelineEvent {
  id: string;
  hackathonName: string;
  date: string;
  location: string;
  theme: string;
  project: {
    name: string;
    link: string;
  };
  results: {
    achievement: string;
    badge: string;
    prize?: string;
  };
  teamPhoto: string;
  year: string;
}

const timelineEvents: TimelineEvent[] = [
  {
    id: "hack-2024-1",
    hackathonName: "CyberGuard Hackathon 2024",
    date: "March 15-17, 2024",
    location: "San Francisco, CA",
    theme: "Cybersecurity & Privacy",
    project: {
      name: "SecureVault Pro",
      link: "/projects/securevault-pro"
    },
    results: {
      achievement: "1st Place Winner",
      badge: "🥇",
      prize: "$10,000"
    },
    teamPhoto: "/src/assets/hackathon-1.jpg",
    year: "2024"
  },
  {
    id: "hack-2023-2",
    hackathonName: "AI Innovation Summit",
    date: "November 8-10, 2023",
    location: "Austin, TX",
    theme: "Machine Learning & AI",
    project: {
      name: "NeuroPredict",
      link: "/projects/neuropredict"
    },
    results: {
      achievement: "2nd Place",
      badge: "🥈",
      prize: "$5,000"
    },
    teamPhoto: "/src/assets/hackathon-2.jpg",
    year: "2023"
  },
  {
    id: "hack-2023-1",
    hackathonName: "EmbeddedTech Challenge",
    date: "September 22-24, 2023",
    location: "Seattle, WA",
    theme: "IoT & Embedded Systems",
    project: {
      name: "SmartSensor Grid",
      link: "/projects/smartsensor-grid"
    },
    results: {
      achievement: "Finalist",
      badge: "⭐",
    },
    teamPhoto: "/src/assets/hackathon-3.jpg",
    year: "2023"
  },
  {
    id: "hack-2022-1",
    hackathonName: "WebDev Masters",
    date: "June 3-5, 2022",
    location: "New York, NY",
    theme: "Full-Stack Development",
    project: {
      name: "CloudSync Platform",
      link: "/projects/cloudsync-platform"
    },
    results: {
      achievement: "1st Place Winner",
      badge: "🥇",
      prize: "$8,000"
    },
    teamPhoto: "/src/assets/hackathon-4.jpg",
    year: "2022"
  }
];

const AboutSection = () => {
  return (
    <section className="py-24 px-4 bg-gradient-to-b from-background via-background/50 to-background relative overflow-hidden">
      {/* Background effects */}
      <div className="absolute inset-0 bg-grid-pattern opacity-5" />
      <div className="absolute top-1/4 -left-32 w-64 h-64 bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-1/4 -right-32 w-64 h-64 bg-secondary/10 rounded-full blur-3xl" />
      
      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold mb-6 bg-gradient-to-r from-primary via-secondary to-accent bg-clip-text text-transparent">
            Our Hackathon Journey
          </h2>
          <p className="text-xl text-muted-foreground max-w-3xl mx-auto leading-relaxed">
            From humble beginnings to championship victories, follow Aqualix's evolution 
            through the world's most prestigious hackathons.
          </p>
        </div>

        {/* Timeline */}
        <div className="relative">
          {/* Central timeline line */}
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-primary via-secondary to-accent opacity-30" />
          <div className="absolute left-1/2 transform -translate-x-1/2 w-1 h-full bg-gradient-to-b from-primary via-secondary to-accent blur-sm" />

          <div className="space-y-16">
            {timelineEvents.map((event, index) => (
              <div key={event.id} className={`flex items-center ${index % 2 === 0 ? 'flex-row' : 'flex-row-reverse'} gap-8`}>
                {/* Timeline dot */}
                <div className="absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-primary rounded-full border-4 border-background shadow-lg z-10">
                  <div className="absolute inset-0 bg-primary rounded-full animate-ping opacity-25" />
                </div>

                {/* Year marker */}
                <div className="absolute left-1/2 transform -translate-x-1/2 -translate-y-8 text-sm font-bold text-primary/60">
                  {event.year}
                </div>

                {/* Content */}
                <div className="w-5/12">
                  <Card className="bg-card/50 backdrop-blur-sm border border-border/50 hover:border-primary/50 transition-all duration-500 hover:glow-neon group overflow-hidden">
                    <div className="p-6">
                      {/* Achievement badge */}
                      <div className="flex items-center justify-between mb-4">
                        <Badge variant="secondary" className="text-lg px-3 py-1">
                          {event.results.badge} {event.results.achievement}
                        </Badge>
                        {event.results.prize && (
                          <span className="text-sm font-semibold text-primary">{event.results.prize}</span>
                        )}
                      </div>

                      {/* Hackathon details */}
                      <h3 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">
                        {event.hackathonName}
                      </h3>
                      
                      <div className="space-y-2 mb-4 text-sm text-muted-foreground">
                        <div className="flex items-center gap-2">
                          <Calendar size={14} />
                          {event.date}
                        </div>
                        <div className="flex items-center gap-2">
                          <MapPin size={14} />
                          {event.location}
                        </div>
                        <div className="flex items-center gap-2">
                          <Lightbulb size={14} />
                          {event.theme}
                        </div>
                      </div>

                      {/* Project link */}
                      <div className="mb-4">
                        <div className="flex items-center gap-2 mb-2">
                          <Trophy size={14} className="text-primary" />
                          <span className="text-sm font-medium">Project:</span>
                        </div>
                        <Link to={event.project.link}>
                          <Button variant="outline" size="sm" className="group/btn">
                            {event.project.name}
                            <ExternalLink size={14} className="ml-2 group-hover/btn:translate-x-1 transition-transform" />
                          </Button>
                        </Link>
                      </div>

                      {/* Team photo */}
                      <div className="aspect-video rounded-lg overflow-hidden border border-border/30 group-hover:border-primary/30 transition-colors">
                        <img 
                          src={event.teamPhoto} 
                          alt={`${event.hackathonName} team photo`}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                        />
                      </div>
                    </div>

                    {/* Glow effect overlay */}
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                  </Card>
                </div>

                {/* Spacer for opposite side */}
                <div className="w-5/12" />
              </div>
            ))}
          </div>
        </div>

        {/* Call to action */}
        <div className="text-center mt-16">
          <Link to="/projects">
            <Button variant="neon" size="lg" className="group">
              Explore All Projects
              <ExternalLink size={16} className="ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default AboutSection;