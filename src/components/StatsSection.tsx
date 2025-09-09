import { Link } from "react-router-dom";

const StatsSection = () => {
  const stats = [
    {
      number: "25+",
      label: "Hackathons Attended",
      description: "Competing across the globe",
    },
    {
      number: "150+",
      label: "Active Members",
      description: "Talented builders united",
    },
    {
      number: "50+",
      label: "Awards Won",
      description: "Recognition for excellence",
    },
  ];

  return (
    <section className="relative py-16 px-6">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent" />
      
      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {stats.map((stat, index) => (
            <Link 
              key={index}
              to={index === 0 ? "/hackathons" : "#"}
              className="text-center group hover:scale-105 transition-all duration-300 block"
            >
              <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl p-8 hover:border-primary/50 hover:bg-card/70 transition-all duration-300 hover:glow-neon">
                <div className="text-5xl md:text-6xl font-black mb-2 bg-gradient-neon bg-clip-text text-transparent">
                  {stat.number}
                </div>
                <div className="text-xl font-semibold text-foreground mb-2">
                  {stat.label}
                </div>
                <div className="text-muted-foreground">
                  {stat.description}
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;