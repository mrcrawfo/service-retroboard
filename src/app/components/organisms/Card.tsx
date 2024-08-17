import { useState } from 'react';
import { Card as MuiCard, CardProps as MuiCardProps, Stack } from '@mui/material';

import ClearableInputText from '../molecules/ClearableInputText';
import VoteCounter from '../molecules/VoteCounter';
import { NexusGenObjects } from 'nexus-typegen';

export interface CardProps extends MuiCardProps {
    cardId: number;
    boardId: number;
    boardVotesAllowed: number;
    columnId: number;
    userVotes: number[];
    votes: NexusGenObjects['Vote'][];
    setUserVotes: (userVotes: number[]) => void;
}

const Card = ({
    cardId,
    boardId,
    boardVotesAllowed,
    columnId,
    userVotes,
    votes,
    setUserVotes,
}: CardProps) => {
    const styles = {
        card: {
            width: '100%',
            borderRadius: '8px',
            minHeight: '100px',
            backgroundColor: '#0080ff',
            color: '#fff',
            padding: '8px',
        },
    };

    const [cardText, setCardText] = useState<string>('');

    return (
        <MuiCard id={`card-${cardId}`} sx={styles.card}>
            <ClearableInputText text={cardText} setText={setCardText} />
            <Stack direction="row" spacing={2}>
                <VoteCounter cardId={cardId} columnId={columnId} boardId={boardId} votes={votes} boardVotesAllowed={boardVotesAllowed} userVotes={userVotes} setUserVotes={setUserVotes} />
            </Stack>
        </MuiCard>
    );
};

export default Card;
