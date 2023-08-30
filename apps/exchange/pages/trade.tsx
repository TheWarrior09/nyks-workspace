import { useEffect, useState } from 'react';
import StatsBar from '../src/modules/exchange/components/statsbar';
import RecentTrades from '../src/modules/exchange/components/recent-trades';
import OrderBook from '../src/modules/exchange/components/order-book';
import Chart from '../src/modules/exchange/components/chart';
import PlaceOrder from '../src/modules/exchange/components/place-order';
import AccountTable from '../src/modules/exchange/components/account-table';
import Console from '../src/modules/exchange/components/console';
import colors from '../colors';

import { QueryFunctionContext, useQuery } from '@tanstack/react-query';
import axios from 'axios';
import {
  RELAYER_API,
  MESSAGE_GET_FUNDING_RATE,
  MESSAGE_SUBSCRIBE_LIVE_PRICE,
  WEBSOCKET_URL,
} from '../constants';

type QueryKeys = [
  {
    url: string;
    message: string;
  }
];

export async function queryFunctionWithAxios(
  context: QueryFunctionContext<QueryKeys>
) {
  const { queryKey, signal } = context;
  const [{ url, message }] = queryKey;
  const { data } = await axios.post(url, message, {
    headers: {
      'Content-Type': 'application/json',
      'Access-Control-Allow-Origin': '*',
      Authorization:
        'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyaWQiOiJ0ZXN0X3VzZXIiLCJpc19hZG1pbiI6ZmFsc2UsImV4cCI6NDgzNzE0Mzk1OSwiaWF0IjoxNjgzNTQzOTU5fQ.jn1u6__HRuqSHk8kXXlCY4FXli1F5V7UzNHP_8OfC78',
    },
    signal,
  });
  return data;
}

export default function TradeUi() {
  const [fundingRate, setFundingRate] = useState(0.001);
  const [lastPrice, setLastPrice] = useState(0.0);
  const [markPrice, setMarkPrice] = useState(30000);
  const [nextFundingTime, setNextFundingTime] = useState(() => new Date());
  const [previousSide, setPreviousSide] = useState('buy');
  // const [openInterest, setOpenInterest] = useState(100000);
  // const [volume24h, setVolume24h] = useState(0);
  // const [change24h, setChange24h] = useState(0);

  const [eventMessages, setEventMessages] = useState('');
  const [balances, setBalances] = useState([{ name: '', balance: 0 }]);

  const getRequestListQuery = useQuery({
    queryKey: [{ url: RELAYER_API, message: MESSAGE_GET_FUNDING_RATE }],
    queryFn: queryFunctionWithAxios,
    refetchInterval: 2000,
  });

  useEffect(() => {
    setFundingRate(Number(getRequestListQuery.data?.result?.rate));
    setNextFundingTime(getRequestListQuery.data?.result?.timestamp);
    setMarkPrice(Number(getRequestListQuery.data?.result?.price ?? 0.0));
  }, [
    getRequestListQuery.data?.result?.price,
    getRequestListQuery.data?.result?.rate,
    getRequestListQuery.data?.result?.timestamp,
  ]);

  useEffect(() => {
    function connectWebsocket() {
      const websocket = new WebSocket(WEBSOCKET_URL);

      websocket.onopen = () => {
        websocket.send(MESSAGE_SUBSCRIBE_LIVE_PRICE);
        websocket.onmessage = (event) => {
          const data = JSON.parse(event.data);
          const price = data?.params?.result?.[0];
          setLastPrice(price ?? 0.0);
          // setMarkPrice(price ?? 0.0);
        };
      };

      websocket.onerror = (event) => {
        console.log('WebSocket error: ', event);
      };

      websocket.onclose = (event) => {
        console.log('The connection has been closed successfully.');
        setTimeout(function () {
          connectWebsocket();
        }, 1000);
      };

      return websocket;
    }

    const websocket = connectWebsocket();

    return () => {
      websocket.close();
    };
  }, []);

  const page = (
    <div>
      <StatsBar
        fundingRate={fundingRate}
        lastPrice={lastPrice}
        markPrice={markPrice}
        nextFundingTime={nextFundingTime}
        previousSide={previousSide}
      />

      <div className="row">
        <div className="col-3 max-270">
          <PlaceOrder />
        </div>
        <div className="col-9">
          <div className="container">
            <div className="middle row wrap-under-1080 min-height-400">
              <div className="col-6 min-height-400">
                <Chart />
              </div>
              <div className="row min-500 min-height-400">
                <div className="col-6 max-270 min-250">
                  <OrderBook
                    markPrice={markPrice}
                    lastPrice={lastPrice}
                    previousSide={previousSide}
                  />
                </div>
                <div className="col-6 max-270 min-250">
                  <RecentTrades />
                </div>
              </div>
            </div>

            <div className="bottom row wrap-under-1080">
              <div className="col-6 account">
                <AccountTable />
              </div>
              <div className="col-3 console">
                <Console eventMessages={eventMessages} balances={balances} />
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx global>{`
        @import url('https://fonts.googleapis.com/css2?family=Overpass:wght@400;600;700&display=swap');
        @import url('https://fonts.googleapis.com/css2?family=Overpass+Mono&display=swap');

        html,
        body {
          background-color: ${colors.bg};
          color: ${colors.primary};

          margin: 0;
        }

        .container {
          display: flex;
          flex-direction: column;
          min-height: calc(100vh - 64px - 54px);
        }

        .row {
          display: flex;
          flex: 1;
          flex-grow: 1;
          width: 100%;
          overflow: hidden;
          position: relative;
        }

        .middle.row {
          max-height: calc(100vh - 64px - 54px - 340px);
        }
        .bottom.row {
          min-height: 340px;
        }

        .min-height-400 {
          min-height: 400px;
        }

        .row > div {
          flex: 1;
          position: relative;
        }
        .row .col-3 {
          flex-grow: 3;
        }
        .row .col-6 {
          flex-grow: 6;
        }
        .row .col-9 {
          flex-grow: 9;
        }

        .max-270 {
          max-width: 270px;
        }
        .min-250 {
          min-width: 250px;
        }
        .min-500 {
          min-width: 500px;
        }

        @media only screen and (max-width: 520px) {
          .row {
            flex-direction: column;
          }
          .max-270 {
            max-width: none;
          }
        }

        .wrap-under-1080 {
          display: flex;
        }
        @media only screen and (max-width: 1080px) {
          .wrap-under-1080 {
            max-height: none;
            flex-direction: column;
          }
          .middle.row {
            max-height: 680px;
          }
          .wrap-under-1080 .max-270 {
            max-width: 100%;
          }
          .min-height-400 {
            min-height: 340px;
          }
          .account {
            height: 280px;
          }
          .console {
            height: 360px;
          }
        }
      `}</style>
    </div>
  );

  return page;
}
