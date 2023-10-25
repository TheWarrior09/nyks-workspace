import {
  Alert,
  Checkbox,
  Paper,
  Snackbar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
import { useState } from 'react';
import { useGlobalStateContext } from '../../../../context';
import {
  TradingAccountData,
  useQueryGetTradingAccounts,
} from '../../hooks/useQueryZkos';

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

  const { signature } = useGlobalStateContext();

  if (!signature) throw new Error('signature not found');

  function handleRowClick(row: TradingAccountData) {
    // if (row.status === 'spent') return;
    // setEncryptScalar(row.encryptScalar);
    // setTradingAccount(row.tradingAccount);
    setSelectedRow((prev) => ({
      ...prev,
      address: row.tradingAddress,
      amount: Number(row.value),
    }));
  }

  const tradingAccountsQuery = useQueryGetTradingAccounts(
    signature,
    twilightAddress
  );

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
            <CustomTableCell align="center">UTXO ID</CustomTableCell>
            <CustomTableCell align="center">Value</CustomTableCell>

            <CustomTableCell align="center">Selected</CustomTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tradingAccountsQuery.status === 'success' &&
            tradingAccountsQuery.data
              .filter((row) => Number(row.value) !== 0)
              .map((row, index) => (
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

                  <CustomTableCell align="center">
                    <TruncatableCopyableText text={row.utxo} maxLength={20} />
                    {/* {truncate(row.utxo, 20)} */}
                  </CustomTableCell>

                  <CustomTableCell align="center">
                    {`${row.value} sats`}
                  </CustomTableCell>

                  <CustomTableCell align="center">
                    <Checkbox
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
        {truncate(text, maxLength)}
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
          UTXO ID Copied!
        </Alert>
      </Snackbar>
    </div>
  );
};
