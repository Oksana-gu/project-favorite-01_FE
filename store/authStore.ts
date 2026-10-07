import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { User } from "@/types/auth";

const normalizeUser = (user: User | null): User | null => {
  if (!user) return null;

  return {
    ...user,
    id: user.id ?? user._id,
    _id: user._id ?? user.id,
  };
};

interface AuthState {
  user: User | null;
  isLoggedIn: boolean;
  setUser: (user: User | null) => void;
  clearAuth: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isLoggedIn: false,
      setUser: (user) =>
        set({ user: normalizeUser(user), isLoggedIn: Boolean(user) }),
      clearAuth: () => set({ user: null, isLoggedIn: false }),
    }),
    {
      name: "auth-storage",
    },
  ),
);
