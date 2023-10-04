import {
  useKeplrWallet,
  useTwilightRpcWithCosmjs,
} from '@nyks-workspace/hooks';
import { CHAIN_ID, TENDERMINT_RPC, COSMOS_REST } from '../../../../constants';
import {
  generatePublicKey,
  getNewTradingAccount,
  saveAccountInLocalStorage,
} from '../zkos';
import Long from 'long';
import { getTradingAccountDetails } from '../zkos/tradingAccount';
import { useGlobalContext } from '../../../context';
import { useMutation } from '@tanstack/react-query';
import { darkTransactionSingle } from '../zkos/darkTransaction';

interface UserBroadcastTransaction {
  amount: number;
}

function useBroadcastMintTransaction({ amount }: UserBroadcastTransaction) {
  const { getAccountsQuery } = useKeplrWallet({
    chainId: CHAIN_ID,
    tendermintRpc: TENDERMINT_RPC,
    cosmosRest: COSMOS_REST,
  });

  const twilightAddress = getAccountsQuery.data?.[0].address;

  const { mintBurnTradingBtc } = useTwilightRpcWithCosmjs();

  const { signature } = useGlobalContext();
  if (!signature) throw new Error('signature not found');

  const handleMintTradingBtc = async () => {
    const publicKey = await generatePublicKey({
      signature,
    });
    const { tradingQuisquisAccount: chainTradingAccount } =
      await getNewTradingAccount(publicKey, amount);

    const { encryptScalarHex, tradingAccountHex } =
      getTradingAccountDetails(chainTradingAccount);

    const res = await mintBurnTradingBtc.mutateAsync(
      {
        btcValue: Long.fromNumber(amount),
        encryptScalar: encryptScalarHex,
        mintOrBurn: true,
        qqAccount: tradingAccountHex,
        twilightAddress: twilightAddress ?? '',
      },
      {
        onSuccess: (data) => {
          if (data.code === 0) {
            saveAccountInLocalStorage({
              amount,
              tradingAccount: chainTradingAccount,
              encryptScalar: encryptScalarHex,
              zkosAccount: tradingAccountHex,
            });
          }
        },
      }
    );

    console.log('mintBurnTradingBtc response', res);
  };

  return { handleMintTradingBtc, status: mintBurnTradingBtc.status };
}

export const useBroadcastDarkTransactionSingle = () => {
  return useMutation({
    mutationFn: darkTransactionSingle,
  });
};

export { useBroadcastMintTransaction };
