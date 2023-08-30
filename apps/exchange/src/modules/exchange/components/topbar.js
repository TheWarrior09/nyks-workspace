import Link from 'next/link.js';
import colors from '../../../../colors.js';

export default function TopBar({ connecting, connected }) {
  return (
    <header>
      <Link href="/">
        <img className="logo" src="./trade_logo.png" />
      </Link>

      <span className="connection">
        <span className="separator"></span>
        <span
          className={`dot ${connected ? 'green' : connecting ? 'blue' : 'red'}`}
        />
        {connected
          ? 'Connected'
          : connecting
          ? 'Connecting...'
          : 'Not Connected'}
      </span>

      <style jsx>{`
        .logo {
          width: 128px;
          margin-top: 13px;
        }

        .connection {
          float: right;
          vertical-align: middle;
          line-height: 54px;
        }

        .separator {
          display: inline-block;
          border-left: 1px solid ${colors.borderBright};
          height: calc(54px * 0.5);
          vertical-align: middle;
          margin-right: 20px;
        }

        .dot {
          border-radius: 100%;
          display: inline-block;
          width: 9px;
          height: 9px;
          margin-right: 6px;
          margin-bottom: 1px;
        }
        .green {
          background-color: ${colors.green};
        }
        .red {
          background-color: ${colors.red};
        }
        .blue {
          background-color: ${colors.highlight};
        }

        header {
          border-bottom: 2px solid ${colors.border};
          height: 54px;
          box-sizing: border-box;
          padding: 0 24px;
        }
      `}</style>
    </header>
  );
}
