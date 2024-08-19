import { createRootRoute, Link, Outlet } from '@tanstack/react-router';
import { TanStackRouterDevtools } from '@tanstack/router-devtools';

export const Route = createRootRoute({
    component: () => (
        <>
            <div className='p-2 flex gap-2'>
                <Link to='/' className='[&.active]:font-bold'>
                    Home
                </Link>{' '}
                <Link to='/boards' className='[&.active]:font-bold'>
                    Boards
                </Link>
                <Link to='/theme' className='[&.active]:font-bold'>
                    Theme
                </Link>
            </div>
            <hr />
            <Outlet />
            <TanStackRouterDevtools />
        </>
    ),
});
