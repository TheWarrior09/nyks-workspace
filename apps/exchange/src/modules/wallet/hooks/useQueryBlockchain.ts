import { useQuery } from '@tanstack/react-query';
import axios from 'axios';
import { QueryFunctionContext } from '@tanstack/react-query';
import { COSMOS_REST } from '../../../../constants';

async function queryFunctionWithAxios(context: QueryFunctionContext) {
  const { queryKey, signal } = context;
  const [_, url] = queryKey;
  if (typeof url === 'string') {
    const { data } = await axios.get(url, { signal });
    return data;
  }
  throw new Error('Invalid QueryKey');
}

interface BtcReserves {
  BtcReserves: BtcReservesEntity[];
}
interface BtcReservesEntity {
  ReserveId: string;
  ReserveAddress: string;
  JudgeAddress: string;
  BtcRelayCapacityValue: string;
  TotalValue: string;
  PrivatePoolValue: string;
  PublicValue: string;
  FeePool: string;
  UnlockHeight: string;
  RoundId: string;
}

function useBtcReserveQuery() {
  const BTC_DEPOSIT_ADDRESS_ENDPOINT = `${COSMOS_REST}twilight-project/nyks/volt/btc_reserve`;
  return useQuery<BtcReserves>({
    queryKey: [
      'registered_btc_deposit_address_by_twilight_address',
      BTC_DEPOSIT_ADDRESS_ENDPOINT,
    ],
    queryFn: queryFunctionWithAxios,
    refetchInterval: 1000 * 60 * 3,
  });
}

export { useBtcReserveQuery };
