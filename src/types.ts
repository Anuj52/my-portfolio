
export interface Project {
  title: string;
  tech: string;
  date: string;
  description: string[];
  type: string;
  demoLink?: string;
  codeLink?: string;
  impact?: string;
}

export interface Education {
  year: string;
  degree: string;
  institute: string;
  score: string;
}

export interface SkillCategory {
  category: string;
  skills: string[];
}

export interface Experience {
  role: string;
  organization: string;
  duration: string;
  details: string[];
}

export interface Course {
  category: string;
  courses: string[];
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
}
