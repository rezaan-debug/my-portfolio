import { Github, Linkedin, Mail } from "lucide-react";
import { footer, profile } from "@/lib/portfolio";
import footerArt from "@/assets/footer-art.png.asset.json";

export function Footer() {
  return (
    <footer className="relative z-10 mt-8 bg-background">
      <div className="mx-auto max-w-6xl">
        <img
          src={footerArt.url}
          alt="Rezaan Achmat Fredericks — Design, Develop, Deliver. © 2026 Rezaan Achmat Fredericks. All Rights Reserved. Built with passion, precision, purpose, and a commitment to exceptional digital craftsmanship. Designed & Developed by Rezaan Achmat Fredericks."
          className="block h-auto w-full"
          loading="lazy"
        />
        <div className="flex items-center justify-center gap-4 px-4 py-4 sm:justify-end">
          <ul className="flex items-center gap-3" aria-label="Footer social links">
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
                   className="theme-transition inline-flex h-10 w-10 items-center justify-center rounded-full border border-border/60 text-foreground transition-colors duration-300 hover:border-primary/50 hover:text-primary"
                >
                  <Icon className="h-[18px] w-[18px]" aria-hidden="true" />
                </a>
              </li>
            ))}
          </ul>
        </div>
        <p className="px-4 pb-5 text-center text-xs text-muted-foreground sm:hidden">{footer.copyright}</p>
      </div>
    </footer>
  );
}
