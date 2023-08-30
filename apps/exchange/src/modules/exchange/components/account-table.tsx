import { useEffect, useState } from 'react';
import Section from './section';
import TabBar from './tab-bar';
import colors from '../../../../colors';
import { useKeplrWallet } from '@nyks-workspace/hooks';
import { CHAIN_ID, COSMOS_REST, TENDERMINT_RPC } from '../../../../constants';
import { Box } from '@mui/material';
import { getZkosAccount } from '../../wallet/zkos';
import {
  createCancelTraderOrder,
  createQueryTraderOrder,
  submitJsonRequest,
} from '../../wallet/zkos/tradeOrder';
import {
  QueryFunctionContext,
  useMutation,
  useQuery,
} from '@tanstack/react-query';
import { useGlobalContext } from '../../../context';
import { getTradingAccount } from '../../wallet/zkos/accountManagement';

async function submitQueryTraderOrder({
  accountId,
  tradingAccount,
  signature,
}: {
  accountId: string;
  tradingAccount: string;
  signature: string;
}) {
  const { zkosHexAddress } = await getZkosAccount(tradingAccount);

  const query = await createQueryTraderOrder({
    signature,
    zkosHexAddress: zkosHexAddress,
    accountId,
    orderStatus: 'PENDING',
  });

  const response = await submitJsonRequest({
    endpoint: 'query',
    id: accountId,
    method: 'QueryTraderOrderZkos',
    orderData: query,
  });

  if (response.error) {
    throw new Error(response.error.message);
  }

  return response.result;
}

type QueryKeys = [
  {
    data: {
      accountId: string;
      tradingAccount: string;
      signature: string;
    };
  }
];

export async function queryFunctionQueryTrade(
  context: QueryFunctionContext<QueryKeys>
) {
  const { queryKey } = context;
  const [{ data }] = queryKey;
  const response = await submitQueryTraderOrder(data);
  return response;
}

const useQueryTraderOrder = ({
  hexAddress,
  signature,
  encryptScalar,
  qqAccount,
}: {
  hexAddress: string;
  signature: string;
  qqAccount: string;
  encryptScalar: string;
}) => {
  const tradingAccount = getTradingAccount({ encryptScalar, qqAccount });

  const queryOrder = useQuery({
    queryKey: [
      {
        data: {
          accountId: hexAddress,
          signature,
          tradingAccount,
        },
      },
    ],
    queryFn: queryFunctionQueryTrade,
    refetchInterval: 3000,
    enabled:
      Boolean(hexAddress) && Boolean(signature) && Boolean(tradingAccount),
  });

  return queryOrder;
};

const submitCancelTraderOrder = async ({
  accountId,
  tradingAccount,
  signature,
  uuid,
}: {
  accountId: string;
  tradingAccount: string;
  signature: string;
  uuid: string;
}) => {
  const { zkosHexAddress } = await getZkosAccount(tradingAccount);
  const cancel = await createCancelTraderOrder({
    accountId,
    orderStatus: 'PENDING',
    orderType: 'LIMIT',
    signature: signature,
    UUID: uuid,
    zkosHexAddress,
  });

  const response = await submitJsonRequest({
    endpoint: 'order',
    id: accountId,
    method: 'CancelTraderOrder',
    orderData: cancel,
  });

  if (response.error) {
    throw new Error(response.error.message);
  }

  return response.result;
};

const useCancelTraderOrder = () =>
  useMutation({
    mutationFn: submitCancelTraderOrder,
  });

