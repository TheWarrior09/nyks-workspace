import {
  commitDarkTransaction,
  queryUtxoForAddress,
  queryUtxoFromDB,
  queryUtxoOutput,
} from '../zkosApi';
import {
  getUtxoHex,
  createQuisquisTransaction,
  getInputFromOutput,
} from '../accountManagement';

export async function quisquisTransaction({
  amountSend,
  amountAvailable,
  signature,
  fromAddress,
  toAddress,
  toAddressType,
}: {
  signature: string;
  fromAddress: string;
  toAddress: string;
  toAddressType: 'address' | 'output';
  amountAvailable: number;
  amountSend: number;
}) {
  const zkos = await import('zkos-wasm');

  const utxos = await queryUtxoForAddress(fromAddress);

  const utxoString = JSON.stringify(utxos.result[0]);

  const utxoHex = await getUtxoHex(utxoString);

  const output = await queryUtxoOutput(utxoHex);

  const outputString = JSON.stringify(output.result);

  const coinTypeInput = await getInputFromOutput(outputString, utxoString, 0);

  let receiver: string;

  if (toAddressType === 'output') {
    const receiverOutput = await queryUtxoOutput(toAddress);

    const receiverOutputString = JSON.stringify(receiverOutput.result);

    const receiverUtxo = zkos.createUtxoFromHex(toAddress);

    receiver = zkos.createInputFromOutput(
      receiverOutputString,
      receiverUtxo,
      BigInt(0)
    );
  } else {
    receiver = toAddress;
  }

  const allUtxos = await queryUtxoFromDB();

  const quisquisTxSingle = await createQuisquisTransaction({
    signature,
    sender: coinTypeInput,
    receiver,
    amount: amountSend,
    type: toAddressType,
    senderUpdatedBalance: amountAvailable - amountSend,
    anonymitySet: zkos.selectAnonymityAccounts(
      allUtxos.result.result,
      coinTypeInput
    ),
  });

  console.log('quisquisTxSingle', quisquisTxSingle);

  const txResponse = await commitDarkTransaction(quisquisTxSingle);

  const txHash = JSON.parse(txResponse.result).txHash;

  return txHash;
}
