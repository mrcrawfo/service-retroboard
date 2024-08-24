import { createContext } from 'react';

import { User as UserType } from '../../entities/User.js';

interface UserContext {
    user: UserType | null;
    setUser: (user: UserType | null) => void;
}

export const UserContext = createContext<UserContext>({
    user: null,
    setUser: () => {
        /* do nothing */
    },
});
