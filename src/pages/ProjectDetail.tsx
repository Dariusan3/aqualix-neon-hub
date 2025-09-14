import { useParams, Link, Navigate } from "react-router-dom";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarImage, AvatarFallback } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { 
  ExternalLink, 
  Github, 
  ArrowLeft, 
  Calendar, 
  Award, 
  Users, 
  Code,
  Eye,
  Linkedin
} from "lucide-react";
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
  fullDescription: string;
  techStack: string[];
  images: string[];
  githubUrl: string;
  liveUrl: string;
  teamMembers: TeamMember[];
  category: "web" | "ai" | "embedded" | "security";
  completedDate: string;
  hackathon?: string;
  award?: string;
  features: string[];
  challenges: string[];
  learnings: string[];
}

const ProjectDetail = () => {
  const { id } = useParams<{ id: string }>();

  // Project data (in a real app, this would come from an API or context)
  const projects: { [key: string]: Project } = {
    "ai-fraud-detector": {
      id: "ai-fraud-detector",
      title: "AI Fraud Detection System",
      shortDescription: "Real-time fraud detection using machine learning algorithms to protect financial transactions.",
      description: "Advanced fraud detection system using machine learning algorithms to analyze transaction patterns and detect suspicious activities in real-time.",
      fullDescription: "Our AI Fraud Detection System represents a breakthrough in financial security technology. Built during HackTheNorth 2024, this system leverages advanced machine learning algorithms to analyze transaction patterns in real-time, detecting fraudulent activities with 98.5% accuracy. The system processes over 10,000 transactions per second and has successfully prevented over $2M in fraudulent transactions during our pilot program.",
      techStack: ["Python", "TensorFlow", "React", "FastAPI", "PostgreSQL", "Docker", "Kubernetes", "Redis", "Kafka"],
      images: [
        "/api/placeholder/800/500",
        "/api/placeholder/800/500", 
        "/api/placeholder/800/500",
        "/api/placeholder/800/500"
      ],
      githubUrl: "https://github.com/aqualix/ai-fraud-detector",
      liveUrl: "https://fraud-detector.aqualix.dev",
      category: "ai",
      completedDate: "2024-11-15",
      hackathon: "HackTheNorth 2024",
      award: "1st Place - Best AI Solution",
      features: [
        "Real-time transaction analysis with <100ms latency",
        "Machine learning models with 98.5% accuracy",
        "Behavioral pattern recognition and anomaly detection",
        "Automated risk scoring and alert system",
        "RESTful API for easy integration",
        "Comprehensive admin dashboard",
        "Multi-factor authentication and secure data handling"
      ],
      challenges: [
        "Processing high-volume transaction data in real-time",
        "Minimizing false positives while maintaining high accuracy",
        "Ensuring system scalability for enterprise deployment",
        "Implementing secure data handling for sensitive financial information"
      ],
      learnings: [
        "Advanced machine learning techniques for fraud detection",
        "Real-time data processing with Apache Kafka",
        "Microservices architecture and containerization",
        "Financial industry security standards and compliance"
      ],
      teamMembers: [
        {
          id: "1",
          name: "Sarah Chen",
          role: "AI Lead & Data Scientist",
          photo: "/src/assets/member-1.jpg",
          github: "https://github.com/sarahchen",
          linkedin: "https://linkedin.com/in/sarahchen"
        },
        {
          id: "2", 
          name: "Marcus Rodriguez",
          role: "Backend Developer & DevOps",
          photo: "/src/assets/member-2.jpg",
          github: "https://github.com/marcusr",
          linkedin: "https://linkedin.com/in/marcusr"
        },
        {
          id: "3",
          name: "Emily Zhang",
          role: "Frontend Developer & UI/UX",
          photo: "/src/assets/member-3.jpg",
          github: "https://github.com/emilyzhang",
          linkedin: "https://linkedin.com/in/emilyzhang"
        }
      ]
    },
    "smart-city-iot": {
      id: "smart-city-iot",
      title: "Smart City IoT Platform",
      shortDescription: "IoT platform for smart city infrastructure monitoring and optimization.",
      description: "Comprehensive IoT platform for smart city infrastructure monitoring, including air quality sensors, traffic optimization, and energy management systems.",
      fullDescription: "Our Smart City IoT Platform revolutionizes urban infrastructure management through intelligent sensor networks and data analytics. Developed for MIT Reality Hack, this platform integrates environmental monitoring, traffic optimization, and energy management into a unified system. Currently deployed in a pilot program across 3 city districts, monitoring over 500 data points and helping reduce energy consumption by 23%.",
      techStack: ["Arduino", "Raspberry Pi", "Node.js", "MongoDB", "React", "LoRaWAN", "AWS IoT", "Python", "TensorFlow"],
      images: [
        "/api/placeholder/800/500",
        "/api/placeholder/800/500",
        "/api/placeholder/800/500",
        "/api/placeholder/800/500"
      ],
      githubUrl: "https://github.com/aqualix/smart-city-iot",
      liveUrl: "https://smartcity.aqualix.dev",
      category: "embedded",
      completedDate: "2024-10-20",
      hackathon: "MIT Reality Hack",
      award: "2nd Place - IoT Innovation",
      features: [
        "Real-time environmental monitoring (air quality, noise, temperature)",
        "Intelligent traffic flow optimization using ML",
        "Smart energy management and consumption tracking",
        "Predictive maintenance alerts for city infrastructure",
        "Interactive city dashboard with real-time data visualization",
        "Mobile app for citizen reporting and engagement",
        "Long-range wireless communication using LoRaWAN"
      ],
      challenges: [
        "Coordinating data from hundreds of diverse IoT sensors",
        "Ensuring reliable long-range wireless communication",
        "Developing predictive models for infrastructure maintenance",
        "Creating an intuitive interface for city administrators"
      ],
      learnings: [
        "IoT sensor integration and wireless communication protocols",
        "Big data processing and real-time analytics",
        "Machine learning for predictive maintenance",
        "Urban planning and smart city requirements"
      ],
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
          role: "Data Analyst & ML Engineer",
          photo: "/src/assets/member-1.jpg",
          github: "https://github.com/sarahchen",
          linkedin: "https://linkedin.com/in/sarahchen"
        }
      ]
    },
    "secure-chat-app": {
      id: "secure-chat-app",
      title: "End-to-End Encrypted Chat",
      shortDescription: "Secure messaging platform with advanced encryption and privacy features.",
      description: "Ultra-secure messaging platform featuring end-to-end encryption, disappearing messages, and advanced privacy controls.",
      fullDescription: "Built for DefCon CTF, our End-to-End Encrypted Chat platform sets new standards for secure communication. Using zero-knowledge architecture and advanced cryptographic protocols, the platform ensures complete privacy and security. With over 10,000 active users in our beta program, it has successfully maintained zero data breaches and provides military-grade security for everyday communication.",
      techStack: ["React Native", "Node.js", "WebRTC", "Signal Protocol", "MongoDB", "Socket.io", "Docker", "AWS"],
      images: [
        "/api/placeholder/800/500",
        "/api/placeholder/800/500",
        "/api/placeholder/800/500",
        "/api/placeholder/800/500"
      ],
      githubUrl: "https://github.com/aqualix/secure-chat",
      liveUrl: "https://securechat.aqualix.dev",
      category: "security",
      completedDate: "2024-09-10",
      hackathon: "DefCon CTF",
      award: "Best Security Implementation",
      features: [
        "End-to-end encryption using Signal Protocol",
        "Zero-knowledge server architecture",
        "Disappearing messages with customizable timers",
        "Perfect forward secrecy for all communications",
        "Secure file sharing with automatic encryption",
        "Multi-device synchronization with encrypted backups",
        "Anonymous user registration and authentication"
      ],
      challenges: [
        "Implementing military-grade encryption without compromising usability",
        "Ensuring zero-knowledge architecture while maintaining functionality",
        "Optimizing encrypted real-time communication performance",
        "Building secure multi-device synchronization"
      ],
      learnings: [
        "Advanced cryptographic protocols and implementation",
        "Zero-knowledge architecture design principles",
        "Real-time encrypted communication optimization",
        "Mobile security best practices and threat modeling"
      ],
      teamMembers: [
        {
          id: "2",
          name: "Marcus Rodriguez",
          role: "Security Lead & Cryptography Expert",
          photo: "/src/assets/member-2.jpg",
          github: "https://github.com/marcusr",
          linkedin: "https://linkedin.com/in/marcusr"
        },
        {
          id: "3",
          name: "Emily Zhang",
          role: "Mobile Developer & Security Engineer",
          photo: "/src/assets/member-3.jpg",
          github: "https://github.com/emilyzhang",
          linkedin: "https://linkedin.com/in/emilyzhang"
        }
      ]
    },
    "social-impact-platform": {
      id: "social-impact-platform",
      title: "Social Impact Dashboard",
      shortDescription: "Platform connecting volunteers with local community service opportunities.",
      description: "Comprehensive platform that connects volunteers with meaningful community service opportunities, featuring impact tracking and analytics.",
      fullDescription: "Our Social Impact Dashboard transforms how communities organize and participate in volunteer work. Winner of the People's Choice Award at Social Good Hackathon, this platform has connected over 5,000 volunteers with 200+ local organizations, facilitating over 15,000 hours of community service. The platform's AI-powered matching system ensures volunteers are connected with opportunities that align with their skills and interests.",
      techStack: ["Next.js", "TypeScript", "Prisma", "PostgreSQL", "Stripe", "Tailwind CSS", "Vercel", "SendGrid"],
      images: [
        "/api/placeholder/800/500",
        "/api/placeholder/800/500",
        "/api/placeholder/800/500",
        "/api/placeholder/800/500"
      ],
      githubUrl: "https://github.com/aqualix/social-impact",
      liveUrl: "https://impact.aqualix.dev",
      category: "web",
      completedDate: "2024-08-25",
      hackathon: "Social Good Hackathon",
      award: "People's Choice Award",
      features: [
        "AI-powered volunteer-opportunity matching system",
        "Real-time impact tracking and analytics dashboard",
        "Integrated payment processing for donations",
        "Community forums and volunteer networking",
        "Mobile-responsive design with PWA capabilities",
        "Automated certificate generation for volunteers",
        "Multi-language support for diverse communities"
      ],
      challenges: [
        "Creating an effective matching algorithm for diverse opportunities",
        "Building trust between volunteers and organizations",
        "Designing intuitive interfaces for users of all ages",
        "Scaling the platform to handle rapid user growth"
      ],
      learnings: [
        "Full-stack TypeScript development with Next.js",
        "Database design and optimization with Prisma",
        "Payment processing integration and security",
        "Community platform development and user engagement"
      ],
      teamMembers: [
        {
          id: "3",
          name: "Emily Zhang",
          role: "Full Stack Lead & Product Manager",
          photo: "/src/assets/member-3.jpg",
          github: "https://github.com/emilyzhang",
          linkedin: "https://linkedin.com/in/emilyzhang"
        },
        {
          id: "4",
          name: "Alex Kim",
          role: "UI/UX Designer & Frontend Developer",
          photo: "/src/assets/member-4.jpg",
          github: "https://github.com/alexkim",
          linkedin: "https://linkedin.com/in/alexkim"
        },
        {
          id: "1",
          name: "Sarah Chen",
          role: "Data Scientist & Analytics",
          photo: "/src/assets/member-1.jpg",
          github: "https://github.com/sarahchen",
          linkedin: "https://linkedin.com/in/sarahchen"
        }
      ]
    }
  };

  const project = id ? projects[id] : null;

  if (!project) {
    return <Navigate to="/projects" replace />;
  }

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

      <main className="py-8 px-6">
        <div className="max-w-6xl mx-auto">
          {/* Back Button */}
          <Link 
            to="/projects" 
            className="inline-flex items-center text-muted-foreground hover:text-neon transition-colors duration-300 mb-8"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Projects
          </Link>

          {/* Project Header */}
          <div className="mb-12 animate-fade-in">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-6">
              <div>
                <h1 className="text-3xl md:text-5xl font-bold mb-4">
                  {project.title}
                </h1>
                <p className="text-xl text-muted-foreground max-w-3xl">
                  {project.description}
                </p>
              </div>
              
              <div className="flex gap-4 mt-6 md:mt-0">
                <Button 
                  className="bg-neon text-background hover:bg-neon-hover shadow-glow"
                  onClick={() => window.open(project.liveUrl, '_blank')}
                >
                  <Eye className="w-4 h-4 mr-2" />
                  Live Demo
                </Button>
                <Button 
                  variant="outline" 
                  className="border-neon/50 text-neon hover:bg-neon/10"
                  onClick={() => window.open(project.githubUrl, '_blank')}
                >
                  <Github className="w-4 h-4 mr-2" />
                  View Code
                </Button>
              </div>
            </div>

            {/* Project Meta */}
            <div className="flex flex-wrap gap-4 items-center">
              {project.hackathon && (
                <div className="flex items-center text-muted-foreground">
                  <Calendar className="w-4 h-4 mr-2" />
                  {project.hackathon}
                </div>
              )}
              {project.award && (
                <Badge className="bg-neon/20 text-neon border-neon/30">
                  <Award className="w-4 h-4 mr-2" />
                  {project.award}
                </Badge>
              )}
              <div className="text-muted-foreground">
                Completed: {new Date(project.completedDate).toLocaleDateString()}
              </div>
            </div>
          </div>

          {/* Image Gallery */}
          <div className="mb-12">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <img
                src={project.images[0]}
                alt={`${project.title} - Main`}
                className="w-full h-64 md:h-80 object-cover rounded-lg shadow-glow"
              />
              <div className="grid grid-cols-2 gap-4">
                {project.images.slice(1, 4).map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`${project.title} - ${index + 2}`}
                    className="w-full h-28 md:h-36 object-cover rounded-lg hover:shadow-glow transition-all duration-300"
                  />
                ))}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Description */}
              <Card className="bg-card/50 border-border/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-2xl text-neon">Project Overview</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-muted-foreground leading-relaxed">
                    {project.fullDescription}
                  </p>
                </CardContent>
              </Card>

              {/* Features */}
              <Card className="bg-card/50 border-border/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-xl text-neon">Key Features</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-3">
                    {project.features.map((feature, index) => (
                      <li key={index} className="flex items-start">
                        <div className="w-2 h-2 rounded-full bg-neon mt-2 mr-3 flex-shrink-0" />
                        <span className="text-muted-foreground">{feature}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>

              {/* Challenges & Learnings */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <Card className="bg-card/50 border-border/50 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-lg text-secondary">Challenges</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {project.challenges.map((challenge, index) => (
                        <li key={index} className="flex items-start">
                          <div className="w-1.5 h-1.5 rounded-full bg-secondary mt-2 mr-3 flex-shrink-0" />
                          <span className="text-muted-foreground text-sm">{challenge}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>

                <Card className="bg-card/50 border-border/50 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-lg text-secondary">Key Learnings</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <ul className="space-y-2">
                      {project.learnings.map((learning, index) => (
                        <li key={index} className="flex items-start">
                          <div className="w-1.5 h-1.5 rounded-full bg-secondary mt-2 mr-3 flex-shrink-0" />
                          <span className="text-muted-foreground text-sm">{learning}</span>
                        </li>
                      ))}
                    </ul>
                  </CardContent>
                </Card>
              </div>
            </div>

            {/* Sidebar */}
            <div className="space-y-6">
              {/* Tech Stack */}
              <Card className="bg-card/50 border-border/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center">
                    <Code className="w-5 h-5 mr-2 text-neon" />
                    Tech Stack
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="flex flex-wrap gap-2">
                    {project.techStack.map((tech) => (
                      <Badge key={tech} variant="secondary" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Team Members */}
              <Card className="bg-card/50 border-border/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-lg flex items-center">
                    <Users className="w-5 h-5 mr-2 text-neon" />
                    Team Credits
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {project.teamMembers.map((member) => (
                      <div key={member.id} className="flex items-center gap-3">
                        <Avatar className="w-12 h-12">
                          <AvatarImage src={member.photo} alt={member.name} />
                          <AvatarFallback>{member.name.charAt(0)}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <h4 className="font-medium text-foreground">{member.name}</h4>
                          <p className="text-sm text-muted-foreground">{member.role}</p>
                          <div className="flex gap-2 mt-1">
                            {member.github && (
                              <Button
                                size="sm"
                                variant="ghost"
                                className="h-6 w-6 p-0 text-muted-foreground hover:text-neon"
                                onClick={() => window.open(member.github, '_blank')}
                              >
                                <Github className="w-3 h-3" />
                              </Button>
                            )}
                            {member.linkedin && (
                              <Button
                                size="sm"
                                variant="ghost"
                                className="h-6 w-6 p-0 text-muted-foreground hover:text-neon"
                                onClick={() => window.open(member.linkedin, '_blank')}
                              >
                                <Linkedin className="w-3 h-3" />
                              </Button>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>

              {/* Project Links */}
              <Card className="bg-card/50 border-border/50 backdrop-blur-sm">
                <CardHeader>
                  <CardTitle className="text-lg">Project Links</CardTitle>
                </CardHeader>
                <CardContent className="space-y-3">
                  <Button 
                    className="w-full bg-neon text-background hover:bg-neon-hover shadow-glow"
                    onClick={() => window.open(project.liveUrl, '_blank')}
                  >
                    <ExternalLink className="w-4 h-4 mr-2" />
                    Live Demo
                  </Button>
                  <Button 
                    variant="outline" 
                    className="w-full border-neon/50 text-neon hover:bg-neon/10"
                    onClick={() => window.open(project.githubUrl, '_blank')}
                  >
                    <Github className="w-4 h-4 mr-2" />
                    Source Code
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Related Projects CTA */}
          <div className="mt-16 text-center">
            <Separator className="mb-8" />
            <h3 className="text-2xl font-bold mb-4">Explore More Projects</h3>
            <p className="text-muted-foreground mb-6">
              Discover other innovative solutions from our team
            </p>
            <Link to="/projects">
              <Button variant="outline" className="border-neon/50 text-neon hover:bg-neon/10">
                View All Projects
                <ArrowLeft className="ml-2 w-4 h-4 rotate-180" />
              </Button>
            </Link>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ProjectDetail;