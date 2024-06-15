'use client';

import { Dispatch, SetStateAction, useState, memo, useEffect } from "react";
import { twMerge } from "tailwind-merge";
import { Icons, TextSmall } from "@/src/components/atoms";
import { IconButton } from "../molecules";

type Props = {
  page: number,
  setPage: Dispatch<SetStateAction<number>>,
  isLastPage: boolean,
  total?: number,
};

const Pagination: React.FC<Props> = ({
  page, setPage, isLastPage, total
}) => {
  const [pagesList, setPagesList] = useState<number[]>([]);

  useEffect(() => {
    const maxPages = 5;
    let length = maxPages;

    if (total) {
      length = Math.min(maxPages, total);
    } else if (isLastPage) {
      length = Math.min(maxPages, page + 1);
    }

    const startPage = Math.max(page - length + 1, 0);

    const newPagesList = Array.from(
      { length }, 
      (_, index) => startPage + index);

    setPagesList(newPagesList);
  }, [page, isLastPage, total]);

  return (
    <div className="flex h-8 items-center gap-2">
      <IconButton 
        icon={<Icons.left className="h-6 w-6"/>} 
        classes="p-0 disabled:text-gray-70" 
        onClick={() => setPage(Math.max(page - 1, 0))}
        disabled={page === 0}
      />

      {pagesList[0] !== 0 && (
        <button className="h-8 w-8 text-black">
          <TextSmall text="..." font="semibold" />
        </button>
      )}

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

      {!isLastPage && (
        <button className="h-full w-8 text-black">
          <TextSmall text="..." font="semibold" />
        </button>
      )} 

      <IconButton 
        icon={<Icons.right className="h-6 w-6"/>} 
        classes="p-0 disabled:text-gray-70" 
        onClick={() => setPage(page + 1)}
        disabled={isLastPage}
      />
    </div>
  );
};

export default memo(Pagination);