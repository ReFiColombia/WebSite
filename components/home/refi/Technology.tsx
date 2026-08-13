import {
  Eye,
  Code,
  GlobeHemisphereWest,
  Scales,
} from "@phosphor-icons/react/dist/ssr";
import type { Icon } from "@phosphor-icons/react";
import { useTranslations } from "next-intl";
import { Reveal } from "./Reveal";

export function Technology() {
  const t = useTranslations("Home.tech");
  const features: { icon: Icon; title: string; body: string }[] = [
    { icon: Eye, title: t("transparencyTitle"), body: t("transparencyBody") },
    { icon: Code, title: t("programmableTitle"), body: t("programmableBody") },
    { icon: GlobeHemisphereWest, title: t("realTitle"), body: t("realBody") },
    { icon: Scales, title: t("accessTitle"), body: t("accessBody") },
  ];
  const useCases = [t("uc1"), t("uc2"), t("uc3"), t("uc4"), t("uc5"), t("uc6")];

  return (
    <section id="tecnologia" className="border-t border-line py-16 md:py-32">
      <div className="mx-auto grid max-w-[1400px] gap-12 px-5 md:grid-cols-[0.9fr_1.1fr] md:gap-16 md:px-8">
        <Reveal>
          <div className="md:sticky md:top-28">
            <h2 className="font-display text-4xl font-medium leading-[1.05] tracking-tight text-fg md:text-6xl">
              {t("title")}
            </h2>
            <p className="mt-6 max-w-md text-lg leading-relaxed text-fg-muted">
              {t("lead")}
            </p>

            <p className="mt-8 text-xs uppercase tracking-[0.24em] text-fg-faint">
              {t("useCasesLabel")}
            </p>
            <div className="mt-4 flex flex-wrap gap-2">
              {useCases.map((u) => (
                <span
                  key={u}
                  className="rounded-full border border-line px-3.5 py-1.5 text-sm text-fg-muted"
                >
                  {u}
                </span>
              ))}
            </div>
          </div>
        </Reveal>

        <ul className="divide-y divide-line border-t border-line">
          {features.map((f, i) => {
            const Ico = f.icon;
            return (
              <Reveal key={f.title} delay={i * 0.06}>
                <li className="flex gap-5 py-7">
                  <Ico size={26} weight="light" className="mt-0.5 shrink-0 text-accent" />
                  <div>
                    <h3 className="font-display text-xl text-fg md:text-2xl">
                      {f.title}
                    </h3>
                    <p className="mt-2 text-base leading-relaxed text-fg-muted">
                      {f.body}
                    </p>
                  </div>
                </li>
              </Reveal>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
