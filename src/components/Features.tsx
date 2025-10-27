import { Brain, FileText, Download, Sparkles, CheckCircle2, Zap } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";

const features = [
  {
    icon: Brain,
    title: "AI-Powered Content",
    description: "Let GPT-4 generate professional summaries and optimize your experience descriptions",
  },
  {
    icon: FileText,
    title: "Multiple Templates",
    description: "Choose from Modern, Classic, or Professional layouts designed by experts",
  },
  {
    icon: Sparkles,
    title: "ATS-Friendly",
    description: "Optimized formats that pass Applicant Tracking Systems with ease",
  },
  {
    icon: Download,
    title: "Instant Export",
    description: "Download your resume as a high-quality PDF in seconds",
  },
  {
    icon: CheckCircle2,
    title: "Smart Formatting",
    description: "Automatic layout adjustments to keep your resume looking professional",
  },
  {
    icon: Zap,
    title: "Quick & Easy",
    description: "Create a complete resume in under 5 minutes with our step-by-step process",
  },
];

const Features = () => {
  return (
    <section className="py-24 bg-muted/30">
      <div className="container px-4 mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Why Choose Our{" "}
            <span className="bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
              AI Resume Builder
            </span>
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Powerful features designed to help you land your dream job faster
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card 
              key={index}
              className="border-border/50 hover:border-primary/50 transition-all duration-300 hover:shadow-[var(--shadow-elegant)] group"
            >
              <CardContent className="p-6 space-y-4">
                <div className="w-14 h-14 rounded-xl bg-gradient-to-br from-primary to-accent flex items-center justify-center group-hover:scale-110 transition-transform duration-300">
                  <feature.icon className="w-7 h-7 text-primary-foreground" />
                </div>
                <h3 className="text-xl font-semibold text-card-foreground">
                  {feature.title}
                </h3>
                <p className="text-muted-foreground">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
