import {
  Box,
  Button,
  Container,
  Grid,
  Skeleton,
  ToggleButton,
  Tooltip,
  Typography,
} from '@mui/material';
import { useKeplrWallet } from '@nyks-workspace/hooks';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import CurrencyBitcoinIcon from '@mui/icons-material/CurrencyBitcoin';
import LoginIcon from '@mui/icons-material/Login';
import { useContext, useState } from 'react';
import {
  CHAIN_ID,
  COSMOS_REST,
  NYKS_EXPLORER,
  TENDERMINT_RPC,
} from '../constants';
import { WithdrawModal } from '../src/modules/wallet/components/WithdrawModal';
import {
  connectSnap,
  getSnap,
  // isLocalSnap,
} from '../src/modules/metamask-wallet/utils';
import {
  MetaMaskContext,
  MetamaskActions,
} from '../src/modules/metamask-wallet/hooks';
import { TradingAccount } from '../src/modules/metamask-wallet/components/TradingAccount';
import TransferModal from '../src/modules/metamask-wallet/components/TransferModal';
import { useQueryGetTradingAccounts } from '../src/modules/metamask-wallet/hooks/useQueryZkos';

const Wallet = () => {
  const [state, dispatch] = useContext(MetaMaskContext);
  const isMetaMaskReady = state.installedSnap;
  // const isMetaMaskReady = isLocalSnap(defaultSnapOrigin)
  // ? state.isFlask
  // : state.snapsDetected;

  const {
    getAccountsQuery,
    keplrConnected,
    getBtcBalanceOnNYKS,
    getNyksBalanceOnNYKS,
  } = useKeplrWallet({
    chainId: CHAIN_ID,
    tendermintRpc: TENDERMINT_RPC,
    cosmosRest: COSMOS_REST,
  });

  const twilightAddress = getAccountsQuery.data?.[0].address;

  const [selectedTransferDialog, setSelectedTransferDialog] = useState(false);
  const [selectedWithdrawDialog, setSelectedWithdrawDialog] = useState(false);

  const handleCloseTransferDialog = () => {
    setSelectedTransferDialog(false);
  };

  const handleCloseWithdrawDialog = () => {
    setSelectedWithdrawDialog(false);
  };

  const tradingAccountsQuery = useQueryGetTradingAccounts(
    twilightAddress ?? ''
  );

  const tradingAccountBalance =
    tradingAccountsQuery.status === 'success'
      ? tradingAccountsQuery.data.reduce(
          (accumulator: number, currentValue) => {
            const btcValue = Number(currentValue.value);
            return accumulator + btcValue;
          },
          0
        )
      : undefined;

  const handleConnectClick = async () => {
    try {
      await connectSnap();
      const installedSnap = await getSnap();

      dispatch({
        type: MetamaskActions.SetInstalled,
        payload: installedSnap,
      });
    } catch (error) {
      console.error(error);
      dispatch({ type: MetamaskActions.SetError, payload: error });
    }
  };

  return (
    <>
      {keplrConnected ? (
        <Container>
          <Typography
            variant="h5"
            sx={{
              marginTop: 4,
            }}
          >
            Assets Overview
          </Typography>

          <Grid container spacing={2}>
            <Grid item xs={8}>
              <Box mb={5}>
                <Typography
                  variant="h6"
                  component="div"
                  color="text.secondary"
                  mt={2}
                  mb={2}
                >
                  0.00 USD
                </Typography>

                <Typography
                  variant="body1"
                  component="div"
                  color="text.secondary"
                  mt={2}
                  mb={2}
                >
                  ~0.0001 BTC
                </Typography>

                <Typography
                  variant="body1"
                  component="div"
                  color="text.secondary"
                  mt={2}
                  mb={2}
                >
                  IM{' '}
                  <Skeleton
                    animation={false}
                    width={150}
                    sx={{ display: 'inline-block' }}
                  ></Skeleton>{' '}
                  0.00% 0.0000 USD
                </Typography>

                <Typography
                  variant="body1"
                  component="div"
                  color="text.secondary"
                  mt={2}
                  mb={2}
                >
                  MM{' '}
                  <Skeleton
                    animation={false}
                    width={150}
                    sx={{ display: 'inline-block' }}
                  ></Skeleton>{' '}
                  0.00% 0.0000 USD
                </Typography>
              </Box>
            </Grid>

            <Grid item xs={4}>
              <Button
                variant="contained"
                sx={{ mr: 2 }}
                href={`${NYKS_EXPLORER}/btc-bridge`}
                target="blank"
              >
                Deposit
              </Button>

              <Button
                variant="contained"
                sx={{ mr: 2 }}
                disabled={true}
                onClick={() => {
                  // setSelectedWithdrawDialog(true);
                }}
              >
                Withdraw
              </Button>

              <Button
                variant="contained"
                sx={{ mr: 2 }}
                disabled={!isMetaMaskReady}
                onClick={() => {
                  setSelectedTransferDialog(true);
                }}
              >
                Transfer
              </Button>
            </Grid>
          </Grid>

          <Box>
            <Typography
              variant="h6"
              component="div"
              color="text.secondary"
              mt={2}
              mb={2}
            >
              My Assets:
            </Typography>

            <Grid container spacing={2}>
              <Grid item xs={4}>
                <Box display="flex" alignItems="center">
                  <SwapHorizIcon sx={{ mr: 2 }} />
                  <Typography variant="h6" color="text.secondary" mt={2} mb={2}>
                    Funding
                  </Typography>
                </Box>
              </Grid>

              <Grid item xs={2}>
                <Typography
                  variant="h6"
                  color="text.secondary"
                  mt={2}
                  mb={2}
                  textAlign={'center'}
                >
                  {getBtcBalanceOnNYKS()} SATS
                </Typography>
              </Grid>

              <Grid item xs={2}>
                <Typography
                  variant="h6"
                  color="text.secondary"
                  mt={2}
                  mb={2}
                  textAlign={'center'}
                >
                  {getNyksBalanceOnNYKS()} nyks
                </Typography>
              </Grid>

              <Grid item xs={4}>
                <>
                  <Tooltip title="Withdraw Bitcoin" arrow placement="top">
                    <span>
                      <ToggleButton
                        value="check"
                        selected={selectedWithdrawDialog}
                        onChange={() => {
                          setSelectedWithdrawDialog(!selectedWithdrawDialog);
                        }}
                      >
                        <CurrencyBitcoinIcon />
                      </ToggleButton>
                    </span>
                  </Tooltip>

                  <Tooltip
                    title="Transfer between accounts"
                    arrow
                    placement="top"
                  >
                    <span>
                      <ToggleButton
                        value="check"
                        selected={selectedTransferDialog}
                        disabled={!isMetaMaskReady}
                        onChange={() => {
                          setSelectedTransferDialog(!selectedTransferDialog);
                        }}
                      >
                        <SwapHorizIcon />
                      </ToggleButton>
                    </span>
                  </Tooltip>
                </>
              </Grid>
            </Grid>

            <Grid container spacing={2}>
              <Grid item xs={4}>
                <Box display="flex" alignItems="center">
                  <CurrencyBitcoinIcon sx={{ mr: 2 }} />
                  <Typography variant="h6" color="text.secondary" mt={2} mb={2}>
                    Trading
                  </Typography>
                </Box>
              </Grid>

              <Grid item xs={2}>
                <Typography
                  variant="h6"
                  color="text.secondary"
                  mt={2}
                  mb={2}
                  textAlign={'center'}
                >
                  {isMetaMaskReady
                    ? `${tradingAccountBalance ?? '0'} SATS`
                    : '-'}
                </Typography>
              </Grid>

              <Grid item xs={2}></Grid>

              <Grid item xs={4}>
                <>
                  <Tooltip title="Activate Trading Account" arrow>
                    <span>
                      <ToggleButton
                        value="check"
                        disabled={!!isMetaMaskReady}
                        onChange={handleConnectClick}
                      >
                        <LoginIcon />
                      </ToggleButton>
                    </span>
                  </Tooltip>

                  {selectedTransferDialog ? (
                    <TransferModal
                      onClose={handleCloseTransferDialog}
                      open={selectedTransferDialog}
                      twilightAddress={twilightAddress ?? ''}
                    />
                  ) : null}

                  <WithdrawModal
                    open={selectedWithdrawDialog}
                    onClose={handleCloseWithdrawDialog}
                  />
                </>
              </Grid>
            </Grid>
          </Box>

          {state.installedSnap ? <TradingAccount /> : null}
        </Container>
      ) : (
        <Container>
          <Typography
            variant="h5"
            sx={{
              marginTop: 4,
            }}
          >
            Please connect keplr wallet
          </Typography>
        </Container>
      )}
    </>
  );
};

export default Wallet;
