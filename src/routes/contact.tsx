import { createFileRoute } from "@tanstack/react-router";
import { ExternalLink, Github, Linkedin, Mail, MapPin } from "lucide-react";
import { PageShell, PageHeader, Container } from "@/components/PageShell";
import { profile } from "@/lib/portfolio";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact — Rezaan Achmat Fredericks" },
      {
        name: "description",
        content:
          "Get in touch with Rezaan Achmat Fredericks — open to frontend, full-stack and UI/UX opportunities, freelance work and collaborations. Based in Cape Town, South Africa.",
      },
      { property: "og:title", content: "Contact — Rezaan Achmat Fredericks" },
      {
        property: "og:description",
        content:
          "Open to frontend, full-stack and UI/UX opportunities, freelance work and collaborations — based in Cape Town.",
      },
      { property: "og:url", content: "/contact" },
    ],
    links: [{ rel: "canonical", href: "/contact" }],
  }),
  component: ContactPage,
});

function ContactPage() {
  const channels = [
    {
      label: "Email",
      value: profile.email,
      href: `mailto:${profile.email}`,
      Icon: Mail,
      external: false,
    },
    {
      label: "GitHub",
      value: "github.com/Rezaan91",
      href: profile.github,
      Icon: Github,
      external: true,
    },
    {
      label: "LinkedIn",
      value: "linkedin.com/in/rezaan-achmat-59050774",
      href: profile.linkedin,
      Icon: Linkedin,
      external: true,
    },
    {
      label: "Portfolio",
      value: "rezaan-achmat-portfolio.lovable.app",
      href: profile.portfolioUrl,
      Icon: ExternalLink,
      external: true,
    },
  ];

  return (
    <PageShell>
      <Container>
        <PageHeader
          eyebrow="Contact"
          title="Let's build something together."
          intro="I'm open to new opportunities, freelance work and collaborations — or just a good conversation about design and development."
        />

        <section aria-label="Contact details" className="pb-20">
          <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
            {channels.map(({ label, value, href, Icon, external }) => (
              <a
                key={label}
                href={href}
                target={external ? "_blank" : undefined}
                rel={external ? "noopener noreferrer" : undefined}
                className="glass theme-transition group flex items-center gap-4 p-6 transition-transform duration-300 hover:-translate-y-1"
              >
                <span
                  className="flex h-11 w-11 shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary"
                  aria-hidden="true"
                >
                  <Icon className="h-5 w-5" />
                </span>
                <span className="min-w-0">
                  <span className="block text-xs font-semibold uppercase tracking-widest text-muted-foreground">
                    {label}
                  </span>
                  <span className="block truncate text-[15px] font-medium group-hover:text-primary">
                    {value}
                  </span>
                </span>
              </a>
            ))}
          </div>

          <div className="glass theme-transition mt-8 flex flex-col gap-3 p-6 sm:flex-row sm:items-center sm:justify-between">
            <p className="flex items-center gap-2 text-[15px]">
              <MapPin className="h-4 w-4 text-teal dark:text-teal" aria-hidden="true" />
              {profile.location}
            </p>
            <p className="text-sm text-muted-foreground">{profile.opportunities}</p>
          </div>
        </section>
      </Container>
    </PageShell>
  );
}
