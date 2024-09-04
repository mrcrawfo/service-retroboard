import { createLazyFileRoute } from '@tanstack/react-router';

import RegisterPage from '../components/pages/RegisterPage.jsx';

export const Route = createLazyFileRoute('/register')({
    component: Register,
});

function Register() {
    return <RegisterPage />;
}
