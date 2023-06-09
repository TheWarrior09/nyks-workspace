import { useState } from 'react';
import { useGetRequestList } from './useFaucetApi';
import { FAUCET_ENDPOINT } from '../../../env';

export function useTableDataWithPagination({
  initialRowsPerPage = 5,
  path = `request`,
}: { initialRowsPerPage?: number; path?: string } = {}) {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(initialRowsPerPage);
  const requestList = useGetRequestList({
    faucetEndpoint: FAUCET_ENDPOINT,
    path,
    params: {
      page: page + 1,
      limit: rowsPerPage,
    },
  });

  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  return {
    requestList,
    page,
    rowsPerPage,
    handleChangePage,
    handleChangeRowsPerPage,
  };
}
