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
              /* PROFESSIONAL/MODERN TEMPLATE - Enhanced Design */
              <div className="flex min-h-[800px]">
                {/* Left Sidebar - Dark Charcoal */}
                <div className="w-[280px] bg-gradient-to-b from-slate-800 to-slate-900 text-white p-6 flex flex-col">
                  {/* Profile Photo */}
                  {data.profileImage && (
                    <div className="mb-6 flex justify-center">
                      <div className="relative">
                        <img 
                          src={data.profileImage} 
                          alt="Profile" 
                          className="w-32 h-32 rounded-full object-cover border-4 border-teal-400 shadow-xl" 
                        />
                        <div className="absolute inset-0 rounded-full ring-2 ring-teal-400/30 ring-offset-2 ring-offset-slate-800"></div>
                      </div>
                    </div>
                  )}
                  
                  {/* Contact Section */}
                  <div className="mb-6">
                    <h3 className="text-teal-400 text-sm font-bold uppercase tracking-widest mb-4 flex items-center gap-2">
                      <div className="w-8 h-0.5 bg-teal-400"></div>
                      Contact
                    </h3>
                    <div className="space-y-3 text-sm">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-teal-400/20 flex items-center justify-center">
                          <Mail className="w-4 h-4 text-teal-400" />
                        </div>
                        <span className="text-gray-300 break-all text-xs">{data.email}</span>
                      </div>
                      {data.phone && (
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-teal-400/20 flex items-center justify-center">
                            <Phone className="w-4 h-4 text-teal-400" />
                          </div>
                          <span className="text-gray-300 text-xs">{data.phone}</span>
                        </div>
                      )}
                      {data.location && (
                        <div className="flex items-center gap-3">
                          <div className="w-8 h-8 rounded-full bg-teal-400/20 flex items-center justify-center">
                            <MapPin className="w-4 h-4 text-teal-400" />
                          </div>
                          <span className="text-gray-300 text-xs">{data.location}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Education Section in Sidebar */}
                  {data.education.some(e => e.degree) && (
                    <div className="mb-6">
                      <h3 className="text-teal-400 text-sm font-bold uppercase tracking-widest mb-4 flex items-center gap-2">
                        <div className="w-8 h-0.5 bg-teal-400"></div>
                        Education
                      </h3>
                      <div className="space-y-3">
                        {data.education.filter(e => e.degree).map((edu, i) => (
                          <div key={i} className="border-l-2 border-teal-400/30 pl-3">
                            <div className="text-white font-medium text-sm">{edu.degree}</div>
                            <div className="text-teal-400 text-xs">{edu.institution}</div>
                            <div className="text-gray-400 text-xs mt-1">{edu.year}</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Technical Skills with Progress Bars */}
                  {data.technicalSkills && (
                    <div className="mb-6">
                      <h3 className="text-teal-400 text-sm font-bold uppercase tracking-widest mb-4 flex items-center gap-2">
                        <div className="w-8 h-0.5 bg-teal-400"></div>
                        Technical Skills
                      </h3>
                      <div className="space-y-3">
                        {data.technicalSkills.split(",").slice(0, 6).map((skill, i) => (
                          <div key={i}>
                            <div className="flex justify-between text-xs mb-1">
                              <span className="text-gray-300">{skill.trim()}</span>
                              <span className="text-teal-400">{Math.floor(70 + Math.random() * 25)}%</span>
                            </div>
                            <div className="w-full bg-slate-700 rounded-full h-1.5">
                              <div 
                                className="bg-gradient-to-r from-teal-400 to-teal-500 h-1.5 rounded-full transition-all"
                                style={{ width: `${70 + Math.random() * 25}%` }}
                              ></div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Soft Skills */}
                  {data.softSkills && (
                    <div className="mb-6">
                      <h3 className="text-teal-400 text-sm font-bold uppercase tracking-widest mb-4 flex items-center gap-2">
                        <div className="w-8 h-0.5 bg-teal-400"></div>
                        Soft Skills
                      </h3>
                      <div className="flex flex-wrap gap-1.5">
                        {data.softSkills.split(",").map((skill, i) => (
                          <span key={i} className="px-2 py-1 text-xs bg-teal-400/20 text-teal-300 rounded border border-teal-400/30">
                            {skill.trim()}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Languages */}
                  {hasLanguages && (
                    <div className="mt-auto">
                      <h3 className="text-teal-400 text-sm font-bold uppercase tracking-widest mb-4 flex items-center gap-2">
                        <div className="w-8 h-0.5 bg-teal-400"></div>
                        Languages
                      </h3>
                      <div className="space-y-2">
                        {data.languages.filter(l => l.name).map((lang, i) => (
                          <div key={i} className="flex justify-between text-xs">
                            <span className="text-gray-300">{lang.name}</span>
                            <span className="text-teal-400 font-medium">{lang.proficiency}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>

                {/* Main Content Area */}
                <div className="flex-1 bg-gray-50 p-8">
                  {/* Header with Name and Title */}
                  <div className="mb-8 pb-6 border-b-2 border-teal-400">
                    <h1 className="text-4xl font-bold text-slate-800 tracking-tight">{data.fullName}</h1>
                    <div className="text-teal-600 font-semibold text-lg mt-1 uppercase tracking-wide">
                      {data.experience[0]?.title || "Professional"}
                    </div>
                  </div>

                  {/* About Me / Summary */}
                  {data.summary && (
                    <div className="mb-8">
                      <h2 className="text-lg font-bold text-slate-800 mb-3 flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-teal-400 flex items-center justify-center">
                          <span className="text-white text-sm font-bold">01</span>
                        </div>
                        About Me
                      </h2>
                      <p className="text-gray-600 text-sm leading-relaxed pl-[52px]">{data.summary}</p>
                    </div>
                  )}

                  {/* Work Experience - Timeline Style */}
                  {data.experience.some(e => e.title) && (
                    <div className="mb-8">
                      <h2 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-teal-400 flex items-center justify-center">
                          <span className="text-white text-sm font-bold">02</span>
                        </div>
                        Work Experience
                      </h2>
                      <div className="pl-[52px] relative">
                        {/* Timeline line */}
                        <div className="absolute left-[17px] top-0 bottom-0 w-0.5 bg-teal-200"></div>
                        
                        {data.experience.filter(e => e.title).map((exp, i) => (
                          <div key={i} className="relative mb-6 last:mb-0">
                            {/* Timeline dot */}
                            <div className="absolute -left-[35px] top-1 w-3 h-3 rounded-full bg-teal-400 border-2 border-white shadow-sm"></div>
                            
                            <div className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
                              <div className="flex justify-between items-start mb-2">
                                <div>
                                  <h3 className="font-bold text-slate-800">{exp.title}</h3>
                                  <div className="text-teal-600 font-medium text-sm">{exp.company}</div>
                                </div>
                                <span className="text-xs text-white bg-teal-400 px-3 py-1 rounded-full font-medium">
                                  {exp.duration}
                                </span>
                              </div>
                              <p className="text-sm text-gray-600 leading-relaxed">{exp.description}</p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Projects */}
                  {hasProjects && (
                    <div className="mb-8">
                      <h2 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-teal-400 flex items-center justify-center">
                          <span className="text-white text-sm font-bold">03</span>
                        </div>
                        Projects
                      </h2>
                      <div className="pl-[52px] grid gap-3">
                        {data.projects.filter(p => p.title).map((proj, i) => (
                          <div key={i} className="bg-white rounded-lg p-4 shadow-sm border border-gray-100">
                            <h3 className="font-bold text-slate-800 mb-1">{proj.title}</h3>
                            <p className="text-sm text-gray-600 mb-2">{proj.description}</p>
                            {proj.technologies && (
                              <div className="flex flex-wrap gap-1">
                                {proj.technologies.split(",").map((tech, ti) => (
                                  <span key={ti} className="px-2 py-0.5 text-xs bg-teal-50 text-teal-600 rounded">
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
                    <div className="mb-8">
                      <h2 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-teal-400 flex items-center justify-center">
                          <span className="text-white text-sm font-bold">04</span>
                        </div>
                        Achievements
                      </h2>
                      <div className="pl-[52px] space-y-2">
                        {data.achievements.filter(a => a.title).map((ach, i) => (
                          <div key={i} className="flex items-start gap-2">
                            <div className="w-2 h-2 rounded-full bg-teal-400 mt-1.5 flex-shrink-0"></div>
                            <div>
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
                      <h2 className="text-lg font-bold text-slate-800 mb-4 flex items-center gap-3">
                        <div className="w-10 h-10 rounded-lg bg-teal-400 flex items-center justify-center">
                          <span className="text-white text-sm font-bold">05</span>
                        </div>
                        Hobbies & Interests
                      </h2>
                      <p className="text-sm text-gray-600 pl-[52px]">{data.hobbies}</p>
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
