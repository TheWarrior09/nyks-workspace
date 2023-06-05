import { Box } from '@mui/material';
import { NavbarTop } from '@nyks-workspace/shared-ui';
import { EnvironmentContextProvider } from './context';

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
        <NavbarTop menu={menuItems} />
      </EnvironmentContextProvider>
    </Box>
  );
}

export default App;
