import { Box, Container, Typography } from '@mui/material';
import { useKeplrWallet } from '@nyks-workspace/hooks';
import RequestSection from './RequestSection';
import { RequestTableSection } from './RequestTableSection';
import { CHAIN_ID, COSMOS_REST, TENDERMINT_RPC } from '../../env';

export const FaucetUI = () => {
  const { getAccountsQuery, keplrConnected } = useKeplrWallet({
    chainId: CHAIN_ID,
    tendermintRpc: TENDERMINT_RPC,
    cosmosRest: COSMOS_REST,
  });

  const twilightAddress = getAccountsQuery.data?.[0].address;

  return (
    <Container>
      <Box display="flex" justifyContent="center">
        <Typography
          variant="h3"
          sx={{
            marginTop: 4,
          }}
        >
          NYKS Faucet
        </Typography>
      </Box>

      <Box display="flex" justifyContent="center">
        <Typography
          variant="body1"
          sx={{
            fontSize: '16px',
            marginTop: 3,
          }}
        >
          Welcome to NYKS Faucet. Here you can request NYKS tokens for testing.
        </Typography>
      </Box>

      <RequestSection
        keplrConnected={keplrConnected}
        twilightAddress={twilightAddress}
      />

      <RequestTableSection
        keplrConnected={keplrConnected}
        twilightAddress={twilightAddress}
      />
    </Container>
  );
};
