import { useContext, useEffect } from 'react';
import { IconButton, Stack, Typography } from '@mui/material';
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbUpAltIcon from '@mui/icons-material/ThumbUpAlt';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';
import ThumbDownAltIcon from '@mui/icons-material/ThumbDownAlt';

import { AuthContext } from '../../hocs/AuthContext';
import { NexusGenObjects } from '../../../../nexus-typegen';
import { useMutation } from '@apollo/client';
import { UPVOTE_CARD, DOWNVOTE_CARD } from '../../graph/vote/queries';

const styles = {
    inputText: {
        width: '100%',
        borderRadius: '2px',
        backgroundColor: '#fff',
        color: '#000',
    },
    disabledButton: {
        color: '#ccc',
        pointerEvents: 'none',
    }
};

export interface VoteCounterProps {
    votes: NexusGenObjects['Vote'][];
    cardId: number;
    boardId: number;
    boardVotesAllowed: number;
    columnId: number;
    userVotes: number[];
    setUserVotes: (votes: number[]) => void;
}

const VoteCounter = ({
    votes,
    cardId,
    boardId,
    boardVotesAllowed,
    // columnId,
    userVotes,
    setUserVotes
}: VoteCounterProps) => {
    const { user } = useContext(AuthContext);
    const userId: number = user?.id || 0;

    const [upvoteCard, { loading: upvoteLoading }] = useMutation(UPVOTE_CARD);
    const [downvoteCard, { loading: downvoteLoading }] = useMutation(DOWNVOTE_CARD);

    let canUpvote, canDownvote;
    useEffect(() => {
        canUpvote = userVotes.length < boardVotesAllowed;
        canDownvote = userVotes.filter((cardId) => cardId === userId).length > 0;
    }, [userVotes, boardVotesAllowed]);

    const upvote = () => {
        setUserVotes([...userVotes, cardId]);
        // setVotes([...votes, { id: Math.floor(Math.random() * 99999), cardId, boardId, userId }]);

        upvoteCard({ variables: { cardId, boardId, userId }});
    };

    const downvote = () => {
        // remove one instance of cardId from userVotes
        const uvIndex = userVotes.indexOf(cardId);
        setUserVotes(userVotes.slice(0, uvIndex).concat(userVotes.slice(uvIndex + 1)));

        downvoteCard({ variables: { cardId, boardId, userId }});
    }

    return (
        <Stack direction="row" spacing={1}>
            <Typography variant='button'>{votes.length}</Typography>
            <IconButton
                aria-label={`upvote card ${cardId}`}
                onClick={upvote}
                disabled={canUpvote || upvoteLoading}
                size="small"
            >
                {canUpvote ? <ThumbUpAltIcon fontSize="small" /> : <ThumbUpOffAltIcon fontSize="small" sx={styles.disabledButton} />}
            </IconButton>
            <IconButton
                aria-label={`downvote card ${cardId}`}
                onClick={downvote}
                disabled={canDownvote || downvoteLoading}
                size="small"
            >
                {canDownvote ? <ThumbDownAltIcon fontSize="small" /> : <ThumbDownOffAltIcon fontSize="small" sx={styles.disabledButton} />}
            </IconButton>
        </Stack>
    );
};

export default VoteCounter;
