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

export const CREATE_CARD = gql`
    mutation CreateCard($text: String!, $boardId: Int!, $columnId: Int!) {
        createCard(text: $text, boardId: $boardId, columnId: $columnId) {
            id
            text
            boardId
            creatorId
        }
    }
`;

export const UPDATE_CARD = gql`
    mutation UpdateCard($id: Int!, $text: String!) {
        updateCard(id: $id, text: $text) {
            id
            text
        }
    }
`;

export const DELETE_CARD = gql`
    mutation DeleteCard($id: Int!) {
        deleteCard(id: $id) {
            success
        }
    }
`;
