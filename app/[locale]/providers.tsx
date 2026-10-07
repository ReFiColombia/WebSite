'use client';
import React from 'react';
import { configureChains, createConfig, WagmiConfig } from 'wagmi';
import { arbitrum, celo, mainnet, optimism, polygon, sepolia } from 'wagmi/chains';
import { InjectedConnector } from 'wagmi/connectors/injected';
import { WalletConnectConnector } from 'wagmi/connectors/walletConnect';
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc';
import { publicProvider } from 'wagmi/providers/public';
import { GtagManager } from '@/components/utils/GTAG';
import { Metricol } from '@/components/utils/Metricol';
import ApolloProviderNetworkBased from './apolloProvider';
import { GlobalCurrencyProvider } from '@/context/CurrencyContext';
import { RPC_URLS, WALLETCONNECT_PROJECT_ID } from '@/lib/chains';

// Celo first: it is the default chain for reads when no wallet is connected.
const { chains, publicClient } = configureChains(
  [celo, optimism, polygon, arbitrum, mainnet, sepolia],
  [
    jsonRpcProvider({
      rpc: (chain) => (RPC_URLS[chain.id] ? { http: RPC_URLS[chain.id] } : null),
    }),
    publicProvider(),
  ]
);

const wagmiConfig = createConfig({
  autoConnect: true,
  connectors: [
    new InjectedConnector({
      chains,
      options: { name: 'Browser wallet', shimDisconnect: true },
    }),
    new WalletConnectConnector({
      chains,
      options: { projectId: WALLETCONNECT_PROJECT_ID, showQrModal: true },
    }),
  ],
  publicClient,
});

function Providers({ children }: { children: React.ReactNode }) {
  return (
    <GlobalCurrencyProvider>
      <WagmiConfig config={wagmiConfig}>
        <ApolloProviderNetworkBased>{children}</ApolloProviderNetworkBased>
      </WagmiConfig>
      <GtagManager />
      <Metricol />
    </GlobalCurrencyProvider>
  );
}

export default Providers;
