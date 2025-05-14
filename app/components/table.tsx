import React, { JSX } from 'react';
import { Eye, Trash2 } from 'lucide-react';

interface Column<T> {
  header: string;
  accessor: keyof T;
}

interface TableProps<T> {
  columns: Column<T>[];
  data: T[];
  onView?: (row: T) => void;
  onDelete?: (row: T) => void;
}

const Table = <T,>({ columns, data, onView, onDelete }: TableProps<T>): JSX.Element => {
  return (
    <div className="overflow-x-auto rounded-2xl shadow-lg border border-gray-200">
      <table className="min-w-full bg-white rounded-2xl overflow-hidden">
        <thead>
          <tr className="bg-indigo-600 text-white text-left">
            {columns.map((col, index) => (
              <th key={index} className="px-6 py-3 text-sm font-bold uppercase tracking-wider">
                {col.header}
              </th>
            ))}
            <th className="px-6 py-3 text-sm font-bold uppercase tracking-wider text-center">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data && data.length === 0 ? (
            <tr>
              <td colSpan={columns.length + 1} className="text-center py-6 text-gray-500">
                No data available
              </td>
            </tr>
          ) : (
            data &&
            data.map((row, rowIndex) => (
              <tr key={rowIndex} className="border-t border-gray-100 hover:bg-gray-50 transition">
                {columns.map((col, colIndex) => (
                  <td key={colIndex} className="px-6 py-4 text-gray-700">
                    {String(row[col.accessor])}
                  </td>
                ))}
                <td className="px-6 py-4 text-center flex justify-center space-x-4">
                  <button
                    onClick={() => onView?.(row)}
                    className="text-blue-600 hover:text-blue-800 transition"
                    title="View"
                  >
                    <Eye className="w-5 h-5" />
                  </button>
                  <button
                    onClick={() => onDelete?.(row)}
                    className="text-red-600 hover:text-red-800 transition"
                    title="Delete"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default Table;
