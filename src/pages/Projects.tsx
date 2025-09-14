import { useState } from "react";
import { Link } from "react-router-dom";
import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { ExternalLink, Github, Eye, Code, Users, Calendar, Award } from "lucide-react";
import Navigation from "@/components/Navigation";

interface TeamMember {
  id: string;
  name: string;
  role: string;
  photo: string;
  github?: string;
  linkedin?: string;
}

interface Project {
  id: string;
  title: string;
  description: string;
  shortDescription: string;
  techStack: string[];
  image: string;
  githubUrl: string;
  liveUrl: string;
  teamMembers: TeamMember[];
  category: "web" | "ai" | "embedded" | "security";
  completedDate: string;
  hackathon?: string;
  award?: string;
}

const Projects = () => {
  const [filter, setFilter] = useState<string>("all");

  const projects: Project[] = [
    {
      id: "ai-fraud-detector",
      title: "AI Fraud Detection System",
      shortDescription: "Real-time fraud detection using machine learning algorithms to protect financial transactions.",
      description: "Advanced fraud detection system using machine learning algorithms to analyze transaction patterns and detect suspicious activities in real-time. Features include behavioral analysis, risk scoring, and automated alert systems.",
      techStack: ["Python", "TensorFlow", "React", "FastAPI", "PostgreSQL", "Docker"],
      image: "/api/placeholder/600/400",
      githubUrl: "https://github.com/aqualix/ai-fraud-detector",
      liveUrl: "https://fraud-detector.aqualix.dev",
      category: "ai",
      completedDate: "2024-11-15",
      hackathon: "HackTheNorth 2024",
      award: "1st Place - Best AI Solution",
      teamMembers: [
        {
          id: "1",
          name: "Sarah Chen",
          role: "AI Lead",
          photo: "/src/assets/member-1.jpg",
          github: "https://github.com/sarahchen",
          linkedin: "https://linkedin.com/in/sarahchen"
        },
        {
          id: "2", 
          name: "Marcus Rodriguez",
          role: "Backend Developer",
          photo: "/src/assets/member-2.jpg",
          github: "https://github.com/marcusr",
          linkedin: "https://linkedin.com/in/marcusr"
        },
        {
          id: "3",
          name: "Emily Zhang",
          role: "Frontend Developer", 
          photo: "/src/assets/member-3.jpg",
          github: "https://github.com/emilyzhang",
          linkedin: "https://linkedin.com/in/emilyzhang"
        }
      ]
    },
    {
      id: "smart-city-iot",
      title: "Smart City IoT Platform",
      shortDescription: "IoT platform for smart city infrastructure monitoring and optimization.",
      description: "Comprehensive IoT platform for smart city infrastructure monitoring, including air quality sensors, traffic optimization, and energy management systems.",
      techStack: ["Arduino", "Raspberry Pi", "Node.js", "MongoDB", "React", "LoRaWAN"],
      image: "/api/placeholder/600/400",
      githubUrl: "https://github.com/aqualix/smart-city-iot",
      liveUrl: "https://smartcity.aqualix.dev",
      category: "embedded",
      completedDate: "2024-10-20",
      hackathon: "MIT Reality Hack",
      award: "2nd Place - IoT Innovation",
      teamMembers: [
        {
          id: "4",
          name: "Alex Kim",
          role: "Embedded Systems Lead",
          photo: "/src/assets/member-4.jpg",
          github: "https://github.com/alexkim",
          linkedin: "https://linkedin.com/in/alexkim"
        },
        {
          id: "1",
          name: "Sarah Chen", 
          role: "Data Analyst",
          photo: "/src/assets/member-1.jpg",
          github: "https://github.com/sarahchen",
          linkedin: "https://linkedin.com/in/sarahchen"
        }
      ]
    },
    {
      id: "secure-chat-app",
      title: "End-to-End Encrypted Chat",
      shortDescription: "Secure messaging platform with advanced encryption and privacy features.",
      description: "Ultra-secure messaging platform featuring end-to-end encryption, disappearing messages, and advanced privacy controls. Built with zero-knowledge architecture.",
      techStack: ["React Native", "Node.js", "WebRTC", "Cryptography", "MongoDB", "Socket.io"],
      image: "/api/placeholder/600/400",
      githubUrl: "https://github.com/aqualix/secure-chat",
      liveUrl: "https://securechat.aqualix.dev",
      category: "security",
      completedDate: "2024-09-10",
      hackathon: "DefCon CTF",
      award: "Best Security Implementation",
      teamMembers: [
        {
          id: "2",
          name: "Marcus Rodriguez",
          role: "Security Lead",
          photo: "/src/assets/member-2.jpg",
          github: "https://github.com/marcusr",
          linkedin: "https://linkedin.com/in/marcusr"
        },
        {
          id: "3",
          name: "Emily Zhang",
          role: "Mobile Developer",
          photo: "/src/assets/member-3.jpg",
          github: "https://github.com/emilyzhang",
          linkedin: "https://linkedin.com/in/emilyzhang"
        }
      ]
    },
    {
      id: "social-impact-platform",
      title: "Social Impact Dashboard",
      shortDescription: "Platform connecting volunteers with local community service opportunities.",
      description: "Comprehensive platform that connects volunteers with meaningful community service opportunities, featuring impact tracking, skill-based matching, and social impact analytics.",
      techStack: ["Next.js", "TypeScript", "Prisma", "PostgreSQL", "Stripe", "Tailwind CSS"],
      image: "/api/placeholder/600/400",
      githubUrl: "https://github.com/aqualix/social-impact",
      liveUrl: "https://impact.aqualix.dev",
      category: "web",
      completedDate: "2024-08-25",
      hackathon: "Social Good Hackathon",
      award: "People's Choice Award",
      teamMembers: [
        {
          id: "3",
          name: "Emily Zhang",
          role: "Full Stack Lead",
          photo: "/src/assets/member-3.jpg",
          github: "https://github.com/emilyzhang",
          linkedin: "https://linkedin.com/in/emilyzhang"
        },
        {
          id: "4",
          name: "Alex Kim",
          role: "UI/UX Designer",
          photo: "/src/assets/member-4.jpg",
          github: "https://github.com/alexkim",
          linkedin: "https://linkedin.com/in/alexkim"
        },
        {
          id: "1",
          name: "Sarah Chen",
          role: "Data Scientist",
          photo: "/src/assets/member-1.jpg",
          github: "https://github.com/sarahchen",
          linkedin: "https://linkedin.com/in/sarahchen"
        }
      ]
    }
  ];

  const categories = [
    { id: "all", label: "All Projects", icon: Code },
    { id: "web", label: "Web Development", icon: Code },
    { id: "ai", label: "Artificial Intelligence", icon: Eye },
    { id: "embedded", label: "Embedded Systems", icon: Users },
    { id: "security", label: "Cyber Security", icon: Award }
  ];

  const filteredProjects = filter === "all" 
    ? projects 
    : projects.filter(project => project.category === filter);

  return (
    <div className="min-h-screen bg-gradient-dark">
      {/* Header */}
      <header className="border-b border-border/50 bg-card/30 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link to="/" className="text-2xl font-bold">
            <span className="text-foreground">Aqualix</span>
            <span className="text-neon glow-text">.</span>
          </Link>
          <Navigation />
        </div>
      </header>

      <main className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-16 animate-fade-in">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Our{" "}
              <span className="text-neon glow-text">Project</span>{" "}
              Showcase
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Explore our portfolio of innovative solutions built at hackathons worldwide. 
              From AI-powered systems to IoT platforms, each project represents our passion for solving real-world problems.
            </p>
            
            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-2xl mx-auto">
              {[
                { number: "50+", label: "Projects Built", icon: Code },
                { number: "25+", label: "Hackathons Won", icon: Award },
                { number: "15+", label: "Technologies", icon: Users },
                { number: "100k+", label: "Users Impacted", icon: Eye }
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl font-bold text-neon glow-text">{stat.number}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Filter Tabs */}
          <div className="flex flex-wrap justify-center gap-3 mb-12">
            {categories.map((category) => {
              const IconComponent = category.icon;
              return (
                <Button
                  key={category.id}
                  variant={filter === category.id ? "default" : "outline"}
                  onClick={() => setFilter(category.id)}
                  className={`
                    transition-all duration-300 group
                    ${filter === category.id 
                      ? "bg-neon text-background shadow-glow" 
                      : "border-border hover:border-neon/50 hover:text-neon"
                    }
                  `}
                >
                  <IconComponent className="w-4 h-4 mr-2" />
                  {category.label}
                </Button>
              );
            })}
          </div>

          {/* Projects Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredProjects.map((project, index) => (
              <Link
                key={project.id}
                to={`/projects/${project.id}`}
                className="group block"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <Card className="h-full bg-card/50 border-border/50 backdrop-blur-sm hover:border-neon/50 transition-all duration-300 group-hover:shadow-glow group-hover:-translate-y-2">
                  <div className="relative overflow-hidden rounded-t-lg">
                    <img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    
                    {project.award && (
                      <div className="absolute top-4 right-4">
                        <Badge className="bg-neon/20 text-neon border-neon/30 backdrop-blur-sm">
                          <Award className="w-3 h-3 mr-1" />
                          {project.award}
                        </Badge>
                      </div>
                    )}
                  </div>

                  <CardHeader className="pb-3">
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="text-xl font-bold group-hover:text-neon transition-colors duration-300">
                        {project.title}
                      </h3>
                    </div>
                    
                    {project.hackathon && (
                      <div className="flex items-center text-sm text-muted-foreground mb-2">
                        <Calendar className="w-4 h-4 mr-1" />
                        {project.hackathon}
                      </div>
                    )}
                    
                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {project.shortDescription}
                    </p>
                  </CardHeader>

                  <CardContent className="pt-0">
                    {/* Tech Stack */}
                    <div className="flex flex-wrap gap-2 mb-4">
                      {project.techStack.slice(0, 3).map((tech) => (
                        <Badge key={tech} variant="secondary" className="text-xs">
                          {tech}
                        </Badge>
                      ))}
                      {project.techStack.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{project.techStack.length - 3} more
                        </Badge>
                      )}
                    </div>

                    {/* Team Members */}
                    <div className="flex items-center justify-between">
                      <div className="flex -space-x-2">
                        {project.teamMembers.slice(0, 3).map((member) => (
                          <Avatar key={member.id} className="w-8 h-8 border-2 border-background">
                            <AvatarImage src={member.photo} alt={member.name} />
                            <AvatarFallback className="text-xs">
                              {member.name.charAt(0)}
                            </AvatarFallback>
                          </Avatar>
                        ))}
                        {project.teamMembers.length > 3 && (
                          <div className="w-8 h-8 rounded-full bg-muted border-2 border-background flex items-center justify-center text-xs font-medium">
                            +{project.teamMembers.length - 3}
                          </div>
                        )}
                      </div>

                      <div className="flex gap-2">
                        <Button
                          size="sm"
                          variant="outline"
                          className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                          onClick={(e) => {
                            e.preventDefault();
                            window.open(project.githubUrl, '_blank');
                          }}
                        >
                          <Github className="w-4 h-4" />
                        </Button>
                        <Button
                          size="sm"
                          variant="outline"
                          className="opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                          onClick={(e) => {
                            e.preventDefault();
                            window.open(project.liveUrl, '_blank');
                          }}
                        >
                          <ExternalLink className="w-4 h-4" />
                        </Button>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </Link>
            ))}
          </div>

          {/* Call to Action */}
          <div className="text-center mt-16 animate-fade-in">
            <h3 className="text-2xl font-bold mb-4">Ready to Build Something Amazing?</h3>
            <p className="text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join our team and be part of the next groundbreaking project. We're always looking for passionate developers, designers, and innovators.
            </p>
            <Link to="/join-us">
              <Button className="bg-neon text-background hover:bg-neon-hover shadow-glow transition-all duration-300">
                Join Our Team
                <Users className="ml-2 w-4 h-4" />
              </Button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Projects;