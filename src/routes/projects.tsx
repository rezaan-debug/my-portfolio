import { createFileRoute } from "@tanstack/react-router";
import { ExternalLink, Github, Star } from "lucide-react";
import { PageShell, PageHeader, SectionHeading, Container } from "@/components/PageShell";
import { projects, type Project } from "@/lib/portfolio";
import bgPages from "@/assets/bg-pages.jpg";

export const Route = createFileRoute("/projects")({
  head: () => ({
    meta: [
      { title: "Projects — Rezaan Achmat Fredericks" },
      {
        name: "description",
        content:
          "Projects by Rezaan Achmat Fredericks, including TrackSuite — an IT asset monitoring platform — plus transit, sentiment analysis, AI fairness and talent management applications.",
      },
      { property: "og:title", content: "Projects — Rezaan Achmat Fredericks" },
      {
        property: "og:description",
        content:
          "Web apps, developer tools and data-driven systems — including TrackSuite, an IT asset monitoring platform.",
      },
      { property: "og:url", content: "/projects" },
    ],
    links: [{ rel: "canonical", href: "/projects" }],
  }),
  component: ProjectsPage,
});

function TechPills({ tech }: { tech: string[] }) {
  return (
    <ul className="flex flex-wrap gap-2" aria-label="Technologies used">
      {tech.map((t) => (
        <li
          key={t}
          className="rounded-full border border-border/60 bg-background/40 px-3 py-1 text-xs font-medium text-muted-foreground"
        >
          {t}
        </li>
      ))}
    </ul>
  );
}

function ProjectLinks({ project }: { project: Project }) {
  return (
    <div className="mt-5 flex flex-wrap gap-2.5">
      {project.github && (
        <a
          href={project.github}
          target="_blank"
          rel="noopener noreferrer"
          className="theme-transition inline-flex items-center gap-2 rounded-full border border-border/70 bg-background/40 px-4 py-2 text-sm font-medium transition-colors hover:border-primary/50 hover:text-primary"
        >
          <Github className="h-4 w-4" aria-hidden="true" />
          GitHub
        </a>
      )}
      {project.demo && (
        <a
          href={project.demo}
          target="_blank"
          rel="noopener noreferrer"
          className="theme-transition inline-flex items-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-semibold text-primary-foreground transition-opacity hover:opacity-90"
        >
          <ExternalLink className="h-4 w-4" aria-hidden="true" />
          Live Demo
        </a>
      )}
    </div>
  );
}

function ProjectsPage() {
  const featured = projects.find((p) => p.featured);
  const others = projects.filter((p) => !p.featured);

  return (
    <PageShell image={bgPages} imagePosition="center">
      <Container>
        <PageHeader
          eyebrow="Projects"
          title="Things I've built."
          intro="A selection of applications and tools I've created — each one focused on solving a real problem."
        />

        {/* Featured project */}
        {featured && (
          <section aria-labelledby="featured-project" className="pb-16">
            <SectionHeading eyebrow="Featured Project" title="" />
            <article className="glass theme-transition relative overflow-hidden p-6 sm:p-9">
              <div
                className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-teal via-primary to-gold"
                aria-hidden="true"
              />
              <p
                id="featured-project"
                className="inline-flex items-center gap-1.5 rounded-full bg-primary/10 px-3 py-1 text-xs font-semibold uppercase tracking-widest text-primary"
              >
                <Star className="h-3.5 w-3.5" aria-hidden="true" />
                Featured Project
              </p>
              <h3 className="mt-4 font-display text-2xl font-bold tracking-tight sm:text-3xl">
                {featured.name}
              </h3>
              <p className="mt-3 max-w-3xl text-[15px] leading-relaxed text-foreground/90">
                {featured.description}
              </p>
              <div className="mt-5">
                <TechPills tech={featured.technology} />
              </div>
              <ProjectLinks project={featured} />
            </article>
          </section>
        )}

        {/* Other projects */}
        <section aria-label="Other projects" className="pb-20">
          <SectionHeading eyebrow="More Work" title="Other projects." />
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            {others.map((project) => (
              <article
                key={project.name}
                className="glass theme-transition flex flex-col p-6 transition-transform duration-300 hover:-translate-y-1"
              >
                <h3 className="font-display text-lg font-bold tracking-tight">
                  {project.name}
                </h3>
                <p className="mt-2.5 flex-1 text-sm leading-relaxed text-foreground/85">
                  {project.description}
                </p>
                <div className="mt-4">
                  <TechPills tech={project.technology} />
                </div>
                {project.github && (
                  <div className="mt-4">
                    <a
                      href={project.github}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 text-sm font-semibold text-primary transition-opacity hover:opacity-80"
                    >
                      <Github className="h-4 w-4" aria-hidden="true" />
                      View on GitHub
                    </a>
                  </div>
                )}
              </article>
            ))}
          </div>
        </section>
      </Container>
    </PageShell>
  );
}
