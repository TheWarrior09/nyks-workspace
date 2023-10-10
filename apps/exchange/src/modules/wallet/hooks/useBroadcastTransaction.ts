import { useMutation } from '@tanstack/react-query';
import {
  darkTransactionSingle,
  quisquisTransactionSingle,
} from '../zkos/darkTransaction';

export const useBroadcastDarkTransactionSingle = () => {
  return useMutation({
    mutationFn: darkTransactionSingle,
  });
};

export const useBroadcastQuisquisTransactionSingle = () => {
  return useMutation({
    mutationFn: quisquisTransactionSingle,
  });
};
