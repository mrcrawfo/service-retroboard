import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { RouterProvider, createRouter } from '@tanstack/react-router';

import { ApolloWrapper } from './app/components/atoms/ApolloWrapper';
import ApolloAuthProvider from './app/hocs/ApolloAuthProvider';

// Import the generated route tree
import { routeTree } from './app/routeTree.gen';

// Create a new router instance
const router = createRouter({ routeTree });

// Register the router instance for type safety
declare module '@tanstack/react-router' {
    interface Register {
        router: typeof router;
    }
}

ReactDOM.createRoot(document.getElementById('root')!).render(
    <StrictMode>
        <ApolloWrapper>
            <ApolloAuthProvider>
                <RouterProvider router={router} />
            </ApolloAuthProvider>
        </ApolloWrapper>
    </StrictMode>,
);
