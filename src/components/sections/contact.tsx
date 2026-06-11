"use client";

import { useTranslations } from "next-intl";
import { Mail } from "lucide-react";

import { GithubIcon, LinkedinIcon } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { CosmicButton } from "@/components/ui/cosmic-button";
import { GradientHeading } from "@/components/ui/gradient-heading";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

const contactLinks = {
  github: "https://github.com/justinz12xd",
  linkedin: "https://www.linkedin.com/in/justinz12xd",
  email: "mailto:justinalejandro996@gmail.com",
};

export function ContactSection() {
  const t = useTranslations("Contact");

  return (
    <section className="container py-16 sm:py-24" id="contacto">
      <div className="mx-auto flex max-w-2xl flex-col items-center text-center">
        <ScrollReveal className="flex flex-col items-center">
          <div className="mb-4 inline-flex items-center gap-2 rounded-full border px-3 py-1 text-xs font-medium uppercase tracking-wide text-muted-foreground">
            <span className="relative flex size-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
              <span className="relative inline-flex size-2 rounded-full bg-emerald-500" />
            </span>
            {t("available")}
          </div>

          <GradientHeading size="lg">{t("heading")}</GradientHeading>
          <p className="mt-2 text-muted-foreground">{t("subheading")}</p>
        </ScrollReveal>

        <ScrollReveal delay={0.15} className="mt-8">
          <CosmicButton href={contactLinks.email} target="_self" rel="">
            <Mail />
            {t("emailCta")}
          </CosmicButton>
        </ScrollReveal>

        <ScrollReveal delay={0.25} className="mt-6 flex items-center gap-3">
          <Button
            aria-label="GitHub"
            nativeButton={false}
            render={
              <a
                href={contactLinks.github}
                target="_blank"
                rel="noopener noreferrer"
              />
            }
            size="icon"
            variant="outline"
          >
            <GithubIcon className="size-4" />
          </Button>
          <Button
            aria-label="LinkedIn"
            nativeButton={false}
            render={
              <a
                href={contactLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
              />
            }
            size="icon"
            variant="outline"
          >
            <LinkedinIcon className="size-4" />
          </Button>
        </ScrollReveal>
      </div>
    </section>
  );
}
