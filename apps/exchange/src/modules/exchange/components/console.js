import Section from './section';
import TabBar from './tab-bar';
import colors from '../../../../colors';
import { useState, useEffect, createRef } from 'react';

export default function Console({ eventMessages, balances }) {
  let [consoleMode, setConsoleMode] = useState('console');
  let scrollHook = useState({ locked: true });
  let ref = createRef();

  useEffect(() => {
    if (scroll.locked) {
      ref.current.scrollTop =
        ref.current.scrollHeight + ref.current.clientHeight;
    }
  });

  return (
    <Section>
      <TabBar
        choices={[
          { id: 'console', label: 'Console' },
          { id: 'leaderboard', label: 'Leaderboard' },
        ]}
        initial={consoleMode}
        onChange={setConsoleMode}
      />

      {consoleMode === 'console'
        ? EventLog(eventMessages, scrollHook, ref)
        : null}
      {consoleMode === 'leaderboard' ? Leaderboard(balances) : null}
    </Section>
  );
}

function EventLog(eventMessages, [scroll, setScroll], ref) {
  function handleScroll() {
    let el = ref.current;
    let locked = el.scrollTop + el.clientHeight + 1 >= el.scrollHeight;
    setScroll({ ...scroll, locked });
  }

  function goToBottom() {
    ref.current.scrollTop = ref.current.scrollHeight;
    setScroll({ ...scroll, locked: true });
  }

  return (
    <>
      <textarea
        ref={ref}
        readOnly={true}
        value={eventMessages}
        onScroll={handleScroll}
      ></textarea>

      {scroll.locked ? null : <button onClick={goToBottom}>▼</button>}

      <style jsx>{`
        textarea {
          width: calc(100% + 24px);
          position: absolute;
          top: 64px;
          bottom: 0;
          right: 0;
          left: 0;
          margin: 0;
          padding: 6px;
          margin: -12px 0;
          background-color: ${colors.bg};
          color: ${colors.primary};
          border: 0;
          resize: none;
          outline: none;
          box-sizing: border-box;
          font-size: 12px;
          font-family: 'Overpass Mono', monospace;
        }
        textarea::-webkit-scrollbar {
          width: 6px;
        }
        textarea::-webkit-scrollbar-track {
          -webkit-box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.6);
          border-radius: 10px;
        }
        textarea::-webkit-scrollbar-thumb {
          border-radius: 10px;
          background-color: ${colors.label};
        }
        textarea.maximized {
          position: fixed;
          top: 130px;
          right: 0;
          left: 0;
          bottom: 0;
          z-index: 100;
        }
        button {
          position: absolute;
          bottom: 5px;
          right: 5px;
          padding: 5px 15px;
          opacity: 0.5;
          z-index: 110;
        }
      `}</style>
    </>
  );
}

function Leaderboard(balances) {
  let accts = Object.entries(balances)
    .map(([name, balance]) => ({ name, balance }))
    .sort((a, b) => b.balance - a.balance);

  return (
    <div className="table-container">
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Balance</th>
          </tr>
        </thead>
        <tbody>
          {accts.map((acct) => (
            <tr key={acct.name}>
              <td>{acct.name}</td>
              <td>{acct.balance.toFixed(8)}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <style jsx>{`
        .table-container {
          position: absolute;
          top: 64px;
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
          text-align: left;
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
          text-align: left;
        }

        th {
          font-weight: 600;
          font-family: 'Overpass', sans-serif;
        }
        td {
          width: 44%;
          white-space: nowrap;
          display: inline-block;
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
    </div>
  );
}
