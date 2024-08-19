import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';

import { IProps } from '../../types/interfaces';
// import Env from '../../helpers/Env';

export const ApolloWrapper = ({ children }: IProps) => {
    const token =
        localStorage.getItem('token') ||
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VySWQiOjEsImlhdCI6MTcyMjE1MTUyNX0.oi3KYbTxDzj1M78AvQoquAYO1LFsaIq4_CJNxHnXcQc';
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
