import { getFundingAccountString } from './tradingAccount';

async function generatePublicKey({ signature }: { signature: string }) {
  const zkos = await import('zkos-wasm');
  return zkos.generatePublicKeyFromSignature(signature);
}

async function generatePublicKeyHexAddress({
  publicKey,
}: {
  publicKey: string;
}) {
  const zkos = await import('zkos-wasm');
  return zkos.hexStandardAddressFromPublicKey(12, publicKey);
}

async function generateZeroTradingAccountFromHexAddress({
  tradingHexAddress,
}: {
  tradingHexAddress: string;
}) {
  const zkos = await import('zkos-wasm');
  return zkos.generateZeroTradingAccountFromAddress(tradingHexAddress);
}

async function generateRandomTradingAddress({
  publicKey,
}: {
  publicKey: string;
}) {
  const zkos = await import('zkos-wasm');
  return zkos.generateRandomAddress(publicKey);
}

async function generateNewFundingAccount(publicKey: string, amount: number) {
  const zkos = await import('zkos-wasm');
  return zkos.generateChainFundingTradingAccount(publicKey, amount);
}

async function getTradingAccountFromFundingAccount(fundingAccount: string) {
  const zkos = await import('zkos-wasm');
  return zkos.fundingToTradingAccount(fundingAccount);
}

async function getTradingHexAddressFromAccount(tradingAccount: string) {
  const zkos = await import('zkos-wasm');
  return zkos.getHexAddressFromTradingAccount(tradingAccount);
}

async function getTradingHexAddressFromAccountHex(zkosAccountHex: string) {
  const zkos = await import('zkos-wasm');
  return zkos.getHexAddressFromTradingAccountHex(zkosAccountHex);
}

async function getUtxoHex(utxo: string) {
  const zkos = await import('zkos-wasm');
  return zkos.getUtxoHexFromJson(utxo);
}

async function verifyDarkTx(darkTx: string) {
  const zkos = await import('zkos-wasm');
  return zkos.verifyQuisQuisTransaction(darkTx);
}

async function getAccountValue({
  signature,
  encryptScalarHex,
  tradingAccountHex,
}: {
  signature: string;
  encryptScalarHex: string;
  tradingAccountHex: string;
}) {
  const zkos = await import('zkos-wasm');
  const fundingAccount = getFundingAccountString({
    encryptScalarHex,
    tradingAccountHex,
  });

  const tradingAccount = await getTradingAccountFromFundingAccount(
    fundingAccount
  );
  return zkos.decryptTradingAccountValue(signature, tradingAccount);
}

export async function getAccountValueFromOutput(
  signature: string,
  output: string
) {
  const zkos = await import('zkos-wasm');
  return zkos.decryptOutputValue(signature, output);
}

export async function decryptTradingAccountValue(
  signature: string,
  tradingAccount: string
) {
  const zkos = await import('zkos-wasm');
  return zkos.decryptTradingAccountValue(signature, tradingAccount);
}

export async function decryptAccountPoint(
  signature: string,
  tradingAccount: string,
  balance: number
) {
  const zkos = await import('zkos-wasm');
  return zkos.decryptAccountPoint(signature, tradingAccount, balance);
}

export async function verifyKeyPairWithTradingAccount(
  signature: string,
  tradingAccount: string
) {
  const zkos = await import('zkos-wasm');
  return zkos.verifyKeyPairTradingAccount(signature, tradingAccount);
}

export async function verifyTradingAccount(
  signature: string,
  tradingAccount: string,
  balance: number
) {
  const zkos = await import('zkos-wasm');
  return zkos.verifyTradingAccount(signature, tradingAccount, balance);
}

export async function getUpdatedAddressesFromTx(signature: string, tx: string) {
  const zkos = await import('zkos-wasm');
  return zkos.getUpdatedAddressesFromTransaction(signature, tx);
}

export async function getTradingAccountWithBalance(
  signature: string,
  balance: number
) {
  const zkos = await import('zkos-wasm');

  const publicKey = zkos.generatePublicKeyFromSignature(signature);

  const fundingAccount = zkos.generateChainFundingTradingAccount(
    publicKey,
    balance
  );

  return zkos.fundingToTradingAccount(fundingAccount);
}

export async function getTxIDFromUTXO(utxoHex: string) {
  const zkos = await import('zkos-wasm');
  const utxo = zkos.createUtxoFromHex(utxoHex);
  return zkos.txIdToHexString(utxo);
}

export async function addressMonitoring(signature: string, utxos: string) {
  const zkos = await import('zkos-wasm');
  return zkos.coinAddressMonitoring(utxos, signature);
}

export async function createQuisquisTransaction({
  signature,
  sender,
  receiver,
  amount,
  type,
  senderUpdatedBalance,
  anonymitySet,
}: {
  signature: string;
  sender: string;
  receiver: string;
  amount: number;
  type: 'address' | 'output';
  senderUpdatedBalance: number;
  anonymitySet: string;
}) {
  const zkos = await import('zkos-wasm');
  return zkos.createQuisQuisTransactionSingle(
    signature,
    sender,
    receiver,
    BigInt(amount),
    type === 'output',
    BigInt(senderUpdatedBalance),
    anonymitySet
  );
}

export {
  generatePublicKey,
  generatePublicKeyHexAddress,
  generateNewFundingAccount,
  generateZeroTradingAccountFromHexAddress,
  generateRandomTradingAddress,
  getTradingAccountFromFundingAccount,
  getTradingHexAddressFromAccount,
  getTradingHexAddressFromAccountHex,
  getAccountValue,
  getUtxoHex,
  verifyDarkTx,
};
