export const CHAIN_ID = 'nyks';
// export const COSMOS_REST = 'http://0.0.0.0:1317';
// export const TENDERMINT_RPC = 'http://0.0.0.0:26657';

export const COSMOS_REST = 'https://nyks.twilight-explorer.com/rest/';
export const TENDERMINT_RPC = 'https://nyks.twilight-explorer.com/tendermint/';
export const NYKS_EXPLORER = 'https://nyks.twilight-explorer.com/';

export const SIGN_IN_MESSAGE = 'Hello, Twilight Exchange';

export const ZKOS_ACCOUNT_KEY_LOCAL_STORAGE = 'zkos_key';

export const ZKOS_API_ENDPOINT = 'https://nyks.twilight-explorer.com/zkos/api/';
export const RELAYER_ORDER_ENDPOINT = 'https://twilight.rest/clientapi/';
export const RELAYER_QUERY_ENDPOINT = 'https://twilight.rest/relayer/';

export const WEBSOCKET_URL = 'wss://twilight.rest/ws';
export const RELAYER_API = 'https://twilight.rest/api/';

export const nyks_snap = 'npm:nkys-wallet';

export const MESSAGE_SUBSCRIBE_LIVE_PRICE =
  '{"jsonrpc": "2.0", "method": "subscribe_live_price_data", "id":"price_feeder", "params": null }';

export const MESSAGE_GET_FUNDING_RATE =
  '{"jsonrpc": "2.0", "method": "get_funding_rate", "id":123, "params": null  }';

export const MESSAGE_OPEN_LIMIT_ORDER =
  '{"jsonrpc": "2.0", "method": "open_limit_orders", "id":123, "params": null  }';
export const MESSAGE_RECENT_TRADE_ORDER =
  '{"jsonrpc": "2.0", "method": "recent_trade_orders", "id":123, "params": null  }';

// export const MESSAGE_HISTORICAL_FUNDING_RATE =
//   '{"jsonrpc": "2.0", "method": "historical_funding_rate", "id":123, "params": null  }';
// export const MESSAGE_POSITION_SIZE =
//   '{"jsonrpc": "2.0", "method": "position_size", "id":123, "params": null  }';
// export const MESSAGE_BTC_USD_PRICE =
//   '{"jsonrpc": "2.0", "method": "btc_usd_price", "id":123, "params": null  }';
// export const MESSAGE_HISTORICAL_PRICE =
//   '{"jsonrpc": "2.0", "method": "historical_price", "id":123, "params": {"from": "2023-04-22T00:00:00Z", "to": "2023-07-12T13:00:00Z"}  }';
// export const MESSAGE_TRADER_ORDER_INFO =
//   '{"jsonrpc": "2.0", "method": "trader_order_info", "id":123, "params": {"id": "435c5065-c8a8-4f25-8e05-261e874117fe"}  }';
// export const MESSAGE_LEND_ORDER_INFO =
//   '{"jsonrpc": "2.0", "method": "lend_order_info", "id":123, "params": {"id": "9f7c966d-86b2-41a1-a15f-513641eb8937"}  }';
// export const MESSAGE_SERVER_TIME =
//   '{"jsonrpc": "2.0", "method": "server_time", "id":123 }';
