import { create } from "zustand";
import { persist } from "zustand/middleware";
import Cookies from "js-cookie";

interface AuthState {
  user: { username: string; token: string } | null;
  login: (username: string, password: string) => Promise<void>;
  logout: () => void;
}

export const useAuth = create<AuthState>()(
  persist(
    (set) => ({
      user: null,
      login: async (username: string, password: string) => {
        if (username === "user" && password === "user123") {
          const token = btoa(`${username}:${new Date().getTime()}`);
          Cookies.set("auth-token", token);
          set({ user: { username, token } });
        } else {
          throw new Error("Invalid credentials");
        }
      },
      logout: () => {
        Cookies.remove("auth-token");
        set({ user: null });
      },
    }),
    {
      name: "auth-storage",
    }
  )
);
