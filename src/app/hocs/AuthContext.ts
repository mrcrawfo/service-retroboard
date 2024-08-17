import { ApolloError } from '@apollo/client';
import { createContext } from 'react';

import { NexusGenObjects } from '../../../nexus-typegen';

export type AuthContextProps = {
    user: NexusGenObjects['User'] | null;
    loading: boolean;
    error: ApolloError | null;
};

export const AuthContext = createContext<AuthContextProps>({
    user: { email: 'max@user.com', id: 1, username: 'max' },
    loading: true,
    error: null,
});
