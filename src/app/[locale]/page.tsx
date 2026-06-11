import { AboutSection } from "@/components/sections/about";
import { ContactSection } from "@/components/sections/contact";
import { EventsSection } from "@/components/sections/events";
import { HeroSection } from "@/components/sections/hero";
import { ProjectsSection } from "@/components/sections/projects";
import { SkillsSection } from "@/components/sections/skills";

export default function Home() {
  return (
    <main className="flex flex-1 flex-col">
      <HeroSection />
      <AboutSection />
      <ProjectsSection />
      <EventsSection />
      <SkillsSection />
      <ContactSection />
    </main>
  );
}
