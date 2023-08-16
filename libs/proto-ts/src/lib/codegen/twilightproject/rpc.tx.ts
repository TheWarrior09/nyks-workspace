import { Rpc } from "../helpers";
export const createRPCMsgClient = async ({
  rpc
}: {
  rpc: Rpc;
}) => ({
  twilightproject: {
    nyks: {
      bridge: new (await import("../nyks/bridge/tx.rpc.msg")).MsgClientImpl(rpc),
      forks: new (await import("../nyks/forks/tx.rpc.msg")).MsgClientImpl(rpc),
      zkos: new (await import("../nyks/zkos/tx.rpc.msg")).MsgClientImpl(rpc)
    }
  }
});