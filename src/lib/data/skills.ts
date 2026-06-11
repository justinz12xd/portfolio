export interface SkillCategory {
  id: string;
  skills: string[];
}

export const skillCategories: SkillCategory[] = [
  {
    id: "frontend",
    skills: ["React", "Next.js", "TypeScript", "Tailwind CSS"],
  },
  {
    id: "backend",
    skills: ["Node.js", "Express", "PostgreSQL", "REST APIs"],
  },
  {
    id: "tools",
    skills: ["Git", "Docker", "Vercel", "Linux"],
  },
];
