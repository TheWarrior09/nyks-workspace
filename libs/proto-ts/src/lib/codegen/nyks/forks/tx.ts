import { Long, isSet, DeepPartial } from "../../helpers";
import * as _m0 from "protobufjs/minimal";
export interface MsgSetDelegateAddresses {
  validatorAddress: string;
  btcOracleAddress: string;
  btcPublicKey: string;
}
export interface MsgSetDelegateAddressesSDKType {
  validatorAddress: string;
  btcOracleAddress: string;
  btcPublicKey: string;
}
export interface MsgSetDelegateAddressesResponse {
  id: Long;
}
export interface MsgSetDelegateAddressesResponseSDKType {
  id: Long;
}
export interface MsgSeenBtcChainTip {
  height: Long;
  hash: string;
  btcOracleAddress: string;
}
export interface MsgSeenBtcChainTipSDKType {
  height: Long;
  hash: string;
  btcOracleAddress: string;
}
export interface MsgSeenBtcChainTipResponse {}
export interface MsgSeenBtcChainTipResponseSDKType {}
function createBaseMsgSetDelegateAddresses(): MsgSetDelegateAddresses {
  return {
    validatorAddress: "",
    btcOracleAddress: "",
    btcPublicKey: ""
  };
}
export const MsgSetDelegateAddresses = {
  encode(message: MsgSetDelegateAddresses, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.validatorAddress !== "") {
      writer.uint32(18).string(message.validatorAddress);
    }
    if (message.btcOracleAddress !== "") {
      writer.uint32(26).string(message.btcOracleAddress);
    }
    if (message.btcPublicKey !== "") {
      writer.uint32(34).string(message.btcPublicKey);
    }
    return writer;
  },
  decode(input: _m0.Reader | Uint8Array, length?: number): MsgSetDelegateAddresses {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgSetDelegateAddresses();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 2:
          message.validatorAddress = reader.string();
          break;
        case 3:
          message.btcOracleAddress = reader.string();
          break;
        case 4:
          message.btcPublicKey = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): MsgSetDelegateAddresses {
    return {
      validatorAddress: isSet(object.validatorAddress) ? String(object.validatorAddress) : "",
      btcOracleAddress: isSet(object.btcOracleAddress) ? String(object.btcOracleAddress) : "",
      btcPublicKey: isSet(object.btcPublicKey) ? String(object.btcPublicKey) : ""
    };
  },
  toJSON(message: MsgSetDelegateAddresses): unknown {
    const obj: any = {};
    message.validatorAddress !== undefined && (obj.validatorAddress = message.validatorAddress);
    message.btcOracleAddress !== undefined && (obj.btcOracleAddress = message.btcOracleAddress);
    message.btcPublicKey !== undefined && (obj.btcPublicKey = message.btcPublicKey);
    return obj;
  },
  fromPartial(object: DeepPartial<MsgSetDelegateAddresses>): MsgSetDelegateAddresses {
    const message = createBaseMsgSetDelegateAddresses();
    message.validatorAddress = object.validatorAddress ?? "";
    message.btcOracleAddress = object.btcOracleAddress ?? "";
    message.btcPublicKey = object.btcPublicKey ?? "";
    return message;
  }
};
function createBaseMsgSetDelegateAddressesResponse(): MsgSetDelegateAddressesResponse {
  return {
    id: Long.UZERO
  };
}
export const MsgSetDelegateAddressesResponse = {
  encode(message: MsgSetDelegateAddressesResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (!message.id.isZero()) {
      writer.uint32(8).uint64(message.id);
    }
    return writer;
  },
  decode(input: _m0.Reader | Uint8Array, length?: number): MsgSetDelegateAddressesResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgSetDelegateAddressesResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.id = (reader.uint64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): MsgSetDelegateAddressesResponse {
    return {
      id: isSet(object.id) ? Long.fromValue(object.id) : Long.UZERO
    };
  },
  toJSON(message: MsgSetDelegateAddressesResponse): unknown {
    const obj: any = {};
    message.id !== undefined && (obj.id = (message.id || Long.UZERO).toString());
    return obj;
  },
  fromPartial(object: DeepPartial<MsgSetDelegateAddressesResponse>): MsgSetDelegateAddressesResponse {
    const message = createBaseMsgSetDelegateAddressesResponse();
    message.id = object.id !== undefined && object.id !== null ? Long.fromValue(object.id) : Long.UZERO;
    return message;
  }
};
function createBaseMsgSeenBtcChainTip(): MsgSeenBtcChainTip {
  return {
    height: Long.UZERO,
    hash: "",
    btcOracleAddress: ""
  };
}
export const MsgSeenBtcChainTip = {
  encode(message: MsgSeenBtcChainTip, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (!message.height.isZero()) {
      writer.uint32(8).uint64(message.height);
    }
    if (message.hash !== "") {
      writer.uint32(18).string(message.hash);
    }
    if (message.btcOracleAddress !== "") {
      writer.uint32(26).string(message.btcOracleAddress);
    }
    return writer;
  },
  decode(input: _m0.Reader | Uint8Array, length?: number): MsgSeenBtcChainTip {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgSeenBtcChainTip();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.height = (reader.uint64() as Long);
          break;
        case 2:
          message.hash = reader.string();
          break;
        case 3:
          message.btcOracleAddress = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): MsgSeenBtcChainTip {
    return {
      height: isSet(object.height) ? Long.fromValue(object.height) : Long.UZERO,
      hash: isSet(object.hash) ? String(object.hash) : "",
      btcOracleAddress: isSet(object.btcOracleAddress) ? String(object.btcOracleAddress) : ""
    };
  },
  toJSON(message: MsgSeenBtcChainTip): unknown {
    const obj: any = {};
    message.height !== undefined && (obj.height = (message.height || Long.UZERO).toString());
    message.hash !== undefined && (obj.hash = message.hash);
    message.btcOracleAddress !== undefined && (obj.btcOracleAddress = message.btcOracleAddress);
    return obj;
  },
  fromPartial(object: DeepPartial<MsgSeenBtcChainTip>): MsgSeenBtcChainTip {
    const message = createBaseMsgSeenBtcChainTip();
    message.height = object.height !== undefined && object.height !== null ? Long.fromValue(object.height) : Long.UZERO;
    message.hash = object.hash ?? "";
    message.btcOracleAddress = object.btcOracleAddress ?? "";
    return message;
  }
};
function createBaseMsgSeenBtcChainTipResponse(): MsgSeenBtcChainTipResponse {
  return {};
}
export const MsgSeenBtcChainTipResponse = {
  encode(_: MsgSeenBtcChainTipResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },
  decode(input: _m0.Reader | Uint8Array, length?: number): MsgSeenBtcChainTipResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgSeenBtcChainTipResponse();
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
  fromJSON(_: any): MsgSeenBtcChainTipResponse {
    return {};
  },
  toJSON(_: MsgSeenBtcChainTipResponse): unknown {
    const obj: any = {};
    return obj;
  },
  fromPartial(_: DeepPartial<MsgSeenBtcChainTipResponse>): MsgSeenBtcChainTipResponse {
    const message = createBaseMsgSeenBtcChainTipResponse();
    return message;
  }
};