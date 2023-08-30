import Section from './section';
import colors from '../../../../colors';
import { useQuery } from '@tanstack/react-query';
import { RELAYER_API, MESSAGE_RECENT_TRADE_ORDER } from '../../../../constants';
import { queryFunctionWithAxios } from '../../../../pages/trade';

export default function RecentTrades() {
  const recentTradeOrderQuery = useQuery({
    queryKey: [{ url: RELAYER_API, message: MESSAGE_RECENT_TRADE_ORDER }],
    queryFn: queryFunctionWithAxios,
    refetchInterval: 2000,
  });
  const trades = recentTradeOrderQuery.data?.result?.slice().reverse();

  if (recentTradeOrderQuery.status === 'loading') {
    return <>Loading...</>;
  }

  return (
    <Section title="Trades">
      <div className="table-container">
        <table>
          <thead>
            <tr>
              <th>
                Price <small>(USD)</small>
              </th>
              <th style={{ textAlign: 'center' }}>Size</th>
              <th>Time</th>
            </tr>
          </thead>
          <tbody>
            {trades?.map((trade: any, index: number) => (
              <tr key={index}>
                <td className={`price ${trade.side}`}>
                  {Number(trade.entryprice).toFixed(2)}
                </td>
                <td className="amount" style={{ textAlign: 'center' }}>
                  {Number(trade.positionsize / trade.entryprice).toFixed(5)}
                </td>
                <td className="time">
                  {new Date(trade.timestamp).toLocaleTimeString()}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <style jsx>{`
        .table-container {
          position: absolute;
          top: 48px;
          right: 12px;
          bottom: 0;
          left: 12px;
          overflow: hidden;
        }
        table {
          font-size: 12px;
          width: 100%;
          font-family: 'Overpass Mono', monospace;
          height: 100%;
          overflow-y: scroll;
        }
        thead tr {
          line-height: 2em;
          vertical-align: top;
          color: ${colors.label};
          width: 100%;
        }
        tbody {
          position: absolute;
          top: 2.2em;
          left: 0;
          right: 0;
          bottom: 0;
          overflow-y: auto;
          overflow-x: hidden;
          padding: 0 6px;
          box-sizing: border-box;
        }
        tbody tr {
          display: inline-block;
          line-height: 1.38em;
          width: 100%;
        }

        th {
          font-weight: 600;
          font-family: 'Overpass', sans-serif;
        }
        td {
          white-space: nowrap;
          display: inline-block;
        }

        th:first-child,
        td:first-child {
          width: 33%;
          text-align: left;
          white-space: nowrap;
        }
        th:nth-child(2),
        td:nth-child(2) {
          width: 25%;
          text-align: left;
        }
        th:last-child,
        td:last-child {
          width: 39%;
          text-align: right;
        }

        .buy {
          color: ${colors.green};
        }
        .sell {
          color: ${colors.red};
        }

        *::-webkit-scrollbar {
          width: 6px;
        }
        *::-webkit-scrollbar-track {
          -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.6);
          border-radius: 10px;
        }
        *::-webkit-scrollbar-thumb {
          border-radius: 10px;
          background-color: ${colors.label};
        }
      `}</style>
    </Section>
  );
}
