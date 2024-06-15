import React, { memo } from "react";
import { twMerge } from "tailwind-merge";

export interface LoaderProps {
  classes?: string;
}

const Loader: React.FC<LoaderProps> = ({ classes }) => {
  return (
    <div 
      role="status" 
      className={twMerge(
        `m-auto w-28 h-28 grid grid-cols-2 grid-rows-2 gap-3 
        animate-loader-spin`,
        classes,
      )}
    >
      <div className="rounded-full bg-gray-80"/>
      <div className="rounded-full bg-gray-80"/>
      <div className="rounded-full bg-gray-80"/>
      <div className="rounded-full bg-gray-80"/>
      <span className="sr-only">Loading...</span>
    </div>
  );
};

export default memo(Loader);
