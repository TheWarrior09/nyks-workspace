import {
  Alert,
  AppBar,
  Box,
  Button,
  IconButton,
  Menu,
  MenuItem,
  Snackbar,
  Toolbar,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import MoreVertIcon from '@mui/icons-material/MoreVert';
import React, { useContext, useState } from 'react';
import { EnvironmentContext } from '../context';
import { useKeplrWallet } from '@nyks-workspace/hooks';
import StyledButton from '../Button';
import router from 'next/router';

export interface MenuItem {
  label: string;
  onClick: () => void;
}

interface StyledNavbarProps {
  menu: MenuItem[];
  chainId: string;
  cosmosRest: string;
  tendermintRpc: string;
  hexAddress: string;
}

const StyledNavbar: React.FC<StyledNavbarProps> = ({
  menu,
  chainId: CHAIN_ID,
  cosmosRest: COSMOS_REST,
  tendermintRpc: TENDERMINT_RPC,
  hexAddress,
}) => {
  const { Link } = useContext(EnvironmentContext);

  const { connectKeplr, getAccountsQuery, keplrConnected, disconnectKeplr } =
    useKeplrWallet({
      chainId: CHAIN_ID,
      tendermintRpc: TENDERMINT_RPC,
      cosmosRest: COSMOS_REST,
    });

  const twilightAddress = getAccountsQuery.data?.[0].address ?? '';

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.up('sm'));
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleConnectWallet = async () => {
    await connectKeplr();
  };

  const handleDisconnectWallet = async () => {
    await disconnectKeplr();
  };

  const handleRouteAccountPage = () => {
    router.push(`/wallet`);
  };
  return (
    <AppBar
      position="static"
      color="transparent"
      sx={{ borderBottom: '0.5px solid #E3EDF9' }}
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
          <>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              {/* <Typography mr={3} variant="body2">
                Quisquis Address:{' '}
                {truncate(
                  '2c165fa31e1ca1424a178941a90516cef3ff6bd9b7dc6c833dd079f3f5cfe04d58d46d4bb94f32ecd66d85e29698bbac8cb050d6b8e3ef613b39ff56be09ca924433d66b56',
                  14
                )}
              </Typography> */}

              <TruncatableCopyableText text={hexAddress} maxLength={14} />

              <Typography mr={3} variant="body2">
                Twilight Address: {truncate(twilightAddress, 18)}
              </Typography>
            </Box>

            <StyledButton handleConnectWallet={handleRouteAccountPage}>
              Account
            </StyledButton>
            <StyledButton handleConnectWallet={handleDisconnectWallet}>
              Disconnect Wallet
            </StyledButton>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default StyledNavbar;

const truncate = (str: string, n: number) => {
  if (str.length <= n) {
    return str;
  }
  const edge = Math.floor(n / 2);
  return str.slice(0, edge) + '...' + str.slice(-edge);
};

const TruncatableCopyableText1 = ({
  text,
  maxLength,
}: {
  text: string;
  maxLength: number;
}) => {
  const [isFullTextVisible, setIsFullTextVisible] = useState(false);

  const toggleFullText = () => {
    setIsFullTextVisible((prev: any) => !prev);
  };

  const truncatedText = isFullTextVisible ? text : truncate(text, maxLength);

  const copyText = () => {
    navigator.clipboard.writeText(text);
  };
  return (
    <Typography
      variant="body2"
      component="span"
      style={{ cursor: 'pointer' }}
      onClick={toggleFullText}
    >
      Quisquis Address:{' '}
      <span style={{ textDecoration: 'underline' }} onClick={copyText}>
        {truncatedText}
      </span>
    </Typography>
  );
};

const TruncatableCopyableText2 = ({
  text,
  maxLength,
}: {
  text: string;
  maxLength: number;
}) => {
  const copyText = () => {
    navigator.clipboard.writeText(text);
  };

  return (
    <Typography
      variant="body2"
      component="span"
      style={{
        cursor: 'pointer',
        // textDecoration: 'underline'
      }}
      onClick={copyText}
    >
      Quisquis Address: {truncate(text, maxLength)}
    </Typography>
  );
};

const TruncatableCopyableText3 = ({
  text,
  maxLength,
}: {
  text: string;
  maxLength: number;
}) => {
  const [isCopied, setIsCopied] = useState(false);

  const copyText = () => {
    navigator.clipboard.writeText(text);
    setIsCopied(true);

    // Reset the copied state after a brief delay (for visual feedback)
    setTimeout(() => {
      setIsCopied(false);
    }, 2000);
  };

  return (
    <div>
      <Typography
        variant="body2"
        component="span"
        style={{ cursor: 'pointer', textDecoration: 'underline' }}
        onClick={copyText}
      >
        Quisquis Address: {truncate(text, maxLength)}
      </Typography>
      <Snackbar
        open={isCopied}
        autoHideDuration={2000}
        onClose={() => setIsCopied(false)}
      >
        <Alert
          elevation={6}
          variant="filled"
          onClose={() => setIsCopied(false)}
          severity="success"
        >
          Text Copied!
        </Alert>
      </Snackbar>
    </div>
  );
};

const TruncatableCopyableText4 = ({
  text,
  maxLength,
}: {
  text: string;
  maxLength: number;
}) => {
  const [isCopied, setIsCopied] = useState(false);

  const copyText = () => {
    navigator.clipboard.writeText(text);
    setIsCopied(true);

    // Reset the copied state after a brief delay (for visual feedback)
    setTimeout(() => {
      setIsCopied(false);
    }, 2000);
  };

  return (
    <div>
      <Typography
        variant="body2"
        component="span"
        style={{
          cursor: 'pointer',
          textDecoration: 'underline',
          userSelect: 'none', // Prevent accidental selection
        }}
        onClick={copyText}
      >
        <span title="Click to Copy" style={{ cursor: 'pointer' }}>
          Quisquis Address: {truncate(text, maxLength)}
        </span>
      </Typography>
      <Snackbar
        open={isCopied}
        autoHideDuration={2000}
        onClose={() => setIsCopied(false)}
      >
        <Alert
          elevation={6}
          variant="filled"
          onClose={() => setIsCopied(false)}
          severity="success"
        >
          Text Copied!
        </Alert>
      </Snackbar>
    </div>
  );
};

const TruncatableCopyableText = ({
  text,
  maxLength,
}: {
  text: string;
  maxLength: number;
}) => {
  const [isCopied, setIsCopied] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const copyText = () => {
    navigator.clipboard.writeText(text);
    setIsCopied(true);

    // Reset the copied state after a brief delay (for visual feedback)
    setTimeout(() => {
      setIsCopied(false);
    }, 2000);
  };

  return (
    <div>
      <Typography
        variant="body2"
        component="span"
        style={{
          cursor: 'pointer',
          textDecoration: isHovered ? 'underline' : 'none',
          // color: isHovered ? 'blue' : 'inherit',
          transition: 'color 0.2s',
        }}
        onClick={copyText}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
      >
        Quisquis Address: {truncate(text, maxLength)}
      </Typography>
      <Snackbar
        open={isCopied}
        autoHideDuration={2000}
        onClose={() => setIsCopied(false)}
      >
        <Alert
          elevation={6}
          variant="filled"
          onClose={() => setIsCopied(false)}
          severity="success"
        >
          Text Copied!
        </Alert>
      </Snackbar>
    </div>
  );
};
