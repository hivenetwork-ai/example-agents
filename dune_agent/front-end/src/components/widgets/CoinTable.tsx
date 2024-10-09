import { FC } from "react";

interface CoinData {
  coin: string;
  narrative: string;
  optimizedRelativeStrength: number;
  priceToday: number;
  ranking: number;
}

interface Metadata {
  columnNames: string[];
  columnTypes: string[];
  rowCount: number;
  resultSetBytes: number;
  totalRowCount: number;
  totalResultSetBytes: number;
  datapointCount: number;
  pendingTimeMillis: number;
  executionTimeMillis: number;
}

export interface CoinTableProps {
  rows: CoinData[];
  metadata: Metadata;
  role: string;
}

const CoinTable: FC<CoinTableProps> = ({ rows, metadata, role }) => {

  return (
    <div className="space-y-8">
      {/* Metadata Section */}
      <div className="bg-gray-100 p-4 rounded-lg shadow-md">
        <h2 className="text-xl font-semibold">Beta Index Data - {role}</h2>
        <div className="grid grid-cols-2 gap-4 mt-4">
          <p>
            <strong>Row Count:</strong> {metadata.rowCount}
          </p>
          <p>
            <strong>Total Row Count:</strong> {metadata.totalRowCount}
          </p>
          <p>
            <strong>Result Set Bytes:</strong> {metadata.resultSetBytes}
          </p>
          <p>
            <strong>Total Result Set Bytes:</strong>{" "}
            {metadata.totalResultSetBytes}
          </p>
          <p>
            <strong>Datapoint Count:</strong> {metadata.datapointCount}
          </p>
          <p>
            <strong>Pending Time (ms):</strong> {metadata.pendingTimeMillis}
          </p>
          <p>
            <strong>Execution Time (ms):</strong>{" "}
            {metadata.executionTimeMillis}
          </p>
        </div>
      </div>

      {/* Table Section */}
      <div className="overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg overflow-hidden">
          <thead className="bg-gray-100">
            <tr>
              {metadata.columnNames.map((columnName) => (
                <th key={columnName} className="py-2 px-4 text-left">
                  {columnName}
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.ranking} className="border-t border-gray-200">
                <td className="py-2 px-4">{row.ranking}</td>
                <td className="py-2 px-4">{row.coin}</td>
                <td className="py-2 px-4">${row.priceToday.toFixed(2)}</td>
                <td className="py-2 px-4">
                  {row.optimizedRelativeStrength.toFixed(2)}
                </td>
                <td className="py-2 px-4">{row.narrative}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CoinTable;
