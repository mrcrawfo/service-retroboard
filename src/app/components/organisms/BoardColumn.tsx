import { Grid, GridProps, Stack } from '@mui/material';
import { useMemo, useState } from 'react';
import { useDroppable } from '@dnd-kit/core';

import { Card as CardType } from '../../../entities/Card.js';
import AddCardButton from '../atoms/AddCardButton.jsx';
import CardGroup from '../molecules/CardGroup.jsx';
import NewCard from './NewCard.jsx';
import { ThemeColor } from '../../helpers/theme.js';
import EditableBoardColumnName from '../molecules/EditableBoardColumnName.jsx';

export interface BoardColumnProps extends GridProps {
    boardId: number;
    columnCount: number;
    columnId: number;
    columnName: string;
    cards: CardType[];
    boardVotesAllowed: number;
    themeColor?: ThemeColor;
    userVotes: number[];
    setUserVotes: (userVotes: number[]) => void;
    editingCard: boolean;
    setEditingCard: (editing: boolean) => void;
    loading: boolean;
}

const BoardColumn = ({
    boardId,
    columnCount,
    columnId,
    columnName,
    cards,
    boardVotesAllowed,
    themeColor,
    userVotes,
    setUserVotes,
    editingCard,
    setEditingCard,
    loading,
    ...gridProps
}: BoardColumnProps) => {
    const { isOver, setNodeRef } = useDroppable({
        id: `column-${boardId}-${columnId}`,
    });

    const styles: any = {
        grid: {
            width: '100%',
            minHeight: '100vh',
            maxHeight: '100vh',
        },
        stack: {
            backgroundColor:
                (isOver ? themeColor?.colors?.primary?.shadow : themeColor?.colors?.secondary?.base) || '#60a0ff',
            color: '#fff',
            borderRadius: '8px',
            minHeight: '0px',
            padding: '8px 8px 12px 8px',
            margin: '0px',
            overflowY: 'scroll',
            height: 'calc(100vh - 300px)', // TODO: Calculate this better (app header + page header + column header + AddCard)
            display: 'block',
        },
    };

    const [addingCard, setAddingCard] = useState<boolean>(false);

    const addCardToColumn = () => {
        setEditingCard(true);
        setAddingCard(true);
    };

    const cardIds: number[] = useMemo(() => {
        let groupedCardIds: number[] = [];
        const renderCardIds: number[] = [];
        for (const card of cards) {
            if (card.groupedCardIds.length) {
                if (!groupedCardIds.includes(card.id)) {
                    groupedCardIds = groupedCardIds.concat(card.groupedCardIds);
                    renderCardIds.push(card.id);
                }
            } else {
                renderCardIds.push(card.id);
            }
        }

        return renderCardIds;
    }, [cards]);

    return (
        <Grid
            item
            xs={Math.floor(12 / columnCount)}
            id={`column-${boardId}-${columnId}`}
            ref={setNodeRef}
            sx={styles.grid}
            {...gridProps}
        >
            <EditableBoardColumnName
                boardColumnId={columnId}
                boardColumnName={columnName}
                editingCard={editingCard}
                setEditingCard={setEditingCard}
            />
            <AddCardButton onClick={addCardToColumn} disabled={addingCard || editingCard} themeColor={themeColor} />
            {cards.length || addingCard ? (
                <Stack direction='column' spacing={1} sx={styles.stack}>
                    <>
                        {addingCard ? (
                            <NewCard
                                key={0}
                                boardId={boardId}
                                columnId={columnId}
                                setAddingCard={setAddingCard}
                                editingCard={editingCard}
                                setEditingCard={setEditingCard}
                                themeColor={themeColor}
                            />
                        ) : null}
                    </>
                    {cardIds.map((cardId: number) => {
                        const card: CardType = cards.find((card: CardType) => card.id === cardId);
                        const groupedCards: CardType[] = cards.filter(
                            (c: CardType) => card.groupedCardIds.includes(c.id) && c.id !== card.id,
                        );
                        return (
                            <CardGroup
                                key={card.id}
                                columnId={columnId}
                                boardId={boardId}
                                themeColor={themeColor}
                                boardVotesAllowed={boardVotesAllowed}
                                userVotes={userVotes}
                                setUserVotes={setUserVotes}
                                editingCard={editingCard}
                                setEditingCard={setEditingCard}
                                groupedCards={[{ id: card.id, text: card.text, votes: card.votes }, ...groupedCards]}
                            />
                        );
                    })}
                    <div style={{ height: '128px' }} />
                </Stack>
            ) : null}
        </Grid>
    );
};

export default BoardColumn;
