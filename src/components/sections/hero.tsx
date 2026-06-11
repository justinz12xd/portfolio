"use client";

import { useTranslations } from "next-intl";
import { ArrowRight, Mail } from "lucide-react";

import { Button } from "@/components/ui/button";
import {
  TerminalAnimationBlinkingCursor,
  TerminalAnimationCommandBar,
  TerminalAnimationContainer,
  TerminalAnimationContent,
  TerminalAnimationOutput,
  TerminalAnimationRoot,
  TerminalAnimationTrailingPrompt,
  TerminalAnimationWindow,
  type TabContent,
} from "@/components/ui/terminal-animation";

export function HeroSection() {
  const hero = useTranslations("Hero");
  const nav = useTranslations("Nav");
  const whoami = useTranslations("Whoami");

  const terminalRows = [
    { label: "name", value: whoami("name") },
    { label: "role", value: whoami("role") },
    { label: "location", value: whoami("location") },
    { label: "stack", value: whoami("stack") },
  ];

  const terminalTabs: TabContent[] = [
    {
      label: "whoami",
      command: "whoami",
      lines: [
        { text: "", delay: 100 },
        {
          text: `name      ${whoami("name")}`,
          color: "text-foreground/85",
          delay: 180,
        },
        {
          text: `role      ${whoami("role")}`,
          color: "text-foreground/85",
          delay: 140,
        },
        {
          text: `location  ${whoami("location")}`,
          color: "text-foreground/85",
          delay: 140,
        },
        {
          text: `stack     ${whoami("stack")}`,
          color: "text-foreground/85",
          delay: 140,
        },
        { text: "", delay: 120 },
        {
          text: `status    ${whoami("status")}`,
          color: "text-emerald-500",
          delay: 200,
        },
      ],
    },
  ];

  return (
    <section
      aria-labelledby="hero-title"
      className="relative overflow-hidden border-b border-border/60 bg-background"
      id="inicio"
    >
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute left-1/2 top-[-10rem] h-[26rem] w-[26rem] -translate-x-1/2 rounded-full bg-emerald-400/8 blur-3xl" />
        <div className="absolute right-[-8rem] top-24 h-72 w-72 rounded-full bg-sky-400/10 blur-3xl" />
        <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-background to-transparent" />
      </div>

      <div className="container relative z-10 py-14 sm:py-16 lg:py-24">
        <div className="grid items-center gap-10 lg:grid-cols-[1.1fr_minmax(360px,540px)] lg:gap-14">
          <div className="max-w-2xl">
            <p className="inline-flex items-center gap-2 rounded-full border border-emerald-500/20 bg-emerald-500/8 px-3 py-1 text-xs font-medium tracking-[0.14em] text-emerald-600 uppercase dark:text-emerald-400">
              {whoami("status")}
            </p>

            <h1
              className="mt-5 text-balance font-semibold tracking-[-0.06em] text-4xl leading-[0.95] sm:text-5xl md:text-6xl lg:text-7xl"
              id="hero-title"
            >
              {hero("title")}
              <span className="mt-3 block text-foreground/70">
                {hero("subtitle")}
              </span>
            </h1>

            <p className="mt-6 max-w-xl text-pretty text-base leading-7 text-foreground/72 sm:text-lg">
              {hero.rich("description", {
                tech: (chunks) => (
                  <span className="font-medium tracking-tight text-foreground">
                    {chunks}
                  </span>
                ),
              })}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-3">
              <Button
                className="shadow-sm shadow-emerald-500/10"
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

            <div className="mt-8 flex flex-wrap gap-2 text-sm text-foreground/60">
              {terminalRows.map((row) => (
                <span
                  className="rounded-full border border-border/70 bg-card px-3 py-1.5 font-mono"
                  key={row.label}
                >
                  <span className="text-foreground/40">{row.label}</span>{" "}
                  <span className="text-foreground/80">{row.value}</span>
                </span>
              ))}
            </div>
          </div>

          <div className="lg:justify-self-end">
            <TerminalAnimationRoot
              className="relative mx-auto w-full max-w-[540px]"
              hideCursorOnComplete={false}
              tabs={terminalTabs}
            >
              <TerminalAnimationContainer className="rounded-[28px] border border-border/70 bg-card/95 p-2.5 pt-2.5 pb-2.5 shadow-[0_24px_80px_-40px_rgba(15,23,42,0.35)] backdrop-blur transition-transform duration-300 hover:-translate-y-1 md:px-2.5 md:pt-2.5">
                <TerminalAnimationWindow
                  animateOnVisible={false}
                  className="rounded-[22px] border border-border/70 bg-[#fcfbf8] shadow-[0_1px_0_rgba(255,255,255,0.8)_inset,0_12px_30px_-20px_rgba(15,23,42,0.45)] dark:bg-neutral-900"
                  minHeight="20.5rem"
                >
                  <div className="flex items-center gap-1.5 border-b border-black/5 px-4 py-3 dark:border-white/10">
                    <span className="size-2.5 rounded-full bg-red-400" />
                    <span className="size-2.5 rounded-full bg-amber-400" />
                    <span className="size-2.5 rounded-full bg-emerald-400" />
                    <span className="ml-2 font-mono text-xs text-foreground/45">
                      justin@portfolio:~
                    </span>
                  </div>

                  <TerminalAnimationContent className="px-5 py-6 sm:px-7 sm:py-7">
                    <div className="flex items-center gap-2 font-mono text-sm text-foreground">
                      <span className="text-emerald-500">$</span>
                      <TerminalAnimationCommandBar
                        cursor={<TerminalAnimationBlinkingCursor />}
                      />
                    </div>

                    <TerminalAnimationOutput
                      className="mt-6 font-mono text-[0.92rem] leading-7 sm:text-[0.98rem]"
                      renderLine={(line, _index, visible) =>
                        visible ? (
                          <div className={line.color}>
                            {line.text || " "}
                          </div>
                        ) : null
                      }
                    />

                    <TerminalAnimationTrailingPrompt className="mt-6 flex items-center gap-2 font-mono text-sm text-foreground/45">
                      <span className="text-emerald-500">$</span>
                      <TerminalAnimationBlinkingCursor />
                    </TerminalAnimationTrailingPrompt>
                  </TerminalAnimationContent>
                </TerminalAnimationWindow>
              </TerminalAnimationContainer>
            </TerminalAnimationRoot>
          </div>
        </div>
      </div>
    </section>
  );
}
