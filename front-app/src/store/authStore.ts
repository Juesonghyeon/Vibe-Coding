import { create } from "zustand";
import { persist } from "zustand/middleware";

interface User {
  id: string;
  name: string;
}

interface AuthState {
  user: User | null;
  /* 로그인 — 사용자 정보 저장 */
  setUser: (user: User) => void;
  /* 로그아웃 — 사용자 정보 삭제 */
  clearUser: () => void;
  /* 로그인 여부 조회 */
  isLoggedIn: () => boolean;
}

const useAuthStore = create<AuthState>()(
  persist(
    (set, get) => ({
      user: null,
      setUser: (user) => set({ user }),
      clearUser: () => set({ user: null }),
      isLoggedIn: () => get().user !== null,
    }),
    {
      name: "auth-storage", // localStorage 키 이름
    }
  )
);

export default useAuthStore;
