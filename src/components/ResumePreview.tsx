import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Download, X } from "lucide-react";
import { ResumeData } from "./ResumeForm";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";

interface ResumePreviewProps {
  data: ResumeData;
  onClose: () => void;
}

const ResumePreview = ({ data, onClose }: ResumePreviewProps) => {
  const handleDownloadPDF = async () => {
    const element = document.getElementById("resume-preview-content");
    if (!element) return;

    const canvas = await html2canvas(element, {
      scale: 2,
      useCORS: true,
      logging: false,
    });

    const imgData = canvas.toDataURL("image/png");
    const pdf = new jsPDF({
      orientation: "portrait",
      unit: "mm",
      format: "a4",
    });

    const pdfWidth = pdf.internal.pageSize.getWidth();
    const pdfHeight = pdf.internal.pageSize.getHeight();
    const imgWidth = canvas.width;
    const imgHeight = canvas.height;
    const ratio = Math.min(pdfWidth / imgWidth, pdfHeight / imgHeight);
    const imgX = (pdfWidth - imgWidth * ratio) / 2;
    const imgY = 0;

    pdf.addImage(
      imgData,
      "PNG",
      imgX,
      imgY,
      imgWidth * ratio,
      imgHeight * ratio
    );
    pdf.save(`${data.fullName.replace(/\s+/g, "_")}_Resume.pdf`);
  };

  const isModern = data.template === "modern";

  return (
    <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-50 overflow-y-auto">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-4xl mx-auto">
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-2xl font-bold">Your Resume</h2>
            <div className="flex gap-2">
              <Button onClick={handleDownloadPDF} size="lg">
                <Download className="mr-2 w-4 h-4" />
                Download PDF
              </Button>
              <Button onClick={onClose} variant="outline" size="lg">
                <X className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <Card className="p-8 bg-white text-black" id="resume-preview-content">
            {/* Header */}
            <div className={`mb-6 pb-6 ${isModern ? "border-b-4 border-primary" : "border-b-2 border-gray-300"}`}>
              <h1 className={`font-bold mb-2 ${isModern ? "text-4xl text-primary" : "text-3xl"}`}>
                {data.fullName}
              </h1>
              <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                <span>{data.email}</span>
                <span>•</span>
                <span>{data.phone}</span>
                <span>•</span>
                <span>{data.location}</span>
              </div>
            </div>

            {/* Summary */}
            {data.summary && (
              <div className="mb-6">
                <h2 className={`font-bold mb-2 ${isModern ? "text-xl text-primary" : "text-lg uppercase border-b border-gray-300 pb-1"}`}>
                  Professional Summary
                </h2>
                <p className="text-sm leading-relaxed text-gray-700">{data.summary}</p>
              </div>
            )}

            {/* Experience */}
            {data.experience.length > 0 && (
              <div className="mb-6">
                <h2 className={`font-bold mb-3 ${isModern ? "text-xl text-primary" : "text-lg uppercase border-b border-gray-300 pb-1"}`}>
                  Work Experience
                </h2>
                {data.experience.map((exp, index) => (
                  <div key={index} className="mb-4">
                    <div className="flex justify-between items-baseline mb-1">
                      <h3 className="font-semibold text-base">{exp.title}</h3>
                      <span className="text-sm text-gray-600">{exp.duration}</span>
                    </div>
                    <div className="text-sm text-gray-600 mb-1">{exp.company}</div>
                    <p className="text-sm text-gray-700 leading-relaxed">{exp.description}</p>
                  </div>
                ))}
              </div>
            )}

            {/* Education */}
            {data.education.length > 0 && (
              <div className="mb-6">
                <h2 className={`font-bold mb-3 ${isModern ? "text-xl text-primary" : "text-lg uppercase border-b border-gray-300 pb-1"}`}>
                  Education
                </h2>
                {data.education.map((edu, index) => (
                  <div key={index} className="mb-3">
                    <div className="flex justify-between items-baseline mb-1">
                      <h3 className="font-semibold text-base">{edu.degree}</h3>
                      <span className="text-sm text-gray-600">{edu.year}</span>
                    </div>
                    <div className="text-sm text-gray-600">{edu.institution}</div>
                  </div>
                ))}
              </div>
            )}

            {/* Skills */}
            {data.skills && (
              <div>
                <h2 className={`font-bold mb-2 ${isModern ? "text-xl text-primary" : "text-lg uppercase border-b border-gray-300 pb-1"}`}>
                  Skills
                </h2>
                <div className="flex flex-wrap gap-2">
                  {data.skills.split(",").map((skill, index) => (
                    <span
                      key={index}
                      className={`px-3 py-1 text-sm ${
                        isModern
                          ? "bg-primary/10 text-primary rounded-full"
                          : "bg-gray-100 text-gray-700 rounded"
                      }`}
                    >
                      {skill.trim()}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ResumePreview;
