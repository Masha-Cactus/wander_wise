import { create } from "zustand";
import { UserType } from "../types/User";

interface UserState {
  user: UserType | null;
  setUser: (userData: UserType) => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
};

export const useUser = create<UserState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  isLoading: true,
  setIsLoading: (loading) => set({ isLoading: loading }),
}));