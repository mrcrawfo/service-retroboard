import { useEffect } from 'react';
import { useUser } from './useUser.js';
import { useLocalStorage } from './useLocalStorage.js';
import { User as UserType } from '../../entities/User.js';

export const useAuth = () => {
    // we can re export the user methods or object from this hook
    const { user, addUser, removeUser, setUser } = useUser();
    const { getItem } = useLocalStorage();

    useEffect(() => {
        const user = getItem('user');
        if (user) {
            addUser(JSON.parse(user));
        }
    }, [addUser, getItem]);

    const login = (user: UserType) => {
        addUser(user);
    };

    const logout = () => {
        removeUser();
    };

    return { user, login, logout, setUser };
};
