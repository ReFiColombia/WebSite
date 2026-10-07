import { unstable_setRequestLocale } from "next-intl/server";
import { CampaignHero } from "@/components/home/refi/CampaignHero";
import { Hero } from "@/components/home/refi/Hero";
import { WhatIsRefi } from "@/components/home/refi/WhatIsRefi";
import { Principles } from "@/components/home/refi/Principles";
import { Technology } from "@/components/home/refi/Technology";
import { Nodes } from "@/components/home/refi/Nodes";
import { Transparency } from "@/components/home/refi/Transparency";
import { Governance } from "@/components/home/refi/Governance";
import { Team } from "@/components/home/refi/Team";
import { Community } from "@/components/home/refi/Community";
import { Footer } from "@/components/home/refi/Footer";
import { getSubsidyStats } from "@/lib/subsidyStats";
import { CampaignPopup } from "@/components/home/refi/CampaignPopup";

// Rebuild the page hourly so the subsidy figures stay current.
export const revalidate = 3600;

export default async function Home({
  params: { locale },
}: {
  params: { locale: string };
}) {
  unstable_setRequestLocale(locale);
  const subsidyStats = await getSubsidyStats();
  return (
    <main>
      <CampaignHero />
      <Hero />
      <WhatIsRefi />
      <Principles />
      <Technology />
      <Nodes />
      <Transparency stats={subsidyStats} />
      <Governance />
      <Team />
      <Community />
      <Footer />
      <CampaignPopup />
    </main>
  );
}
