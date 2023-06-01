import Link from "next/link";
import React from "react";

type Props = {
  totalPages: number;
  current: number;
  onPageChange: (page: number) => void;
  className?: string;
  listDotsClassName?: string;
};

const Pagination = ({
  totalPages,
  current,
  onPageChange,
  className,
  listDotsClassName,
}: Props) => {
  const disabledPrevious = current === 1;
  const disabledNext = current !== 1 && current === totalPages;
  const hasTwoLast = current + 2 <= totalPages;
  const hasTwoFirst = current - 2 >= 1;
  const hasNext = current + 1 <= totalPages;
  const hasPrevious = current - 1 >= 1;
  return (
    <nav aria-label="Page navigation" className={className}>
      <ul className={`list-style-none flex gap-2 ${listDotsClassName}`}>
        <li
          className={`relative block rounded bg-transparent px-3 py-1.5 text-sm transition-all duration-300 dark:text-neutral-400 border border-[var(--mainColor)] ${
            disabledPrevious
              ? " pointer-events-none text-neutral-500"
              : " hover:bg-[var(--mainColor)] hover:text-white cursor-pointer"
          }`}
          title={disabledPrevious ? "" : "Trang trước đó"}
          onClick={() => onPageChange(current - 1)}
        >
          Trước
        </li>
        {!hasNext && hasPrevious && hasTwoFirst ? (
          <li
            className="relative block rounded bg-transparent px-3 py-1.5 text-sm text-neutral-600 transition-all duration-300 hover:bg-[var(--mainColor)] hover:text-white cursor-pointer border border-[var(--mainColor)]"
            onClick={() => onPageChange(current - 2)}
            title={`Đi tới trang ${current - 2}`}
          >
            {current - 2}
          </li>
        ) : null}
        {hasPrevious ? (
          <li
            className="relative block rounded bg-transparent px-3 py-1.5 text-sm text-neutral-600 transition-all duration-300 hover:bg-[var(--mainColor)] hover:text-white cursor-pointer border border-[var(--mainColor)]"
            onClick={() => onPageChange(current - 1)}
            title={`Đi tới trang ${current - 1}`}
          >
            {current - 1}
          </li>
        ) : null}

        <li
          aria-current="page"
          className="relative block rounded bg-[var(--mainColor)] px-3 py-1.5 text-sm font-medium text-white shadow-lg transition-all duration-300 cursor-pointer border border-[var(--mainColor)]"
        >
          {current}
          <span className="absolute -m-px h-px w-px overflow-hidden whitespace-nowrap border-0 p-0 [clip:rect(0,0,0,0)]">
            (current)
          </span>
        </li>
        {hasNext ? (
          <li
            className="relative block rounded bg-transparent px-3 py-1.5 text-sm text-neutral-600 transition-all duration-300 hover:bg-[var(--mainColor)] hover:text-white cursor-pointer border border-[var(--mainColor)]"
            onClick={() => onPageChange(current + 1)}
            title={`Đi tới trang ${current + 1}`}
          >
            {current + 1}
          </li>
        ) : null}
        {!hasPrevious && hasNext && hasTwoLast ? (
          <li
            className="relative block rounded bg-transparent px-3 py-1.5 text-sm transition-all duration-300 hover:bg-[var(--mainColor)] hover:text-white cursor-pointer border border-[var(--mainColor)]"
            onClick={() => onPageChange(current + 2)}
            title={`Đi tới trang ${current + 2}`}
          >
            {current + 2}
          </li>
        ) : null}
        <li
          className={`relative block rounded bg-transparent px-3 py-1.5 text-sm transition-all duration-300 dark:text-neutral-400 border border-[var(--mainColor)]${
            disabledNext
              ? " pointer-events-none text-neutral-500"
              : " hover:bg-[var(--mainColor)] hover:text-white cursor-pointer"
          }`}
          title={disabledNext ? "" : "Trang kế tiếp"}
          onClick={() => onPageChange(current + 1)}
        >
          Sau
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
