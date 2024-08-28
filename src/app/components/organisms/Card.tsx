import { useMutation } from '@apollo/client';
import { CircularProgress, Icon, Card as MuiCard, CardProps as MuiCardProps, Stack } from '@mui/material';
import { useState } from 'react';
import { useDraggable, useDroppable } from '@dnd-kit/core';

import { Vote as VoteType } from '../../../entities/Vote.js';
import { DELETE_CARD, UPDATE_CARD } from '../../graph/cards/queries.js';
import ClearableInputText from '../molecules/ClearableInputText.js';
import VoteCounter from '../molecules/VoteCounter.js';
import { ThemeColor } from '../../helpers/theme.js';
import { useAuthStoreToken } from '../../store/AuthStore.js';
import { AddOutlined } from '@mui/icons-material';

export interface CardProps extends MuiCardProps {
    cardId: number;
    boardId: number;
    boardVotesAllowed: number;
    columnId: number;
    text: string;
    themeColor?: ThemeColor;
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
    themeColor,
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
            backgroundColor: themeColor?.colors?.primary?.base || '#0080ff',
            color: themeColor?.colors?.primary?.text || '#fff',
            padding: '8px',
            boxShadow: `0px 4px 4px ${themeColor?.colors?.primary?.shadow || '#006090'}`,
        },
    };

    const { attributes, listeners, setNodeRef, transform } = useDraggable({
        id: `card-${boardId}-${columnId}-${cardId}`,
    });

    const transformStyle = transform
        ? {
              transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
              zIndex: 1000,
          }
        : null;

    const token = useAuthStoreToken();

    const [cardText, setCardText] = useState<string>(text);

    const [updateCard, { loading: updateCardLoading }] = useMutation(UPDATE_CARD, {
        variables: {
            id: cardId,
            text: cardText,
        },
        refetchQueries: ['getBoard'],
        context: {
            headers: token
                ? {
                      authorization: `Bearer ${token}`,
                  }
                : {},
        },
    });

    const [deleteCard, { loading: deleteCardLoading }] = useMutation(DELETE_CARD, {
        variables: {
            id: cardId,
        },
        refetchQueries: ['getBoard'],
        context: {
            headers: token
                ? {
                      authorization: `Bearer ${token}`,
                  }
                : {},
        },
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
        <MuiCard
            id={`card-${boardId}-${columnId}-${cardId}`}
            sx={styles.card}
            ref={setNodeRef}
            style={transformStyle}
            {...listeners}
            {...attributes}
        >
            {updateCardLoading || deleteCardLoading ? (
                <CircularProgress />
            ) : (
                <>
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
                            themeColor={themeColor}
                            userVotes={userVotes}
                            votes={votes}
                            setUserVotes={setUserVotes}
                            editingCard={editingCard}
                        />
                    </Stack>
                    <div
                        style={{
                            backgroundColor: '#fff',
                            width: '100%',
                            height: '100%',
                            borderRadius: '8px',
                            top: '-100%',
                            left: '0px',
                            position: 'relative',
                            // display: 'none',
                        }}
                    >
                        <div
                            style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100%' }}
                        >
                            <Icon
                                style={{
                                    color: themeColor?.colors?.secondary?.base || '#80a0ff',
                                    width: '48px',
                                    height: '48px',
                                }}
                            >
                                <AddOutlined />
                            </Icon>
                        </div>
                    </div>
                </>
            )}
        </MuiCard>
    );
};

export default Card;
