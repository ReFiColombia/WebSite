import type { Metadata } from "next";
import Client from "./client";

// Wallet-gated panel: keep it out of search results.
export const metadata: Metadata = { robots: { index: false, follow: false } };

export const dynamic = "force-dynamic";

export default function Page() {
  return <Client />;
}
