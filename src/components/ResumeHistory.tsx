import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText, Trash2, Eye } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import type { ResumeData } from "@/types/resume";
import { format } from "date-fns";
import type { Tables } from "@/integrations/supabase/types";

type SavedResume = Tables<"resumes">;

interface ResumeHistoryProps {
  onViewResume: (resume: ResumeData) => void;
}

const ResumeHistory = ({ onViewResume }: ResumeHistoryProps) => {
  const [resumes, setResumes] = useState<SavedResume[]>([]);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  const fetchResumes = async () => {
    try {
      const { data, error } = await supabase
        .from("resumes")
        .select("*")
        .order("created_at", { ascending: false });

      if (error) throw error;
      setResumes(data || []);
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to load resume history.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchResumes();
  }, []);

  const handleDelete = async (id: string) => {
    try {
      const { error } = await supabase
        .from("resumes")
        .delete()
        .eq("id", id);

      if (error) throw error;

      toast({
        title: "Resume deleted",
        description: "The resume has been removed from your history.",
      });

      fetchResumes();
    } catch (error: any) {
      toast({
        title: "Error",
        description: "Failed to delete resume.",
        variant: "destructive",
      });
    }
  };

  const handleView = (resume: SavedResume) => {
    const resumeData: ResumeData = {
      fullName: resume.full_name,
      email: resume.email,
      phone: resume.phone,
      location: resume.location,
      summary: resume.summary || "",
      experience: (Array.isArray(resume.experience) ? resume.experience : []) as any[],
      education: (Array.isArray(resume.education) ? resume.education : []) as any[],
      technicalSkills: resume.skills || "",
      softSkills: "",
      projects: [],
      achievements: [],
      hobbies: "",
      languages: [],
      template: resume.template as "modern" | "classic",
      profileImage: null,
      sectionToggles: { projects: false, achievements: false, hobbies: false, languages: false },
    };
    onViewResume(resumeData);
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <p className="text-center text-muted-foreground">Loading your resumes...</p>
      </div>
    );
  }

  if (resumes.length === 0) {
    return (
      <div className="container mx-auto px-4 py-12">
        <Card className="p-12 text-center">
          <FileText className="w-16 h-16 mx-auto mb-4 text-muted-foreground" />
          <h3 className="text-xl font-semibold mb-2">No resumes yet</h3>
          <p className="text-muted-foreground">Create your first resume to get started!</p>
        </Card>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-12">
      <h2 className="text-3xl font-bold mb-8">Your Resume History</h2>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {resumes.map((resume) => (
          <Card key={resume.id} className="p-6">
            <div className="flex items-start justify-between mb-4">
              <div className="flex items-center gap-3">
                <FileText className="w-8 h-8 text-primary" />
                <div>
                  <h3 className="font-semibold">{resume.full_name}</h3>
                  <p className="text-sm text-muted-foreground">
                    {format(new Date(resume.created_at), "MMM d, yyyy")}
                  </p>
                </div>
              </div>
            </div>
            <div className="space-y-2 mb-4">
              <p className="text-sm text-muted-foreground line-clamp-2">
                {resume.summary || "No summary provided"}
              </p>
              <div className="flex gap-2 text-xs">
                <span className="px-2 py-1 bg-primary/10 text-primary rounded">
                  {resume.template}
                </span>
                <span className="px-2 py-1 bg-accent/10 text-accent rounded">
                  {Array.isArray(resume.experience) ? resume.experience.length : 0} experiences
                </span>
              </div>
            </div>
            <div className="flex gap-2">
              <Button onClick={() => handleView(resume)} variant="outline" size="sm" className="flex-1">
                <Eye className="w-4 h-4 mr-2" />
                View
              </Button>
              <Button onClick={() => handleDelete(resume.id)} variant="destructive" size="sm">
                <Trash2 className="w-4 h-4" />
              </Button>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default ResumeHistory;
