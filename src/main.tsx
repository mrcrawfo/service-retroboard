import { StrictMode } from 'react';
import ReactDOM from 'react-dom/client';
import { useApolloClient } from '@apollo/client';
import { RouterProvider, createRouter } from '@tanstack/react-router';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import { ApolloWrapper } from './app/components/atoms/ApolloWrapper.js';
import { useAuthStoreActions, useAuthStoreToken, useAuthStoreUser } from './app/store/AuthStore.js';

// Import the generated route tree
import { routeTree } from './app/routeTree.gen.js';

// Create a new router instance
const router = createRouter({
    routeTree,
    context: { user: undefined!, token: undefined!, setUser: undefined!, setToken: undefined!, client: undefined! },
});

// Register the router instance for type safety
declare module '@tanstack/react-router' {
    interface Register {
        router: typeof router;
    }
}

function App() {
    return (
        <StrictMode>
            <ApolloWrapper>
                <AppContextWrapper />
                <ToastContainer position='bottom-left' theme='light' />
            </ApolloWrapper>
        </StrictMode>
    );
}

function AppContextWrapper() {
    const user = useAuthStoreUser();
    const token = useAuthStoreToken();
    const client = useApolloClient();
    const { setUser, setToken } = useAuthStoreActions();

    return <RouterProvider router={router} context={{ user, token, setUser, setToken, client }} />;
}

ReactDOM.createRoot(document.getElementById('root')!).render(<App />);
