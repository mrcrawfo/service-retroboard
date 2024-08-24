import { useContext } from 'react';
import { UserContext } from '../hocs/UserContext.js';
import { useLocalStorage } from './useLocalStorage.js';
import { User as UserType } from '../../entities/User.js';

export const useUser = () => {
    const { user, setUser } = useContext(UserContext);
    const { setItem } = useLocalStorage();

    const addUser = (user: UserType) => {
        setUser(user);
        setItem('user', JSON.stringify(user));
    };

    const removeUser = () => {
        setUser(null);
        setItem('user', '');
    };

    return { user, addUser, removeUser, setUser };
};
