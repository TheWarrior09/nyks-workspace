import { AccountData } from '@cosmjs/proto-signing';
import { SigningStargateClient } from '@cosmjs/stargate';
import { ChainInfo } from '@keplr-wallet/types';
import type { Window as KeplrWindow } from '@keplr-wallet/types';
import { useQuery, useQueryClient } from '@tanstack/react-query';

declare global {
  // eslint-disable-next-line @typescript-eslint/no-empty-interface
  interface Window extends KeplrWindow {}
}

const getKeplr = () => {
  if (typeof window.keplr !== 'undefined') return window.keplr;
  throw new Error('window.keplr is not defined');
};

const getOfflineSigner = (chainId: string) => {
  const keplr = getKeplr();
  return keplr.getOfflineSigner(chainId);
};

const getAccounts = (chainId: string) => {
  const offlineSigner = getOfflineSigner(chainId);
  return offlineSigner.getAccounts();
};

const getAllBalances = async (chainId: string, tendermintRpc: string) => {
  const offlineSigner = getOfflineSigner(chainId);
  const account: AccountData = (await offlineSigner.getAccounts())[0];
  const signingClient = await SigningStargateClient.connectWithSigner(
    tendermintRpc,
    offlineSigner
  );
  return signingClient.getAllBalances(account.address);
};

function useClientSideState<T>(
  key: string,
  initialData: T
): [T, (newData: T) => void] {
  const queryClient = useQueryClient();

  const fetchData = async () => {
    const existingData = queryClient.getQueryData<T>([key]);
    if (!existingData) {
      queryClient.setQueryData([key], initialData);
    }
    return existingData || initialData;
  };

  const { data } = useQuery<T, Error>([key], fetchData, {
    staleTime: Infinity,
    cacheTime: Infinity,
    initialData: initialData,
  });

  const setData = (newData: T) => {
    queryClient.setQueryData([key], newData);
    queryClient.invalidateQueries([key]);
  };

  return [data ?? initialData, setData];
}

interface UseKeplrWallet {
  chainId: string;
  tendermintRpc: string;
  cosmosRest: string;
}

export const useKeplrWallet = ({
  chainId,
  tendermintRpc,
  cosmosRest,
}: UseKeplrWallet) => {
  const queryClient = useQueryClient();

  const [keplrConnected, setKeplrConnected] = useClientSideState(
    'keplrConnected',
    false
  );

  const getAccountsQuery = useQuery({
    queryKey: ['getAccounts'],
    queryFn: () => getAccounts(chainId),
    enabled: !!keplrConnected,
    refetchInterval: 3000,
  });

  const getAllBalancesQuery = useQuery({
    queryKey: ['accountBalanceInfo'],
    queryFn: () => getAllBalances(chainId, tendermintRpc),
    enabled: !!keplrConnected,
    refetchInterval: 3000,
  });

  const getBtcBalanceOnNYKS = () => {
    const btcBalanceString = getAllBalancesQuery.data?.find(
      (balance) => balance.denom === 'sats'
    )?.amount;
    return typeof btcBalanceString === 'undefined'
      ? 0
      : Number(btcBalanceString);
  };

  const getNyksBalanceOnNYKS = () => {
    const nyksBalanceString = getAllBalancesQuery.data?.find(
      (balance) => balance.denom === 'nyks'
    )?.amount;
    return typeof nyksBalanceString === 'undefined'
      ? 0
      : Number(nyksBalanceString);
  };

  const connectKeplr = async () => {
    try {
      const keplr = getKeplr();
      await keplr.experimentalSuggestChain(
        getTestnetChainInfo(chainId, tendermintRpc, cosmosRest)
      );
      await keplr.enable(chainId);
      setKeplrConnected(true);
    } catch (error) {
      alert('Please install keplr extension');
    }
  };

  const disconnectKeplr = async () => {
    const keplr = getKeplr();
    await keplr.disable(chainId);
    getAccountsQuery.remove();
    getAllBalancesQuery.remove();
    setKeplrConnected(false);

    queryClient.clear();
  };

  return {
    connectKeplr,
    disconnectKeplr,
    keplrConnected,
    getAccountsQuery,
    getAllBalancesQuery,
    getBtcBalanceOnNYKS,
    getNyksBalanceOnNYKS,
  };
};

const getTestnetChainInfo = (
  chainId: string,
  tendermintRpc: string,
  cosmosRest: string
): ChainInfo => ({
  chainId: chainId,
  chainName: 'nyks',
  rpc: tendermintRpc,
  rest: cosmosRest,
  bip44: {
    coinType: 118,
  },
  bech32Config: {
    bech32PrefixAccAddr: 'twilight',
    bech32PrefixAccPub: 'twilight' + 'pub',
    bech32PrefixValAddr: 'twilight' + 'valoper',
    bech32PrefixValPub: 'twilight' + 'valoperpub',
    bech32PrefixConsAddr: 'twilight' + 'valcons',
    bech32PrefixConsPub: 'twilight' + 'valconspub',
  },
  currencies: [
    {
      coinDenom: 'nyks',
      coinMinimalDenom: 'nyks',
      coinDecimals: 0,
      coinGeckoId: 'nyks',
    },
    {
      coinDenom: 'sats',
      coinMinimalDenom: 'sats',
      coinDecimals: 0,
      coinGeckoId: 'bitcoin',
    },
  ],
  feeCurrencies: [
    {
      coinDenom: 'nyks',
      coinMinimalDenom: 'nyks',
      coinDecimals: 0,
      coinGeckoId: 'nyks',
      gasPriceStep: { low: 0.001, average: 0.0025, high: 0.004 },
    },
  ],
  stakeCurrency: {
    coinDenom: 'nyks',
    coinMinimalDenom: 'nyks',
    coinDecimals: 0,
    coinGeckoId: 'nyks',
  },
});
