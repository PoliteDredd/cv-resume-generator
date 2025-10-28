import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import Hero from "@/components/Hero";
import Features from "@/components/Features";
import HowItWorks from "@/components/HowItWorks";
import ResumeForm, { ResumeData } from "@/components/ResumeForm";
import ResumePreview from "@/components/ResumePreview";
import ResumeHistory from "@/components/ResumeHistory";
import Navigation from "@/components/Navigation";
import { useToast } from "@/hooks/use-toast";
import type { User } from "@supabase/supabase-js";

const Index = () => {
  const { toast } = useToast();
  const navigate = useNavigate();
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeView, setActiveView] = useState<"create" | "history">("create");
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedResume, setGeneratedResume] = useState<ResumeData | null>(null);
  const formRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setUser(session?.user ?? null);
      setLoading(false);
      if (!session) {
        navigate("/auth");
      }
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((event, session) => {
      setUser(session?.user ?? null);
      if (!session) {
        navigate("/auth");
      }
    });

    return () => subscription.unsubscribe();
  }, [navigate]);

  const handleGetStarted = () => {
    formRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  const handleGenerateResume = async (data: ResumeData) => {
    setIsGenerating(true);
    
    try {
      if (!user) throw new Error("User not authenticated");

      // Save resume to database
      const { error } = await supabase.from("resumes").insert({
        user_id: user.id,
        full_name: data.fullName,
        email: data.email,
        phone: data.phone,
        location: data.location,
        summary: data.summary,
        experience: data.experience,
        education: data.education,
        skills: data.skills,
        template: data.template,
      });

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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div className="min-h-screen">
      <Navigation activeView={activeView} onViewChange={setActiveView} />
      
      {activeView === "create" ? (
        <>
          <Hero onGetStarted={handleGetStarted} />
          <Features />
          <HowItWorks />
          <div ref={formRef}>
            <ResumeForm onSubmit={handleGenerateResume} isGenerating={isGenerating} />
          </div>
        </>
      ) : (
        <ResumeHistory onViewResume={setGeneratedResume} />
      )}

      {generatedResume && (
        <ResumePreview data={generatedResume} onClose={() => setGeneratedResume(null)} />
      )}
    </div>
  );
};

export default Index;
