import { Grid } from '@mui/material';
import { useTableDataWithPagination } from './hooks';
import { TableComponent } from './TableComponent';

interface RequestTableSectionProps {
  keplrConnected: boolean;
  twilightAddress: string | undefined;
}

export function RequestTableSection({
  twilightAddress,
}: RequestTableSectionProps) {
  const {
    handleChangePage: handleAllUsersRequestChangePage,
    handleChangeRowsPerPage: handleChangeAllUsersRequestRowsPerPage,
    page: pageAllUsersRequest,
    requestList: requestListAllUsersRequest,
    rowsPerPage: rowsPerPageAllUsersRequest,
  } = useTableDataWithPagination();

  const {
    handleChangePage: handleSingleUserRequestChangePage,
    handleChangeRowsPerPage: handleChangeSingleUserRequestRowsPerPage,
    page: pageSingleUserRequest,
    requestList: requestListSingleUserRequest,
    rowsPerPage: rowsPerPageSingleUserRequest,
  } = useTableDataWithPagination({
    path: twilightAddress ? `request/${twilightAddress}` : '',
  });

  const allUsersRequestTable = (
    <TableComponent
      title="All requests"
      handleChangePage={handleAllUsersRequestChangePage}
      handleChangeRowsPerPage={handleChangeAllUsersRequestRowsPerPage}
      page={pageAllUsersRequest}
      requestList={requestListAllUsersRequest}
      rowsPerPage={rowsPerPageAllUsersRequest}
    />
  );

  const singleUserRequestTable = (
    <TableComponent
      title="Your requests"
      handleChangePage={handleSingleUserRequestChangePage}
      handleChangeRowsPerPage={handleChangeSingleUserRequestRowsPerPage}
      page={pageSingleUserRequest}
      requestList={requestListSingleUserRequest}
      rowsPerPage={rowsPerPageSingleUserRequest}
    />
  );

  return (
    <Grid container spacing={2} component="section">
      {requestListSingleUserRequest.status !== 'success' ? (
        <Grid item xs={12}>
          {allUsersRequestTable}
        </Grid>
      ) : (
        <>
          <Grid item xs={6}>
            {allUsersRequestTable}
          </Grid>
          <Grid item xs={6}>
            {singleUserRequestTable}
          </Grid>
        </>
      )}
    </Grid>
  );
}
