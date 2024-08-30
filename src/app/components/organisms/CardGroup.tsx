import { Divider, CardProps as MuiCardProps, Stack } from '@mui/material';

import Card from './Card.jsx';
import { ThemeColor } from '../../helpers/theme.js';
import { Vote as VoteType } from '../../../entities/Vote.js';

type CardData = {
    id: number;
    text: string;
    votes: VoteType[];
};

export interface CardProps extends MuiCardProps {
    boardId: number;
    boardVotesAllowed: number;
    columnId: number;
    themeColor?: ThemeColor;
    userVotes: number[];
    setUserVotes: (userVotes: number[]) => void;
    editingCard: boolean;
    setEditingCard: (editing: boolean) => void;
    groupedCards: CardData[];
}

const CardGroup = ({
    boardId,
    boardVotesAllowed,
    columnId,
    themeColor,
    userVotes,
    setUserVotes,
    editingCard,
    setEditingCard,
    groupedCards,
}: CardProps) => {
    const styles = {
        cardGroup: {
            backgroundColor: themeColor?.colors?.secondary?.shadow || '#60a0ff',
            margin: '8px',
            padding: '8px',
            borderRadius: '8px',
            borderBox: 'box-sizing',
            border: `12px solid ${themeColor?.colors?.primary?.highlight || '#60a0ff'}`,
        },
        singleCard: {
            margin: '0px',
            padding: '0px',
        },
        divider: {
            border: '1.5px solid white',
        },
    };

    return (
        <Stack
            direction='column'
            spacing={2}
            sx={groupedCards.length > 1 ? styles.cardGroup : styles.singleCard}
            divider={<Divider sx={styles.divider} />}
        >
            {groupedCards.map((card) => (
                <Card
                    key={card.id}
                    boardId={boardId}
                    boardVotesAllowed={boardVotesAllowed}
                    columnId={columnId}
                    themeColor={themeColor}
                    userVotes={userVotes}
                    setUserVotes={setUserVotes}
                    editingCard={editingCard}
                    setEditingCard={setEditingCard}
                    cardId={card.id}
                    text={card.text}
                    votes={card.votes}
                    grouped={groupedCards.length > 1}
                />
            ))}
        </Stack>
    );
};

export default CardGroup;
