import { AxiosError } from 'axios';
import {
  Box,
  Button,
  Card,
  Grid,
  List,
  ListItem,
  ListItemText,
  Typography,
} from '@mui/material';
import { usePostRequestFaucet } from './hooks';
import { FAUCET_ENDPOINT, TRANSFER_AMOUNT } from '../../env';

interface RequestSectionProps {
  keplrConnected: boolean;
  twilightAddress: string | undefined;
}

const RequestSection = ({
  keplrConnected,
  twilightAddress,
}: RequestSectionProps) => {
  const { mutate, data, error, status } = usePostRequestFaucet(FAUCET_ENDPOINT);

  const handleFaucetRequest = async () => {
    if (!twilightAddress) return;
    mutate({ address: twilightAddress });
  };

  return (
    <Grid container component="section" spacing={2} mt={0}>
      <Grid item xs={6} sx={{ my: 2 }}>
        <Card
          variant="outlined"
          sx={{
            p: 2,
            height: '100%',
          }}
        >
          <Typography variant="body1" align="center" fontWeight={700}>
            Step: 1
          </Typography>
          {!keplrConnected ? (
            <Typography variant="body1" align="center" mt={2}>
              Connect Your Wallet to Start Using NYKS Faucet
            </Typography>
          ) : (
            <>
              <Typography
                variant="body1"
                component={'div'}
                align="center"
                mt={2}
              >
                Your testnet address:
                <Typography
                  fontStyle={'italic'}
                  fontSize="25px"
                  sx={{ backgroundColor: '#fff', fontSize: '30px' }}
                ></Typography>{' '}
                {twilightAddress}
              </Typography>

              <List dense disablePadding>
                <ListItem>
                  <ListItemText
                    primaryTypographyProps={{ sx: { fontWeight: 700 } }}
                  >
                    Note:
                  </ListItemText>
                </ListItem>
                <ListItem>
                  <ListItemText>
                    THE TESTNET TOKENS ARE NOT REAL FUNDS. The service is only
                    for developers who need to build and test.
                  </ListItemText>
                </ListItem>
                <ListItem>
                  <ListItemText>
                    Due to limited resources, One request per 30 minute is
                    allowed.
                  </ListItemText>
                </ListItem>
              </List>
            </>
          )}
        </Card>
      </Grid>

      <Grid item xs={6} sx={{ my: 2 }}>
        <Card
          variant="outlined"
          sx={{
            p: 2,
            height: '100%',
          }}
        >
          <Typography variant="body1" align="center" fontWeight={700}>
            Step: 2
          </Typography>

          <Typography variant="body1" align="center" mt={2}>
            Get {TRANSFER_AMOUNT} NYKS testnet tokens from Faucet
          </Typography>

          <Box
            display="flex"
            flexDirection="column"
            alignItems="center"
            justifyContent="center"
            mt={2}
          >
            <Button
              variant="outlined"
              sx={{
                borderRadius: 5,
                textTransform: 'none',
              }}
              onClick={handleFaucetRequest}
              disabled={status === 'loading' || !keplrConnected}
            >
              Request Token
            </Button>
          </Box>

          {status === 'error' && error instanceof AxiosError ? (
            <Typography sx={{ mt: 2 }} variant="body2" align="center">
              {error.response?.data.message}
            </Typography>
          ) : null}

          {status === 'success' ? (
            <Typography sx={{ mt: 2 }} variant="body2" align="center">
              {data.data.message}
            </Typography>
          ) : null}
        </Card>
      </Grid>
    </Grid>
  );
};

export default RequestSection;
