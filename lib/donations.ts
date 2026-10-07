import { isAddress } from 'viem';

export type DonationChain =
  | 'Ethereum'
  | 'Polygon'
  | 'Celo'
  | 'OP Mainnet'
  | 'Arbitrum One';

// ReFi Colombia treasury Safe. Checked onchain on 2026-10-07: the Safe is
// deployed at this address on Ethereum, Celo, Optimism and Arbitrum (3
// signatures required). It is NOT deployed on Polygon, so Polygon has no
// default: funds sent there could not be moved by the signers.
const TREASURY_SAFE = '0xB41C38818a18b736867D9640f0B191b7890Da136';

// An env var overrides the default for its network. Next.js only inlines
// NEXT_PUBLIC_ vars that are referenced literally, hence the explicit list.
const RAW: Record<DonationChain, string | undefined> = {
  Ethereum: process.env.NEXT_PUBLIC_ETHEREUM_RECIPENT || TREASURY_SAFE,
  Polygon: process.env.NEXT_PUBLIC_POLYGON_RECIPENT,
  Celo: process.env.NEXT_PUBLIC_CELO_RECIPENT || TREASURY_SAFE,
  'OP Mainnet': process.env.NEXT_PUBLIC_OPTIMISM_RECIPENT || TREASURY_SAFE,
  'Arbitrum One': process.env.NEXT_PUBLIC_ARBITRUM_RECIPENT || TREASURY_SAFE,
};

export function getDonationRecipient(chain: DonationChain): `0x${string}` | undefined {
  const value = RAW[chain];
  return value && isAddress(value) ? (value as `0x${string}`) : undefined;
}

const ALIASES: Record<string, DonationChain> = {
  ethereum: 'Ethereum',
  polygon: 'Polygon',
  celo: 'Celo',
  optimism: 'OP Mainnet',
  'op mainnet': 'OP Mainnet',
  arbitrum: 'Arbitrum One',
  'arbitrum one': 'Arbitrum One',
};

// Accepts a wallet chain name ("OP Mainnet") or a URL value ("optimism").
export function isDonationNetworkEnabled(network: string | null | undefined): boolean {
  if (!network) return true; // nothing chosen yet, the form asks for it
  const chain = ALIASES[network.toLowerCase()];
  return chain !== undefined && getDonationRecipient(chain) !== undefined;
}

export const POLYGON_DONATIONS_ENABLED = getDonationRecipient('Polygon') !== undefined;
