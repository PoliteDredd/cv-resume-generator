import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import type { Json } from "@/integrations/supabase/types";
import HowItWorks from "@/components/HowItWorks";
import ResumeForm from "@/components/ResumeForm";
import ResumePreview from "@/components/ResumePreview";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { useToast } from "@/hooks/use-toast";
import type { ResumeData } from "@/types/resume";

const CreateResume = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedResume, setGeneratedResume] = useState<ResumeData | null>(null);

  const handleGenerateResume = async (data: ResumeData) => {
    setIsGenerating(true);
    
    try {
      const { data: { user } } = await supabase.auth.getUser();
      if (!user) throw new Error("User not authenticated");

      const { error } = await supabase.from("resumes").insert([{
        user_id: user.id,
        full_name: data.fullName,
        email: data.email,
        phone: data.phone,
        location: data.location,
        summary: data.summary,
        experience: data.experience as unknown as Json[],
        education: data.education as unknown as Json[],
        skills: data.technicalSkills,
        template: data.template,
      }]);

      if (error) throw error;
      
      setGeneratedResume(data);
      
      toast({
        title: "Resume Generated!",
        description: "Your professional resume is ready and saved.",
      });
    } catch (error: any) {
      toast({
        title: "Error",
        description: error.message || "Failed to generate resume. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation activeView="create" onViewChange={(view) => {
        if (view === "home") navigate("/");
        if (view === "history") navigate("/history");
      }} />
      <div className="flex-1">
        <HowItWorks />
        <ResumeForm onSubmit={handleGenerateResume} isGenerating={isGenerating} />
      </div>
      <Footer />
      
      {generatedResume && (
        <ResumePreview data={generatedResume} onClose={() => setGeneratedResume(null)} />
      )}
    </div>
  );
};

export default CreateResume;
