import { QueryFunctionContext } from '@tanstack/react-query';
import axios from 'axios';

export async function queryFunctionWithAxios(context: QueryFunctionContext) {
  const { queryKey, signal } = context;
  const [_, url] = queryKey;
  if (typeof url === 'string') {
    const { data } = await axios.get(url, { signal });
    return data;
  }
  throw new Error('Invalid QueryKey');
}
