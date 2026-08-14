"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useLocale } from "next-intl";

const LOCALES = ["es", "en"] as const;

export function LanguageToggle({ onNavigate }: { onNavigate?: () => void }) {
  const locale = useLocale();
  const pathname = usePathname() || `/${locale}`;

  const pathFor = (l: string) => pathname.replace(/^\/(es|en)/, `/${l}`);

  return (
    <div className="inline-flex items-center rounded-full border border-line p-0.5">
      {LOCALES.map((l) => {
        const active = l === locale;
        return (
          <Link
            key={l}
            href={pathFor(l)}
            onClick={onNavigate}
            aria-current={active ? "true" : undefined}
            className={`rounded-full px-2.5 py-1 text-xs font-semibold uppercase tracking-wide transition-colors duration-200 ${
              active
                ? "bg-bg-elev-2 text-fg"
                : "text-fg-faint hover:text-fg-muted"
            }`}
          >
            {l}
          </Link>
        );
      })}
    </div>
  );
}
