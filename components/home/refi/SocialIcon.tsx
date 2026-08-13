import {
  InstagramLogo,
  XLogo,
  TelegramLogo,
  WhatsappLogo,
  LinktreeLogo,
  Globe,
  CalendarBlank,
} from "@phosphor-icons/react/dist/ssr";
import type { SocialKind } from "@/lib/links";

const ICONS: Record<SocialKind, typeof InstagramLogo> = {
  instagram: InstagramLogo,
  x: XLogo,
  telegram: TelegramLogo,
  whatsapp: WhatsappLogo,
  luma: CalendarBlank,
  linktree: LinktreeLogo,
  web: Globe,
};

export function SocialIcon({
  kind,
  size = 18,
  weight = "regular",
}: {
  kind: SocialKind;
  size?: number;
  weight?: "regular" | "bold" | "fill" | "light";
}) {
  const Icon = ICONS[kind];
  return <Icon size={size} weight={weight} />;
}
