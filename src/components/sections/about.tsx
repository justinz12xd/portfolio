"use client";

import { useRef } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import { motion, useReducedMotion, useScroll, useTransform } from "motion/react";

import { GlobeInteractive } from "@/components/ui/cobe-globe-interactive";
import { GradientHeading } from "@/components/ui/gradient-heading";

const blocks = ["who", "from", "going"] as const;

export function AboutSection() {
  const t = useTranslations("About");
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

      <div className="mt-6 grid items-center gap-12 lg:grid-cols-2">
        <div>
          <motion.div
            className="relative aspect-[4/3] w-[85%] overflow-hidden rounded-2xl bg-background"
            style={{ y: photoY }}
          >
            <Image
              src="/Justin/Gemini_Generated_Image_e2pwrie2pwrie2pw-removebg-preview.png"
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
    </section>
  );
}
