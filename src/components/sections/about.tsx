"use client";

import { useRef } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";
import { Code2, Server, Wrench, type LucideIcon } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { GlobeInteractive } from "@/components/ui/cobe-globe-interactive";
import { GradientHeading } from "@/components/ui/gradient-heading";
import { TechOrbit } from "@/components/ui/tech-orbit";
import { skillCategories } from "@/lib/data/skills";

const blocks = ["who", "from", "going"] as const;

const categoryIcons: Record<string, LucideIcon> = {
  frontend: Code2,
  backend: Server,
  tools: Wrench,
};

export function AboutSection() {
  const t = useTranslations("About");
  const skills = useTranslations("Skills");
  const sectionRef = useRef<HTMLElement>(null);
  const prefersReducedMotion = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"],
  });
  const photoY = useTransform(
    scrollYProgress,
    [0, 1],
    prefersReducedMotion ? ["0px", "0px"] : ["-30px", "30px"]
  );
  const cardY = useTransform(
    scrollYProgress,
    [0, 1],
    prefersReducedMotion ? ["0px", "0px"] : ["20px", "-20px"]
  );

  return (
    <section className="container py-16 sm:py-24" id="sobre-mi" ref={sectionRef}>
      <GradientHeading size="lg">{t("heading")}</GradientHeading>

      <div className="mt-6 grid items-end gap-12 lg:grid-cols-2">
        <div>
          <motion.div
            className="relative aspect-[4/3] w-[85%] overflow-hidden rounded-2xl bg-background"
            style={{ y: photoY }}
          >
            <Image
              src="/Justin/justin.png"
              alt={t("photoAlt")}
              fill
              sizes="(min-width: 1024px) 50vw, 100vw"
              className="relative z-10 object-cover object-top"
            />
          </motion.div>

          <motion.div
            className="relative z-20 -mt-16 ml-auto w-[85%] space-y-5 rounded-2xl border bg-card p-6 shadow-xl sm:-mt-20 sm:w-[90%] sm:p-8"
            style={{ y: cardY }}
          >
            {blocks.map((block) => (
              <div key={block}>
                <h3 className="text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                  {t(`${block}.title`)}
                </h3>
                <p className="mt-1 text-foreground/90">
                  {t(`${block}.body`)}
                </p>
              </div>
            ))}
          </motion.div>
        </div>

        <GlobeInteractive className="mx-auto w-full max-w-md" />
      </div>

      <div className="mt-6 grid items-start gap-12 sm:mt-8 lg:grid-cols-2">
        <TechOrbit className="order-2 lg:order-1" />

        <div className="order-1 space-y-5 rounded-2xl border bg-card p-6 shadow-xl sm:p-8 lg:order-2">
          <div>
            <h3 className="text-2xl font-semibold tracking-tight sm:text-3xl">
              {skills("heading")}
            </h3>
            <p className="mt-2 text-muted-foreground">
              {skills("subheading")}
            </p>
          </div>

          {skillCategories.map((category) => {
            const Icon = categoryIcons[category.id];

            return (
              <div key={category.id}>
                <h4 className="flex items-center gap-2 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
                  <Icon className="size-4" />
                  {skills(`categories.${category.id}`)}
                </h4>
                <div className="mt-2 flex flex-wrap gap-1.5">
                  {category.skills.map((skill) => (
                    <Badge key={skill} variant="outline">
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
