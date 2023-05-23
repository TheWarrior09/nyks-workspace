import { DirectSecp256k1HdWallet } from '@cosmjs/proto-signing';
import {
  GasPrice,
  SigningStargateClient,
  StargateClient,
  assertIsDeliverTxSuccess,
} from '@cosmjs/stargate';
import { fromBech32 } from '@cosmjs/encoding';
import { updateIndividualUserTransactionDetails } from '../models';
import { env } from '../env';

const { TENDERMINT_RPC, TESTNET_COIN_DENOM, ADDRESS_PREFIX, MNEMONIC } = env;

async function faucetWalletDetails() {
  try {
    const wallet = await DirectSecp256k1HdWallet.fromMnemonic(MNEMONIC, {
      prefix: ADDRESS_PREFIX,
    });
    const [{ address }] = await wallet.getAccounts();

    const readonlyClient = await StargateClient.connect(TENDERMINT_RPC);
    const faucetBalance = await readonlyClient.getBalance(
      address,
      TESTNET_COIN_DENOM
    );
    return { wallet, faucetAddress: address, faucetBalance };
  } catch (error) {
    console.info(error);
    throw error;
  }
}

function createSigningClient(wallet: DirectSecp256k1HdWallet) {
  try {
    return SigningStargateClient.connectWithSigner(TENDERMINT_RPC, wallet, {
      gasPrice: GasPrice.fromString('0.0001nyks'),
    });
  } catch (error) {
    console.info(error);
    throw error;
  }
}

function isValidAddress(address: string) {
  try {
    const { prefix } = fromBech32(address);
    return prefix === ADDRESS_PREFIX;
  } catch {
    return false;
  }
}

async function transferSingle(
  sender: string,
  recipient: string,
  amount: number
) {
  try {
    const { wallet } = await faucetWalletDetails();
    const client = await createSigningClient(wallet);

    const amountWithDenom = {
      denom: TESTNET_COIN_DENOM,
      amount: amount.toString(),
    };

    const txResponse = await client.sendTokens(
      sender,
      recipient,
      [amountWithDenom],
      'auto'
    );

    await updateIndividualUserTransactionDetails(
      recipient,
      txResponse.transactionHash,
      'fulfilled'
    );

    assertIsDeliverTxSuccess(txResponse);
    return txResponse;
  } catch (error) {
    console.info(error);
    throw error;
  }
}

async function transferMultiple(
  senderAddress: string,
  recipientAddresses: string[],
  amount: number
) {
  try {
    const { wallet } = await faucetWalletDetails();
    const client = await createSigningClient(wallet);

    const message = recipientAddresses.map((recipientAddress) => ({
      typeUrl: '/cosmos.bank.v1beta1.MsgSend',
      value: {
        fromAddress: senderAddress,
        toAddress: recipientAddress,
        amount: [
          {
            denom: TESTNET_COIN_DENOM,
            amount: amount.toString(),
          },
        ],
      },
    }));

    const txResponse = await client.signAndBroadcast(
      senderAddress,
      message,
      'auto'
    );

    assertIsDeliverTxSuccess(txResponse);
    return txResponse;
  } catch (error) {
    console.info(error);
    throw error;
  }
}

export {
  faucetWalletDetails,
  isValidAddress,
  transferSingle,
  transferMultiple,
};
