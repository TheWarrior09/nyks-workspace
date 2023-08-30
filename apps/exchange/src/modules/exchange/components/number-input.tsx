import colors from '../../../../colors.js';

export default function NumberInput({
  label,
  denom,
  value,
  onChange,
}: {
  label: string;
  denom: string;
  value: string;
  onChange: (value: string) => void;
}) {
  return (
    <div>
      <label>{label}</label>
      <input
        type="number"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
      <span className="denom">{denom}</span>

      <style jsx>{`
        div {
          position: relative;
        }
        label {
          font-size: 10px;
          font-weight: bold;
          color: ${colors.label};
          text-transform: uppercase;
          display: block;
          margin: 4px 6px;
        }
        input {
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
          width: 100%;
          max-width: 250px;
          margin-bottom: 12px;
          color: ${colors.primary};
          font-family: inherit;
        }
        .denom {
          display: inline-block;
          position: absolute;
          right: 8px;
          bottom: 18px;
          color: ${colors.label};
          font-size: 10px;
          font-weight: 600;
          pointer-events: none;
        }

        input::-webkit-outer-spin-button,
        input::-webkit-inner-spin-button {
          -webkit-appearance: none;
          margin: 0;
        }
        input[type='number'] {
          -moz-appearance: textfield;
        }
      `}</style>
    </div>
  );
}
