import { useMutation } from '@apollo/client';
import { Card as MuiCard, CardCover } from '@mui/joy';
import { CircularProgress, Icon, CardProps as MuiCardProps, Stack } from '@mui/material';
import { useState } from 'react';
import { useDraggable, useDroppable } from '@dnd-kit/core';
import { FilterNoneOutlined } from '@mui/icons-material';

import { Vote as VoteType } from '../../../entities/Vote.js';
import { DELETE_CARD, UPDATE_CARD } from '../../graph/cards/queries.js';
import ClearableInputText from '../molecules/ClearableInputText.js';
import VoteCounter from '../molecules/VoteCounter.js';
import { ThemeColor } from '../../helpers/theme.js';
import { useAuthStoreToken } from '../../store/AuthStore.js';

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
    grouped: boolean;
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
    grouped,
}: CardProps) => {
    const {
        attributes,
        isDragging,
        listeners,
        setNodeRef: setDragNodeRef,
        transform,
    } = useDraggable({
        id: `cardBase-${boardId}-${columnId}-${cardId}`,
    });

    const { isOver, setNodeRef: setDropNodeRef } = useDroppable({
        id: `cardOverlay-${boardId}-${columnId}-${cardId}`,
    });

    const styles = {
        cardBase: {
            width: 'calc(100% - 16px)',
            borderRadius: '8px',
            backgroundColor: themeColor?.colors?.primary?.base || '#0080ff',
            color: themeColor?.colors?.primary?.text || '#fff',
            padding: '8px',
            border: 'none',
            opacity: isDragging ? 0.5 : 1,
            zIndex: isDragging ? 2000 : 1,
        },
        cardStack: {
            opacity: isOver && !isDragging ? 0 : 1,
            zIndex: 5,
        },
        cardOverlay: {
            backgroundColor: isOver && !isDragging ? themeColor?.colors?.secondary?.highlight || '#fff' : 'transparent',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '100%',
            verticalAlign: 'middle',
            border: isOver && !isDragging ? `4px solid ${themeColor?.colors?.primary?.base || '#fff'}` : 'none',
            zIndex: 2,
            boxShadow:
                isOver && !isDragging ? `0px 0px 20px ${themeColor?.colors.primary?.shadow || '#fff'} inset` : 'none',
        },
        mergeIcon: {
            '&.MuiIcon-root': {
                display: isOver && !isDragging ? 'initial' : 'none',
                color: `${themeColor?.colors.primary?.shadow || '#fff'}`,
            },
        },
    };

    const transformStyle = transform
        ? {
              transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
          }
        : null;

    const token = useAuthStoreToken();

    const [cardText, setCardText] = useState<string>(text);

    const [updateCard, { loading: updateCardLoading }] = useMutation(UPDATE_CARD, {
        refetchQueries: ['GetBoard'],
        context: {
            headers: token
                ? {
                      authorization: `Bearer ${token}`,
                  }
                : {},
        },
    });

    console.log('grouped');
    console.log(grouped);

    const [deleteCard, { loading: deleteCardLoading }] = useMutation(DELETE_CARD, {
        variables: {
            id: cardId,
        },
        refetchQueries: ['GetBoard'],
        context: {
            headers: token
                ? {
                      authorization: `Bearer ${token}`,
                  }
                : {},
        },
    });

    const onSave = (inputText: string) => {
        if (inputText !== '') {
            if (inputText !== text) {
                updateCard({ variables: { id: cardId, text: inputText } });
            }
            setEditingCard(false);
        } else {
            deleteCard();
            setEditingCard(false);
        }
    };

    const onCancel = () => {
        setEditingCard(false);
    };

    return (
        <MuiCard sx={styles.cardBase} style={transformStyle} {...listeners} {...attributes}>
            {updateCardLoading || deleteCardLoading ? (
                <CircularProgress />
            ) : (
                <>
                    <CardCover id={`cardBase-${boardId}-${columnId}-${cardId}`} ref={setDragNodeRef} />
                    <Stack direction='column' spacing={0} sx={styles.cardStack}>
                        <ClearableInputText
                            text={cardText}
                            onSave={onSave}
                            onCancel={onCancel}
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
                    <CardCover
                        id={`cardOverlay-${boardId}-${columnId}-${cardId}`}
                        ref={setDropNodeRef}
                        sx={styles.cardOverlay}
                    >
                        <Icon
                            sx={styles.mergeIcon}
                            style={{
                                width: '48px',
                                height: '48px',
                            }}
                        >
                            <FilterNoneOutlined />
                        </Icon>
                    </CardCover>
                </>
            )}
        </MuiCard>
    );
};

export default Card;
