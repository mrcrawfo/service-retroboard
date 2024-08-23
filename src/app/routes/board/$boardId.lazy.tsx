import { createLazyFileRoute } from '@tanstack/react-router';
import BoardPage from '../../components/pages/BoardPage.js';

export const Route = createLazyFileRoute('/board/$boardId')({
    component: Board,
});

function Board() {
    const { boardId } = Route.useParams();
    return <BoardPage boardId={parseInt(boardId)} />;
}
