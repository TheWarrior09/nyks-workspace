import { useMutation } from '@tanstack/react-query';
import {
  burnTransaction,
  darkTransaction,
  quisquisTransaction,
} from '../zkos/transactions';

export const useBroadcastDarkTransaction = () => {
  return useMutation({
    mutationFn: darkTransaction,
  });
};

export const useBroadcastQuisquisTransaction = () => {
  return useMutation({
    mutationFn: quisquisTransaction,
  });
};

export const useBroadcastBurnTransaction = () => {
  return useMutation({
    mutationFn: burnTransaction,
  });
};
