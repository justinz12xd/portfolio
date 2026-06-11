import { useTranslations } from "next-intl";

export function Footer() {
  const t = useTranslations("Contact");

  return (
    <footer className="border-t border-border/50">
      <div className="container flex h-14 items-center justify-center text-sm text-muted-foreground">
        {t("footer")}
      </div>
    </footer>
  );
}
