import { ApolloError } from '@apollo/client';
import { createContext } from 'react';

import { User as UserType } from '../../entities/User.js';

export type AuthContextProps = {
    user: UserType | null;
    loading: boolean;
    error: ApolloError | null;
};

export const AuthContext = createContext<AuthContextProps>({
    user: null,
    loading: true,
    error: null,
});
