import { isAddress } from 'viem';

export type DonationChain =
  | 'Ethereum'
  | 'Polygon'
  | 'Celo'
  | 'OP Mainnet'
  | 'Arbitrum One';

// Treasury addresses that receive direct donations, one per network. They come
// from env vars on purpose: there is no default, so a missing or mistyped
// value can never send funds to the wrong place. Next.js only inlines
// NEXT_PUBLIC_ vars that are referenced literally, hence the explicit list.
const RAW: Record<DonationChain, string | undefined> = {
  Ethereum: process.env.NEXT_PUBLIC_ETHEREUM_RECIPENT,
  Polygon: process.env.NEXT_PUBLIC_POLYGON_RECIPENT,
  Celo: process.env.NEXT_PUBLIC_CELO_RECIPENT,
  'OP Mainnet': process.env.NEXT_PUBLIC_OPTIMISM_RECIPENT,
  'Arbitrum One': process.env.NEXT_PUBLIC_ARBITRUM_RECIPENT,
};

export function getDonationRecipient(chain: DonationChain): `0x${string}` | undefined {
  const value = RAW[chain];
  return value && isAddress(value) ? (value as `0x${string}`) : undefined;
}

// True only when every supported network has a valid recipient.
export const DONATIONS_ENABLED = (Object.keys(RAW) as DonationChain[]).every(
  (chain) => getDonationRecipient(chain) !== undefined
);
