import { createFileRoute, redirect } from '@tanstack/react-router';

export const Route = createFileRoute('/_authenticated')({
    beforeLoad: ({ context }) => {
        console.log('context');
        console.log(context);
        console.log('context.user');
        console.log(context.user);
        console.log('context.token');
        console.log(context.token);
        if (!context.user || !context.token) {
            throw redirect({ to: '/login' });
        }
    },
});
