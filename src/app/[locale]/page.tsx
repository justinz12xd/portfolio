import { AboutSection } from "@/components/sections/about";
import { ContactSection } from "@/components/sections/contact";
import { EventsSection } from "@/components/sections/events";
import { GithubSection } from "@/components/sections/github";
import { HeroSection } from "@/components/sections/hero";
import { ProjectsSection } from "@/components/sections/projects";

export default function Home() {
  return (
    <main className="flex flex-1 flex-col">
      <HeroSection />
      <AboutSection />
      <ProjectsSection />
      <EventsSection />
      <GithubSection />
      <ContactSection />
    </main>
  );
}
