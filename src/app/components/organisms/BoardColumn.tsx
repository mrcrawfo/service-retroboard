import { Grid, GridProps, Stack } from '@mui/material';

import AddCardButton from '../atoms/AddCardButton';
import Card from './Card';
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

    const addCardToColumn = () => {
        console.log('Adding a card to column ' + columnId);
        // TODO: Implement adding a card to a column
    };

    return (
        <Grid item xs={Math.floor(12 / columnCount)} id={`column-${columnId}`} sx={styles.grid} { ...gridProps }>
            <h2 style={styles.h2}>{columnName}</h2>
            <AddCardButton onClick={addCardToColumn} />
            { cards.length ? (
                <Stack direction="column" spacing={1} sx={styles.stack}>
                    { cards.map((card: CardType) => (
                        <Card cardId={card.id} key={card.id} columnId={1} boardId={boardId} votes={card.votes} boardVotesAllowed={boardVotesAllowed} userVotes={userVotes} setUserVotes={setUserVotes} />
                    ))}
                </Stack>) : null
            }
        </Grid>
    );
};

export default BoardColumn;
