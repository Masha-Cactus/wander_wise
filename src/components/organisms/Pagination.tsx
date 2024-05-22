'use client';

import classNames from "classnames";
import { Dispatch, SetStateAction, useState, memo, useEffect } from "react";
import { Icons, TextSmall } from "@/src/components/atoms";

type Props = {
  page: number,
  setPage: Dispatch<SetStateAction<number>>,
  isPlaceholderData: boolean,
  isLastPage: boolean,
  total?: number,
};

const Pagination: React.FC<Props> = ({
  page, setPage, isPlaceholderData, isLastPage, total
}) => {
  const [pagesList, setPagesList] = useState([1, 2, 3, 4, 5]);

  useEffect(() => {
    if (page <= 2) {
      setPagesList([1, 2, 3, 4, 5]);
    } else if (page > 2) {
      if (!total || (total && page + 3 <= total)) {
        setPagesList([
          page - 1,
          page,
          page + 1,
          page + 2,
          page + 3,
        ]);
      }
    }
  }, [page, total]);

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

      {pagesList[0] !== 1 && (
        <button
          className="text-black h-full w-8"
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
          className={classNames("h-full w-8", {
            "rounded-full bg-black": page + 1 === pageNumber,
          })}
          onClick={() => setPage(pageNumber - 1)}
        >
          <TextSmall 
            text={pageNumber.toString()} 
            font="semibold"
            classes={page + 1 === pageNumber ? "text-white" : ""}
          />
        </button> 
      ))}

      {((total && !pagesList.includes(total)) || !total) && (
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
        disabled={isPlaceholderData || isLastPage}
      >
        <Icons.right className="w-6 h-6"/>
      </button>
    </div>
  );
};

export default memo(Pagination);