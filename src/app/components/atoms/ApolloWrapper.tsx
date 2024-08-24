import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';

import { IProps } from '../../types/interfaces.js';
import { USER_AUTH } from '../../helpers/constants.js';

export const ApolloWrapper = ({ children }: IProps) => {
    // const token = localStorage.getItem('userAuth') || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTcyMjE1MTUyNX0.oi3KYbTxDzj1M78AvQoquAYO1LFsaIq4_CJNxHnXcQc';
    const token = localStorage.getItem(USER_AUTH);
    console.log('token', token);

    const cache = new InMemoryCache();
    const client = new ApolloClient({
        // uri: Env('VITE_APP_API_URL'),
        uri: 'http://localhost:4000/graphql',
        headers: {
            authorization: token ? `Bearer ${token}` : '',
        },
        cache,
    });

    return <ApolloProvider client={client}>{children}</ApolloProvider>;
};
