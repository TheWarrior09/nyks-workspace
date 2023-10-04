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
import { useEffect, useState } from 'react';
import { useGlobalContext } from '../../../context';
import {
  AccountLocal,
  getAccountList,
  getUtxoFromDB,
  updateAccountValueInLocalData,
} from '../zkos';
import {
  getAddressOutput,
  getAddressUtxoHex,
  getAddressValue,
} from '../zkos/darkTransaction';

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

export function truncate(str: string, n: number) {
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
    amount: number | undefined;
    address: string;
  }>({ address: '', amount: undefined });

  const { setEncryptScalar, setTradingAccount, setAmount, signature } =
    useGlobalContext();

  if (!signature) throw new Error('signature not found');


  function handleRowClick(row: AccountLocal) {
    if (row.status === 'spent') return;
    setEncryptScalar(row.encryptScalar);
    setTradingAccount(row.tradingAccount);
    setSelectedRow((prev) => ({
      ...prev,
      address: row.tradingAddress,
      amount: Number(row.btcValue),
    }));
  }

  const tradingAccountData = getAccountList(twilightAddress);

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
            <CustomTableCell align="center">Address</CustomTableCell>
            {/* <CustomTableCell align="center">Encrypt Scalar</CustomTableCell> */}
            <CustomTableCell align="center">Value</CustomTableCell>
            <CustomTableCell align="center">Status</CustomTableCell>
            <CustomTableCell align="center">Selected</CustomTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tradingAccountData.map((row, index) => (
            <TableRow
              key={row.tradingAddress}
              sx={{
                '&:last-child td, &:last-child th': { border: 0 },
                backgroundColor:
                  index % 2 === 0 ? 'action.hover' : 'background.paper',
                '&:hover': {
                  backgroundColor: 'action.selected',
                },
              }}
              onClick={() => handleRowClick(row)}
              selected={selectedRow.address === row.tradingAddress}
              hover
            >
              <CustomTableCell align="center">{index + 1}</CustomTableCell>

              <CustomTableCell align="center">
                {truncate(row.tradingAddress, 20)}
              </CustomTableCell>

              {/* <CustomTableCell align="center">
                  {truncate(row.encryptScalar, 20)}
                </CustomTableCell> */}

              <CustomTableCell align="center">
                {/* {row.btcValue} sats */}
                {typeof row.btcValue !== 'undefined' ? (
                  `${row.btcValue} sats`
                ) : (
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={async () => {
                      const balance = await getAddressValue(
                        signature,
                        row.tradingAddress
                      );

                      updateAccountValueInLocalData({
                        tradingAddress: row.tradingAddress,
                        twilightAddress,
                        updatedValue: Number(balance),
                      });

                      setSelectedRow((prev) => ({
                        ...prev,
                        amount: Number(balance),
                      }));
                    }}
                  >
                    Decrypt
                  </Button>
                )}
              </CustomTableCell>

              <CustomTableCell align="center">{row.status}</CustomTableCell>

              <CustomTableCell align="center">
                <Checkbox
                  disabled={row.status === 'spent'}
                  checked={selectedRow.address === row.tradingAddress}
                />
              </CustomTableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default TradingAccountList;
