import { Github, Linkedin, Mail } from "lucide-react";
import { footer, profile } from "@/lib/portfolio";
import footerArt from "@/assets/footer-art-neon.png.asset.json";
import { BrandLogo } from "@/components/BrandLogo";

export function Footer() {
  return (
    <footer className="relative z-10 mt-8 bg-background">
      <div className="w-full">
        <img
          src={footerArt.url}
          alt="Rezaan Achmat Fredericks — Design, Develop, Deliver. © 2026 Rezaan Achmat Fredericks. All Rights Reserved. Built with passion, precision, purpose, and a commitment to exceptional digital craftsmanship. Designed & Developed by Rezaan Achmat Fredericks."
          className="hidden h-auto w-full sm:block"
          loading="lazy"
        />
        <div className="relative isolate overflow-hidden bg-footer-surface px-6 py-10 text-footer-foreground sm:hidden">
          <div className="absolute inset-0 -z-10 bg-footer-surface" />
          <div className="mb-5"><BrandLogo size={64} /></div>
          <p className="font-display text-base font-semibold">{footer.copyright}</p>
          <p className="mt-5 text-sm italic leading-relaxed">{footer.craft}</p>
          <p className="mt-5 text-sm font-medium">{footer.credit}</p>
        </div>
        <div className="flex items-center justify-center gap-4 bg-footer-surface px-4 py-3 text-footer-foreground sm:justify-start sm:pl-8">
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
                   className="theme-transition inline-flex h-10 w-10 items-center justify-center rounded-full border border-footer-foreground/30 text-footer-foreground transition-colors duration-300 hover:border-gold hover:text-gold"
                >
                  <Icon className="h-[18px] w-[18px]" aria-hidden="true" />
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
