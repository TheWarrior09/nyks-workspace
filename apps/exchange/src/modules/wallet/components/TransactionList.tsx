import {
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';

import { AccountLocal, getAccountList } from '../zkos';

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
            <CustomTableCell align="center">Transaction ID</CustomTableCell>
            <CustomTableCell align="center">Transaction Type</CustomTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {tradingAccountData
            .reduce((accumulator: AccountLocal[], currentObject) => {
              const isDuplicate = accumulator.some(
                (obj) => obj.transactionId === currentObject.transactionId
              );
              if (!isDuplicate) {
                accumulator.push(currentObject);
              }
              return accumulator;
            }, [])
            .map((row, index) => (
              <TableRow
                key={row.transactionId}
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
                  {row.transactionId}
                </CustomTableCell>

                <CustomTableCell align="center">
                  {row.transactionType}
                </CustomTableCell>
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default TransactionList;
