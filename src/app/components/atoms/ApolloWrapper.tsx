import { ApolloClient, ApolloProvider, InMemoryCache } from '@apollo/client';

import { IProps } from '../../types/interfaces.js';

export const ApolloWrapper = ({ children }: IProps) => {
    const cache = new InMemoryCache();
    const client = new ApolloClient({
        uri: import.meta?.env ? import.meta.env.VITE_APP_API_URL : 'http://localhost:4000/graphql',
        cache,
    });

    return <ApolloProvider client={client}>{children}</ApolloProvider>;
};
