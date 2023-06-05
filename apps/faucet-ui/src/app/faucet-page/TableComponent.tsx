import {
  Box,
  Link,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TablePagination,
  TableRow,
  Typography,
} from '@mui/material';
import { UseQueryResult } from '@tanstack/react-query';
import type { RequestListResponse } from './types';
import { EXPLORER_ENDPOINT } from '../../env';

interface CustomTableCellProps {
  children: React.ReactNode;
  title?: string;
}

const CustomTableCell = ({ children, title }: CustomTableCellProps) => {
  const align =
    typeof children === 'string' && children.length > 8 ? 'left' : 'center';
  return (
    <TableCell align={align} sx={{ px: 3, py: 1, fontSize: 15 }} title={title}>
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
  requestList: UseQueryResult<RequestListResponse, unknown>;
  page: number;
  rowsPerPage: number;
  handleChangePage: (event: unknown, newPage: number) => void;
  handleChangeRowsPerPage: (event: React.ChangeEvent<HTMLInputElement>) => void;
  title: string;
}

export function TableComponent({
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

  const data = requestList.data.data;

  return (
    <Box
      sx={{
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Typography
        variant="h6"
        gutterBottom
        component="div"
        align="center"
        sx={{ mb: 2 }}
      >
        {title}
      </Typography>
      <TableContainer
        component={Paper}
        sx={{
          borderRadius: 3,
          border: '1px solid',
          width: '100%',
          mb: 2,
          minWidth: 300,
          maxWidth: 850,
        }}
      >
        <Table sx={{}} aria-label="simple table">
          <TableHead>
            <TableRow>
              <CustomTableCell>ID</CustomTableCell>
              <CustomTableCell>Twilight Address </CustomTableCell>
              <CustomTableCell>Transaction Hash</CustomTableCell>
              <CustomTableCell> Transaction Status</CustomTableCell>
              <CustomTableCell>Created At</CustomTableCell>
              <CustomTableCell>Updated At</CustomTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data.map((row, index) => (
              <TableRow
                key={row.id}
                sx={{
                  '&:last-child td, &:last-child th': { border: 0 },
                  backgroundColor:
                    index % 2 === 0 ? 'action.hover' : 'background.paper',
                  '&:hover': {
                    backgroundColor: 'action.selected',
                  },
                }}
              >
                <CustomTableCell>{row.id}</CustomTableCell>
                <CustomTableCell title={row.address}>
                  {truncate(row.address, 10)}
                </CustomTableCell>
                <CustomTableCell>
                  {typeof row.transactionHash === 'string' ? (
                    <Link
                      href={`${EXPLORER_ENDPOINT}/transaction/${row.transactionHash}`}
                      target="_blank"
                      rel="noopener"
                    >
                      {truncate(row.transactionHash, 10)}
                    </Link>
                  ) : (
                    '_'
                  )}
                </CustomTableCell>
                <CustomTableCell>{row.status}</CustomTableCell>
                <CustomTableCell>
                  {new Date(row.createdAt).toLocaleString()}
                </CustomTableCell>
                <CustomTableCell>
                  {new Date(row.updatedAt).toLocaleString()}
                </CustomTableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[5, 10, 25]}
        component="div"
        count={requestList.data.total}
        rowsPerPage={rowsPerPage}
        page={page}
        SelectProps={{
          inputProps: { 'aria-label': 'rows per page' },
          native: true,
        }}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Box>
  );
}
