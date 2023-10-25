import axios from 'axios';
import { getTradingAccountDetails } from './tradingAccount';
import {
  RELAYER_ORDER_ENDPOINT,
  RELAYER_QUERY_ENDPOINT,
} from '../../../../constants';
import {
  getTradingAccountFromFundingAccount,
  getTradingHexAddressFromAccount,
} from './accountManagement';
import { queryUtxoForAddress } from './zkosApi';

type OrderType = 'MARKET' | 'LIMIT';
type OrderStatue =
  | 'SETTLED'
  | 'LENDED'
  | 'LIQUIDATE'
  | 'CANCELLED'
  | 'PENDING'
  | 'FILLED';
type PositionType = 'LONG' | 'SHORT';

async function createTraderOrder({
  accountId,
  orderStatus,
  orderType,
  positionType,
  signature,
  amount,
  leverage,
  tradingAccount,
  price,
}: {
  accountId: string;
  orderStatus: 'PENDING';
  orderType: OrderType;
  positionType: PositionType;
  signature: string;
  amount: number;
  leverage: number;
  tradingAccount: string;
  price: number;
}) {
  const zkos = await import('zkos-wasm');

  const { encryptScalarHex } = getTradingAccountDetails(tradingAccount);
  const zkosAccount = await getTradingAccountFromFundingAccount(tradingAccount);
  const zkosHexAddress = await getTradingHexAddressFromAccount(zkosAccount);

  const scriptAddress = zkos.getScriptAddress();

  const outputFromZkos = zkos.createOutputFromTradingAccount(zkosAccount);

  const userUtxo = await queryUtxoForAddress(JSON.parse(zkosHexAddress));
  if (userUtxo.error) {
    throw new Error('cannot get user utxo');
  }

  const coinTypeInput = zkos.createInputFromOutput(
    outputFromZkos,
    JSON.stringify(userUtxo.result[0]),
    BigInt(amount)
  );

  const rScaler = JSON.stringify(encryptScalarHex);

  const outputMemo = zkos.createOutputForMemo(
    scriptAddress,
    zkosHexAddress,
    BigInt(amount),
    BigInt(amount),
    rScaler
  );

  const zkosOrder = zkos.createZkOSTraderOrder(
    coinTypeInput,
    outputMemo,
    signature,
    rScaler,
    BigInt(amount),
    JSON.stringify(accountId),
    positionType,
    orderType,
    leverage,
    amount,
    amount,
    orderStatus,
    price,
    price
  );

  console.log('create zkos trade order', zkosOrder);

  return JSON.parse(zkosOrder);
}

async function submitJsonRequest({
  orderData,
  method,
  id,
  endpoint,
}: {
  orderData: string;
  method:
    | 'CreateTraderOrder'
    | 'QueryTraderOrderZkos'
    | 'CancelTraderOrder'
    | 'ExecuteTraderOrder';
  id: string;
  endpoint: 'order' | 'query';
}) {
  const body = JSON.stringify({
    jsonrpc: '2.0',
    method: method,
    id: id,
    params: {
      data: orderData,
    },
  });

  let url: string;

  if (endpoint === 'order') {
    url = RELAYER_ORDER_ENDPOINT;
  } else {
    url = RELAYER_QUERY_ENDPOINT;
  }

  const { data } = await axios.post(url, body, {
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
  });

  return data;
}

async function submitTraderOrder(orderData: string) {
  const body = JSON.stringify({
    jsonrpc: '2.0',
    method: 'CreateTraderOrder',
    id: 123,
    params: {
      data: orderData,
    },
  });
  console.log('submitTraderOrder body', body);
  const { data } = await axios.post(RELAYER_ORDER_ENDPOINT, body, {
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
  });

  return data;
}

async function createQueryTraderOrder({
  accountId,
  orderStatus,
  signature,
  zkosHexAddress,
}: {
  accountId: string;
  orderStatus: OrderStatue;
  signature: string;
  zkosHexAddress: string;
}) {
  const zkos = await import('zkos-wasm');

  const zkosOrder = zkos.queryTraderOrderZkos(
    zkosHexAddress,
    // base64ToUint8Array(signature),
    signature,
    JSON.stringify(accountId),
    orderStatus
  );

  console.log('query zkos trade order', zkosOrder);

  return JSON.parse(zkosOrder);
}

