"use client";

import { useLocale, useTranslations } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { Button } from "@/components/ui/button";
import { ThemeToggle } from "@/components/ui/theme-toggle";

const navItems = [
  { href: "#sobre-mi", key: "about" } as const,
  { href: "#proyectos", key: "projects" } as const,
  { href: "#eventos", key: "events" } as const,
  { href: "#github", key: "github" } as const,
  { href: "#contacto", key: "contact" } as const,
];

export function Header() {
  const t = useTranslations("Nav");
  const locale = useLocale();
  const pathname = usePathname();
  const router = useRouter();

  const otherLocale = routing.locales.find((l) => l !== locale)!;

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/50 bg-background/80 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-14 items-center justify-between">
        <a className="font-semibold tracking-tight" href="#">
          {t("brand")}
        </a>

        <nav className="hidden items-center gap-1 sm:flex">
          {navItems.map((item) => (
            <Button
              key={item.key}
              nativeButton={false}
              render={<a href={item.href} />}
              size="sm"
              variant="ghost"
            >
              {t(item.key)}
            </Button>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <ThemeToggle />

          <Button
            aria-label={
              otherLocale === "es" ? t("switchToEs") : t("switchToEn")
            }
            onClick={() => router.replace(pathname, { locale: otherLocale })}
            size="sm"
            variant="outline"
          >
            {otherLocale.toUpperCase()}
          </Button>
        </div>
      </div>
    </header>
  );
}