function Position() {
  // const [position, setPosition] = useState({
  //   symbol: 'btcusd',
  //   size: 10,
  //   entryPrice: 30000,
  //   liquidationPrice: 29000,
  //   margin: 3,
  // });

  const { encryptScalar, qqAccount, signature, hexAddress } =
    useGlobalContext();

  if (!signature) throw new Error('signature not found');
  if (!hexAddress) throw new Error('hexAddress not found');
  if (!qqAccount) throw new Error('qqAccount not found');
  if (!encryptScalar) throw new Error('encryptScalar not found');

  const queryOrder = useQueryTraderOrder({
    encryptScalar,
    qqAccount,
    signature,
    hexAddress,
  });

  const cancelTraderOrder = useCancelTraderOrder();

  const handleCancelTraderOrder = async (uuid: string) => {
    const tradingAccount = JSON.stringify({
      zkos_account_hex: qqAccount,
      encrypt_scalar_hex: encryptScalar,
    });

    await cancelTraderOrder.mutateAsync({
      accountId: hexAddress,
      signature,
      tradingAccount,
      uuid,
    });
  };

  console.log('submitQueryTraderOrder', queryOrder.data);
  console.log('submitCancelTraderOrder', cancelTraderOrder.data);

  // const tradingAccount = JSON.stringify({
  //   zkos_account_hex: qqAccount,
  //   encrypt_scalar_hex: encryptScalar,
  // });

  // const queryOrder = useQuery({
  //   queryKey: [
  //     {
  //       data: {
  //         accountId: hexAddress,
  //         signature,
  //         tradingAccount,
  //       },
  //     },
  //   ],
  //   queryFn: queryFunctionWithAxios,
  //   refetchInterval: 3000,
  //   enabled:
  //     Boolean(hexAddress) && Boolean(signature) && Boolean(tradingAccount),
  // });

  // const handleQueryOrder = async () => {
  //   if (
  //     typeof signature === 'undefined' ||
  //     typeof hexAddress === 'undefined' ||
  //     typeof qqAccount === 'undefined' ||
  //     typeof encryptScalar === 'undefined'
  //   )
  //     return;

  //   if (!signature) throw new Error('signature not found');
  //   if (!hexAddress) throw new Error('hexAddress not found');
  //   if (!qqAccount) throw new Error('qqAccount not found');
  //   if (!encryptScalar) throw new Error('encryptScalar not found');

  //   const tradingAccount = JSON.stringify({
  //     zkos_account_hex: qqAccount,
  //     encrypt_scalar_hex: encryptScalar,
  //   });

  //   //   await queryOrder.mutateAsync({
  //   //     accountId: hexAddress,
  //   //     signature,
  //   //     tradingAccount,
  //   //   });
  // };

  // useEffect(() => {
  //   // Set up the interval to call the function every 5 seconds
  //   const intervalId = setInterval(handleQueryOrder, 50000); // 5000 milliseconds = 5 seconds

  //   // Clear the interval when the component is unmounted or the dependencies change
  //   return () => clearInterval(intervalId);
  // }, []);

  // useEffect(() => {
  //   if (
  //     typeof signature === 'undefined' ||
  //     typeof hexAddress === 'undefined' ||
  //     typeof qqAccount === 'undefined' ||
  //     typeof encryptScalar === 'undefined'
  //   )
  //     return;
  //   (async () => {
  //     await queryOrder.mutateAsync({
  //       accountId: hexAddress,
  //       signature,
  //       tradingAccount,
  //     });
  //   })();
  // }, [
  //   encryptScalar,
  //   hexAddress,
  //   qqAccount,
  //   queryOrder,
  //   queryOrder.mutateAsync,
  //   signature,
  //   tradingAccount,
  // ]);

  if (typeof queryOrder.data === 'undefined') {
    return 'loading...';
  }

  return (
    <div className="position">
      <span className="symbol">BTC</span>
      <span className="data">
        <label>Size</label>
        <span className={queryOrder.data.initial_margin > 0 ? 'green' : 'red'}>
          {queryOrder.data.initial_margin.toLocaleString()}
        </span>
      </span>
      <span className="data">
        <label>Entry Price</label>
        <span>
          {queryOrder.data.entryprice.toLocaleString()} <small>USD</small>
        </span>
      </span>
      <span className="data">
        <label>Liq. Price</label>
        <span>
          {queryOrder.data.bankruptcy_price.toLocaleString()} <small>USD</small>
        </span>
      </span>
      <span className="data">
        <label>Status</label>
        <span>{queryOrder.data.order_status.toLocaleString()}</span>
      </span>
      <span className="controls">
        <button onClick={() => handleCancelTraderOrder(queryOrder.data.uuid)}>
          Close
        </button>
      </span>

      <style jsx>{`
        .position {
          display: flex;
          border: 1px solid ${colors.border};
          padding: 0 20px;
          line-height: 58px;
        }

        .position > span {
          display: inline-block;
          flex: 1;
          vertical-align: middle;
        }

        .symbol {
          font-size: 16px;
          text-transform: uppercase;
          margin-right: 10px;
        }

        .data {
          line-height: 1em;
          position: relative;
          top: 12px;
          margin: 0 6px;
        }
        .data label {
          display: block;
          font-size: 10px;
          color: ${colors.label};
          text-transform: uppercase;
          font-weight: bold;
          margin: 0;
          white-space: nowrap;
        }
        .data span {
          font-size: 13px;
          white-space: nowrap;
        }
        .data small {
          color: ${colors.label};
        }

        .controls {
          text-align: right;
        }

        button {
          font-family: inherit;
          text-shadow: 0 0 2px rgba(0, 0, 0, 0.2);
          text-align: center;
          cursor: pointer;
          outline: none;
          position: relative;
          box-sizing: border-box;
          background-color: ${colors.red};
          border: 1px solid ${colors.redHighlight};
          color: white;
          font-size: 11px;
          padding: 6px;
          padding-bottom: 4px;
          text-transform: uppercase;
          font-weight: 600;
        }
        button:after {
          display: block;
          content: '';
          position: absolute;
          pointer-events: none;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          z-index: 1;
        }
        button:hover:after {
          background: rgba(0, 0, 0, 0.2);
        }
        button:active:after {
          background: rgba(255, 255, 255, 0.2);
        }

        .green {
          color: ${colors.green};
        }
        .red {
          color: ${colors.red};
        }
      `}</style>
    </div>
  );
}

