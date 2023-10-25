import {
  commitBurnTransaction,
  commitDarkTransaction,
  queryUtxoForAddress,
  queryUtxoOutput,
} from '../zkosApi';
import {
  getUtxoHex,
  getUpdatedAddressesFromTx,
  createDarkTransaction,
  createBurnTransaction,
  getInputFromOutput,
} from '../accountManagement';
import { delay } from '../../../../utils';

export async function burnTransaction({
  burnAmount,
  signature,
  fromAddress,
  toAddress,
  twilightAddress,
}: {
  signature: string;
  twilightAddress: string;
  fromAddress: string;
  toAddress: string;
  burnAmount: number;
}) {
  const zkos = await import('zkos-wasm');

  const utxos = await queryUtxoForAddress(fromAddress);

  const utxoString = JSON.stringify(utxos.result[0]);

  const utxoHex = await getUtxoHex(utxoString);

  const output = await queryUtxoOutput(utxoHex);

  const outputString = JSON.stringify(output.result);

  const coinTypeInput = await getInputFromOutput(outputString, utxoString, 0);

  const darkTxSingleJson = await createDarkTransaction({
    amount: burnAmount,
    receiver: toAddress,
    sender: coinTypeInput,
    senderUpdatedBalance: 0,
    signature,
    type: 'address',
  });

  const { tx: darkTxSingle, encrypt_scalar_hex } = JSON.parse(darkTxSingleJson);

  console.log('darkTxSingle', darkTxSingle);
  console.log('encrypt_scalar_hex', encrypt_scalar_hex);

  const darkTxResponse = await commitDarkTransaction(darkTxSingle);
  console.log('darkTxResponse', darkTxResponse);
  const txHash = JSON.parse(darkTxResponse.result).txHash;

  console.log('darkTxHash', txHash);

  await delay(10000);

  const updatedAddresses = await getUpdatedAddressesFromTx(
    signature,
    darkTxSingle
  );

  const updatedReceiverAddress = JSON.parse(updatedAddresses)[1];
  const utxos1 = await queryUtxoForAddress(updatedReceiverAddress);

  const utxoString1 = JSON.stringify(utxos1.result[0]);

  const utxoHex1 = await getUtxoHex(utxoString1);

  const output1 = await queryUtxoOutput(utxoHex1);

  const outputString1 = JSON.stringify(output1.result);

  const coinTypeInput1 = await getInputFromOutput(
    outputString1,
    utxoString1,
    0
  );

  const burnTx = await createBurnTransaction({
    coinTypeInput: coinTypeInput1,
    burnAmount,
    encrypt_scalar_hex,
    signature,
    toAddress,
  });

  console.log('burnTxHash', burnTx);

  const burnTxResponse = await commitBurnTransaction(burnTx, twilightAddress);

  console.log('burnTxResponse', burnTxResponse);

  await delay(5000);

  const tradingAccountHex = zkos.createTradingAccountHexFromOutput(
    outputString1,
    toAddress
  );

  return { tradingAccountHex, encryptScalarHex: encrypt_scalar_hex };
}
