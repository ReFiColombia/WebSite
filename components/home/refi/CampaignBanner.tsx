"use client";

import { Warning, ArrowRight } from "@phosphor-icons/react";
import { useTranslations } from "next-intl";
import { CAMPAIGN_URL } from "@/lib/links";

function Segment({ text, cta }: { text: string; cta: string }) {
  return (
    <span className="mx-6 inline-flex items-center gap-2 whitespace-nowrap">
      <Warning size={15} weight="fill" className="shrink-0" />
      {text}
      <span className="px-1 opacity-50">·</span>
      <span className="inline-flex items-center gap-1 font-semibold underline-offset-2">
        {cta}
        <ArrowRight size={13} weight="bold" />
      </span>
    </span>
  );
}

export function CampaignBanner() {
  const t = useTranslations("Home.campaign");
  const text = t("bannerText");
  const cta = t("donate");
  const group = Array.from({ length: 8 });

  return (
    <a
      href={CAMPAIGN_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={`${text} - ${cta}`}
      className="marquee-viewport fixed inset-x-0 top-0 z-[60] flex h-10 items-center overflow-hidden text-xs font-medium text-white sm:text-sm"
      style={{ background: "var(--gradient-cta)" }}
    >
      <div className="marquee-track" aria-hidden>
        {group.map((_, i) => (
          <Segment key={`a${i}`} text={text} cta={cta} />
        ))}
        {group.map((_, i) => (
          <Segment key={`b${i}`} text={text} cta={cta} />
        ))}
      </div>
    </a>
  );
}
