import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';

type AuthStore = {
    user: any | null;
    token: string | null;
    isAuthenticated: boolean;
    login: (userData: any, tokenValue: string) => void;
    logout: () => void;
    setUser: (userData: any) => void;
}

const useAuthStore = create<AuthStore>()(
    persist(
        (set) => ({
            user: null,
            token: null,
            isAuthenticated: false,

            login: (userData, tokenValue) => set(() => ({
                user: userData,
                token: tokenValue,
                isAuthenticated: true,
            })),

            logout: () => set(() => ({
                user: null,
                token: null,
                isAuthenticated: false,
            })),

            setUser: (userData) => set(() => ({
                user: userData,
                isAuthenticated: !!userData,
            })),
        }),
        {
            name: 'auth-storage',
            storage: createJSONStorage(() => localStorage),
            partialize: (state) => ({
                user: state.user,
                token: state.token,
                isAuthenticated: state.isAuthenticated,
            }),
        }
    )
);

export default useAuthStore;