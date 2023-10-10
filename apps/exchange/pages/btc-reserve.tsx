import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Container,
  Divider,
  Grid,
  List,
  ListItem,
  ListItemText,
  Paper,
  Typography,
} from '@mui/material';
import { useBtcReserveQuery } from '../src/modules/wallet/hooks/useQueryBlockchain';

const BtcReserve = () => {
  const btcReserveQuery = useBtcReserveQuery();

  return (
    <Container>
      <Typography
        variant="h5"
        sx={{
          my: 4,
        }}
      >
        Bitcoin Reserves
      </Typography>

      <section>
        {btcReserveQuery.status === 'success' ? (
          <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
            <Grid container spacing={2}>
              {btcReserveQuery.data.BtcReserves.map((item) => (
                <Grid item xs={6} sm={6} md={6} key={item.ReserveId}>
                  <Card sx={{ minWidth: 500 }}>
                    <CardHeader title={`ID: ${item.ReserveId}`} />
                    <Divider />
                    <CardContent>
                      <Paper variant="outlined">
                        <List dense>
                          <ListItem divider>
                            <ListItemText
                              primary="ReserveAddress: "
                              secondary={item.ReserveAddress}
                              secondaryTypographyProps={{
                                sx: { wordBreak: 'break-all' },
                              }}
                            />
                          </ListItem>

                          <ListItem divider>
                            <ListItemText
                              primary="JudgeAddress: "
                              secondary={item.JudgeAddress}
                              secondaryTypographyProps={{
                                sx: { wordBreak: 'break-all' },
                              }}
                            />
                          </ListItem>

                          <ListItem divider>
                            <ListItemText
                              primary="BtcRelayCapacityValue: "
                              secondary={item.BtcRelayCapacityValue}
                              secondaryTypographyProps={{
                                sx: { wordBreak: 'break-all' },
                              }}
                            />
                          </ListItem>

                          <ListItem divider>
                            <ListItemText
                              primary="TotalValue: "
                              secondary={item.TotalValue}
                              secondaryTypographyProps={{
                                sx: { wordBreak: 'break-all' },
                              }}
                            />
                          </ListItem>

                          <ListItem divider>
                            <ListItemText
                              primary="PrivatePoolValue: "
                              secondary={item.PrivatePoolValue}
                              secondaryTypographyProps={{
                                sx: { wordBreak: 'break-all' },
                              }}
                            />
                          </ListItem>

                          <ListItem divider>
                            <ListItemText
                              primary="PublicValue: "
                              secondary={item.PublicValue}
                              secondaryTypographyProps={{
                                sx: { wordBreak: 'break-all' },
                              }}
                            />
                          </ListItem>

                          <ListItem divider>
                            <ListItemText
                              primary="UnlockHeight: "
                              secondary={item.UnlockHeight}
                              secondaryTypographyProps={{
                                sx: { wordBreak: 'break-all' },
                              }}
                            />
                          </ListItem>

                          <ListItem>
                            <ListItemText
                              primary="RoundId: "
                              secondary={item.RoundId}
                              secondaryTypographyProps={{
                                sx: { wordBreak: 'break-all' },
                              }}
                            />
                          </ListItem>
                        </List>
                      </Paper>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </Box>
        ) : (
          <Typography>Loading...</Typography>
        )}
      </section>
    </Container>
  );
};

export default BtcReserve;
