import { GeneratedType, Registry, OfflineSigner } from "@cosmjs/proto-signing";
import { defaultRegistryTypes, AminoTypes, SigningStargateClient } from "@cosmjs/stargate";
import { HttpEndpoint } from "@cosmjs/tendermint-rpc";
import * as nyksBridgeTxRegistry from "../nyks/bridge/tx.registry";
import * as nyksForksTxRegistry from "../nyks/forks/tx.registry";
import * as nyksZkosTxRegistry from "../nyks/zkos/tx.registry";
import * as nyksBridgeTxAmino from "../nyks/bridge/tx.amino";
import * as nyksForksTxAmino from "../nyks/forks/tx.amino";
import * as nyksZkosTxAmino from "../nyks/zkos/tx.amino";
export const twilightprojectAminoConverters = {
  ...nyksBridgeTxAmino.AminoConverter,
  ...nyksForksTxAmino.AminoConverter,
  ...nyksZkosTxAmino.AminoConverter
};
export const twilightprojectProtoRegistry: ReadonlyArray<[string, GeneratedType]> = [...nyksBridgeTxRegistry.registry, ...nyksForksTxRegistry.registry, ...nyksZkosTxRegistry.registry];
export const getSigningTwilightprojectClientOptions = ({
  defaultTypes = defaultRegistryTypes
}: {
  defaultTypes?: ReadonlyArray<[string, GeneratedType]>;
} = {}): {
  registry: Registry;
  aminoTypes: AminoTypes;
} => {
  const registry = new Registry([...defaultTypes, ...twilightprojectProtoRegistry]);
  const aminoTypes = new AminoTypes({
    ...twilightprojectAminoConverters
  });
  return {
    registry,
    aminoTypes
  };
};
export const getSigningTwilightprojectClient = async ({
  rpcEndpoint,
  signer,
  defaultTypes = defaultRegistryTypes
}: {
  rpcEndpoint: string | HttpEndpoint;
  signer: OfflineSigner;
  defaultTypes?: ReadonlyArray<[string, GeneratedType]>;
}) => {
  const {
    registry,
    aminoTypes
  } = getSigningTwilightprojectClientOptions({
    defaultTypes
  });
  const client = await SigningStargateClient.connectWithSigner(rpcEndpoint, signer, {
    registry,
    aminoTypes
  });
  return client;
};