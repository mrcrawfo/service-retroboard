import { create } from 'zustand';

import { User as UserType } from '../../entities/User.js';
import { LOGGED_IN_USER, USER_AUTH } from '../helpers/constants.js';

type AuthStore = {
    user: UserType | null;
    token: string | null;
    actions: {
        setUser: (inputUser: UserType) => void;
        setToken: (inputToken: string) => void;
    };
};

export const useAuthStore = create<AuthStore>((set) => ({
    user: JSON.parse(localStorage.getItem(LOGGED_IN_USER)),
    token: localStorage.getItem(USER_AUTH),
    actions: {
        setToken: (inputToken: string) => {
            set({ token: inputToken });
            localStorage.setItem(USER_AUTH, inputToken);
        },
        setUser: (inputUser: UserType) => {
            set({ user: inputUser });
            localStorage.setItem(LOGGED_IN_USER, JSON.stringify(inputUser));
        },
    },
}));

export const useAuthStoreUser = () => useAuthStore((state) => state.user);
export const useAuthStoreToken = () => useAuthStore((state) => state.token);
export const useAuthStoreActions = () => useAuthStore((state) => state.actions);
