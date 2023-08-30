import axios from 'axios';
import { QueryFunctionContext, useQuery } from '@tanstack/react-query';
import { COSMOS_REST } from '../../../../constants';

type QueryKeys = [
  {
    url: string;
    path: string;
    twilightAddress: string | undefined;
  }
];

export interface MintBurnTradingBtc {
  mintOrBurn: boolean;
  btcValue: string;
  qqAccount: string;
  encryptScalar: string;
  twilightAddress: string;
}

interface MintBurnTradingBtcQuery {
  MintOrBurnTradingBtc: MintBurnTradingBtc[];
}

export async function queryFunctionWithAxios(
  context: QueryFunctionContext<QueryKeys>
) {
  const { queryKey, signal } = context;
  const [{ url, path, twilightAddress }] = queryKey;
  const { data } = await axios.get<MintBurnTradingBtcQuery>(
    `${url}/${path}/${twilightAddress}`,
    {
      signal,
    }
  );
  return data;
}

const useQueryMintBurnTradingBtc = ({
  twilightAddress,
}: {
  twilightAddress: string | undefined;
}) => {
  const getListQuery = useQuery({
    queryKey: [
      {
        url: COSMOS_REST,
        path: 'twilight-project/nyks/zkos/mint_or_burn_trading_btc/',
        twilightAddress,
      },
    ],
    queryFn: queryFunctionWithAxios,
    // refetchInterval: 5000,
    keepPreviousData: Boolean(twilightAddress),
    enabled: Boolean(twilightAddress),
  });

  return getListQuery;
};

export { useQueryMintBurnTradingBtc };
