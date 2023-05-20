import { z } from 'zod';

const envSchema = z.object({
  FAUCET_API_HOST: z.string().default('localhost'),
  FAUCET_API_PORT: z.coerce.number().default(9000),
  CHAIN_ID: z.string().nonempty(),
  TESTNET_COIN_DENOM: z.string().nonempty(),
  ADDRESS_PREFIX: z.string().nonempty(),
  MNEMONIC: z.string().nonempty(),
  COSMOS_REST: z.string().default('http://localhost:26657'),
  TENDERMINT_RPC: z.string().default('http://localhost:26657'),
  DB_HOST: z.string().nonempty(),
  DB_PORT: z.coerce.number().int(),
  DB_NAME: z.string().nonempty(),
  DB_USER: z.string().nonempty(),
  DB_PASSWORD: z.string().nonempty(),
});

export const env = envSchema.parse(process.env);
