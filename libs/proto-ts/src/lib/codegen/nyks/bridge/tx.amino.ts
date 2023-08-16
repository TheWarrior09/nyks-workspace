import { AminoMsg } from "@cosmjs/amino";
import { Long } from "../../helpers";
import { MsgConfirmBtcDeposit, MsgRegisterBtcDepositAddress, MsgRegisterReserveAddress, MsgRegisterJudge, MsgWithdrawBtcRequest, MsgSweepProposal, MsgWithdrawTxSigned, MsgWithdrawTxFinal, MsgSignRefund, MsgBroadcastTxSweep, MsgSignSweep, MsgProposeRefundHash, MsgConfirmBtcWithdraw } from "./tx";
export interface MsgConfirmBtcDepositAminoType extends AminoMsg {
  type: "/twilightproject.nyks.bridge.MsgConfirmBtcDeposit";
  value: {
    reserveAddress: string;
    depositAmount: string;
    height: string;
    hash: string;
    twilightDepositAddress: string;
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
    reserveId: string;
    reserveAddress: string;
    judgeAddress: string;
    btcRelayCapacityValue: string;
    totalValue: string;
    privatePoolValue: string;
    publicValue: string;
    feePool: string;
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
export interface MsgSignRefundAminoType extends AminoMsg {
  type: "/twilightproject.nyks.bridge.MsgSignRefund";
  value: {
    reserveAddress: string;
    signerAddress: string;
    refundSignature: string;
    btcOracleAddress: string;
  };
}
export interface MsgBroadcastTxSweepAminoType extends AminoMsg {
  type: "/twilightproject.nyks.bridge.MsgBroadcastTxSweep";
  value: {
    signedRefundTx: string;
    signedSweepTx: string;
    judgeAddress: string;
  };
}
export interface MsgSignSweepAminoType extends AminoMsg {
  type: "/twilightproject.nyks.bridge.MsgSignSweep";
  value: {
    reserveAddress: string;
    signerAddress: string;
    sweepSignature: string;
    btcOracleAddress: string;
  };
}
export interface MsgProposeRefundHashAminoType extends AminoMsg {
  type: "/twilightproject.nyks.bridge.MsgProposeRefundHash";
  value: {
    refundHash: string;
    judgeAddress: string;
  };
}
export interface MsgConfirmBtcWithdrawAminoType extends AminoMsg {
  type: "/twilightproject.nyks.bridge.MsgConfirmBtcWithdraw";
  value: {
    txHash: string;
    height: string;
    hash: string;
    judgeAddress: string;
  };
}
export const AminoConverter = {
  "/twilightproject.nyks.bridge.MsgConfirmBtcDeposit": {
    aminoType: "/twilightproject.nyks.bridge.MsgConfirmBtcDeposit",
    toAmino: ({
      reserveAddress,
      depositAmount,
      height,
      hash,
      twilightDepositAddress,
      oracleAddress
    }: MsgConfirmBtcDeposit): MsgConfirmBtcDepositAminoType["value"] => {
      return {
        reserveAddress,
        depositAmount: depositAmount.toString(),
        height: height.toString(),
        hash,
        twilightDepositAddress,
        oracleAddress
      };
    },
    fromAmino: ({
      reserveAddress,
      depositAmount,
      height,
      hash,
      twilightDepositAddress,
      oracleAddress
    }: MsgConfirmBtcDepositAminoType["value"]): MsgConfirmBtcDeposit => {
      return {
        reserveAddress,
        depositAmount: Long.fromString(depositAmount),
        height: Long.fromString(height),
        hash,
        twilightDepositAddress,
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
      reserveId,
      reserveAddress,
      judgeAddress,
      btcRelayCapacityValue,
      totalValue,
      privatePoolValue,
      publicValue,
      feePool,
      btcRefundTx,
      btcSweepTx
    }: MsgSweepProposal): MsgSweepProposalAminoType["value"] => {
      return {
        reserveId: reserveId.toString(),
        reserveAddress,
        judgeAddress,
        btcRelayCapacityValue: btcRelayCapacityValue.toString(),
        totalValue: totalValue.toString(),
        privatePoolValue: privatePoolValue.toString(),
        publicValue: publicValue.toString(),
        feePool: feePool.toString(),
        btcRefundTx,
        btcSweepTx
      };
    },
    fromAmino: ({
      reserveId,
      reserveAddress,
      judgeAddress,
      btcRelayCapacityValue,
      totalValue,
      privatePoolValue,
      publicValue,
      feePool,
      btcRefundTx,
      btcSweepTx
    }: MsgSweepProposalAminoType["value"]): MsgSweepProposal => {
      return {
        reserveId: Long.fromString(reserveId),
        reserveAddress,
        judgeAddress,
        btcRelayCapacityValue: Long.fromString(btcRelayCapacityValue),
        totalValue: Long.fromString(totalValue),
        privatePoolValue: Long.fromString(privatePoolValue),
        publicValue: Long.fromString(publicValue),
        feePool: Long.fromString(feePool),
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
  "/twilightproject.nyks.bridge.MsgSignRefund": {
    aminoType: "/twilightproject.nyks.bridge.MsgSignRefund",
    toAmino: ({
      reserveAddress,
      signerAddress,
      refundSignature,
      btcOracleAddress
    }: MsgSignRefund): MsgSignRefundAminoType["value"] => {
      return {
        reserveAddress,
        signerAddress,
        refundSignature,
        btcOracleAddress
      };
    },
    fromAmino: ({
      reserveAddress,
      signerAddress,
      refundSignature,
      btcOracleAddress
    }: MsgSignRefundAminoType["value"]): MsgSignRefund => {
      return {
        reserveAddress,
        signerAddress,
        refundSignature,
        btcOracleAddress
      };
    }
  },
  "/twilightproject.nyks.bridge.MsgBroadcastTxSweep": {
    aminoType: "/twilightproject.nyks.bridge.MsgBroadcastTxSweep",
    toAmino: ({
      signedRefundTx,
      signedSweepTx,
      judgeAddress
    }: MsgBroadcastTxSweep): MsgBroadcastTxSweepAminoType["value"] => {
      return {
        signedRefundTx,
        signedSweepTx,
        judgeAddress
      };
    },
    fromAmino: ({
      signedRefundTx,
      signedSweepTx,
      judgeAddress
    }: MsgBroadcastTxSweepAminoType["value"]): MsgBroadcastTxSweep => {
      return {
        signedRefundTx,
        signedSweepTx,
        judgeAddress
      };
    }
  },
  "/twilightproject.nyks.bridge.MsgSignSweep": {
    aminoType: "/twilightproject.nyks.bridge.MsgSignSweep",
    toAmino: ({
      reserveAddress,
      signerAddress,
      sweepSignature,
      btcOracleAddress
    }: MsgSignSweep): MsgSignSweepAminoType["value"] => {
      return {
        reserveAddress,
        signerAddress,
        sweepSignature,
        btcOracleAddress
      };
    },
    fromAmino: ({
      reserveAddress,
      signerAddress,
      sweepSignature,
      btcOracleAddress
    }: MsgSignSweepAminoType["value"]): MsgSignSweep => {
      return {
        reserveAddress,
        signerAddress,
        sweepSignature,
        btcOracleAddress
      };
    }
  },
  "/twilightproject.nyks.bridge.MsgProposeRefundHash": {
    aminoType: "/twilightproject.nyks.bridge.MsgProposeRefundHash",
    toAmino: ({
      refundHash,
      judgeAddress
    }: MsgProposeRefundHash): MsgProposeRefundHashAminoType["value"] => {
      return {
        refundHash,
        judgeAddress
      };
    },
    fromAmino: ({
      refundHash,
      judgeAddress
    }: MsgProposeRefundHashAminoType["value"]): MsgProposeRefundHash => {
      return {
        refundHash,
        judgeAddress
      };
    }
  },
  "/twilightproject.nyks.bridge.MsgConfirmBtcWithdraw": {
    aminoType: "/twilightproject.nyks.bridge.MsgConfirmBtcWithdraw",
    toAmino: ({
      txHash,
      height,
      hash,
      judgeAddress
    }: MsgConfirmBtcWithdraw): MsgConfirmBtcWithdrawAminoType["value"] => {
      return {
        txHash,
        height: height.toString(),
        hash,
        judgeAddress
      };
    },
    fromAmino: ({
      txHash,
      height,
      hash,
      judgeAddress
    }: MsgConfirmBtcWithdrawAminoType["value"]): MsgConfirmBtcWithdraw => {
      return {
        txHash,
        height: Long.fromString(height),
        hash,
        judgeAddress
      };
    }
  }
};