import { create } from "zustand";
import { IUser } from "@/src/services";

interface UserState {
  user: IUser | null;
  setUser: (userData: IUser | null) => void;
};

export const useUser = create<UserState>((set) => ({
  user: null,
  setUser: (user) => set({ user }),
}));