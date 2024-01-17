import React from "react";
import { useTable } from "react-table";

const CustomTable = ({ data, columns, title, handleClick }) => {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });
  return (
    <div className="mb-[50px]">
      <div className="text-center mb-[10px]">
        <h1 className="text-2xl font-bold">{title}</h1>
      </div>
      <div className="w-full">
        <table {...getTableProps()} className="w-full">
          <thead className="text-center">
            {headerGroups.map((headerGroup) => (
              <tr {...headerGroup.getHeaderGroupProps()}>
                {headerGroup.headers.map((column) => (
                  <th {...column.getHeaderProps()}>
                    {column.render("Header")}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
          <tbody {...getTableBodyProps()} className="text-center">
            {rows.map((row, index) => {
              prepareRow(row);
              return (
                <tr
                  {...row.getRowProps()}
                  className="border-b-2 cursor-pointer"
                  onClick={() => handleClick(data[index]._id)}
                >
                  {row.cells.map((cell) => (
                    <td {...cell.getCellProps()} className="py-[8px]">
                      {cell.value === false ? (
                        <span class="inline-flex items-center rounded-md bg-red-50 px-2 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/10">
                          Not Verified
                        </span>
                      ) : cell.value === true ? (
                        <span class="inline-flex items-center rounded-md bg-green-50 px-2 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20">
                          Verified
                        </span>
                      ) : (
                        cell.render("Cell")
                      )}
                    </td>
                  ))}
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CustomTable;
