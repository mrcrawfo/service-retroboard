import { useState } from 'react';
import { Grid, GridProps, Stack } from '@mui/material';

import AddCardButton from '../atoms/AddCardButton';
import Card from './Card';
import NewCard from './NewCard';
import { Card as CardType } from "../../../entities/Card";

export interface BoardColumnProps extends GridProps {
    boardId: number;
    columnCount: number;
    columnId: number;
    columnName: string;
    cards: CardType[];
    boardVotesAllowed: number;
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
            backgroundColor: '#80a0ff',
            color: '#fff',
            borderRadius: '8px',
            minHeight: '0px',
            padding: '8px',
        },
        h2: {
            height: '2.25em',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            lineClamp: 2,
            'WebkitLineClamp': 2,
            'WebkitBoxOrient': 'vertical',
        }
    };

    const [addingCard, setAddingCard] = useState<boolean>(false);

    const addCardToColumn = () => {
        setEditingCard(true);
        setAddingCard(true);
    };

    return (
        <Grid item xs={Math.floor(12 / columnCount)} id={`column-${columnId}`} sx={styles.grid} { ...gridProps }>
            <h2 style={styles.h2}>{columnName}</h2>
            <AddCardButton onClick={addCardToColumn} disabled={addingCard || editingCard} />
            { (cards.length || addingCard) ? (
                <Stack direction="column" spacing={1} sx={styles.stack}>
                    { addingCard ? <NewCard boardId={boardId} columnId={columnId} setAddingCard={setAddingCard} setEditingCard={setEditingCard}/> : null }
                    { cards.map((card: CardType) => (
                        <Card cardId={card.id} key={card.id} columnId={1} boardId={boardId} text={card.text} votes={card.votes} boardVotesAllowed={boardVotesAllowed} userVotes={userVotes} setUserVotes={setUserVotes} editingCard={editingCard} setEditingCard={setEditingCard} />
                    ))}
                </Stack>) : null
            }
        </Grid>
    );
};

export default BoardColumn;
