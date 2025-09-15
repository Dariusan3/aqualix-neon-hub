import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import Navigation from "@/components/Navigation";
import { CheckCircle, Rocket, Users, Code, Upload, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useLocation, Link } from "react-router-dom";

const formSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Please enter a valid email address"),
  socialProfile: z.string().url("Please enter a valid URL").optional().or(z.literal("")),
  preferredTeam: z.string().min(1, "Please select a preferred team"),
  motivation: z.string().min(50, "Please tell us more about your motivation (at least 50 characters)"),
});

type FormData = z.infer<typeof formSchema>;

export default function JoinUs() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [cvFile, setCvFile] = useState<File | null>(null);
  const { toast } = useToast();
  const location = useLocation();
  
  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      email: "",
      socialProfile: "",
      preferredTeam: "",
      motivation: "",
    },
  });

  // Check if a team was pre-selected via state
  useEffect(() => {
    if (location.state?.team) {
      const teamMappings = {
        web: "web",
        ai: "ai", 
        embedded: "embedded",
        cybersecurity: "cybersecurity"
      };
      const teamValue = teamMappings[location.state.team as keyof typeof teamMappings];
      if (teamValue) {
        form.setValue("preferredTeam", teamValue);
      }
    }
  }, [location.state, form]);

  const onSubmit = (data: FormData) => {
    console.log("Form submitted:", data);
    console.log("CV file:", cvFile);
    
    // Simulate API call
    setTimeout(() => {
      toast({
        title: "Application Submitted! 🚀",
        description: "We'll review your application and get back to you soon!",
      });
      
      setIsSubmitted(true);
    }, 1000);
  };

  if (isSubmitted) {
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

        <div className="container mx-auto px-6 py-16">
          <div className="max-w-2xl mx-auto text-center space-y-8">
            <div className="animate-fade-in">
              <CheckCircle className="w-24 h-24 text-neon mx-auto mb-6 animate-pulse" />
              <h1 className="text-4xl font-bold mb-4 glow-text">
                Welcome to the Team! 
              </h1>
              <p className="text-xl text-muted-foreground mb-8">
                Your application has been submitted successfully. We're excited to review your profile and will get back to you within 48 hours.
              </p>
              <div className="space-y-4">
                <Button 
                  onClick={() => setIsSubmitted(false)}
                  variant="neon"
                  size="lg"
                  className="mr-4"
                >
                  Submit Another Application
                </Button>
                <Button 
                  onClick={() => window.location.href = "/"}
                  variant="outline"
                  size="lg"
                >
                  Back to Home
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
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

      <main className="py-16 px-6">
        <div className="max-w-7xl mx-auto">
          {/* Hero Section */}
          <div className="text-center mb-16 animate-fade-in">
            <div className="flex justify-center items-center gap-4 mb-6">
              <Rocket className="w-12 h-12 text-neon animate-bounce" />
              <h1 className="text-4xl md:text-6xl font-bold glow-text">
                Join{" "}
                <span className="text-neon glow-text">Aqualix</span>
              </h1>
              <Users className="w-12 h-12 text-neon animate-bounce" style={{ animationDelay: '0.2s' }} />
            </div>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto mb-8">
              Ready to innovate with the best? Join our community of builders and make your mark in the hackathon world! 🌊
            </p>
          </div>

          {/* Form Card */}
          <div className="max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: '0.3s' }}>
            <Card className="border-border/50 bg-card/50 backdrop-blur-sm shadow-glow">
              <CardHeader className="text-center">
                <CardTitle className="text-2xl font-bold flex items-center justify-center gap-2">
                  <Code className="w-6 h-6 text-neon" />
                  Application Form
                </CardTitle>
                <CardDescription>
                  Tell us about yourself and let's build the future together!
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <Form {...form}>
                  <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                    {/* Name Field */}
                    <FormField
                      control={form.control}
                      name="name"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-base font-medium">Full Name *</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="Your awesome name" 
                              className="border-border/50 focus:border-neon transition-colors"
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Email Field */}
                    <FormField
                      control={form.control}
                      name="email"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-base font-medium">Email Address *</FormLabel>
                          <FormControl>
                            <Input 
                              type="email" 
                              placeholder="you@example.com" 
                              className="border-border/50 focus:border-neon transition-colors"
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Social Profile Field */}
                    <FormField
                      control={form.control}
                      name="socialProfile"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-base font-medium">Social Profile (GitHub, LinkedIn, etc.)</FormLabel>
                          <FormControl>
                            <Input 
                              placeholder="https://github.com/yourusername" 
                              className="border-border/50 focus:border-neon transition-colors"
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Preferred Team Field */}
                    <FormField
                      control={form.control}
                      name="preferredTeam"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-base font-medium">Preferred Team *</FormLabel>
                          <FormControl>
                            <Select onValueChange={field.onChange} value={field.value}>
                              <SelectTrigger className="border-border/50 focus:border-neon transition-colors">
                                <SelectValue placeholder="Select your preferred team" />
                              </SelectTrigger>
                              <SelectContent>
                                <SelectItem value="web">Web Development</SelectItem>
                                <SelectItem value="ai">AI & Machine Learning</SelectItem>
                                <SelectItem value="embedded">Embedded Systems</SelectItem>
                                <SelectItem value="cybersecurity">Cybersecurity</SelectItem>
                              </SelectContent>
                            </Select>
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* CV Upload */}
                    <div className="space-y-2">
                      <label className="block text-base font-medium">Resume/CV (Optional)</label>
                      <div className="flex items-center gap-4">
                        {cvFile ? (
                          <div className="flex items-center gap-2 flex-1">
                            <span className="text-sm text-muted-foreground flex-1 truncate">
                              {cvFile.name}
                            </span>
                            <Button
                              type="button"
                              variant="ghost"
                              size="sm"
                              onClick={() => setCvFile(null)}
                            >
                              <X size={16} />
                            </Button>
                          </div>
                        ) : (
                          <>
                            <input
                              type="file"
                              accept=".pdf,.doc,.docx"
                              onChange={(e) => {
                                const file = e.target.files?.[0];
                                if (file) setCvFile(file);
                              }}
                              id="cv-upload"
                              className="hidden"
                            />
                            <Button
                              type="button"
                              variant="outline"
                              onClick={() => document.getElementById('cv-upload')?.click()}
                            >
                              Choose File
                            </Button>
                          </>
                        )}
                      </div>
                    </div>

                    {/* Motivation */}
                    <FormField
                      control={form.control}
                      name="motivation"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel className="text-base font-medium">Why do you want to join Aqualix? *</FormLabel>
                          <FormControl>
                            <Textarea 
                              placeholder="Tell us your story, your passion for hackathons, and what unique skills you'll bring to the team. We love authentic, creative responses! 🚀"
                              className="min-h-[120px] border-border/50 focus:border-neon transition-colors resize-none"
                              {...field} 
                            />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />

                    {/* Submit Button */}
                    <div className="pt-4">
                      <Button 
                        type="submit" 
                        variant="neon" 
                        size="lg" 
                        className="w-full"
                        disabled={form.formState.isSubmitting}
                      >
                        {form.formState.isSubmitting ? "Submitting..." : "Join the Revolution! 🌊"}
                      </Button>
                    </div>
                  </form>
                </Form>
              </CardContent>
            </Card>
          </div>

          {/* Fun Stats */}
          <div className="max-w-4xl mx-auto mt-16 text-center animate-fade-in" style={{ animationDelay: '0.6s' }}>
            <h3 className="text-2xl font-bold mb-8 glow-text">Join the Community</h3>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {[
                { number: "50+", label: "Active Members" },
                { number: "25+", label: "Hackathons Won" },
                { number: "100+", label: "Projects Built" },
                { number: "4", label: "Specialized Teams" }
              ].map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl font-bold text-neon glow-text">{stat.number}</div>
                  <div className="text-muted-foreground">{stat.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}