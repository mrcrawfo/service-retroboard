import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './app/App';

import { ApolloWrapper } from './app/components/atoms/ApolloWrapper';
import ApolloAuthProvider from './app/hocs/ApolloAuthProvider';

ReactDOM.createRoot(document.getElementById('root')!).render(
    <React.StrictMode>
        <ApolloWrapper>
            <ApolloAuthProvider>
                <App />
            </ApolloAuthProvider>
        </ApolloWrapper>
    </React.StrictMode>,
);
