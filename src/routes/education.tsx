import { createFileRoute } from "@tanstack/react-router";
import { GraduationCap } from "lucide-react";
import { PageShell, PageHeader, Container } from "@/components/PageShell";
import { education } from "@/lib/portfolio";

export const Route = createFileRoute("/education")({
  head: () => ({
    meta: [
      { title: "Education — Rezaan Achmat Fredericks" },
      {
        name: "description",
        content:
          "Education and qualifications: National Diploma in ICT (Applications Development) at CPUT, Capaciti Tech Career Accelerator, FNB App Academy and NQF 4 Project Management certification.",
      },
      { property: "og:title", content: "Education — Rezaan Achmat Fredericks" },
      {
        property: "og:description",
        content:
          "ICT diploma, accelerator training and project management certification — Rezaan Achmat Fredericks' education.",
      },
      { property: "og:url", content: "/education" },
    ],
    links: [{ rel: "canonical", href: "/education" }],
  }),
  component: EducationPage,
});

function EducationPage() {
  return (
    <PageShell>
      <Container>
        <PageHeader
          eyebrow="Education"
          title="Learning that compounds."
          intro="Formal study, structured programs and certifications."
        />

        <section aria-label="Education and qualifications" className="pb-20">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            {education.map((item) => (
              <article key={item.title} className="glass theme-transition flex items-start gap-4 p-6">
                <span
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary"
                  aria-hidden="true"
                >
                  <GraduationCap className="h-5 w-5" />
                </span>
                <div>
                  <h2 className="font-display text-base font-bold tracking-tight sm:text-lg">
                    {item.title}
                  </h2>
                  <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
                    {item.institution}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </section>
      </Container>
    </PageShell>
  );
}
