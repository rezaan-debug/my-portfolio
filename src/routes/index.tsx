import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { ArrowRight, Github, Linkedin, MapPin } from "lucide-react";
import { PageShell, Container } from "@/components/PageShell";
import { ProfilePhoto } from "@/components/ProfilePhoto";
import { about, hero, profile } from "@/lib/portfolio";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      {
        title: "Rezaan Achmat Fredericks — Full-Stack Developer | UI/UX Designer",
      },
      {
        name: "description",
        content:
          "Portfolio of Rezaan Achmat Fredericks, a Full-Stack Developer and UI/UX Designer in Cape Town building scalable, user-focused digital platforms powered by APIs, microservices and AI.",
      },
      {
        property: "og:title",
        content: "Rezaan Achmat Fredericks — Full-Stack Developer | UI/UX Designer",
      },
      {
        property: "og:description",
        content:
          "Full-stack developer with a design edge, creating responsive web apps, developer tools, and data-driven systems powered by APIs, microservices, and AI.",
      },
      { property: "og:url", content: "/" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
    links: [{ rel: "canonical", href: "/" }],
    scripts: [
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Person",
          name: profile.name,
          jobTitle: profile.title,
          email: `mailto:${profile.email}`,
          url: profile.portfolioUrl,
          address: {
            "@type": "PostalAddress",
            addressLocality: "Cape Town",
            addressCountry: "ZA",
          },
          sameAs: [profile.github, profile.linkedin],
          knowsAbout: [
            ...about.approach,
          ],
        }),
      },
      {
        type: "application/ld+json",
        children: JSON.stringify({
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: "Rezaan Achmat Fredericks — Portfolio",
          url: profile.portfolioUrl,
        }),
      },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <PageShell>
      <Container>
        <section className="flex flex-col-reverse items-center gap-10 pt-36 pb-16 md:flex-row md:items-center md:justify-between md:gap-14 md:pt-48 md:pb-24">
          <div className="max-w-2xl text-center md:text-left">
            <p className="mb-4 inline-flex items-center gap-1.5 rounded-full border border-border/60 bg-card/50 px-3.5 py-1.5 text-xs font-medium text-muted-foreground backdrop-blur">
              <MapPin className="h-3.5 w-3.5 text-teal dark:text-teal" aria-hidden="true" />
              {profile.location} · Open to opportunities
            </p>
            <h1 className="font-display text-4xl font-bold leading-[1.12] tracking-tight sm:text-5xl lg:text-[3.4rem]">
              Hi, I'm Rezaan Achmat — a{" "}
              <span className="text-gradient-brand">Full-Stack Developer</span>{" "}
              | UI/UX Designer.
            </h1>
            <p className="mt-6 text-lg font-medium leading-relaxed sm:text-xl">
              {hero.lines[0]}
            </p>
            <p className="mt-4 text-base leading-relaxed text-muted-foreground sm:text-lg">
              {hero.lines[1]}
            </p>
            <p className="mt-4 font-display text-base italic text-foreground/90 sm:text-lg">
              “{hero.lines[2]}”
            </p>

            <div className="mt-9 flex flex-wrap items-center justify-center gap-3 md:justify-start">
              <Link
                to="/projects"
                className="theme-transition inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3 font-display text-sm font-semibold text-primary-foreground transition-all hover:opacity-90 hover:shadow-lg hover:shadow-primary/25"
              >
                View My Projects
                <ArrowRight className="h-4 w-4" aria-hidden="true" />
              </Link>
              <Link
                to="/contact"
                className="theme-transition inline-flex items-center gap-2 rounded-full border border-border/70 bg-card/50 px-6 py-3 font-display text-sm font-semibold backdrop-blur transition-colors hover:border-primary/50 hover:text-primary"
              >
                Get In Touch
              </Link>
              <a
                href={profile.github}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="GitHub profile"
                className="theme-transition inline-flex h-11 w-11 items-center justify-center rounded-full border border-border/70 bg-card/50 backdrop-blur transition-colors hover:border-primary/50 hover:text-primary"
              >
                <Github className="h-[18px] w-[18px]" aria-hidden="true" />
              </a>
              <a
                href={profile.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="LinkedIn profile"
                className="theme-transition inline-flex h-11 w-11 items-center justify-center rounded-full border border-border/70 bg-card/50 backdrop-blur transition-colors hover:border-primary/50 hover:text-primary"
              >
                <Linkedin className="h-[18px] w-[18px]" aria-hidden="true" />
              </a>
            </div>
          </div>

          <div className="flex justify-center">
            <ProfilePhoto size={280} />
          </div>
        </section>

        {/* What I build — teaser */}
        <section aria-labelledby="home-building" className="pb-20">
          <h2 id="home-building" className="font-display text-sm font-semibold uppercase tracking-[0.25em] text-muted-foreground">
            What I Build
          </h2>
          <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {about.building.slice(0, 3).map((b) => (
              <div
                key={b.name}
                className="glass theme-transition p-5 text-sm font-medium leading-relaxed"
              >
                {b.name}
              </div>
            ))}
          </div>
          <div className="mt-8 text-center md:text-left">
            <Link
              to="/about"
              className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary transition-opacity hover:opacity-80"
            >
              Learn more about me
              <ArrowRight className="h-4 w-4" aria-hidden="true" />
            </Link>
          </div>
        </section>
      </Container>
    </PageShell>
  );
}
