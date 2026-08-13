"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { X, ArrowUpRight, HeartStraight } from "@phosphor-icons/react";
import { useTranslations } from "next-intl";
import { CAMPAIGN_URL } from "@/lib/links";

const STORAGE_KEY = "refi-campaign-terremoto-2026-08";

export function CampaignPopup() {
  const t = useTranslations("Home.campaign");
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.localStorage.getItem(STORAGE_KEY) === "dismissed") return;
    const timer = window.setTimeout(() => setOpen(true), 1100);
    return () => window.clearTimeout(timer);
  }, []);

  const dismiss = () => {
    setOpen(false);
    try {
      window.localStorage.setItem(STORAGE_KEY, "dismissed");
    } catch {
      // storage unavailable - closing for the session is enough
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[70] flex items-end justify-center p-4 sm:items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.25 }}
        >
          <button
            type="button"
            aria-label={t("dismiss")}
            onClick={dismiss}
            className="absolute inset-0 bg-bg/70 backdrop-blur-sm"
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            className="relative w-full max-w-lg overflow-hidden rounded-[var(--radius-card)] border border-line-strong bg-bg-elev"
            initial={reduce ? false : { opacity: 0, y: 24, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={reduce ? { opacity: 0 } : { opacity: 0, y: 24, scale: 0.98 }}
            transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="rule-aurora" style={{ opacity: 1 }} />

            <button
              type="button"
              onClick={dismiss}
              aria-label={t("dismiss")}
              className="absolute right-4 top-5 flex h-9 w-9 items-center justify-center rounded-full border border-line text-fg-muted transition-colors hover:text-fg"
            >
              <X size={18} />
            </button>

            <div className="p-7 md:p-9">
              <div className="flex items-center gap-3 pr-12">
                <Image
                  src="/brand/logo-circular.png"
                  alt=""
                  aria-hidden
                  width={44}
                  height={44}
                  className="h-11 w-11 shrink-0"
                />
                <span className="inline-flex items-center gap-1.5 text-xs font-medium uppercase tracking-[0.16em] text-aurora">
                  <HeartStraight size={14} weight="fill" className="shrink-0" />
                  {t("badge")}
                </span>
              </div>

              <h2 className="mt-6 font-display text-3xl font-medium leading-[1.08] tracking-tight text-fg md:text-4xl">
                {t("title")}
              </h2>

              <p className="mt-4 text-base leading-relaxed text-fg-muted">
                {t("body")}
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                <a
                  href={CAMPAIGN_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={dismiss}
                  className="btn-aurora group inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-base font-medium"
                >
                  {t("donate")}
                  <ArrowUpRight
                    size={18}
                    weight="bold"
                    className="transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                  />
                </a>
                <button
                  type="button"
                  onClick={dismiss}
                  className="rounded-full px-5 py-3.5 text-base text-fg-muted transition-colors hover:text-fg"
                >
                  {t("dismiss")}
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
