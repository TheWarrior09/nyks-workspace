import {
  QueryFunctionContext,
  useMutation,
  useQuery,
  useQueryClient,
} from '@tanstack/react-query';
import axios from 'axios';
import { RequestListResponse } from '../types';

const postRequestFaucet = async (faucetEndpoint: string, address: string) => {
  const response = await axios.post(
    faucetEndpoint,
    {
      address: address,
    },
    {
      headers: {
        'Content-Type': 'application/json',
      },
    }
  );
  return response;
};

const faucetQueryKeys = {
  all: [{ scope: 'request' }] as const,
  requestList: (url: string, path: string, params: Record<string, unknown>) =>
    [{ ...faucetQueryKeys.all[0], url, path, params }] as const,
};

async function queryFunctionWithAxios(
  context: QueryFunctionContext<
    ReturnType<(typeof faucetQueryKeys)['requestList']>
  >
): Promise<RequestListResponse> {
  const { queryKey, signal } = context;
  const [{ url, path, params }] = queryKey;
  const { data } = await axios.get(`${url}/${path}`, { params, signal });
  return data;
}

const usePostRequestFaucet = (faucetEndpoint: string) => {
  const CREDIT_ENDPOINT = `${faucetEndpoint}/credit`;
  return useMutation({
    mutationFn: ({ address }: { address: string }) =>
      postRequestFaucet(CREDIT_ENDPOINT, address),
    onSuccess: () => {
      console.info('Successful request');
    },
  });
};

function useGetRequestList({
  faucetEndpoint,
  path,
  params,
}: {
  faucetEndpoint: string;
  path: string;
  params: Record<string, unknown>;
}) {
  const queryClient = useQueryClient();
  const getRequestList = useQuery({
    queryKey: faucetQueryKeys.requestList(faucetEndpoint, path, params),
    queryFn: queryFunctionWithAxios,
    staleTime: 3000,
    refetchInterval: 5000,
    keepPreviousData: Boolean(path),
    enabled: Boolean(path),
  });

  //   useEffect(() => {
  //     if (
  //       !getRequestList.isPreviousData &&
  //       getRequestList.data?.currentPage !== getRequestList.data?.totalPages
  //     ) {
  //       queryClient.prefetchQuery({
  //         queryKey: faucetQueryKeys.requestList(faucetEndpoint, path, params),
  //     queryFn: queryFunctionWithAxios,
  //       });
  //     }
  //   }, [
  //     faucetEndpoint,
  //     getRequestList.data?.currentPage,
  //     getRequestList.data?.totalPages,
  //     getRequestList.isPreviousData,
  //     params,
  //     path,
  //     queryClient,
  //   ]);
  return getRequestList;
}

export { useGetRequestList, usePostRequestFaucet };
