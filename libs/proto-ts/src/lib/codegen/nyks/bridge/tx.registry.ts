import { GeneratedType, Registry } from "@cosmjs/proto-signing";
import { MsgConfirmBtcDeposit, MsgRegisterBtcDepositAddress, MsgRegisterReserveAddress, MsgRegisterJudge, MsgWithdrawBtcRequest, MsgSweepProposal, MsgWithdrawTxSigned, MsgWithdrawTxFinal, MsgConfirmBtcWithdraw, MsgSignRefund, MsgBroadcastRefund } from "./tx";
export const registry: ReadonlyArray<[string, GeneratedType]> = [["/twilightproject.nyks.bridge.MsgConfirmBtcDeposit", MsgConfirmBtcDeposit], ["/twilightproject.nyks.bridge.MsgRegisterBtcDepositAddress", MsgRegisterBtcDepositAddress], ["/twilightproject.nyks.bridge.MsgRegisterReserveAddress", MsgRegisterReserveAddress], ["/twilightproject.nyks.bridge.MsgRegisterJudge", MsgRegisterJudge], ["/twilightproject.nyks.bridge.MsgWithdrawBtcRequest", MsgWithdrawBtcRequest], ["/twilightproject.nyks.bridge.MsgSweepProposal", MsgSweepProposal], ["/twilightproject.nyks.bridge.MsgWithdrawTxSigned", MsgWithdrawTxSigned], ["/twilightproject.nyks.bridge.MsgWithdrawTxFinal", MsgWithdrawTxFinal], ["/twilightproject.nyks.bridge.MsgConfirmBtcWithdraw", MsgConfirmBtcWithdraw], ["/twilightproject.nyks.bridge.MsgSignRefund", MsgSignRefund], ["/twilightproject.nyks.bridge.MsgBroadcastRefund", MsgBroadcastRefund]];
export const load = (protoRegistry: Registry) => {
  registry.forEach(([typeUrl, mod]) => {
    protoRegistry.register(typeUrl, mod);
  });
};
export const MessageComposer = {
  encoded: {
    confirmBtcDeposit(value: MsgConfirmBtcDeposit) {
      return {
        typeUrl: "/twilightproject.nyks.bridge.MsgConfirmBtcDeposit",
        value: MsgConfirmBtcDeposit.encode(value).finish()
      };
    },
    registerBtcDepositAddress(value: MsgRegisterBtcDepositAddress) {
      return {
        typeUrl: "/twilightproject.nyks.bridge.MsgRegisterBtcDepositAddress",
        value: MsgRegisterBtcDepositAddress.encode(value).finish()
      };
    },
    registerReserveAddress(value: MsgRegisterReserveAddress) {
      return {
        typeUrl: "/twilightproject.nyks.bridge.MsgRegisterReserveAddress",
        value: MsgRegisterReserveAddress.encode(value).finish()
      };
    },
    registerJudge(value: MsgRegisterJudge) {
      return {
        typeUrl: "/twilightproject.nyks.bridge.MsgRegisterJudge",
        value: MsgRegisterJudge.encode(value).finish()
      };
    },
    withdrawBtcRequest(value: MsgWithdrawBtcRequest) {
      return {
        typeUrl: "/twilightproject.nyks.bridge.MsgWithdrawBtcRequest",
        value: MsgWithdrawBtcRequest.encode(value).finish()
      };
    },
    sweepProposal(value: MsgSweepProposal) {
      return {
        typeUrl: "/twilightproject.nyks.bridge.MsgSweepProposal",
        value: MsgSweepProposal.encode(value).finish()
      };
    },
    withdrawTxSigned(value: MsgWithdrawTxSigned) {
      return {
        typeUrl: "/twilightproject.nyks.bridge.MsgWithdrawTxSigned",
        value: MsgWithdrawTxSigned.encode(value).finish()
      };
    },
    withdrawTxFinal(value: MsgWithdrawTxFinal) {
      return {
        typeUrl: "/twilightproject.nyks.bridge.MsgWithdrawTxFinal",
        value: MsgWithdrawTxFinal.encode(value).finish()
      };
    },
    confirmBtcWithdraw(value: MsgConfirmBtcWithdraw) {
      return {
        typeUrl: "/twilightproject.nyks.bridge.MsgConfirmBtcWithdraw",
        value: MsgConfirmBtcWithdraw.encode(value).finish()
      };
    },
    signRefund(value: MsgSignRefund) {
      return {
        typeUrl: "/twilightproject.nyks.bridge.MsgSignRefund",
        value: MsgSignRefund.encode(value).finish()
      };
    },
    broadcastRefund(value: MsgBroadcastRefund) {
      return {
        typeUrl: "/twilightproject.nyks.bridge.MsgBroadcastRefund",
        value: MsgBroadcastRefund.encode(value).finish()
      };
    }
  },
  withTypeUrl: {
    confirmBtcDeposit(value: MsgConfirmBtcDeposit) {
      return {
        typeUrl: "/twilightproject.nyks.bridge.MsgConfirmBtcDeposit",
        value
      };
    },
    registerBtcDepositAddress(value: MsgRegisterBtcDepositAddress) {
      return {
        typeUrl: "/twilightproject.nyks.bridge.MsgRegisterBtcDepositAddress",
        value
      };
    },
    registerReserveAddress(value: MsgRegisterReserveAddress) {
      return {
        typeUrl: "/twilightproject.nyks.bridge.MsgRegisterReserveAddress",
        value
      };
    },
    registerJudge(value: MsgRegisterJudge) {
      return {
        typeUrl: "/twilightproject.nyks.bridge.MsgRegisterJudge",
        value
      };
    },
    withdrawBtcRequest(value: MsgWithdrawBtcRequest) {
      return {
        typeUrl: "/twilightproject.nyks.bridge.MsgWithdrawBtcRequest",
        value
      };
    },
    sweepProposal(value: MsgSweepProposal) {
      return {
        typeUrl: "/twilightproject.nyks.bridge.MsgSweepProposal",
        value
      };
    },
    withdrawTxSigned(value: MsgWithdrawTxSigned) {
      return {
        typeUrl: "/twilightproject.nyks.bridge.MsgWithdrawTxSigned",
        value
      };
    },
    withdrawTxFinal(value: MsgWithdrawTxFinal) {
      return {
        typeUrl: "/twilightproject.nyks.bridge.MsgWithdrawTxFinal",
        value
      };
    },
    confirmBtcWithdraw(value: MsgConfirmBtcWithdraw) {
      return {
        typeUrl: "/twilightproject.nyks.bridge.MsgConfirmBtcWithdraw",
        value
      };
    },
    signRefund(value: MsgSignRefund) {
      return {
        typeUrl: "/twilightproject.nyks.bridge.MsgSignRefund",
        value
      };
    },
    broadcastRefund(value: MsgBroadcastRefund) {
      return {
        typeUrl: "/twilightproject.nyks.bridge.MsgBroadcastRefund",
        value
      };
    }
  },
  toJSON: {
    confirmBtcDeposit(value: MsgConfirmBtcDeposit) {
      return {
        typeUrl: "/twilightproject.nyks.bridge.MsgConfirmBtcDeposit",
        value: MsgConfirmBtcDeposit.toJSON(value)
      };
    },
    registerBtcDepositAddress(value: MsgRegisterBtcDepositAddress) {
      return {
        typeUrl: "/twilightproject.nyks.bridge.MsgRegisterBtcDepositAddress",
        value: MsgRegisterBtcDepositAddress.toJSON(value)
      };
    },
    registerReserveAddress(value: MsgRegisterReserveAddress) {
      return {
        typeUrl: "/twilightproject.nyks.bridge.MsgRegisterReserveAddress",
        value: MsgRegisterReserveAddress.toJSON(value)
      };
    },
    registerJudge(value: MsgRegisterJudge) {
      return {
        typeUrl: "/twilightproject.nyks.bridge.MsgRegisterJudge",
        value: MsgRegisterJudge.toJSON(value)
      };
    },
    withdrawBtcRequest(value: MsgWithdrawBtcRequest) {
      return {
        typeUrl: "/twilightproject.nyks.bridge.MsgWithdrawBtcRequest",
        value: MsgWithdrawBtcRequest.toJSON(value)
      };
    },
    sweepProposal(value: MsgSweepProposal) {
      return {
        typeUrl: "/twilightproject.nyks.bridge.MsgSweepProposal",
        value: MsgSweepProposal.toJSON(value)
      };
    },
    withdrawTxSigned(value: MsgWithdrawTxSigned) {
      return {
        typeUrl: "/twilightproject.nyks.bridge.MsgWithdrawTxSigned",
        value: MsgWithdrawTxSigned.toJSON(value)
      };
    },
    withdrawTxFinal(value: MsgWithdrawTxFinal) {
      return {
        typeUrl: "/twilightproject.nyks.bridge.MsgWithdrawTxFinal",
        value: MsgWithdrawTxFinal.toJSON(value)
      };
    },
    confirmBtcWithdraw(value: MsgConfirmBtcWithdraw) {
      return {
        typeUrl: "/twilightproject.nyks.bridge.MsgConfirmBtcWithdraw",
        value: MsgConfirmBtcWithdraw.toJSON(value)
      };
    },
    signRefund(value: MsgSignRefund) {
      return {
        typeUrl: "/twilightproject.nyks.bridge.MsgSignRefund",
        value: MsgSignRefund.toJSON(value)
      };
    },
    broadcastRefund(value: MsgBroadcastRefund) {
      return {
        typeUrl: "/twilightproject.nyks.bridge.MsgBroadcastRefund",
        value: MsgBroadcastRefund.toJSON(value)
      };
    }
  },
  fromJSON: {
    confirmBtcDeposit(value: any) {
      return {
        typeUrl: "/twilightproject.nyks.bridge.MsgConfirmBtcDeposit",
        value: MsgConfirmBtcDeposit.fromJSON(value)
      };
    },
    registerBtcDepositAddress(value: any) {
      return {
        typeUrl: "/twilightproject.nyks.bridge.MsgRegisterBtcDepositAddress",
        value: MsgRegisterBtcDepositAddress.fromJSON(value)
      };
    },
    registerReserveAddress(value: any) {
      return {
        typeUrl: "/twilightproject.nyks.bridge.MsgRegisterReserveAddress",
        value: MsgRegisterReserveAddress.fromJSON(value)
      };
    },
    registerJudge(value: any) {
      return {
        typeUrl: "/twilightproject.nyks.bridge.MsgRegisterJudge",
        value: MsgRegisterJudge.fromJSON(value)
      };
    },
    withdrawBtcRequest(value: any) {
      return {
        typeUrl: "/twilightproject.nyks.bridge.MsgWithdrawBtcRequest",
        value: MsgWithdrawBtcRequest.fromJSON(value)
      };
    },
    sweepProposal(value: any) {
      return {
        typeUrl: "/twilightproject.nyks.bridge.MsgSweepProposal",
        value: MsgSweepProposal.fromJSON(value)
      };
    },
    withdrawTxSigned(value: any) {
      return {
        typeUrl: "/twilightproject.nyks.bridge.MsgWithdrawTxSigned",
        value: MsgWithdrawTxSigned.fromJSON(value)
      };
    },
    withdrawTxFinal(value: any) {
      return {
        typeUrl: "/twilightproject.nyks.bridge.MsgWithdrawTxFinal",
        value: MsgWithdrawTxFinal.fromJSON(value)
      };
    },
    confirmBtcWithdraw(value: any) {
      return {
        typeUrl: "/twilightproject.nyks.bridge.MsgConfirmBtcWithdraw",
        value: MsgConfirmBtcWithdraw.fromJSON(value)
      };
    },
    signRefund(value: any) {
      return {
        typeUrl: "/twilightproject.nyks.bridge.MsgSignRefund",
        value: MsgSignRefund.fromJSON(value)
      };
    },
    broadcastRefund(value: any) {
      return {
        typeUrl: "/twilightproject.nyks.bridge.MsgBroadcastRefund",
        value: MsgBroadcastRefund.fromJSON(value)
      };
    }
  },
  fromPartial: {
    confirmBtcDeposit(value: MsgConfirmBtcDeposit) {
      return {
        typeUrl: "/twilightproject.nyks.bridge.MsgConfirmBtcDeposit",
        value: MsgConfirmBtcDeposit.fromPartial(value)
      };
    },
    registerBtcDepositAddress(value: MsgRegisterBtcDepositAddress) {
      return {
        typeUrl: "/twilightproject.nyks.bridge.MsgRegisterBtcDepositAddress",
        value: MsgRegisterBtcDepositAddress.fromPartial(value)
      };
    },
    registerReserveAddress(value: MsgRegisterReserveAddress) {
      return {
        typeUrl: "/twilightproject.nyks.bridge.MsgRegisterReserveAddress",
        value: MsgRegisterReserveAddress.fromPartial(value)
      };
    },
    registerJudge(value: MsgRegisterJudge) {
      return {
        typeUrl: "/twilightproject.nyks.bridge.MsgRegisterJudge",
        value: MsgRegisterJudge.fromPartial(value)
      };
    },
    withdrawBtcRequest(value: MsgWithdrawBtcRequest) {
      return {
        typeUrl: "/twilightproject.nyks.bridge.MsgWithdrawBtcRequest",
        value: MsgWithdrawBtcRequest.fromPartial(value)
      };
    },
    sweepProposal(value: MsgSweepProposal) {
      return {
        typeUrl: "/twilightproject.nyks.bridge.MsgSweepProposal",
        value: MsgSweepProposal.fromPartial(value)
      };
    },
    withdrawTxSigned(value: MsgWithdrawTxSigned) {
      return {
        typeUrl: "/twilightproject.nyks.bridge.MsgWithdrawTxSigned",
        value: MsgWithdrawTxSigned.fromPartial(value)
      };
    },
    withdrawTxFinal(value: MsgWithdrawTxFinal) {
      return {
        typeUrl: "/twilightproject.nyks.bridge.MsgWithdrawTxFinal",
        value: MsgWithdrawTxFinal.fromPartial(value)
      };
    },
    confirmBtcWithdraw(value: MsgConfirmBtcWithdraw) {
      return {
        typeUrl: "/twilightproject.nyks.bridge.MsgConfirmBtcWithdraw",
        value: MsgConfirmBtcWithdraw.fromPartial(value)
      };
    },
    signRefund(value: MsgSignRefund) {
      return {
        typeUrl: "/twilightproject.nyks.bridge.MsgSignRefund",
        value: MsgSignRefund.fromPartial(value)
      };
    },
    broadcastRefund(value: MsgBroadcastRefund) {
      return {
        typeUrl: "/twilightproject.nyks.bridge.MsgBroadcastRefund",
        value: MsgBroadcastRefund.fromPartial(value)
      };
    }
  }
};