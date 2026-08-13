import { ArrowUpRight } from "@phosphor-icons/react/dist/ssr";
import { useTranslations } from "next-intl";
import { Reveal } from "./Reveal";
import {
  REPORTS,
  SUBSIDY_STATS,
  SUBSIDIES_APP_URL,
  DUNE_DASHBOARD_URL,
} from "@/lib/links";

export function Transparency() {
  const t = useTranslations("Home.transparency");
  const stats = [
    { value: SUBSIDY_STATS.distributed, unit: SUBSIDY_STATS.token, label: t("statDistributed") },
    { value: SUBSIDY_STATS.fundsAdded, unit: SUBSIDY_STATS.token, label: t("statFunds") },
    { value: String(SUBSIDY_STATS.recipients), unit: "", label: t("statRecipients") },
  ];

  return (
    <section id="transparencia" className="border-t border-line py-16 md:py-32">
      <div className="mx-auto max-w-[1400px] px-5 md:px-8">
        <Reveal>
          <p className="mb-5 text-xs uppercase tracking-[0.24em] text-accent">
            {t("eyebrow")}
          </p>
          <h2 className="max-w-3xl font-display text-4xl font-medium leading-[1.05] tracking-tight text-fg md:text-6xl">
            {t("title1")} <span className="text-aurora italic">{t("titleAccent")}</span>{" "}
            {t("title2")}
          </h2>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-fg-muted">
            {t("lead")}
          </p>
        </Reveal>

        <Reveal delay={0.05}>
          <div className="mt-14 overflow-hidden rounded-[var(--radius-card)] border border-line bg-bg-elev">
            <div className="rule-aurora" style={{ opacity: 1 }} />
            <div className="p-8 md:p-10">
              <div className="flex flex-wrap items-baseline justify-between gap-4">
                <h3 className="font-display text-2xl text-fg md:text-3xl">
                  {t("programTitle")}
                </h3>
                <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm">
                  <a
                    href={SUBSIDIES_APP_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-accent transition-colors hover:text-fg"
                  >
                    {t("openApp")}
                    <ArrowUpRight size={15} weight="bold" />
                  </a>
                  <a
                    href={DUNE_DASHBOARD_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-fg-muted transition-colors hover:text-fg"
                  >
                    {t("viewDune")}
                    <ArrowUpRight size={15} weight="bold" />
                  </a>
                </div>
              </div>

              <div className="mt-8 grid grid-cols-1 gap-8 sm:grid-cols-3">
                {stats.map((s) => (
                  <div key={s.label}>
                    <div className="font-display text-4xl font-medium tracking-tight text-fg md:text-5xl">
                      {s.value}
                      {s.unit && (
                        <span className="ml-1.5 align-middle text-lg text-fg-faint md:text-xl">
                          {s.unit}
                        </span>
                      )}
                    </div>
                    <p className="mt-2 text-sm leading-relaxed text-fg-muted">
                      {s.label}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Reveal>

        <div className="mt-5 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {REPORTS.map((r, i) => (
            <Reveal key={r.href} delay={(i % 3) * 0.06}>
              <a
                href={r.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group flex h-full items-start justify-between gap-4 rounded-[var(--radius-card)] border border-line bg-bg-elev p-6 transition-colors duration-200 hover:border-accent/50"
              >
                <div>
                  <div className="font-display text-xl text-fg">{r.label}</div>
                  <p className="mt-1 text-sm leading-relaxed text-fg-muted">
                    {r.note}
                  </p>
                </div>
                <ArrowUpRight
                  size={20}
                  weight="bold"
                  className="shrink-0 text-fg-faint transition-all duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 group-hover:text-accent"
                />
              </a>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
