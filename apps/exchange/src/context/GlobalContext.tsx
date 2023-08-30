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
  setQqAccount: Dispatch<SetStateAction<string | undefined>>;

  encryptScalar: string | undefined;
  setEncryptScalar: Dispatch<SetStateAction<string | undefined>>;

  amount: string | undefined;
  setAmount: Dispatch<SetStateAction<string | undefined>>;

  signature: string | undefined;
  setSignature: Dispatch<SetStateAction<string | undefined>>;
};

const GlobalContext = createContext<GlobalContext | null>(null);

const GlobalContextProvider = ({ children }: { children: React.ReactNode }) => {
  const [hexAddress, setHexAddress] = useState<string>();
  const [qqAccount, setQqAccount] = useState<string>();
  const [encryptScalar, setEncryptScalar] = useState<string>();
  const [amount, setAmount] = useState<string>();
  const [signature, setSignature] = useState<string>();

  return (
    <GlobalContext.Provider
      value={{
        hexAddress,
        setHexAddress,
        qqAccount,
        setQqAccount,
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
