import * as _0 from "../nyks/bridge/tx";
import * as _1 from "../nyks/forks/tx";
import * as _2 from "../nyks/volt/reserve";
import * as _3 from "../nyks/volt/tx";
import * as _4 from "../nyks/bridge/tx.amino";
import * as _5 from "../nyks/forks/tx.amino";
import * as _6 from "../nyks/bridge/tx.registry";
import * as _7 from "../nyks/forks/tx.registry";
import * as _8 from "../nyks/bridge/tx.rpc.msg";
import * as _9 from "../nyks/forks/tx.rpc.msg";
import * as _10 from "./rpc.tx";
export namespace twilightproject {
  export namespace nyks {
    export const bridge = {
      ..._0,
      ..._4,
      ..._6,
      ..._8
    };
    export const forks = {
      ..._1,
      ..._5,
      ..._7,
      ..._9
    };
    export const volt = {
      ..._2,
      ..._3
    };
  }
  export const ClientFactory = {
    ..._10
  };
}