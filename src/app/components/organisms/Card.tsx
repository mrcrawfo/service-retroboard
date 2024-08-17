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
    text: string;
    userVotes: number[];
    votes: NexusGenObjects['Vote'][];
    setUserVotes: (userVotes: number[]) => void;
}

const Card = ({
    cardId,
    boardId,
    boardVotesAllowed,
    columnId,
    text,
    userVotes,
    votes,
    setUserVotes,
}: CardProps) => {
    const styles = {
        card: {
            width: 'calc(100% - 16px)',
            borderRadius: '8px',
            backgroundColor: '#0080ff',
            color: '#fff',
            padding: '8px',
        },
    };

    console.log('text');
    console.log(text);

    const [cardText, setCardText] = useState<string>(text);

    return (
        <MuiCard id={`card-${cardId}`} sx={styles.card}>
            <Stack direction="column" spacing={0}>
                <ClearableInputText text={cardText} setText={setCardText} />
                <VoteCounter cardId={cardId} columnId={columnId} boardId={boardId} votes={votes} boardVotesAllowed={boardVotesAllowed} userVotes={userVotes} setUserVotes={setUserVotes} />
            </Stack>
        </MuiCard>
    );
};

export default Card;
