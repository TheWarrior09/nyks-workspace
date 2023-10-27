import {
  Link,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { useQueryGetTradingAccounts } from '../../hooks/useQueryZkos';
import { useGlobalStateContext } from '../../../../context';
import { NYKS_EXPLORER } from '../../../../../constants';

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

function TransactionList({
  twilightAddress,
}: {
  twilightAddress: string;
}): JSX.Element {
  const { signature } = useGlobalStateContext();

  if (!signature) throw new Error('signature not found');

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
            <CustomTableCell align="center">Transaction ID</CustomTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tradingAccountsQuery.status === 'success' &&
            tradingAccountsQuery.data
              .filter((row) => Number(row.value) !== 0)
              .reduce(
                (
                  accumulator: {
                    tradingAddress: string;
                    value: bigint;
                    utxo: string;
                    txId: string;
                  }[],
                  currentObject
                ) => {
                  const isDuplicate = accumulator.some(
                    (obj) => obj.txId === currentObject.txId
                  );
                  if (!isDuplicate) {
                    accumulator.push(currentObject);
                  }
                  return accumulator;
                },
                []
              )
              .map((row, index) => (
                <TableRow
                  key={row.txId}
                  sx={{
                    '&:last-child td, &:last-child th': { border: 0 },
                    backgroundColor:
                      index % 2 === 0 ? 'action.hover' : 'background.paper',
                    '&:hover': {
                      backgroundColor: 'action.selected',
                    },
                  }}
                  hover
                >
                  <CustomTableCell align="center">{index + 1}</CustomTableCell>

                  <CustomTableCell align="center">
                    <Link
                      href={`${NYKS_EXPLORER}/transaction/${row.txId}`}
                      target="_blank"
                      rel="noopener"
                    >
                      {row.txId}
                    </Link>
                  </CustomTableCell>
                </TableRow>
              ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default TransactionList;
