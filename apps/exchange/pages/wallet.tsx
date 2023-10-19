import {
  Box,
  Button,
  CircularProgress,
  Container,
  Grid,
  Skeleton,
  ToggleButton,
  Tooltip,
  Typography,
} from '@mui/material';
import { signArbitraryMessage, useKeplrWallet } from '@nyks-workspace/hooks';
import SwapHorizIcon from '@mui/icons-material/SwapHoriz';
import CurrencyBitcoinIcon from '@mui/icons-material/CurrencyBitcoin';
import LoginIcon from '@mui/icons-material/Login';
import { useState } from 'react';

import {
  CHAIN_ID,
  COSMOS_REST,
  NYKS_EXPLORER,
  SIGN_IN_MESSAGE,
  TENDERMINT_RPC,
} from '../constants';
import { useGlobalContext } from '../src/context';
import { generatePublicKey } from '../src/modules/wallet/zkos';
import { TransferModal, TradingAccountList } from '../src/modules/wallet';
import { generatePublicKeyHexAddress } from '../src/modules/wallet/zkos/accountManagement';
import { WithdrawModal } from '../src/modules/wallet/components/WithdrawModal';
import TransactionList from '../src/modules/wallet/components/TransactionList';
import { useQueryGetTradingAccounts } from '../src/modules/wallet/hooks/useQueryZkos';

const Wallet = () => {
  const { hexAddress, setHexAddress, setSignature, signature } =
    useGlobalContext();

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

  const handleSignMessageThroughKeplr = async () => {
    if (!twilightAddress) return;
    const { signature } = await signArbitraryMessage(
      CHAIN_ID,
      twilightAddress,
      SIGN_IN_MESSAGE
    );
    setSignature(signature);

    const publicKey = await generatePublicKey({
      signature,
    });

    const hexAddress = await generatePublicKeyHexAddress({ publicKey });
    setHexAddress(hexAddress);
  };

  const tradingAccountsQuery = useQueryGetTradingAccounts(
    signature ?? '',
    twilightAddress ?? ''
  );

  const tradingAccountBalance =
    tradingAccountsQuery.status === 'success' &&
    tradingAccountsQuery.data.reduce((accumulator: number, currentValue) => {
      const btcValue = Number(currentValue.value);
      return accumulator + btcValue;
    }, 0);

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
                onClick={() => {
                  // setSelectedWithdrawDialog(true);
                }}
              >
                Withdraw
              </Button>

              <Button
                variant="contained"
                sx={{ mr: 2 }}
                onClick={() => {
                  // setSelectedTransferDialog(true);
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
                <Typography variant="h6" color="text.secondary" mt={2} mb={2}>
                  {getBtcBalanceOnNYKS()} SATS
                </Typography>
              </Grid>

              <Grid item xs={2}>
                <Typography variant="h6" color="text.secondary" mt={2} mb={2}>
                  {getNyksBalanceOnNYKS()} nyks
                </Typography>
              </Grid>

              <Grid item xs={4}>
                <>
                  <Tooltip title="Withdraw Bitcoin" arrow placement="top">
                    <ToggleButton
                      value="check"
                      selected={selectedWithdrawDialog}
                      onChange={() => {
                        setSelectedWithdrawDialog(!selectedWithdrawDialog);
                      }}
                    >
                      <CurrencyBitcoinIcon />
                    </ToggleButton>
                  </Tooltip>

                  <Tooltip
                    title="Transfer between accounts"
                    arrow
                    placement="top"
                  >
                    <ToggleButton
                      value="check"
                      selected={selectedTransferDialog}
                      disabled={!hexAddress}
                      onChange={() => {
                        setSelectedTransferDialog(!selectedTransferDialog);
                      }}
                    >
                      <SwapHorizIcon />
                    </ToggleButton>
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

              <Grid item xs={4}>
                <>
                  <Typography variant="h6" color="text.secondary" mt={2} mb={2}>
                    {tradingAccountBalance ?? '0'} SATS
                  </Typography>
                </>
              </Grid>

              <Grid item xs={4}>
                <>
                  <Tooltip title="Activate Trading Account" arrow>
                    <ToggleButton
                      value="check"
                      disabled={!!hexAddress}
                      onChange={handleSignMessageThroughKeplr}
                    >
                      <LoginIcon />
                    </ToggleButton>
                  </Tooltip>

                  {selectedTransferDialog && hexAddress ? (
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

          {hexAddress ? (
            <Box mt={3}>
              <Typography
                variant="h5"
                gutterBottom
                component="div"
                align="left"
                sx={{ my: 3 }}
              >
                Trading Accounts{' '}
                {tradingAccountsQuery.status === 'success' &&
                tradingAccountsQuery.fetchStatus === 'fetching' ? (
                  <CircularProgress size={20} />
                ) : null}
              </Typography>

              <Button
                variant="contained"
                onClick={() => {
                  console.log('sync');
                  tradingAccountsQuery.refetch();
                }}
                sx={{ mb: 3 }}
                disabled={tradingAccountsQuery.isFetching}
              >
                Sync Accounts
              </Button>

              <TradingAccountList twilightAddress={twilightAddress ?? ''} />
            </Box>
          ) : null}

          {hexAddress ? (
            <Box mt={3}>
              <Typography
                variant="h5"
                gutterBottom
                component="div"
                align="left"
                sx={{ my: 3 }}
              >
                Transaction List
              </Typography>

              <TransactionList twilightAddress={twilightAddress ?? ''} />
            </Box>
          ) : null}
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
