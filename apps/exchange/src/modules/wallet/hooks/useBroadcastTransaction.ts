import { useMutation } from '@tanstack/react-query';
import { darkTransactionSingle } from '../zkos/darkTransaction';

export const useBroadcastDarkTransactionSingle = () => {
  return useMutation({
    mutationFn: darkTransactionSingle,
  });
};
