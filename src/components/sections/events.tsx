"use client";

import { useTranslations } from "next-intl";

import {
  ScrollPortraitWall,
  type PortraitItem,
} from "@/components/ui/scroll-portrait-wall";
import { events } from "@/lib/data/events";

export function EventsSection() {
  const t = useTranslations("Events");

  const items: PortraitItem[] = events.map((event) => ({
    id: event.id,
    src: event.image,
    title: t(`items.${event.id}.title`),
    subtitle: t(`items.${event.id}.subtitle`),
    description: t(`items.${event.id}.description`),
  }));

  return (
    <div id="eventos">
      <ScrollPortraitWall
        heading={t("heading")}
        subheading={t("subheading")}
        hint={t("hint")}
        items={items}
        columns={2}
      />
    </div>
  );
}
