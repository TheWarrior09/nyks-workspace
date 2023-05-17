import { Rpc } from "../../helpers";
import * as _m0 from "protobufjs/minimal";
import { MsgSetDelegateAddresses, MsgSetDelegateAddressesResponse, MsgSeenBtcChainTip, MsgSeenBtcChainTipResponse } from "./tx";
/** Msg defines the Msg service. */
export interface Msg {
  setDelegateAddresses(request: MsgSetDelegateAddresses): Promise<MsgSetDelegateAddressesResponse>;
  seenBtcChainTip(request: MsgSeenBtcChainTip): Promise<MsgSeenBtcChainTipResponse>;
}
export class MsgClientImpl implements Msg {
  private readonly rpc: Rpc;
  constructor(rpc: Rpc) {
    this.rpc = rpc;
    this.setDelegateAddresses = this.setDelegateAddresses.bind(this);
    this.seenBtcChainTip = this.seenBtcChainTip.bind(this);
  }
  setDelegateAddresses(request: MsgSetDelegateAddresses): Promise<MsgSetDelegateAddressesResponse> {
    const data = MsgSetDelegateAddresses.encode(request).finish();
    const promise = this.rpc.request("twilightproject.nyks.forks.Msg", "SetDelegateAddresses", data);
    return promise.then(data => MsgSetDelegateAddressesResponse.decode(new _m0.Reader(data)));
  }
  seenBtcChainTip(request: MsgSeenBtcChainTip): Promise<MsgSeenBtcChainTipResponse> {
    const data = MsgSeenBtcChainTip.encode(request).finish();
    const promise = this.rpc.request("twilightproject.nyks.forks.Msg", "SeenBtcChainTip", data);
    return promise.then(data => MsgSeenBtcChainTipResponse.decode(new _m0.Reader(data)));
  }
}