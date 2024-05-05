import "./DisplayMatrix.css";

function DPTable({dp, string, cellUpdated}) {
  // if (input.length === 0 && dp === undefined) return;
  const input = string.split("");

  const [rowUpdated, columnUpdated] = cellUpdated;
  return (
    <div className="table-wrapper">
      <table>
        <tbody>
          <GenerateIndexTableHeader input={input} columnUpdated={columnUpdated} />
          <GenerateCharTableHeader input={input} columnUpdated={columnUpdated} />
          {dp.map((row, rowIndex) => (
            <tr
              key={rowIndex}
              className={rowIndex === rowUpdated ? "row-updated" : ""}
            >
              <td
                className={
                  "table-header" +
                  (rowIndex === rowUpdated ? " row-updated" : "")
                }
              >
                {rowIndex}
              </td>
              <td
                className={
                  "table-header" +
                  (rowIndex === rowUpdated ? " row-updated" : "")
                }
              >
                {input[rowIndex]}
              </td>

              {row.map((cell, cellIndex) => {
                return (
                  <td
                    className={
                      (cell ? "value-true" : "value-false") +
                      (rowIndex === rowUpdated && cellIndex === columnUpdated
                        ? " value-updated"
                        : "") +
                      (cellIndex === columnUpdated ? " column-updated" : "")
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

function GenerateIndexTableHeader({input, columnUpdated}) {

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
          "table-header" + (i === columnUpdated ? " column-updated" : "")
        }
      >
        <p>{i}</p>
      </td>
    );
  }

  return <tr>{index_array}</tr>;
}

function GenerateCharTableHeader({input, columnUpdated}) {

  return (
    <tr>
      <td className="table-header">
        <code>i</code>
      </td>
      <td className="table-header"></td>
      {input.map((cell, cellIndex) => (
        <td
          key={cell + cellIndex}
          className={"table-header" + (cellIndex === columnUpdated ? " column-updated" : "")}>
          <p>{cell}</p>
        </td>
      ))}
    </tr>
  )

}
export default DPTable;

