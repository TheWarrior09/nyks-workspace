import { StrictMode } from 'react';
import { AppProps } from 'next/app';
import router from 'next/router';
import { ThemeProvider } from '@emotion/react';
import { Alert, CssBaseline, Snackbar } from '@mui/material';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { StyledNavbar } from '@nyks-workspace/shared-ui';
import theme from '../theme';
import {
  EnvironmentContextProvider,
  GlobalContextProvider,
  useGlobalStateContext,
} from '../src/context';
import { CHAIN_ID, COSMOS_REST, TENDERMINT_RPC } from '../constants';
import {
  SnackbarContextProvider,
  useSnackbarContext,
  useSnackbarUpdateContext,
} from '../src/context/snackbarContext';
import { MetaMaskProvider } from '../src/modules/metamask-wallet/hooks';

const queryClient = new QueryClient();

interface MenuItem {
  label: string;
  onClick: () => void;
}

const menuItems: MenuItem[] = [
  {
    label: 'Btc Reserve',
    onClick: () => {
      router.push(`/btc-reserve`);
    },
  },
  {
    label: 'Exchange',
    onClick: () => {
      router.push(`/trade`);
    },
  },
  {
    label: 'Testnet Explorer',
    onClick: () => {
      window.open('https://nyks.twilight-explorer.com/', '_blank');
    },
  },
  {
    label: 'Lend Page',
    onClick: () => {
      router.push(`/lend`);
    },
  },
];

function CustomApp({ Component, pageProps }: AppProps) {
  return (
    <StrictMode>
      <QueryClientProvider client={queryClient}>
        <ThemeProvider theme={theme}>
          <GlobalContextProvider>
            <CssBaseline />
            <main className="app">
              <MetaMaskProvider>
                <EnvironmentContextProvider>
                  <SnackbarContextProvider>
                    <Navbar />
                    <Component {...pageProps} />

                    <SnackbarComponent />
                  </SnackbarContextProvider>
                </EnvironmentContextProvider>
              </MetaMaskProvider>
            </main>
          </GlobalContextProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </StrictMode>
  );
}

export default CustomApp;

const Navbar = () => {
  const { hexAddress } = useGlobalStateContext();

  return (
    <StyledNavbar
      menu={menuItems}
      chainId={CHAIN_ID}
      cosmosRest={COSMOS_REST}
      tendermintRpc={TENDERMINT_RPC}
      hexAddress={hexAddress ?? ''}
    />
  );
};

const SnackbarComponent = () => {
  const { state } = useSnackbarContext();
  const { handleSnackbarClose } = useSnackbarUpdateContext();

  return (
    <Snackbar
      open={state.open}
      autoHideDuration={state.duration}
      onClose={handleSnackbarClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
    >
      <Alert
        elevation={6}
        variant="filled"
        onClose={handleSnackbarClose}
        severity="success"
      >
        {state.message}
      </Alert>
    </Snackbar>
  );
};
