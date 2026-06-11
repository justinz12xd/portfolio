export interface Project {
  id: string;
  image: string;
  kind: "cms" | "institutional" | "erp" | "landing";
  tech: string[];
  demoUrl?: string;
}

export const projects: Project[] = [
  {
    id: "constructora-gl-pro",
    image: "/projects/constructora-gl-pro.webp",
    kind: "cms",
    tech: ["Next.js", "Django", "Wagtail CMS"],
    demoUrl: "https://www.constructoraglpro.com/",
  },
  {
    id: "crossworlds-connections",
    image: "/projects/crossworlds-connections.webp",
    kind: "institutional",
    tech: ["Angular", "Supabase"],
    demoUrl: "https://crossworldsconnections.org/",
  },
  {
    id: "erp-crossworld",
    image: "/projects/erp-crossworld.webp",
    kind: "erp",
    tech: ["Angular", "Go"],
  },
  {
    id: "mariachi-el-rey-manta",
    image: "/projects/mariachi-el-rey-manta.webp",
    kind: "landing",
    tech: ["Next.js", "Supabase"],
    demoUrl: "https://www.mariachielreymanta.com/",
  },
  {
    id: "pacheco-landing",
    image: "/projects/pacheco-landing.webp",
    kind: "landing",
    tech: ["Next.js"],
  },
];
