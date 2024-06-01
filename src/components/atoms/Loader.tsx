/* eslint-disable max-len */
import React, { memo } from "react";

export interface LoaderProps {
  classes?: string;
}

const Loader: React.FC<LoaderProps> = ({ classes }) => {
  return (
    <div role="status" className={`m-auto ${classes ? classes : ''}`}>
      <div className="w-40 h-40 border-[16px] border-gray50 rounded-full 
      border-t-[16px] border-t-gray80 animate-spin"/>
      <span className="sr-only">Loading...</span>
    </div>
  );
};

export default memo(Loader);
