import {
  ShieldCheck,
  ArrowUpRight,
  Certificate,
  Receipt,
  Percent,
} from "@phosphor-icons/react/dist/ssr";
import { useLocale } from "next-intl";
import { Reveal } from "./Reveal";
import { CAMPAIGN_URL } from "@/lib/links";

const OPERATIONAL = "0xB41C38818a18b736867D9640f0B191b7890Da136";
const EMERGENCY = "0x8c5F869e1a5A39F378612d69c32E84d0114ab7C5";
const scan = (a: string) => `https://celoscan.io/address/${a}`;

const SIGNERS: { name: string; address: string }[] = [
  { name: "reficolombia.eth", address: "0xBE42B3f0BA9f7c8e4b6c219BE55566c88CEfC581" },
  { name: "ReFi Medellín", address: "0x302E2A0D4291ac14Aa1160504cA45A0A1F2E7a5c" },
  { name: "ReFi Cartagena", address: "0x4bf9c4fb5efb2f4c7f6074a45161cab440c01b59" },
  { name: "ReFi Amazonas", address: "0xae10cf86a4fd76e971571fe55c09c476de895597" },
  { name: "Ximena Monclou", address: "0x0ce522CAD66Fa4D6529B2Db76E0A91D53296D58b" },
];

export function Governance() {
  const locale = useLocale();
  const isEs = locale === "es";

  const t = {
    eyebrow: isEs ? "Debida diligencia" : "Due diligence",
    title: isEs ? "Cómo se gobiernan los fondos" : "How the funds are governed",
    lead: isEs
      ? "Las donaciones se reciben en una wallet en Celo controlada por un multisig 3 de 5, firmado por representantes de los nodos regionales de ReFi Colombia. Nadie puede mover fondos en solitario: se requieren al menos tres firmas."
      : "Donations are received in a wallet on Celo controlled by a 3 of 5 multisig, signed by representatives of ReFi Colombia's regional nodes. No one can move funds alone: at least three signatures are required.",
    emergencyTitle: isEs ? "Wallet de emergencias" : "Emergency wallet",
    emergencyDesc: isEs
      ? "Recibe las donaciones del terremoto. Su único controlador es el multisig operativo (3 de 5), así que cada salida exige tres firmas."
      : "Receives the earthquake donations. Its only controller is the operational multisig (3 of 5), so every outflow requires three signatures.",
    opTitle: isEs ? "Multisig operativo (3 de 5)" : "Operational multisig (3 of 5)",
    signers: isEs ? "Firmantes" : "Signers",
    view: isEs ? "Ver en Celoscan" : "View on Celoscan",
    legalTitle: isEs ? "Figura legal" : "Legal standing",
    legalBody: isEs
      ? "ReFi Colombia Foundation, registrada en Próspera ZEDE (Honduras)."
      : "ReFi Colombia Foundation, registered in Próspera ZEDE (Honduras).",
    reportsTitle: isEs ? "Reportes" : "Reporting",
    reportsBody: isEs
      ? "Cada transferencia se publica en la página de donaciones: a qué fundación va, el monto y el enlace a la transacción. Todas las entradas y salidas son verificables onchain."
      : "Every transfer is published on the donations page: which foundation receives it, the amount and the transaction link. All inflows and outflows are verifiable onchain.",
    reportsLink: isEs ? "Ver reportes" : "See reports",
    feesTitle: isEs ? "Comisión" : "Fees",
    feesBody: isEs
      ? "0% para ReFi Colombia. El 100% de las donaciones llega a la emergencia."
      : "0% for ReFi Colombia. 100% of donations reach the emergency.",
  };

  return (
    <section id="gobernanza" className="border-t border-line py-16 md:py-32">
      <div className="mx-auto max-w-[1400px] px-5 md:px-8">
        <Reveal>
          <p className="mb-5 inline-flex items-center gap-2 text-xs uppercase tracking-[0.24em] text-accent">
            <ShieldCheck size={15} weight="fill" />
            {t.eyebrow}
          </p>
          <h2 className="max-w-3xl font-display text-4xl font-medium leading-[1.05] tracking-tight text-fg md:text-6xl">
            {t.title}
          </h2>
          <p className="mt-6 max-w-2xl text-lg leading-relaxed text-fg-muted">
            {t.lead}
          </p>
        </Reveal>

        <div className="mt-14 grid grid-cols-1 gap-5 lg:grid-cols-2">
          <Reveal className="order-2">
            <div className="flex h-full flex-col rounded-[var(--radius-card)] border border-line bg-bg-elev p-7">
              <div className="rule-aurora mb-6 w-10 rounded-full" />
              <h3 className="font-display text-2xl text-fg">{t.emergencyTitle}</h3>
              <p className="mt-3 text-base leading-relaxed text-fg-muted">
                {t.emergencyDesc}
              </p>
              <a
                href={scan(EMERGENCY)}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-5 inline-flex items-center gap-1.5 break-all font-mono text-sm text-accent transition-colors hover:text-fg"
              >
                {EMERGENCY}
                <ArrowUpRight size={14} weight="bold" className="shrink-0" />
              </a>
            </div>
          </Reveal>

          <Reveal delay={0.06} className="order-1">
            <div className="flex h-full flex-col rounded-[var(--radius-card)] border border-line bg-bg-elev p-7">
              <div className="rule-aurora mb-6 w-10 rounded-full" />
              <h3 className="font-display text-2xl text-fg">{t.opTitle}</h3>
              <a
                href={scan(OPERATIONAL)}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-flex items-center gap-1.5 break-all font-mono text-sm text-accent transition-colors hover:text-fg"
              >
                {OPERATIONAL}
                <ArrowUpRight size={14} weight="bold" className="shrink-0" />
              </a>

              <p className="mt-6 text-xs uppercase tracking-[0.18em] text-fg-faint">
                {t.signers}
              </p>
              <ul className="mt-3 space-y-2.5">
                {SIGNERS.map((s) => (
                  <li key={s.address}>
                    <a
                      href={scan(s.address)}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="group block"
                    >
                      <span className="text-sm font-medium text-fg group-hover:text-accent">
                        {s.name}
                      </span>
                      <span className="block break-all font-mono text-xs text-fg-faint">
                        {s.address}
                      </span>
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </Reveal>
        </div>

        <div className="mt-5 grid grid-cols-1 gap-5 md:grid-cols-3">
          <Reveal delay={0.1}>
            <div className="flex h-full flex-col rounded-[var(--radius-card)] border border-line bg-bg-elev p-6">
              <Certificate size={24} weight="light" className="text-accent" />
              <p className="mt-4 text-xs uppercase tracking-[0.18em] text-fg-faint">
                {t.legalTitle}
              </p>
              <p className="mt-1.5 text-sm leading-relaxed text-fg">{t.legalBody}</p>
            </div>
          </Reveal>

          <Reveal delay={0.14}>
            <div className="flex h-full flex-col rounded-[var(--radius-card)] border border-line bg-bg-elev p-6">
              <Receipt size={24} weight="light" className="text-accent" />
              <p className="mt-4 text-xs uppercase tracking-[0.18em] text-fg-faint">
                {t.reportsTitle}
              </p>
              <p className="mt-1.5 text-sm leading-relaxed text-fg-muted">
                {t.reportsBody}
              </p>
              <a
                href={CAMPAIGN_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-flex items-center gap-1 text-sm text-accent transition-colors hover:text-fg"
              >
                {t.reportsLink}
                <ArrowUpRight size={14} weight="bold" />
              </a>
            </div>
          </Reveal>

          <Reveal delay={0.18}>
            <div className="flex h-full flex-col rounded-[var(--radius-card)] border border-line bg-bg-elev p-6">
              <Percent size={24} weight="light" className="text-accent" />
              <p className="mt-4 text-xs uppercase tracking-[0.18em] text-fg-faint">
                {t.feesTitle}
              </p>
              <p className="mt-1.5 text-sm leading-relaxed text-fg">{t.feesBody}</p>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
