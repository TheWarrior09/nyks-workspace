import { ZKOS_ACCOUNT_KEY_LOCAL_STORAGE } from '../../../../constants';
import { ZkosAccountFromLocalStorage } from './types';

function saveAccountInLocalStorage({
  tradingAccount,
  zkosAccount,
  encryptScalar,
  amount,
}: {
  tradingAccount: string;
  zkosAccount: string;
  encryptScalar: string;
  amount: number;
}) {
  const zkosAccountsFromLocalStorage: ZkosAccountFromLocalStorage[] =
    JSON.parse(localStorage.getItem(ZKOS_ACCOUNT_KEY_LOCAL_STORAGE) ?? '[]');

  zkosAccountsFromLocalStorage.push({
    trading_account: tradingAccount,
    zkos_account_hex: zkosAccount,
    encrypt_scalar_hex: encryptScalar,
    amount,
  });

  localStorage.setItem(
    ZKOS_ACCOUNT_KEY_LOCAL_STORAGE,
    JSON.stringify(zkosAccountsFromLocalStorage)
  );
}

const getAccountFromLocalStorage = () => {
  const tradingBtcAccounts: ZkosAccountFromLocalStorage[] = JSON.parse(
    localStorage.getItem(ZKOS_ACCOUNT_KEY_LOCAL_STORAGE) ?? '[]'
  );

  return tradingBtcAccounts;
};

// async function getTradingAccount(publicKey: string, amount: number) {
//   const zkos = await import('zkos-wasm');
//   const tradingQuisquisAccount = zkos.generateChainTradingAccount(
//     publicKey,
//     amount
//   );

//   return {
//     chainTradingAccount: tradingQuisquisAccount,
//   };
// }

function getTradingAccountDetails(tradingAccount: string) {
  const parseTradingAccountJson = JSON.parse(tradingAccount);
  return {
    tradingAccountHex: parseTradingAccountJson.zkos_account_hex,
    encryptScalarHex: parseTradingAccountJson.encrypt_scalar_hex,
  };
}

// async function getZkosAccount(tradingQuisquisAccount: string) {
//   const zkos = await import('zkos-wasm');

//   const zkosAccount = zkos.fundingToZkosAccount(tradingQuisquisAccount);
//   const zkosHexAddress = zkos.getHexAddressFromZkosAccount(zkosAccount);

//   return {
//     zkosAccount,
//     zkosHexAddress,
//   };
// }

export {
  saveAccountInLocalStorage,
  // getTradingAccount,
  getTradingAccountDetails,
  // getZkosAccount,
};
