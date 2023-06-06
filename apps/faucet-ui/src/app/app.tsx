import { Box } from '@mui/material';
import { StyledNavbar } from '@nyks-workspace/shared-ui';
import { EnvironmentContextProvider } from './context';
import { FaucetUI } from './faucet-page';
import { CHAIN_ID, COSMOS_REST, TENDERMINT_RPC } from '../env';

interface MenuItem {
  label: string;
  onClick: () => void;
}

export function App() {
  const menuItems: MenuItem[] = [
    {
      label: 'Testnet Explorer',
      onClick: () => {
        // Handle home click
      },
    },
  ];

  return (
    <Box>
      <EnvironmentContextProvider>
        <StyledNavbar
          menu={menuItems}
          chainId={CHAIN_ID}
          cosmosRest={COSMOS_REST}
          tendermintRpc={TENDERMINT_RPC}
        />
      </EnvironmentContextProvider>

      <FaucetUI />
    </Box>
  );
}

export default App;
