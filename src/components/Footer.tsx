import { Link } from "@tanstack/react-router";
import { Github, Linkedin, Mail, MapPin } from "lucide-react";
import { footer, profile } from "@/lib/portfolio";
import { BrandLogo } from "@/components/BrandLogo";

export function Footer() {
  return (
    <footer className="theme-transition relative z-10 mt-16 border-t border-border/50">
      <div className="mx-auto max-w-6xl px-4 py-10 sm:px-6">
        <div className="flex flex-col items-center gap-6 text-center">
          <Link to="/" aria-label="Back to home" className="shrink-0">
            <BrandLogo size={44} />
          </Link>
          <p className="max-w-xl text-sm leading-relaxed text-muted-foreground">
            {footer.craft}
          </p>
          <ul className="flex items-center gap-3" aria-label="Social links">
            {[
              { href: profile.github, label: "GitHub", Icon: Github },
              { href: profile.linkedin, label: "LinkedIn", Icon: Linkedin },
              { href: `mailto:${profile.email}`, label: "Email", Icon: Mail },
            ].map(({ href, label, Icon }) => (
              <li key={label}>
                <a
                  href={href}
                  target={href.startsWith("mailto") ? undefined : "_blank"}
                  rel={href.startsWith("mailto") ? undefined : "noopener noreferrer"}
                  aria-label={label}
                  className="theme-transition inline-flex h-10 w-10 items-center justify-center rounded-full border border-border/60 text-muted-foreground transition-colors duration-300 hover:border-primary/50 hover:text-primary"
                >
                  <Icon className="h-[18px] w-[18px]" aria-hidden="true" />
                </a>
              </li>
            ))}
          </ul>
          <p className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <MapPin className="h-3.5 w-3.5" aria-hidden="true" />
            {profile.location}
          </p>
          <p className="text-xs text-muted-foreground/80">{footer.copyright}</p>
        </div>
      </div>
    </footer>
  );
}
