import { StrictMode } from 'react';
import { AppProps } from 'next/app';
import router from 'next/router';
import { ThemeProvider } from '@emotion/react';
import { CssBaseline } from '@mui/material';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { StyledNavbar } from '@nyks-workspace/shared-ui';
import theme from '../theme';
import {
  EnvironmentContextProvider,
  GlobalContextProvider,
  useGlobalContext,
} from '../src/context';
import { CHAIN_ID, COSMOS_REST, TENDERMINT_RPC } from '../constants';

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
      router.push(`/explorer`);
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
              <EnvironmentContextProvider>
                <Navbar />
                <Component {...pageProps} />
              </EnvironmentContextProvider>
            </main>
          </GlobalContextProvider>
        </ThemeProvider>
      </QueryClientProvider>
    </StrictMode>
  );
}

export default CustomApp;

const Navbar = () => {
  const { hexAddress } = useGlobalContext();

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
