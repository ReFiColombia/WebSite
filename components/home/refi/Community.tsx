import { ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { useTranslations } from "next-intl";
import { Reveal } from "./Reveal";
import { JOIN_URL, TELEGRAM_URL } from "@/lib/links";

export function Community() {
  const t = useTranslations("Home.community");
  return (
    <section
      id="comunidad"
      className="mesh-aurora border-t border-line py-20 md:py-40"
    >
      <div className="mx-auto max-w-[1400px] px-5 text-center md:px-8">
        <Reveal>
          <h2 className="mx-auto max-w-3xl font-display text-4xl font-medium leading-[1.04] tracking-tight text-fg md:text-7xl">
            {t("title1")} <span className="text-aurora italic">{t("titleAccent")}</span>{" "}
            {t("title2")}
          </h2>
          <p className="mx-auto mt-7 max-w-xl text-lg leading-relaxed text-fg-muted">
            {t("lead")}
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <a
              href={TELEGRAM_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-aurora group inline-flex items-center gap-2 rounded-full px-8 py-4 text-base font-medium transition-transform duration-200 active:scale-[0.97]"
            >
              {t("join")}
              <ArrowRight
                size={18}
                weight="bold"
                className="transition-transform duration-200 group-hover:translate-x-0.5"
              />
            </a>
            <a
              href={JOIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-line-strong px-8 py-4 text-base text-fg transition-colors duration-200 hover:border-fg-muted"
            >
              {t("calendar")}
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  );
}
