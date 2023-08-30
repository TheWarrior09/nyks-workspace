import { Container } from '@mui/material';

export default function Home() {
  return (
    <Container sx={{ mb: 5 }}>
      <h1>Twilight</h1>
      <p>The Unstoppable Bitcoin Exchange</p>
      <h2>Decentralized Exchange</h2>
      <p>
        <code>Twilight</code> is a decentralized, non-custodial BTC/USD
        exchange. You hold your own private keys. The exchange is always online,
        censorship-resistant, and {"can't"} be manipulated.
      </p>
      <h2>Perpetual Swaps, 200x Leverage</h2>
      <p>
        Industry-leading margin trading lets you maximize the profit of your
        successful trades. Open perpetual swap positions with up to 200x
        leverage.
      </p>
      <h2>No KYC, No Geo blocking</h2>
      <p>
        <code>Twilight</code> is an open protocol, like Bitcoin or HTTP. We
        operate no servers and hold no keys. The only thing that can be shutdown
        is this informational website.
      </p>
      <h2>Fast</h2>
      <p>
        Decentralization {"doesn't"} have to be a compromise. Trades settle with
        comparable latency and higher throughput than leading centralized
        exchanges.
      </p>
      <h2>Easy WebSocket API</h2>
      <p>
        Execute trades programmatically in any programming language. View the
        trading API docs
      </p>
      <h2>Open and Auditable</h2>
      <p>
        Trades are committed to a distributed ledger, secured by byzantine
        fault-tolerant consensus. You can be 100% sure that{' '}
        <code>Twilight</code> is solvent, and not stealing your funds via
        front-running or questionable downtime.
      </p>
      <h2>Comparing exchanges</h2>
      <div className="table-wrapper">
        <table id="comparison-table">
          <thead>
            <tr>
              <th>exchange</th>
              <th>decentralized*</th>
              <th>non-custodial</th>
              <th>max leverage</th>
              <th>no kyc</th>
              <th>no geo blocking</th>
              <th>auditable</th>
              <th>settlement platform</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>Twilight</td>
              <td>✅</td>
              <td>✅</td>
              <td>200x</td>
              <td>✅</td>
              <td>✅</td>
              <td>✅</td>
              <td>
                NYKS <span className="sub">(10,000 tx/s)</span>
              </td>
            </tr>
            <tr>
              <td>BitMEX</td>
              <td>❌</td>
              <td>❌</td>
              <td>100x</td>
              <td>✅</td>
              <td>❌</td>
              <td>❌</td>
              <td>Central Server</td>
            </tr>
            <tr>
              <td>Nash</td>
              <td>❌</td>
              <td>✅</td>
              <td>1x</td>
              <td>❌</td>
              <td>❌</td>
              <td>❌</td>
              <td>
                Ethereum <span className="sub">(15 tx/s)</span>
              </td>
            </tr>
            <tr>
              <td>Bitfinex</td>
              <td>❌</td>
              <td>❌</td>
              <td>10x</td>
              <td>❌</td>
              <td>❌</td>
              <td>❌</td>
              <td>Central Server</td>
            </tr>
            <tr>
              <td>DYDX</td>
              <td>❌</td>
              <td>✅</td>
              <td>10x</td>
              <td>❌</td>
              <td>❌</td>
              <td>❌</td>
              <td>
                Ethereum <span className="sub">(15 tx/s)</span>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <style jsx>{`
        #comparison-table {
          text-align: center;
          width: 100%;
        }
        #comparison-table th,
        #comparison-table td {
          vertical-align: middle;
        }

        td .sub {
          color: #aaa;
          font-size: 0.85em;
        }
        #ui-screenshot {
          display: block;
          width: 100%;
          max-width: 500px;
          margin: 20px auto;
        }
        .table-wrapper {
          max-width: 100%;
          overflow-x: auto;
        }
      `}</style>
    </Container>
  );
}
