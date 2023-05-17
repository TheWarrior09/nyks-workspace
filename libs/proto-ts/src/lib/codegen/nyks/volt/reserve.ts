import { Long, isSet, DeepPartial } from "../../helpers";
import * as _m0 from "protobufjs/minimal";
/**
 * IndividualTwilightReserveAccount is used to keep a mapping of how much btc an individual
 * twilight address has in the reserve
 */
export interface IndividualTwilightReserveAccount {
  TwilightAddress: string;
  BtcValue: Long;
}
/**
 * IndividualTwilightReserveAccount is used to keep a mapping of how much btc an individual
 * twilight address has in the reserve
 */
export interface IndividualTwilightReserveAccountSDKType {
  TwilightAddress: string;
  BtcValue: Long;
}
/**
 * BtcReserve is a mapping of a validator address to a reserve ID
 * It holds other values in the reserve struct such as total
 * value, private pool value, public pool value, and the btc relay capacity value
 */
export interface BtcReserve {
  ReserveId: Long;
  ReserveAddress: string;
  JudgeAddress: string;
  BtcRelayCapacityValue: Long;
  TotalValue: Long;
  PrivatePoolValue: Long;
  PublicValue: Long;
  FeePool: Long;
  IndividualTwilightReserveAccount: IndividualTwilightReserveAccount[];
}
/**
 * BtcReserve is a mapping of a validator address to a reserve ID
 * It holds other values in the reserve struct such as total
 * value, private pool value, public pool value, and the btc relay capacity value
 */
