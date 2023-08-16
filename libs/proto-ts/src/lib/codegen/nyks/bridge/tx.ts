import { Long, isSet, DeepPartial } from "../../helpers";
import * as _m0 from "protobufjs/minimal";
export interface MsgConfirmBtcDeposit {
  reserveAddress: string;
  depositAmount: Long;
  height: Long;
  hash: string;
  twilightDepositAddress: string;
  oracleAddress: string;
}
export interface MsgConfirmBtcDepositSDKType {
  reserveAddress: string;
  depositAmount: Long;
  height: Long;
  hash: string;
  twilightDepositAddress: string;
  oracleAddress: string;
}
export interface MsgConfirmBtcDepositResponse {
  twilightDepositAddress: string;
}
export interface MsgConfirmBtcDepositResponseSDKType {
  twilightDepositAddress: string;
}
export interface MsgRegisterBtcDepositAddress {
  depositAddress: string;
  twilightDepositAddress: string;
}
export interface MsgRegisterBtcDepositAddressSDKType {
  depositAddress: string;
  twilightDepositAddress: string;
}
export interface MsgRegisterBtcDepositAddressResponse {}
export interface MsgRegisterBtcDepositAddressResponseSDKType {}
export interface MsgRegisterReserveAddress {
  reserveScript: string;
  reserveAddress: string;
  judgeAddress: string;
}
export interface MsgRegisterReserveAddressSDKType {
  reserveScript: string;
  reserveAddress: string;
  judgeAddress: string;
}
export interface MsgRegisterReserveAddressResponse {
  reserveAddress: string;
}
export interface MsgRegisterReserveAddressResponseSDKType {
  reserveAddress: string;
}
export interface MsgRegisterJudge {
  creator: string;
  judgeAddress: string;
  validatorAddress: string;
}
export interface MsgRegisterJudgeSDKType {
  creator: string;
  judgeAddress: string;
  validatorAddress: string;
}
export interface MsgRegisterJudgeResponse {}
export interface MsgRegisterJudgeResponseSDKType {}
/** this line is used by starport scaffolding # proto/tx/message */
export interface MsgWithdrawBtcRequest {
  withdrawAddress: string;
  reserveAddress: string;
  withdrawAmount: Long;
  twilightAddress: string;
}
/** this line is used by starport scaffolding # proto/tx/message */
export interface MsgWithdrawBtcRequestSDKType {
  withdrawAddress: string;
  reserveAddress: string;
  withdrawAmount: Long;
  twilightAddress: string;
}
export interface MsgWithdrawBtcRequestResponse {}
export interface MsgWithdrawBtcRequestResponseSDKType {}
export interface MsgSweepProposal {
  reserveId: Long;
  reserveAddress: string;
  judgeAddress: string;
  btcRelayCapacityValue: Long;
  totalValue: Long;
  privatePoolValue: Long;
  publicValue: Long;
  feePool: Long;
  btcRefundTx: string;
  btcSweepTx: string;
}
export interface MsgSweepProposalSDKType {
  reserveId: Long;
  reserveAddress: string;
  judgeAddress: string;
  btcRelayCapacityValue: Long;
  totalValue: Long;
  privatePoolValue: Long;
  publicValue: Long;
  feePool: Long;
  btcRefundTx: string;
  btcSweepTx: string;
}
export interface MsgSweepProposalResponse {}
export interface MsgSweepProposalResponseSDKType {}
export interface MsgWithdrawTxSigned {
  creator: string;
  validatorAddress: string;
  btcTxSigned: string;
}
export interface MsgWithdrawTxSignedSDKType {
  creator: string;
  validatorAddress: string;
  btcTxSigned: string;
}
export interface MsgWithdrawTxSignedResponse {}
export interface MsgWithdrawTxSignedResponseSDKType {}
export interface MsgWithdrawTxFinal {
  creator: string;
  judgeAddress: string;
  btcTx: string;
}
export interface MsgWithdrawTxFinalSDKType {
  creator: string;
  judgeAddress: string;
  btcTx: string;
}
export interface MsgWithdrawTxFinalResponse {}
export interface MsgWithdrawTxFinalResponseSDKType {}
export interface MsgSignRefund {
  reserveAddress: string;
  signerAddress: string;
  refundSignature: string;
  btcOracleAddress: string;
}
export interface MsgSignRefundSDKType {
  reserveAddress: string;
  signerAddress: string;
  refundSignature: string;
  btcOracleAddress: string;
}
export interface MsgSignRefundResponse {}
export interface MsgSignRefundResponseSDKType {}
export interface MsgSignSweep {
  reserveAddress: string;
  signerAddress: string;
  sweepSignature: string;
  btcOracleAddress: string;
}
export interface MsgSignSweepSDKType {
  reserveAddress: string;
  signerAddress: string;
  sweepSignature: string;
  btcOracleAddress: string;
}
export interface MsgSignSweepResponse {}
export interface MsgSignSweepResponseSDKType {}
export interface MsgBroadcastTxSweep {
  signedRefundTx: string;
  signedSweepTx: string;
  judgeAddress: string;
}
export interface MsgBroadcastTxSweepSDKType {
  signedRefundTx: string;
  signedSweepTx: string;
  judgeAddress: string;
}
export interface MsgBroadcastTxSweepResponse {}
export interface MsgBroadcastTxSweepResponseSDKType {}
export interface MsgProposeRefundHash {
  refundHash: string;
  judgeAddress: string;
}
export interface MsgProposeRefundHashSDKType {
  refundHash: string;
  judgeAddress: string;
}
export interface MsgProposeRefundHashResponse {}
export interface MsgProposeRefundHashResponseSDKType {}
export interface MsgConfirmBtcWithdraw {
  txHash: string;
  height: Long;
  hash: string;
  judgeAddress: string;
}
export interface MsgConfirmBtcWithdrawSDKType {
  txHash: string;
  height: Long;
  hash: string;
  judgeAddress: string;
}
export interface MsgConfirmBtcWithdrawResponse {}
export interface MsgConfirmBtcWithdrawResponseSDKType {}
function createBaseMsgConfirmBtcDeposit(): MsgConfirmBtcDeposit {
  return {
    reserveAddress: "",
    depositAmount: Long.UZERO,
    height: Long.UZERO,
    hash: "",
    twilightDepositAddress: "",
    oracleAddress: ""
  };
}
export const MsgConfirmBtcDeposit = {
  encode(message: MsgConfirmBtcDeposit, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.reserveAddress !== "") {
      writer.uint32(10).string(message.reserveAddress);
    }
    if (!message.depositAmount.isZero()) {
      writer.uint32(16).uint64(message.depositAmount);
    }
    if (!message.height.isZero()) {
      writer.uint32(24).uint64(message.height);
    }
    if (message.hash !== "") {
      writer.uint32(34).string(message.hash);
    }
    if (message.twilightDepositAddress !== "") {
      writer.uint32(42).string(message.twilightDepositAddress);
    }
    if (message.oracleAddress !== "") {
      writer.uint32(58).string(message.oracleAddress);
    }
    return writer;
  },
  decode(input: _m0.Reader | Uint8Array, length?: number): MsgConfirmBtcDeposit {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgConfirmBtcDeposit();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.reserveAddress = reader.string();
          break;
        case 2:
          message.depositAmount = (reader.uint64() as Long);
          break;
        case 3:
          message.height = (reader.uint64() as Long);
          break;
        case 4:
          message.hash = reader.string();
          break;
        case 5:
          message.twilightDepositAddress = reader.string();
          break;
        case 7:
          message.oracleAddress = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): MsgConfirmBtcDeposit {
    return {
      reserveAddress: isSet(object.reserveAddress) ? String(object.reserveAddress) : "",
      depositAmount: isSet(object.depositAmount) ? Long.fromValue(object.depositAmount) : Long.UZERO,
      height: isSet(object.height) ? Long.fromValue(object.height) : Long.UZERO,
      hash: isSet(object.hash) ? String(object.hash) : "",
      twilightDepositAddress: isSet(object.twilightDepositAddress) ? String(object.twilightDepositAddress) : "",
      oracleAddress: isSet(object.oracleAddress) ? String(object.oracleAddress) : ""
    };
  },
  toJSON(message: MsgConfirmBtcDeposit): unknown {
    const obj: any = {};
    message.reserveAddress !== undefined && (obj.reserveAddress = message.reserveAddress);
    message.depositAmount !== undefined && (obj.depositAmount = (message.depositAmount || Long.UZERO).toString());
    message.height !== undefined && (obj.height = (message.height || Long.UZERO).toString());
    message.hash !== undefined && (obj.hash = message.hash);
    message.twilightDepositAddress !== undefined && (obj.twilightDepositAddress = message.twilightDepositAddress);
    message.oracleAddress !== undefined && (obj.oracleAddress = message.oracleAddress);
    return obj;
  },
  fromPartial(object: DeepPartial<MsgConfirmBtcDeposit>): MsgConfirmBtcDeposit {
    const message = createBaseMsgConfirmBtcDeposit();
    message.reserveAddress = object.reserveAddress ?? "";
    message.depositAmount = object.depositAmount !== undefined && object.depositAmount !== null ? Long.fromValue(object.depositAmount) : Long.UZERO;
    message.height = object.height !== undefined && object.height !== null ? Long.fromValue(object.height) : Long.UZERO;
    message.hash = object.hash ?? "";
    message.twilightDepositAddress = object.twilightDepositAddress ?? "";
    message.oracleAddress = object.oracleAddress ?? "";
    return message;
  }
};
function createBaseMsgConfirmBtcDepositResponse(): MsgConfirmBtcDepositResponse {
  return {
    twilightDepositAddress: ""
  };
}
export const MsgConfirmBtcDepositResponse = {
  encode(message: MsgConfirmBtcDepositResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.twilightDepositAddress !== "") {
      writer.uint32(10).string(message.twilightDepositAddress);
    }
    return writer;
  },
  decode(input: _m0.Reader | Uint8Array, length?: number): MsgConfirmBtcDepositResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgConfirmBtcDepositResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.twilightDepositAddress = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): MsgConfirmBtcDepositResponse {
    return {
      twilightDepositAddress: isSet(object.twilightDepositAddress) ? String(object.twilightDepositAddress) : ""
    };
  },
  toJSON(message: MsgConfirmBtcDepositResponse): unknown {
    const obj: any = {};
    message.twilightDepositAddress !== undefined && (obj.twilightDepositAddress = message.twilightDepositAddress);
    return obj;
  },
  fromPartial(object: DeepPartial<MsgConfirmBtcDepositResponse>): MsgConfirmBtcDepositResponse {
    const message = createBaseMsgConfirmBtcDepositResponse();
    message.twilightDepositAddress = object.twilightDepositAddress ?? "";
    return message;
  }
};
function createBaseMsgRegisterBtcDepositAddress(): MsgRegisterBtcDepositAddress {
  return {
    depositAddress: "",
    twilightDepositAddress: ""
  };
}
export const MsgRegisterBtcDepositAddress = {
  encode(message: MsgRegisterBtcDepositAddress, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.depositAddress !== "") {
      writer.uint32(10).string(message.depositAddress);
    }
    if (message.twilightDepositAddress !== "") {
      writer.uint32(18).string(message.twilightDepositAddress);
    }
    return writer;
  },
  decode(input: _m0.Reader | Uint8Array, length?: number): MsgRegisterBtcDepositAddress {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgRegisterBtcDepositAddress();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.depositAddress = reader.string();
          break;
        case 2:
          message.twilightDepositAddress = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): MsgRegisterBtcDepositAddress {
    return {
      depositAddress: isSet(object.depositAddress) ? String(object.depositAddress) : "",
      twilightDepositAddress: isSet(object.twilightDepositAddress) ? String(object.twilightDepositAddress) : ""
    };
  },
  toJSON(message: MsgRegisterBtcDepositAddress): unknown {
    const obj: any = {};
    message.depositAddress !== undefined && (obj.depositAddress = message.depositAddress);
    message.twilightDepositAddress !== undefined && (obj.twilightDepositAddress = message.twilightDepositAddress);
    return obj;
  },
  fromPartial(object: DeepPartial<MsgRegisterBtcDepositAddress>): MsgRegisterBtcDepositAddress {
    const message = createBaseMsgRegisterBtcDepositAddress();
    message.depositAddress = object.depositAddress ?? "";
    message.twilightDepositAddress = object.twilightDepositAddress ?? "";
    return message;
  }
};
function createBaseMsgRegisterBtcDepositAddressResponse(): MsgRegisterBtcDepositAddressResponse {
  return {};
}
export const MsgRegisterBtcDepositAddressResponse = {
  encode(_: MsgRegisterBtcDepositAddressResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },
  decode(input: _m0.Reader | Uint8Array, length?: number): MsgRegisterBtcDepositAddressResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgRegisterBtcDepositAddressResponse();
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
  fromJSON(_: any): MsgRegisterBtcDepositAddressResponse {
    return {};
  },
  toJSON(_: MsgRegisterBtcDepositAddressResponse): unknown {
    const obj: any = {};
    return obj;
  },
  fromPartial(_: DeepPartial<MsgRegisterBtcDepositAddressResponse>): MsgRegisterBtcDepositAddressResponse {
    const message = createBaseMsgRegisterBtcDepositAddressResponse();
    return message;
  }
};
function createBaseMsgRegisterReserveAddress(): MsgRegisterReserveAddress {
  return {
    reserveScript: "",
    reserveAddress: "",
    judgeAddress: ""
  };
}
export const MsgRegisterReserveAddress = {
  encode(message: MsgRegisterReserveAddress, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.reserveScript !== "") {
      writer.uint32(10).string(message.reserveScript);
    }
    if (message.reserveAddress !== "") {
      writer.uint32(18).string(message.reserveAddress);
    }
    if (message.judgeAddress !== "") {
      writer.uint32(26).string(message.judgeAddress);
    }
    return writer;
  },
  decode(input: _m0.Reader | Uint8Array, length?: number): MsgRegisterReserveAddress {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgRegisterReserveAddress();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.reserveScript = reader.string();
          break;
        case 2:
          message.reserveAddress = reader.string();
          break;
        case 3:
          message.judgeAddress = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): MsgRegisterReserveAddress {
    return {
      reserveScript: isSet(object.reserveScript) ? String(object.reserveScript) : "",
      reserveAddress: isSet(object.reserveAddress) ? String(object.reserveAddress) : "",
      judgeAddress: isSet(object.judgeAddress) ? String(object.judgeAddress) : ""
    };
  },
  toJSON(message: MsgRegisterReserveAddress): unknown {
    const obj: any = {};
    message.reserveScript !== undefined && (obj.reserveScript = message.reserveScript);
    message.reserveAddress !== undefined && (obj.reserveAddress = message.reserveAddress);
    message.judgeAddress !== undefined && (obj.judgeAddress = message.judgeAddress);
    return obj;
  },
  fromPartial(object: DeepPartial<MsgRegisterReserveAddress>): MsgRegisterReserveAddress {
    const message = createBaseMsgRegisterReserveAddress();
    message.reserveScript = object.reserveScript ?? "";
    message.reserveAddress = object.reserveAddress ?? "";
    message.judgeAddress = object.judgeAddress ?? "";
    return message;
  }
};
function createBaseMsgRegisterReserveAddressResponse(): MsgRegisterReserveAddressResponse {
  return {
    reserveAddress: ""
  };
}
export const MsgRegisterReserveAddressResponse = {
  encode(message: MsgRegisterReserveAddressResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.reserveAddress !== "") {
      writer.uint32(10).string(message.reserveAddress);
    }
    return writer;
  },
  decode(input: _m0.Reader | Uint8Array, length?: number): MsgRegisterReserveAddressResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgRegisterReserveAddressResponse();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.reserveAddress = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): MsgRegisterReserveAddressResponse {
    return {
      reserveAddress: isSet(object.reserveAddress) ? String(object.reserveAddress) : ""
    };
  },
  toJSON(message: MsgRegisterReserveAddressResponse): unknown {
    const obj: any = {};
    message.reserveAddress !== undefined && (obj.reserveAddress = message.reserveAddress);
    return obj;
  },
  fromPartial(object: DeepPartial<MsgRegisterReserveAddressResponse>): MsgRegisterReserveAddressResponse {
    const message = createBaseMsgRegisterReserveAddressResponse();
    message.reserveAddress = object.reserveAddress ?? "";
    return message;
  }
};
function createBaseMsgRegisterJudge(): MsgRegisterJudge {
  return {
    creator: "",
    judgeAddress: "",
    validatorAddress: ""
  };
}
export const MsgRegisterJudge = {
  encode(message: MsgRegisterJudge, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.judgeAddress !== "") {
      writer.uint32(18).string(message.judgeAddress);
    }
    if (message.validatorAddress !== "") {
      writer.uint32(26).string(message.validatorAddress);
    }
    return writer;
  },
  decode(input: _m0.Reader | Uint8Array, length?: number): MsgRegisterJudge {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgRegisterJudge();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.judgeAddress = reader.string();
          break;
        case 3:
          message.validatorAddress = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): MsgRegisterJudge {
    return {
      creator: isSet(object.creator) ? String(object.creator) : "",
      judgeAddress: isSet(object.judgeAddress) ? String(object.judgeAddress) : "",
      validatorAddress: isSet(object.validatorAddress) ? String(object.validatorAddress) : ""
    };
  },
  toJSON(message: MsgRegisterJudge): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.judgeAddress !== undefined && (obj.judgeAddress = message.judgeAddress);
    message.validatorAddress !== undefined && (obj.validatorAddress = message.validatorAddress);
    return obj;
  },
  fromPartial(object: DeepPartial<MsgRegisterJudge>): MsgRegisterJudge {
    const message = createBaseMsgRegisterJudge();
    message.creator = object.creator ?? "";
    message.judgeAddress = object.judgeAddress ?? "";
    message.validatorAddress = object.validatorAddress ?? "";
    return message;
  }
};
function createBaseMsgRegisterJudgeResponse(): MsgRegisterJudgeResponse {
  return {};
}
export const MsgRegisterJudgeResponse = {
  encode(_: MsgRegisterJudgeResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },
  decode(input: _m0.Reader | Uint8Array, length?: number): MsgRegisterJudgeResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgRegisterJudgeResponse();
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
  fromJSON(_: any): MsgRegisterJudgeResponse {
    return {};
  },
  toJSON(_: MsgRegisterJudgeResponse): unknown {
    const obj: any = {};
    return obj;
  },
  fromPartial(_: DeepPartial<MsgRegisterJudgeResponse>): MsgRegisterJudgeResponse {
    const message = createBaseMsgRegisterJudgeResponse();
    return message;
  }
};
function createBaseMsgWithdrawBtcRequest(): MsgWithdrawBtcRequest {
  return {
    withdrawAddress: "",
    reserveAddress: "",
    withdrawAmount: Long.UZERO,
    twilightAddress: ""
  };
}
export const MsgWithdrawBtcRequest = {
  encode(message: MsgWithdrawBtcRequest, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.withdrawAddress !== "") {
      writer.uint32(10).string(message.withdrawAddress);
    }
    if (message.reserveAddress !== "") {
      writer.uint32(18).string(message.reserveAddress);
    }
    if (!message.withdrawAmount.isZero()) {
      writer.uint32(24).uint64(message.withdrawAmount);
    }
    if (message.twilightAddress !== "") {
      writer.uint32(34).string(message.twilightAddress);
    }
    return writer;
  },
  decode(input: _m0.Reader | Uint8Array, length?: number): MsgWithdrawBtcRequest {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgWithdrawBtcRequest();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.withdrawAddress = reader.string();
          break;
        case 2:
          message.reserveAddress = reader.string();
          break;
        case 3:
          message.withdrawAmount = (reader.uint64() as Long);
          break;
        case 4:
          message.twilightAddress = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): MsgWithdrawBtcRequest {
    return {
      withdrawAddress: isSet(object.withdrawAddress) ? String(object.withdrawAddress) : "",
      reserveAddress: isSet(object.reserveAddress) ? String(object.reserveAddress) : "",
      withdrawAmount: isSet(object.withdrawAmount) ? Long.fromValue(object.withdrawAmount) : Long.UZERO,
      twilightAddress: isSet(object.twilightAddress) ? String(object.twilightAddress) : ""
    };
  },
  toJSON(message: MsgWithdrawBtcRequest): unknown {
    const obj: any = {};
    message.withdrawAddress !== undefined && (obj.withdrawAddress = message.withdrawAddress);
    message.reserveAddress !== undefined && (obj.reserveAddress = message.reserveAddress);
    message.withdrawAmount !== undefined && (obj.withdrawAmount = (message.withdrawAmount || Long.UZERO).toString());
    message.twilightAddress !== undefined && (obj.twilightAddress = message.twilightAddress);
    return obj;
  },
  fromPartial(object: DeepPartial<MsgWithdrawBtcRequest>): MsgWithdrawBtcRequest {
    const message = createBaseMsgWithdrawBtcRequest();
    message.withdrawAddress = object.withdrawAddress ?? "";
    message.reserveAddress = object.reserveAddress ?? "";
    message.withdrawAmount = object.withdrawAmount !== undefined && object.withdrawAmount !== null ? Long.fromValue(object.withdrawAmount) : Long.UZERO;
    message.twilightAddress = object.twilightAddress ?? "";
    return message;
  }
};
function createBaseMsgWithdrawBtcRequestResponse(): MsgWithdrawBtcRequestResponse {
  return {};
}
export const MsgWithdrawBtcRequestResponse = {
  encode(_: MsgWithdrawBtcRequestResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },
  decode(input: _m0.Reader | Uint8Array, length?: number): MsgWithdrawBtcRequestResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgWithdrawBtcRequestResponse();
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
  fromJSON(_: any): MsgWithdrawBtcRequestResponse {
    return {};
  },
  toJSON(_: MsgWithdrawBtcRequestResponse): unknown {
    const obj: any = {};
    return obj;
  },
  fromPartial(_: DeepPartial<MsgWithdrawBtcRequestResponse>): MsgWithdrawBtcRequestResponse {
    const message = createBaseMsgWithdrawBtcRequestResponse();
    return message;
  }
};
function createBaseMsgSweepProposal(): MsgSweepProposal {
  return {
    reserveId: Long.UZERO,
    reserveAddress: "",
    judgeAddress: "",
    btcRelayCapacityValue: Long.UZERO,
    totalValue: Long.UZERO,
    privatePoolValue: Long.UZERO,
    publicValue: Long.UZERO,
    feePool: Long.UZERO,
    btcRefundTx: "",
    btcSweepTx: ""
  };
}
export const MsgSweepProposal = {
  encode(message: MsgSweepProposal, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (!message.reserveId.isZero()) {
      writer.uint32(8).uint64(message.reserveId);
    }
    if (message.reserveAddress !== "") {
      writer.uint32(18).string(message.reserveAddress);
    }
    if (message.judgeAddress !== "") {
      writer.uint32(26).string(message.judgeAddress);
    }
    if (!message.btcRelayCapacityValue.isZero()) {
      writer.uint32(32).uint64(message.btcRelayCapacityValue);
    }
    if (!message.totalValue.isZero()) {
      writer.uint32(40).uint64(message.totalValue);
    }
    if (!message.privatePoolValue.isZero()) {
      writer.uint32(48).uint64(message.privatePoolValue);
    }
    if (!message.publicValue.isZero()) {
      writer.uint32(56).uint64(message.publicValue);
    }
    if (!message.feePool.isZero()) {
      writer.uint32(64).uint64(message.feePool);
    }
    if (message.btcRefundTx !== "") {
      writer.uint32(74).string(message.btcRefundTx);
    }
    if (message.btcSweepTx !== "") {
      writer.uint32(82).string(message.btcSweepTx);
    }
    return writer;
  },
  decode(input: _m0.Reader | Uint8Array, length?: number): MsgSweepProposal {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgSweepProposal();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.reserveId = (reader.uint64() as Long);
          break;
        case 2:
          message.reserveAddress = reader.string();
          break;
        case 3:
          message.judgeAddress = reader.string();
          break;
        case 4:
          message.btcRelayCapacityValue = (reader.uint64() as Long);
          break;
        case 5:
          message.totalValue = (reader.uint64() as Long);
          break;
        case 6:
          message.privatePoolValue = (reader.uint64() as Long);
          break;
        case 7:
          message.publicValue = (reader.uint64() as Long);
          break;
        case 8:
          message.feePool = (reader.uint64() as Long);
          break;
        case 9:
          message.btcRefundTx = reader.string();
          break;
        case 10:
          message.btcSweepTx = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): MsgSweepProposal {
    return {
      reserveId: isSet(object.reserveId) ? Long.fromValue(object.reserveId) : Long.UZERO,
      reserveAddress: isSet(object.reserveAddress) ? String(object.reserveAddress) : "",
      judgeAddress: isSet(object.judgeAddress) ? String(object.judgeAddress) : "",
      btcRelayCapacityValue: isSet(object.btcRelayCapacityValue) ? Long.fromValue(object.btcRelayCapacityValue) : Long.UZERO,
      totalValue: isSet(object.totalValue) ? Long.fromValue(object.totalValue) : Long.UZERO,
      privatePoolValue: isSet(object.privatePoolValue) ? Long.fromValue(object.privatePoolValue) : Long.UZERO,
      publicValue: isSet(object.publicValue) ? Long.fromValue(object.publicValue) : Long.UZERO,
      feePool: isSet(object.feePool) ? Long.fromValue(object.feePool) : Long.UZERO,
      btcRefundTx: isSet(object.btcRefundTx) ? String(object.btcRefundTx) : "",
      btcSweepTx: isSet(object.btcSweepTx) ? String(object.btcSweepTx) : ""
    };
  },
  toJSON(message: MsgSweepProposal): unknown {
    const obj: any = {};
    message.reserveId !== undefined && (obj.reserveId = (message.reserveId || Long.UZERO).toString());
    message.reserveAddress !== undefined && (obj.reserveAddress = message.reserveAddress);
    message.judgeAddress !== undefined && (obj.judgeAddress = message.judgeAddress);
    message.btcRelayCapacityValue !== undefined && (obj.btcRelayCapacityValue = (message.btcRelayCapacityValue || Long.UZERO).toString());
    message.totalValue !== undefined && (obj.totalValue = (message.totalValue || Long.UZERO).toString());
    message.privatePoolValue !== undefined && (obj.privatePoolValue = (message.privatePoolValue || Long.UZERO).toString());
    message.publicValue !== undefined && (obj.publicValue = (message.publicValue || Long.UZERO).toString());
    message.feePool !== undefined && (obj.feePool = (message.feePool || Long.UZERO).toString());
    message.btcRefundTx !== undefined && (obj.btcRefundTx = message.btcRefundTx);
    message.btcSweepTx !== undefined && (obj.btcSweepTx = message.btcSweepTx);
    return obj;
  },
  fromPartial(object: DeepPartial<MsgSweepProposal>): MsgSweepProposal {
    const message = createBaseMsgSweepProposal();
    message.reserveId = object.reserveId !== undefined && object.reserveId !== null ? Long.fromValue(object.reserveId) : Long.UZERO;
    message.reserveAddress = object.reserveAddress ?? "";
    message.judgeAddress = object.judgeAddress ?? "";
    message.btcRelayCapacityValue = object.btcRelayCapacityValue !== undefined && object.btcRelayCapacityValue !== null ? Long.fromValue(object.btcRelayCapacityValue) : Long.UZERO;
    message.totalValue = object.totalValue !== undefined && object.totalValue !== null ? Long.fromValue(object.totalValue) : Long.UZERO;
    message.privatePoolValue = object.privatePoolValue !== undefined && object.privatePoolValue !== null ? Long.fromValue(object.privatePoolValue) : Long.UZERO;
    message.publicValue = object.publicValue !== undefined && object.publicValue !== null ? Long.fromValue(object.publicValue) : Long.UZERO;
    message.feePool = object.feePool !== undefined && object.feePool !== null ? Long.fromValue(object.feePool) : Long.UZERO;
    message.btcRefundTx = object.btcRefundTx ?? "";
    message.btcSweepTx = object.btcSweepTx ?? "";
    return message;
  }
};
function createBaseMsgSweepProposalResponse(): MsgSweepProposalResponse {
  return {};
}
export const MsgSweepProposalResponse = {
  encode(_: MsgSweepProposalResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },
  decode(input: _m0.Reader | Uint8Array, length?: number): MsgSweepProposalResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgSweepProposalResponse();
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
  fromJSON(_: any): MsgSweepProposalResponse {
    return {};
  },
  toJSON(_: MsgSweepProposalResponse): unknown {
    const obj: any = {};
    return obj;
  },
  fromPartial(_: DeepPartial<MsgSweepProposalResponse>): MsgSweepProposalResponse {
    const message = createBaseMsgSweepProposalResponse();
    return message;
  }
};
function createBaseMsgWithdrawTxSigned(): MsgWithdrawTxSigned {
  return {
    creator: "",
    validatorAddress: "",
    btcTxSigned: ""
  };
}
export const MsgWithdrawTxSigned = {
  encode(message: MsgWithdrawTxSigned, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.validatorAddress !== "") {
      writer.uint32(18).string(message.validatorAddress);
    }
    if (message.btcTxSigned !== "") {
      writer.uint32(26).string(message.btcTxSigned);
    }
    return writer;
  },
  decode(input: _m0.Reader | Uint8Array, length?: number): MsgWithdrawTxSigned {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgWithdrawTxSigned();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.validatorAddress = reader.string();
          break;
        case 3:
          message.btcTxSigned = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): MsgWithdrawTxSigned {
    return {
      creator: isSet(object.creator) ? String(object.creator) : "",
      validatorAddress: isSet(object.validatorAddress) ? String(object.validatorAddress) : "",
      btcTxSigned: isSet(object.btcTxSigned) ? String(object.btcTxSigned) : ""
    };
  },
  toJSON(message: MsgWithdrawTxSigned): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.validatorAddress !== undefined && (obj.validatorAddress = message.validatorAddress);
    message.btcTxSigned !== undefined && (obj.btcTxSigned = message.btcTxSigned);
    return obj;
  },
  fromPartial(object: DeepPartial<MsgWithdrawTxSigned>): MsgWithdrawTxSigned {
    const message = createBaseMsgWithdrawTxSigned();
    message.creator = object.creator ?? "";
    message.validatorAddress = object.validatorAddress ?? "";
    message.btcTxSigned = object.btcTxSigned ?? "";
    return message;
  }
};
function createBaseMsgWithdrawTxSignedResponse(): MsgWithdrawTxSignedResponse {
  return {};
}
export const MsgWithdrawTxSignedResponse = {
  encode(_: MsgWithdrawTxSignedResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },
  decode(input: _m0.Reader | Uint8Array, length?: number): MsgWithdrawTxSignedResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgWithdrawTxSignedResponse();
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
  fromJSON(_: any): MsgWithdrawTxSignedResponse {
    return {};
  },
  toJSON(_: MsgWithdrawTxSignedResponse): unknown {
    const obj: any = {};
    return obj;
  },
  fromPartial(_: DeepPartial<MsgWithdrawTxSignedResponse>): MsgWithdrawTxSignedResponse {
    const message = createBaseMsgWithdrawTxSignedResponse();
    return message;
  }
};
function createBaseMsgWithdrawTxFinal(): MsgWithdrawTxFinal {
  return {
    creator: "",
    judgeAddress: "",
    btcTx: ""
  };
}
export const MsgWithdrawTxFinal = {
  encode(message: MsgWithdrawTxFinal, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.creator !== "") {
      writer.uint32(10).string(message.creator);
    }
    if (message.judgeAddress !== "") {
      writer.uint32(18).string(message.judgeAddress);
    }
    if (message.btcTx !== "") {
      writer.uint32(26).string(message.btcTx);
    }
    return writer;
  },
  decode(input: _m0.Reader | Uint8Array, length?: number): MsgWithdrawTxFinal {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgWithdrawTxFinal();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.creator = reader.string();
          break;
        case 2:
          message.judgeAddress = reader.string();
          break;
        case 3:
          message.btcTx = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): MsgWithdrawTxFinal {
    return {
      creator: isSet(object.creator) ? String(object.creator) : "",
      judgeAddress: isSet(object.judgeAddress) ? String(object.judgeAddress) : "",
      btcTx: isSet(object.btcTx) ? String(object.btcTx) : ""
    };
  },
  toJSON(message: MsgWithdrawTxFinal): unknown {
    const obj: any = {};
    message.creator !== undefined && (obj.creator = message.creator);
    message.judgeAddress !== undefined && (obj.judgeAddress = message.judgeAddress);
    message.btcTx !== undefined && (obj.btcTx = message.btcTx);
    return obj;
  },
  fromPartial(object: DeepPartial<MsgWithdrawTxFinal>): MsgWithdrawTxFinal {
    const message = createBaseMsgWithdrawTxFinal();
    message.creator = object.creator ?? "";
    message.judgeAddress = object.judgeAddress ?? "";
    message.btcTx = object.btcTx ?? "";
    return message;
  }
};
function createBaseMsgWithdrawTxFinalResponse(): MsgWithdrawTxFinalResponse {
  return {};
}
export const MsgWithdrawTxFinalResponse = {
  encode(_: MsgWithdrawTxFinalResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },
  decode(input: _m0.Reader | Uint8Array, length?: number): MsgWithdrawTxFinalResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgWithdrawTxFinalResponse();
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
  fromJSON(_: any): MsgWithdrawTxFinalResponse {
    return {};
  },
  toJSON(_: MsgWithdrawTxFinalResponse): unknown {
    const obj: any = {};
    return obj;
  },
  fromPartial(_: DeepPartial<MsgWithdrawTxFinalResponse>): MsgWithdrawTxFinalResponse {
    const message = createBaseMsgWithdrawTxFinalResponse();
    return message;
  }
};
function createBaseMsgSignRefund(): MsgSignRefund {
  return {
    reserveAddress: "",
    signerAddress: "",
    refundSignature: "",
    btcOracleAddress: ""
  };
}
export const MsgSignRefund = {
  encode(message: MsgSignRefund, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.reserveAddress !== "") {
      writer.uint32(10).string(message.reserveAddress);
    }
    if (message.signerAddress !== "") {
      writer.uint32(18).string(message.signerAddress);
    }
    if (message.refundSignature !== "") {
      writer.uint32(26).string(message.refundSignature);
    }
    if (message.btcOracleAddress !== "") {
      writer.uint32(34).string(message.btcOracleAddress);
    }
    return writer;
  },
  decode(input: _m0.Reader | Uint8Array, length?: number): MsgSignRefund {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgSignRefund();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.reserveAddress = reader.string();
          break;
        case 2:
          message.signerAddress = reader.string();
          break;
        case 3:
          message.refundSignature = reader.string();
          break;
        case 4:
          message.btcOracleAddress = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): MsgSignRefund {
    return {
      reserveAddress: isSet(object.reserveAddress) ? String(object.reserveAddress) : "",
      signerAddress: isSet(object.signerAddress) ? String(object.signerAddress) : "",
      refundSignature: isSet(object.refundSignature) ? String(object.refundSignature) : "",
      btcOracleAddress: isSet(object.btcOracleAddress) ? String(object.btcOracleAddress) : ""
    };
  },
  toJSON(message: MsgSignRefund): unknown {
    const obj: any = {};
    message.reserveAddress !== undefined && (obj.reserveAddress = message.reserveAddress);
    message.signerAddress !== undefined && (obj.signerAddress = message.signerAddress);
    message.refundSignature !== undefined && (obj.refundSignature = message.refundSignature);
    message.btcOracleAddress !== undefined && (obj.btcOracleAddress = message.btcOracleAddress);
    return obj;
  },
  fromPartial(object: DeepPartial<MsgSignRefund>): MsgSignRefund {
    const message = createBaseMsgSignRefund();
    message.reserveAddress = object.reserveAddress ?? "";
    message.signerAddress = object.signerAddress ?? "";
    message.refundSignature = object.refundSignature ?? "";
    message.btcOracleAddress = object.btcOracleAddress ?? "";
    return message;
  }
};
function createBaseMsgSignRefundResponse(): MsgSignRefundResponse {
  return {};
}
export const MsgSignRefundResponse = {
  encode(_: MsgSignRefundResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },
  decode(input: _m0.Reader | Uint8Array, length?: number): MsgSignRefundResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgSignRefundResponse();
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
  fromJSON(_: any): MsgSignRefundResponse {
    return {};
  },
  toJSON(_: MsgSignRefundResponse): unknown {
    const obj: any = {};
    return obj;
  },
  fromPartial(_: DeepPartial<MsgSignRefundResponse>): MsgSignRefundResponse {
    const message = createBaseMsgSignRefundResponse();
    return message;
  }
};
function createBaseMsgSignSweep(): MsgSignSweep {
  return {
    reserveAddress: "",
    signerAddress: "",
    sweepSignature: "",
    btcOracleAddress: ""
  };
}
export const MsgSignSweep = {
  encode(message: MsgSignSweep, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.reserveAddress !== "") {
      writer.uint32(10).string(message.reserveAddress);
    }
    if (message.signerAddress !== "") {
      writer.uint32(18).string(message.signerAddress);
    }
    if (message.sweepSignature !== "") {
      writer.uint32(26).string(message.sweepSignature);
    }
    if (message.btcOracleAddress !== "") {
      writer.uint32(34).string(message.btcOracleAddress);
    }
    return writer;
  },
  decode(input: _m0.Reader | Uint8Array, length?: number): MsgSignSweep {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgSignSweep();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.reserveAddress = reader.string();
          break;
        case 2:
          message.signerAddress = reader.string();
          break;
        case 3:
          message.sweepSignature = reader.string();
          break;
        case 4:
          message.btcOracleAddress = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): MsgSignSweep {
    return {
      reserveAddress: isSet(object.reserveAddress) ? String(object.reserveAddress) : "",
      signerAddress: isSet(object.signerAddress) ? String(object.signerAddress) : "",
      sweepSignature: isSet(object.sweepSignature) ? String(object.sweepSignature) : "",
      btcOracleAddress: isSet(object.btcOracleAddress) ? String(object.btcOracleAddress) : ""
    };
  },
  toJSON(message: MsgSignSweep): unknown {
    const obj: any = {};
    message.reserveAddress !== undefined && (obj.reserveAddress = message.reserveAddress);
    message.signerAddress !== undefined && (obj.signerAddress = message.signerAddress);
    message.sweepSignature !== undefined && (obj.sweepSignature = message.sweepSignature);
    message.btcOracleAddress !== undefined && (obj.btcOracleAddress = message.btcOracleAddress);
    return obj;
  },
  fromPartial(object: DeepPartial<MsgSignSweep>): MsgSignSweep {
    const message = createBaseMsgSignSweep();
    message.reserveAddress = object.reserveAddress ?? "";
    message.signerAddress = object.signerAddress ?? "";
    message.sweepSignature = object.sweepSignature ?? "";
    message.btcOracleAddress = object.btcOracleAddress ?? "";
    return message;
  }
};
function createBaseMsgSignSweepResponse(): MsgSignSweepResponse {
  return {};
}
export const MsgSignSweepResponse = {
  encode(_: MsgSignSweepResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },
  decode(input: _m0.Reader | Uint8Array, length?: number): MsgSignSweepResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgSignSweepResponse();
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
  fromJSON(_: any): MsgSignSweepResponse {
    return {};
  },
  toJSON(_: MsgSignSweepResponse): unknown {
    const obj: any = {};
    return obj;
  },
  fromPartial(_: DeepPartial<MsgSignSweepResponse>): MsgSignSweepResponse {
    const message = createBaseMsgSignSweepResponse();
    return message;
  }
};
function createBaseMsgBroadcastTxSweep(): MsgBroadcastTxSweep {
  return {
    signedRefundTx: "",
    signedSweepTx: "",
    judgeAddress: ""
  };
}
export const MsgBroadcastTxSweep = {
  encode(message: MsgBroadcastTxSweep, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.signedRefundTx !== "") {
      writer.uint32(10).string(message.signedRefundTx);
    }
    if (message.signedSweepTx !== "") {
      writer.uint32(18).string(message.signedSweepTx);
    }
    if (message.judgeAddress !== "") {
      writer.uint32(26).string(message.judgeAddress);
    }
    return writer;
  },
  decode(input: _m0.Reader | Uint8Array, length?: number): MsgBroadcastTxSweep {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgBroadcastTxSweep();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.signedRefundTx = reader.string();
          break;
        case 2:
          message.signedSweepTx = reader.string();
          break;
        case 3:
          message.judgeAddress = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): MsgBroadcastTxSweep {
    return {
      signedRefundTx: isSet(object.signedRefundTx) ? String(object.signedRefundTx) : "",
      signedSweepTx: isSet(object.signedSweepTx) ? String(object.signedSweepTx) : "",
      judgeAddress: isSet(object.judgeAddress) ? String(object.judgeAddress) : ""
    };
  },
  toJSON(message: MsgBroadcastTxSweep): unknown {
    const obj: any = {};
    message.signedRefundTx !== undefined && (obj.signedRefundTx = message.signedRefundTx);
    message.signedSweepTx !== undefined && (obj.signedSweepTx = message.signedSweepTx);
    message.judgeAddress !== undefined && (obj.judgeAddress = message.judgeAddress);
    return obj;
  },
  fromPartial(object: DeepPartial<MsgBroadcastTxSweep>): MsgBroadcastTxSweep {
    const message = createBaseMsgBroadcastTxSweep();
    message.signedRefundTx = object.signedRefundTx ?? "";
    message.signedSweepTx = object.signedSweepTx ?? "";
    message.judgeAddress = object.judgeAddress ?? "";
    return message;
  }
};
function createBaseMsgBroadcastTxSweepResponse(): MsgBroadcastTxSweepResponse {
  return {};
}
export const MsgBroadcastTxSweepResponse = {
  encode(_: MsgBroadcastTxSweepResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },
  decode(input: _m0.Reader | Uint8Array, length?: number): MsgBroadcastTxSweepResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgBroadcastTxSweepResponse();
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
  fromJSON(_: any): MsgBroadcastTxSweepResponse {
    return {};
  },
  toJSON(_: MsgBroadcastTxSweepResponse): unknown {
    const obj: any = {};
    return obj;
  },
  fromPartial(_: DeepPartial<MsgBroadcastTxSweepResponse>): MsgBroadcastTxSweepResponse {
    const message = createBaseMsgBroadcastTxSweepResponse();
    return message;
  }
};
function createBaseMsgProposeRefundHash(): MsgProposeRefundHash {
  return {
    refundHash: "",
    judgeAddress: ""
  };
}
export const MsgProposeRefundHash = {
  encode(message: MsgProposeRefundHash, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.refundHash !== "") {
      writer.uint32(10).string(message.refundHash);
    }
    if (message.judgeAddress !== "") {
      writer.uint32(18).string(message.judgeAddress);
    }
    return writer;
  },
  decode(input: _m0.Reader | Uint8Array, length?: number): MsgProposeRefundHash {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgProposeRefundHash();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.refundHash = reader.string();
          break;
        case 2:
          message.judgeAddress = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): MsgProposeRefundHash {
    return {
      refundHash: isSet(object.refundHash) ? String(object.refundHash) : "",
      judgeAddress: isSet(object.judgeAddress) ? String(object.judgeAddress) : ""
    };
  },
  toJSON(message: MsgProposeRefundHash): unknown {
    const obj: any = {};
    message.refundHash !== undefined && (obj.refundHash = message.refundHash);
    message.judgeAddress !== undefined && (obj.judgeAddress = message.judgeAddress);
    return obj;
  },
  fromPartial(object: DeepPartial<MsgProposeRefundHash>): MsgProposeRefundHash {
    const message = createBaseMsgProposeRefundHash();
    message.refundHash = object.refundHash ?? "";
    message.judgeAddress = object.judgeAddress ?? "";
    return message;
  }
};
function createBaseMsgProposeRefundHashResponse(): MsgProposeRefundHashResponse {
  return {};
}
export const MsgProposeRefundHashResponse = {
  encode(_: MsgProposeRefundHashResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },
  decode(input: _m0.Reader | Uint8Array, length?: number): MsgProposeRefundHashResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgProposeRefundHashResponse();
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
  fromJSON(_: any): MsgProposeRefundHashResponse {
    return {};
  },
  toJSON(_: MsgProposeRefundHashResponse): unknown {
    const obj: any = {};
    return obj;
  },
  fromPartial(_: DeepPartial<MsgProposeRefundHashResponse>): MsgProposeRefundHashResponse {
    const message = createBaseMsgProposeRefundHashResponse();
    return message;
  }
};
function createBaseMsgConfirmBtcWithdraw(): MsgConfirmBtcWithdraw {
  return {
    txHash: "",
    height: Long.UZERO,
    hash: "",
    judgeAddress: ""
  };
}
export const MsgConfirmBtcWithdraw = {
  encode(message: MsgConfirmBtcWithdraw, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    if (message.txHash !== "") {
      writer.uint32(10).string(message.txHash);
    }
    if (!message.height.isZero()) {
      writer.uint32(16).uint64(message.height);
    }
    if (message.hash !== "") {
      writer.uint32(26).string(message.hash);
    }
    if (message.judgeAddress !== "") {
      writer.uint32(34).string(message.judgeAddress);
    }
    return writer;
  },
  decode(input: _m0.Reader | Uint8Array, length?: number): MsgConfirmBtcWithdraw {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgConfirmBtcWithdraw();
    while (reader.pos < end) {
      const tag = reader.uint32();
      switch (tag >>> 3) {
        case 1:
          message.txHash = reader.string();
          break;
        case 2:
          message.height = (reader.uint64() as Long);
          break;
        case 3:
          message.hash = reader.string();
          break;
        case 4:
          message.judgeAddress = reader.string();
          break;
        default:
          reader.skipType(tag & 7);
          break;
      }
    }
    return message;
  },
  fromJSON(object: any): MsgConfirmBtcWithdraw {
    return {
      txHash: isSet(object.txHash) ? String(object.txHash) : "",
      height: isSet(object.height) ? Long.fromValue(object.height) : Long.UZERO,
      hash: isSet(object.hash) ? String(object.hash) : "",
      judgeAddress: isSet(object.judgeAddress) ? String(object.judgeAddress) : ""
    };
  },
  toJSON(message: MsgConfirmBtcWithdraw): unknown {
    const obj: any = {};
    message.txHash !== undefined && (obj.txHash = message.txHash);
    message.height !== undefined && (obj.height = (message.height || Long.UZERO).toString());
    message.hash !== undefined && (obj.hash = message.hash);
    message.judgeAddress !== undefined && (obj.judgeAddress = message.judgeAddress);
    return obj;
  },
  fromPartial(object: DeepPartial<MsgConfirmBtcWithdraw>): MsgConfirmBtcWithdraw {
    const message = createBaseMsgConfirmBtcWithdraw();
    message.txHash = object.txHash ?? "";
    message.height = object.height !== undefined && object.height !== null ? Long.fromValue(object.height) : Long.UZERO;
    message.hash = object.hash ?? "";
    message.judgeAddress = object.judgeAddress ?? "";
    return message;
  }
};
function createBaseMsgConfirmBtcWithdrawResponse(): MsgConfirmBtcWithdrawResponse {
  return {};
}
export const MsgConfirmBtcWithdrawResponse = {
  encode(_: MsgConfirmBtcWithdrawResponse, writer: _m0.Writer = _m0.Writer.create()): _m0.Writer {
    return writer;
  },
  decode(input: _m0.Reader | Uint8Array, length?: number): MsgConfirmBtcWithdrawResponse {
    const reader = input instanceof _m0.Reader ? input : new _m0.Reader(input);
    let end = length === undefined ? reader.len : reader.pos + length;
    const message = createBaseMsgConfirmBtcWithdrawResponse();
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
  fromJSON(_: any): MsgConfirmBtcWithdrawResponse {
    return {};
  },
  toJSON(_: MsgConfirmBtcWithdrawResponse): unknown {
    const obj: any = {};
    return obj;
  },
  fromPartial(_: DeepPartial<MsgConfirmBtcWithdrawResponse>): MsgConfirmBtcWithdrawResponse {
    const message = createBaseMsgConfirmBtcWithdrawResponse();
    return message;
  }
};