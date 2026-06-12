import Image from "next/image";
import { getTranslations } from "next-intl/server";

import { GithubIcon } from "@/components/icons";
import { Button } from "@/components/ui/button";
import { GradientHeading } from "@/components/ui/gradient-heading";
import { ScrollReveal } from "@/components/ui/scroll-reveal";

const GITHUB_USERNAME = "justinz12xd";

type GithubProfile = {
  name: string | null;
  login: string;
  bio: string | null;
  avatar_url: string;
  html_url: string;
  public_repos: number;
  followers: number;
  following: number;
};

async function getGithubProfile(): Promise<GithubProfile | null> {
  try {
    const res = await fetch(
      `https://api.github.com/users/${GITHUB_USERNAME}`,
      { next: { revalidate: 3600 } }
    );

    if (!res.ok) {
      return null;
    }

    return res.json();
  } catch {
    return null;
  }
}

export async function GithubSection() {
  const t = await getTranslations("Github");
  const profile = await getGithubProfile();

  if (!profile) {
    return null;
  }

  const stats = [
    { label: t("stats.repos"), value: profile.public_repos },
    { label: t("stats.followers"), value: profile.followers },
    { label: t("stats.following"), value: profile.following },
  ];

  return (
    <section className="container py-16 sm:py-24" id="github">
      <ScrollReveal className="max-w-3xl">
        <GradientHeading size="lg">{t("heading")}</GradientHeading>
        <p className="mt-3 max-w-2xl text-pretty text-muted-foreground">
          {t("subheading")}
        </p>
      </ScrollReveal>

      <ScrollReveal delay={0.08}>
        <article className="mt-12 overflow-hidden rounded-[2rem] border border-border/70 bg-card/70 p-5 shadow-[0_24px_90px_-60px_rgba(15,23,42,0.55)] backdrop-blur sm:p-8">
          <div className="flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4">
              <Image
                alt={profile.name ?? profile.login}
                className="rounded-full ring-2 ring-primary/20"
                height={64}
                src={profile.avatar_url}
                width={64}
              />

              <div>
                <h3 className="text-lg font-semibold tracking-tight">
                  {profile.name ?? profile.login}
                </h3>
                <p className="font-mono text-sm text-muted-foreground">
                  @{profile.login}
                </p>
                {profile.bio ? (
                  <p className="mt-1 text-sm text-foreground/80">
                    {profile.bio}
                  </p>
                ) : null}
              </div>
            </div>

            <div className="flex items-center gap-5">
              <dl className="flex items-center gap-4">
                {stats.map((stat) => (
                  <div className="text-center" key={stat.label}>
                    <dd className="text-lg font-semibold tracking-tight">
                      {stat.value}
                    </dd>
                    <dt className="text-xs text-muted-foreground uppercase tracking-[0.1em]">
                      {stat.label}
                    </dt>
                  </div>
                ))}
              </dl>

              <Button
                nativeButton={false}
                render={
                  <a
                    href={profile.html_url}
                    rel="noopener noreferrer"
                    target="_blank"
                  />
                }
                variant="outline"
              >
                <GithubIcon className="size-4" />
                {t("viewProfile")}
              </Button>
            </div>
          </div>

          <div className="mt-8 overflow-x-auto rounded-xl border border-border/60 bg-white p-4">
            <img
              alt={t("contributionsAlt")}
              className="h-auto min-w-[640px] w-full"
              src={`https://ghchart.rshah.org/10b981/${GITHUB_USERNAME}`}
            />
          </div>
        </article>
      </ScrollReveal>
    </section>
  );
}
