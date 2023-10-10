import { useMutation } from '@tanstack/react-query';
import {
  burnTransactionSingle,
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

export const useBroadcastBurnTransaction = () => {
  return useMutation({
    mutationFn: burnTransactionSingle,
  });
};
