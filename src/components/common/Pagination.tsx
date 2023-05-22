import Link from "next/link";
import React from "react";

type Props = {
  totalPages: number;
  current: number;
  onPageChange: (page: number) => void;
  className?: string;
  listDotsClassName?: string;
};

const Pagination = ({ totalPages, current, onPageChange, className, listDotsClassName }: Props) => {
    const disabledPrevious = current === 1
    const disabledNext = current !== 1 && current === totalPages
    const hasTwoLast = current + 2 <= totalPages
    const hasTwoFirst = current - 2 >=1
    const hasNext = current + 1 <= totalPages
    const hasPrevious = current - 1 >=1
  return (
    <nav aria-label="Page navigation" className={className}>
      <ul className={`list-style-none flex ${listDotsClassName}`}>
        <li className={`relative block rounded bg-transparent px-3 py-1.5 text-sm transition-all duration-300 dark:text-neutral-400${disabledPrevious ? ' pointer-events-none text-neutral-500' : ' text-neutral-600 hover:bg-neutral-100 cursor-pointer'}`} onClick={() => onPageChange(current -1 )}>
          Trước
        </li>{!hasNext && hasPrevious && hasTwoFirst ? <li className="relative block rounded bg-transparent px-3 py-1.5 text-sm text-neutral-600 transition-all duration-300 hover:bg-neutral-100 dark:text-white dark:hover:bg-neutral-700 dark:hover:text-white cursor-pointer"  onClick={() => onPageChange(current - 2 )}>
          {current - 2}
        </li> : null}
         {hasPrevious ? <li className="relative block rounded bg-transparent px-3 py-1.5 text-sm text-neutral-600 transition-all duration-300 hover:bg-neutral-100 dark:text-white dark:hover:bg-neutral-700 dark:hover:text-white cursor-pointer"  onClick={() => onPageChange(current -1 )}>
          {current - 1}
        </li> : null}
        
        <li
          aria-current="page"
          className="relative block rounded bg-indigo-100 px-3 py-1.5 text-sm font-medium text-indigo-700 transition-all duration-300 cursor-pointer"
        >
          {current}
          <span className="absolute -m-px h-px w-px overflow-hidden whitespace-nowrap border-0 p-0 [clip:rect(0,0,0,0)]">
            (current)
          </span>
        </li>
        {hasNext ? <li className="relative block rounded bg-transparent px-3 py-1.5 text-sm text-neutral-600 transition-all duration-300 hover:bg-neutral-100 dark:text-white dark:hover:bg-neutral-700 dark:hover:text-white cursor-pointer"  onClick={() => onPageChange(current +1 )}>
          {current + 1}
        </li> : null}
        {!hasPrevious && hasNext && hasTwoLast ? <li className="relative block rounded bg-transparent px-3 py-1.5 text-sm text-neutral-600 transition-all duration-300 hover:bg-neutral-100 dark:text-white dark:hover:bg-neutral-700 dark:hover:text-white cursor-pointer" onClick={() => onPageChange(current +2 )}>
          {current + 2}
        </li> : null}
        <li className={`relative block rounded bg-transparent px-3 py-1.5 text-sm transition-all duration-300 dark:text-neutral-400${disabledNext ? ' pointer-events-none text-neutral-500' : ' text-neutral-600 hover:bg-neutral-100 cursor-pointer'}`}  onClick={() => onPageChange(current +1 )}>
          Sau
        </li>
      </ul>
    </nav>
  );
};

export default Pagination;
