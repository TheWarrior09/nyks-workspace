import { OfflineSigner } from '@cosmjs/proto-signing';
import {
  isDeliverTxSuccess,
  GasPrice,
  calculateFee,
  DeliverTxResponse,
} from '@cosmjs/stargate';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { getKeplr } from '../use-keplr-wallet/use-keplr-wallet';
import {
  MsgMintBurnTradingBtc,
  getSigningTwilightprojectClient,
  twilightproject,
} from '@nyks/proto-ts';

const CHAIN_ID = 'nyks';
// const TENDERMINT_RPC = 'http://0.0.0.0:26657';
const TENDERMINT_RPC = 'https://nyks.twilight-explorer.com/tendermint/';

async function getSigningClient() {
  const keplr = getKeplr();
  const offlineSigner: OfflineSigner = keplr.getOfflineSigner(CHAIN_ID);
  const signingClient = await getSigningTwilightprojectClient({
    rpcEndpoint: TENDERMINT_RPC,
    signer: offlineSigner,
  });
  return signingClient;
}

const signAndBroadcastMintBurnTradingBTCTx = async (
  msg: MsgMintBurnTradingBtc
) => {
  const signingClient = await getSigningClient();
  const { mintBurnTradingBtc } =
    twilightproject.nyks.zkos.MessageComposer.withTypeUrl;
  const msgMintBurnTradingBtc = mintBurnTradingBtc({
    btcValue: msg.btcValue,
    encryptScalar: msg.encryptScalar,
    mintOrBurn: msg.mintOrBurn,
    qqAccount: msg.qqAccount,
    twilightAddress: msg.twilightAddress,
  });
  const gasPrice = GasPrice.fromString('1nyks');
  const gasEstimation = await signingClient.simulate(
    msg.twilightAddress,
    [msgMintBurnTradingBtc],
    ''
  );
  const fee = calculateFee(Math.round(gasEstimation * 1.3), gasPrice);
  return await signingClient.signAndBroadcast(
    msg.twilightAddress,
    [msgMintBurnTradingBtc],
    fee
  );
};

export const useTwilightRpcWithCosmjs = () => {
  //   const queryClient = useQueryClient();

  const mintBurnTradingBtc = useMutation({
    mutationFn: signAndBroadcastMintBurnTradingBTCTx,
  });

  const getTransactionStatus = (txResponse: DeliverTxResponse) =>
    isDeliverTxSuccess(txResponse) ? 'Success' : 'Failed';

  return {
    mintBurnTradingBtc,
    getTransactionStatus,
  };
};
