import { Long, isSet, DeepPartial } from "../../helpers";
import * as _m0 from "protobufjs/minimal";
export interface MsgTransferTx {
  txId: string;
  txByteCode: string;
  zkOracleAddress: string;
}
export interface MsgTransferTxSDKType {
  txId: string;
  txByteCode: string;
  zkOracleAddress: string;
}
export interface MsgTransferTxResponse {}
export interface MsgTransferTxResponseSDKType {}
export interface MsgMintBurnTradingBtc {
  mintOrBurn: boolean;
  btcValue: Long;
  qqAccount: string;
  encryptScalar: string;
  twilightAddress: string;
}
export interface MsgMintBurnTradingBtcSDKType {
  mintOrBurn: boolean;
  btcValue: Long;
  qqAccount: string;
  encryptScalar: string;
  twilightAddress: string;
}
export interface MsgMintBurnTradingBtcResponse {}
export interface MsgMintBurnTradingBtcResponseSDKType {}
function createBaseMsgTransferTx(): MsgTransferTx {
  return {
    txId: "",
    txByteCode: "",
    zkOracleAddress: ""
  };
}
export const MsgTransferTx = {
  encode(message: MsgTransferTx, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.txId !== "") {
      writer.uint32(10).string(message.txId);
    }
    if (message.txByteCode !== "") {
      writer.uint32(18).string(message.txByteCode);
    }
    if (message.zkOracleAddress !== "") {
      writer.uint32(26).string(message.zkOracleAddress);
    }
    return writer;
  },
  decode(input: _m0.Reader | Uint8Array, length?: number): MsgTransferTx {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgTransferTx();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.txId = reader.string();
          break;
        case 2:
          message.txByteCode = reader.string();
          break;
        case 3:
          message.zkOracleAddress = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): MsgTransferTx {
    return {
      txId: isSet(object.txId) ? String(object.txId) : "",
      txByteCode: isSet(object.txByteCode) ? String(object.txByteCode) : "",
      zkOracleAddress: isSet(object.zkOracleAddress) ? String(object.zkOracleAddress) : ""
    };
  },
  toJSON(message: MsgTransferTx): unknown {
    const obj: any = {};
    message.txId !== undefined && (obj.txId = message.txId);
    message.txByteCode !== undefined && (obj.txByteCode = message.txByteCode);
    message.zkOracleAddress !== undefined && (obj.zkOracleAddress = message.zkOracleAddress);
    return obj;
  },
  fromPartial(object: DeepPartial<MsgTransferTx>): MsgTransferTx {
    const message = createBaseMsgTransferTx();
    message.txId = object.txId ?? "";
    message.txByteCode = object.txByteCode ?? "";
    message.zkOracleAddress = object.zkOracleAddress ?? "";
    return message;
  }
};
function createBaseMsgTransferTxResponse(): MsgTransferTxResponse {
  return {};
}
export const MsgTransferTxResponse = {
  encode(_: MsgTransferTxResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },
  decode(input: _m0.Reader | Uint8Array, length?: number): MsgTransferTxResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgTransferTxResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(_: any): MsgTransferTxResponse {
    return {};
  },
  toJSON(_: MsgTransferTxResponse): unknown {
    const obj: any = {};
    return obj;
  },
  fromPartial(_: DeepPartial<MsgTransferTxResponse>): MsgTransferTxResponse {
    const message = createBaseMsgTransferTxResponse();
    return message;
  }
};
function createBaseMsgMintBurnTradingBtc(): MsgMintBurnTradingBtc {
  return {
    mintOrBurn: false,
    btcValue: Long.UZERO,
    qqAccount: "",
    encryptScalar: "",
    twilightAddress: ""
  };
}
export const MsgMintBurnTradingBtc = {
  encode(message: MsgMintBurnTradingBtc, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.mintOrBurn === true) {
      writer.uint32(8).bool(message.mintOrBurn);
    }
    if (!message.btcValue.isZero()) {
      writer.uint32(16).uint64(message.btcValue);
    }
    if (message.qqAccount !== "") {
      writer.uint32(26).string(message.qqAccount);
    }
    if (message.encryptScalar !== "") {
      writer.uint32(34).string(message.encryptScalar);
    }
    if (message.twilightAddress !== "") {
      writer.uint32(42).string(message.twilightAddress);
    }
    return writer;
  },
  decode(input: _m0.Reader | Uint8Array, length?: number): MsgMintBurnTradingBtc {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgMintBurnTradingBtc();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.mintOrBurn = reader.bool();
          break;
        case 2:
          message.btcValue = (reader.uint64() as Long);
          break;
        case 3:
          message.qqAccount = reader.string();
          break;
        case 4:
          message.encryptScalar = reader.string();
          break;
        case 5:
          message.twilightAddress = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): MsgMintBurnTradingBtc {
    return {
      mintOrBurn: isSet(object.mintOrBurn) ? Boolean(object.mintOrBurn) : false,
      btcValue: isSet(object.btcValue) ? Long.fromValue(object.btcValue) : Long.UZERO,
      qqAccount: isSet(object.qqAccount) ? String(object.qqAccount) : "",
      encryptScalar: isSet(object.encryptScalar) ? String(object.encryptScalar) : "",
      twilightAddress: isSet(object.twilightAddress) ? String(object.twilightAddress) : ""
    };
  },
  toJSON(message: MsgMintBurnTradingBtc): unknown {
    const obj: any = {};
    message.mintOrBurn !== undefined && (obj.mintOrBurn = message.mintOrBurn);
    message.btcValue !== undefined && (obj.btcValue = (message.btcValue || Long.UZERO).toString());
    message.qqAccount !== undefined && (obj.qqAccount = message.qqAccount);
    message.encryptScalar !== undefined && (obj.encryptScalar = message.encryptScalar);
    message.twilightAddress !== undefined && (obj.twilightAddress = message.twilightAddress);
    return obj;
  },
  fromPartial(object: DeepPartial<MsgMintBurnTradingBtc>): MsgMintBurnTradingBtc {
    const message = createBaseMsgMintBurnTradingBtc();
    message.mintOrBurn = object.mintOrBurn ?? false;
    message.btcValue = object.btcValue !== undefined && object.btcValue !== null ? Long.fromValue(object.btcValue) : Long.UZERO;
    message.qqAccount = object.qqAccount ?? "";
    message.encryptScalar = object.encryptScalar ?? "";
    message.twilightAddress = object.twilightAddress ?? "";
    return message;
  }
};
function createBaseMsgMintBurnTradingBtcResponse(): MsgMintBurnTradingBtcResponse {
  return {};
}
export const MsgMintBurnTradingBtcResponse = {
  encode(_: MsgMintBurnTradingBtcResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },
  decode(input: _m0.Reader | Uint8Array, length?: number): MsgMintBurnTradingBtcResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgMintBurnTradingBtcResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(_: any): MsgMintBurnTradingBtcResponse {
    return {};
  },
  toJSON(_: MsgMintBurnTradingBtcResponse): unknown {
    const obj: any = {};
    return obj;
  },
  fromPartial(_: DeepPartial<MsgMintBurnTradingBtcResponse>): MsgMintBurnTradingBtcResponse {
    const message = createBaseMsgMintBurnTradingBtcResponse();
    return message;
  }
};