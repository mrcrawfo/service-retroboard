import { ReactNode } from 'react';
import { useQuery } from '@apollo/client';

import { AuthContext } from './AuthContext';
import { GET_USER_DATA } from '../graph/auth/queries';

export interface ApolloAuthProviderProps {
    children: ReactNode;
};

const ApolloAuthProvider = ({ children }: ApolloAuthProviderProps) => {
    const { loading, data, error } = useQuery(GET_USER_DATA);
    const userData = data?.userData || null;

    return (
        <AuthContext.Provider value={{
            user: userData,
            loading,
            error: error || null,
        }}>
            {children}
        </AuthContext.Provider>
    );
}

ApolloAuthProvider.propTypes = {
};

export default ApolloAuthProvider;
