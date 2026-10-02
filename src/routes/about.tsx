import { createFileRoute } from "@tanstack/react-router";
import { Link } from "@tanstack/react-router";
import { Quote, Sparkles } from "lucide-react";
import { PageShell, PageHeader, SectionHeading, Container } from "@/components/PageShell";
import { about } from "@/lib/portfolio";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Rezaan Achmat Fredericks" },
      {
        name: "description",
        content:
          "From graphic design to full-stack development — Rezaan Achmat Fredericks' journey, story and vision: building user-focused web applications at the intersection of design and development.",
      },
      { property: "og:title", content: "About — Rezaan Achmat Fredericks" },
      {
        property: "og:description",
        content:
          "From graphic design to full-stack development — building thoughtful digital experiences at the intersection of design and development.",
      },
      { property: "og:url", content: "/about" },
    ],
    links: [{ rel: "canonical", href: "/about" }],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <PageShell>
      <Container>
        <PageHeader
          eyebrow="About Me"
          title="Design-thinking. Developer-building."
          intro="I work at the intersection of design and development — creating digital experiences that are visually appealing and technically sound."
        />

        {/* My journey */}
        <section aria-labelledby="about-journey" className="pb-14">
          <div className="glass theme-transition p-6 sm:p-8">
            <h2 id="about-journey" className="font-display text-xl font-bold">
              My Journey
            </h2>
            <div className="mt-4 space-y-4 text-[15px] leading-relaxed text-foreground/90">
              <p>{about.summary}</p>
              <p>{about.summary2}</p>
              <p>{about.summary3}</p>
              <p>{about.summary4}</p>
              <p className="font-medium">{about.summary5}</p>
            </div>

            <h3 className="mt-8 font-display text-sm font-semibold uppercase tracking-[0.2em] text-muted-foreground">
              My Approach Combines
            </h3>
            <ul className="mt-4 flex flex-wrap gap-2" aria-label="Approach">
              {about.approach.map((a) => (
                <li
                  key={a}
                  className="rounded-full border border-border/60 bg-background/40 px-3.5 py-1.5 text-sm"
                >
                  {a}
                </li>
              ))}
            </ul>
          </div>
        </section>

        {/* My story */}
        <section aria-labelledby="about-story" className="pb-14">
          <SectionHeading eyebrow="My Story" title="I started as a designer." />
          <div className="glass theme-transition p-6 sm:p-8">
            <div className="space-y-4 text-[15px] leading-relaxed text-foreground/90">
              {about.story.map((para, i) => (
                <p key={i} className={i === 0 ? "font-display text-lg font-semibold" : ""}>
                  {para}
                </p>
              ))}
            </div>
          </div>
        </section>

        {/* Where I'm going */}
        <section aria-labelledby="about-vision" className="pb-14">
          <SectionHeading eyebrow="Where I'm Going" title="A future built with intention." />
          <div className="glass theme-transition p-6 sm:p-8">
            <div className="space-y-4 text-[15px] leading-relaxed text-foreground/90">
              {about.vision.map((para, i) => (
                <p key={i}>{para}</p>
              ))}
            </div>
          </div>
        </section>

        {/* What I build */}
        <section aria-labelledby="about-building" className="pb-14">
          <SectionHeading
            eyebrow="What I Build"
            title="The technology I'm excited about."
          />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {about.building.map((b) => (
              <div key={b.name} className="glass theme-transition flex items-start gap-3 p-5">
                <Sparkles className="mt-0.5 h-4 w-4 shrink-0 text-teal dark:text-teal" aria-hidden="true" />
                <span className="text-sm font-medium leading-relaxed">{b.name}</span>
              </div>
            ))}
          </div>
        </section>

        {/* What I Believe */}
        <section aria-labelledby="about-beliefs" className="pb-20">
          <SectionHeading eyebrow="What I Believe" title="Principles I build by." />
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
            {about.beliefs.map((belief) => (
              <figure key={belief} className="glass theme-transition flex gap-4 p-6">
                <Quote className="h-5 w-5 shrink-0 text-primary" aria-hidden="true" />
                <blockquote className="font-display text-[15px] font-medium leading-relaxed">
                  {belief}
                </blockquote>
              </figure>
            ))}
          </div>
          <p className="mt-6 max-w-2xl font-display text-lg italic leading-relaxed text-foreground/85">
            “{about.beliefsClosing}”
          </p>
          <div className="mt-10">
            <Link
              to="/skills"
              className="theme-transition inline-flex items-center rounded-full bg-primary px-6 py-3 font-display text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
            >
              See My Skills
            </Link>
          </div>
        </section>
      </Container>
    </PageShell>
  );
}
