"use client";

import { useTranslations } from "next-intl";
import { Code2, Server, Wrench, type LucideIcon } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { GradientHeading } from "@/components/ui/gradient-heading";
import { MinimalCard, MinimalCardTitle } from "@/components/ui/minimal-card";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { skillCategories } from "@/lib/data/skills";

const categoryIcons: Record<string, LucideIcon> = {
  frontend: Code2,
  backend: Server,
  tools: Wrench,
};

export function SkillsSection() {
  const t = useTranslations("Skills");

  return (
    <section className="container py-16 sm:py-24" id="skills">
      <ScrollReveal className="mx-auto max-w-2xl text-center">
        <GradientHeading size="lg">{t("heading")}</GradientHeading>
        <p className="mt-2 text-muted-foreground">{t("subheading")}</p>
      </ScrollReveal>

      <div className="mt-12 grid gap-6 sm:grid-cols-3">
        {skillCategories.map((category, index) => {
          const Icon = categoryIcons[category.id];

          return (
            <ScrollReveal key={category.id} delay={index * 0.08}>
              <MinimalCard className="group transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
                <div className="p-4">
                  <div className="flex size-10 items-center justify-center rounded-full bg-primary/10 text-primary transition-colors group-hover:bg-primary/15">
                    <Icon className="size-5" />
                  </div>

                  <MinimalCardTitle className="mt-3">
                    {t(`categories.${category.id}`)}
                  </MinimalCardTitle>

                  <div className="mt-3 flex flex-wrap gap-1.5 px-1">
                    {category.skills.map((skill) => (
                      <Badge key={skill} variant="outline">
                        {skill}
                      </Badge>
                    ))}
                  </div>
                </div>
              </MinimalCard>
            </ScrollReveal>
          );
        })}
      </div>
    </section>
  );
}
