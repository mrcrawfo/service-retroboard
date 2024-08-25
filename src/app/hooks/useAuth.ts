// import { useEffect } from 'react';
import { create } from 'zustand';

import { User as UserType } from '../../entities/User.js';
import { LOGGED_IN_USER, USER_AUTH } from '../helpers/constants.js';

export const useAuth = () => {
    interface AuthStore {
        user: UserType | null;
        setUser: (inputUser: UserType) => void;
        token: string | null;
        setToken: (inputToken: string) => void;
    }

    const useAuthStore = create<AuthStore>((set) => ({
        user: JSON.parse(localStorage.getItem(LOGGED_IN_USER)),
        setUser: (inputUser: UserType) => {
            set((_state: AuthStore) => ({ user: inputUser }));
            localStorage.setItem(LOGGED_IN_USER, JSON.stringify(inputUser));
        },
        token: localStorage.getItem(USER_AUTH),
        setToken: (inputToken: string) => {
            set((_state: AuthStore) => ({ token: inputToken }));
            localStorage.setItem(USER_AUTH, inputToken);
        },
    }));

    const user = useAuthStore((state: AuthStore) => state.user);
    const setUser = useAuthStore((state: AuthStore) => state.setUser);
    const token = useAuthStore((state: AuthStore) => state.token);
    const setToken = useAuthStore((state: AuthStore) => state.setToken);

    console.log('useAuth :: user');
    console.log(user);
    console.log('useAuth :: token');
    console.log(token);

    const login = (loginUser: any, loginToken: string) => {
        console.log('login :: loginUser');
        console.log(loginUser);
        console.log(token);

        setUser(loginUser);
        localStorage.setItem(LOGGED_IN_USER, JSON.stringify(loginUser));
        setToken(loginToken);
        localStorage.setItem(USER_AUTH, loginToken);
    };

    const logout = () => {
        setUser(null);
        localStorage.setItem(LOGGED_IN_USER, null);
        setToken(null);
        localStorage.setItem(USER_AUTH, null);
    };

    return { user, login, logout, setUser, token, setToken };
};
