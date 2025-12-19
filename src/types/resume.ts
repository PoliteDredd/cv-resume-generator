export interface Experience {
  title: string;
  company: string;
  duration: string;
  description: string;
}

export interface Education {
  degree: string;
  institution: string;
  year: string;
}

export interface Project {
  title: string;
  description: string;
  technologies: string;
}

export interface Achievement {
  title: string;
  description: string;
}

export interface Language {
  name: string;
  proficiency: 'Basic' | 'Intermediate' | 'Fluent' | 'Native';
}

export interface SectionToggles {
  projects: boolean;
  achievements: boolean;
  hobbies: boolean;
  languages: boolean;
}

export interface ResumeData {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  summary: string;
  experience: Experience[];
  education: Education[];
  technicalSkills: string;
  softSkills: string;
  projects: Project[];
  achievements: Achievement[];
  hobbies: string;
  languages: Language[];
  template: "modern" | "classic";
  profileImage: string | null;
  sectionToggles: SectionToggles;
}
