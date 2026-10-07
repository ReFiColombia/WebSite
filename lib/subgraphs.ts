// Lending subgraphs, one per network, hosted in the ReFi Colombia account on
// The Graph Studio. Set NEXT_PUBLIC_SUBGRAPH_STUDIO_ID or a full URL per
// network (NEXT_PUBLIC_SUBGRAPH_URL_<NAME>) to point somewhere else.
const STUDIO_ID = process.env.NEXT_PUBLIC_SUBGRAPH_STUDIO_ID || '1757108';

const studioUrl = (slug: string) =>
  `https://api.studio.thegraph.com/query/${STUDIO_ID}/${slug}/version/latest`;

export const LENDING_SUBGRAPHS = {
  celo: process.env.NEXT_PUBLIC_SUBGRAPH_URL_CELO || studioUrl('refi-colombia-lending-celo'),
  celoCop: process.env.NEXT_PUBLIC_SUBGRAPH_URL_CELO_COP || studioUrl('refi-colombia-lending-celo-cop'),
  optimism: process.env.NEXT_PUBLIC_SUBGRAPH_URL_OPTIMISM || studioUrl('refi-colombia-lending-optimism'),
  polygon: process.env.NEXT_PUBLIC_SUBGRAPH_URL_POLYGON || studioUrl('refi-colombia-lending-polygon'),
  arbitrum: process.env.NEXT_PUBLIC_SUBGRAPH_URL_ARBITRUM || studioUrl('refi-colombia-lending-arbitrum'),
  sepolia: process.env.NEXT_PUBLIC_SUBGRAPH_URL_SEPOLIA || studioUrl('refi-colombia-lending-sepolia'),
} as const;

export type LendingSubgraphKey = keyof typeof LENDING_SUBGRAPHS;
