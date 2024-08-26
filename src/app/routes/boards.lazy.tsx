import { useState } from 'react';
import { Button, Stack, Typography } from '@mui/material';
import { createLazyFileRoute, Link } from '@tanstack/react-router';
import { useQuery } from '@apollo/client';

import CreateBoardModal from '../components/organisms/modals/CreateBoardModal.js';
import { GET_USER_BOARDS } from '../graph/board/queries.js';
import { useAuthStoreToken } from '../store/AuthStore.js';

export const Route = createLazyFileRoute('/boards')({
    component: Boards,
});

function Boards() {
    const [createBoardOpenModal, setCreateBoardOpenModal] = useState<boolean>(false);

    const token = useAuthStoreToken();

    const { data: boardsData } = useQuery(GET_USER_BOARDS, {
        context: {
            headers: token
                ? {
                      authorization: `Bearer ${token}`,
                  }
                : {},
        },
    });

    return (
        <>
            <Button variant='contained' onClick={() => setCreateBoardOpenModal(true)}>
                New Board
            </Button>
            {boardsData && (
                <ul>
                    {boardsData.getBoardsByUserId.map((board: any) => (
                        <li key={board.id}>
                            <Stack direction='row'>
                                <Link to={`/board/${board.id}`}>
                                    <Typography variant='body1'>
                                        {board.id} - {board.name}
                                    </Typography>
                                </Link>
                            </Stack>
                        </li>
                    ))}
                </ul>
            )}
            {createBoardOpenModal && (
                <CreateBoardModal open={createBoardOpenModal} handleCloseModal={() => setCreateBoardOpenModal(false)} />
            )}
        </>
    );
}
