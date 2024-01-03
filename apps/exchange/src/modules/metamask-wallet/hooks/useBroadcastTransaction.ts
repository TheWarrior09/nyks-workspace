import { useMutation } from '@tanstack/react-query';
import { sendDarkTx, sendQuisquisTx } from '../utils';

export const useBroadcastDarkTransaction = () => {
  return useMutation({
    mutationFn: sendDarkTx,
  });
};

export const useBroadcastQuisquisTransaction = () => {
  return useMutation({
    mutationFn: sendQuisquisTx,
  });
};

export const useBroadcastBurnTransaction = () => {
  return useMutation({
    mutationFn: async () => 'todo',
  });
};
