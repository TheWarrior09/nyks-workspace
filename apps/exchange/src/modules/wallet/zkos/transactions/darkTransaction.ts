import {
  commitDarkTransaction,
  queryUtxoForAddress,
  queryUtxoOutput,
} from '../zkosApi';
import {
  getUtxoHex,
  verifyDarkTx,
  generateZeroTradingAccountFromHexAddress,
  getUpdatedAddressesFromTx,
  getAccountValueFromOutput,
  createDarkTransaction,
  getInputFromOutput,
} from '../accountManagement';
import {
  AddNewAccountInLocalData,
  updateAccountStatusInLocalData,
} from '../tradingAccount';
import { delay } from '../../../../utils';

export const convertToJsonString = (jsObject: unknown) => {
  return JSON.stringify(jsObject);
};

export async function darkTransactionMultiple({
  amountSend,
  amountAvailable,
  signature,
  fromAddress,
  toAddress,
  twilightAddress,
}: {
  signature: string;
  twilightAddress: string;
  fromAddress: string;
  toAddress: string;
  amountAvailable: number;
  amountSend: number;
}) {
  const zkos = await import('zkos-wasm');

  const utxos = await queryUtxoForAddress(fromAddress);
  console.log('utxos', utxos);

  const utxoString = JSON.stringify(utxos.result[0]);

  const utxoHex = await getUtxoHex(utxoString);
  console.log('utxoHex', utxoHex);

  const output = await queryUtxoOutput(utxoHex);
  console.log('output', output);

  const outputString = JSON.stringify(output.result);

  const coinTypeInput = zkos.createInputFromOutput(
    outputString,
    utxoString,
    BigInt(0)
  );

  const zeroTradingAccount = await generateZeroTradingAccountFromHexAddress({
    tradingHexAddress: toAddress,
  });

  const transactionVector = [
    {
      total_amount: -amountSend,
      input: coinTypeInput,
      receivers: [
        {
          amount: amountSend,
          trading_account: zeroTradingAccount,
        },
      ],
    },
  ];

  const senderBalanceVector = [amountAvailable - amountSend];
  const receiverBalanceVector = [amountSend];

  const darkTx = zkos.createDarkTransferTransaction(
    convertToJsonString(transactionVector),
    signature,
    convertToJsonString(senderBalanceVector),
    convertToJsonString(receiverBalanceVector)
  );
  console.log('Dark txs', darkTx);

  const isVerifyDarkTx = await verifyDarkTx(darkTx);
  console.log('isVerifyDarkTx', isVerifyDarkTx);

  const txResponse = await commitDarkTransaction(darkTx);
  console.log('txResponse', txResponse);

  const txHash = JSON.parse(txResponse.result).txHash;
  console.log('txResponse.result.txHash', txHash);

  txHash &&
    updateAccountStatusInLocalData({
      twilightAddress,
      tradingAddress: fromAddress,
    });

  await delay(5000);

  const updatedAddresses = await getUpdatedAddressesFromTx(signature, darkTx);

  console.log('updatedAddresses', updatedAddresses);

  AddNewAccountInLocalData(
    { twilightAddress },
    JSON.parse(updatedAddresses).map((item: string) => ({
      tradingAccount: '',
      encryptScalar: '',
      tradingAddress: item,
      transactionId: txHash,
      transactionType: 'darkTransaction',
      status: 'unSpend',
      height: 0,
    }))
  );

  const receiverAddressOutput = await getAddressOutput(toAddress);
  console.log('receiverAddressOutput', receiverAddressOutput);

  const toAddressValue = await getAddressValue(signature, toAddress);
  console.log('toAddress value', toAddressValue);

  const fromAddressValue = await getAddressValue(signature, fromAddress);
  console.log('fromAddress value', fromAddressValue);
}

export async function darkTransaction({
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

  const darkTxSingleJson = await createDarkTransaction({
    amount: amountSend,
    receiver: receiver,
    sender: coinTypeInput,
    senderUpdatedBalance: amountAvailable - amountSend,
    signature,
    type: toAddressType,
  });

  const { tx: darkTxSingle } = JSON.parse(darkTxSingleJson);

  console.log('darkTxSingle', darkTxSingle);

  const txResponse = await commitDarkTransaction(darkTxSingle);

  const txHash: string = JSON.parse(txResponse.result).txHash;

  return txHash;
}

const getAddressUtxo = async (address: string) => {
  const utxos = await getUtxoForAddress(address);
  console.log('utxos', utxos);

  return JSON.stringify(utxos.result[0]);
};

export const getAddressUtxoHex = async (address: string) => {
  const utxos = await getUtxoForAddress(address);
  console.log('utxos', utxos);

  const utxoHex = await getUtxoHex(JSON.stringify(utxos.result[0]));
  console.log('utxoHex', utxoHex);

  return utxoHex;
};

const getOutputFromUtxo = async (utxo: string) => {
  const utxoHex = await getUtxoHex(utxo);
  console.log('utxoHex', utxoHex);

  const output = await getUtxoOutput(utxoHex);
  console.log('output', output);

  return JSON.stringify(output.result);
};

export const getAddressOutput = async (address: string) => {
  console.log('toAccount ', address);

  const utxoString = await getAddressUtxo(address);
  console.log('utxoString', utxoString);

  const outputString = await getOutputFromUtxo(utxoString);

  return outputString;
};

export const getAddressValue = async (signature: string, address: string) => {
  const output = await getAddressOutput(address);
  const value = await getAccountValueFromOutput(signature, output);

  console.log('address value', value);

  return value;
};