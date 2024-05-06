import { AxiosError } from "axios";
import {
  QueryFunctionContext,
  QueryKey,
  useQuery,
} from "@tanstack/react-query";

import { IUser, userProfileService } from "@/app/services";

export const useGetCurrentUser = () => {
  const {
    isLoading,
    data: currentUser,
    isError,
    error,
    isSuccess,
  } = useQuery<IUser, AxiosError>({
    queryKey: ["currentUser"],
    queryFn: async (context: QueryFunctionContext<QueryKey>) => {
      const id = context.queryKey[1] as number;

      return userProfileService.getCurrentUser(id);
    },
  });

  return {
    isLoading,
    currentUser,
    isError,
    error,
    isSuccess,
  };
};
