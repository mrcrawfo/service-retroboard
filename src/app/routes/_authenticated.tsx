import { createFileRoute, redirect } from '@tanstack/react-router';

import { GET_USER_DATA } from '../graph/auth/queries.js';

export const Route = createFileRoute('/_authenticated')({
    beforeLoad: async ({ context, location }) => {
        // no cached user info, redirect to login
        if (!context.user || !context.token) {
            throw redirect({
                to: '/login',
                search: {
                    redirect: location.href,
                },
            });
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
            console.log('response.data.me.message');
            console.log(response.data.me.message);
            // If no userData (token is expired) then override locally stored values and redirect to login page
            if (!response.data.me.success && response.data.me.message === 'Token expired') {
                context.setUser(null);
                context.setToken(null);

                throw redirect({
                    to: '/login',
                    search: {
                        redirect: location.href,
                    },
                });
            }
        }
    },
});
