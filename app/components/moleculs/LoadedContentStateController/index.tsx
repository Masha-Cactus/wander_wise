import React, { ReactNode } from "react";

import { EmptyStateText, ErrorAlert, Loader } from "@repo/ui/components/atoms";

interface LoadedContentStateControllerProps {
  isEmpty?: boolean;
  emptyFallbackComponent?: JSX.Element;
  emptyText?: string;
  isError: boolean;
  errorText: string;
  errorAlertFallbackComponent?: JSX.Element;
  isLoading?: boolean;
  loadingFallbackComponent?: JSX.Element;
  isHidden?: boolean;
  children: ReactNode;
  fallbackHeight: number | string;
}

const LoadedContentStateController: React.FC<
  LoadedContentStateControllerProps
> = ({
  fallbackHeight,
  isEmpty,
  emptyText,
  emptyFallbackComponent = (
    <EmptyStateText height={fallbackHeight} text={emptyText || ""} />
  ),
  isError,
  errorText,
  errorAlertFallbackComponent = (
    <ErrorAlert height={fallbackHeight} errorDescription={errorText || ""} />
  ),
  isLoading,
  loadingFallbackComponent = <Loader containerHeight={fallbackHeight} />,
  isHidden,
  children,
}) => {
  if (isEmpty) {
    return <>{emptyFallbackComponent}</>;
  }

  if (isError) {
    return <>{errorAlertFallbackComponent}</>;
  }

  if (isLoading) {
    return <>{loadingFallbackComponent}</>;
  }

  if (isHidden) {
    return;
  }

  return children;
};

export default LoadedContentStateController;
