"use client";

import { useEffect, useLayoutEffect, useRef } from "react";
import { useTranslations } from "next-intl";
import { ArrowRight, Code2, Layers, Mail, MapPin } from "lucide-react";
import {
  createAnimatable,
  createTimeline,
  scrambleText,
  splitText,
  stagger,
  utils,
} from "animejs";
import { motion, useReducedMotion } from "motion/react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { projects } from "@/lib/data/projects";

const stackHighlights = ["TypeScript", "React", "Next.js", "Node.js"];

export function HeroSection() {
  const hero = useTranslations("Hero");
  const nav = useTranslations("Nav");
  const whoami = useTranslations("Whoami");
  const prefersReducedMotion = useReducedMotion();
  const badgeRef = useRef<HTMLParagraphElement>(null);
  const titleRef = useRef<HTMLSpanElement>(null);
  const subtitleRef = useRef<HTMLSpanElement>(null);
  const descRef = useRef<HTMLParagraphElement>(null);
  const ctaRef = useRef<HTMLDivElement>(null);
  const visualRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  // Choreographed entrance: badge → title → subtitle → description → CTA,
  // all driven by a single anime.js timeline so the left column reads as one move.
  useLayoutEffect(() => {
    const badgeEl = badgeRef.current;
    const titleEl = titleRef.current;
    const subtitleEl = subtitleRef.current;
    const descEl = descRef.current;
    const ctaEl = ctaRef.current;
    if (
      prefersReducedMotion ||
      !badgeEl ||
      !titleEl ||
      !subtitleEl ||
      !descEl ||
      !ctaEl
    )
      return;

    const splitter = splitText(titleEl, {
      lines: { wrap: true },
      words: true,
    });

    // Hide everything pre-paint to avoid a flash before the timeline takes over.
    utils.set([badgeEl, descEl, ctaEl], { opacity: 0, y: 16 });
    utils.set(splitter.words, { opacity: 0, y: "100%" });
    utils.set(subtitleEl, { opacity: 0 });

    const tl = createTimeline({
      defaults: { ease: "outExpo", duration: 800 },
    });

    tl.add(badgeEl, { opacity: [0, 1], y: [16, 0], duration: 600 }, 0)
      .add(
        splitter.words,
        {
          opacity: [0, 1],
          y: ["100%", "0%"],
          duration: 900,
          delay: stagger(60),
        },
        "-=300"
      )
      .add(
        subtitleEl,
        {
          opacity: [0, 1],
          text: scrambleText({
            chars: "uppercase",
            from: "left",
            ease: "outQuad",
          }),
          duration: 1400,
        },
        "-=500"
      )
      .add(descEl, { opacity: [0, 1], y: [16, 0], duration: 700 }, "-=1100")
      .add(ctaEl, { opacity: [0, 1], y: [16, 0], duration: 700 }, "-=900");

    return () => {
      tl.revert();
      splitter.revert();
    };
  }, [prefersReducedMotion]);

  useEffect(() => {
    if (prefersReducedMotion) return;
    const container = visualRef.current;
    const cards = cardRefs.current;
    if (!container || cards.some((card) => !card)) return;

    // each card drifts/tilts a different amount → sense of depth
    const depths = [
      { move: 24, tilt: 6 },
      { move: 14, tilt: -4 },
      { move: 34, tilt: 9 },
    ];

    const animatables = cards.map((card) =>
      createAnimatable(card!, {
        x: { unit: "px", duration: 600, ease: "outCubic" },
        y: { unit: "px", duration: 600, ease: "outCubic" },
        rotate: { unit: "deg", duration: 600, ease: "outCubic" },
      })
    );

    const onMove = (event: PointerEvent) => {
      const rect = container.getBoundingClientRect();
      const nx = (event.clientX - rect.left) / rect.width - 0.5;
      const ny = (event.clientY - rect.top) / rect.height - 0.5;
      animatables.forEach((anim, i) => {
        anim.x(nx * depths[i].move);
        anim.y(ny * depths[i].move);
        anim.rotate(nx * depths[i].tilt);
      });
    };

    const onLeave = () => {
      animatables.forEach((anim) => {
        anim.x(0);
        anim.y(0);
        anim.rotate(0);
      });
    };

    const zone = container.closest("section") ?? container;
    zone.addEventListener("pointermove", onMove as EventListener);
    zone.addEventListener("pointerleave", onLeave as EventListener);

    return () => {
      zone.removeEventListener("pointermove", onMove as EventListener);
      zone.removeEventListener("pointerleave", onLeave as EventListener);
      animatables.forEach((anim) => anim.revert());
    };
  }, [prefersReducedMotion]);

  const float = (distance: number) =>
    prefersReducedMotion ? [0, 0, 0] : [0, distance, 0];

  const floatTransition = (duration: number) =>
    prefersReducedMotion
      ? { duration: 0 }
      : {
          duration,
          repeat: Infinity,
          repeatType: "mirror" as const,
          ease: "easeInOut" as const,
        };

  return (
    <section
      aria-labelledby="hero-title"
      className="relative overflow-hidden border-b border-border/60 bg-background"
      id="inicio"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-[-10rem] h-[26rem] w-[26rem] -translate-x-1/2 rounded-full bg-primary/8 blur-3xl" />
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-background to-transparent" />
      </div>

      <div className="container relative z-10 py-14 sm:py-16 lg:py-24">
        <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_minmax(360px,540px)] lg:gap-14">
          <div className="max-w-2xl">
            <p
              className="inline-flex items-center gap-2 rounded-full border border-primary/20 bg-primary/8 px-3 py-1 text-xs font-medium tracking-[0.15em] text-primary uppercase"
              ref={badgeRef}
            >
              {whoami("status")}
            </p>

            <h1
              className="mt-5 text-balance font-semibold tracking-[-0.06em] text-4xl leading-[0.95] sm:text-5xl md:text-6xl lg:text-7xl"
              id="hero-title"
            >
              <span
                className="block"
                dangerouslySetInnerHTML={{ __html: hero("title") }}
                ref={titleRef}
              />
              <span
                className="mt-3 block text-foreground/70"
                dangerouslySetInnerHTML={{ __html: hero("subtitle") }}
                ref={subtitleRef}
              />
            </h1>

            <p
              className="mt-6 max-w-xl text-pretty text-base leading-7 text-foreground/72 sm:text-lg"
              ref={descRef}
            >
              {hero.rich("description", {
                tech: (chunks) => (
                  <span className="font-medium tracking-tight text-foreground">
                    {chunks}
                  </span>
                ),
              })}
            </p>

            <div
              className="mt-8 flex flex-wrap items-center gap-3"
              ref={ctaRef}
            >
              <Button
                className="shadow-sm shadow-primary/10"
                nativeButton={false}
                render={<a href="#proyectos" />}
                size="lg"
              >
                {hero("cta")}
                <ArrowRight className="ml-1.5 size-4" />
              </Button>

              <Button
                nativeButton={false}
                render={<a href="#contacto" />}
                size="lg"
                variant="outline"
              >
                <Mail className="mr-1.5 size-4" />
                {nav("contact")}
              </Button>
            </div>
          </div>

          <div className="w-full">
            <div
              className="relative mx-auto aspect-square w-full max-w-[420px]"
              ref={visualRef}
            >
              <motion.div
                animate={{ opacity: 1, y: 0 }}
                className="absolute left-0 top-4 w-[78%] -rotate-2 rounded-2xl border border-border/70 bg-card/90 p-5 shadow-[0_24px_80px_-40px_rgba(15,23,42,0.35)] backdrop-blur"
                initial={{ opacity: 0, y: 24 }}
                transition={{ duration: 0.6, delay: 0.1 }}
              >
                <motion.div
                  animate={{ y: float(-8) }}
                  transition={floatTransition(7)}
                >
                  <div
                    ref={(el) => {
                      cardRefs.current[0] = el;
                    }}
                  >
                    <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-[0.15em] text-muted-foreground">
                      <Code2 className="size-4 text-primary" />
                      {hero("statsStackLabel")}
                    </div>
                    <div className="mt-3 flex flex-wrap gap-1.5">
                      {stackHighlights.map((tech) => (
                        <Badge key={tech} variant="outline">
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </motion.div>
              </motion.div>

              <motion.div
                animate={{ opacity: 1, y: 0 }}
                className="absolute bottom-10 left-4 w-[60%] rotate-2 rounded-2xl border border-border/70 bg-card/90 p-5 shadow-[0_24px_80px_-40px_rgba(15,23,42,0.35)] backdrop-blur"
                initial={{ opacity: 0, y: 24 }}
                transition={{ duration: 0.6, delay: 0.25 }}
              >
                <motion.div
                  animate={{ y: float(8) }}
                  transition={floatTransition(8)}
                >
                  <div
                    ref={(el) => {
                      cardRefs.current[1] = el;
                    }}
                  >
                    <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-[0.15em] text-muted-foreground">
                      <Layers className="size-4 text-primary" />
                      {hero("statsProjectsLabel")}
                    </div>
                    <p className="mt-2 text-4xl font-semibold tracking-tight">
                      {projects.length}+
                    </p>
                  </div>
                </motion.div>
              </motion.div>

              <motion.div
                animate={{ opacity: 1, y: 0 }}
                className="absolute right-0 top-1/3 w-[58%] -rotate-3 rounded-2xl border border-border/70 bg-card/90 p-5 shadow-[0_24px_80px_-40px_rgba(15,23,42,0.35)] backdrop-blur"
                initial={{ opacity: 0, y: 24 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <motion.div
                  animate={{ y: float(-6) }}
                  transition={floatTransition(9)}
                >
                  <div
                    ref={(el) => {
                      cardRefs.current[2] = el;
                    }}
                  >
                    <div className="flex items-center gap-2 text-xs font-medium uppercase tracking-[0.15em] text-muted-foreground">
                      <MapPin className="size-4 text-primary" />
                      {hero("statsLocationLabel")}
                    </div>
                    <p className="mt-2 text-lg font-semibold tracking-tight">
                      {whoami("location")}
                    </p>
                    <p className="mt-1 flex items-center gap-1.5 text-sm text-muted-foreground">
                      <span className="relative flex size-2">
                        <span className="absolute inline-flex size-full animate-ping rounded-full bg-primary/60" />
                        <span className="relative inline-flex size-2 rounded-full bg-primary" />
                      </span>
                      {whoami("status")}
                    </p>
                  </div>
                </motion.div>
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
