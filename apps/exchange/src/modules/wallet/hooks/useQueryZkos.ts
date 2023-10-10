import { useQuery } from '@tanstack/react-query';
import { getUtxoFromDB } from '../zkos/zkosApi';
import { addressMonitoring, getTxIDFromUTXO } from '../zkos';
import { getAddressValue, getAddressUtxoHex } from '../zkos/darkTransaction';

function customSerializer(key: string, value: unknown) {
  if (typeof value === 'bigint') {
    return value.toString(); // Convert BigInt to string
  }
  return value;
}

export type TradingAccountData = {
  tradingAddress: string;
  value: bigint;
  utxo: string;
  txId: string;
};

const TWILIGHT_KEY = 'twilightAddress';

const handleGetUpdatedTradingAccounts = async (
  signature: string,
  twilightAddress: string
) => {
  const utxos = await getUtxoFromDB();

  const addresses = await addressMonitoring(signature, utxos.result.result);
  const tradingAccountData: Promise<TradingAccountData>[] = JSON.parse(
    addresses
  ).map(async (item: string) => {
    const value = await getAddressValue(signature, item);
    const utxo = await getAddressUtxoHex(item);
    const txId = await getTxIDFromUTXO(utxo);

    return {
      tradingAddress: item,
      value,
      utxo,
      txId,
    };
  });

  const accounts = await Promise.all(tradingAccountData);

  const localData = getLocalData(twilightAddress);

  localData[twilightAddress].accounts = accounts;

  localStorage.setItem(
    TWILIGHT_KEY,
    JSON.stringify(localData, customSerializer)
  );

  return accounts;
};

type LocalData = {
  [x: string]: {
    accounts: TradingAccountData[];
  };
};

const getLocalData = (twilightAddress: string) => {
  const emptyAccount: LocalData = {
    [twilightAddress]: { accounts: [] },
  };
  const twilightUserStorage =
    localStorage.getItem(TWILIGHT_KEY) || JSON.stringify(emptyAccount);
  const localData: LocalData = JSON.parse(twilightUserStorage);

  return localData[twilightAddress]?.accounts
    ? localData
    : { ...localData, ...emptyAccount };
};

const getLocalTradingAccounts = (twilightAddress: string) => {
  const localData = getLocalData(twilightAddress);
  return localData[twilightAddress].accounts;
};

const useQueryGetTradingAccounts = (
  signature: string,
  twilightAddress: string
) => {
  return useQuery({
    queryKey: ['tradingAccounts', twilightAddress],
    queryFn: () => handleGetUpdatedTradingAccounts(signature, twilightAddress),
    refetchOnWindowFocus: false,
    enabled: false,
    initialData: () => {
      if (typeof window === 'undefined' || !twilightAddress) return [];

      return getLocalTradingAccounts(twilightAddress);
    },
  });
};

const useQueryGetUtxosFromDB = () => {
  return useQuery({
    queryKey: ['getUtxosFromDB'],
    queryFn: getUtxoFromDB,
    refetchOnWindowFocus: false,
    refetchInterval: 60 * 1000,
  });
};

export { useQueryGetUtxosFromDB, useQueryGetTradingAccounts };
