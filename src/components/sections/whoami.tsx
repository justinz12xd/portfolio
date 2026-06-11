"use client";

import { useTranslations } from "next-intl";

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

export function WhoamiSection() {
  const t = useTranslations("Whoami");

  const tabs: TabContent[] = [
    {
      label: "whoami",
      command: "whoami",
      lines: [
        { text: "", delay: 100 },
        {
          text: `name      ${t("name")}`,
          color: "text-foreground",
          delay: 180,
        },
        {
          text: `role      ${t("role")}`,
          color: "text-foreground",
          delay: 140,
        },
        {
          text: `location  ${t("location")}`,
          color: "text-foreground",
          delay: 140,
        },
        {
          text: `stack     ${t("stack")}`,
          color: "text-foreground",
          delay: 140,
        },
        { text: "", delay: 120 },
        {
          text: `status    ${t("status")}`,
          color: "text-emerald-500",
          delay: 200,
        },
      ],
    },
  ];

  return (
    <section className="container py-12 sm:py-16" id="whoami">
      <TerminalAnimationRoot
        className="mx-auto max-w-2xl"
        hideCursorOnComplete={false}
        tabs={tabs}
      >
        <TerminalAnimationContainer className="px-0 py-0">
          <TerminalAnimationWindow
            className="rounded-2xl border shadow-xl"
            minHeight="13rem"
          >
            <div className="flex items-center gap-1.5 border-b px-4 py-3">
              <span className="size-2.5 rounded-full bg-red-400" />
              <span className="size-2.5 rounded-full bg-yellow-400" />
              <span className="size-2.5 rounded-full bg-green-400" />
              <span className="ml-2 font-mono text-xs text-muted-foreground">
                justin@portfolio:~
              </span>
            </div>

            <TerminalAnimationContent className="px-5 py-5 sm:px-6 sm:py-6">
              <div className="flex items-center gap-2 font-mono text-sm">
                <span className="text-emerald-500">$</span>
                <TerminalAnimationCommandBar
                  cursor={<TerminalAnimationBlinkingCursor />}
                />
              </div>

              <TerminalAnimationOutput
                className="mt-2 font-mono text-sm leading-relaxed"
                renderLine={(line, _i, visible) =>
                  visible ? (
                    <div className={line.color}>
                      {line.text || " "}
                    </div>
                  ) : null
                }
              />

              <TerminalAnimationTrailingPrompt className="mt-2 flex items-center gap-2 font-mono text-sm">
                <span className="text-emerald-500">$</span>
                <TerminalAnimationBlinkingCursor />
              </TerminalAnimationTrailingPrompt>
            </TerminalAnimationContent>
          </TerminalAnimationWindow>
        </TerminalAnimationContainer>
      </TerminalAnimationRoot>
    </section>
  );
}
