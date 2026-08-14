import Image from "next/image";
import {
  XLogo,
  LinkedinLogo,
  TelegramLogo,
} from "@phosphor-icons/react/dist/ssr";
import type { Icon } from "@phosphor-icons/react";
import { useLocale } from "next-intl";
import { Reveal } from "./Reveal";

type Social = { icon: Icon; href: string; label: string };
type Member = {
  name: string;
  photo: string;
  roleEs: string;
  roleEn: string;
  socials: Social[];
};

const MEMBERS: Member[] = [
  {
    name: "0xj4an",
    photo: "/team/juan.webp",
    roleEs: "Líder",
    roleEn: "Lead",
    socials: [
      { icon: XLogo, href: "https://x.com/JuanJGiraldoC", label: "X" },
      { icon: LinkedinLogo, href: "https://www.linkedin.com/in/juancamp1987/", label: "LinkedIn" },
    ],
  },
  {
    name: "Tereza Bízková",
    photo: "/team/tereza.webp",
    roleEs: "Asesoría",
    roleEn: "Advisory",
    socials: [
      { icon: XLogo, href: "https://x.com/TerezaBizkova", label: "X" },
      { icon: LinkedinLogo, href: "https://www.linkedin.com/in/tereza-bizkova/", label: "LinkedIn" },
    ],
  },
  {
    name: "Ximena Monclou",
    photo: "/team/ximena.webp",
    roleEs: "Legal",
    roleEn: "Legal",
    socials: [
      { icon: XLogo, href: "https://x.com/ximemonclou", label: "X" },
      { icon: LinkedinLogo, href: "https://www.linkedin.com/in/ximenamonclou/", label: "LinkedIn" },
    ],
  },
  {
    name: "0xflypeztic",
    photo: "/team/flypeztic.webp",
    roleEs: "Marca y redes",
    roleEn: "Brand & social",
    socials: [
      { icon: XLogo, href: "https://x.com/0xflypeztic", label: "X" },
      { icon: TelegramLogo, href: "https://t.me/xflypeztic", label: "Telegram" },
    ],
  },
];

export function Team() {
  const locale = useLocale();
  const isEs = locale === "es";

  return (
    <section id="equipo" className="border-t border-line py-16 md:py-32">
      <div className="mx-auto max-w-[1400px] px-5 md:px-8">
        <Reveal>
          <p className="mb-5 text-xs uppercase tracking-[0.24em] text-accent">
            {isEs ? "Equipo" : "Team"}
          </p>
          <h2 className="max-w-3xl font-display text-4xl font-medium leading-[1.05] tracking-tight text-fg md:text-6xl">
            {isEs
              ? "Las personas detrás de la respuesta"
              : "The people behind the response"}
          </h2>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-fg-muted">
            {isEs
              ? "El equipo core que coordina la respuesta al terremoto y administra los fondos."
              : "The core team coordinating the earthquake response and managing the funds."}
          </p>
        </Reveal>

        <div className="mt-14 grid grid-cols-2 gap-5 sm:gap-6 md:mt-20 lg:grid-cols-4">
          {MEMBERS.map((m, i) => (
            <Reveal key={m.name} delay={(i % 4) * 0.06}>
              <div className="flex h-full flex-col rounded-[var(--radius-card)] border border-line bg-bg-elev p-5 transition-colors duration-300 hover:border-line-strong">
                <div className="relative aspect-square w-full overflow-hidden rounded-[calc(var(--radius-card)-6px)]">
                  <Image
                    src={m.photo}
                    alt={m.name}
                    fill
                    sizes="(max-width: 1024px) 45vw, 320px"
                    className="object-cover"
                  />
                </div>
                <h3 className="mt-5 font-display text-xl text-fg">{m.name}</h3>
                <p className="mt-1 text-sm text-fg-faint">
                  {isEs ? m.roleEs : m.roleEn}
                </p>
                <div className="mt-4 flex gap-2">
                  {m.socials.map((s) => {
                    const Ico = s.icon;
                    return (
                      <a
                        key={s.href}
                        href={s.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`${m.name} - ${s.label}`}
                        className="flex h-9 w-9 items-center justify-center rounded-full border border-line text-fg-muted transition-colors duration-200 hover:border-accent/50 hover:text-fg"
                      >
                        <Ico size={17} />
                      </a>
                    );
                  })}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  );
}
