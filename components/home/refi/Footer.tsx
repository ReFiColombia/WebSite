import Image from "next/image";
import { useLocale } from "next-intl";
import { SocialIcon } from "./SocialIcon";
import { SOCIALS, CAMPAIGN_URL } from "@/lib/links";

const LINKS = [
  { es: "Qué es ReFi", en: "What is ReFi", href: "#que-es" },
  { es: "Principios", en: "Principles", href: "#principios" },
  { es: "Tecnología", en: "Technology", href: "#tecnologia" },
  { es: "Nodos", en: "Nodes", href: "#nodos" },
  { es: "Transparencia", en: "Transparency", href: "#transparencia" },
];

export function Footer() {
  const locale = useLocale();
  const isEs = locale === "es";
  const tagline = isEs
    ? "Comunidad nacional de finanzas regenerativas. Del extraer al regenerar."
    : "National regenerative finance community. From extracting to regenerating.";

  return (
    <footer className="border-t border-line py-14">
      <div className="mx-auto max-w-[1400px] px-5 md:px-8">
        <div className="flex flex-col gap-10 md:flex-row md:items-start md:justify-between">
          <div className="max-w-sm">
            <Image
              src="/refi-colombia-logo.png"
              alt="ReFi Colombia"
              width={160}
              height={160}
              className="h-11 w-auto"
            />
            <p className="mt-5 text-sm leading-relaxed text-fg-muted">{tagline}</p>

            <div className="mt-6 flex flex-wrap gap-2.5">
              {SOCIALS.map((s) => (
                <a
                  key={s.href}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`ReFi Colombia - ${s.label}`}
                  className="flex h-10 w-10 items-center justify-center rounded-full border border-line text-fg-muted transition-colors duration-200 hover:border-accent/50 hover:text-fg"
                >
                  <SocialIcon kind={s.kind} size={18} />
                </a>
              ))}
            </div>
          </div>

          <nav className="flex flex-wrap gap-x-8 gap-y-3 md:justify-end">
            {LINKS.map((l) => (
              <a
                key={l.href}
                href={l.href}
                className="text-sm text-fg-muted transition-colors hover:text-fg"
              >
                {isEs ? l.es : l.en}
              </a>
            ))}
            <a
              href={CAMPAIGN_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-aurora text-sm font-medium"
            >
              {isEs ? "Donar" : "Donate"}
            </a>
          </nav>
        </div>

        <div className="mt-12 border-t border-line pt-6">
          <p className="text-xs text-fg-faint">
            ReFi Colombia. {isEs ? "Finanzas que regeneran a las personas y al planeta." : "Finance that regenerates people and the planet."}
          </p>
        </div>
      </div>
    </footer>
  );
}
