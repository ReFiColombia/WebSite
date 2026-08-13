import { useTranslations } from "next-intl";
import { Reveal } from "./Reveal";
import { SocialIcon } from "./SocialIcon";
import { NODES } from "@/lib/links";

export function Nodes() {
  const t = useTranslations("Home.nodes");
  return (
    <section id="nodos" className="border-t border-line py-16 md:py-32">
      <div className="mx-auto max-w-[1400px] px-5 md:px-8">
        <Reveal>
          <p className="mb-5 text-xs uppercase tracking-[0.24em] text-accent">
            {t("eyebrow")}
          </p>
          <h2 className="max-w-3xl font-display text-4xl font-medium leading-[1.05] tracking-tight text-fg md:text-6xl">
            {t("title1")}{" "}
            <span className="text-aurora italic">{t("titleAccent")}</span>
          </h2>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-fg-muted">
            {t("lead")}
          </p>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-5 sm:grid-cols-2 md:mt-20 lg:grid-cols-3">
          {NODES.map((node, i) => (
            <Reveal key={node.name} delay={(i % 3) * 0.08}>
              <div className="flex h-full flex-col rounded-[var(--radius-card)] border border-line bg-bg-elev p-7 transition-colors duration-300 hover:border-line-strong">
                <div className="rule-aurora mb-6 w-10 rounded-full" />
                <h3 className="font-display text-2xl text-fg">{node.name}</h3>
                <p className="mt-1 text-sm text-fg-faint">{node.region}</p>
                <div className="mt-6 flex flex-wrap gap-2">
                  {node.links.map((l) => (
                    <a
                      key={l.href}
                      href={l.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={`${node.name} - ${l.label}`}
                      className="inline-flex items-center gap-1.5 rounded-full border border-line px-3 py-1.5 text-sm text-fg-muted transition-colors duration-200 hover:border-accent/50 hover:text-fg"
                    >
                      <SocialIcon kind={l.kind} size={16} />
                      {l.label}
                    </a>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
