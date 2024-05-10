import React, { memo } from "react";

export interface LoaderProps {
}

const Loader: React.FC<LoaderProps> = ({
}) => {
  return (
    <div className="flex justify-center items-center">
Loading..
    </div>
  );
};

export default memo(Loader);
