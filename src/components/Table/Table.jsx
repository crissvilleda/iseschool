import React from "react";
import { useTable, useExpanded } from "react-table";
import LoadMask from "../LoadMask";
import "./table.css";

export default function Table({
  columns = [],
  data = [],
  loading = false,
  renderRowSubComponent,
}) {
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    headers,
    rows,
    state: { expanded },
    prepareRow,
    visibleColumns,
  } = useTable({ columns, data }, useExpanded);

  return (
    <LoadMask loading={loading}>
      <div className="table-scroll">
        <table className="table is-narrow is-fullwidth" {...getTableProps()}>
          <thead>
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
          <tbody {...getTableBodyProps()}>
            {rows.map((row, i) => {
              prepareRow(row);
              const rowProps = row.getRowProps();
              return (
                <React.Fragment key={rowProps.key}>
                  <tr {...rowProps}>
                    {row.cells.map((cell) => {
                      return (
                        <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                      );
                    })}
                  </tr>
                  {row.isExpanded ? (
                    <tr>
                      <td colSpan={visibleColumns.length}>
                        {renderRowSubComponent({ row })}
                      </td>
                    </tr>
                  ) : null}
                </React.Fragment>
              );
            })}
          </tbody>
        </table>
      </div>
    </LoadMask>
  );
}
