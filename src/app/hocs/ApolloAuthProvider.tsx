import { useQuery } from '@apollo/client';
import { ReactNode } from 'react';

import { GET_USER_DATA } from '../graph/auth/queries.js';
import { AuthContext } from './AuthContext.js';
import { useAuthStoreToken } from '../store/AuthStore.js';

export interface ApolloAuthProviderProps {
    children: ReactNode;
}

const ApolloAuthProvider = ({ children }: ApolloAuthProviderProps) => {
    const token = useAuthStoreToken();

    const { loading, data, error } = useQuery(GET_USER_DATA, {
        context: token
            ? {
                  headers: {
                      authorization: `Bearer ${token}`,
                  },
              }
            : {},
        onError: (error) => {
            console.log('error');
            console.log(error);
        },
    });
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
