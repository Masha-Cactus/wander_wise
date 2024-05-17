'use client';

import classNames from "classnames";
import { Dispatch, SetStateAction, useState } from "react";
import { Icons, TextSmall } from "@/src/components/atoms";

type Props = {
  page: number,
  setPage: Dispatch<SetStateAction<number>>,
  isPlaceholderData: boolean,
};

const Pagination: React.FC<Props> = ({
  page, setPage, isPlaceholderData,
}) => {
  const [pagesList, setPagesList] = useState([1, 2, 3, 4, 5]);

  const handleNext = (nextPage: number) => {
    setPage(nextPage);
    if (nextPage >= 4) {
      setPagesList(curr => 
        [ ...curr.slice(1), nextPage + 2]);
    }
  };

  const handlePrev = (prevPage: number) => {
    setPage(prevPage);
    if (prevPage >= 3) {
      setPagesList(curr => 
        [curr[0] - 1, ...curr.slice(0, -1)]);
    }
  };

  const handlePageChange = (newPage: number) => {
    if (newPage > page) {
      handleNext(newPage);
    } else if (newPage < page) {
      handlePrev(newPage);
    }
  };

  return (
    <div className="h-8 flex gap-2 items-center">
      <button
        className="text-black disabled:text-gray70 h-full w-8 
          flex items-center justify-center"
        onClick={() => handlePrev(Math.max(page - 1, 0))}
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
          onClick={() => handlePageChange(pageNumber)}
        >
          <TextSmall 
            text={pageNumber.toString()} 
            font="semibold"
            classes={page + 1 === pageNumber ? "text-white" : ""}
          />
        </button> 
      ))}
      <button
        className="text-black h-full w-8"
      >
        <TextSmall 
          text="..." 
          font="semibold" 
        />
      </button> 
      <button
        className="text-black disabled:text-gray70 h-full w-8
          flex items-center justify-center"
        onClick={() => {
          if (!isPlaceholderData) {
            handleNext(page + 1);
          }
        }}
        disabled={isPlaceholderData}
      >
        <Icons.right className="w-6 h-6"/>
      </button>
    </div>
  );
};

export default Pagination;