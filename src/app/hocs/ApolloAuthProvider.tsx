import { useQuery } from '@apollo/client';
import { ReactNode } from 'react';

import { useAuthStoreToken, useAuthStoreActions } from '../store/AuthStore.js';
import { GET_USER_DATA } from '../graph/auth/queries.js';
import { AuthContext } from './AuthContext.js';

export interface ApolloAuthProviderProps {
    children: ReactNode;
}

const ApolloAuthProvider = ({ children }: ApolloAuthProviderProps) => {
    const token = useAuthStoreToken();
    const { setUser, setToken } = useAuthStoreActions();

    const { loading, data, error } = useQuery(GET_USER_DATA, {
        context: token
            ? {
                  headers: {
                      authorization: `Bearer ${token}`,
                  },
              }
            : {},
        onCompleted: (data) => {
            if (data?.me) {
                // If no userData (token is expired) then override locally stored values and redirect to login page
                // (do not redirect from public pages)
                if (
                    !data?.me?.success &&
                    data?.me?.message === 'Token expired' &&
                    !['/', '/login'].includes(window.location.pathname) // TODO: Refactor this
                ) {
                    setUser(null);
                    setToken(null);
                    window.location.assign('/login');
                }
            }
        },
    });

    const userData = data?.me || null;

    console.log('userData');
    console.log(userData);

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

export default ApolloAuthProvider;
