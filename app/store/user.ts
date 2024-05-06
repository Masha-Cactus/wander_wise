import { create } from "zustand";
import { IUser } from "@/app/services";

interface UserState {
  user: IUser | null;
  setUser: (userData: IUser) => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
};

export const useUser = create<UserState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  isLoading: true,
  setIsLoading: (loading) => set({ isLoading: loading }),
}));