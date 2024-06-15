import React, { ReactNode, memo } from "react";
import { ErrorText, Loader } from "@/src/components/atoms";

interface LoadedContentStateControllerProps {
  isEmpty?: boolean;
  emptyFallbackComponent?: JSX.Element;
  emptyText?: string;
  isError?: boolean;
  errorText?: string;
  errorAlertFallbackComponent?: JSX.Element;
  isLoading?: boolean;
  loadingFallbackComponent?: JSX.Element;
  children: ReactNode;
}

const LoadedContentStateController: React.FC<
LoadedContentStateControllerProps
> = ({
  isEmpty,
  emptyText,
  emptyFallbackComponent = (
    <ErrorText errorText={emptyText || ""} />
  ),
  isError,
  errorText,
  errorAlertFallbackComponent = (
    <ErrorText errorText={errorText || ""} />
  ),
  isLoading,
  loadingFallbackComponent = <Loader />,
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

  return <>{children}</>;
};

export default memo(LoadedContentStateController);
