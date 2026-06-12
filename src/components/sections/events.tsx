"use client";

import { useTranslations } from "next-intl";

import { GradientHeading } from "@/components/ui/gradient-heading";
import { ThreeDPhotoCarousel } from "@/components/ui/three-d-carousel";
import { events } from "@/lib/data/events";

export function EventsSection() {
  const t = useTranslations("Events");

  const images = events.map((event) => ({
    src: event.image,
    alt: t(`items.${event.id}.title`),
  }));

  return (
    <section className="container py-16 sm:py-24" id="eventos">
      <GradientHeading size="lg">{t("heading")}</GradientHeading>
      <p className="mt-3 max-w-2xl text-pretty text-muted-foreground">
        {t("subheading")}
      </p>

      <div className="mt-10">
        <ThreeDPhotoCarousel images={images} />
      </div>
    </section>
  );
}
