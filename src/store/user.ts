import { create } from "zustand";
import { IUser } from "../types/User";

interface UserState {
  user: IUser | null;
  setUser: (userData: IUser | null) => void;
  unbanUser: () => void;
  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
};

export const useUser = create<UserState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
  unbanUser: () => set((state) => {
    return state.user
      ? { user: {...state.user, emailConfirmCode: '', banned: false} }
      : state;
  }),
  isLoading: true,
  setIsLoading: (loading) => set({ isLoading: loading }),
}));