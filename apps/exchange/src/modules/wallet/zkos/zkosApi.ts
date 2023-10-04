import axios from 'axios';
import { ZKOS_API_ENDPOINT } from '../../../../constants';

const getUtxoFromDB = async () => {
  const message = JSON.stringify({
    jsonrpc: '2.0',
    method: 'getUtxosFromDB',
    params: {
      start_block: 0,
      end_block: -1,
      limit: 1000,
      pagination: 0,
      io_type: 'Coin',
    },
    id: 1,
  });
  const { data } = await axios.post(ZKOS_API_ENDPOINT, message, {
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
  });
  return data;
};
const getUtxoForAddress = async (zkosAddress: string) => {
  const message = JSON.stringify({
    jsonrpc: '2.0',
    method: 'getUtxos',
    params: [zkosAddress],
    id: 1,
  });
  const { data } = await axios.post(ZKOS_API_ENDPOINT, message, {
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
  });
  return data;
};
const getAllUtxoForAddress = async (zkosAddress: string) => {
  const message = JSON.stringify({
    jsonrpc: '2.0',
    method: 'allUtxos',
    params: [zkosAddress],
    id: 1,
  });
  const { data } = await axios.post(ZKOS_API_ENDPOINT, message, {
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
  });
  return data;
};
const getUtxoOutput = async (utxo: string) => {
  const message = JSON.stringify({
    jsonrpc: '2.0',
    method: 'getOutput',
    params: [utxo],
    id: 1,
  });
  const { data } = await axios.post(ZKOS_API_ENDPOINT, message, {
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
  });
  return data;
};
const commitDarkTransaction = async (darkTxHex: string) => {
  const message = JSON.stringify({
    jsonrpc: '2.0',
    method: 'txCommit',
    params: [darkTxHex],
    id: 1,
  });
  const { data } = await axios.post(ZKOS_API_ENDPOINT, message, {
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
    },
  });
  return data;
};

export {
  getUtxoFromDB,
  getUtxoForAddress,
  getAllUtxoForAddress,
  getUtxoOutput,
  commitDarkTransaction,
};
