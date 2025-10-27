import { useState, useRef } from "react";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import HowItWorks from "@/components/HowItWorks";
import ResumeForm, { ResumeData } from "@/components/ResumeForm";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const { toast } = useToast();
  const [isGenerating, setIsGenerating] = useState(false);
  const formRef = useRef<HTMLDivElement>(null);

  const handleGetStarted = () => {
    formRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleGenerateResume = async (data: ResumeData) => {
    setIsGenerating(true);
    
    try {
      // TODO: Integrate with Lovable AI to enhance resume content
      // For now, simulate processing
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      toast({
        title: "Resume Generated!",
        description: "Your professional resume is ready. AI enhancement will be available soon.",
      });
      
      console.log("Resume data:", data);
    } catch (error) {
      toast({
        title: "Error",
        description: "Failed to generate resume. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen">
      <Hero onGetStarted={handleGetStarted} />
      <Features />
      <HowItWorks />
      <div ref={formRef}>
        <ResumeForm onSubmit={handleGenerateResume} isGenerating={isGenerating} />
      </div>
    </div>
  );
};

export default Index;
