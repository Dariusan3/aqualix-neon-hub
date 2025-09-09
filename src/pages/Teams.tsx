import TeamCard from "@/components/TeamCard";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Code, Cpu, Brain, Shield } from "lucide-react";
import { Link } from "react-router-dom";
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
          skills: ["Vue.js", "CSS3", "UI/UX", "Webpack"],
          github: "https://github.com/sarahkim",
          linkedin: "https://linkedin.com/in/sarahkim"
        },
        {
          id: 3,
          name: "Mike Rodriguez",
          role: "Backend Engineer",
          photo: member3,
          skills: ["Python", "Django", "PostgreSQL", "Docker"],
          github: "https://github.com/mikerodriguez"
        }
      ]
    },
    {
      title: "Artificial Intelligence",
      description: "Pushing the boundaries of machine learning and AI. We develop intelligent systems that solve real-world problems using cutting-edge algorithms and neural networks.",
      icon: <Brain size={28} />,
      color: "secondary" as const,
      members: [
        {
          id: 4,
          name: "Dr. Emily Watson",
          role: "ML Research Lead",
          photo: member2,
          skills: ["PyTorch", "TensorFlow", "NLP", "Computer Vision"],
          github: "https://github.com/emilywatson",
          linkedin: "https://linkedin.com/in/emilywatson"
        },
        {
          id: 5,
          name: "James Liu",
          role: "Data Scientist",
          photo: member1,
          skills: ["Python", "Pandas", "Scikit-learn", "MLOps"],
          github: "https://github.com/jamesliu",
          linkedin: "https://linkedin.com/in/jamesliu"
        }
      ]
    },
    {
      title: "Embedded Systems",
      description: "Building the Internet of Things with microcontrollers, sensors, and real-time systems. We create smart devices that bridge the digital and physical worlds.",
      icon: <Cpu size={28} />,
      color: "primary" as const,
      members: [
        {
          id: 6,
          name: "Ryan Park",
          role: "Embedded Engineer",
          photo: member4,
          skills: ["C/C++", "Arduino", "Raspberry Pi", "RTOS"],
          github: "https://github.com/ryanpark",
          linkedin: "https://linkedin.com/in/ryanpark"
        },
        {
          id: 7,
          name: "Lisa Zhang",
          role: "Hardware Designer",
          photo: member2,
          skills: ["PCB Design", "FPGA", "Verilog", "CAD"],
          github: "https://github.com/lisazhang"
        }
      ]
    },
    {
      title: "Cyber Security",
      description: "Protecting digital assets and ensuring system integrity. We specialize in penetration testing, cryptography, and building secure applications that defend against modern threats.",
      icon: <Shield size={28} />,
      color: "secondary" as const,
      members: [
        {
          id: 8,
          name: "Marcus Johnson",
          role: "Security Analyst",
          photo: member3,
          skills: ["Penetration Testing", "Cryptography", "Network Security", "Forensics"],
          github: "https://github.com/marcusjohnson",
          linkedin: "https://linkedin.com/in/marcusjohnson"
        },
        {
          id: 9,
          name: "Nina Patel",
          role: "Security Engineer",
          photo: member2,
          skills: ["Secure Coding", "OWASP", "Risk Assessment", "Incident Response"],
          linkedin: "https://linkedin.com/in/ninapatel"
        }
      ]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-dark">
      {/* Header */}
      <header className="relative py-16 px-6">
        <div className="absolute inset-0 bg-gradient-glow opacity-20" />
        <div className="relative z-10 max-w-6xl mx-auto">
          <Link to="/">
            <Button variant="ghost" className="mb-8 text-muted-foreground hover:text-foreground">
              <ArrowLeft size={20} className="mr-2" />
              Back to Home
            </Button>
          </Link>
          
          <h1 className="text-4xl md:text-6xl font-black mb-6">
            Our{" "}
            <span className="bg-gradient-neon bg-clip-text text-transparent glow-neon">
              Teams
            </span>
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-3xl">
            Meet the brilliant minds behind Aqualix. Each team brings unique expertise 
            and passion to create innovative solutions at hackathons worldwide.
          </p>
        </div>
      </header>

      {/* Teams Grid */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto space-y-16">
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
      </section>
    </div>
  );
};

export default Teams;