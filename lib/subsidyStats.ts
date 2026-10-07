import { SUBSIDY_STATS } from "./links";

// Live figures for the subsidies program, read from the ReFi Colombia
// subgraph. The landing page shows these instead of numbers typed by hand.
export const SUBSIDIES_SUBGRAPH_URL =
  process.env.SUBSIDIES_SUBGRAPH_URL ||
  "https://api.studio.thegraph.com/query/1757108/refi-colombia-subsidies/version/latest";

export type SubsidyStats = {
  distributed: string;
  fundsAdded: string;
  recipients: number;
  token: string;
  live: boolean;
};

const FALLBACK: SubsidyStats = { ...SUBSIDY_STATS, live: false };

const QUERY = `{
  _meta { hasIndexingErrors block { timestamp } }
  funds_collection { totalSupplied totalClaimed }
  beneficiaries(first: 1000, where: { totalClaimed_gt: 0 }) { id }
}`;

// 18-decimal token amount to a short figure like "27.0M".
function toMillions(wei: bigint): string {
  const whole = Number(wei / BigInt("1000000000000000000"));
  return `${(whole / 1_000_000).toFixed(1)}M`;
}

// A subgraph that is still syncing, or stuck, reports old totals. Only trust
// it when its last indexed block is recent.
const MAX_LAG_SECONDS = 2 * 24 * 60 * 60;

export async function getSubsidyStats(): Promise<SubsidyStats> {
  try {
    const res = await fetch(SUBSIDIES_SUBGRAPH_URL, {
      method: "POST",
      headers: { "content-type": "application/json" },
      body: JSON.stringify({ query: QUERY }),
      next: { revalidate: 3600 },
    });
    if (!res.ok) return FALLBACK;
    const { data, errors } = await res.json();
    if (errors || !data || data._meta.hasIndexingErrors) return FALLBACK;

    const lag = Date.now() / 1000 - Number(data._meta.block.timestamp);
    if (!(lag < MAX_LAG_SECONDS)) return FALLBACK;

    const funds: { totalSupplied: string; totalClaimed: string }[] = data.funds_collection;
    if (!funds.length) return FALLBACK;
    const claimed = funds.reduce((sum, f) => sum + BigInt(f.totalClaimed), BigInt(0));
    const supplied = funds.reduce((sum, f) => sum + BigInt(f.totalSupplied), BigInt(0));

    return {
      distributed: toMillions(claimed),
      fundsAdded: toMillions(supplied),
      recipients: data.beneficiaries.length,
      token: SUBSIDY_STATS.token,
      live: true,
    };
  } catch {
    return FALLBACK;
  }
}
