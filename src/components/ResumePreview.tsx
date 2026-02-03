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

          <Card className="bg-white text-gray-900 shadow-2xl overflow-hidden" id="resume-preview-content">
            {isModern ? (
              /* PROFESSIONAL/MODERN TEMPLATE - Print-Optimized Design */
              <div className="flex" style={{ minHeight: '1122px' }}> {/* A4 height at 96dpi */}
                {/* Left Sidebar - Dark Charcoal */}
                <div className="w-[220px] bg-gradient-to-b from-slate-800 to-slate-900 text-white p-5 flex flex-col text-[11px]">
                  {/* Profile Photo */}
                  {data.profileImage && (
                    <div className="mb-4 flex justify-center">
                      <img 
                        src={data.profileImage} 
                        alt="Profile" 
                        className="w-24 h-24 rounded-full object-cover border-3 border-cyan-700 shadow-lg" 
                      />
                    </div>
                  )}
                  
                  {/* Contact Section */}
                  <div className="mb-4">
                    <h3 className="text-cyan-600 text-[10px] font-semibold uppercase tracking-wider mb-2 pb-1 border-b border-cyan-700/40">
                      Contact
                    </h3>
                    <div className="space-y-1.5">
                      <div className="flex items-center gap-2">
                        <Mail className="w-3 h-3 text-cyan-600 flex-shrink-0" />
                        <span className="text-gray-300 break-all leading-tight">{data.email}</span>
                      </div>
                      {data.phone && (
                        <div className="flex items-center gap-2">
                          <Phone className="w-3 h-3 text-cyan-600 flex-shrink-0" />
                          <span className="text-gray-300">{data.phone}</span>
                        </div>
                      )}
                      {data.location && (
                        <div className="flex items-center gap-2">
                          <MapPin className="w-3 h-3 text-cyan-600 flex-shrink-0" />
                          <span className="text-gray-300">{data.location}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Education Section in Sidebar */}
                  {data.education.some(e => e.degree) && (
                    <div className="mb-4">
                      <h3 className="text-cyan-600 text-[10px] font-semibold uppercase tracking-wider mb-2 pb-1 border-b border-cyan-700/40">
                        Education
                      </h3>
                      <div className="space-y-2">
                        {data.education.filter(e => e.degree).map((edu, i) => (
                          <div key={i} className="border-l-2 border-cyan-700/50 pl-2">
                            <div className="text-white font-medium text-[11px] leading-tight">{edu.degree}</div>
                            <div className="text-cyan-500 text-[10px]">{edu.institution}</div>
                            <div className="text-gray-400 text-[9px]">{edu.year}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Technical Skills with Progress Bars */}
                  {data.technicalSkills && (
                    <div className="mb-4">
                      <h3 className="text-cyan-600 text-[10px] font-semibold uppercase tracking-wider mb-2 pb-1 border-b border-cyan-700/40">
                        Technical Skills
                      </h3>
                      <div className="space-y-1.5">
                        {data.technicalSkills.split(",").slice(0, 6).map((skill, i) => (
                          <div key={i}>
                            <div className="text-gray-300 text-[10px] mb-0.5">{skill.trim()}</div>
                            <div className="w-full bg-slate-700 rounded-full h-1">
                              <div 
                                className="bg-cyan-600 h-1 rounded-full"
                                style={{ width: `${75 + (i * 4) % 20}%` }}
                              ></div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Soft Skills */}
                  {data.softSkills && (
                    <div className="mb-4">
                      <h3 className="text-cyan-600 text-[10px] font-semibold uppercase tracking-wider mb-2 pb-1 border-b border-cyan-700/40">
                        Soft Skills
                      </h3>
                      <div className="flex flex-wrap gap-1">
                        {data.softSkills.split(",").map((skill, i) => (
                          <span key={i} className="px-1.5 py-0.5 text-[9px] bg-cyan-700/30 text-cyan-300 rounded">
                            {skill.trim()}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Languages */}
                  {hasLanguages && (
                    <div className="mt-auto">
                      <h3 className="text-cyan-600 text-[10px] font-semibold uppercase tracking-wider mb-2 pb-1 border-b border-cyan-700/40">
                        Languages
                      </h3>
                      <div className="space-y-1">
                        {data.languages.filter(l => l.name).map((lang, i) => (
                          <div key={i} className="flex justify-between text-[10px]">
                            <span className="text-gray-300">{lang.name}</span>
                            <span className="text-cyan-500">{lang.proficiency}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Main Content Area - Expanded Width */}
                <div className="flex-1 bg-white p-6 text-[11px]">
                  {/* Header with Name and Title */}
                  <div className="mb-4 pb-3 border-b-2 border-cyan-700">
                    <h1 className="text-2xl font-bold text-slate-800 tracking-tight leading-none">{data.fullName}</h1>
                    <div className="text-cyan-700 font-medium text-sm mt-0.5 uppercase tracking-wide">
                      {data.experience[0]?.title || "Professional"}
                    </div>
                  </div>

                  {/* About Me / Summary */}
                  {data.summary && (
                    <div className="mb-4">
                      <h2 className="text-xs font-bold text-slate-800 mb-1.5 uppercase tracking-wide flex items-center gap-2">
                        <span className="w-1 h-4 bg-cyan-700 rounded-full"></span>
                        About Me
                      </h2>
                      <p className="text-gray-600 leading-relaxed">{data.summary}</p>
                    </div>
                  )}

                  {/* Work Experience - Timeline Style */}
                  {data.experience.some(e => e.title) && (
                    <div className="mb-4">
                      <h2 className="text-xs font-bold text-slate-800 mb-2 uppercase tracking-wide flex items-center gap-2">
                        <span className="w-1 h-4 bg-cyan-700 rounded-full"></span>
                        Work Experience
                      </h2>
                      <div className="relative pl-3 border-l border-cyan-200">
                        {data.experience.filter(e => e.title).map((exp, i) => (
                          <div key={i} className="relative mb-3 last:mb-0">
                            {/* Timeline dot */}
                            <div className="absolute -left-[7px] top-0.5 w-2 h-2 rounded-full bg-cyan-700"></div>
                            
                            <div className="pl-2">
                              <div className="flex justify-between items-start gap-2 mb-0.5">
                                <div>
                                  <h3 className="font-bold text-slate-800 text-[11px] leading-tight">{exp.title}</h3>
                                  <div className="text-cyan-700 font-medium text-[10px]">{exp.company}</div>
                                </div>
                                <span className="text-[9px] text-white bg-cyan-700 px-2 py-0.5 rounded-full font-medium whitespace-nowrap">
                                  {exp.duration}
                                </span>
                              </div>
                              <p className="text-gray-600 leading-relaxed">{exp.description}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Projects */}
                  {hasProjects && (
                    <div className="mb-4">
                      <h2 className="text-xs font-bold text-slate-800 mb-2 uppercase tracking-wide flex items-center gap-2">
                        <span className="w-1 h-4 bg-cyan-700 rounded-full"></span>
                        Projects
                      </h2>
                      <div className="grid gap-2">
                        {data.projects.filter(p => p.title).map((proj, i) => (
                          <div key={i} className="border-l-2 border-cyan-200 pl-2">
                            <h3 className="font-bold text-slate-800 text-[11px]">{proj.title}</h3>
                            <p className="text-gray-600 text-[10px] leading-relaxed">{proj.description}</p>
                            {proj.technologies && (
                              <div className="flex flex-wrap gap-1 mt-1">
                                {proj.technologies.split(",").map((tech, ti) => (
                                  <span key={ti} className="px-1.5 py-0.5 text-[8px] bg-cyan-50 text-cyan-700 rounded">
                                    {tech.trim()}
                                  </span>
                                ))}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Achievements */}
                  {hasAchievements && (
                    <div className="mb-4">
                      <h2 className="text-xs font-bold text-slate-800 mb-2 uppercase tracking-wide flex items-center gap-2">
                        <span className="w-1 h-4 bg-cyan-700 rounded-full"></span>
                        Achievements
                      </h2>
                      <div className="space-y-1">
                        {data.achievements.filter(a => a.title).map((ach, i) => (
                          <div key={i} className="flex items-start gap-1.5">
                            <div className="w-1 h-1 rounded-full bg-cyan-700 mt-1.5 flex-shrink-0"></div>
                            <div className="text-[11px]">
                              <span className="font-medium text-slate-800">{ach.title}</span>
                              {ach.description && <span className="text-gray-500"> — {ach.description}</span>}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Hobbies */}
                  {hasHobbies && (
                    <div>
                      <h2 className="text-xs font-bold text-slate-800 mb-1.5 uppercase tracking-wide flex items-center gap-2">
                        <span className="w-1 h-4 bg-cyan-700 rounded-full"></span>
                        Hobbies & Interests
                      </h2>
                      <p className="text-gray-600">{data.hobbies}</p>
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
