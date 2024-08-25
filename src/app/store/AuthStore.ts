import { create } from 'zustand';

import { User as UserType } from '../../entities/User.js';
import { LOGGED_IN_USER, USER_AUTH } from '../helpers/constants.js';

type AuthStore = {
    user: UserType | null;
    setUser: (inputUser: UserType) => void;
    token: string | null;
    setToken: (inputToken: string) => void;
};

export const useAuthStore = create<AuthStore>((set) => ({
    user: JSON.parse(localStorage.getItem(LOGGED_IN_USER)),
    setUser: (inputUser: UserType) => {
        set({ user: inputUser });
        localStorage.setItem(LOGGED_IN_USER, JSON.stringify(inputUser));
    },
    token: localStorage.getItem(USER_AUTH),
    setToken: (inputToken: string) => {
        set({ token: inputToken });
        localStorage.setItem(USER_AUTH, inputToken);
    },
}));
