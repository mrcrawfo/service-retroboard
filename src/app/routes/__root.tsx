import { createRootRouteWithContext, Link, Outlet, useRouterState } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';
import { Box, Button } from '@mui/material';

import { User as UserType } from '../../entities/User.js';
import LoginButton from '../components/atoms/LoginButton.jsx';
import { SITE_HEADER_HEIGHT } from '../helpers/constants.js';

type RouterContext = {
    user: UserType | null;
    token: string | null;
    setUser: (inputUser: UserType) => void;
    setToken: (inputToken: string) => void;
    client: any;
};

export const Route = createRootRouteWithContext<RouterContext>()({
    component: () => {
        const styles = {
            button: {
                marginTop: '-8px',
            },
        };

        const matches = useRouterState({ select: (s) => s.matches });
        const context = matches[0]?.context;

        return (
            <>
                <Box display='flex' gap={2} sx={{ height: `${SITE_HEADER_HEIGHT}px` }}>
                    <Link to='/' className='[&.active]:font-bold'>
                        <Button variant='text' sx={styles.button}>
                            Home
                        </Button>
                    </Link>
                    {context?.user && (
                        <Link to='/boards' className='[&.active]:font-bold'>
                            <Button variant='text' sx={styles.button}>
                                Boards
                            </Button>
                        </Link>
                    )}
                    <LoginButton />
                </Box>
                <hr />
                <Outlet />
                <TanStackRouterDevtools />
            </>
        );
    },
});
