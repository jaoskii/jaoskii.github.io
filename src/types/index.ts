export interface Project {
  id: string;
  title: string;
  description: string;
  tags: string[];
  liveUrl?: string;
  repoUrl?: string;
  featured: boolean;
  year: string;
  screenshots?: string[];
}

export interface Skill {
  category: string;
  items: string[];
}

export interface Experience {
  id: string;
  role: string;
  company: string;
  period: string;
  description: string;
  highlights: string[];
  type: "full-time" | "freelance" | "contract";
}

export interface NavItem {
  label: string;
  href: string;
}
