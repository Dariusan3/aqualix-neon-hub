import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart";

const SkillsBreakdown = () => {
  const skillsData = [
    {
      name: "Frontend Development",
      value: 35,
      color: "hsl(180 100% 50%)",
      description: "React, TypeScript, UI/UX Design, Mobile Development"
    },
    {
      name: "Artificial Intelligence",
      value: 30,
      color: "hsl(210 100% 60%)", 
      description: "Machine Learning, NLP, Computer Vision, Data Science"
    },
    {
      name: "Hardware & IoT",
      value: 20,
      color: "hsl(160 80% 50%)",
      description: "Arduino, Raspberry Pi, Sensors, Embedded Systems"
    },
    {
      name: "Cybersecurity",
      value: 15,
      color: "hsl(280 70% 60%)",
      description: "Network Security, Ethical Hacking, Cryptography"
    }
  ];

  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div className="bg-card/95 backdrop-blur-sm border border-border/50 rounded-lg p-4 shadow-lg">
          <p className="text-foreground font-semibold mb-2">{data.name}</p>
          <p className="text-2xl font-bold text-neon mb-2">{data.value}%</p>
          <p className="text-muted-foreground text-sm">{data.description}</p>
        </div>
      );
    }
    return null;
  };

  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }: any) => {
    const RADIAN = Math.PI / 180;
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    return (
      <text 
        x={x} 
        y={y} 
        fill="white" 
        textAnchor={x > cx ? 'start' : 'end'} 
        dominantBaseline="central"
        className="text-sm font-semibold"
      >
        {`${(percent * 100).toFixed(0)}%`}
      </text>
    );
  };

  return (
    <section className="relative py-16 px-6">
      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/3 to-transparent" />
      
      <div className="relative z-10 max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="text-foreground">Skills </span>
            <span className="text-neon glow-text">Breakdown</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Our diverse team combines cutting-edge technology expertise across multiple domains
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Chart */}
          <div className="relative">
            <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-2xl p-8 hover:border-neon/50 transition-all duration-300">
              <ResponsiveContainer width="100%" height={400}>
                <PieChart>
                  <Pie
                    data={skillsData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    label={renderCustomizedLabel}
                    outerRadius={120}
                    innerRadius={40}
                    fill="#8884d8"
                    dataKey="value"
                    animationBegin={0}
                    animationDuration={1000}
                  >
                    {skillsData.map((entry, index) => (
                      <Cell 
                        key={`cell-${index}`} 
                        fill={entry.color}
                        className="hover:brightness-110 transition-all duration-200 cursor-pointer"
                      />
                    ))}
                  </Pie>
                  <Tooltip content={<CustomTooltip />} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Skills Legend */}
          <div className="space-y-6">
            {skillsData.map((skill, index) => (
              <div key={index} className="group hover:scale-105 transition-all duration-300">
                <div className="bg-card/50 backdrop-blur-sm border border-border/50 rounded-xl p-6 hover:border-neon/50 hover:bg-card/70 transition-all duration-300">
                  <div className="flex items-center gap-4 mb-3">
                    <div 
                      className="w-4 h-4 rounded-full glow-neon"
                      style={{ backgroundColor: skill.color }}
                    />
                    <h3 className="text-xl font-semibold text-foreground">{skill.name}</h3>
                    <span className="ml-auto text-2xl font-bold text-neon">{skill.value}%</span>
                  </div>
                  <p className="text-muted-foreground">{skill.description}</p>
                  
                  {/* Progress bar */}
                  <div className="mt-4 bg-muted/30 rounded-full h-2 overflow-hidden">
                    <div 
                      className="h-full rounded-full transition-all duration-1000 ease-out"
                      style={{ 
                        width: `${skill.value}%`,
                        backgroundColor: skill.color,
                        boxShadow: `0 0 10px ${skill.color}`
                      }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default SkillsBreakdown;