import colors from '../../../../colors';

export default function LeverageSlider({
  value,
  onChange,
}: {
  value: number;
  onChange: (value: number) => void;
}) {
  const values = [1, 2, 3, 5, 10, 25, 50, 100, 150, 200];

  return (
    <div>
      <ul>
        {values.map((v) => (
          <li
            key={v}
            onClick={() => onChange(v)}
            className={value === v ? 'active' : ''}
          >
            <label>{v}X</label>
          </li>
        ))}
      </ul>

      <style jsx>{`
                ul {
                    list-style: none;
                    padding: 0;
                    position: relative;
                    max-width: 270px;
                    margin-right: -18px;
                }
                li {
                    display: inline-block;
                    font-size: 9px;
                    position: relative;
                    width: ${99 / values.length}%;
                    border-top: 2px solid ${colors.label};
                    padding-top: 10px;
                    -webkit-touch-callout: none;
                    -webkit-user-select: none
                    -khtml-user-select: none;
                    -moz-user-select: none;
                    -ms-user-select: none;
                    user-select: none;
                }
                li:last-child {
                    border: none;
                }
                li:before, li:after {
                    content: '';
                    display: inline-block;
                    border-radius: 100%;
                    position: absolute;
                    cursor: pointer;
                }
                li:before {
                    width: 8px;
                    height: 8px;
                    background-color: ${colors.label};
                    top: -5px;
                    z-index: 2;
                }
                li:after {
                    width: 12px;
                    height: 12px;
                    top: -7px;
                    left: -2px;
                    z-index: 1;
                }

                li label {
                    color: ${colors.label};
                    display: inline-block;
                    left: -16px;
                    width: 40px;
                    margin-top: 1px;
                    text-align: center;
                    position: relative;
                    cursor: pointer;
                }

                li.active label {
                    color: inherit;
                }
                li.active:before {
                    background-color: ${colors.primary};
                }
                li.active:after {
                    background-color: ${colors.highlight};
                }

                li:hover label {
                    color: inherit;
                }
                li:hover:before {
                    background-color: ${colors.primary};
                }
            `}</style>
    </div>
  );
}
