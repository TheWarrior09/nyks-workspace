import { DirectSecp256k1HdWallet } from '@cosmjs/proto-signing';
import {
  SigningStargateClient,
  StargateClient,
  StdFee,
  assertIsDeliverTxSuccess,
} from '@cosmjs/stargate';
import { fromBech32 } from '@cosmjs/encoding';
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
    throw new Error(error);
  }
}

function createSigningClient(wallet: DirectSecp256k1HdWallet) {
  try {
    return SigningStargateClient.connectWithSigner(TENDERMINT_RPC, wallet);
  } catch (error) {
    throw new Error(error);
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

async function credit(sender: string, recipient: string, amount: number) {
  try {
    const { wallet } = await faucetWalletDetails();
    const client = await createSigningClient(wallet);

    const amountWithDenom = {
      denom: TESTNET_COIN_DENOM,
      amount: amount.toString(),
    };
    const feeAmount = '1000';
    const fee: StdFee = {
      amount: [{ denom: TESTNET_COIN_DENOM, amount: feeAmount }],
      gas: '100000',
    };

    const txResponse = await client.sendTokens(
      sender,
      recipient,
      [amountWithDenom],
      fee
    );

    assertIsDeliverTxSuccess(txResponse);
    return txResponse;
  } catch (error) {
    throw new Error(error);
  }
}

export { credit, faucetWalletDetails, isValidAddress };
