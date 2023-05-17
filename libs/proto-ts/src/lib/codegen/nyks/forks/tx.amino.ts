import { AminoMsg } from "@cosmjs/amino";
import { Long } from "../../helpers";
import { MsgSetDelegateAddresses, MsgSeenBtcChainTip } from "./tx";
export interface MsgSetDelegateAddressesAminoType extends AminoMsg {
  type: "/twilightproject.nyks.forks.MsgSetDelegateAddresses";
  value: {
    validatorAddress: string;
    btcOracleAddress: string;
    btcPublicKey: string;
  };
}
export interface MsgSeenBtcChainTipAminoType extends AminoMsg {
  type: "/twilightproject.nyks.forks.MsgSeenBtcChainTip";
  value: {
    height: string;
    hash: string;
    btcOracleAddress: string;
  };
}
export const AminoConverter = {
  "/twilightproject.nyks.forks.MsgSetDelegateAddresses": {
    aminoType: "/twilightproject.nyks.forks.MsgSetDelegateAddresses",
    toAmino: ({
      validatorAddress,
      btcOracleAddress,
      btcPublicKey
    }: MsgSetDelegateAddresses): MsgSetDelegateAddressesAminoType["value"] => {
      return {
        validatorAddress,
        btcOracleAddress,
        btcPublicKey
      };
    },
    fromAmino: ({
      validatorAddress,
      btcOracleAddress,
      btcPublicKey
    }: MsgSetDelegateAddressesAminoType["value"]): MsgSetDelegateAddresses => {
      return {
        validatorAddress,
        btcOracleAddress,
        btcPublicKey
      };
    }
  },
  "/twilightproject.nyks.forks.MsgSeenBtcChainTip": {
    aminoType: "/twilightproject.nyks.forks.MsgSeenBtcChainTip",
    toAmino: ({
      height,
      hash,
      btcOracleAddress
    }: MsgSeenBtcChainTip): MsgSeenBtcChainTipAminoType["value"] => {
      return {
        height: height.toString(),
        hash,
        btcOracleAddress
      };
    },
    fromAmino: ({
      height,
      hash,
      btcOracleAddress
    }: MsgSeenBtcChainTipAminoType["value"]): MsgSeenBtcChainTip => {
      return {
        height: Long.fromString(height),
        hash,
        btcOracleAddress
      };
    }
  }
};