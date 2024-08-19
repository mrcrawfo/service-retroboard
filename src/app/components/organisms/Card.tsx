import { useMutation } from '@apollo/client';
import { CircularProgress, Card as MuiCard, CardProps as MuiCardProps, Stack } from '@mui/material';
import { useState } from 'react';

import { Vote as VoteType } from '../../../entities/Vote';
import { DELETE_CARD, UPDATE_CARD } from '../../graph/cards/queries';
import ClearableInputText from '../molecules/ClearableInputText';
import VoteCounter from '../molecules/VoteCounter';
import { ThemeColorSet } from '../../helpers/theme';
export interface CardProps extends MuiCardProps {
    cardId: number;
    boardId: number;
    boardVotesAllowed: number;
    columnId: number;
    text: string;
    theme?: ThemeColorSet;
    userVotes: number[];
    votes: VoteType[];
    setUserVotes: (userVotes: number[]) => void;
    editingCard: boolean;
    setEditingCard: (editing: boolean) => void;
}

const Card = ({
    cardId,
    boardId,
    boardVotesAllowed,
    columnId,
    text,
    theme,
    userVotes,
    votes,
    setUserVotes,
    editingCard,
    setEditingCard,
}: CardProps) => {
    const styles = {
        card: {
            width: 'calc(100% - 16px)',
            borderRadius: '8px',
            backgroundColor: theme?.colors?.primary || '#0080ff',
            color: theme?.colors.primaryText || '#fff',
            padding: '8px',
        },
    };

    const [cardText, setCardText] = useState<string>(text);

    const [updateCard, { loading: updateCardLoading }] = useMutation(UPDATE_CARD, {
        variables: {
            id: cardId,
            text: cardText,
        },
        refetchQueries: ['getBoard'],
    });

    const [deleteCard, { loading: deleteCardLoading }] = useMutation(DELETE_CARD, {
        variables: {
            id: cardId,
        },
        refetchQueries: ['getBoard'],
    });

    const onSave = () => {
        if (cardText !== '') {
            if (cardText !== text) {
                updateCard();
            }
            setEditingCard(false);
        } else {
            deleteCard();
            setEditingCard(false);
        }
    };

    return (
        <MuiCard id={`card-${cardId}`} sx={styles.card}>
            {updateCardLoading || deleteCardLoading ? (
                <CircularProgress />
            ) : (
                <Stack direction='column' spacing={0}>
                    <ClearableInputText
                        text={cardText}
                        onSave={onSave}
                        setText={setCardText}
                        editingCard={editingCard}
                        setEditingCard={setEditingCard}
                    />
                    <VoteCounter
                        cardId={cardId}
                        columnId={columnId}
                        boardId={boardId}
                        boardVotesAllowed={boardVotesAllowed}
                        theme={theme}
                        userVotes={userVotes}
                        votes={votes}
                        setUserVotes={setUserVotes}
                        editingCard={editingCard}
                    />
                </Stack>
            )}
        </MuiCard>
    );
};

export default Card;
