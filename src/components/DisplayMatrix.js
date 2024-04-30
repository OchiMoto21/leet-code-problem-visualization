import "./DisplayMatrix.css";

function DPTable({ dp, string, cellChanged }) {
  // if (input.length === 0 && dp === undefined) return;
  const input = string.split("");

  const [rowChanged, columnChanged] = cellChanged;

  const index_array = GenerateTableHeader(string, columnChanged);
  return (
    <div className="table-wrapper">
      <table>
        <tbody>
          <tr>{index_array}</tr>

          <tr>
            <td className="table-header">
              <code>i</code>
            </td>
            <td className="table-header"></td>
            {input.map((cell, cellIndex) => (
              <td
                key={cell + cellIndex}
                className={
                  "table-header" +
                  (cellIndex === columnChanged ? " column-changed" : "")
                }
              >
                <p>{cell}</p>
              </td>
            ))}
          </tr>
          {dp.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              className={rowIndex === rowChanged ? "row-changed" : ""}
            >
              <td
                className={
                  "table-header" +
                  (rowIndex === rowChanged ? " row-changed" : "")
                }
              >
                {rowIndex}
              </td>
              <td
                className={
                  "table-header" +
                  (rowIndex === rowChanged ? " row-changed" : "")
                }
              >
                {input[rowIndex]}
              </td>

              {row.map((cell, cellIndex) => {
                return (
                  <td
                    className={
                      (cell ? "value-true" : "value-false") +
                      (rowIndex === rowChanged && cellIndex === columnChanged
                        ? " value-changed"
                        : "") +
                      (cellIndex === columnChanged ? " column-changed" : "")
                    }
                    key={cellIndex}
                  >
                    {cell ? "1" : "0"}
                  </td>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
function GenerateTableHeader({ string, columnChanged }) {
  const input = string.split("");
  const index_array = [];
  index_array.push(
    <td key={"Column Header " + -2} className="table-header"></td>
  );
  index_array.push(
    <td key={"Column Header " + -1} className="table-header">
      <code>j</code>
    </td>
  );

  for (let i = 0; i < input.length; i++) {
    index_array.push(
      <td
        key={"Column Header " + i}
        className={
          "table-header" + (i === columnChanged ? " column-changed" : "")
        }
      >
        <p>{i}</p>
      </td>
    );
  }
  return index_array;
}
//
export default DPTable;
