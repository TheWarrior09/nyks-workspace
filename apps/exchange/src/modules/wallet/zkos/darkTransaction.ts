import {
  commitDarkTransaction,
  getUtxoForAddress,
  getUtxoOutput,
} from './tradeOrder';
import {
  getUtxoHex,
  getZkosHexAddress,
  verifyDarkTx,
} from './accountManagement';

export const convertToJsonString = (jsObject: unknown) => {
  return JSON.stringify(jsObject);
};

export async function darkTransaction({
  amountSend,
  amountAvailable,
  signature,
  zkosAccountHex,
  toAccount,
}: {
  signature: string;
  zkosAccountHex: string;
  amountAvailable: number;
  amountSend: number;
  toAccount: string;
}) {
  const zkos = await import('zkos-wasm');

  const zkosHexAddress = await getZkosHexAddress(zkosAccountHex);

  console.log('zkosHexAddress', zkosHexAddress);

  const utxos = await getUtxoForAddress(zkosHexAddress);
  console.log('utxos', utxos);

  const utxoString = JSON.stringify(utxos.result[0]);

  const utxoHex = await getUtxoHex(utxoString);
  console.log('utxoHex', utxoHex);

  const output = await getUtxoOutput(utxoHex);
  console.log('output', output);

  const outputString = JSON.stringify(output.result);

  const coinTypeInput = zkos.createInputFromOutput(
    // outputFromZkos,
    outputString,
    // defaultUtxo,
    utxoString,
    BigInt(0)
  );

  const zeroZkosAccount = zkos.generateZeroZkosAccountFromAddress(toAccount);

  const transactionVector = [
    {
      total_amount: -amountSend,
      input: coinTypeInput,
      receivers: [
        {
          amount: amountSend,
          zkos_account: zeroZkosAccount,
        },
      ],
    },
  ];

  const senderBalanceVector = [amountAvailable - amountSend];
  const receiverBalanceVector = [amountSend];

  const darkTx = zkos.createDarkTransferTransaction(
    convertToJsonString(transactionVector),
    convertToJsonString([signature]),
    convertToJsonString(senderBalanceVector),
    convertToJsonString(receiverBalanceVector)
  );
  console.log('Dark txs', darkTx);

  const isVerifyDarkTx = await verifyDarkTx(darkTx);
  console.log('isVerifyDarkTx', isVerifyDarkTx);

  const txResponse = await commitDarkTransaction(darkTx);
  console.log('txResponse', txResponse);
}
