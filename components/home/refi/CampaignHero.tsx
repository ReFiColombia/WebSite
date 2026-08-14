import Image from "next/image";
import { Warning, ArrowUpRight, ArrowRight } from "@phosphor-icons/react/dist/ssr";
import { useTranslations } from "next-intl";
import { CAMPAIGN_URL } from "@/lib/links";

export function CampaignHero() {
  const t = useTranslations("Home.campaign");
  return (
    <section
      id="emergencia"
      className="mesh-aurora border-b border-line pt-28 pb-14 md:pt-32 md:pb-20"
    >
      <div className="mx-auto grid max-w-[1400px] items-center gap-10 px-5 md:grid-cols-2 md:gap-14 md:px-8">
        <div>
          <p className="inline-flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-aurora">
            <Warning size={15} weight="fill" />
            {t("eyebrow")}
          </p>
          <h2 className="mt-5 font-display text-4xl font-medium leading-[1.05] tracking-tight text-fg md:text-5xl">
            {t("title")}
          </h2>
          <p className="mt-5 max-w-xl text-base leading-relaxed text-fg-muted md:text-lg">
            {t("trust")}
          </p>
          <div className="mt-8 flex flex-wrap items-center gap-4">
            <a
              href={CAMPAIGN_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-aurora group inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-base font-medium transition-transform duration-200 active:scale-[0.97]"
            >
              {t("donate")}
              <ArrowUpRight
                size={18}
                weight="bold"
                className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
              />
            </a>
            <a
              href="#transparencia"
              className="group inline-flex items-center gap-1.5 text-base text-fg-muted transition-colors hover:text-fg"
            >
              {t("learnMore")}
              <ArrowRight
                size={16}
                weight="bold"
                className="transition-transform duration-200 group-hover:translate-x-0.5"
              />
            </a>
          </div>
        </div>

        <div className="relative aspect-[900/473] overflow-hidden rounded-[var(--radius-card)] border border-line-strong">
          <Image
            src="/brand/campaign.jpg"
            alt="DonaOnchain - We stand with Colombia"
            fill
            sizes="(max-width: 768px) 100vw, 640px"
            className="object-cover"
            priority
          />
        </div>
      </div>
    </section>
  );
}
