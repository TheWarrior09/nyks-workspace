function base64ToUint8Array(base64: string) {
  const binaryString = atob(base64);
  const length = binaryString.length;
  const uint8Array = new Uint8Array(length);

  for (let i = 0; i < length; i++) {
    uint8Array[i] = binaryString.charCodeAt(i);
  }

  return uint8Array;
}

async function generatePublicKey({ signature }: { signature: string }) {
  const zkos = await import('zkos-wasm');
  const signatureArray = base64ToUint8Array(signature);
  return zkos.generatePublicKeyFromSignature(signatureArray);
}

async function generateHexAddress({ publicKey }: { publicKey: string }) {
  const zkos = await import('zkos-wasm');
  return zkos.hexStandardAddressFromPublicKey(12, publicKey);
}

async function generateZeroZkosAccount({
  zkosAccountHex,
}: {
  zkosAccountHex: string;
}) {
  const zkos = await import('zkos-wasm');
  return zkos.generateZeroZkosAccountFromAddress(zkosAccountHex);
}

async function generateRandomReceiverAddress({
  publicKey,
}: {
  publicKey: string;
}) {
  const zkos = await import('zkos-wasm');
  return zkos.generateRandomAddress(publicKey);
}

async function getNewTradingAccount(publicKey: string, amount: number) {
  const zkos = await import('zkos-wasm');
  const tradingQuisquisAccount = zkos.generateChainTradingAccount(
    publicKey,
    amount
  );

  return {
    tradingQuisquisAccount,
  };
}

function getTradingAccount({
  encryptScalar,
  qqAccount,
}: {
  qqAccount: string;
  encryptScalar: string;
}) {
  const tradingAccount = JSON.stringify({
    zkos_account_hex: qqAccount,
    encrypt_scalar_hex: encryptScalar,
  });

  return tradingAccount;
}

async function getZkosAccount(tradingQuisquisAccount: string) {
  const zkos = await import('zkos-wasm');

  const zkosAccount = zkos.fundingToZkosAccount(tradingQuisquisAccount);
  const zkosHexAddress = zkos.getHexAddressFromZkosAccount(zkosAccount);

  return {
    zkosAccount,
    zkosHexAddress,
  };
}

async function getZkosHexAddress(zkosAccountHex: string) {
  const zkos = await import('zkos-wasm');

  const zkosHexAddress = zkos.getHexAddressFromZkosAccountHex(zkosAccountHex);

  return zkosHexAddress;
}

async function getUtxoHex(utxo: string) {
  const zkos = await import('zkos-wasm');

  const utxoHex = zkos.getUtxoHexFromJson(utxo);

  return utxoHex;
}

async function verifyDarkTx(darkTx: string) {
  const zkos = await import('zkos-wasm');

  const utxoHex = zkos.verifyQuisQuisTransaction(darkTx);

  return utxoHex;
}

async function getAccountValue({
  signature,
  encryptScalar,
  qqAccount,
}: {
  signature: string;
  encryptScalar: string;
  qqAccount: string;
}) {
  const zkos = await import('zkos-wasm');
  const signatureArray = base64ToUint8Array(signature);

  const tradingAccount = getTradingAccount({ encryptScalar, qqAccount });

  const zkosAccount = zkos.fundingToZkosAccount(tradingAccount);
  const balance = zkos.decryptAccountValue(signatureArray, zkosAccount);

  return { balance };
}

export {
  generatePublicKey,
  generateHexAddress,
  getNewTradingAccount,
  getTradingAccount,
  getZkosAccount,
  getAccountValue,
  getZkosHexAddress,
  getUtxoHex,
  verifyDarkTx,
  generateZeroZkosAccount,
  generateRandomReceiverAddress,
};
