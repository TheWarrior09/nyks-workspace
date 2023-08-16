import { AminoMsg } from "@cosmjs/amino";
import { Long } from "../../helpers";
import { MsgTransferTx, MsgMintBurnTradingBtc } from "./tx";
export interface MsgTransferTxAminoType extends AminoMsg {
  type: "/twilightproject.nyks.zkos.MsgTransferTx";
  value: {
    txId: string;
    txByteCode: string;
    zkOracleAddress: string;
  };
}
export interface MsgMintBurnTradingBtcAminoType extends AminoMsg {
  type: "/twilightproject.nyks.zkos.MsgMintBurnTradingBtc";
  value: {
    mintOrBurn: boolean;
    btcValue: string;
    qqAccount: string;
    encryptScalar: string;
    twilightAddress: string;
  };
}
export const AminoConverter = {
  "/twilightproject.nyks.zkos.MsgTransferTx": {
    aminoType: "/twilightproject.nyks.zkos.MsgTransferTx",
    toAmino: ({
      txId,
      txByteCode,
      zkOracleAddress
    }: MsgTransferTx): MsgTransferTxAminoType["value"] => {
      return {
        txId,
        txByteCode,
        zkOracleAddress
      };
    },
    fromAmino: ({
      txId,
      txByteCode,
      zkOracleAddress
    }: MsgTransferTxAminoType["value"]): MsgTransferTx => {
      return {
        txId,
        txByteCode,
        zkOracleAddress
      };
    }
  },
  "/twilightproject.nyks.zkos.MsgMintBurnTradingBtc": {
    aminoType: "/twilightproject.nyks.zkos.MsgMintBurnTradingBtc",
    toAmino: ({
      mintOrBurn,
      btcValue,
      qqAccount,
      encryptScalar,
      twilightAddress
    }: MsgMintBurnTradingBtc): MsgMintBurnTradingBtcAminoType["value"] => {
      return {
        mintOrBurn,
        btcValue: btcValue.toString(),
        qqAccount,
        encryptScalar,
        twilightAddress
      };
    },
    fromAmino: ({
      mintOrBurn,
      btcValue,
      qqAccount,
      encryptScalar,
      twilightAddress
    }: MsgMintBurnTradingBtcAminoType["value"]): MsgMintBurnTradingBtc => {
      return {
        mintOrBurn,
        btcValue: Long.fromString(btcValue),
        qqAccount,
        encryptScalar,
        twilightAddress
      };
    }
  }
};