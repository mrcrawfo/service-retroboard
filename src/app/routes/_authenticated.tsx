import { createFileRoute, redirect } from '@tanstack/react-router';

import { GET_USER_DATA } from '../graph/auth/queries.js';

export const Route = createFileRoute('/_authenticated')({
    beforeLoad: async ({ context }) => {
        // no cached user info, redirect to login
        if (!context.user || !context.token) {
            throw redirect({ to: '/login' });
        }

        // confirm cached user info is valid
        const response = await context.client.query({
            query: GET_USER_DATA,
            fetchPolicy: 'network-only',
            context: {
                headers: {
                    authorization: `Bearer ${context.token}`,
                },
            },
        });

        if (response?.data?.me) {
            // If no userData (token is expired) then override locally stored values and redirect to login page
            if (!response.data.me.success && response.data.me.message === 'Token expired') {
                context.setUser(null);
                context.setToken(null);

                throw redirect({ to: '/login' });
            }
        }

        const userData = response?.data?.me?.user || null;

        if (!userData) {
            throw redirect({ to: '/login' });
        }
    },
});
