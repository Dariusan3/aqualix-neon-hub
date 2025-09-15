import TeamCard from "@/components/TeamCard";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Code, Cpu, Brain, Shield } from "lucide-react";
import { Link } from "react-router-dom";
import Navigation from "@/components/Navigation";
import member1 from "@/assets/member-1.jpg";
import member2 from "@/assets/member-2.jpg";
import member3 from "@/assets/member-3.jpg";
import member4 from "@/assets/member-4.jpg";

const Teams = () => {
  const teamsData = [
    {
      title: "Web Development",
      description: "Creating stunning web applications with modern frameworks and technologies. From responsive frontends to scalable backends, we build the digital experiences of tomorrow.",
      icon: <Code size={28} />,
      color: "primary" as const,
      members: [
        {
          id: 1,
          name: "Alex Chen",
          role: "Full-Stack Developer",
          photo: member1,
          skills: ["React", "Node.js", "TypeScript", "GraphQL"],
          github: "https://github.com/alexchen",
          linkedin: "https://linkedin.com/in/alexchen"
        },
        {
          id: 2,
          name: "Sarah Kim",
          role: "Frontend Specialist",
          photo: member2,
          skills: ["Vue.js", "Angular", "SCSS", "Figma"],
          github: "https://github.com/sarahkim",
          linkedin: "https://linkedin.com/in/sarahkim"
        },
        {
          id: 3,
          name: "Mike Johnson",
          role: "Backend Engineer",
          photo: member3,
          skills: ["Python", "Django", "PostgreSQL", "AWS"],
          github: "https://github.com/mikejohnson",
          linkedin: "https://linkedin.com/in/mikejohnson"
        }
      ]
    },
    {
      title: "AI & Machine Learning",
      description: "Pioneering the future with artificial intelligence and machine learning solutions. We develop intelligent systems that learn, adapt, and solve complex real-world problems.",
      icon: <Brain size={28} />,
      color: "secondary" as const,
      members: [
        {
          id: 4,
          name: "Dr. Lisa Wong",
          role: "AI Research Lead",
          photo: member4,
          skills: ["TensorFlow", "PyTorch", "Computer Vision", "NLP"],
          github: "https://github.com/lisawong",
          linkedin: "https://linkedin.com/in/lisawong"
        },
        {
          id: 5,
          name: "David Park",
          role: "ML Engineer",
          photo: member1,
          skills: ["Scikit-learn", "Keras", "Deep Learning", "MLOps"],
          github: "https://github.com/davidpark",
          linkedin: "https://linkedin.com/in/davidpark"
        }
      ]
    },
    {
      title: "Embedded Systems",
      description: "Building the bridge between software and hardware. We create intelligent embedded solutions for IoT, robotics, and edge computing applications.",
      icon: <Cpu size={28} />,
      color: "primary" as const,
      members: [
        {
          id: 6,
          name: "Emma Thompson",
          role: "Embedded Engineer",
          photo: member2,
          skills: ["Arduino", "Raspberry Pi", "C/C++", "RTOS"],
          github: "https://github.com/emmathompson",
          linkedin: "https://linkedin.com/in/emmathompson"
        },
        {
          id: 7,
          name: "James Lee",
          role: "Hardware Specialist",
          photo: member3,
          skills: ["PCB Design", "Microcontrollers", "Sensors", "3D Printing"],
          github: "https://github.com/jameslee",
          linkedin: "https://linkedin.com/in/jameslee"
        }
      ]
    },
    {
      title: "Cybersecurity",
      description: "Protecting digital assets and ensuring secure communications. We specialize in penetration testing, vulnerability assessment, and developing robust security solutions.",
      icon: <Shield size={28} />,
      color: "secondary" as const,
      members: [
        {
          id: 8,
          name: "Rachel Davis",
          role: "Security Analyst", 
          photo: member4,
          skills: ["Ethical Hacking", "Penetration Testing", "Cryptography", "Security Auditing"],
          github: "https://github.com/racheldavis",
          linkedin: "https://linkedin.com/in/racheldavis"
        },
        {
          id: 9,
          name: "Tom Wilson",
          role: "Security Engineer",
          photo: member1,
          skills: ["Network Security", "Incident Response", "Forensics", "Risk Assessment"],
          github: "https://github.com/tomwilson",
          linkedin: "https://linkedin.com/in/tomwilson"
        }
      ]
    }
  ];

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
              <span className="text-neon glow-text">Teams</span>
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Meet the talented individuals who make up our diverse and innovative teams. 
              Each team specializes in different technologies and brings unique expertise to every hackathon.
            </p>
          </div>

          {/* Teams Grid */}
          <div className="space-y-16">
            {teamsData.map((team, index) => (
              <TeamCard
                key={index}
                title={team.title}
                description={team.description}
                icon={team.icon}
                members={team.members}
                color={team.color}
              />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
};

export default Teams;