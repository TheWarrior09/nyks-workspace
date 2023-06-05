import { z } from 'zod';

const envSchema = z.object({
  VITE_CHAIN_ID: z.string().default('nyks'),
  VITE_COSMOS_REST: z.string().default('http://localhost:26657'),
  VITE_TENDERMINT_RPC: z.string().default('http://localhost:26657'),
});

export const {
  VITE_CHAIN_ID: CHAIN_ID,
  VITE_COSMOS_REST: COSMOS_REST,
  VITE_TENDERMINT_RPC: TENDERMINT_RPC,
} = envSchema.parse(import.meta.env);
