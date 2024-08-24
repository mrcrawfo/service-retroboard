import { useQuery } from '@apollo/client';
import { ReactNode } from 'react';

import { GET_USER_DATA } from '../graph/auth/queries.js';
import { UserContext } from './UserContext.js';
import { useAuth } from '../hooks/useAuth.js';

export interface ApolloAuthProviderProps {
    children: ReactNode;
}

const ApolloAuthProvider = ({ children }: ApolloAuthProviderProps) => {
    // const { _loading, data, _error } = useQuery(GET_USER_DATA);
    const { data } = useQuery(GET_USER_DATA);
    const userData = data?.userData || null;

    console.log('userData');
    console.log(userData);

    // const { user, _login, _logout, setUser } = useAuth();
    const { user, setUser } = useAuth();

    console.log('user');
    console.log(user);

    return <UserContext.Provider value={{ user, setUser }}>{children}</UserContext.Provider>;
};

ApolloAuthProvider.propTypes = {};

export default ApolloAuthProvider;
