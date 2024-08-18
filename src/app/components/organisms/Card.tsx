import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { CircularProgress, Card as MuiCard, CardProps as MuiCardProps, Stack } from '@mui/material';

import ClearableInputText from '../molecules/ClearableInputText';
import VoteCounter from '../molecules/VoteCounter';
import { Vote as VoteType } from '../../../entities/Vote';
import { UPDATE_CARD } from '../../graph/cards/queries';

export interface CardProps extends MuiCardProps {
    cardId: number;
    boardId: number;
    boardVotesAllowed: number;
    columnId: number;
    text: string;
    userVotes: number[];
    votes: VoteType[];
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

    const [updateCard, { loading: updateCardLoading }] = useMutation(UPDATE_CARD, {
        variables: {
            id: cardId,
            text: cardText,
        },
        refetchQueries: ['getBoard'],
    });

    const onSave = () => {
        if (cardText !== '') {
            updateCard();
        };
    };

    return (
        <MuiCard id={`card-${cardId}`} sx={styles.card}>
            { updateCardLoading ? (
                    <CircularProgress />
                ) : (
                    <Stack direction="column" spacing={0}>
                        <ClearableInputText text={cardText} onSave={onSave} setText={setCardText} />
                        <VoteCounter cardId={cardId} columnId={columnId} boardId={boardId} boardVotesAllowed={boardVotesAllowed} userVotes={userVotes} votes={votes} setUserVotes={setUserVotes} />
                    </Stack>
                )
            }
        </MuiCard>
    );
};

export default Card;
