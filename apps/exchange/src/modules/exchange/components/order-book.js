import Section from './section';
import colors from '../../../../colors';
import { useState, useEffect, forwardRef, createRef } from 'react';
import { RELAYER_API, MESSAGE_OPEN_LIMIT_ORDER } from '../../../../constants';
import { useQuery } from '@tanstack/react-query';
import { queryFunctionWithAxios } from '../../../../pages/trade';

export default function OrderBook({ lastPrice, markPrice, previousSide }) {
  const [height, setHeight] = useState(0);
  const uptick = previousSide === 'buy';

  const openLimitOrderQuery = useQuery({
    queryKey: [{ url: RELAYER_API, message: MESSAGE_OPEN_LIMIT_ORDER }],
    queryFn: queryFunctionWithAxios,
    // staleTime: 3000,
    refetchInterval: 5000,
  });

  const orders = {
    ask: openLimitOrderQuery.data?.result.ask.map((item) => ({
      size: item.positionsize,
      ...item,
    })),
    bid: openLimitOrderQuery.data?.result.bid.map((item) => ({
      size: item.positionsize,
      ...item,
    })),
  };

  const contentRef = createRef();

  useEffect(() => {
    setHeight(contentRef.current?.parentNode.clientHeight);

    function handleResize(ev) {
      setHeight(contentRef.current?.parentNode.clientHeight);
    }

    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [contentRef]);

  if (openLimitOrderQuery.status === 'loading') {
    return <>Loading...</>;
  }

  const numOrdersToShow = Math.round(6 + (height - 410) / 39);
  const truncatedOrders = mergeAndTruncateOrders(orders, numOrdersToShow);
  const depthTotals = computeDepthTotals(truncatedOrders);

  // eslint-disable-next-line react/display-name
  const Content = forwardRef((_, ref) => (
    <div ref={ref}>
      <OrderList
        side="sell"
        orders={truncatedOrders.ask}
        depthTotals={depthTotals}
      />
      <hr />
      <span className={'last-price ' + (uptick ? 'green' : 'red')}>
        {lastPrice.toFixed(2)} {uptick ? '↑' : '↓'}
      </span>
      <span className="mark-price">{markPrice?.toFixed(1)}</span>
      <hr />
      <OrderList
        side="buy"
        orders={truncatedOrders.bid}
        depthTotals={depthTotals}
      />

      <style jsx>{`
        hr {
          border: 0;
          border-top: 1px solid ${colors.borderBright};
        }

        .last-price {
          font-size: 17px;
          text-align: center;
          display: block;
        }
        .green {
          color: ${colors.green};
        }
        .red {
          color: ${colors.red};
        }
        .mark-price {
          text-align: center;
          display: block;
          font-size: 12px;
        }
      `}</style>
    </div>
  ));

  return (
    <Section title="Order Book">
      <Content ref={contentRef} />
    </Section>
  );
}

function mergeAndTruncateOrders(orders, numOrdersToShow = 8) {
  const result = {};
  Object.keys(orders).forEach((side) => {
    const priceSteps = new Set();
    for (
      let i = 0;
      i < orders[side].length && priceSteps.size < numOrdersToShow;
      i++
    ) {
      priceSteps.add(orders[side][i].price);
    }

    const orderedPriceSteps = Array.from(priceSteps).sort((a, b) =>
      (b - a) * side === 'buy' ? -1 : 1
    );
    const mergedOrders = [];
    for (let i = 0; i < orders[side].length; i++) {
      const o = orders[side][i];
      if (!priceSteps.has(o.price)) break;
      if (
        mergedOrders.length === 0 ||
        mergedOrders[mergedOrders.length - 1].price !== o.price
      ) {
        mergedOrders.push({ price: o.price, size: o.size });
      } else {
        mergedOrders[mergedOrders.length - 1].size += o.size;
      }
    }
    result[side] = mergedOrders;
  });

  return result;
}

function computeDepthTotals(orders) {
  const depthTotals = { buy: [], sell: [] };
  Object.keys(depthTotals).forEach((side) => {
    orders[side === 'buy' ? 'bid' : 'ask'].forEach((order) => {
      const totals = depthTotals[side];
      const lastTotal = totals.length ? totals[totals.length - 1] : 0;
      totals.push(lastTotal + order.size);
    });
  });

  depthTotals.max = Math.max(
    depthTotals.buy[depthTotals.buy.length - 1],
    depthTotals.sell[depthTotals.sell.length - 1]
  );

  return depthTotals;
}

const maxBackgroundWidth = 110;
function OrderList({ side, orders, depthTotals }) {
  const totals = depthTotals[side];
  const maxTotalDepth = depthTotals.max;

  if (side === 'sell') {
    orders = orders.slice().reverse();
    totals.reverse();
  }

  return (
    <table className={side}>
      <thead>
        <tr>
          <th>
            Price <small>(USD)</small>
          </th>
          <th style={{ textAlign: 'center' }}>Size</th>
          <th>Amount</th>
        </tr>
      </thead>
      <tbody>
        {orders?.map((order, index) => (
          <tr
            key={index}
            // onMouseEnter={() => dispatch({ type: 'hoverOrder', order })}
            // onMouseLeave={() => dispatch({ type: 'unhoverOrder' })}
            // onClick={dispatch.bind(null, { type: 'clickOrder' })}
          >
            {/* <td className="price">{order.price.toFixed(2)}</td>
            <td className="amount">{order.size.toLocaleString()}</td>
            <td className="total">
              <span
                className="bg"
                style={{
                  width: (totals[index] / maxTotalDepth) * maxBackgroundWidth,
                }}
              ></span>
              <span className="value">{totals[index].toLocaleString()}</span>
            </td> */}

            <td className="price">{order.price.toFixed(2)}</td>
            <td className="amount" style={{ textAlign: 'center' }}>
              {(order.size / order.price).toFixed(5)}
            </td>
            <td className="total">
              {/* <span
                className="bg"
                style={{
                  width:
                    (side === 'sell'
                      ? 1 - totals[index] / maxTotalDepth
                      : totals[index] / maxTotalDepth) * maxBackgroundWidth,
                }}
              ></span> */}
              <span className="value">{order.size.toFixed(2)}</span>
            </td>
          </tr>
        ))}
      </tbody>

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
        tbody tr {
          line-height: 1.38em;
        }

        tbody tr:hover {
          background-color: rgba(255, 255, 255, 0.075);
        }

        th {
          font-weight: 600;
          white-space: nowrap;
          font-family: 'Overpass', sans-serif;
        }
        td {
          white-space: nowrap;
          cursor: pointer;
        }

        th:first-child,
        td:first-child {
          text-align: left;
        }
        th:nth-child(2),
        td:nth-child(2) {
          text-align: left;
        }
        th:last-child,
        td:last-child {
          text-align: right;
        }
        .total {
          position: relative;
          padding-left: 0;
          width: 90px;
        }
        .total .bg {
          width: 110px;
          height: 17px;
          z-index: 1;
          float: right;
          opacity: 0.3;
          display: block;
        }
        .total .value {
          z-index: 2;
          position: absolute;
          right: 3px;
          top: 3px;
        }
        .sell .total .bg {
          background-color: ${colors.red};
        }
        .buy .total .bg {
          background-color: ${colors.green};
        }
        .buy .price {
          color: ${colors.green};
        }
        .sell .price {
          color: ${colors.red};
        }
      `}</style>
    </table>
  );
}