function Order({ order }: any) {
  return (
    <tr key={order.orderId}>
      <td className={order.side}>{order.price.toFixed(2)}</td>
      <td>{order.size.toLocaleString()}</td>
      <td>
        <a onClick={() => null}>Cancel</a>
      </td>

      <style jsx>{`
        tr:hover {
          background-color: rgba(255, 255, 255, 0.075);
        }

        td {
          width: 33%;
          white-space: nowrap;
        }

        td.buy {
          color: ${colors.green};
        }

        td.sell {
          color: ${colors.red};
        }

        a {
          cursor: pointer;
          text-decoration: underline;
          color: ${colors.red};
        }
      `}</style>
    </tr>
  );
}

function OpenOrders() {
  const [account, setAccount] = useState({ id: '' });
  const [orders, setOrders] = useState({
    bid: [
      { orderId: 1, size: 30000, price: 30000 },
      { orderId: 4, size: 60000, price: 30000 },
      { orderId: 2, size: 40000, price: 29900 },
      { orderId: 5, size: 70000, price: 29900 },
      { orderId: 3, size: 30000, price: 29800 },
      { orderId: 6, size: 20000, price: 29800 },
    ],
    ask: [
      { orderId: 1, size: 30000, price: 30100 },
      { orderId: 4, size: 60000, price: 30100 },
      { orderId: 2, size: 40000, price: 30200 },
      { orderId: 5, size: 70000, price: 30200 },
      { orderId: 3, size: 30000, price: 30300 },
      { orderId: 6, size: 20000, price: 30300 },
    ],
  });

  const ownAsks = orders.ask
    .filter((o) => o.orderId === Number(account.id))
    .reverse();
  const ownBids = orders.bid.filter((o) => o.orderId === Number(account.id));

  return (
    <div>
      <h3>Asks</h3>
      <table>
        <thead>
          <tr>
            <th>Price</th>
            <th>Size</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {ownAsks.map((o) => (
            <Order order={o} key={o} />
          ))}
        </tbody>
      </table>
      <br />
      <h3>Bids</h3>
      <table>
        <thead>
          <tr>
            <th>Price</th>
            <th>Size</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {ownBids.map((o) => (
            <Order order={o} key={0} />
          ))}
        </tbody>
      </table>

      <style jsx>{`
        table {
          font-size: 12px;
          width: 100%;
          font-family: 'Overpass Mono', monospace;
          border-collapse: collapse;
        }
        thead tr {
          line-height: 2em;
          vertical-align: top;
          color: ${colors.label};
        }
        thead th {
          text-align: left;
        }
        tbody tr {
          line-height: 1.38em;
        }

        th {
          font-weight: 600;
          white-space: nowrap;
          font-family: 'Overpass', sans-serif;
        }

        h3 {
          font-size: 16px;
          text-transform: uppercase;
          color: ${colors.label};
          font-weight: bold;
        }
      `}</style>
    </div>
  );
}

export default function AccountTable() {
  const [page, setPage] = useState<'positions' | 'openOrders'>('positions');

  const { keplrConnected, connectKeplr } = useKeplrWallet({
    chainId: CHAIN_ID,
    tendermintRpc: TENDERMINT_RPC,
    cosmosRest: COSMOS_REST,
  });

  const { encryptScalar, qqAccount, signature, hexAddress } =
    useGlobalContext();

  const accountTableTab = page === 'positions' ? <Position /> : <OpenOrders />;

  return (
    <Section title="">
      {keplrConnected ? (
        <>
          <TabBar
            choices={[
              { id: 'positions', label: 'Positions' },
              { id: 'openOrders', label: 'Open Orders' },
            ]}
            maxWidth="120"
            initial={page}
            onChange={setPage}
          />

          {typeof signature === 'undefined' ||
          typeof hexAddress === 'undefined' ||
          typeof qqAccount === 'undefined' ||
          typeof encryptScalar === 'undefined'
            ? 'Please connect trading account'
            : accountTableTab}

          {/* {page === 'positions' ? <Position /> : <OpenOrders />} */}
        </>
      ) : (
        <>
          <div className="login">
            <h3>Your wallet is not connected</h3>
            <Box>
              <button onClick={connectKeplr}>Connect wallet</button>
            </Box>
            <br />
          </div>
        </>
      )}

      <style jsx>{`
        .login {
          max-width: 300px;
          margin: 10% auto;
          padding: 20px 40px;
          font-size: 12px;
          background: rgba(0, 0, 0, 0.2);
        }

        .login input {
          background: none;
          outline: none;
          border: 1px solid ${colors.borderBright};
          border-radius: 3px;
          box-sizing: border-box;
          height: 27px;
          vertical-align: middle;
          font-size: 12px;
          font-weight: 600;
          padding: 0 8px;
          padding-top: 2px;
          max-width: 250px;
          color: ${colors.primary};
          font-family: inherit;
          margin-right: 10px;
        }

        .login button {
          background: none;
          border: 1px solid ${colors.highlight};
          padding: 6px;
          text-transform: uppercase;
          color: white;
          font-weight: 600;
          font-size: 10px;
          cursor: pointer;
          outline: none;
        }
        .login button:hover {
          background: ${colors.highlight};
        }
        .login button:active {
          background: white;
          color: black;
        }
      `}</style>
    </Section>
  );
}
