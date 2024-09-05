import { gql, useMutation } from '@apollo/client';
import { CircleRounded, ThumbDownOffAltOutlined, ThumbUpOffAltOutlined } from '@mui/icons-material';
import { IconButton, Stack, Typography } from '@mui/material';
import { useEffect, useState } from 'react';

import { Board as BoardType } from '../../../entities/Board.js';
import { Card as CardType } from '../../../entities/Card.js';
import { Vote as VoteType } from '../../../entities/Vote.js';
import { GET_BOARD } from '../../graph/board/queries.js';
import { DOWNVOTE_CARD, UPVOTE_CARD } from '../../graph/vote/queries.js';
import { ThemeColor } from '../../helpers/theme.js';
import { useAuthStoreToken, useAuthStoreUser } from '../../store/AuthStore.js';

export interface VoteCounterProps {
    votes: VoteType[];
    cardId: number;
    boardId: number;
    boardVotesAllowed: number;
    themeColor?: ThemeColor;
    userVotes: number[];
    setUserVotes: (votes: number[]) => void;
    editingCard: boolean;
}

const VoteCounter = ({
    votes,
    cardId,
    boardId,
    boardVotesAllowed,
    themeColor,
    userVotes,
    setUserVotes,
    editingCard,
}: VoteCounterProps) => {
    const styles = {
        counter: {
            fontWeight: 'bold',
            padding: '4px',
        },
        inputText: {
            width: '100%',
            borderRadius: '2px',
            backgroundColor: '#fff',
            color: '#000',
        },
        enabledButton: {
            color: '#fff',
            pointerEvents: 'auto',
        },
        disabledButton: {
            color: themeColor?.colors?.primary?.disabled || '#60a0f0',
            pointerEvents: 'none',
        },
    };

    const token = useAuthStoreToken();
    const userId = useAuthStoreUser()?.id;

    const updateVotes = (store: any, addVoteToCard: VoteType, subtractVoteFromCard: VoteType) => {
        const currentBoard: BoardType =
            (
                store.readQuery({
                    query: GET_BOARD,
                    variables: {
                        id: boardId,
                    },
                }) as { getBoard: BoardType }
            ).getBoard || null;

        let updatedVotes: VoteType[];
        let updatedCards;

        if (addVoteToCard) {
            updatedCards = currentBoard.cards.map((card: CardType) => {
                if (card.id === addVoteToCard.cardId) {
                    updatedVotes = [...card.votes, addVoteToCard];
                    const newItem = {
                        ...card,
                        votes: updatedVotes,
                    };
                    return newItem;
                }
                return card;
            });
        }
        if (subtractVoteFromCard) {
            updatedCards = currentBoard.cards.map((card: CardType) => {
                if (card.id === subtractVoteFromCard.cardId) {
                    updatedVotes = card.votes.filter((vote) => vote.id !== subtractVoteFromCard.id);
                    const newItem = {
                        ...card,
                        votes: updatedVotes,
                    };
                    return newItem;
                }
                return card;
            });
        }

        store.writeFragment({
            id: `Board:${boardId}`,
            fragment: gql`
                fragment CachedRow on Board {
                    getBoard {
                        id
                        name
                        votesAllowed
                        columns {
                            id
                            name
                            slot
                        }
                        cards {
                            columnId
                            id
                            text
                            votes {
                                id
                                userId
                            }
                            groupedCardIds
                        }
                    }
                }
            `,
            data: {
                getBoard: { ...currentBoard, cards: updatedCards },
            },
            variables: {
                id: boardId,
            },
        });
    };

    const [upvoteCard, { loading: upvoteLoading }] = useMutation(UPVOTE_CARD, {
        context: {
            headers: token
                ? {
                      authorization: `Bearer ${token}`,
                  }
                : {},
        },
        update: (store, { data: updateData }) => {
            updateVotes(store, updateData.addVoteToCard, null);
        },
    });
    const [downvoteCard, { loading: downvoteLoading }] = useMutation(DOWNVOTE_CARD, {
        context: {
            headers: token
                ? {
                      authorization: `Bearer ${token}`,
                  }
                : {},
        },
        update: (store, { data: updateData }) => {
            updateVotes(store, null, updateData.subtractVoteFromCard);
        },
    });

    const [canUpvote, setCanUpvote] = useState<boolean>(false);
    const [canDownvote, setCanDownvote] = useState<boolean>(false);

    useEffect(() => {
        setCanUpvote(userVotes.length < boardVotesAllowed && !(downvoteLoading || upvoteLoading || editingCard));
        setCanDownvote(
            userVotes.filter((id) => cardId === id).length > 0 && !(downvoteLoading || upvoteLoading || editingCard),
        );
    }, [userVotes, boardVotesAllowed, setCanUpvote, setCanDownvote, upvoteLoading, downvoteLoading, editingCard]);

    const upvote = () => {
        // add one instance of cardId to userVotes (if userVotes.length < boardVotesAllowed)
        if (userVotes.length < boardVotesAllowed) {
            upvoteCard({ variables: { cardId, boardId, userId } }).then(() => {
                setUserVotes([...userVotes, cardId]);
            });
        }
    };

    const downvote = () => {
        // remove one instance of cardId from userVotes
        const uvIndex = userVotes.indexOf(cardId);
        if (uvIndex >= 0) {
            downvoteCard({ variables: { cardId, boardId, userId } }).then(() => {
                setUserVotes(userVotes.slice(0, uvIndex).concat(userVotes.slice(uvIndex + 1)));
            });
        }
    };

    return (
        <Stack direction='row' spacing={1}>
            <Typography variant='button' sx={styles.counter}>
                {votes.length}
            </Typography>
            <IconButton aria-label={`upvote card ${cardId}`} onClick={upvote} disabled={!canUpvote} size='small'>
                <ThumbUpOffAltOutlined
                    fontSize='small'
                    sx={canUpvote && !upvoteLoading && !downvoteLoading ? styles.enabledButton : styles.disabledButton}
                />
            </IconButton>
            <IconButton aria-label={`downvote card ${cardId}`} onClick={downvote} disabled={!canDownvote} size='small'>
                <ThumbDownOffAltOutlined
                    fontSize='small'
                    sx={
                        canDownvote && !upvoteLoading && !downvoteLoading ? styles.enabledButton : styles.disabledButton
                    }
                />
            </IconButton>
            <div style={{ lineHeight: '2em', verticalAlign: 'middle' }}>
                {userVotes
                    .filter((id) => cardId === id)
                    .map((cardId, index) => (
                        <CircleRounded
                            key={`${boardId}-${cardId}-${index}`}
                            sx={{ fontSize: '0.6em', padding: '0 2px' }}
                        />
                    ))}
            </div>
        </Stack>
    );
};

export default VoteCounter;
