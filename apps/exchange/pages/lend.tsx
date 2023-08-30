import {
  Container,
  Typography,
  Grid,
  Box,
  Skeleton,
  Button,
  Card,
  Divider,
} from '@mui/material';

const lend = () => {
  return (
    <section>
      <Container>
        <Typography
          variant="h4"
          sx={{
            marginTop: 4,
          }}
        >
          Add Liquidity
        </Typography>

        <Typography
          variant="body1"
          component="div"
          color="text.secondary"
          mt={2}
          mb={2}
        >
          Deposit Bitcoin into liquidity pool to earn fees.
        </Typography>

        <Grid container spacing={2}>
          <Grid item xs={7}>
            <Card sx={{ height: '100%' }}>
              <Typography
                variant="h6"
                component="div"
                color="text.secondary"
                //   mt={2}
                //   mb={2}
                sx={{ p: 2 }}
              >
                Current Position
              </Typography>

              <Divider />

              <Grid container sx={{ px: 2, py: 1 }}>
                <Grid item xs={6}>
                  <Typography
                    variant="body1"
                    component="div"
                    color="text.secondary"
                  >
                    BTC Price
                  </Typography>
                </Grid>
                <Grid
                  item
                  xs={6}
                  sx={{ display: 'flex', justifyContent: 'flex-end' }}
                >
                  <Typography
                    variant="body1"
                    component="div"
                    color="text.secondary"
                  >
                    $30000
                  </Typography>
                </Grid>
              </Grid>

              <Grid container sx={{ px: 2, py: 1 }}>
                <Grid item xs={6}>
                  <Typography
                    variant="body1"
                    component="div"
                    color="text.secondary"
                  >
                    Total Deposits
                  </Typography>
                </Grid>
                <Grid
                  item
                  xs={6}
                  sx={{ display: 'flex', justifyContent: 'flex-end' }}
                >
                  <Typography
                    variant="body1"
                    component="div"
                    color="text.secondary"
                  >
                    1.000 BTC ($30000)
                  </Typography>
                </Grid>
              </Grid>

              <Grid container sx={{ px: 2, py: 1 }}>
                <Grid item xs={6}>
                  <Typography
                    variant="body1"
                    component="div"
                    color="text.secondary"
                  >
                    Reward Earn
                  </Typography>
                </Grid>
                <Grid
                  item
                  xs={6}
                  sx={{ display: 'flex', justifyContent: 'flex-end' }}
                >
                  <Typography
                    variant="body1"
                    component="div"
                    color="text.secondary"
                  >
                    0.100 BTC ($3000)
                  </Typography>
                </Grid>
              </Grid>

              <Divider />

              <Grid container sx={{ px: 2, py: 1 }}>
                <Grid item xs={6}>
                  <Typography
                    variant="body1"
                    component="div"
                    color="text.secondary"
                  >
                    APR
                  </Typography>
                </Grid>
                <Grid
                  item
                  xs={6}
                  sx={{ display: 'flex', justifyContent: 'flex-end' }}
                >
                  <Typography
                    variant="body1"
                    component="div"
                    color="text.secondary"
                  >
                    10.37%
                  </Typography>
                </Grid>
              </Grid>

              <Grid container sx={{ px: 2, py: 1 }}>
                <Grid item xs={6}>
                  <Typography
                    variant="body1"
                    component="div"
                    color="text.secondary"
                  >
                    Percentage of pool
                  </Typography>
                </Grid>
                <Grid
                  item
                  xs={6}
                  sx={{ display: 'flex', justifyContent: 'flex-end' }}
                >
                  <Typography
                    variant="body1"
                    component="div"
                    color="text.secondary"
                  >
                    0.28%
                  </Typography>
                </Grid>
              </Grid>
            </Card>
          </Grid>

          <Grid item xs={5}>
            <Card>
              <Grid container spacing={2} sx={{ px: 2, py: 1 }}>
                <Grid item xs={6}>
                  <Button variant="contained" fullWidth color="info">
                    Deposit
                  </Button>
                </Grid>
                <Grid item xs={6}>
                  <Button variant="contained" fullWidth>
                    Withdraw
                  </Button>
                </Grid>
              </Grid>

              <Card elevation={5} sx={{ m: 2 }}>
                <Grid container sx={{ px: 2, py: 1 }}>
                  <Grid item xs={6}>
                    <Typography
                      variant="body1"
                      component="div"
                      color="text.secondary"
                    >
                      Deposit: $30000
                    </Typography>
                  </Grid>
                  <Grid
                    item
                    xs={6}
                    sx={{ display: 'flex', justifyContent: 'flex-end' }}
                  >
                    <Typography
                      variant="body1"
                      component="div"
                      color="text.secondary"
                    >
                      Balance: 5.000
                    </Typography>
                  </Grid>
                </Grid>

                <Grid container sx={{ px: 2, pt: 1, pb: 2 }}>
                  <Grid item xs={6}>
                    <Typography
                      variant="h6"
                      component="div"
                      color="text.secondary"
                    >
                      1
                    </Typography>
                  </Grid>
                  <Grid
                    item
                    xs={6}
                    sx={{ display: 'flex', justifyContent: 'flex-end' }}
                  >
                    <Button size="small" variant="contained" color="info">
                      Max
                    </Button>
                    <Typography
                      variant="body1"
                      component="span"
                      color="text.secondary"
                      sx={{ ml: 2 }}
                    >
                      BTC
                    </Typography>
                  </Grid>
                </Grid>
              </Card>

              <Grid container sx={{ px: 2, pt: 1 }}>
                <Grid item xs={6}>
                  <Typography
                    variant="body1"
                    component="div"
                    color="text.secondary"
                  >
                    Fee
                  </Typography>
                </Grid>
                <Grid
                  item
                  xs={6}
                  sx={{ display: 'flex', justifyContent: 'flex-end' }}
                >
                  <Typography
                    variant="body1"
                    component="div"
                    color="text.secondary"
                  >
                    0.18%
                  </Typography>
                </Grid>
              </Grid>

              <Typography
                variant="body1"
                component="div"
                color="text.secondary"
                sx={{ p: 2 }}
              >
                Please not that funds deposited to the liquidity pool will not
                be available for spending until the fund has been withdraw. All
                the deposits and withdrawals can be found on Liquidity pool page
                under the section {'"'}Lending History{'"'}, or on the Funds{' '}
                {'>'} Account History page
              </Typography>

              <Button variant="contained" fullWidth sx={{ m: 2 }} color="info">
                Deposit
              </Button>
            </Card>
          </Grid>
        </Grid>
      </Container>

      <Container>
        <Typography
          variant="h5"
          gutterBottom
          component="div"
          align="left"
          sx={{ my: 3 }}
        >
          Lending History
        </Typography>
        <TableComponent
          handleChangePage={() => {
            console.log('object');
          }}
          handleChangeRowsPerPage={() => {
            console.log('object');
          }}
          page={1}
          requestList={{} as any}
          rowsPerPage={5}
          title="Lending History"
        />
      </Container>

      <Container sx={{ mb: 7 }}>
        <Typography
          variant="h5"
          gutterBottom
          component="div"
          align="left"
          sx={{ my: 3 }}
        >
          Liquidity Pool Status
        </Typography>

        <Grid container spacing={3}>
          <Grid item xs={6}>
            <Card sx={{ pb: 2 }}>
              <Typography
                variant="h6"
                component="div"
                color="text.secondary"
                sx={{ p: 2 }}
              >
                Overview
              </Typography>

              <Divider />

              <Grid container sx={{ px: 2, pt: 1 }}>
                <Grid item xs={6}>
                  <Typography
                    variant="body1"
                    component="div"
                    color="text.secondary"
                  >
                    24h Estimated Average Pool Size
                  </Typography>
                </Grid>
                <Grid
                  item
                  xs={6}
                  sx={{ display: 'flex', justifyContent: 'flex-end' }}
                >
                  <Typography
                    variant="body1"
                    component="div"
                    color="text.secondary"
                  >
                    $345,000.00
                  </Typography>
                </Grid>
              </Grid>

              <Grid container sx={{ px: 2, pt: 1 }}>
                <Grid item xs={6}>
                  <Typography
                    variant="body1"
                    component="div"
                    color="text.secondary"
                  >
                    24 h Estimated Volume
                  </Typography>
                </Grid>
                <Grid
                  item
                  xs={6}
                  sx={{ display: 'flex', justifyContent: 'flex-end' }}
                >
                  <Typography
                    variant="body1"
                    component="div"
                    color="text.secondary"
                  >
                    80,000.000 BTC
                  </Typography>
                </Grid>
              </Grid>

              <Grid container sx={{ px: 2, pt: 1 }}>
                <Grid item xs={6}>
                  <Typography
                    variant="body1"
                    component="div"
                    color="text.secondary"
                  >
                    24h Estimated Fee
                  </Typography>
                </Grid>
                <Grid
                  item
                  xs={6}
                  sx={{ display: 'flex', justifyContent: 'flex-end' }}
                >
                  <Typography
                    variant="body1"
                    component="div"
                    color="text.secondary"
                  >
                    $45,000.00
                  </Typography>
                </Grid>
              </Grid>
            </Card>
          </Grid>

          <Grid item xs={6}>
            <Card sx={{ pb: 2 }}>
              <Typography
                variant="h6"
                component="div"
                color="text.secondary"
                sx={{ p: 2 }}
              >
                Total Stats
              </Typography>

              <Divider />

              <Grid container sx={{ px: 2, pt: 1 }}>
                <Grid item xs={6}>
                  <Typography
                    variant="body1"
                    component="div"
                    color="text.secondary"
                  >
                    Total Fee
                  </Typography>
                </Grid>
                <Grid
                  item
                  xs={6}
                  sx={{ display: 'flex', justifyContent: 'flex-end' }}
                >
                  <Typography
                    variant="body1"
                    component="div"
                    color="text.secondary"
                  >
                    $100,000.00
                  </Typography>
                </Grid>
              </Grid>

              <Grid container sx={{ px: 2, pt: 1 }}>
                <Grid item xs={6}>
                  <Typography
                    variant="body1"
                    component="div"
                    color="text.secondary"
                  >
                    Total Volume
                  </Typography>
                </Grid>
                <Grid
                  item
                  xs={6}
                  sx={{ display: 'flex', justifyContent: 'flex-end' }}
                >
                  <Typography
                    variant="body1"
                    component="div"
                    color="text.secondary"
                  >
                    $900,000.00
                  </Typography>
                </Grid>
              </Grid>

              <Grid container sx={{ px: 2, pt: 1 }}>
                <Grid item xs={6}>
                  <Typography
                    variant="body1"
                    component="div"
                    color="text.secondary"
                  >
                    Total Users
                  </Typography>
                </Grid>
                <Grid
                  item
                  xs={6}
                  sx={{ display: 'flex', justifyContent: 'flex-end' }}
                >
                  <Typography
                    variant="body1"
                    component="div"
                    color="text.secondary"
                  >
                    456,789
                  </Typography>
                </Grid>
              </Grid>
            </Card>
          </Grid>
        </Grid>
      </Container>
    </section>
  );
};