export interface BtcReserveSDKType {
  ReserveId: Long;
  ReserveAddress: string;
  JudgeAddress: string;
  BtcRelayCapacityValue: Long;
  TotalValue: Long;
  PrivatePoolValue: Long;
  PublicValue: Long;
  FeePool: Long;
  IndividualTwilightReserveAccount: IndividualTwilightReserveAccountSDKType[];
}
function createBaseIndividualTwilightReserveAccount(): IndividualTwilightReserveAccount {
  return {
    TwilightAddress: "",
    BtcValue: Long.UZERO
  };
}
export const IndividualTwilightReserveAccount = {
  encode(message: IndividualTwilightReserveAccount, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.TwilightAddress !== "") {
      writer.uint32(10).string(message.TwilightAddress);
    }
    if (!message.BtcValue.isZero()) {
      writer.uint32(16).uint64(message.BtcValue);
    }
    return writer;
  },
  decode(input: _m0.Reader | Uint8Array, length?: number): IndividualTwilightReserveAccount {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseIndividualTwilightReserveAccount();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.TwilightAddress = reader.string();
          break;
        case 2:
          message.BtcValue = (reader.uint64() as Long);
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): IndividualTwilightReserveAccount {
    return {
      TwilightAddress: isSet(object.TwilightAddress) ? String(object.TwilightAddress) : "",
      BtcValue: isSet(object.BtcValue) ? Long.fromValue(object.BtcValue) : Long.UZERO
    };
  },
  toJSON(message: IndividualTwilightReserveAccount): unknown {
    const obj: any = {};
    message.TwilightAddress !== undefined && (obj.TwilightAddress = message.TwilightAddress);
    message.BtcValue !== undefined && (obj.BtcValue = (message.BtcValue || Long.UZERO).toString());
    return obj;
  },
  fromPartial(object: DeepPartial<IndividualTwilightReserveAccount>): IndividualTwilightReserveAccount {
    const message = createBaseIndividualTwilightReserveAccount();
    message.TwilightAddress = object.TwilightAddress ?? "";
    message.BtcValue = object.BtcValue !== undefined && object.BtcValue !== null ? Long.fromValue(object.BtcValue) : Long.UZERO;
    return message;
  }
};
function createBaseBtcReserve(): BtcReserve {
  return {
    ReserveId: Long.UZERO,
    ReserveAddress: "",
    JudgeAddress: "",
    BtcRelayCapacityValue: Long.UZERO,
    TotalValue: Long.UZERO,
    PrivatePoolValue: Long.UZERO,
    PublicValue: Long.UZERO,
    FeePool: Long.UZERO,
    IndividualTwilightReserveAccount: []
  };
}
export const BtcReserve = {
  encode(message: BtcReserve, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (!message.ReserveId.isZero()) {
      writer.uint32(8).uint64(message.ReserveId);
    }
    if (message.ReserveAddress !== "") {
      writer.uint32(18).string(message.ReserveAddress);
    }
    if (message.JudgeAddress !== "") {
      writer.uint32(26).string(message.JudgeAddress);
    }
    if (!message.BtcRelayCapacityValue.isZero()) {
      writer.uint32(32).uint64(message.BtcRelayCapacityValue);
    }
    if (!message.TotalValue.isZero()) {
      writer.uint32(40).uint64(message.TotalValue);
    }
    if (!message.PrivatePoolValue.isZero()) {
      writer.uint32(48).uint64(message.PrivatePoolValue);
    }
    if (!message.PublicValue.isZero()) {
      writer.uint32(56).uint64(message.PublicValue);
    }
    if (!message.FeePool.isZero()) {
      writer.uint32(64).uint64(message.FeePool);
    }
    for (const v of message.IndividualTwilightReserveAccount) {
      IndividualTwilightReserveAccount.encode(v!, writer.uint32(74).fork()).ldelim();
    }
    return writer;
  },
  decode(input: _m0.Reader | Uint8Array, length?: number): BtcReserve {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseBtcReserve();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.ReserveId = (reader.uint64() as Long);
          break;
        case 2:
          message.ReserveAddress = reader.string();
          break;
        case 3:
          message.JudgeAddress = reader.string();
          break;
        case 4:
          message.BtcRelayCapacityValue = (reader.uint64() as Long);
          break;
        case 5:
          message.TotalValue = (reader.uint64() as Long);
          break;
        case 6:
          message.PrivatePoolValue = (reader.uint64() as Long);
          break;
        case 7:
          message.PublicValue = (reader.uint64() as Long);
          break;
        case 8:
          message.FeePool = (reader.uint64() as Long);
          break;
        case 9:
          message.IndividualTwilightReserveAccount.push(IndividualTwilightReserveAccount.decode(reader, reader.uint32()));
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): BtcReserve {
    return {
      ReserveId: isSet(object.ReserveId) ? Long.fromValue(object.ReserveId) : Long.UZERO,
      ReserveAddress: isSet(object.ReserveAddress) ? String(object.ReserveAddress) : "",
      JudgeAddress: isSet(object.JudgeAddress) ? String(object.JudgeAddress) : "",
      BtcRelayCapacityValue: isSet(object.BtcRelayCapacityValue) ? Long.fromValue(object.BtcRelayCapacityValue) : Long.UZERO,
      TotalValue: isSet(object.TotalValue) ? Long.fromValue(object.TotalValue) : Long.UZERO,
      PrivatePoolValue: isSet(object.PrivatePoolValue) ? Long.fromValue(object.PrivatePoolValue) : Long.UZERO,
      PublicValue: isSet(object.PublicValue) ? Long.fromValue(object.PublicValue) : Long.UZERO,
      FeePool: isSet(object.FeePool) ? Long.fromValue(object.FeePool) : Long.UZERO,
      IndividualTwilightReserveAccount: Array.isArray(object?.IndividualTwilightReserveAccount) ? object.IndividualTwilightReserveAccount.map((e: any) => IndividualTwilightReserveAccount.fromJSON(e)) : []
    };
  },
  toJSON(message: BtcReserve): unknown {
    const obj: any = {};
    message.ReserveId !== undefined && (obj.ReserveId = (message.ReserveId || Long.UZERO).toString());
    message.ReserveAddress !== undefined && (obj.ReserveAddress = message.ReserveAddress);
    message.JudgeAddress !== undefined && (obj.JudgeAddress = message.JudgeAddress);
    message.BtcRelayCapacityValue !== undefined && (obj.BtcRelayCapacityValue = (message.BtcRelayCapacityValue || Long.UZERO).toString());
    message.TotalValue !== undefined && (obj.TotalValue = (message.TotalValue || Long.UZERO).toString());
    message.PrivatePoolValue !== undefined && (obj.PrivatePoolValue = (message.PrivatePoolValue || Long.UZERO).toString());
    message.PublicValue !== undefined && (obj.PublicValue = (message.PublicValue || Long.UZERO).toString());
    message.FeePool !== undefined && (obj.FeePool = (message.FeePool || Long.UZERO).toString());
    if (message.IndividualTwilightReserveAccount) {
      obj.IndividualTwilightReserveAccount = message.IndividualTwilightReserveAccount.map(e => e ? IndividualTwilightReserveAccount.toJSON(e) : undefined);
    } else {
      obj.IndividualTwilightReserveAccount = [];
    }
    return obj;
  },
  fromPartial(object: DeepPartial<BtcReserve>): BtcReserve {
    const message = createBaseBtcReserve();
    message.ReserveId = object.ReserveId !== undefined && object.ReserveId !== null ? Long.fromValue(object.ReserveId) : Long.UZERO;
    message.ReserveAddress = object.ReserveAddress ?? "";
    message.JudgeAddress = object.JudgeAddress ?? "";
    message.BtcRelayCapacityValue = object.BtcRelayCapacityValue !== undefined && object.BtcRelayCapacityValue !== null ? Long.fromValue(object.BtcRelayCapacityValue) : Long.UZERO;
    message.TotalValue = object.TotalValue !== undefined && object.TotalValue !== null ? Long.fromValue(object.TotalValue) : Long.UZERO;
    message.PrivatePoolValue = object.PrivatePoolValue !== undefined && object.PrivatePoolValue !== null ? Long.fromValue(object.PrivatePoolValue) : Long.UZERO;
    message.PublicValue = object.PublicValue !== undefined && object.PublicValue !== null ? Long.fromValue(object.PublicValue) : Long.UZERO;
    message.FeePool = object.FeePool !== undefined && object.FeePool !== null ? Long.fromValue(object.FeePool) : Long.UZERO;
    message.IndividualTwilightReserveAccount = object.IndividualTwilightReserveAccount?.map(e => IndividualTwilightReserveAccount.fromPartial(e)) || [];
    return message;
  }
};