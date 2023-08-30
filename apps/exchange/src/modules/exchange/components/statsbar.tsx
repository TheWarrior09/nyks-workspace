import { useState, useEffect } from 'react';
import colors from '../../../../colors.js';

export default function StatsBar({
  lastPrice,
  markPrice,
  fundingRate,
  nextFundingTime,
  previousSide,
}: {
  lastPrice: number;
  markPrice: number;
  fundingRate: number;
  nextFundingTime: any;
  previousSide: string;
}) {
  const [time, setTime] = useState(0);
  useEffect(() => {
    const timeout = setTimeout(() => setTime(Date.now()), 1000);
    return () => clearTimeout(timeout);
  }, [time]);

  const nextFundingTimeInMilliseconds = Date.parse(nextFundingTime);

  function timeToFunding() {
    const totalSeconds =
      ((new Date(
        nextFundingTimeInMilliseconds + 60 * 60 * 1000
      ) as unknown as number) -
        Date.now()) /
      1000;
    const hours = String(Math.floor(totalSeconds / 3600)).padStart(2, '0');
    const minutes = String(Math.floor(totalSeconds / 60) % 60).padStart(2, '0');
    const seconds = String(Math.floor(totalSeconds % 60)).padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
  }

  return (
    <div>
      <span className="symbol">
        <span className="name">BTCUSD</span>
        <span className={'price ' + (previousSide === 'buy' ? 'green' : 'red')}>
          {lastPrice.toFixed(2)}
        </span>
      </span>

      <span className="stats">
        <span className="separator"></span>

        <span className="stat">
          <label>Mark Price</label>
          <span className="value">
            {markPrice.toFixed(2)} <small>USD</small>
          </span>
        </span>
        <span className="stat funding">
          <label>Funding</label>
          <span className="value">
            {fundingRate.toFixed(3)}%{' '}
            <small className="time accent-label">{timeToFunding()}</small>
          </span>
        </span>
        {/*  <span className="stat">
          <label>24h Change</label>
          <span className={'value ' + (change24h > 0 ? 'green' : 'red')}>
            {change24h * 100}%
          </span>
        </span>
        <span className="stat">
          <label>24h Volume</label>
          <span className="value">
            {volume24h.toLocaleString()} <small>BTC</small>
          </span>
        </span>
         <span className="stat">
          <label>Open Interest</label>
          <span className="value">
            {openInterest.toLocaleString()} <small>USD</small>
          </span>
        </span> */}
      </span>

      <style jsx>{`
        .symbol .name {
          font-weight: 600;
          font-size: 17px;
          margin: 0 16px;
          vertical-align: middle;
        }

        .symbol .price {
          margin: 0 32px;
          font-size: 24px;
          vertical-align: middle;
        }

        .separator {
          display: inline-block;
          border-left: 1px solid ${colors.borderBright};
          height: calc(54px * 0.5);
          vertical-align: middle;
          margin-right: 12px;
        }

        .stat {
          display: inline-block;
          line-height: 1em;
          position: relative;
          top: 8px;
          margin: 0 20px;
        }
        .stat label {
          color: ${colors.label};
          display: block;
          line-height: 1em;
          text-transform: uppercase;
          font-size: 0.75em;
          font-weight: bold;
          margin-bottom: 4px;
        }
        small {
          color: ${colors.label};
        }
        .green {
          color: ${colors.green};
        }
        .red {
          color: ${colors.red};
        }
        .accent-label {
          color: ${colors.accentLabel};
        }

        .stat.funding .time {
          display: inline-block;
          width: 53px;
          margin-left: 8px;
        }

        div {
          border-bottom: 2px solid ${colors.border};
          line-height: 64px;
          height: 64px;
          box-sizing: border-box;
          padding: 0 24px;
          vertical-align: middle;
          white-space: nowrap;
        }

        div > .span {
          vertical-align: middle;
        }
      `}</style>
    </div>
  );
}
