export type AccountLocal = {
  tradingAccount: string;
  encryptScalar: string;
  tradingAddress: string;
  btcValue: number | undefined;
  transactionId: string;
  transactionType: 'fundingToTrading' | 'tradingToFunding' | 'darkTransaction';
  height: number;
  status: 'spent' | 'unSpent';
};

type LocalData = {
  [x: string]: {
    accounts: AccountLocal[];
  };
};

const LOCAL_STORAGE_KEY = 'TRADING_ACCOUNTS';

function saveData(data: LocalData) {
  try {
    const serializedData = JSON.stringify(data);
    localStorage.setItem(LOCAL_STORAGE_KEY, serializedData);
  } catch (error) {
    console.error('Error saving data:', error);
  }
}

const getLocalData = (twilightAddress: string) => {
  const emptyAccount: LocalData = {
    [twilightAddress]: { accounts: [] },
  };

  const localDataString =
    localStorage.getItem(LOCAL_STORAGE_KEY) || JSON.stringify(emptyAccount);

  const localData: LocalData = JSON.parse(localDataString);

  return localData[twilightAddress]?.accounts
    ? localData
    : { ...localData, ...emptyAccount };
};

export const getAccountList = (twilightAddress: string) => {
  const localData = getLocalData(twilightAddress);
  return localData[twilightAddress].accounts;
};

export const AddNewAccountInLocalData = (
  { twilightAddress }: { twilightAddress: string },
  newAccount: AccountLocal[]
) => {
  const localData = getLocalData(twilightAddress);

  localData[twilightAddress].accounts =
    localData[twilightAddress].accounts.concat(newAccount);

  saveData(localData);
};

export const updateAccountValueInLocalData = ({
  twilightAddress,
  tradingAddress,
  updatedValue,
}: {
  twilightAddress: string;
  tradingAddress: string;
  updatedValue: number;
}) => {
  const localData = getLocalData(twilightAddress);

  console.log('localData', localData);

  localData[twilightAddress].accounts = localData[twilightAddress].accounts.map(
    (account) => {
      if (account.tradingAddress === tradingAddress) {
        return { ...account, btcValue: updatedValue };
      }
      return account;
    }
  );

  saveData(localData);
};

export const updateAccountStatusInLocalData = ({
  twilightAddress,
  tradingAddress,
}: {
  twilightAddress: string;
  tradingAddress: string;
}) => {
  const localData = getLocalData(twilightAddress);

  console.log('localData', localData);

  localData[twilightAddress].accounts = localData[twilightAddress].accounts.map(
    (account) => {
      if (account.tradingAddress === tradingAddress) {
        return { ...account, status: 'spent' as const, btcValue: 0 };
      }
      return account;
    }
  );

  saveData(localData);
};

function getTradingAccountDetails(tradingAccount: string) {
  const parseTradingAccount = JSON.parse(tradingAccount);
  return {
    tradingAccountHex: parseTradingAccount.trading_account_hex,
    encryptScalarHex: parseTradingAccount.encrypt_scalar_hex,
  };
}

function getFundingAccountString({
  encryptScalarHex,
  tradingAccountHex,
}: {
  tradingAccountHex: string;
  encryptScalarHex: string;
}) {
  return JSON.stringify({
    trading_account_hex: tradingAccountHex,
    encrypt_scalar_hex: encryptScalarHex,
  });
}

export { getTradingAccountDetails, getFundingAccountString };