async function submitQueryTraderOrder(queryData: string) {
  const body = JSON.stringify({
    jsonrpc: '2.0',
    method: 'QueryTraderOrderZkos',
    id: 123,
    params: {
      data: queryData,
    },
  });
  const { data } = await axios.post(RELAYER_QUERY_ENDPOINT, body, {
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
  });

  return data;
}

async function createCancelTraderOrder({
  accountId,
  orderStatus,
  orderType,
  signature,
  UUID,
  zkosHexAddress,
}: {
  accountId: string;
  orderStatus: 'PENDING';
  orderType: 'LIMIT';
  signature: string;
  UUID: string;
  zkosHexAddress: string;
}) {
  const zkos = await import('zkos-wasm');

  const zkosOrder = zkos.cancelTraderOrderZkOS(
    zkosHexAddress,
    // base64ToUint8Array(signature),
    signature,
    JSON.stringify(accountId),
    JSON.stringify(UUID),
    orderType,
    orderStatus
  );
  console.log('create cancel trade order', zkosOrder);

  return JSON.parse(zkosOrder);
}

async function submitCancelTraderOrder(queryData: string) {
  const body = JSON.stringify({
    jsonrpc: '2.0',
    method: 'CancelTraderOrder',
    id: 123,
    params: {
      data: queryData,
    },
  });
  const { data } = await axios.post(RELAYER_ORDER_ENDPOINT, body, {
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
  });

  return data;
}

async function createExecuteTraderOrder({
  accountId,
  amount,
  orderStatus,
  orderType,
  signature,
  tradingAccount,
  transactionType,
  UUID,
  price,
}: {
  accountId: string;
  amount: number;
  orderStatus: 'PENDING';
  orderType: OrderType;
  signature: string;
  tradingAccount: string;
  transactionType: 'ORDERTX';
  UUID: string;
  price: number;
}) {
  const zkos = await import('zkos-wasm');

  const zkosHexAddress = await getTradingHexAddressFromAccount(tradingAccount);

  // const outputFromZkos = zkos.createOutputFromZkosAccount(zkosAccount);

  const userUtxo = await queryUtxoForAddress(JSON.parse(zkosHexAddress));
  if (userUtxo.error) {
    throw new Error('cannot get user utxo');
  }

  const scriptAddress = zkos.getScriptAddress();
  const { encryptScalarHex } = getTradingAccountDetails(tradingAccount);
  const rScaler = JSON.stringify(encryptScalarHex);

  const outputMemo = zkos.createOutputForMemo(
    scriptAddress,
    zkosHexAddress,
    BigInt(amount),
    BigInt(amount),
    rScaler
  );

  const inputTypeMemo = zkos.createInputFromOutput(
    outputMemo,
    JSON.stringify(userUtxo.result[0]),
    BigInt(amount)
  );

  const zkosOrder = zkos.executeOrderZkOS(
    inputTypeMemo,
    signature,
    JSON.stringify(accountId),
    JSON.stringify(UUID),
    orderType,
    amount,
    orderStatus,
    price,
    transactionType
  );

  console.log('execute zkos trade order', zkosOrder);

  return JSON.parse(zkosOrder);
}

async function submitExecuteTraderOrder(queryData: string) {
  const body = JSON.stringify({
    jsonrpc: '2.0',
    method: 'ExecuteTraderOrder',
    id: 123,
    params: {
      data: queryData,
    },
  });
  const { data } = await axios.post(RELAYER_ORDER_ENDPOINT, body, {
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
  });

  return data;
}

export {
  createTraderOrder,
  submitTraderOrder,
  createQueryTraderOrder,
  submitQueryTraderOrder,
  createCancelTraderOrder,
  submitCancelTraderOrder,
  createExecuteTraderOrder,
  submitExecuteTraderOrder,
  submitJsonRequest,
};
