'use client';
import {
  Dispatch,
  SetStateAction,
  createContext,
  useContext,
  useState,
} from 'react';

type GlobalStateContext = {
  hexAddress: string | undefined;
  tradingAccount: string | undefined;
  encryptScalar: string | undefined;
  amount: number | undefined;
  signature: string | undefined;
};

type GlobalStateUpdateContext = {
  setHexAddress: Dispatch<SetStateAction<string | undefined>>;
  setTradingAccount: Dispatch<SetStateAction<string | undefined>>;
  setEncryptScalar: Dispatch<SetStateAction<string | undefined>>;
  setAmount: Dispatch<SetStateAction<number | undefined>>;
  setSignature: Dispatch<SetStateAction<string | undefined>>;
};

const GlobalStateContext = createContext<GlobalStateContext | null>(null);

const GlobalStateUpdateContext = createContext<GlobalStateUpdateContext | null>(
  null
);

const GlobalContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [hexAddress, setHexAddress] = useState<string>();
  const [tradingAccount, setTradingAccount] = useState<string>();
  const [encryptScalar, setEncryptScalar] = useState<string>();
  const [amount, setAmount] = useState<number>();
  const [signature, setSignature] = useState<string>();

  return (
    <GlobalStateContext.Provider
      value={{
        hexAddress,
        tradingAccount,
        encryptScalar,
        amount,
        signature,
      }}
    >
      <GlobalStateUpdateContext.Provider
        value={{
          setHexAddress,
          setTradingAccount,
          setEncryptScalar,
          setAmount,
          setSignature,
        }}
      >
        {children}
      </GlobalStateUpdateContext.Provider>
    </GlobalStateContext.Provider>
  );
};

const useGlobalStateContext = () => {
  const context = useContext(GlobalStateContext);
  if (!context) {
    throw new Error(
      'Global state context should be used within GlobalStateContextProvider.'
    );
  }
  return context;
};

const useGlobalStateUpdateContext = () => {
  const context = useContext(GlobalStateUpdateContext);
  if (!context) {
    throw new Error(
      'Global state update context should be used within GlobalStateUpdateContextProvider.'
    );
  }
  return context;
};

export {
  GlobalContextProvider,
  useGlobalStateContext,
  useGlobalStateUpdateContext,
};
