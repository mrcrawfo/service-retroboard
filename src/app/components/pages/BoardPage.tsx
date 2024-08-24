import { useQuery } from '@apollo/client';
import { Grid } from '@mui/material';
import React, { useEffect, useMemo, useState } from 'react';

import { BoardColumn as BoardColumnType } from '../../../entities/BoardColumn.js';
import { Card as CardType } from '../../../entities/Card.js';
import BoardColumn from '../organisms/BoardColumn.jsx';
import EditableBoardName from '../molecules/EditableBoardName.jsx';
import { GET_BOARD } from '../../graph/board/queries.js';
import { PAGE_HEADER_HEIGHT, SITE_HEADER_HEIGHT } from '../../helpers/constants.js';
import { getThemeColor } from '../../helpers/theme.js';

export interface BoardPageProps {
    boardId: number;
}

const BoardPage = ({ boardId }: BoardPageProps) => {
    const [userVotes, setUserVotes] = useState<number[]>([]);

    useEffect(() => {
        console.log('userVotes');
        console.log(userVotes);
    }, [userVotes]);

    const boardVotesAllowed = 6;

    let cards: CardType[];
    let columns: BoardColumnType[];
    let boardName: string;

    const { data: boardData } = useQuery(GET_BOARD, {
        variables: { id: boardId },
    });

    useMemo(() => {
        const { getBoard } = boardData || {};
        if (getBoard) {
            cards = getBoard.cards || [];
            columns = ([...getBoard.columns] || []).sort((a: BoardColumnType, b: BoardColumnType) => a.slot - b.slot);
            boardName = getBoard?.name || '';
        }
    }, [boardData]);

    const [editingCard, setEditingCard] = useState<boolean>(false);

    const styles = {
        grid: {
            width: '100vw',
            height: `calc(100vh - ${PAGE_HEADER_HEIGHT}px - ${SITE_HEADER_HEIGHT}px)`,
            overflow: 'hidden',
        },
    };

    return (
        <>
            <div style={{ backgroundColor: '#eaeaea', height: `{$PAGE_HEADER_HEIGHT}px` }}>
                <EditableBoardName
                    boardId={boardId}
                    boardName={boardName}
                    editingCard={editingCard}
                    setEditingCard={setEditingCard}
                />
            </div>
            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 3 }} sx={styles.grid}>
                {columns?.length ? (
                    columns.map((column) => (
                        <BoardColumn
                            boardId={boardId}
                            columnCount={columns.length}
                            columnId={column.id}
                            key={column.id}
                            columnName={column.name}
                            cards={cards.filter((card: CardType) => card.columnId === column.id)}
                            boardVotesAllowed={boardVotesAllowed}
                            userVotes={userVotes}
                            setUserVotes={setUserVotes}
                            editingCard={editingCard}
                            setEditingCard={setEditingCard}
                            themeColor={getThemeColor(column.color || 'Blue')}
                        />
                    ))
                ) : (
                    // TODO: Add loading spinner
                    <div>Loading...</div>
                )}
            </Grid>
        </>
    );
};

export default BoardPage;
