'use client';
import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from 'react';

type GlobalContext = {
  hexAddress: string | undefined;
  setHexAddress: Dispatch<SetStateAction<string | undefined>>;

  qqAccount: string | undefined;
  setTradingAccount: Dispatch<SetStateAction<string | undefined>>;

  encryptScalar: string | undefined;
  setEncryptScalar: Dispatch<SetStateAction<string | undefined>>;

  amount: number | undefined;
  setAmount: Dispatch<SetStateAction<number | undefined>>;

  signature: string | undefined;
  setSignature: Dispatch<SetStateAction<string | undefined>>;
};

const GlobalContext = createContext<GlobalContext | null>(null);

const GlobalContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [hexAddress, setHexAddress] = useState<string>();
  const [tradingAccount, setTradingAccount] = useState<string>();
  const [encryptScalar, setEncryptScalar] = useState<string>();
  const [amount, setAmount] = useState<number>();
  const [signature, setSignature] = useState<string>();

  return (
    <GlobalContext.Provider
      value={{
        hexAddress,
        setHexAddress,
        qqAccount: tradingAccount,
        setTradingAccount,
        encryptScalar,
        setEncryptScalar,
        amount,
        setAmount,
        signature,
        setSignature,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export { GlobalContextProvider };

export const useGlobalContext = () => {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error(
      'Global context should be used within GlobalContextProvider.'
    );
  }
  return context;
};
