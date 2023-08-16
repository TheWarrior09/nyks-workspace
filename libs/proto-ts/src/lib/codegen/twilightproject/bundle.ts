import * as _0 from "../nyks/bridge/tx";
import * as _1 from "../nyks/forks/tx";
import * as _2 from "../nyks/volt/tx";
import * as _3 from "../nyks/zkos/tx";
import * as _4 from "../nyks/bridge/tx.amino";
import * as _5 from "../nyks/forks/tx.amino";
import * as _6 from "../nyks/zkos/tx.amino";
import * as _7 from "../nyks/bridge/tx.registry";
import * as _8 from "../nyks/forks/tx.registry";
import * as _9 from "../nyks/zkos/tx.registry";
import * as _10 from "../nyks/bridge/tx.rpc.msg";
import * as _11 from "../nyks/forks/tx.rpc.msg";
import * as _12 from "../nyks/zkos/tx.rpc.msg";
import * as _13 from "./rpc.tx";
export namespace twilightproject {
  export namespace nyks {
    export const bridge = {
      ..._0,
      ..._4,
      ..._7,
      ..._10
    };
    export const forks = {
      ..._1,
      ..._5,
      ..._8,
      ..._11
    };
    export const volt = {
      ..._2
    };
    export const zkos = {
      ..._3,
      ..._6,
      ..._9,
      ..._12
    };
  }
  export const ClientFactory = {
    ..._13
  };
}