import { useMutation, useQuery } from '@apollo/client';
import { CircularProgress, Grid } from '@mui/material';
import React, { useMemo, useState } from 'react';
import { DndContext, useSensor, useSensors } from '@dnd-kit/core';

import { BoardColumn as BoardColumnType } from '../../../entities/BoardColumn.js';
import { Card as CardType } from '../../../entities/Card.js';
import BoardColumn from '../organisms/BoardColumn.jsx';
import EditableBoardName from '../molecules/EditableBoardName.jsx';
import { GET_BOARD } from '../../graph/board/queries.js';
// import { PAGE_HEADER_HEIGHT, SITE_HEADER_HEIGHT } from '../../helpers/constants.js';
import { InteractivePointer } from '../../helpers/sensors/InteractivePointer.js';
import { getThemeColor } from '../../helpers/theme.js';
import { useAuthStoreToken, useAuthStoreUser } from '../../store/AuthStore.js';
import { MOVE_CARD, GROUP_CARD } from '../../graph/cards/queries.js';

export interface BoardPageProps {
    boardId: number;
}

const BoardPage = ({ boardId }: BoardPageProps) => {
    const [userVotes, setUserVotes] = useState<number[]>([]);

    const [cards, setCards] = useState<CardType[]>([]);
    const [columns, setColumns] = useState<BoardColumnType[]>([]);
    const [boardName, setBoardName] = useState<string>('');
    const [boardVotesAllowed, setBoardVotesAllowed] = useState<number>(6);

    const token = useAuthStoreToken();
    const userId = useAuthStoreUser()?.id;

    const sensors = useSensors(
        useSensor(InteractivePointer, {
            activationConstraint: {
                distance: 8,
            },
        }),
    );

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
        refetchQueries: ['GetBoard'],
    });

    const [groupCard, { loading: groupCardLoading }] = useMutation(GROUP_CARD, {
        context: {
            headers: token
                ? {
                      authorization: `Bearer ${token}`,
                  }
                : {},
        },
        refetchQueries: ['GetBoard'],
    });

    useMemo(() => {
        const { getBoard } = boardData || {};
        if (getBoard) {
            setCards(getBoard.cards || []);
            setColumns(([...getBoard.columns] || []).sort((a: BoardColumnType, b: BoardColumnType) => a.slot - b.slot));
            setBoardName(getBoard?.name || '');
            setBoardVotesAllowed(getBoard?.votesAllowed || 6);
            setUserVotes(
                getBoard.cards
                    .map((card: CardType) => card.votes.filter((vote) => vote.userId === userId).map(() => card.id))
                    .flat(),
            );
        }
    }, [boardData]);

    const [editingCard, setEditingCard] = useState<boolean>(false);

    const styles = {
        grid: {
            margin: '16px 0',
            width: '100vw',
            // height: `calc(100vh - ${PAGE_HEADER_HEIGHT}px - ${SITE_HEADER_HEIGHT}px + 24px)`,
            height: 'calc(100vh - 150px)',
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
            if (dragType === 'cardBase' && dropType === 'column') {
                // if (dragColumnId !== dropColumnId) {
                moveCard({
                    variables: {
                        cardId: parseInt(dragCardId),
                        fromColumnId: parseInt(dragColumnId),
                        toColumnId: parseInt(dropColumnId),
                    },
                });
            }
            if (dragType === 'cardBase' && dropType === 'cardOverlay') {
                const groupedCardIds =
                    [...cards.find((c: CardType) => c.id === parseInt(dropCardId)).groupedCardIds] || [];
                if (!groupedCardIds.includes(parseInt(dropCardId))) {
                    groupedCardIds.push(parseInt(dropCardId));
                }
                groupedCardIds.push(parseInt(dragCardId));
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
        <DndContext onDragEnd={handleDragEnd} sensors={sensors}>
            <div
                style={{
                    backgroundColor: '#f0f0f0',
                    height: `{$PAGE_HEADER_HEIGHT}px`,
                }}
            >
                <EditableBoardName
                    boardId={boardId}
                    boardName={boardName}
                    editingCard={editingCard}
                    setEditingCard={setEditingCard}
                />
            </div>
            <Grid container rowSpacing={1} columnSpacing={{ xs: 1, sm: 2, md: 2 }} sx={styles.grid}>
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
                    <div
                        style={{
                            width: '100vw',
                            height: '100vh',
                            display: 'fixed',
                            backgroundColor: 'argb(220, 220, 220, 0.5)',
                        }}
                    >
                        <div style={{ position: 'fixed', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
                            <CircularProgress />
                        </div>
                    </div>
                )}
            </Grid>
            <div
                style={{
                    position: 'absolute',
                    width: 'calc(100% - 16px)',
                    height: '96px',
                    boxShadow: 'white 0px -48px 24px -12px inset',
                    bottom: '0px',
                    zIndex: 100,
                    pointerEvents: 'none',
                }}
            />
        </DndContext>
    );
};

export default BoardPage;
