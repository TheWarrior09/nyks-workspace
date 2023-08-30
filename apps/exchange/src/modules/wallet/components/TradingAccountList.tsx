import {
  Button,
  Checkbox,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { useState } from 'react';
import Long from 'long';

import { useGlobalContext } from '../../../context';
import {
  MintBurnTradingBtc,
  useQueryMintBurnTradingBtc,
} from '../hooks/useQueryMintBurnTradingBtc';
import { useTwilightRpcWithCosmjs } from '@nyks-workspace/hooks';
import { getAccountValue } from '../zkos/accountManagement';
import TradingToDarkTxModal from './TradingToDarkTxModal';

interface CustomTableCellProps {
  children: React.ReactNode;
  title?: string;
  align?: 'center' | 'right' | 'left' | 'inherit' | 'justify' | undefined;
}

const CustomTableCell = ({
  children,
  title,
  align = 'left',
}: CustomTableCellProps) => {
  return (
    <TableCell align={align} sx={{ px: 3, py: 2, fontSize: 15 }} title={title}>
      {children}
    </TableCell>
  );
};

function truncate(str: string, n: number) {
  if (str.length <= n) {
    return str;
  }
  const edge = Math.floor(n / 2);
  return `${str.slice(0, edge)}.....${str.slice(-edge)}`;
}

function TradingAccountList({
  twilightAddress,
}: {
  twilightAddress: string;
}): JSX.Element {
  const [selectedRow, setSelectedRow] = useState<{
    amount: number;
    account: string;
  }>({ account: '', amount: 0 });
  const [btcBalances, setBtcBalances] = useState<{
    [accountId: string]: number | null;
  }>({});
  const [selectedTransferDialog, setSelectedTransferDialog] = useState(false);

  const { setEncryptScalar, setQqAccount, setAmount, signature } =
    useGlobalContext();

  const { mintBurnTradingBtc } = useTwilightRpcWithCosmjs();

  if (!signature) throw new Error('signature not found');

  const handleCloseTransferDialog = () => {
    setSelectedTransferDialog(false);
  };

  function handleRowClick(row: MintBurnTradingBtc) {
    setEncryptScalar(row.encryptScalar);
    setQqAccount(row.qqAccount);
    setAmount(`${row.btcValue}`);
    setSelectedRow({ account: row.qqAccount, amount: Number(row.btcValue) });
  }

  function handleTradingToFundingTransfer({
    btcValue,
    encryptScalar,
    qqAccount,
    twilightAddress,
  }: {
    btcValue: string;
    encryptScalar: string;
    qqAccount: string;
    twilightAddress: string;
  }) {
    mintBurnTradingBtc.mutate(
      {
        btcValue: Long.fromString(btcValue),
        encryptScalar: encryptScalar,
        mintOrBurn: false,
        qqAccount: qqAccount,
        twilightAddress: twilightAddress,
      },
      {
        onSuccess() {
          tradingBtcAccounts.refetch();
        },
      }
    );
  }

  const tradingBtcAccounts = useQueryMintBurnTradingBtc({
    twilightAddress,
  });

  if (
    tradingBtcAccounts.status === 'loading' &&
    tradingBtcAccounts.fetchStatus === 'idle'
  ) {
    return <>loading...</>;
  }

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
            <CustomTableCell align="center">Index</CustomTableCell>
            <CustomTableCell align="center">Account</CustomTableCell>
            <CustomTableCell align="center">Encryption</CustomTableCell>
            <CustomTableCell align="center">Value</CustomTableCell>
            <CustomTableCell align="center">Selected</CustomTableCell>
            <CustomTableCell align="center">Transfer</CustomTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tradingBtcAccounts.status === 'success' &&
            tradingBtcAccounts.data.MintOrBurnTradingBtc.filter(
              (item) => item.mintOrBurn === true
            ).map((row, index) => (
              <TableRow
                key={row.qqAccount}
                sx={{
                  '&:last-child td, &:last-child th': { border: 0 },
                  backgroundColor:
                    index % 2 === 0 ? 'action.hover' : 'background.paper',
                  '&:hover': {
                    backgroundColor: 'action.selected',
                  },
                }}
                onClick={() => handleRowClick(row)}
                selected={selectedRow.account === row.qqAccount}
                hover
              >
                <CustomTableCell align="center">{index + 1}</CustomTableCell>

                <CustomTableCell align="center">
                  {truncate(row.qqAccount, 20)}
                </CustomTableCell>

                <CustomTableCell align="center">
                  {truncate(row.encryptScalar, 20)}
                </CustomTableCell>

                <CustomTableCell align="center">
                  {/* {row.btcValue} sats */}
                  {btcBalances[row.qqAccount] ? (
                    `${btcBalances[row.qqAccount]} sats`
                  ) : (
                    <Button
                      variant="outlined"
                      size="small"
                      onClick={async () => {
                        const balance = await getAccountValue({
                          signature,
                          qqAccount: row.qqAccount,
                          encryptScalar: row.encryptScalar,
                        });

                        setBtcBalances((prevClickedValues) => ({
                          ...prevClickedValues,
                          [row.qqAccount]: Number(balance.balance),
                        }));
                      }}
                    >
                      Decrypt
                    </Button>
                  )}
                </CustomTableCell>

                <CustomTableCell align="center">
                  <Checkbox checked={selectedRow.account === row.qqAccount} />
                </CustomTableCell>

                <CustomTableCell align="center">
                  <>
                    <Button
                      variant="outlined"
                      size="small"
                      onClick={() => {
                        handleTradingToFundingTransfer({
                          btcValue: row.btcValue,
                          encryptScalar: row.encryptScalar,
                          qqAccount: row.qqAccount,
                          twilightAddress: row.twilightAddress,
                        });
                      }}
                      disabled={mintBurnTradingBtc.status === 'loading'}
                    >
                      Trading to funding
                    </Button>

                    <Button
                      variant="outlined"
                      size="small"
                      onClick={() => {
                        console.log('dark tx');
                        setSelectedTransferDialog(true);
                      }}
                      //   disabled={mintBurnTradingBtc.status === 'loading'}
                    >
                      Dark tx
                    </Button>
                  </>
                </CustomTableCell>
              </TableRow>
            ))}

          {selectedRow.account && selectedTransferDialog ? (
            <TradingToDarkTxModal
              fromAccount={selectedRow.account}
              onClose={handleCloseTransferDialog}
              open={selectedTransferDialog}
              totalAmount={selectedRow.amount}
            />
          ) : null}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default TradingAccountList;
