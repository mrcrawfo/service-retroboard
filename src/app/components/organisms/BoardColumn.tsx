import { Grid, GridProps, Stack } from '@mui/material';
import { useState } from 'react';

import { Card as CardType } from '../../../entities/Card.js';
import AddCardButton from '../atoms/AddCardButton.js';
import Card from './Card.js';
import NewCard from './NewCard.js';
import { ThemeColor } from '../../helpers/theme.js';

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
    ...gridProps
}: BoardColumnProps) => {
    const styles: any = {
        grid: {
            width: '100%',
            minHeight: '100vh',
            maxHeight: '100vh',
        },
        stack: {
            backgroundColor: themeColor?.colors?.secondary?.base || '#60a0ff',
            // backgroundColor: `linear-gradient(45deg, ${themeColor?.colors?.primary?.highlight || '#0080ff'}, ${themeColor?.colors?.primary?.base || '#80a0ff'}), ${themeColor?.colors?.primary?.shadow || '#006090'})`,
            color: '#fff',
            borderRadius: '8px',
            minHeight: '0px',
            padding: '8px 8px 12px 8px',
        },
        h2: {
            height: '2.25em',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            lineClamp: 2,
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
        },
    };

    const [addingCard, setAddingCard] = useState<boolean>(false);

    const addCardToColumn = () => {
        setEditingCard(true);
        setAddingCard(true);
    };

    return (
        <Grid item xs={Math.floor(12 / columnCount)} id={`column-${columnId}`} sx={styles.grid} {...gridProps}>
            <h2 style={styles.h2}>{columnName}</h2>
            <AddCardButton onClick={addCardToColumn} disabled={addingCard || editingCard} />
            {cards.length || addingCard ? (
                <Stack direction='column' spacing={1} sx={styles.stack}>
                    {addingCard ? (
                        <NewCard
                            boardId={boardId}
                            columnId={columnId}
                            setAddingCard={setAddingCard}
                            setEditingCard={setEditingCard}
                        />
                    ) : null}
                    {cards.map((card: CardType) => (
                        <Card
                            cardId={card.id}
                            key={card.id}
                            columnId={1}
                            boardId={boardId}
                            text={card.text}
                            themeColor={themeColor}
                            votes={card.votes}
                            boardVotesAllowed={boardVotesAllowed}
                            userVotes={userVotes}
                            setUserVotes={setUserVotes}
                            editingCard={editingCard}
                            setEditingCard={setEditingCard}
                        />
                    ))}
                </Stack>
            ) : null}
        </Grid>
    );
};

export default BoardColumn;
