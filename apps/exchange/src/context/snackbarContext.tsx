import { createContext, useContext, useState } from 'react';

type SnackbarState = {
  message: string;
  duration: number;
  open: boolean;
};

type SnackbarStateContext = { state: SnackbarState };
type SnackbarStateUpdateContext = {
  handleSnackbarOpen: (state: SnackbarState) => void;
  handleSnackbarClose: () => void;
};

const SnackbarContext = createContext<SnackbarStateContext | null>(null);

const snackbarUpdateContext = createContext<SnackbarStateUpdateContext | null>(
  null
);

const SnackbarContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [state, setState] = useState<SnackbarState>({
    message: '',
    duration: 0,
    open: false,
  });

  const handleSnackbarOpen = (state: SnackbarState) => {
    setState(state);
  };

  const handleSnackbarClose = () => {
    setState({
      message: '',
      duration: 0,
      open: false,
    });
  };

  return (
    <SnackbarContext.Provider value={{ state }}>
      <snackbarUpdateContext.Provider
        value={{ handleSnackbarOpen, handleSnackbarClose }}
      >
        {children}
      </snackbarUpdateContext.Provider>
    </SnackbarContext.Provider>
  );
};

const useSnackbarContext = () => {
  const context = useContext(SnackbarContext);
  if (!context) {
    throw new Error(
      'useSnackbarContext must be used within a SnackbarContextProvider'
    );
  }
  return context;
};

const useSnackbarUpdateContext = () => {
  const context = useContext(snackbarUpdateContext);
  if (!context) {
    throw new Error(
      'useSnackbarUpdateContext must be used within a SnackbarContextProvider'
    );
  }
  return context;
};

export {
  SnackbarContextProvider,
  useSnackbarContext,
  useSnackbarUpdateContext,
};
