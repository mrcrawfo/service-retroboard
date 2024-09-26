import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createRouter } from '@tanstack/react-router';

import { ApolloWrapper } from './app/components/atoms/ApolloWrapper.js';
import ApolloAuthProvider from './app/hocs/ApolloAuthProvider.js';
import { useAuthStoreToken, useAuthStoreUser } from './app/store/AuthStore.js';

// Import the generated route tree
import { routeTree } from './app/routeTree.gen.js';

// Create a new router instance
const router = createRouter({ routeTree, context: { user: undefined!, token: undefined! } });

// Register the router instance for type safety
declare module '@tanstack/react-router' {
    interface Register {
        router: typeof router;
    }
}

function App() {
    const user = useAuthStoreUser();
    const token = useAuthStoreToken();

    return (
        <StrictMode>
            <ApolloWrapper>
                <ApolloAuthProvider>
                    <RouterProvider router={router} context={{ user, token }} />
                </ApolloAuthProvider>
            </ApolloWrapper>
        </StrictMode>
    );
}

ReactDOM.createRoot(document.getElementById('root')!).render(<App />);
