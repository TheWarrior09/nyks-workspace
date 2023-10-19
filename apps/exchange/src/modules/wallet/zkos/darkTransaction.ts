import {
  commitBurnTransaction,
  commitDarkTransaction,
  getUtxoForAddress,
  getUtxoFromDB,
  getUtxoOutput,
} from './zkosApi';
import {
  getUtxoHex,
  verifyDarkTx,
  generateZeroTradingAccountFromHexAddress,
  getUpdatedAddressesFromTx,
  getAccountValueFromOutput,
  createQuisquisTransaction,
  createDarkTransaction,
  createBurnTransaction,
  getInputFromOutput,
} from './accountManagement';
import {
  AddNewAccountInLocalData,
  updateAccountStatusInLocalData,
} from './tradingAccount';

export const convertToJsonString = (jsObject: unknown) => {
  return JSON.stringify(jsObject);
};

export async function darkTransaction({
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

  const utxos = await getUtxoForAddress(fromAddress);
  console.log('utxos', utxos);

  const utxoString = JSON.stringify(utxos.result[0]);

  const utxoHex = await getUtxoHex(utxoString);
  console.log('utxoHex', utxoHex);

  const output = await getUtxoOutput(utxoHex);
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

export async function darkTransactionSingle({
  amountSend,
  amountAvailable,
  signature,
  fromAddress,
  toAddress,
  toAddressType,
  twilightAddress,
}: {
  signature: string;
  twilightAddress: string;
  fromAddress: string;
  toAddress: string;
  toAddressType: 'address' | 'output';
  amountAvailable: number;
  amountSend: number;
}) {
  const zkos = await import('zkos-wasm');

  const utxos = await getUtxoForAddress(fromAddress);
  const utxoString = JSON.stringify(utxos.result[0]);
  const utxoHex = await getUtxoHex(utxoString);

  const output = await getUtxoOutput(utxoHex);
  const outputString = JSON.stringify(output.result);

  const coinTypeInput = await getInputFromOutput(outputString, utxoString, 0);

  let receiver: string;

  if (toAddressType === 'output') {
    const receiverOutput = await getUtxoOutput(toAddress);

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

export async function quisquisTransactionSingle({
  amountSend,
  amountAvailable,
  signature,
  fromAddress,
  toAddress,
  toAddressType,
  twilightAddress,
}: {
  signature: string;
  twilightAddress: string;
  fromAddress: string;
  toAddress: string;
  toAddressType: 'address' | 'output';
  amountAvailable: number;
  amountSend: number;
}) {
  const zkos = await import('zkos-wasm');

  const utxos = await getUtxoForAddress(fromAddress);

  const utxoString = JSON.stringify(utxos.result[0]);

  const utxoHex = await getUtxoHex(utxoString);

  const output = await getUtxoOutput(utxoHex);

  const outputString = JSON.stringify(output.result);

  const coinTypeInput = await getInputFromOutput(outputString, utxoString, 0);

  let receiver: string;

  if (toAddressType === 'output') {
    const receiverOutput = await getUtxoOutput(toAddress);

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

  const allUtxos = await getUtxoFromDB();

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

export async function burnTransactionSingle({
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

  const utxos = await getUtxoForAddress(fromAddress);

  const utxoString = JSON.stringify(utxos.result[0]);

  const utxoHex = await getUtxoHex(utxoString);

  const output = await getUtxoOutput(utxoHex);

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

  txHash &&
    updateAccountStatusInLocalData({
      twilightAddress,
      tradingAddress: fromAddress,
    });

  await delay(10000);

  const updatedAddresses = await getUpdatedAddressesFromTx(
    signature,
    darkTxSingle
  );

  const updatedReceiverAddress = JSON.parse(updatedAddresses)[1];
  const utxos1 = await getUtxoForAddress(updatedReceiverAddress);

  const utxoString1 = JSON.stringify(utxos1.result[0]);

  const utxoHex1 = await getUtxoHex(utxoString1);

  const output1 = await getUtxoOutput(utxoHex1);

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

  console.log('burnTx', burnTx);

  const burnTxResponse = await commitBurnTransaction(burnTx, twilightAddress);

  console.log('burnTxResponse', burnTxResponse);

  await delay(5000);

  const tradingAccountHex = zkos.createTradingAccountHexFromOutput(
    outputString1,
    toAddress
  );

  return { tradingAccountHex, encryptScalarHex: encrypt_scalar_hex };
}

export function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
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
