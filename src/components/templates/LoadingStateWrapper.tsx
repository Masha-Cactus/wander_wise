import React, { ReactNode, memo } from "react";
import { Loader } from "@/src/components/atoms";

interface LoadingStateWrapperProps {
  isEmpty?: boolean;
  emptyFallbackComponent?: JSX.Element;
  isLoading?: boolean;
  loadingFallbackComponent?: JSX.Element;
  children: ReactNode;
}

const LoadingStateWrapper: React.FC<LoadingStateWrapperProps> = ({
  isEmpty,
  emptyFallbackComponent,
  isLoading,
  loadingFallbackComponent = <Loader />,
  children,
}) => {
  if (isEmpty && emptyFallbackComponent) {
    return emptyFallbackComponent;
  }

  if (isLoading) {
    return loadingFallbackComponent;
  }

  return <>{children}</>;
};

export default memo(LoadingStateWrapper);
