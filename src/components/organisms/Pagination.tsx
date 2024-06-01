'use client';

import classNames from "classnames";
import { Dispatch, SetStateAction, useState, memo, useEffect } from "react";
import { Icons, TextSmall } from "@/src/components/atoms";

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
    <div className="h-8 flex gap-2 items-center">
      <button
        className="text-black disabled:text-gray70 h-full w-8 
          flex items-center justify-center"
        onClick={() => setPage(Math.max(page - 1, 0))}
        disabled={page === 0}
      >
        <Icons.left className="w-6 h-6"/>
      </button>

      {pagesList[0] !== 0 && (
        <button
          className="text-black h-8 w-8"
        >
          <TextSmall 
            text="..." 
            font="semibold" 
          />
        </button>
      )}

      {pagesList.map(pageNumber => (
        <button
          key={pageNumber}
          className={classNames("h-8 w-8", {
            "rounded-full bg-black text-white": page === pageNumber,
          })}
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
        <button
          className="text-black h-full w-8"
        >
          <TextSmall 
            text="..." 
            font="semibold" 
          />
        </button>
      )} 

      <button
        className="text-black disabled:text-gray70 h-full w-8
          flex items-center justify-center"
        onClick={() => setPage(page + 1)}
        disabled={isLastPage}
      >
        <Icons.right className="w-6 h-6"/>
      </button>
    </div>
  );
};

export default memo(Pagination);