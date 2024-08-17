import { gql } from '@apollo/client';

export const GET_CARDS_BY_BOARD_ID = gql`
    query GetCardsByBoardId($boardId: Int!) {
        getCardsByBoardId(boardId: $boardId) {
            id
            text
            boardId
            creatorId
            votes {
                id
                userId
            }
        }
    }
`;