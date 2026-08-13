// Verified from the official ReFi Colombia Linktrees (linktr.ee/reficolombia
// and the per-node pages). Single source of truth for outbound links.

export const CAMPAIGN_URL = "https://dona.reficolombia.org";
export const JOIN_URL = "https://luma.com/reficolombiapublic";
export const SUBSIDIES_APP_URL = "https://subsidios.reficolombia.org";
export const DUNE_DASHBOARD_URL = "https://dune.com/reficolombia/refi-colombia";

// Onchain figures from the ReFi Colombia Subsidies dashboard on Dune
// (Celo SubsidyProgram contract). Verifiable at DUNE_DASHBOARD_URL.
export const SUBSIDY_STATS = {
  distributed: "23.5M",
  fundsAdded: "36.1M",
  recipients: 78,
  token: "COPm",
};

// Public transparency and grant reports.
export const REPORTS: { label: string; note: string; href: string }[] = [
  { label: "Dune", note: "Datos onchain del programa de subsidios", href: DUNE_DASHBOARD_URL },
  { label: "Karma GAP", note: "Grants, hitos y actualizaciones", href: "https://www.karmahq.xyz/project/refi-colombia-1/" },
  { label: "Giveth", note: "Donaciones verificadas", href: "https://giveth.io/project/refi-colombia" },
];

export type SocialKind =
  | "instagram"
  | "x"
  | "telegram"
  | "whatsapp"
  | "luma"
  | "linktree"
  | "web";

export type SocialLink = { kind: SocialKind; label: string; href: string };

export const SOCIALS: SocialLink[] = [
  { kind: "instagram", label: "Instagram", href: "https://instagram.com/reficolombia" },
  { kind: "x", label: "X", href: "https://x.com/reficolombia" },
  { kind: "telegram", label: "Telegram", href: "https://t.me/reficolombia" },
  { kind: "whatsapp", label: "WhatsApp", href: "https://chat.whatsapp.com/Ge0VObOCjJULDp793lVpxQ" },
  { kind: "luma", label: "Luma", href: JOIN_URL },
  { kind: "linktree", label: "Linktree", href: "https://linktr.ee/reficolombia" },
];

export type Node = {
  name: string;
  region: string;
  links: SocialLink[];
};

export const NODES: Node[] = [
  {
    name: "ReFi Medellín",
    region: "Antioquia",
    links: [
      { kind: "web", label: "Web", href: "https://refimedellin.org" },
      { kind: "instagram", label: "Instagram", href: "https://instagram.com/refimedellin" },
      { kind: "x", label: "X", href: "https://x.com/refimedellin" },
      { kind: "linktree", label: "Linktree", href: "https://linktr.ee/refimedellin" },
    ],
  },
  {
    name: "ReFi Bogotá",
    region: "Cundinamarca",
    links: [
      { kind: "instagram", label: "Instagram", href: "https://instagram.com/refibogota" },
      { kind: "x", label: "X", href: "https://x.com/refibogota" },
      { kind: "linktree", label: "Linktree", href: "https://linktr.ee/refibogota" },
    ],
  },
  {
    name: "ReFi Cartagena",
    region: "Bolívar",
    links: [
      { kind: "web", label: "Web", href: "https://reficartagena.org" },
      { kind: "instagram", label: "Instagram", href: "https://instagram.com/reficartagena" },
      { kind: "x", label: "X", href: "https://x.com/reficartagena" },
      { kind: "linktree", label: "Linktree", href: "https://linktr.ee/reficartagena" },
    ],
  },
  {
    name: "ReFi Amazonas",
    region: "Amazonas",
    links: [
      { kind: "instagram", label: "Instagram", href: "https://instagram.com/refiamazonas" },
      { kind: "x", label: "X", href: "https://x.com/refiamazonas" },
      { kind: "linktree", label: "Linktree", href: "https://linktr.ee/refiamazonas" },
    ],
  },
  {
    name: "ReFi Atlántico",
    region: "Atlántico",
    links: [
      { kind: "instagram", label: "Instagram", href: "https://instagram.com/refiatlantico" },
      { kind: "x", label: "X", href: "https://x.com/refiatlantico" },
      { kind: "linktree", label: "Linktree", href: "https://linktr.ee/refiatlantico" },
    ],
  },
];
