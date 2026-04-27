import { create } from "zustand";
import { persist } from "zustand/middleware";

export interface User {
  _id: string;
  name?: string;
  email?: string;
  phone: string;
  avatar?: string;
  firstOrderDiscount?: boolean;
  isBlocked?: boolean;
  kycStatus?: "not_submitted" | "pending" | "approved" | "rejected";
  kycRejectionReason?: string;
  createdAt?: string;
  updatedAt?: string;
  status?: string;
  isFirstOrder?: boolean;
}

interface AuthState {
  user: User | null;
  accessToken: string | null;
  setUserData: (user: User, token: string) => void;
  logout: () => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      accessToken: null,
      setUserData: (user, token) => set({ user, accessToken: token }),
      logout: () => set({ user: null, accessToken: null }),
    }),
    {
      name: "affiliate-auth", // stored key in localStorage
    }
  )
);