export default lend;

import {
  Link,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
} from '@mui/material';
import { UseQueryResult } from '@tanstack/react-query';
import { useEffect, useState } from 'react';

interface CustomTableCellProps {
  children: React.ReactNode;
  title?: string;
}

const CustomTableCell = ({ children, title }: CustomTableCellProps) => {
  const align =
    // typeof children === 'string' && children.length > 8 ? 'left' : 'center';
    typeof children === 'string' && children.length > 8 ? 'left' : 'left';
  return (
    <TableCell align={align} sx={{ px: 3, py: 2, fontSize: 15 }} title={title}>
      {children}
    </TableCell>
  );
};

const truncate = (str: string, n: number) => {
  if (str.length <= n) {
    return str;
  }
  const edge = Math.floor(n / 2);
  return str.slice(0, edge) + '...' + str.slice(-edge);
};

interface DataTableProps {
  requestList: UseQueryResult<any, unknown>;
  page: number;
  rowsPerPage: number;
  handleChangePage: (event: unknown, newPage: number) => void;
  handleChangeRowsPerPage: (event: React.ChangeEvent<HTMLInputElement>) => void;
  title: string;
}

function TableComponent({
  title,
  handleChangePage,
  handleChangeRowsPerPage,
  page,
  requestList,
  rowsPerPage,
}: DataTableProps): JSX.Element {
  if (requestList.status === 'loading') return <div>Loading....</div>;

  if (requestList.status === 'error') {
    return <div>Error</div>;
  }

  const data = requestList?.data?.data;

  return (
    <TableContainer
      component={Paper}
      sx={{
        borderRadius: 3,
        border: '1px solid',
        width: '100%',
        mb: 2,
        minWidth: 300,
        //   maxWidth: 850,
      }}
    >
      <Table sx={{}} aria-label="simple table">
        <TableHead>
          <TableRow>
            <CustomTableCell>TOKEN</CustomTableCell>
            <CustomTableCell>DATE & TIME</CustomTableCell>
            <CustomTableCell>AMOUNT</CustomTableCell>
            <CustomTableCell>TYPE</CustomTableCell>
            <CustomTableCell>FEE</CustomTableCell>
            <CustomTableCell>TRANSACTION HASH</CustomTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {[1, 2, 3]?.map((row: any, index: any) => (
            <TableRow
              key={row.id}
              sx={{
                '&:last-child td, &:last-child th': { border: 0 },
                backgroundColor:
                  //   index % 2 === 0 ? 'action.hover' : 'background.paper',
                  // eslint-disable-next-line no-constant-condition
                  2 % 2 === 0 ? 'action.hover' : 'background.paper',
                '&:hover': {
                  backgroundColor: 'action.selected',
                },
              }}
            >
              <CustomTableCell>Bitcoin</CustomTableCell>
              <CustomTableCell>
                <FormattedDate date="2023-05-05 23:05:05" />
              </CustomTableCell>
              <CustomTableCell>1.02345 BTC</CustomTableCell>
              <CustomTableCell>Deposit</CustomTableCell>
              <CustomTableCell>0.18%</CustomTableCell>
              <CustomTableCell>{'x02hsfkhjlas9889428jnsfakjs'}</CustomTableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

const FormattedDate = ({ date }: { date: string }) => {
  const [clientDate, setClientDate] = useState('');
  useEffect(() => {
    setClientDate(date);
  }, [date]);

  return <span>{clientDate}</span>;
};
