import { useState, useEffect, Dispatch, SetStateAction } from 'react';
import colors from '../../../../colors';

interface ChoicePlaceOrder {
  id: 'LIMIT' | 'MARKET';
  label: 'Limit' | 'Market';
}

interface ChoicesAccountTable {
  id: 'positions' | 'openOrders';
  label: 'Positions' | 'Open Orders';
}

type choice = ChoicePlaceOrder | ChoicesAccountTable;

interface TopBarProps {
  choices: choice[];
  initial: choice['id'];
  onChange: Dispatch<SetStateAction<any>>;
  maxWidth: string;
}

export default function TabBar({
  choices,
  onChange,
  initial = choices[0].id,
  maxWidth,
}: TopBarProps) {
  const [active, setActive] = useState(initial);
  useEffect(() => onChange(active));

  return (
    <div>
      <ul>
        {choices.map((choice, i) => {
          return (
            <li
              key={i}
              className={active === choice.id ? 'active' : ''}
              onClick={() => setActive(choice.id)}
            >
              {choice.label}
            </li>
          );
        })}
      </ul>

      <style jsx>{`
        ul {
          list-style: none;
          padding: 0;
          display: flex;
          border-bottom: 1px solid ${colors.border};
        }
        li {
          display: inline-block;
          font-size: 13px;
          font-weight: 600;
          position: relative;
          box-sizing: border-box;
          height: 22px;
          color: ${colors.label};
          flex: 1;
          text-align: center;
          cursor: pointer;
          ${maxWidth ? `max-width: ${maxWidth}px;` : ''}
        }
        li.active {
          color: inherit;
        }
        li.active:after {
          content: '';
          display: block;
          width: 100%;
          border-top: 2px solid ${colors.highlight};
          position: relative;
          bottom: -3px;
        }
      `}</style>
    </div>
  );
}
