import { createFileRoute } from "@tanstack/react-router";
import { PageShell, PageHeader, Container } from "@/components/PageShell";
import { skills } from "@/lib/portfolio";

export const Route = createFileRoute("/skills")({
  head: () => ({
    meta: [
      { title: "Skills — Rezaan Achmat Fredericks" },
      {
        name: "description",
        content:
          "Technologies and tools Rezaan works with: React, TypeScript, Node.js, Express, MongoDB, SQL, REST APIs, Figma, UI/UX design, microservices and AI integration.",
      },
      { property: "og:title", content: "Skills — Rezaan Achmat Fredericks" },
      {
        property: "og:description",
        content:
          "Frontend, backend, tools and design skills — React, TypeScript, Node.js, MongoDB, REST APIs, Figma and more.",
      },
      { property: "og:url", content: "/skills" },
    ],
    links: [{ rel: "canonical", href: "/skills" }],
  }),
  component: SkillsPage,
});

const GROUPS: Array<{ key: keyof typeof skills; label: string }> = [
  { key: "frontend", label: "Frontend" },
  { key: "backend", label: "Backend" },
  { key: "tools", label: "Tools" },
  { key: "other", label: "Other" },
];

function SkillsPage() {
  return (
    <PageShell>
      <Container>
        <PageHeader
          eyebrow="Skills"
          title="Technologies I work with."
          intro="The stack behind my projects — kept honest, with no inflated ratings. These are the technologies I genuinely use."
        />

        <section aria-label="Skill groups" className="grid grid-cols-1 gap-6 pb-20 md:grid-cols-2">
          {GROUPS.map((group) => (
            <div key={group.key} className="glass theme-transition p-6 sm:p-8">
              <h2 className="font-display text-lg font-bold">{group.label}</h2>
              <div className="mt-3 h-0.5 w-10 rounded-full bg-gradient-to-r from-teal to-primary" aria-hidden="true" />
              <ul className="mt-5 flex flex-wrap gap-2.5">
                {skills[group.key].map((skill) => (
                  <li
                    key={skill}
                    className="theme-transition rounded-full border border-border/60 bg-background/40 px-4 py-2 text-sm font-medium transition-colors duration-300 hover:border-primary/50 hover:text-primary"
                  >
                    {skill}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </section>
      </Container>
    </PageShell>
  );
}
