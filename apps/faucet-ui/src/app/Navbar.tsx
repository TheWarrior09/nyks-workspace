import {
  AppBar,
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Toolbar,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import React from 'react';
// import { EnvironmentContext } from '../context';
import { useKeplrWallet } from '@nyks-workspace/hooks';
import { Link } from '@mui/material';

export interface MenuItem {
  label: string;
  onClick: () => void;
}

interface StyledNavbarProps {
  menu: MenuItem[];
  chainId: string;
  cosmosRest: string;
  tendermintRpc: string;
}

const StyledNavbar: React.FC<StyledNavbarProps> = ({
  menu,
  chainId: CHAIN_ID,
  cosmosRest: COSMOS_REST,
  tendermintRpc: TENDERMINT_RPC,
}) => {
  //   const { Link } = useContext(EnvironmentContext);

  const { connectKeplr, keplrConnected, disconnectKeplr } = useKeplrWallet({
    chainId: CHAIN_ID,
    tendermintRpc: TENDERMINT_RPC,
    cosmosRest: COSMOS_REST,
  });

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.up('sm'));
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleConnectWallet = () => {
    connectKeplr();
  };

  const handleDisconnectWallet = () => {
    disconnectKeplr();
  };
  return (
    <AppBar
      position="static"
      color="transparent"
      sx={{ borderBottom: '1px solid #E3EDF9' }}
    >
      <Toolbar sx={{ display: 'flex', justifyContent: 'space-between' }}>
        <Box
          sx={{ display: 'flex', alignItems: 'center' }}
          component={Link}
          href={`/`}
        >
          <Box
            component="img"
            src="/Twilight-logo.png"
            alt="Twilight Logo"
            sx={{ width: '100px' }}
          />
        </Box>

        {!isMobile ? (
          <>
            <IconButton
              color="inherit"
              aria-label="menu"
              onClick={handleMenuOpen}
              sx={{ display: 'flex', justifyContent: 'end' }}
            >
              <MoreVertIcon />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
              {menu.map((item) => (
                <MenuItem key={item.label} onClick={item.onClick}>
                  {item.label}
                </MenuItem>
              ))}
            </Menu>
          </>
        ) : (
          <Box sx={{ flexGrow: 1, display: 'flex', justifyContent: 'center' }}>
            {menu.map((item) => (
              <Button
                key={item.label}
                color="inherit"
                onClick={item.onClick}
                sx={{ marginLeft: 2 }}
              >
                {item.label}
              </Button>
            ))}
          </Box>
        )}

        {!keplrConnected ? (
          <StyledButton handleConnectWallet={handleConnectWallet}>
            Connect Wallet
          </StyledButton>
        ) : (
          <StyledButton handleConnectWallet={handleDisconnectWallet}>
            Disconnect Wallet
          </StyledButton>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default StyledNavbar;

interface StyledButtonProps {
  handleConnectWallet: () => void;
  children: React.ReactNode;
  className?: string;
  disabled?: boolean;
  type?: 'submit' | 'reset' | 'button';
  variant?: 'text' | 'outlined' | 'contained';
  color?: 'inherit' | 'primary' | 'secondary';
  size?: 'small' | 'medium' | 'large';
  fullWidth?: boolean;
  startIcon?: React.ReactNode;
  endIcon?: React.ReactNode;
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  href?: string;
  target?: string;
  rel?: string;
  style?: React.CSSProperties;
  ref?: React.Ref<unknown>;
  tabIndex?: number;
  loading?: boolean;
  loadingPosition?: 'start' | 'end';
  loadingIndicator?: React.ReactNode;
  disableElevation?: boolean;
}

const StyledButton: React.FC<StyledButtonProps> = ({
  handleConnectWallet,
  children,
  ...rest
}) => {
  return (
    <Button
      variant="outlined"
      sx={{ borderRadius: 5, textTransform: 'none' }}
      onClick={handleConnectWallet}
      //   sx={{ ml: 2 }}
    >
      {children}
    </Button>
  );
};
