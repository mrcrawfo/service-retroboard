import { useMutation, useQuery } from '@apollo/client';
import { Grid } from '@mui/material';
import React, { useEffect, useMemo, useState } from 'react';
import { DndContext } from '@dnd-kit/core';

import { BoardColumn as BoardColumnType } from '../../../entities/BoardColumn.js';
import { Card as CardType } from '../../../entities/Card.js';
import BoardColumn from '../organisms/BoardColumn.jsx';
import EditableBoardName from '../molecules/EditableBoardName.jsx';
import { GET_BOARD } from '../../graph/board/queries.js';
import { PAGE_HEADER_HEIGHT, SITE_HEADER_HEIGHT } from '../../helpers/constants.js';
import { getThemeColor } from '../../helpers/theme.js';
import { useAuthStoreToken } from '../../store/AuthStore.js';
import { MOVE_CARD, GROUP_CARD } from '../../graph/cards/queries.js';

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

    const token = useAuthStoreToken();

    const { data: boardData } = useQuery(GET_BOARD, {
        variables: { id: boardId },
        context: {
            headers: token
                ? {
                      authorization: `Bearer ${token}`,
                  }
                : {},
        },
    });

    const [moveCard, { loading: moveCardLoading }] = useMutation(MOVE_CARD, {
        context: {
            headers: token
                ? {
                      authorization: `Bearer ${token}`,
                  }
                : {},
        },
        refetchQueries: ['getBoard'],
    });

    const [groupCard, { loading: groupCardLoading }] = useMutation(GROUP_CARD, {
        context: {
            headers: token
                ? {
                      authorization: `Bearer ${token}`,
                  }
                : {},
        },
        refetchQueries: ['getBoard'],
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
            height: `calc(100vh - ${PAGE_HEADER_HEIGHT}px - ${SITE_HEADER_HEIGHT}px + 24px)`,
            overflow: 'hidden',
        },
    };

    function handleDragEnd(event: any) {
        const { active, over } = event;

        if (active && active.id && over && over.id) {
            const [dragType, _dragBoardId, dragColumnId, dragCardId] = active.id.split('-');
            const [dropType, _dropBoardId, dropColumnId, dropCardId] = over.id.split('-');
            console.log('dragType', dragType);
            console.log('dropType', dropType);
            if (dragColumnId !== dropColumnId) {
                if (dragType === 'cardBase' && dropType === 'column') {
                    moveCard({
                        variables: {
                            cardId: parseInt(dragCardId),
                            fromColumnId: parseInt(dragColumnId),
                            toColumnId: parseInt(dropColumnId),
                        },
                    });
                }
            }
            if (dragType === 'cardBase' && dropType === 'cardOverlay') {
                console.log(`combine cards ${dragCardId} and ${dropCardId}`);
                const groupedCardIds = cards.find((c: CardType) => c.id === parseInt(dropCardId)).groupedCardIds;
                groupCard({
                    variables: {
                        cardId: parseInt(dragCardId),
                        fromColumnId: parseInt(dragColumnId),
                        toColumnId: parseInt(dropColumnId),
                        groupedCardIds: groupedCardIds,
                    },
                });
            }
        }
    }

    return (
        <DndContext onDragEnd={handleDragEnd}>
            <div style={{ backgroundColor: '#f0f0f0', height: `{$PAGE_HEADER_HEIGHT}px` }}>
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
                            loading={moveCardLoading || groupCardLoading}
                        />
                    ))
                ) : (
                    // TODO: Add loading spinner
                    <div>Loading...</div>
                )}
            </Grid>
        </DndContext>
    );
};

export default BoardPage;
