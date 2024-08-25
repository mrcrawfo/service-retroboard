import { useQuery } from '@apollo/client';
import { ReactNode } from 'react';

import { GET_USER_DATA } from '../graph/auth/queries.js';
import { AuthContext } from './AuthContext.js';

export interface ApolloAuthProviderProps {
    children: ReactNode;
}

const ApolloAuthProvider = ({ children }: ApolloAuthProviderProps) => {
    const { loading, data, error } = useQuery(GET_USER_DATA);
    const userData = data?.userData || null;

    console.log('userData');
    console.log(userData);

    // TODO: If no userData (token is expired) then override locally stored values and redirect to login page (?)

    return (
        <AuthContext.Provider
            value={{
                user: userData,
                loading,
                error: error || null,
            }}
        >
            {children}
        </AuthContext.Provider>
    );
};

ApolloAuthProvider.propTypes = {};

export default ApolloAuthProvider;
