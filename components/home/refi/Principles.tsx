import {
  Leaf,
  Stack,
  UsersThree,
  TreeStructure,
  Recycle,
} from "@phosphor-icons/react/dist/ssr";
import type { Icon } from "@phosphor-icons/react";
import { useTranslations } from "next-intl";
import { Reveal } from "./Reveal";

type Tone = "plain" | "tint" | "feature";

function cellClasses(tone: Tone) {
  if (tone === "feature")
    return "border-accent/25 bg-[radial-gradient(120%_140%_at_0%_0%,rgba(94,113,245,0.18),transparent_60%)]";
  if (tone === "tint") return "border-line-strong bg-bg-elev-2";
  return "border-line bg-bg-elev";
}

export function Principles() {
  const t = useTranslations("Home.principles");
  const items: { icon: Icon; title: string; body: string; span: string; tone: Tone }[] = [
    { icon: Leaf, title: t("ecologicalTitle"), body: t("ecologicalBody"), span: "md:col-span-4", tone: "feature" },
    { icon: Stack, title: t("holisticTitle"), body: t("holisticBody"), span: "md:col-span-2", tone: "tint" },
    { icon: UsersThree, title: t("equityTitle"), body: t("equityBody"), span: "md:col-span-2", tone: "plain" },
    { icon: TreeStructure, title: t("systemicTitle"), body: t("systemicBody"), span: "md:col-span-2", tone: "plain" },
    { icon: Recycle, title: t("circularTitle"), body: t("circularBody"), span: "md:col-span-2", tone: "plain" },
  ];

  return (
    <section id="principios" className="border-t border-line py-16 md:py-32">
      <div className="mx-auto max-w-[1400px] px-5 md:px-8">
        <Reveal>
          <p className="mb-5 text-xs uppercase tracking-[0.24em] text-accent">
            {t("eyebrow")}
          </p>
          <h2 className="max-w-3xl font-display text-4xl font-medium leading-[1.05] tracking-tight text-fg md:text-6xl">
            {t("title")}
          </h2>
        </Reveal>

        <div className="mt-12 grid grid-cols-1 gap-4 md:mt-16 md:grid-cols-6">
          {items.map((p, i) => {
            const Ico = p.icon;
            return (
              <Reveal key={p.title} delay={(i % 3) * 0.05} className={p.span}>
                <article
                  className={`flex h-full flex-col gap-4 rounded-[var(--radius-card)] border p-6 md:p-7 ${cellClasses(
                    p.tone,
                  )}`}
                >
                  <Ico size={26} weight="light" className="text-accent" />
                  <div>
                    <h3 className="font-display text-xl text-fg md:text-[1.4rem]">
                      {p.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-fg-muted md:text-[0.95rem]">
                      {p.body}
                    </p>
                  </div>
                </article>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
}
