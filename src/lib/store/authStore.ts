// Pivotal ERP — Zustand Auth Store
import { create } from "zustand";
import { persist } from "zustand/middleware";

export type UserRole = "admin" | "company_user";

export interface AuthUser {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  companyId?: string;
  companyCode?: string;
  companyName?: string;
  subdomain?: string;
  isFirstLogin?: boolean;
  hasCompletedTour?: boolean;
  avatar?: string;
}

interface AuthState {
  user: AuthUser | null;
  isAuthenticated: boolean;
  isAdminAuthenticated: boolean;
  adminUser: AuthUser | null;
  token: string | null;

  login: (user: AuthUser, token: string) => void;
  adminLogin: (user: AuthUser) => void;
  logout: () => void;
  adminLogout: () => void;
  setFirstLoginComplete: () => void;
  setTourComplete: () => void;
  updateUser: (updates: Partial<AuthUser>) => void;
}

export const useAuthStore = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      isAuthenticated: false,
      isAdminAuthenticated: false,
      adminUser: null,
      token: null,

      login: (user, token) =>
        set({ user, token, isAuthenticated: true }),

      adminLogin: (user) =>
        set({ adminUser: user, isAdminAuthenticated: true }),

      logout: () =>
        set({ user: null, token: null, isAuthenticated: false }),

      adminLogout: () =>
        set({ adminUser: null, isAdminAuthenticated: false }),

      setFirstLoginComplete: () =>
        set((s) => ({
          user: s.user ? { ...s.user, isFirstLogin: false } : null,
        })),

      setTourComplete: () =>
        set((s) => ({
          user: s.user ? { ...s.user, hasCompletedTour: true } : null,
        })),

      updateUser: (updates) =>
        set((s) => ({
          user: s.user ? { ...s.user, ...updates } : null,
        })),
    }),
    { name: "pivotal-auth" }
  )
);
