import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Plus, Minus, Loader2, Upload, X, FileText, Briefcase } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import type { ResumeData, Experience, Education, Project, Achievement, Language, SectionToggles } from "@/types/resume";

interface ResumeFormProps {
  onSubmit: (data: ResumeData) => void;
  isGenerating: boolean;
}

const ResumeForm = ({ onSubmit, isGenerating }: ResumeFormProps) => {
  const { toast } = useToast();
  const [formData, setFormData] = useState<ResumeData>({
    fullName: "",
    email: "",
    phone: "",
    location: "",
    summary: "",
    experience: [{ title: "", company: "", duration: "", description: "" }],
    education: [{ degree: "", institution: "", year: "" }],
    technicalSkills: "",
    softSkills: "",
    projects: [{ title: "", description: "", technologies: "" }],
    achievements: [{ title: "", description: "" }],
    hobbies: "",
    languages: [{ name: "", proficiency: "Intermediate" }],
    template: "modern",
    profileImage: null,
    sectionToggles: {
      projects: false,
      achievements: false,
      hobbies: false,
      languages: false,
    },
  });

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        toast({
          title: "File too large",
          description: "Image size should be less than 5MB",
          variant: "destructive",
        });
        return;
      }
      const reader = new FileReader();
      reader.onloadend = () => {
        setFormData({ ...formData, profileImage: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setFormData({ ...formData, profileImage: null });
  };

  const toggleSection = (section: keyof SectionToggles) => {
    setFormData({
      ...formData,
      sectionToggles: {
        ...formData.sectionToggles,
        [section]: !formData.sectionToggles[section],
      },
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!formData.fullName || !formData.email) {
      toast({
        title: "Missing Information",
        description: "Please fill in at least your name and email",
        variant: "destructive",
      });
      return;
    }
    
    onSubmit(formData);
  };

  // Experience handlers
  const addExperience = () => {
    setFormData({
      ...formData,
      experience: [...formData.experience, { title: "", company: "", duration: "", description: "" }],
    });
  };

  const removeExperience = (index: number) => {
    setFormData({
      ...formData,
      experience: formData.experience.filter((_, i) => i !== index),
    });
  };

  const updateExperience = (index: number, field: keyof Experience, value: string) => {
    const newExperience = [...formData.experience];
    newExperience[index] = { ...newExperience[index], [field]: value };
    setFormData({ ...formData, experience: newExperience });
  };

  // Education handlers
  const addEducation = () => {
    setFormData({
      ...formData,
      education: [...formData.education, { degree: "", institution: "", year: "" }],
    });
  };

  const removeEducation = (index: number) => {
    setFormData({
      ...formData,
      education: formData.education.filter((_, i) => i !== index),
    });
  };

  const updateEducation = (index: number, field: keyof Education, value: string) => {
    const newEducation = [...formData.education];
    newEducation[index] = { ...newEducation[index], [field]: value };
    setFormData({ ...formData, education: newEducation });
  };

  // Project handlers
  const addProject = () => {
    setFormData({
      ...formData,
      projects: [...formData.projects, { title: "", description: "", technologies: "" }],
    });
  };

  const removeProject = (index: number) => {
    if (formData.projects.length > 1) {
      setFormData({
        ...formData,
        projects: formData.projects.filter((_, i) => i !== index),
      });
    }
  };

  const updateProject = (index: number, field: keyof Project, value: string) => {
    const newProjects = [...formData.projects];
    newProjects[index] = { ...newProjects[index], [field]: value };
    setFormData({ ...formData, projects: newProjects });
  };

  // Achievement handlers
  const addAchievement = () => {
    setFormData({
      ...formData,
      achievements: [...formData.achievements, { title: "", description: "" }],
    });
  };

  const removeAchievement = (index: number) => {
    if (formData.achievements.length > 1) {
      setFormData({
        ...formData,
        achievements: formData.achievements.filter((_, i) => i !== index),
      });
    }
  };

  const updateAchievement = (index: number, field: keyof Achievement, value: string) => {
    const newAchievements = [...formData.achievements];
    newAchievements[index] = { ...newAchievements[index], [field]: value };
    setFormData({ ...formData, achievements: newAchievements });
  };

  // Language handlers
  const addLanguage = () => {
    setFormData({
      ...formData,
      languages: [...formData.languages, { name: "", proficiency: "Intermediate" }],
    });
  };

  const removeLanguage = (index: number) => {
    if (formData.languages.length > 1) {
      setFormData({
        ...formData,
        languages: formData.languages.filter((_, i) => i !== index),
      });
    }
  };

  const updateLanguage = (index: number, field: keyof Language, value: string) => {
    const newLanguages = [...formData.languages];
    newLanguages[index] = { ...newLanguages[index], [field]: value } as Language;
    setFormData({ ...formData, languages: newLanguages });
  };

  return (
    <section className="py-24 bg-muted/30">
      <div className="container px-4 mx-auto max-w-4xl">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-bold mb-4">
            Create Your Resume
          </h2>
          <p className="text-xl text-muted-foreground">
            Fill in your details and let AI do the magic
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Profile Photo */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Upload className="w-5 h-5" />
                Profile Photo (Optional)
              </CardTitle>
              <CardDescription>Add a professional photo to your resume</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-6">
                {formData.profileImage ? (
                  <div className="relative">
                    <img
                      src={formData.profileImage}
                      alt="Profile"
                      className="w-24 h-24 rounded-full object-cover border-4 border-primary/20 shadow-lg"
                    />
                    <button
                      type="button"
                      onClick={removeImage}
                      className="absolute -top-2 -right-2 bg-destructive text-destructive-foreground rounded-full p-1 hover:bg-destructive/90 transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <div className="w-24 h-24 rounded-full bg-muted flex items-center justify-center border-2 border-dashed border-muted-foreground/50">
                    <Upload className="w-8 h-8 text-muted-foreground" />
                  </div>
                )}
                <div>
                  <Label htmlFor="profileImage" className="cursor-pointer">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary text-primary-foreground rounded-md hover:bg-primary/90 transition-colors">
                      <Upload className="w-4 h-4" />
                      Upload Photo
                    </div>
                  </Label>
                  <Input
                    id="profileImage"
                    type="file"
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden"
                  />
                  <p className="text-sm text-muted-foreground mt-2">Max size: 5MB. JPG, PNG or GIF.</p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Personal Information */}
          <Card>
            <CardHeader>
              <CardTitle>Personal Information</CardTitle>
              <CardDescription>Your basic contact details</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="fullName">Full Name *</Label>
                  <Input
                    id="fullName"
                    placeholder="John Doe"
                    value={formData.fullName}
                    onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                    required
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email *</Label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                </div>
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="phone">Phone</Label>
                  <Input
                    id="phone"
                    placeholder="+1 234 567 8900"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="location">Location</Label>
                  <Input
                    id="location"
                    placeholder="City, Country"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="summary">Professional Summary</Label>
                <Textarea
                  id="summary"
                  placeholder="Brief overview of your professional background..."
                  value={formData.summary}
                  onChange={(e) => setFormData({ ...formData, summary: e.target.value })}
                  rows={4}
                />
              </div>
            </CardContent>
          </Card>

          {/* Experience */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Work Experience</CardTitle>
                  <CardDescription>Your professional history</CardDescription>
                </div>
                <Button type="button" onClick={addExperience} size="sm" variant="outline">
                  <Plus className="w-4 h-4 mr-2" />
                  Add More
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {formData.experience.map((exp, index) => (
                <div key={index} className="space-y-4 p-4 border border-border rounded-lg relative">
                  {formData.experience.length > 1 && (
                    <Button
                      type="button"
                      onClick={() => removeExperience(index)}
                      size="sm"
                      variant="ghost"
                      className="absolute top-2 right-2"
                    >
                      <Minus className="w-4 h-4" />
                    </Button>
                  )}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Job Title</Label>
                      <Input
                        placeholder="Software Engineer"
                        value={exp.title}
                        onChange={(e) => updateExperience(index, 'title', e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Company</Label>
                      <Input
                        placeholder="Tech Corp"
                        value={exp.company}
                        onChange={(e) => updateExperience(index, 'company', e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Duration</Label>
                    <Input
                      placeholder="Jan 2020 - Present"
                      value={exp.duration}
                      onChange={(e) => updateExperience(index, 'duration', e.target.value)}
                    />
                  </div>
                  <div className="space-y-2">
                    <Label>Description</Label>
                    <Textarea
                      placeholder="Describe your responsibilities and achievements..."
                      value={exp.description}
                      onChange={(e) => updateExperience(index, 'description', e.target.value)}
                      rows={3}
                    />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Education */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <div>
                  <CardTitle>Education</CardTitle>
                  <CardDescription>Your academic background</CardDescription>
                </div>
                <Button type="button" onClick={addEducation} size="sm" variant="outline">
                  <Plus className="w-4 h-4 mr-2" />
                  Add More
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-6">
              {formData.education.map((edu, index) => (
                <div key={index} className="space-y-4 p-4 border border-border rounded-lg relative">
                  {formData.education.length > 1 && (
                    <Button
                      type="button"
                      onClick={() => removeEducation(index)}
                      size="sm"
                      variant="ghost"
                      className="absolute top-2 right-2"
                    >
                      <Minus className="w-4 h-4" />
                    </Button>
                  )}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Degree</Label>
                      <Input
                        placeholder="Bachelor of Science"
                        value={edu.degree}
                        onChange={(e) => updateEducation(index, 'degree', e.target.value)}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Institution</Label>
                      <Input
                        placeholder="University Name"
                        value={edu.institution}
                        onChange={(e) => updateEducation(index, 'institution', e.target.value)}
                      />
                    </div>
                  </div>
                  <div className="space-y-2">
                    <Label>Year</Label>
                    <Input
                      placeholder="2020"
                      value={edu.year}
                      onChange={(e) => updateEducation(index, 'year', e.target.value)}
                    />
                  </div>
                </div>
              ))}
            </CardContent>
          </Card>

          {/* Skills - Split into Technical and Soft Skills */}
          <Card>
            <CardHeader>
              <CardTitle>Skills</CardTitle>
              <CardDescription>Your professional and personal competencies</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="technicalSkills">Technical / Professional Skills</Label>
                <Textarea
                  id="technicalSkills"
                  placeholder="Programming languages, tools, software, frameworks (e.g., JavaScript, React, Python, AWS, Git...)"
                  value={formData.technicalSkills}
                  onChange={(e) => setFormData({ ...formData, technicalSkills: e.target.value })}
                  rows={3}
                />
                <p className="text-sm text-muted-foreground">Separate skills with commas</p>
              </div>
              <div className="space-y-2">
                <Label htmlFor="softSkills">Soft Skills</Label>
                <Textarea
                  id="softSkills"
                  placeholder="Communication, Leadership, Problem-solving, Teamwork, Time Management..."
                  value={formData.softSkills}
                  onChange={(e) => setFormData({ ...formData, softSkills: e.target.value })}
                  rows={3}
                />
                <p className="text-sm text-muted-foreground">Separate skills with commas</p>
              </div>
            </CardContent>
          </Card>

          {/* Optional Sections Toggle */}
          <Card>
            <CardHeader>
              <CardTitle>Optional Sections</CardTitle>
              <CardDescription>Choose which additional sections to include</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-3 rounded-lg border border-border hover:bg-muted/50 transition-colors">
                <div>
                  <Label className="font-medium">Projects</Label>
                  <p className="text-sm text-muted-foreground">Add personal or professional projects</p>
                </div>
                <Switch
                  checked={formData.sectionToggles.projects}
                  onCheckedChange={() => toggleSection("projects")}
                />
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg border border-border hover:bg-muted/50 transition-colors">
                <div>
                  <Label className="font-medium">Achievements</Label>
                  <p className="text-sm text-muted-foreground">Awards, certifications, recognitions</p>
                </div>
                <Switch
                  checked={formData.sectionToggles.achievements}
                  onCheckedChange={() => toggleSection("achievements")}
                />
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg border border-border hover:bg-muted/50 transition-colors">
                <div>
                  <Label className="font-medium">Hobbies & Interests</Label>
                  <p className="text-sm text-muted-foreground">Personal interests and activities</p>
                </div>
                <Switch
                  checked={formData.sectionToggles.hobbies}
                  onCheckedChange={() => toggleSection("hobbies")}
                />
              </div>
              <div className="flex items-center justify-between p-3 rounded-lg border border-border hover:bg-muted/50 transition-colors">
                <div>
                  <Label className="font-medium">Languages</Label>
                  <p className="text-sm text-muted-foreground">Languages you speak and proficiency levels</p>
                </div>
                <Switch
                  checked={formData.sectionToggles.languages}
                  onCheckedChange={() => toggleSection("languages")}
                />
              </div>
            </CardContent>
          </Card>

          {/* Projects Section (Conditional) */}
          {formData.sectionToggles.projects && (
            <Card className="animate-in slide-in-from-top-2 duration-300">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Projects</CardTitle>
                    <CardDescription>Showcase your work</CardDescription>
                  </div>
                  <Button type="button" onClick={addProject} size="sm" variant="outline">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Project
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {formData.projects.map((proj, index) => (
                  <div key={index} className="space-y-4 p-4 border border-border rounded-lg relative">
                    {formData.projects.length > 1 && (
                      <Button
                        type="button"
                        onClick={() => removeProject(index)}
                        size="sm"
                        variant="ghost"
                        className="absolute top-2 right-2"
                      >
                        <Minus className="w-4 h-4" />
                      </Button>
                    )}
                    <div className="space-y-2">
                      <Label>Project Title</Label>
                      <Input
                        value={proj.title}
                        onChange={(e) => updateProject(index, "title", e.target.value)}
                        placeholder="Project Name"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Description</Label>
                      <Textarea
                        value={proj.description}
                        onChange={(e) => updateProject(index, "description", e.target.value)}
                        placeholder="Brief description of the project..."
                        rows={2}
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Technologies Used (Optional)</Label>
                      <Input
                        value={proj.technologies}
                        onChange={(e) => updateProject(index, "technologies", e.target.value)}
                        placeholder="React, Node.js, MongoDB..."
                      />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}

          {/* Achievements Section (Conditional) */}
          {formData.sectionToggles.achievements && (
            <Card className="animate-in slide-in-from-top-2 duration-300">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Achievements</CardTitle>
                    <CardDescription>Awards, certifications, and recognitions</CardDescription>
                  </div>
                  <Button type="button" onClick={addAchievement} size="sm" variant="outline">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Achievement
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-6">
                {formData.achievements.map((ach, index) => (
                  <div key={index} className="space-y-4 p-4 border border-border rounded-lg relative">
                    {formData.achievements.length > 1 && (
                      <Button
                        type="button"
                        onClick={() => removeAchievement(index)}
                        size="sm"
                        variant="ghost"
                        className="absolute top-2 right-2"
                      >
                        <Minus className="w-4 h-4" />
                      </Button>
                    )}
                    <div className="space-y-2">
                      <Label>Title</Label>
                      <Input
                        value={ach.title}
                        onChange={(e) => updateAchievement(index, "title", e.target.value)}
                        placeholder="Award, Certification, or Recognition"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Description (Optional)</Label>
                      <Textarea
                        value={ach.description}
                        onChange={(e) => updateAchievement(index, "description", e.target.value)}
                        placeholder="Brief description..."
                        rows={2}
                      />
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          )}

          {/* Hobbies Section (Conditional) */}
          {formData.sectionToggles.hobbies && (
            <Card className="animate-in slide-in-from-top-2 duration-300">
              <CardHeader>
                <CardTitle>Hobbies & Interests</CardTitle>
                <CardDescription>What you enjoy outside of work</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <Label htmlFor="hobbies">Hobbies</Label>
                  <Textarea
                    id="hobbies"
                    value={formData.hobbies}
                    onChange={(e) => setFormData({ ...formData, hobbies: e.target.value })}
                    placeholder="Reading, Photography, Hiking, Music, Volunteering..."
                    rows={3}
                  />
                </div>
              </CardContent>
            </Card>
          )}

          {/* Languages Section (Conditional) */}
          {formData.sectionToggles.languages && (
            <Card className="animate-in slide-in-from-top-2 duration-300">
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>Languages</CardTitle>
                    <CardDescription>Languages you speak</CardDescription>
                  </div>
                  <Button type="button" onClick={addLanguage} size="sm" variant="outline">
                    <Plus className="w-4 h-4 mr-2" />
                    Add Language
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                {formData.languages.map((lang, index) => (
                  <div key={index} className="flex items-end gap-4">
                    <div className="flex-1 space-y-2">
                      <Label>Language</Label>
                      <Input
                        value={lang.name}
                        onChange={(e) => updateLanguage(index, "name", e.target.value)}
                        placeholder="English, Spanish, French..."
                      />
                    </div>
                    <div className="flex-1 space-y-2">
                      <Label>Proficiency</Label>
                      <Select
                        value={lang.proficiency}
                        onValueChange={(value) => updateLanguage(index, "proficiency", value)}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Basic">Basic</SelectItem>
                          <SelectItem value="Intermediate">Intermediate</SelectItem>
                          <SelectItem value="Fluent">Fluent</SelectItem>
                          <SelectItem value="Native">Native</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    {formData.languages.length > 1 && (
                      <Button
                        type="button"
                        variant="ghost"
                        size="icon"
                        onClick={() => removeLanguage(index)}
                      >
                        <Minus className="w-4 h-4" />
                      </Button>
                    )}
                  </div>
                ))}
              </CardContent>
            </Card>
          )}

          {/* Template Selection */}
          <Card>
            <CardHeader>
              <CardTitle>Choose Template</CardTitle>
              <CardDescription>Select a design style for your resume</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid md:grid-cols-2 gap-6">
                <div
                  className={`p-6 border-2 rounded-xl cursor-pointer transition-all ${
                    formData.template === "classic"
                      ? "border-primary bg-primary/5 ring-2 ring-primary/20"
                      : "border-muted hover:border-primary/50"
                  }`}
                  onClick={() => setFormData({ ...formData, template: "classic" })}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 rounded-lg bg-muted">
                      <FileText className="w-5 h-5" />
                    </div>
                    <div className="font-semibold text-lg">Traditional</div>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Classic, conservative layout with clean lines. Perfect for formal industries like finance, law, and government.
                  </p>
                  <div className="mt-4 p-3 rounded-lg bg-muted/50 border">
                    <div className="h-2 w-3/4 bg-gray-800 rounded mb-2"></div>
                    <div className="h-1.5 w-1/2 bg-gray-400 rounded mb-3"></div>
                    <div className="h-1 w-full bg-gray-300 rounded mb-1"></div>
                    <div className="h-1 w-5/6 bg-gray-300 rounded"></div>
                  </div>
                </div>
                <div
                  className={`p-6 border-2 rounded-xl cursor-pointer transition-all ${
                    formData.template === "modern"
                      ? "border-primary bg-primary/5 ring-2 ring-primary/20"
                      : "border-muted hover:border-primary/50"
                  }`}
                  onClick={() => setFormData({ ...formData, template: "modern" })}
                >
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 rounded-lg bg-gradient-to-br from-blue-500 to-teal-500">
                      <Briefcase className="w-5 h-5 text-white" />
                    </div>
                    <div className="font-semibold text-lg">Professional</div>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">
                    Modern, visually striking with accent colors. Ideal for tech, business, marketing, and creative roles.
                  </p>
                  <div className="mt-4 p-3 rounded-lg bg-gradient-to-br from-blue-50 to-teal-50 dark:from-blue-950/30 dark:to-teal-950/30 border border-blue-200 dark:border-blue-800">
                    <div className="h-2 w-3/4 bg-gradient-to-r from-blue-500 to-teal-500 rounded mb-2"></div>
                    <div className="h-1.5 w-1/2 bg-blue-300 rounded mb-3"></div>
                    <div className="h-1 w-full bg-blue-200 rounded mb-1"></div>
                    <div className="h-1 w-5/6 bg-teal-200 rounded"></div>
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="flex justify-center">
            <Button 
              type="submit" 
              size="lg" 
              variant="hero"
              disabled={isGenerating}
              className="text-lg px-12"
            >
              {isGenerating ? (
                <>
                  <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                  Generating...
                </>
              ) : (
                "Generate Resume"
              )}
            </Button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default ResumeForm;
