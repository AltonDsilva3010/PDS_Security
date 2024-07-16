import React from "react";
import { useTable } from "react-table";


// common Table Component
const CustomTable = ({ data, columns, title, handleClick }) => {
  const { getTableProps, getTableBodyProps, headerGroups, rows, prepareRow } =
    useTable({ columns, data });
  return (
    <div className="mb-[50px]">
      <div className="text-center mb-[20px]">
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
                  onClick={
                    // console.log("Hello")
                    handleClick ? () => handleClick(data[index]._id) : null
                  }
                >
                  {row.cells.map((cell) => {
                    // if (cell.column.Header == "Status") {
                    //   console.log(cell.row.original[11]);
                    // }
                    return (
                      <td {...cell.getCellProps()} className="py-[8px]">
                        {cell.column.Header == "CurrentBid" ||
                        cell.column.Header == "YourBid" ? (
                          <span class="inline-flex items-center rounded-md  px-2 py-1 text-xs font-medium   ">
                            {cell.row.original[8] ? (
                              `ETH ${(
                                Number(cell.row.original[8]) /
                                10 ** 18
                              ).toFixed(2)} `
                            ) : (
                              <span className="px-2 py-1 text-xs rounded-md ring-1 ring-inset">
                                No Bid
                              </span>
                            )}
                          </span>
                        ) : cell.column.Header == "Phone" ? (
                          <div>{Number(cell.row.original[6])}</div>
                        ) : cell.column.Header == "Commodities" ? (
                          <div>
                            {cell.row.original[5].map((item) => (
                              <span>{item} </span>
                            ))}
                          </div>
                        ) : cell.column.Header == "Quality Checked" ? (
                          <span class="inline-flex items-center rounded-md  px-2 py-1 text-xs font-medium  ring-1 ring-inset ">
                            {cell.row.original[11] ? "True" : "False"}
                          </span>
                        ) : cell.value === false ? (
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
                    );
                  })}
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
