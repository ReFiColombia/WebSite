import React, { useMemo } from 'react';
import { ApolloClient, InMemoryCache, ApolloProvider } from '@apollo/client';
import { useNetworkContractV2 } from '@/hooks/LendV2/useNetworkContract';

export default function ApolloProviderNetworkBased({
  children,
}: {
  children: React.ReactNode;
}) {
  const { subgraphUrl } = useNetworkContractV2();

  // One client per subgraph. Recreating it on every render threw the cache away.
  const client = useMemo(
    () => new ApolloClient({ uri: subgraphUrl, cache: new InMemoryCache() }),
    [subgraphUrl]
  );

  return <ApolloProvider client={client}>{children}</ApolloProvider>;
}
