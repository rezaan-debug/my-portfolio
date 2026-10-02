import { createFileRoute } from "@tanstack/react-router";
import { Briefcase } from "lucide-react";
import { PageShell, PageHeader, Container } from "@/components/PageShell";
import { experience } from "@/lib/portfolio";

export const Route = createFileRoute("/experience")({
  head: () => ({
    meta: [
      { title: "Experience — Rezaan Achmat Fredericks" },
      {
        name: "description",
        content:
          "Professional experience of Rezaan Achmat Fredericks: Founder and Full-Stack Developer at Ubuntu Mzansi Tech, Capaciti Tech Career Accelerator participant, and IT Support background.",
      },
      { property: "og:title", content: "Experience — Rezaan Achmat Fredericks" },
      {
        property: "og:description",
        content:
          "Founder / Full-Stack Developer at Ubuntu Mzansi Tech, Capaciti accelerator participant, and IT Support experience.",
      },
      { property: "og:url", content: "/experience" },
    ],
    links: [{ rel: "canonical", href: "/experience" }],
  }),
  component: ExperiencePage,
});

function ExperiencePage() {
  return (
    <PageShell>
      <Container>
        <PageHeader
          eyebrow="Experience"
          title="My journey so far."
          intro="The roles and milestones that shaped how I build."
        />

        <section aria-label="Professional experience timeline" className="pb-20">
          <ol className="relative ml-3 border-l border-border/70 pl-8 sm:ml-6">
            {experience.map((role) => (
              <li key={role.role} className="relative pb-12 last:pb-20">
                {/* Timeline node */}
                <span
                  className="theme-transition absolute -left-[41px] top-1 flex h-6 w-6 items-center justify-center rounded-full border border-border/70 bg-background"
                  aria-hidden="true"
                >
                  <span className="h-2.5 w-2.5 rounded-full bg-gradient-to-r from-teal to-primary" />
                </span>
                <article className="glass theme-transition p-6">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <h2 className="font-display text-lg font-bold tracking-tight sm:text-xl">
                      {role.role}
                    </h2>
                    <span className="rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold text-primary">
                      {role.period}
                    </span>
                  </div>
                  <p className="mt-1 flex items-center gap-2 text-sm font-medium text-teal dark:text-teal">
                    <Briefcase className="h-3.5 w-3.5" aria-hidden="true" />
                    {role.organization}
                  </p>
                  <p className="mt-3 text-[15px] leading-relaxed text-foreground/85">
                    {role.description}
                  </p>
                </article>
              </li>
            ))}
          </ol>
        </section>
      </Container>
    </PageShell>
  );
}
