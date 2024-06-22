'use client';

import { Dispatch, SetStateAction, useState, memo, useEffect } from "react";
import { twMerge } from "tailwind-merge";
import { Icons, TextSmall } from "@/src/components/atoms";
import { IconButton } from "../molecules";

interface PaginationProps {
  page: number,
  setPage: Dispatch<SetStateAction<number>>,
  lastPage: number | undefined,
}

const Pagination: React.FC<PaginationProps> = ({
  page, setPage, lastPage
}) => {
  const [pagesList, setPagesList] = useState<number[]>([]);

  useEffect(() => {
    const maxPages = 5;
    const length = typeof lastPage === 'number' 
      ? Math.min(maxPages, lastPage + 1)
      : maxPages;

    const startPage = Math.max(page - length + 1, 0);

    const newPagesList = Array.from(
      { length }, 
      (_, index) => startPage + index);

    setPagesList(newPagesList);
  }, [page, lastPage]);

  return (
    <div className="flex h-8 items-center gap-2">
      <IconButton 
        icon={<Icons.left className="h-6 w-6"/>} 
        classes="p-0 disabled:text-gray-70" 
        onClick={() => setPage(Math.max(page - 1, 0))}
        disabled={page === 0}
      />

      {pagesList.map(pageNumber => (
        <button
          key={pageNumber}
          className={twMerge(
            'h-8 w-8', 
            page === pageNumber && 'rounded-full bg-black text-white',
          )}
          onClick={() => setPage(pageNumber)}
          disabled={page === pageNumber}
        >
          <TextSmall 
            text={(pageNumber + 1).toString()} 
            font="semibold"
            classes="text-inherit"
          />
        </button> 
      ))}

      <IconButton 
        icon={<Icons.right className="h-6 w-6"/>} 
        classes="p-0 disabled:text-gray-70" 
        onClick={() => setPage(page + 1)}
        disabled={page === lastPage}
      />
    </div>
  );
};

export default memo(Pagination);