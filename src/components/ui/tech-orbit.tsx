import { Code2 } from "lucide-react";

import { OrbitingCircles } from "@/components/ui/orbiting-circles";
import { cn } from "@/lib/utils";

const DEVICON_BASE =
  "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons";

const innerStack = [
  { name: "React", icon: "react/react-original" },
  { name: "Next.js", icon: "nextjs/nextjs-original" },
  { name: "TypeScript", icon: "typescript/typescript-original" },
  { name: "Tailwind CSS", icon: "tailwindcss/tailwindcss-original" },
];

const outerStack = [
  { name: "Node.js", icon: "nodejs/nodejs-original" },
  { name: "PostgreSQL", icon: "postgresql/postgresql-original" },
  { name: "Docker", icon: "docker/docker-original" },
  { name: "Git", icon: "git/git-original" },
];

function TechIcon({
  name,
  icon,
  size,
}: {
  name: string;
  icon: string;
  size: string;
}) {
  return (
    <span
      className={cn(
        "flex items-center justify-center rounded-full border border-border/60 bg-card p-2 shadow-sm",
        size
      )}
    >
      {/* eslint-disable-next-line @next/next/no-img-element -- tiny external svg logos, no Image optimization needed */}
      <img
        alt={name}
        className="size-full object-contain"
        src={`${DEVICON_BASE}/${icon}.svg`}
      />
    </span>
  );
}

export function TechOrbit({ className }: { className?: string }) {
  return (
    <div
      className={cn(
        "relative mx-auto aspect-square w-full max-w-[360px]",
        className
      )}
    >
      <div className="absolute inset-0 z-10 m-auto flex size-16 items-center justify-center rounded-full border border-primary/20 bg-primary/10 text-primary shadow-[0_0_40px_-12px_var(--color-primary)]">
        <Code2 className="size-7" />
      </div>

      {innerStack.map((tech, index) => (
        <OrbitingCircles
          key={tech.name}
          delay={index * (22 / innerStack.length)}
          duration={22}
          radius={80}
        >
          <TechIcon icon={tech.icon} name={tech.name} size="size-9" />
        </OrbitingCircles>
      ))}

      {outerStack.map((tech, index) => (
        <OrbitingCircles
          key={tech.name}
          delay={index * (32 / outerStack.length)}
          duration={32}
          radius={150}
          reverse
        >
          <TechIcon icon={tech.icon} name={tech.name} size="size-11" />
        </OrbitingCircles>
      ))}
    </div>
  );
}
