import { GeneratedType, Registry } from "@cosmjs/proto-signing";
import { MsgSetDelegateAddresses, MsgSeenBtcChainTip } from "./tx";
export const registry: ReadonlyArray<[string, GeneratedType]> = [["/twilightproject.nyks.forks.MsgSetDelegateAddresses", MsgSetDelegateAddresses], ["/twilightproject.nyks.forks.MsgSeenBtcChainTip", MsgSeenBtcChainTip]];
export const load = (protoRegistry: Registry) => {
  registry.forEach(([typeUrl, mod]) => {
    protoRegistry.register(typeUrl, mod);
  });
};
export const MessageComposer = {
  encoded: {
    setDelegateAddresses(value: MsgSetDelegateAddresses) {
      return {
        typeUrl: "/twilightproject.nyks.forks.MsgSetDelegateAddresses",
        value: MsgSetDelegateAddresses.encode(value).finish()
      };
    },
    seenBtcChainTip(value: MsgSeenBtcChainTip) {
      return {
        typeUrl: "/twilightproject.nyks.forks.MsgSeenBtcChainTip",
        value: MsgSeenBtcChainTip.encode(value).finish()
      };
    }
  },
  withTypeUrl: {
    setDelegateAddresses(value: MsgSetDelegateAddresses) {
      return {
        typeUrl: "/twilightproject.nyks.forks.MsgSetDelegateAddresses",
        value
      };
    },
    seenBtcChainTip(value: MsgSeenBtcChainTip) {
      return {
        typeUrl: "/twilightproject.nyks.forks.MsgSeenBtcChainTip",
        value
      };
    }
  },
  toJSON: {
    setDelegateAddresses(value: MsgSetDelegateAddresses) {
      return {
        typeUrl: "/twilightproject.nyks.forks.MsgSetDelegateAddresses",
        value: MsgSetDelegateAddresses.toJSON(value)
      };
    },
    seenBtcChainTip(value: MsgSeenBtcChainTip) {
      return {
        typeUrl: "/twilightproject.nyks.forks.MsgSeenBtcChainTip",
        value: MsgSeenBtcChainTip.toJSON(value)
      };
    }
  },
  fromJSON: {
    setDelegateAddresses(value: any) {
      return {
        typeUrl: "/twilightproject.nyks.forks.MsgSetDelegateAddresses",
        value: MsgSetDelegateAddresses.fromJSON(value)
      };
    },
    seenBtcChainTip(value: any) {
      return {
        typeUrl: "/twilightproject.nyks.forks.MsgSeenBtcChainTip",
        value: MsgSeenBtcChainTip.fromJSON(value)
      };
    }
  },
  fromPartial: {
    setDelegateAddresses(value: MsgSetDelegateAddresses) {
      return {
        typeUrl: "/twilightproject.nyks.forks.MsgSetDelegateAddresses",
        value: MsgSetDelegateAddresses.fromPartial(value)
      };
    },
    seenBtcChainTip(value: MsgSeenBtcChainTip) {
      return {
        typeUrl: "/twilightproject.nyks.forks.MsgSeenBtcChainTip",
        value: MsgSeenBtcChainTip.fromPartial(value)
      };
    }
  }
};