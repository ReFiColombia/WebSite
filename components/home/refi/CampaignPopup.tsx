"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { X, ArrowUpRight, HeartStraight } from "@phosphor-icons/react";
import { useLocale } from "next-intl";
import { CAMPAIGN_URL } from "@/lib/links";

const STORAGE_KEY = "refi-campaign-terremoto-2026-08";

type Lang = "es" | "en";

const COPY: Record<Lang, {
  badge: string;
  title: string;
  body: string;
  donate: string;
  dismiss: string;
}> = {
  es: {
    badge: "Emergencia · Terremoto",
    title: "Ayuda a Colombia tras el terremoto",
    body: "El 10 de agosto de 2026 un terremoto de magnitud 7.4 golpeó a Colombia. ReFi Colombia recibe y administra las donaciones onchain en USDC o USDT sobre cinco redes, y cada aporte es verificable públicamente.",
    donate: "Donar ahora",
    dismiss: "Ahora no",
  },
  en: {
    badge: "Emergency · Earthquake",
    title: "Help Colombia after the earthquake",
    body: "On August 10, 2026 a magnitude 7.4 earthquake struck Colombia. ReFi Colombia receives and manages donations onchain in USDC or USDT across five networks, and every contribution is publicly verifiable.",
    donate: "Donate now",
    dismiss: "Not now",
  },
};

export function CampaignPopup() {
  const pageLocale = useLocale();
  const [lang, setLang] = useState<Lang>(pageLocale === "en" ? "en" : "es");
  const [open, setOpen] = useState(false);
  const reduce = useReducedMotion();
  const c = COPY[lang];

  useEffect(() => {
    if (typeof window === "undefined") return;
    if (window.sessionStorage.getItem(STORAGE_KEY) === "dismissed") return;
    const timer = window.setTimeout(() => setOpen(true), 1100);
    return () => window.clearTimeout(timer);
  }, []);

  const dismiss = () => {
    setOpen(false);
    try {
      window.sessionStorage.setItem(STORAGE_KEY, "dismissed");
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
            aria-label={c.dismiss}
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

            <div className="relative h-40 w-full overflow-hidden sm:h-44">
              <Image
                src="/brand/campaign.jpg"
                alt="DonaOnchain - We stand with Colombia"
                fill
                sizes="(max-width: 640px) 100vw, 512px"
                className="object-cover"
                priority
              />
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-bg-elev via-transparent to-transparent" />
            </div>

            <div className="absolute right-4 top-4 flex items-center gap-2 rounded-full bg-bg/50 p-1 backdrop-blur-sm">
              <div className="inline-flex items-center rounded-full border border-line p-0.5">
                {(["es", "en"] as Lang[]).map((l) => (
                  <button
                    key={l}
                    type="button"
                    onClick={() => setLang(l)}
                    aria-pressed={lang === l}
                    className={`rounded-full px-2 py-0.5 text-[11px] font-semibold uppercase tracking-wide transition-colors duration-200 ${
                      lang === l
                        ? "bg-bg-elev-2 text-fg"
                        : "text-fg-faint hover:text-fg-muted"
                    }`}
                  >
                    {l}
                  </button>
                ))}
              </div>
              <button
                type="button"
                onClick={dismiss}
                aria-label={c.dismiss}
                className="flex h-9 w-9 items-center justify-center rounded-full border border-line text-fg-muted transition-colors hover:text-fg"
              >
                <X size={18} />
              </button>
            </div>

            <div className="p-7 pt-6 md:p-9 md:pt-7">
              <div className="flex items-center gap-3">
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
                  {c.badge}
                </span>
              </div>

              <h2 className="mt-6 font-display text-3xl font-medium leading-[1.08] tracking-tight text-fg md:text-4xl">
                {c.title}
              </h2>

              <p className="mt-4 text-base leading-relaxed text-fg-muted">
                {c.body}
              </p>

              <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:items-center">
                <a
                  href={CAMPAIGN_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={dismiss}
                  className="btn-aurora group inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-base font-medium"
                >
                  {c.donate}
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
                  {c.dismiss}
                </button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
