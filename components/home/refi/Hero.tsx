"use client";

import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowRight } from "@phosphor-icons/react";
import { useTranslations } from "next-intl";
import { JOIN_URL } from "@/lib/links";

export function Hero() {
  const t = useTranslations("Home.hero");
  const reduce = useReducedMotion();
  const rise = (delay: number) => ({
    initial: reduce ? false : { opacity: 0, y: 24 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.8, delay, ease: [0.16, 1, 0.3, 1] as const },
  });

  return (
    <section
      id="top"
      className="mesh-aurora relative flex min-h-[100dvh] items-center overflow-hidden"
    >
      <div className="pointer-events-none absolute -right-24 top-1/2 hidden w-[52vw] max-w-[720px] -translate-y-1/2 opacity-[0.16] md:block">
        <Image
          src="/brand/logo-circular.png"
          alt=""
          aria-hidden
          width={720}
          height={720}
          priority
        />
      </div>

      <div className="relative mx-auto w-full max-w-[1400px] px-5 pt-28 pb-20 md:px-8">
        <div className="max-w-3xl">
          <motion.p
            {...rise(0)}
            className="mb-7 text-xs uppercase tracking-[0.24em] text-accent"
          >
            {t("eyebrow")}
          </motion.p>

          <motion.h1
            {...rise(0.08)}
            className="font-display text-[13vw] font-medium leading-[0.98] tracking-tight text-fg sm:text-6xl md:text-7xl lg:text-[5.4rem]"
          >
            {t("title1")}{" "}
            <span className="text-aurora inline-block pb-1 italic leading-[1.1]">
              {t("titleAccent")}
            </span>{" "}
            {t("title2")}
          </motion.h1>

          <motion.p
            {...rise(0.16)}
            className="mt-7 max-w-xl text-lg leading-relaxed text-fg-muted"
          >
            {t("subtitle")}
          </motion.p>

          <motion.div {...rise(0.24)} className="mt-10 flex flex-wrap items-center gap-4">
            <a
              href={JOIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-aurora group inline-flex items-center gap-2 rounded-full px-7 py-3.5 text-base font-medium transition-transform duration-200 active:scale-[0.97]"
            >
              {t("join")}
              <ArrowRight
                size={18}
                weight="bold"
                className="transition-transform duration-200 group-hover:translate-x-0.5"
              />
            </a>
            <a
              href="#que-es"
              className="inline-flex items-center gap-2 rounded-full border border-line-strong px-7 py-3.5 text-base text-fg transition-colors duration-200 hover:border-fg-muted"
            >
              {t("learn")}
            </a>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
