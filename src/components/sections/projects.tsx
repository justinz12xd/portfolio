"use client";

import Image from "next/image";
import { useTranslations } from "next-intl";
import { ExternalLink } from "lucide-react";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { GradientHeading } from "@/components/ui/gradient-heading";
import { ScrollReveal } from "@/components/ui/scroll-reveal";
import { cn } from "@/lib/utils";
import { type Project, projects } from "@/lib/data/projects";

type ProjectsTranslator = ReturnType<typeof useTranslations>;

function getProjectHost(url?: string) {
  if (!url) {
    return "private.local";
  }

  try {
    return new URL(url).hostname.replace(/^www\./, "");
  } catch {
    return url;
  }
}

function BrowserMockup({
  className,
  imageClassName,
  priority = false,
  project,
  title,
  ctaLabel,
}: {
  className?: string;
  imageClassName?: string;
  priority?: boolean;
  project: Project;
  title: string;
  ctaLabel: string;
}) {
  return (
    <div
      className={cn(
        "group/browser relative overflow-hidden rounded-[1.65rem] border border-border/70 bg-background shadow-[0_1px_0_rgba(255,255,255,0.7)_inset,0_18px_55px_-38px_rgba(15,23,42,0.55)]",
        className
      )}
    >
      <div className="flex h-10 items-center gap-2 border-b border-border/70 bg-muted/35 px-4">
        <div className="flex gap-1.5">
          <span className="size-2.5 rounded-full bg-red-400" />
          <span className="size-2.5 rounded-full bg-amber-400" />
          <span className="size-2.5 rounded-full bg-emerald-400" />
        </div>
        <div className="ml-2 min-w-0 flex-1 rounded-full border border-border/60 bg-background/80 px-3 py-1 font-mono text-[0.68rem] text-muted-foreground">
          <span className="block truncate">{getProjectHost(project.demoUrl)}</span>
        </div>
      </div>

      <div className="relative aspect-[16/10] overflow-hidden bg-muted/40">
        <Image
          alt={title}
          className={cn(
            "object-cover object-top transition-transform duration-700 ease-out group-hover/browser:scale-[1.035]",
            imageClassName
          )}
          fill
          priority={priority}
          sizes={
            priority
              ? "(min-width: 1024px) 55vw, 100vw"
              : "(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          }
          src={project.image}
        />

        <div className="absolute inset-0 bg-gradient-to-t from-background/92 via-background/15 to-transparent opacity-0 transition-opacity duration-300 group-hover/browser:opacity-100" />

        {project.demoUrl ? (
          <Button
            className="absolute bottom-4 left-4 translate-y-2 opacity-0 shadow-lg transition-all duration-300 group-hover/browser:translate-y-0 group-hover/browser:opacity-100"
            nativeButton={false}
            render={
              <a
                href={project.demoUrl}
                rel="noopener noreferrer"
                target="_blank"
              />
            }
            size="sm"
          >
            <ExternalLink />
            {ctaLabel}
          </Button>
        ) : null}
      </div>
    </div>
  );
}

function ProjectMetaBadges({
  project,
  t,
}: {
  project: Project;
  t: ProjectsTranslator;
}) {
  return (
    <div className="flex flex-wrap gap-2">
      <Badge className="rounded-md" variant="outline">
        {t(`labels.${project.kind}`)}
      </Badge>
      <Badge
        className={cn(
          "rounded-md",
          project.demoUrl
            ? "border-emerald-500/25 bg-emerald-500/10 text-emerald-600 dark:text-emerald-400"
            : "border-amber-500/25 bg-amber-500/10 text-amber-700 dark:text-amber-300"
        )}
        variant="outline"
      >
        {project.demoUrl ? t("labels.live") : t("demoUnavailable")}
      </Badge>
    </div>
  );
}

function FeaturedProject({
  project,
  t,
}: {
  project: Project;
  t: ProjectsTranslator;
}) {
  const title = t(`items.${project.id}.title`);

  return (
    <ScrollReveal delay={0.08}>
      <article className="grid overflow-hidden rounded-[2rem] border border-border/70 bg-card/70 p-3 shadow-[0_24px_90px_-60px_rgba(15,23,42,0.55)] backdrop-blur lg:grid-cols-[1.12fr_0.88fr] lg:items-stretch">
        <BrowserMockup
          ctaLabel={t("openProject")}
          className="h-full"
          priority
          project={project}
          title={title}
        />

        <div className="flex flex-col justify-between gap-8 p-5 sm:p-7 lg:p-8">
          <div>
            <div className="flex flex-wrap items-center gap-3">
              <span className="font-mono text-xs font-medium tracking-[0.18em] text-muted-foreground uppercase">
                {t("featured")}
              </span>
              <ProjectMetaBadges project={project} t={t} />
            </div>

            <h3 className="mt-5 text-balance text-3xl font-semibold tracking-[-0.04em] sm:text-4xl">
              {title}
            </h3>
            <p className="mt-4 max-w-xl text-pretty text-base leading-7 text-muted-foreground">
              {t(`items.${project.id}.description`)}
            </p>
          </div>

          <div className="space-y-5">
            <div className="flex flex-wrap gap-2">
              {project.tech.map((tech) => (
                <Badge
                  className="rounded-md bg-background/80 text-foreground"
                  key={tech}
                  variant="secondary"
                >
                  {tech}
                </Badge>
              ))}
            </div>

            {project.demoUrl ? (
              <Button
                className="w-fit"
                nativeButton={false}
                render={
                  <a
                    href={project.demoUrl}
                    rel="noopener noreferrer"
                    target="_blank"
                  />
                }
                size="lg"
              >
                <ExternalLink />
                {t("openProject")}
              </Button>
            ) : null}
          </div>
        </div>
      </article>
    </ScrollReveal>
  );
}

function ProjectCard({
  className,
  index,
  project,
  t,
}: {
  className?: string;
  index: number;
  project: Project;
  t: ProjectsTranslator;
}) {
  const title = t(`items.${project.id}.title`);

  return (
    <ScrollReveal
      className={cn("flex", className)}
      delay={Math.min(index * 0.08, 0.32)}
    >
      <article className="group flex h-full flex-col overflow-hidden rounded-[1.75rem] border border-border/70 bg-card/70 p-2 shadow-[0_18px_60px_-48px_rgba(15,23,42,0.55)] transition-all duration-300 hover:-translate-y-1 hover:bg-card">
        <BrowserMockup
          ctaLabel={t("openProject")}
          className="rounded-[1.25rem] shadow-none"
          project={project}
          title={title}
        />

        <div className="flex flex-1 flex-col p-4 sm:p-5">
          <ProjectMetaBadges project={project} t={t} />
          <h3 className="mt-4 text-xl font-semibold tracking-[-0.03em]">
            {title}
          </h3>
          <p className="mt-2 text-sm leading-6 text-muted-foreground">
            {t(`items.${project.id}.description`)}
          </p>

          <div className="mt-5 flex flex-wrap gap-1.5">
            {project.tech.map((tech) => (
              <Badge key={tech} variant="secondary">
                {tech}
              </Badge>
            ))}
          </div>
        </div>
      </article>
    </ScrollReveal>
  );
}

export function ProjectsSection() {
  const t = useTranslations("Projects");
  const [featuredProject, ...secondaryProjects] = projects;

  return (
    <section
      className="container relative overflow-hidden py-16 sm:py-24"
      id="proyectos"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-6 top-32 -z-10 h-80 rounded-full bg-emerald-400/8 blur-3xl"
      />

      <ScrollReveal className="max-w-3xl">
        <GradientHeading size="lg">{t("heading")}</GradientHeading>
        <p className="mt-3 max-w-2xl text-pretty text-muted-foreground">
          {t("subheading")}
        </p>
      </ScrollReveal>

      <div className="mt-12 space-y-6">
        {featuredProject ? (
          <FeaturedProject project={featuredProject} t={t} />
        ) : null}

        <div className="grid gap-6 md:grid-cols-2">
          {secondaryProjects.map((project, index) => (
            <ProjectCard
              className={cn(index === 0 && "lg:-mt-8")}
              index={index + 1}
              key={project.id}
              project={project}
              t={t}
            />
          ))}
        </div>
      </div>
    </section>
  );
}
