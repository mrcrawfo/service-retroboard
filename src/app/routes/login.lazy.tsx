import { createLazyFileRoute } from '@tanstack/react-router';

import LoginPage from '../components/pages/LoginPage.jsx';

export const Route = createLazyFileRoute('/login')({
    component: Login,
});

function Login() {
    return <LoginPage />;
}
