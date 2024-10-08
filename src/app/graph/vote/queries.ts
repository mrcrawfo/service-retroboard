import { gql } from '@apollo/client';

export const UPVOTE_CARD = gql`
    mutation UpvoteCard($cardId: Int!, $boardId: Int!, $userId: Int!) {
        addVoteToCard(cardId: $cardId, boardId: $boardId, userId: $userId) {
            id
            cardId
            boardId
            userId
        }
    }
`;

export const DOWNVOTE_CARD = gql`
    mutation DownvoteCard($cardId: Int!, $boardId: Int!, $userId: Int!) {
        subtractVoteFromCard(cardId: $cardId, boardId: $boardId, userId: $userId) {
            id
            cardId
            boardId
            userId
        }
    }
`;
