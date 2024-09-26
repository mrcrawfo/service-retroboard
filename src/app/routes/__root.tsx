import { createRootRouteWithContext, Link, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';

import { User as UserType } from '../../entities/User.js';
import LoginButton from '../components/atoms/LoginButton.jsx';
import { SITE_HEADER_HEIGHT } from '../helpers/constants.js';

type RouterContext = {
    user: UserType | null;
    token: string | null;
};

export const Route = createRootRouteWithContext<RouterContext>()({
    component: () => (
        <>
            <div className='p-2 flex gap-2' style={{ height: `${SITE_HEADER_HEIGHT}px` }}>
                <Link to='/' className='[&.active]:font-bold'>
                    Home
                </Link>{' '}
                <Link to='/boards' className='[&.active]:font-bold'>
                    Boards
                </Link>
                <Link to='/theme' className='[&.active]:font-bold'>
                    Theme
                </Link>
                <LoginButton />
            </div>
            <hr />
            <Outlet />
            <TanStackRouterDevtools />
        </>
    ),
});
