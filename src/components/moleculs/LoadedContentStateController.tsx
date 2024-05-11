import React, { ReactNode, memo } from "react";

import { EmptyStateText, ErrorText, Loader } from "@/src/components/atoms";

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
}

const LoadedContentStateController: React.FC<
LoadedContentStateControllerProps
> = ({
  isEmpty,
  emptyText,
  emptyFallbackComponent = (
    <EmptyStateText text={emptyText || ""} />
  ),
  isError,
  errorText,
  errorAlertFallbackComponent = (
    <ErrorText errorText={errorText || ""} />
  ),
  isLoading,
  loadingFallbackComponent = <Loader />,
  isHidden,
  children,
}) => {
  if (isEmpty) {
    return emptyFallbackComponent;
  }

  if (isError) {
    return errorAlertFallbackComponent;
  }

  if (isLoading) {
    return loadingFallbackComponent;
  }

  if (isHidden) {
    return null;
  }

  return children;
};

export default memo(LoadedContentStateController);
