import { DirectSecp256k1HdWallet } from '@cosmjs/proto-signing';
import {
  SigningStargateClient,
  StargateClient,
  StdFee,
  assertIsDeliverTxSuccess,
} from '@cosmjs/stargate';
import { fromBech32 } from '@cosmjs/encoding';

const TENDERMINT_RPC = process.env.TENDERMINT_RPC || 'http://localhost:26657';
const TESTNET_COIN_DENOM = process.env.TESTNET_COIN_DENOM || 'nyks';
const ADDRESS_PREFIX = process.env.ADDRESS_PREFIX || 'twilight';
const MNEMONIC = process.env.MNEMONIC;

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
