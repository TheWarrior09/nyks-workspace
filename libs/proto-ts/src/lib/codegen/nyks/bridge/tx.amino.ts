import { AminoMsg } from "@cosmjs/amino";
import { Long } from "../../helpers";
import { MsgConfirmBtcDeposit, MsgRegisterBtcDepositAddress, MsgRegisterReserveAddress, MsgRegisterJudge, MsgWithdrawBtcRequest, MsgSweepProposal, MsgWithdrawTxSigned, MsgWithdrawTxFinal, MsgConfirmBtcWithdraw, MsgSignRefund, MsgBroadcastRefund } from "./tx";
export interface MsgConfirmBtcDepositAminoType extends AminoMsg {
  type: "/twilightproject.nyks.bridge.MsgConfirmBtcDeposit";
  value: {
    depositAddress: string;
    depositAmount: string;
    height: string;
    hash: string;
    twilightDepositAddress: string;
    reserveAddress: string;
    oracleAddress: string;
  };
}
export interface MsgRegisterBtcDepositAddressAminoType extends AminoMsg {
  type: "/twilightproject.nyks.bridge.MsgRegisterBtcDepositAddress";
  value: {
    depositAddress: string;
    twilightDepositAddress: string;
  };
}
export interface MsgRegisterReserveAddressAminoType extends AminoMsg {
  type: "/twilightproject.nyks.bridge.MsgRegisterReserveAddress";
  value: {
    reserveScript: string;
    reserveAddress: string;
    judgeAddress: string;
  };
}
export interface MsgRegisterJudgeAminoType extends AminoMsg {
  type: "/twilightproject.nyks.bridge.MsgRegisterJudge";
  value: {
    creator: string;
    judgeAddress: string;
    validatorAddress: string;
  };
}
export interface MsgWithdrawBtcRequestAminoType extends AminoMsg {
  type: "/twilightproject.nyks.bridge.MsgWithdrawBtcRequest";
  value: {
    withdrawAddress: string;
    reserveAddress: string;
    withdrawAmount: string;
    twilightAddress: string;
  };
}
export interface MsgSweepProposalAminoType extends AminoMsg {
  type: "/twilightproject.nyks.bridge.MsgSweepProposal";
  value: {
    creator: string;
    reserveId: string;
    reserveAddress: string;
    judgeAddress: string;
    btcRelayCapacityValue: string;
    totalValue: string;
    privatePoolValue: string;
    publicValue: string;
    feePool: string;
    individualTwilightReserveAccount: {
      TwilightAddress: string;
      BtcValue: string;
    }[];
    btcRefundTx: string;
    btcSweepTx: string;
  };
}
export interface MsgWithdrawTxSignedAminoType extends AminoMsg {
  type: "/twilightproject.nyks.bridge.MsgWithdrawTxSigned";
  value: {
    creator: string;
    validatorAddress: string;
    btcTxSigned: string;
  };
}
export interface MsgWithdrawTxFinalAminoType extends AminoMsg {
  type: "/twilightproject.nyks.bridge.MsgWithdrawTxFinal";
  value: {
    creator: string;
    judgeAddress: string;
    btcTx: string;
  };
}
export interface MsgConfirmBtcWithdrawAminoType extends AminoMsg {
  type: "/twilightproject.nyks.bridge.MsgConfirmBtcWithdraw";
  value: {
    creator: string;
    validatorAddress: string;
    txHash: string;
  };
}
export interface MsgSignRefundAminoType extends AminoMsg {
  type: "/twilightproject.nyks.bridge.MsgSignRefund";
  value: {
    creator: string;
    reserveAddress: string;
    signerAddress: string;
    refundSignature: string;
    sweepSignature: string;
  };
}
export interface MsgBroadcastRefundAminoType extends AminoMsg {
  type: "/twilightproject.nyks.bridge.MsgBroadcastRefund";
  value: {
    creator: string;
    judgeAddress: string;
    signedRefundTx: string;
    signedSweepTx: string;
  };
}
export const AminoConverter = {
  "/twilightproject.nyks.bridge.MsgConfirmBtcDeposit": {
    aminoType: "/twilightproject.nyks.bridge.MsgConfirmBtcDeposit",
    toAmino: ({
      depositAddress,
      depositAmount,
      height,
      hash,
      twilightDepositAddress,
      reserveAddress,
      oracleAddress
    }: MsgConfirmBtcDeposit): MsgConfirmBtcDepositAminoType["value"] => {
      return {
        depositAddress,
        depositAmount: depositAmount.toString(),
        height: height.toString(),
        hash,
        twilightDepositAddress,
        reserveAddress,
        oracleAddress
      };
    },
    fromAmino: ({
      depositAddress,
      depositAmount,
      height,
      hash,
      twilightDepositAddress,
      reserveAddress,
      oracleAddress
    }: MsgConfirmBtcDepositAminoType["value"]): MsgConfirmBtcDeposit => {
      return {
        depositAddress,
        depositAmount: Long.fromString(depositAmount),
        height: Long.fromString(height),
        hash,
        twilightDepositAddress,
        reserveAddress,
        oracleAddress
      };
    }
  },
  "/twilightproject.nyks.bridge.MsgRegisterBtcDepositAddress": {
    aminoType: "/twilightproject.nyks.bridge.MsgRegisterBtcDepositAddress",
    toAmino: ({
      depositAddress,
      twilightDepositAddress
    }: MsgRegisterBtcDepositAddress): MsgRegisterBtcDepositAddressAminoType["value"] => {
      return {
        depositAddress,
        twilightDepositAddress
      };
    },
    fromAmino: ({
      depositAddress,
      twilightDepositAddress
    }: MsgRegisterBtcDepositAddressAminoType["value"]): MsgRegisterBtcDepositAddress => {
      return {
        depositAddress,
        twilightDepositAddress
      };
    }
  },
  "/twilightproject.nyks.bridge.MsgRegisterReserveAddress": {
    aminoType: "/twilightproject.nyks.bridge.MsgRegisterReserveAddress",
    toAmino: ({
      reserveScript,
      reserveAddress,
      judgeAddress
    }: MsgRegisterReserveAddress): MsgRegisterReserveAddressAminoType["value"] => {
      return {
        reserveScript,
        reserveAddress,
        judgeAddress
      };
    },
    fromAmino: ({
      reserveScript,
      reserveAddress,
      judgeAddress
    }: MsgRegisterReserveAddressAminoType["value"]): MsgRegisterReserveAddress => {
      return {
        reserveScript,
        reserveAddress,
        judgeAddress
      };
    }
  },
  "/twilightproject.nyks.bridge.MsgRegisterJudge": {
    aminoType: "/twilightproject.nyks.bridge.MsgRegisterJudge",
    toAmino: ({
      creator,
      judgeAddress,
      validatorAddress
    }: MsgRegisterJudge): MsgRegisterJudgeAminoType["value"] => {
      return {
        creator,
        judgeAddress,
        validatorAddress
      };
    },
    fromAmino: ({
      creator,
      judgeAddress,
      validatorAddress
    }: MsgRegisterJudgeAminoType["value"]): MsgRegisterJudge => {
      return {
        creator,
        judgeAddress,
        validatorAddress
      };
    }
  },
  "/twilightproject.nyks.bridge.MsgWithdrawBtcRequest": {
    aminoType: "/twilightproject.nyks.bridge.MsgWithdrawBtcRequest",
    toAmino: ({
      withdrawAddress,
      reserveAddress,
      withdrawAmount,
      twilightAddress
    }: MsgWithdrawBtcRequest): MsgWithdrawBtcRequestAminoType["value"] => {
      return {
        withdrawAddress,
        reserveAddress,
        withdrawAmount: withdrawAmount.toString(),
        twilightAddress
      };
    },
    fromAmino: ({
      withdrawAddress,
      reserveAddress,
      withdrawAmount,
      twilightAddress
    }: MsgWithdrawBtcRequestAminoType["value"]): MsgWithdrawBtcRequest => {
      return {
        withdrawAddress,
        reserveAddress,
        withdrawAmount: Long.fromString(withdrawAmount),
        twilightAddress
      };
    }
  },
  "/twilightproject.nyks.bridge.MsgSweepProposal": {
    aminoType: "/twilightproject.nyks.bridge.MsgSweepProposal",
    toAmino: ({
      creator,
      reserveId,
      reserveAddress,
      judgeAddress,
      btcRelayCapacityValue,
      totalValue,
      privatePoolValue,
      publicValue,
      feePool,
      individualTwilightReserveAccount,
      btcRefundTx,
      btcSweepTx
    }: MsgSweepProposal): MsgSweepProposalAminoType["value"] => {
      return {
        creator,
        reserveId: reserveId.toString(),
        reserveAddress,
        judgeAddress,
        btcRelayCapacityValue: btcRelayCapacityValue.toString(),
        totalValue: totalValue.toString(),
        privatePoolValue: privatePoolValue.toString(),
        publicValue: publicValue.toString(),
        feePool: feePool.toString(),
        individualTwilightReserveAccount: individualTwilightReserveAccount.map(el0 => ({
          TwilightAddress: el0.TwilightAddress,
          BtcValue: el0.BtcValue.toString()
        })),
        btcRefundTx,
        btcSweepTx
      };
    },
    fromAmino: ({
      creator,
      reserveId,
      reserveAddress,
      judgeAddress,
      btcRelayCapacityValue,
      totalValue,
      privatePoolValue,
      publicValue,
      feePool,
      individualTwilightReserveAccount,
      btcRefundTx,
      btcSweepTx
    }: MsgSweepProposalAminoType["value"]): MsgSweepProposal => {
      return {
        creator,
        reserveId: Long.fromString(reserveId),
        reserveAddress,
        judgeAddress,
        btcRelayCapacityValue: Long.fromString(btcRelayCapacityValue),
        totalValue: Long.fromString(totalValue),
        privatePoolValue: Long.fromString(privatePoolValue),
        publicValue: Long.fromString(publicValue),
        feePool: Long.fromString(feePool),
        individualTwilightReserveAccount: individualTwilightReserveAccount.map(el0 => ({
          TwilightAddress: el0.TwilightAddress,
          BtcValue: Long.fromString(el0.BtcValue)
        })),
        btcRefundTx,
        btcSweepTx
      };
    }
  },
  "/twilightproject.nyks.bridge.MsgWithdrawTxSigned": {
    aminoType: "/twilightproject.nyks.bridge.MsgWithdrawTxSigned",
    toAmino: ({
      creator,
      validatorAddress,
      btcTxSigned
    }: MsgWithdrawTxSigned): MsgWithdrawTxSignedAminoType["value"] => {
      return {
        creator,
        validatorAddress,
        btcTxSigned
      };
    },
    fromAmino: ({
      creator,
      validatorAddress,
      btcTxSigned
    }: MsgWithdrawTxSignedAminoType["value"]): MsgWithdrawTxSigned => {
      return {
        creator,
        validatorAddress,
        btcTxSigned
      };
    }
  },
  "/twilightproject.nyks.bridge.MsgWithdrawTxFinal": {
    aminoType: "/twilightproject.nyks.bridge.MsgWithdrawTxFinal",
    toAmino: ({
      creator,
      judgeAddress,
      btcTx
    }: MsgWithdrawTxFinal): MsgWithdrawTxFinalAminoType["value"] => {
      return {
        creator,
        judgeAddress,
        btcTx
      };
    },
    fromAmino: ({
      creator,
      judgeAddress,
      btcTx
    }: MsgWithdrawTxFinalAminoType["value"]): MsgWithdrawTxFinal => {
      return {
        creator,
        judgeAddress,
        btcTx
      };
    }
  },
  "/twilightproject.nyks.bridge.MsgConfirmBtcWithdraw": {
    aminoType: "/twilightproject.nyks.bridge.MsgConfirmBtcWithdraw",
    toAmino: ({
      creator,
      validatorAddress,
      txHash
    }: MsgConfirmBtcWithdraw): MsgConfirmBtcWithdrawAminoType["value"] => {
      return {
        creator,
        validatorAddress,
        txHash
      };
    },
    fromAmino: ({
      creator,
      validatorAddress,
      txHash
    }: MsgConfirmBtcWithdrawAminoType["value"]): MsgConfirmBtcWithdraw => {
      return {
        creator,
        validatorAddress,
        txHash
      };
    }
  },
  "/twilightproject.nyks.bridge.MsgSignRefund": {
    aminoType: "/twilightproject.nyks.bridge.MsgSignRefund",
    toAmino: ({
      creator,
      reserveAddress,
      signerAddress,
      refundSignature,
      sweepSignature
    }: MsgSignRefund): MsgSignRefundAminoType["value"] => {
      return {
        creator,
        reserveAddress,
        signerAddress,
        refundSignature,
        sweepSignature
      };
    },
    fromAmino: ({
      creator,
      reserveAddress,
      signerAddress,
      refundSignature,
      sweepSignature
    }: MsgSignRefundAminoType["value"]): MsgSignRefund => {
      return {
        creator,
        reserveAddress,
        signerAddress,
        refundSignature,
        sweepSignature
      };
    }
  },
  "/twilightproject.nyks.bridge.MsgBroadcastRefund": {
    aminoType: "/twilightproject.nyks.bridge.MsgBroadcastRefund",
    toAmino: ({
      creator,
      judgeAddress,
      signedRefundTx,
      signedSweepTx
    }: MsgBroadcastRefund): MsgBroadcastRefundAminoType["value"] => {
      return {
        creator,
        judgeAddress,
        signedRefundTx,
        signedSweepTx
      };
    },
    fromAmino: ({
      creator,
      judgeAddress,
      signedRefundTx,
      signedSweepTx
    }: MsgBroadcastRefundAminoType["value"]): MsgBroadcastRefund => {
      return {
        creator,
        judgeAddress,
        signedRefundTx,
        signedSweepTx
      };
    }
  }
};