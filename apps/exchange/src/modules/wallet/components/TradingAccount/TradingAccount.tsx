import { Box, Typography, CircularProgress, Button } from '@mui/material';
import TradingAccountList from '../TradingAccountList';
import TransactionList from '../TransactionList';
import { useKeplrWallet } from '@nyks-workspace/hooks';
import {
  CHAIN_ID,
  TENDERMINT_RPC,
  COSMOS_REST,
} from '../../../../../constants';
import { useGlobalContext } from '../../../../..//src/context';
import { useQueryGetTradingAccounts } from '../../hooks/useQueryZkos';

const TradingAccountSection = () => {
  const { hexAddress, signature } = useGlobalContext();

  const { getAccountsQuery } = useKeplrWallet({
    chainId: CHAIN_ID,
    tendermintRpc: TENDERMINT_RPC,
    cosmosRest: COSMOS_REST,
  });

  const twilightAddress = getAccountsQuery.data?.[0].address;

  const tradingAccountsQuery = useQueryGetTradingAccounts(
    signature ?? '',
    twilightAddress ?? ''
  );

  return (
    <>
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
    </>
  );
};

export default TradingAccountSection;
