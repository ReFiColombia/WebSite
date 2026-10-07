// RPC endpoints per chain. Each one can be overridden with an env var so a
// paid provider can be plugged in without touching code. Never hardcode a
// provider key here: this file ships to the browser and the repo is public.
export const RPC_URLS: Record<number, string> = {
  42220: process.env.NEXT_PUBLIC_RPC_CELO || 'https://forno.celo.org',
  10: process.env.NEXT_PUBLIC_RPC_OPTIMISM || 'https://mainnet.optimism.io',
  137: process.env.NEXT_PUBLIC_RPC_POLYGON || 'https://polygon-bor-rpc.publicnode.com',
  42161: process.env.NEXT_PUBLIC_RPC_ARBITRUM || 'https://arb1.arbitrum.io/rpc',
  1: process.env.NEXT_PUBLIC_RPC_ETHEREUM || 'https://ethereum-rpc.publicnode.com',
  11155111: process.env.NEXT_PUBLIC_RPC_SEPOLIA || 'https://ethereum-sepolia-rpc.publicnode.com',
};

export const WALLETCONNECT_PROJECT_ID =
  process.env.NEXT_PUBLIC_WALLETCONNECT_PROJECT_ID || '7326ebd4b7670327335ce12403d94bec';
