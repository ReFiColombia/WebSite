"use client";

import { Warning, ArrowRight } from "@phosphor-icons/react";
import { useTranslations } from "next-intl";
import { CAMPAIGN_URL } from "@/lib/links";

export function CampaignBanner() {
  const t = useTranslations("Home.campaign");
  return (
    <a
      href={CAMPAIGN_URL}
      target="_blank"
      rel="noopener noreferrer"
      className="group fixed inset-x-0 top-0 z-[60] flex h-10 items-center justify-center gap-2 px-4 text-center text-xs font-medium text-white sm:text-sm"
      style={{ background: "var(--gradient-cta)" }}
    >
      <Warning size={15} weight="fill" className="shrink-0" />
      <span className="hidden sm:inline">{t("bannerText")}</span>
      <span className="sm:hidden">{t("bannerShort")}</span>
      <span className="mx-1 hidden opacity-60 sm:inline">·</span>
      <span className="inline-flex items-center gap-1 underline-offset-2 group-hover:underline">
        {t("donate")}
        <ArrowRight
          size={13}
          weight="bold"
          className="transition-transform duration-200 group-hover:translate-x-0.5"
        />
      </span>
    </a>
  );
}
