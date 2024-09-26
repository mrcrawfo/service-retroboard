import { createFileRoute, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/_authenticated')({
    beforeLoad: ({ context }) => {
        if (!context.user || !context.token) {
            throw redirect({ to: '/login' });
        }
    },
});
