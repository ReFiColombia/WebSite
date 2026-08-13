import Image from "next/image";
import { useTranslations } from "next-intl";
import { Reveal } from "./Reveal";

export function WhatIsRefi() {
  const t = useTranslations("Home.what");
  const stages = [
    { k: "01", name: t("extractiveName"), body: t("extractiveBody") },
    { k: "02", name: t("sustainableName"), body: t("sustainableBody") },
    { k: "03", name: t("regenerativeName"), body: t("regenerativeBody") },
  ];

  return (
    <section id="que-es" className="border-t border-line py-16 md:py-32">
      <div className="mx-auto max-w-[1400px] px-5 md:px-8">
        <Reveal>
          <h2 className="max-w-3xl font-display text-4xl font-medium leading-[1.05] tracking-tight text-fg md:text-6xl">
            {t("title")}
          </h2>
          <p className="mt-8 max-w-2xl text-xl leading-relaxed text-fg md:text-2xl">
            {t("lead")}
          </p>
        </Reveal>

        <Reveal delay={0.05}>
          <div className="relative mt-12 aspect-[16/7] overflow-hidden rounded-[var(--radius-card)] md:mt-16">
            <Image
              src="/brand/cocora.jpg"
              alt="Valle de Cocora, Andes colombianos"
              fill
              sizes="(max-width: 1400px) 100vw, 1400px"
              className="duotone object-cover"
            />
            <div
              className="absolute inset-0"
              style={{
                background:
                  "linear-gradient(120deg, rgba(14,18,32,0.78) 0%, rgba(14,18,32,0.34) 55%, rgba(94,113,245,0.28) 100%)",
              }}
            />
          </div>
        </Reveal>

        <div className="mt-14 md:mt-20">
          <Reveal>
            <h3 className="font-display text-2xl text-fg md:text-3xl">
              {t("spectrumTitle")}{" "}
              <span className="text-aurora italic">{t("spectrumAccent")}</span>
            </h3>
          </Reveal>
          <div className="mt-8 grid grid-cols-1 gap-x-10 gap-y-6 sm:grid-cols-3">
            {stages.map((s, i) => (
              <Reveal key={s.k} delay={i * 0.06}>
                <div className="flex flex-col">
                  <span className="font-display text-sm text-fg-faint">{s.k}</span>
                  <h4
                    className={`mt-2 font-display text-xl ${
                      i === 2 ? "text-brand-lavender" : "text-fg"
                    }`}
                  >
                    {s.name}
                  </h4>
                  <p className="mt-2 text-base leading-relaxed text-fg-muted">
                    {s.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
