import { useContext, useEffect, useState } from 'react';
import { useMutation } from '@apollo/client';
import { IconButton, Stack, Typography } from '@mui/material';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import CircleIcon from '@mui/icons-material/Circle';

import { AuthContext } from '../../hocs/AuthContext';
import { Vote as VoteType } from '../../../entities/Vote';
import { UPVOTE_CARD, DOWNVOTE_CARD } from '../../graph/vote/queries';

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
        color: '#60a0f0',
        pointerEvents: 'none',
    },
};

export interface VoteCounterProps {
    votes: VoteType[];
    cardId: number;
    boardId: number;
    boardVotesAllowed: number;
    columnId: number;
    userVotes: number[];
    setUserVotes: (votes: number[]) => void;
    editingCard: boolean;
}

const VoteCounter = ({
    votes,
    cardId,
    boardId,
    boardVotesAllowed,
    // columnId,
    userVotes,
    setUserVotes,
    editingCard,
}: VoteCounterProps) => {
    const { user } = useContext(AuthContext);
    // biome-ignore lint/correctness/noUnusedVariables:
    const userId: number = user?.id || 0;

    const [_upvoteCard, { loading: upvoteLoading }] = useMutation(UPVOTE_CARD);
    const [_downvoteCard, { loading: downvoteLoading }] = useMutation(DOWNVOTE_CARD);

    const [canUpvote, setCanUpvote] = useState<boolean>(false);
    const [canDownvote, setCanDownvote] = useState<boolean>(false);

    useEffect(() => {
        setCanUpvote(userVotes.length < boardVotesAllowed);
        setCanDownvote(userVotes.filter(id => cardId === id).length > 0);
    }, [
        userVotes,
        boardVotesAllowed,
        setCanUpvote,
        setCanDownvote,
        upvoteLoading,
        downvoteLoading,
    ]);

    const upvote = () => {
        // add one instance of cardId to userVotes (if userVotes.length < boardVotesAllowed)
        if (userVotes.length < boardVotesAllowed) {
            // upvoteCard({ variables: { cardId, boardId, userId }});
            setUserVotes([...userVotes, cardId]);
        }
    };

    const downvote = () => {
        // remove one instance of cardId from userVotes
        const uvIndex = userVotes.indexOf(cardId);
        if (uvIndex >= 0) {
            // downvoteCard({ variables: { cardId, boardId, userId }});
            setUserVotes(userVotes.slice(0, uvIndex).concat(userVotes.slice(uvIndex + 1)));
        }
    };

    return (
        <Stack direction='row' spacing={1}>
            <Typography variant='button' sx={styles.counter}>
                {votes.length}
            </Typography>
            <IconButton
                aria-label={`upvote card ${cardId}`}
                onClick={upvote}
                disabled={!canUpvote || downvoteLoading || upvoteLoading || editingCard}
                size='small'
            >
                <ThumbUpOffAltIcon
                    fontSize='small'
                    sx={
                        canUpvote && !upvoteLoading && !downvoteLoading
                            ? styles.enabledButton
                            : styles.disabledButton
                    }
                />
            </IconButton>
            <IconButton
                aria-label={`downvote card ${cardId}`}
                onClick={downvote}
                disabled={!canDownvote || downvoteLoading || upvoteLoading || editingCard}
                size='small'
            >
                <ThumbDownOffAltIcon
                    fontSize='small'
                    sx={
                        canDownvote && !upvoteLoading && !downvoteLoading
                            ? styles.enabledButton
                            : styles.disabledButton
                    }
                />
            </IconButton>
            <div style={{ lineHeight: '2em', verticalAlign: 'middle' }}>
                {userVotes
                    .filter(id => cardId === id)
                    .map((cardId, index) => (
                        <CircleIcon
                            key={`${boardId}-${cardId}-${index}`}
                            sx={{ fontSize: '0.6em', padding: '0 2px' }}
                        />
                    ))}
            </div>
        </Stack>
    );
};

export default VoteCounter;
