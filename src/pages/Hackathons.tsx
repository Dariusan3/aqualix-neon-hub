import { Button } from "@/components/ui/button";
import { ArrowLeft, Twitter, Instagram, Linkedin, Youtube } from "lucide-react";
import { Link } from "react-router-dom";
import UpcomingHackathonCard from "@/components/UpcomingHackathonCard";
import PastHackathonCard from "@/components/PastHackathonCard";
import hackathon1 from "@/assets/hackathon-1.jpg";
import hackathon2 from "@/assets/hackathon-2.jpg";
import hackathon3 from "@/assets/hackathon-3.jpg";
import hackathon4 from "@/assets/hackathon-4.jpg";

const Hackathons = () => {
  const upcomingHackathons = [
    {
      name: "TechCrunch Disrupt 2024",
      date: new Date("2024-12-15T09:00:00"),
      location: "San Francisco, CA",
      theme: "AI & Future Tech",
      description: "Join us at the biggest tech event of the year! We're competing in the AI category with our revolutionary machine learning platform that transforms how businesses interact with their customers.",
      registrationUrl: "https://techcrunch.com/disrupt"
    },
    {
      name: "MIT Hackathon 2025",
      date: new Date("2025-01-20T10:00:00"),
      location: "Cambridge, MA",
      theme: "Sustainable Innovation",
      description: "Focusing on sustainability and green technology solutions. Our team is developing an IoT-based environmental monitoring system that helps cities reduce their carbon footprint through smart infrastructure.",
      registrationUrl: "https://hackathon.mit.edu"
    },
    {
      name: "CyberSec Global Challenge",
      date: new Date("2025-02-10T08:00:00"),
      location: "Austin, TX",
      theme: "Cybersecurity & Privacy",
      description: "The ultimate cybersecurity competition where we'll showcase our advanced threat detection algorithms and privacy-preserving technologies to protect the next generation of digital infrastructure."
    }
  ];

  const pastHackathons = [
    {
      name: "HackTheNorth 2024",
      date: new Date("2024-09-15"),
      location: "Waterloo, Canada",
      theme: "Web3 & Blockchain",
      image: hackathon1,
      participants: 1200,
      achievements: [
        {
          title: "1st Place Overall",
          prize: "$50,000",
          description: "DeFi lending platform with automated risk assessment"
        },
        {
          title: "Best UI/UX Design",
          prize: "$5,000",
          description: "Intuitive interface for complex blockchain interactions"
        }
      ]
    },
    {
      name: "Google I/O Extended",
      date: new Date("2024-08-10"),
      location: "Mountain View, CA",
      theme: "AI & Machine Learning",
      image: hackathon2,
      participants: 800,
      achievements: [
        {
          title: "2nd Place AI Category",
          prize: "$25,000",
          description: "Real-time language translation using advanced NLP models"
        },
        {
          title: "People's Choice Award",
          description: "Most innovative use of Google Cloud AI services"
        }
      ]
    },
    {
      name: "DEF CON 32 CTF",
      date: new Date("2024-07-12"),
      location: "Las Vegas, NV",
      theme: "Cybersecurity",
      image: hackathon3,
      participants: 600,
      achievements: [
        {
          title: "3rd Place Security",
          prize: "$15,000",
          description: "Advanced malware detection using behavioral analysis"
        },
        {
          title: "Best Team Collaboration",
          description: "Outstanding teamwork in solving complex security challenges"
        }
      ]
    },
    {
      name: "IoT World Hackathon",
      date: new Date("2024-06-20"),
      location: "Seattle, WA",
      theme: "Internet of Things",
      image: hackathon4,
      participants: 500,
      achievements: [
        {
          title: "1st Place IoT Innovation",
          prize: "$30,000",
          description: "Smart city infrastructure monitoring with edge computing"
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
            <span className="bg-gradient-neon bg-clip-text text-transparent text-neon-glow">
              Hackathon
            </span>
            {" "}Journey
          </h1>
          
          <p className="text-xl text-muted-foreground max-w-3xl mb-8">
            From upcoming challenges to celebrated victories, explore Aqualix's 
            continuous innovation in the world's most competitive hackathons.
          </p>

          {/* Social Media Links */}
          <div className="flex gap-4">
            <Button variant="neon-outline" size="sm" asChild>
              <a href="https://twitter.com/aqualix" target="_blank" rel="noopener noreferrer">
                <Twitter size={16} className="mr-2" />
                Follow Our Journey
              </a>
            </Button>
            <Button variant="ghost" size="sm" asChild>
              <a href="https://instagram.com/aqualix" target="_blank" rel="noopener noreferrer">
                <Instagram size={16} />
              </a>
            </Button>
            <Button variant="ghost" size="sm" asChild>
              <a href="https://linkedin.com/company/aqualix" target="_blank" rel="noopener noreferrer">
                <Linkedin size={16} />
              </a>
            </Button>
            <Button variant="ghost" size="sm" asChild>
              <a href="https://youtube.com/aqualix" target="_blank" rel="noopener noreferrer">
                <Youtube size={16} />
              </a>
            </Button>
          </div>
        </div>
      </header>

      {/* Upcoming Hackathons */}
      <section className="py-16 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Upcoming{" "}
              <span className="text-primary">Challenges</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              Get ready for our next competitions! Watch our countdown timers and join us 
              on these exciting innovation journeys.
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
            {upcomingHackathons.map((hackathon, index) => (
              <UpcomingHackathonCard
                key={index}
                name={hackathon.name}
                date={hackathon.date}
                location={hackathon.location}
                theme={hackathon.theme}
                description={hackathon.description}
                registrationUrl={hackathon.registrationUrl}
              />
            ))}
          </div>
        </div>
      </section>

      {/* Past Hackathons */}
      <section className="py-16 px-6 bg-gradient-to-b from-transparent via-primary/5 to-transparent">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Our{" "}
              <span className="text-secondary">Achievements</span>
            </h2>
            <p className="text-muted-foreground max-w-2xl mx-auto">
              A showcase of our victories, innovations, and the incredible projects 
              we've built at hackathons around the world.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {pastHackathons.map((hackathon, index) => (
              <PastHackathonCard
                key={index}
                name={hackathon.name}
                date={hackathon.date}
                location={hackathon.location}
                theme={hackathon.theme}
                image={hackathon.image}
                achievements={hackathon.achievements}
                participants={hackathon.participants}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Hackathons;