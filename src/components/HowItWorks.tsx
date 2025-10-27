import { UserCircle, Sparkles, Eye, Download } from "lucide-react";

const steps = [
  {
    icon: UserCircle,
    title: "Enter Your Details",
    description: "Fill in your personal information, work experience, education, and skills",
    step: "01",
  },
  {
    icon: Sparkles,
    title: "AI Enhancement",
    description: "Our AI analyzes and optimizes your content for maximum impact",
    step: "02",
  },
  {
    icon: Eye,
    title: "Choose Template",
    description: "Select from professional templates and preview in real-time",
    step: "03",
  },
  {
    icon: Download,
    title: "Download & Apply",
    description: "Export your polished resume and start applying with confidence",
    step: "04",
  },
];

const HowItWorks = () => {
  return (
    <section className="py-24">
      <div className="container px-4 mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            How It Works
          </h2>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Four simple steps to your perfect resume
          </p>
        </div>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 relative">
          {/* Connection line for desktop */}
          <div className="hidden lg:block absolute top-16 left-0 right-0 h-0.5 bg-gradient-to-r from-primary via-accent to-primary opacity-20" 
               style={{ top: '4rem', left: '10%', right: '10%', width: '80%' }} />
          
          {steps.map((step, index) => (
            <div key={index} className="relative">
              <div className="text-center space-y-4">
                <div className="relative inline-block">
                  <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center relative z-10 shadow-[var(--shadow-elegant)]">
                    <step.icon className="w-10 h-10 text-primary-foreground" />
                  </div>
                  <div className="absolute -top-2 -right-2 w-8 h-8 bg-accent rounded-full flex items-center justify-center text-xs font-bold text-accent-foreground shadow-md">
                    {step.step}
                  </div>
                </div>
                <h3 className="text-xl font-semibold text-card-foreground">
                  {step.title}
                </h3>
                <p className="text-muted-foreground">
                  {step.description}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
