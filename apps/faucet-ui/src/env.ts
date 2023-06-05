import { z } from 'zod';

const envSchema = z.object({
  VITE_CHAIN_ID: z.string().default('nyks'),
  VITE_COSMOS_REST: z.string().default('http://localhost:1317'),
  VITE_TENDERMINT_RPC: z.string().default('http://localhost:26657'),
  VITE_FAUCET_ENDPOINT: z.string(),
  VITE_EXPLORER_ENDPOINT: z.string(),
});

export const {
  VITE_CHAIN_ID: CHAIN_ID,
  VITE_COSMOS_REST: COSMOS_REST,
  VITE_TENDERMINT_RPC: TENDERMINT_RPC,
  VITE_FAUCET_ENDPOINT: FAUCET_ENDPOINT,
  VITE_EXPLORER_ENDPOINT: EXPLORER_ENDPOINT,
} = envSchema.parse(import.meta.env);
