export async function generateZkOSLendOrder({
  signature,
  amount,
}: {
  signature: string;
  amount: number;
}) {
  // const amount  = 100
  const quisquis = await import('zkos-wasm');

  const publicKey = quisquis.generatePublicKeyFromSignature(signature);

  const tradingQuisquisAccount = quisquis.generateChainFundingTradingAccount(
    publicKey,
    amount
  );

  const parseTradingAccountJson = JSON.parse(tradingQuisquisAccount);

  // console.log('parseTradingAccountJson', parseTradingAccountJson);
  // console.log(
  //   JSON.stringify(parseTradingAccountJson.encrypt_scalar_hex),
  //   parseTradingAccountJson.encrypt_scalar_hex
  // );
  const tradingAccount = quisquis.fundingToTradingAccount(
    tradingQuisquisAccount
  );
  // console.log('Trading account', TradingAccount);
  const tradingHexAddress =
    quisquis.getHexAddressFromTradingAccount(tradingAccount);
  // console.log('Trading Hex Address', TradingHexAddress);
  const scriptAddress = quisquis.getScriptAddress();
  // console.log('script address', scriptAddress);
  const outputFromTrading =
    quisquis.createOutputFromTradingAccount(tradingHexAddress);
  // console.log('outputFromTrading', outputFromTrading);
  const defaultUtxo = quisquis.createDefaultUtxo();
  // console.log('defaultUtxo', defaultUtxo);
  const coinTypeInput = quisquis.createInputFromOutput(
    outputFromTrading,
    defaultUtxo,
    BigInt(amount)
  );

  // console.log('coinTypeInput', coinTypeInput);
  const hexScalarToJson = quisquis.convertHexScalarToJson(
    JSON.stringify(parseTradingAccountJson.encrypt_scalar_hex)
  );
  // console.log('hexScalarToJson', hexScalarToJson);
  const outputMemo = quisquis.createOutputForMemo(
    scriptAddress,
    tradingHexAddress,
    BigInt(amount),
    BigInt(amount),
    JSON.stringify(parseTradingAccountJson.encrypt_scalar_hex)
    // JSON.stringify(hexScalarToJson)
    // hexScalarToJson
  );

  const rScaler = JSON.stringify(parseTradingAccountJson.encrypt_scalar_hex);

  const zkosOrder = quisquis.createZkOSLendOrder(
    coinTypeInput,
    outputMemo,
    signature,
    rScaler,
    BigInt(100),
    JSON.stringify('account_id'),
    amount,
    'LEND',
    'PENDING',
    amount
  );

  console.log('create zkos lend order', zkosOrder);
}

function base64ToUint8Array(base64: string) {
  const binaryString = atob(base64);
  const length = binaryString.length;
  const uint8Array = new Uint8Array(length);

  for (let i = 0; i < length; i++) {
    uint8Array[i] = binaryString.charCodeAt(i);
  }

  return uint8Array;
}

// async function generateZkOSLendOrder1({
//   signature,
//   amount,
// }: {
//   signature: string;
//   amount: number;
// }) {
//   // const amount  = 100

//   const quisquis = await import('zkos-wasm');

//   const publicKey = quisquis.generatePublicKeyFromSignatureString(signature);

//   const tradingQuisquisAccount = quisquis.generateChainTradingAccount(
//     publicKey,
//     amount
//   );

//   const parseTradingAccountJson = JSON.parse(tradingQuisquisAccount);

//   // console.log('parseTradingAccountJson', parseTradingAccountJson);

//   // console.log(
//   //   JSON.stringify(parseTradingAccountJson.encrypt_scalar_hex),
//   //   parseTradingAccountJson.encrypt_scalar_hex
//   // );

//   const zkosAccount = quisquis.fundingToZkosAccount(tradingQuisquisAccount);
//   // console.log('zkos account', zkosAccount);

//   const zkosHexAddress = quisquis.getHexAddressFromZkosAccount(zkosAccount);
//   // console.log('zkos Hex Address', zkosHexAddress);

//   const scriptAddress = quisquis.getScriptAddress();
//   // console.log('script address', scriptAddress);

//   const outputFromZkos = quisquis.createOutputFromZkosAccount(zkosAccount);
//   // console.log('outputFromZkos', outputFromZkos);

//   const defaultUtxo = quisquis.createDefaultUtxo();
//   // console.log('defaultUtxo', defaultUtxo);

//   const coinTypeInput = quisquis.createInputFromOutput(
//     outputFromZkos,
//     defaultUtxo,
//     BigInt(amount)
//   );

//   // console.log('coinTypeInput', coinTypeInput);

//   const hexScalarToJson = quisquis.convertHexScalarToJson(
//     JSON.stringify(parseTradingAccountJson.encrypt_scalar_hex)
//   );
//   // console.log('hexScalarToJson', hexScalarToJson);

//   const outputMemo = quisquis.createOutputForMemo(
//     scriptAddress,
//     zkosHexAddress,
//     BigInt(amount),
//     BigInt(amount),
//     JSON.stringify(parseTradingAccountJson.encrypt_scalar_hex)
//     // JSON.stringify(hexScalarToJson)
//     // hexScalarToJson
//   );

//   const rScaler = JSON.stringify(parseTradingAccountJson.encrypt_scalar_hex);

//   const zkosOrder = quisquis.createZkOSLendOrder(
//     coinTypeInput,
//     outputMemo,
//     hexStringToUint8Array(signature),
//     rScaler,
//     BigInt(100),
//     convertToJsonString('account_id'),
//     amount,
//     'LEND',
//     'PENDING',
//     amount
//   );

//   console.log('create zkos lend order', zkosOrder);
// }

// async function queryZkOSLendOrder({ signature }: { signature: string }) {
//   const quisquis = await import('zkos-wasm');

//   const publicKey = quisquis.generatePublicKeyFromSignatureString(signature);

//   const tradingQuisquisAccount = quisquis.generateChainTradingAccount(
//     publicKey,
//     10
//   );

//   const zkosAccount = quisquis.fundingToZkosAccount(tradingQuisquisAccount);

//   const zkosHexAddress = quisquis.getHexAddressFromZkosAccount(zkosAccount);

//   const zkosOrder = quisquis.queryLendOrderZkos(
//     zkosHexAddress,
//     base64ToUint8Array(signature),
//     JSON.stringify('account_id'),
//     'PENDING'
//   );

//   console.log('query zkos lend order', zkosOrder);
// }
