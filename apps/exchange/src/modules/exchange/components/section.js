import colors from '../../../../colors.js';

export default function Section({ title, children }) {
  return (
    <section>
      {title ? (
        <>
          <h2>{title}</h2>
          <hr />
        </>
      ) : null}
      {children}

      <style jsx>{`
        section {
          border-right: 2px solid ${colors.border};
          border-bottom: 2px solid ${colors.border};
          box-sizing: border-box;
          padding: 12px;
          margin: 0;
          min-height: 100%;
          position: relative;
        }

        h2 {
          font-size: 16px;
          margin: 0;
        }

        hr {
          border: 0;
          border-top: 1px solid ${colors.borderBright};
        }
      `}</style>
    </section>
  );
}
