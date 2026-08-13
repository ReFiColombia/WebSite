import { unstable_setRequestLocale } from "next-intl/server";
import { Hero } from "@/components/home/refi/Hero";
import { WhatIsRefi } from "@/components/home/refi/WhatIsRefi";
import { Principles } from "@/components/home/refi/Principles";
import { Technology } from "@/components/home/refi/Technology";
import { Nodes } from "@/components/home/refi/Nodes";
import { Transparency } from "@/components/home/refi/Transparency";
import { Community } from "@/components/home/refi/Community";
import { Footer } from "@/components/home/refi/Footer";
import { CampaignPopup } from "@/components/home/refi/CampaignPopup";

export default function Home({
  params: { locale },
}: {
  params: { locale: string };
}) {
  unstable_setRequestLocale(locale);
  return (
    <main>
      <Hero />
      <WhatIsRefi />
      <Principles />
      <Technology />
      <Nodes />
      <Transparency />
      <Community />
      <Footer />
      <CampaignPopup />
    </main>
  );
}
