import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Download, X, Mail, Phone, MapPin } from "lucide-react";
import type { ResumeData } from "@/types/resume";
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

    pdf.addImage(imgData, "PNG", imgX, imgY, imgWidth * ratio, imgHeight * ratio);
    pdf.save(`${data.fullName.replace(/\s+/g, "_")}_Resume.pdf`);
  };

  const isModern = data.template === "modern";
  const hasProjects = data.sectionToggles?.projects && data.projects?.some(p => p.title);
  const hasAchievements = data.sectionToggles?.achievements && data.achievements?.some(a => a.title);
  const hasHobbies = data.sectionToggles?.hobbies && data.hobbies;
  const hasLanguages = data.sectionToggles?.languages && data.languages?.some(l => l.name);

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

          <Card className="bg-white text-gray-900 shadow-2xl" id="resume-preview-content">
            {isModern ? (
              /* PROFESSIONAL/MODERN TEMPLATE */
              <div className="flex">
                {/* Sidebar */}
                <div className="w-1/3 bg-gradient-to-b from-blue-600 to-teal-600 text-white p-6">
                  {data.profileImage && (
                    <div className="mb-6">
                      <img src={data.profileImage} alt="Profile" className="w-28 h-28 rounded-full mx-auto object-cover border-4 border-white/30 shadow-lg" />
                    </div>
                  )}
                  
                  <div className="mb-6">
                    <h3 className="text-sm font-semibold uppercase tracking-wider mb-3 text-blue-200">Contact</h3>
                    <div className="space-y-2 text-sm">
                      <div className="flex items-center gap-2"><Mail className="w-4 h-4" /><span className="break-all">{data.email}</span></div>
                      {data.phone && <div className="flex items-center gap-2"><Phone className="w-4 h-4" /><span>{data.phone}</span></div>}
                      {data.location && <div className="flex items-center gap-2"><MapPin className="w-4 h-4" /><span>{data.location}</span></div>}
                    </div>
                  </div>

                  {data.technicalSkills && (
                    <div className="mb-6">
                      <h3 className="text-sm font-semibold uppercase tracking-wider mb-3 text-blue-200">Technical Skills</h3>
                      <div className="flex flex-wrap gap-1.5">
                        {data.technicalSkills.split(",").map((skill, i) => (
                          <span key={i} className="px-2 py-1 text-xs bg-white/20 rounded">{skill.trim()}</span>
                        ))}
                      </div>
                    </div>
                  )}

                  {data.softSkills && (
                    <div className="mb-6">
                      <h3 className="text-sm font-semibold uppercase tracking-wider mb-3 text-blue-200">Soft Skills</h3>
                      <div className="flex flex-wrap gap-1.5">
                        {data.softSkills.split(",").map((skill, i) => (
                          <span key={i} className="px-2 py-1 text-xs bg-white/20 rounded">{skill.trim()}</span>
                        ))}
                      </div>
                    </div>
                  )}

                  {hasLanguages && (
                    <div>
                      <h3 className="text-sm font-semibold uppercase tracking-wider mb-3 text-blue-200">Languages</h3>
                      <div className="space-y-2">
                        {data.languages.filter(l => l.name).map((lang, i) => (
                          <div key={i} className="flex justify-between text-sm">
                            <span>{lang.name}</span>
                            <span className="text-blue-200">{lang.proficiency}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Main Content */}
                <div className="w-2/3 p-8">
                  <div className="mb-6">
                    <h1 className="text-3xl font-bold text-gray-900 mb-2">{data.fullName}</h1>
                    {data.summary && <p className="text-gray-600 text-sm leading-relaxed">{data.summary}</p>}
                  </div>

                  {data.experience.some(e => e.title) && (
                    <div className="mb-6">
                      <h2 className="text-lg font-bold text-blue-600 border-b-2 border-blue-600 pb-1 mb-4">Experience</h2>
                      {data.experience.filter(e => e.title).map((exp, i) => (
                        <div key={i} className="mb-4">
                          <div className="flex justify-between">
                            <h3 className="font-semibold text-gray-900">{exp.title}</h3>
                            <span className="text-sm text-gray-500">{exp.duration}</span>
                          </div>
                          <div className="text-sm text-blue-600 mb-1">{exp.company}</div>
                          <p className="text-sm text-gray-600">{exp.description}</p>
                        </div>
                      ))}
                    </div>
                  )}

                  {data.education.some(e => e.degree) && (
                    <div className="mb-6">
                      <h2 className="text-lg font-bold text-blue-600 border-b-2 border-blue-600 pb-1 mb-4">Education</h2>
                      {data.education.filter(e => e.degree).map((edu, i) => (
                        <div key={i} className="mb-3">
                          <div className="flex justify-between">
                            <h3 className="font-semibold text-gray-900">{edu.degree}</h3>
                            <span className="text-sm text-gray-500">{edu.year}</span>
                          </div>
                          <div className="text-sm text-blue-600">{edu.institution}</div>
                        </div>
                      ))}
                    </div>
                  )}

                  {hasProjects && (
                    <div className="mb-6">
                      <h2 className="text-lg font-bold text-blue-600 border-b-2 border-blue-600 pb-1 mb-4">Projects</h2>
                      {data.projects.filter(p => p.title).map((proj, i) => (
                        <div key={i} className="mb-3">
                          <h3 className="font-semibold text-gray-900">{proj.title}</h3>
                          <p className="text-sm text-gray-600">{proj.description}</p>
                          {proj.technologies && <p className="text-xs text-blue-600 mt-1">Tech: {proj.technologies}</p>}
                        </div>
                      ))}
                    </div>
                  )}

                  {hasAchievements && (
                    <div className="mb-6">
                      <h2 className="text-lg font-bold text-blue-600 border-b-2 border-blue-600 pb-1 mb-4">Achievements</h2>
                      {data.achievements.filter(a => a.title).map((ach, i) => (
                        <div key={i} className="mb-2">
                          <h3 className="font-semibold text-gray-900">{ach.title}</h3>
                          {ach.description && <p className="text-sm text-gray-600">{ach.description}</p>}
                        </div>
                      ))}
                    </div>
                  )}

                  {hasHobbies && (
                    <div>
                      <h2 className="text-lg font-bold text-blue-600 border-b-2 border-blue-600 pb-1 mb-4">Hobbies & Interests</h2>
                      <p className="text-sm text-gray-600">{data.hobbies}</p>
                    </div>
                  )}
                </div>
              </div>
            ) : (
              /* TRADITIONAL/CLASSIC TEMPLATE */
              <div className="p-8">
                <div className="text-center mb-6 pb-4 border-b-2 border-gray-800">
                  {data.profileImage && (
                    <img src={data.profileImage} alt="Profile" className="w-24 h-24 rounded-full mx-auto object-cover border-2 border-gray-300 mb-4" />
                  )}
                  <h1 className="text-3xl font-serif font-bold text-gray-900 mb-2">{data.fullName}</h1>
                  <div className="flex flex-wrap justify-center gap-4 text-sm text-gray-600">
                    <span>{data.email}</span>
                    {data.phone && <><span>•</span><span>{data.phone}</span></>}
                    {data.location && <><span>•</span><span>{data.location}</span></>}
                  </div>
                </div>

                {data.summary && (
                  <div className="mb-6">
                    <h2 className="text-lg font-serif font-bold uppercase tracking-wide text-gray-800 border-b border-gray-300 pb-1 mb-3">Professional Summary</h2>
                    <p className="text-sm text-gray-700 leading-relaxed">{data.summary}</p>
                  </div>
                )}

                {data.experience.some(e => e.title) && (
                  <div className="mb-6">
                    <h2 className="text-lg font-serif font-bold uppercase tracking-wide text-gray-800 border-b border-gray-300 pb-1 mb-3">Work Experience</h2>
                    {data.experience.filter(e => e.title).map((exp, i) => (
                      <div key={i} className="mb-4">
                        <div className="flex justify-between">
                          <h3 className="font-semibold text-gray-900">{exp.title}</h3>
                          <span className="text-sm text-gray-600 italic">{exp.duration}</span>
                        </div>
                        <div className="text-sm text-gray-700 mb-1">{exp.company}</div>
                        <p className="text-sm text-gray-600">{exp.description}</p>
                      </div>
                    ))}
                  </div>
                )}

                {data.education.some(e => e.degree) && (
                  <div className="mb-6">
                    <h2 className="text-lg font-serif font-bold uppercase tracking-wide text-gray-800 border-b border-gray-300 pb-1 mb-3">Education</h2>
                    {data.education.filter(e => e.degree).map((edu, i) => (
                      <div key={i} className="mb-3">
                        <div className="flex justify-between">
                          <h3 className="font-semibold text-gray-900">{edu.degree}</h3>
                          <span className="text-sm text-gray-600 italic">{edu.year}</span>
                        </div>
                        <div className="text-sm text-gray-700">{edu.institution}</div>
                      </div>
                    ))}
                  </div>
                )}

                <div className="grid grid-cols-2 gap-6 mb-6">
                  {data.technicalSkills && (
                    <div>
                      <h2 className="text-lg font-serif font-bold uppercase tracking-wide text-gray-800 border-b border-gray-300 pb-1 mb-3">Technical Skills</h2>
                      <div className="flex flex-wrap gap-2">
                        {data.technicalSkills.split(",").map((skill, i) => (
                          <span key={i} className="px-2 py-1 text-sm bg-gray-100 text-gray-700 rounded">{skill.trim()}</span>
                        ))}
                      </div>
                    </div>
                  )}
                  {data.softSkills && (
                    <div>
                      <h2 className="text-lg font-serif font-bold uppercase tracking-wide text-gray-800 border-b border-gray-300 pb-1 mb-3">Soft Skills</h2>
                      <div className="flex flex-wrap gap-2">
                        {data.softSkills.split(",").map((skill, i) => (
                          <span key={i} className="px-2 py-1 text-sm bg-gray-100 text-gray-700 rounded">{skill.trim()}</span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {hasProjects && (
                  <div className="mb-6">
                    <h2 className="text-lg font-serif font-bold uppercase tracking-wide text-gray-800 border-b border-gray-300 pb-1 mb-3">Projects</h2>
                    {data.projects.filter(p => p.title).map((proj, i) => (
                      <div key={i} className="mb-3">
                        <h3 className="font-semibold text-gray-900">{proj.title}</h3>
                        <p className="text-sm text-gray-600">{proj.description}</p>
                        {proj.technologies && <p className="text-xs text-gray-500 mt-1 italic">Technologies: {proj.technologies}</p>}
                      </div>
                    ))}
                  </div>
                )}

                {hasAchievements && (
                  <div className="mb-6">
                    <h2 className="text-lg font-serif font-bold uppercase tracking-wide text-gray-800 border-b border-gray-300 pb-1 mb-3">Achievements</h2>
                    {data.achievements.filter(a => a.title).map((ach, i) => (
                      <div key={i} className="mb-2">
                        <h3 className="font-semibold text-gray-900">{ach.title}</h3>
                        {ach.description && <p className="text-sm text-gray-600">{ach.description}</p>}
                      </div>
                    ))}
                  </div>
                )}

                {hasLanguages && (
                  <div className="mb-6">
                    <h2 className="text-lg font-serif font-bold uppercase tracking-wide text-gray-800 border-b border-gray-300 pb-1 mb-3">Languages</h2>
                    <div className="flex flex-wrap gap-4">
                      {data.languages.filter(l => l.name).map((lang, i) => (
                        <span key={i} className="text-sm text-gray-700">{lang.name} ({lang.proficiency})</span>
                      ))}
                    </div>
                  </div>
                )}

                {hasHobbies && (
                  <div>
                    <h2 className="text-lg font-serif font-bold uppercase tracking-wide text-gray-800 border-b border-gray-300 pb-1 mb-3">Hobbies & Interests</h2>
                    <p className="text-sm text-gray-600">{data.hobbies}</p>
                  </div>
                )}
              </div>
            )}
          </Card>
        </div>
      </div>
    </div>
  );
};

export default ResumePreview;
