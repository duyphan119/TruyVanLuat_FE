import Col from "@/types/dataTable/Col";
import Link from "next/link";
import { IoAdd } from "react-icons/io5";
import Loading from "./Loading";
import Pagination from "./Pagination";

type Props = {
  cols: Col<any>[];
  rows: any[];
  hasColIndex?: boolean;
  newDataLink?: string;
  pagination?: {
    count: number;
    current: number;
    pageSize: number;
    onPageChange: (page: number) => void;
  };
  newDataButton?: {
    link: string;
    text?: string;
    className?: string;
    title?: string;
  };
  className?: string;
  style?: React.CSSProperties;
  loading?: boolean;
  onSearch?: (keyword: string) => void;
};

const DataTable = ({
  cols,
  rows,
  hasColIndex,
  pagination,
  newDataButton,
  className,
  style,
  loading,
  onSearch,
}: Props) => {
  return (
    <div
      className={`flex flex-col ${className || ""}`}
      style={{ height: pagination ? `calc(100% - 48px)` : "100%", ...style }}
    >
      {newDataButton || onSearch ? (
        <div className="flex items-center justify-between mb-2">
          <div className="left flex items-center gap-2">
            {newDataButton ? (
              <Link
                href={newDataButton.link}
                className={`flex items-center gap-2 border border-[var(--mainColor)] px-2 py-1 rounded-md bg-[var(--mainColor)] text-white hover:opacity-80 ${
                  newDataButton.className || ""
                }`}
                title={newDataButton.title || "Thêm mới"}
              >
                <IoAdd />
                {newDataButton.text || "Thêm mới"}
              </Link>
            ) : null}
          </div>
          <div className="right flex items-center justify-end">
            {onSearch ? (
              <form className="flex items-center gap-2"></form>
            ) : null}
          </div>
        </div>
      ) : null}
      <div className="flex-1 overflow-y-auto border border-neutral-300">
        <table className=" text-sm">
          <thead>
            <tr className="bg-neutral-300">
              {hasColIndex ? <th className="p-2">#</th> : null}
              {cols.map((col) => {
                return (
                  <th key={col.key} className={`p-2 ${col.className || ""}`}>
                    {col.label}
                  </th>
                );
              })}
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={cols.length + (hasColIndex ? 1 : 0)}>
                  <Loading />
                </td>
              </tr>
            ) : rows.length > 0 ? (
              rows.map((row, indexRow) => {
                return (
                  <tr key={row.id} className="border-t border-t-neutral-300">
                    {hasColIndex ? (
                      <td className="p-2 text-center">{indexRow + 1}</td>
                    ) : null}
                    {cols.map((col) => {
                      return (
                        <td key={col.key} className="p-2">
                          {col.render ? col.render(row) : row[col.key]}
                        </td>
                      );
                    })}
                  </tr>
                );
              })
            ) : (
              <tr>
                <td
                  className="p-2"
                  colSpan={cols.length + (hasColIndex ? 1 : 0)}
                >
                  Chưa có dữ liệu
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      {rows.length > 0 && pagination ? (
        <div className="mt-4">
          <Pagination
            current={pagination.current}
            totalPages={Math.ceil(pagination.count / pagination.pageSize)}
            onPageChange={pagination.onPageChange}
            listDotsClassName="justify-end"
          />
        </div>
      ) : null}
    </div>
  );
};

export default DataTable;
