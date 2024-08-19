import { createLazyFileRoute } from '@tanstack/react-router';

export const Route = createLazyFileRoute('/boards')({
    component: Boards,
});

function Boards() {
    return <div className='p-2'>Hello from Boards!</div>;
}
