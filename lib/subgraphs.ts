// Lending subgraphs, one per contract, hosted in the ReFi Colombia account on
// The Graph Studio. Naming: refi-colombia-lending-<network>-<currency>.
//
// Studio allows 3 deployed subgraphs per account. Live today: celo-usd and
// celo-copm (the third slot is the subsidies subgraph). Optimism, Polygon and
// Arbitrum are archived, so their tables stay empty until they are restored
// in Studio or published to the network. Set NEXT_PUBLIC_SUBGRAPH_STUDIO_ID or a full URL per
// network (NEXT_PUBLIC_SUBGRAPH_URL_<NAME>) to point somewhere else.
const STUDIO_ID = process.env.NEXT_PUBLIC_SUBGRAPH_STUDIO_ID || '1757108';

const studioUrl = (slug: string) =>
  `https://api.studio.thegraph.com/query/${STUDIO_ID}/${slug}/version/latest`;

export const LENDING_SUBGRAPHS = {
  celo: process.env.NEXT_PUBLIC_SUBGRAPH_URL_CELO || studioUrl('refi-colombia-lending-celo-usd'),
  celoCop: process.env.NEXT_PUBLIC_SUBGRAPH_URL_CELO_COP || studioUrl('refi-colombia-lending-celo-copm'),
  optimism: process.env.NEXT_PUBLIC_SUBGRAPH_URL_OPTIMISM || studioUrl('refi-colombia-lending-optimism-usd'),
  polygon: process.env.NEXT_PUBLIC_SUBGRAPH_URL_POLYGON || studioUrl('refi-colombia-lending-polygon-usd'),
  arbitrum: process.env.NEXT_PUBLIC_SUBGRAPH_URL_ARBITRUM || studioUrl('refi-colombia-lending-arbitrum-usd'),
  sepolia: process.env.NEXT_PUBLIC_SUBGRAPH_URL_SEPOLIA || studioUrl('refi-colombia-lending-sepolia'),
} as const;

export type LendingSubgraphKey = keyof typeof LENDING_SUBGRAPHS;
