'use client';

import React, { useEffect, useState } from 'react';
import erc1155ABI from '@/constants/ABI/erc1155ABI.json';
import { useAccount, useNetwork, usePublicClient, useSwitchNetwork } from 'wagmi';
import { polygon } from 'wagmi/chains';
import Link from 'next/link';
import { useLocale, useTranslations } from 'next-intl';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Fund } from '@/components/lendV2/Fund';
import { Lend } from '@/components/lendV2/Lend';
import { UserInfo } from '@/components/lendV2/UserInfo';
import { CurrentLends } from '@/components/lendV2/CurrentLends';
import { CurrentSignatures } from '@/components/lendV2/CurrentSignatures';
import { useGetUser } from '@/hooks/LendV2/useGetUser';
import { useRouter } from 'next/navigation';
import { Chains } from '@/constants/chains';
import { toast } from '@/components/ui/use-toast';
import { NetworkModal } from '@/components/loanPanel/NetworkModal';
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from '@/components/ui/select';
import { Button } from '@/components/ui/button';
import { useIsAdmin } from '@/hooks/LendV2/useIsAdmin';
import { useGlobalCurrency } from '@/context/CurrencyContext';

export default function Page() {
  const [selectedChain, setSelectedChain] = useState<
    keyof typeof Chains | null
  >(null);
  const { currency, setCurrency } = useGlobalCurrency();
  const [showNetworkModal, setShowNetworkModal] = useState(false);
  const { chain } = useNetwork();
  const { switchNetworkAsync } = useSwitchNetwork();
  const [hasNft, setHasNft] = useState(false);
  const t = useTranslations('ExclusiveContent');
  const locale = useLocale();
  const { address, isConnected } = useAccount();
  const [isMounted, setIsMounted] = useState(false);
  const { push } = useRouter();
  const { data: isAdmin, isLoading: isAdminLoading } = useIsAdmin();

  useEffect(() => {
    const currentChain =
      chain?.id === Chains.celo
        ? 'celo'
        : chain?.id === Chains.optimism
        ? 'optimism'
        : chain?.id === Chains.polygon
        ? 'polygon'
        : chain?.id === Chains.sepolia
        ? 'sepolia'
        : chain?.id === Chains.arbitrum
        ? 'arbitrum'
        : null;
    setSelectedChain(currentChain);
    
    if (
      chain?.id !== Chains.celo &&
      chain?.id !== Chains.optimism &&
      chain?.id !== Chains.polygon &&
      chain?.id !== Chains.sepolia &&
      chain?.id !== Chains.arbitrum
    ) {
      setShowNetworkModal(true);
    } else {
      setShowNetworkModal(false);
    }
  }, [chain]);

  const handleCurrencyChange = async (currency: "COP" | "USD") => {
    setCurrency(currency);
    if (currency === "COP") {
      setSelectedChain("celo");
      const desiredChainId = Chains.celo;
      toast({
        title: 'Tip',
        description: 'Recuerda aceptar el cambio de red en tu billetera',
      });
      await switchNetworkAsync?.(desiredChainId);
    }
  };

  const handleNetworkChange = async (value: keyof typeof Chains) => {
    if (currency === "COP") return;

    const desiredChainId = Chains[value];
    toast({
      title: 'Tip',
      description: 'Recuerda aceptar el cambio de red en tu billetera',
    });
    await switchNetworkAsync?.(desiredChainId);

    const checkIfNetworkChanged = () => {
      if (chain?.id !== desiredChainId) {
        setTimeout(checkIfNetworkChanged, 1000);
      } else {
        setSelectedChain(value);
      }
    };

    checkIfNetworkChanged();
  };

  const {
    data: user,
    isLoading: isUserLoading,
    isError: isUserError,
  } = useGetUser(address!);
  const tokenIds = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
  // Membership NFT (ERC-1155) lives on Polygon. Read it with the shared
  // public client instead of a second web3 library and a private RPC key.
  const polygonClient = usePublicClient({ chainId: polygon.id });
  async function getNFT() {
    if (!address) return false;
    try {
      const data = (await polygonClient.readContract({
        address: '0x6500dD04e67925A94975D787eF08E2d7786649D9',
        abi: erc1155ABI,
        functionName: 'balanceOfBatch',
        args: [Array(tokenIds.length).fill(address), tokenIds.map((id) => BigInt(id))],
      })) as bigint[];
      setHasNft(data.some((balance) => balance > BigInt(0)));
    } catch (error) {
      return false;
    }
  }
  useEffect(() => {
    getNFT();
    if (!isMounted) setIsMounted(true);
  }, [address]);

  if (!isMounted) return null;
  if (!isConnected) {
    return (
      <main className='flex min-h-dvh items-center justify-center bg-bg px-5 pt-32 pb-20 text-fg'>
        <div className='w-full max-w-lg rounded-[var(--radius-card)] border border-line-strong bg-bg-elev p-8 text-center'>
          <h1 className='font-display text-3xl'>
            {locale === 'es' ? 'Conecta tu wallet' : 'Connect your wallet'}
          </h1>
          <p className='mt-4 text-fg-muted'>
            {locale === 'es'
              ? 'El panel de préstamos necesita una wallet conectada. Usa el botón Conectar en la parte superior.'
              : 'The lending panel needs a connected wallet. Use the Connect button at the top.'}
          </p>
        </div>
      </main>
    );
  }
  if (showNetworkModal) {
    return <NetworkModal onNetworkSelect={handleNetworkChange} />;
  }
  if (!hasNft) {
    return (
      <section className='flex p-20 flex-col relative first-bg justify-center items-center min-h-screen text-white text-center gap-4 bg-[#1B2731] w-full'>
        <h1 className='font-bold text-4xl lg:text-8xl'>
          {t('hasnotNFT.title')}
        </h1>
        <p className='text-sm md:text-lg lg:text-2xl font-light'>
          {t('hasnotNFT.description')}{' '}
          <Link
            className='hover:text-blue-700  transition-all ease-in-out font-bold'
            href={'https://bueno.art/refimedellin/refi-medellin-origin/tokens'}
            target='_blank'
          >
            {t('hasnotNFT.link')}
          </Link>
          <br />
        </p>
      </section>
    );
  }

  return (
    <main className='lend__panel px-5 text-white py-32 gap-4 lg:px-20 bg-[#1B2731] min-h-screen flex justify-center items-center'>
      <div className='flex flex-row gap-4 items-end'>
        <div className='flex flex-col gap-2 place-self-start'>
          <h4>Moneda</h4>
          <Select
            defaultValue={currency}
            onValueChange={handleCurrencyChange}
          >
            <SelectTrigger>
              <SelectValue placeholder='Moneda' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='USD'>USD</SelectItem>
              <SelectItem value='COP'>COP</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className='flex flex-col gap-2 place-self-start'>
          <h4>Red</h4>
          <Select
            key={selectedChain}
            defaultValue={selectedChain as string}
            onValueChange={handleNetworkChange}
            disabled={currency === "COP"}
          >
            <SelectTrigger>
              <SelectValue placeholder='Network' />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value='celo'>Celo</SelectItem>
              <SelectItem value='optimism'>Optimism</SelectItem>
              <SelectItem value='polygon'>Polygon</SelectItem>
              <SelectItem value='arbitrum'>Arbitrum</SelectItem>
            </SelectContent>
          </Select>
        </div>
        {!!isAdmin && !isAdminLoading && (
          <Button
            variant='outline'
            className='justify-self-end'
            onClick={() => push(`/${locale}/lend-manager`)}
          >
            Admin manager
          </Button>
        )}
      </div>

      <div
        style={{
          gridArea: 'info',
        }}
        className='flex flex-col gap-4 w-full h-full'
      >
        <UserInfo
          funded={(user as bigint[])?.[1]}
          quota={(user as bigint[])?.[0]}
          loading={isUserLoading}
          error={isUserError}
        />
        <Tabs defaultValue='lend'>
          <TabsList className='grid w-full grid-cols-2'>
            <TabsTrigger value='fund'>Fund</TabsTrigger>
            <TabsTrigger value='lend'>Lend</TabsTrigger>
          </TabsList>
          <TabsContent value='fund'>
            <Fund />
          </TabsContent>
          <TabsContent value='lend'>
            <Lend />
          </TabsContent>
        </Tabs>
      </div>

      <CurrentSignatures />

      <CurrentLends />
    </main>
  );
}
