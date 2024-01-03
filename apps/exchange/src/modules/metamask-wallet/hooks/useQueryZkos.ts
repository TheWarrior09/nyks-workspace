import { useQuery, useQueryClient } from '@tanstack/react-query';
import { getTradingAddress, getUpdatedTradingAddress } from '../utils';
import { useEffect } from 'react';

const useQueryGetTradingAccounts = (twilightAddress: string) => {
  const queryClient = useQueryClient();

  useEffect(() => {
    const updateQueryData = async () => {
      const savedTradingAccounts = await getTradingAddress();
      console.log('savedTradingAccounts', savedTradingAccounts);
      queryClient.setQueryData(
        ['tradingAccounts', twilightAddress],
        savedTradingAccounts
      );
    };
    updateQueryData();
  }, [queryClient, twilightAddress]);

  return useQuery({
    queryKey: ['tradingAccounts', twilightAddress],
    queryFn: getUpdatedTradingAddress,
    refetchOnWindowFocus: false,
    enabled: false,
    initialData: () => {
      if (typeof window === 'undefined' || !twilightAddress) return [];

      return [];
    },
  });
};

// const useQueryGetUtxosFromDB = () => {
//   return useQuery({
//     queryKey: ['getUtxosFromDB'],
//     queryFn: queryUtxoFromDB,
//     refetchOnWindowFocus: false,
//     refetchInterval: 60 * 1000,
//   });
// };

export { useQueryGetTradingAccounts };
