import { useState } from "react";
import { useNavigate } from "react-router-dom";
import ResumeHistory from "@/components/ResumeHistory";
import ResumePreview from "@/components/ResumePreview";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { ResumeData } from "@/components/ResumeForm";

const History = () => {
  const navigate = useNavigate();
  const [generatedResume, setGeneratedResume] = useState<ResumeData | null>(null);

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation activeView="history" onViewChange={(view) => view === "create" && navigate("/")} />
      <div className="flex-1">
        <ResumeHistory onViewResume={setGeneratedResume} />
      </div>
      <Footer />
      
      {generatedResume && (
        <ResumePreview data={generatedResume} onClose={() => setGeneratedResume(null)} />
      )}
    </div>
  );
};

export default History;
