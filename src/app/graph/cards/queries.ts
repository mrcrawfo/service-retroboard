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
            groupedCardIds
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

export const MOVE_CARD = gql`
    mutation MoveCard($cardId: Int!, $fromColumnId: Int!, $toColumnId: Int!) {
        moveCard(cardId: $cardId, fromColumnId: $fromColumnId, toColumnId: $toColumnId) {
            success
        }
    }
`;

export const GROUP_CARD = gql`
    mutation GroupCard($cardId: Int!, $fromColumnId: Int!, $toColumnId: Int!, $groupedCardIds: [Int!]!) {
        groupCard(cardId: $cardId, fromColumnId: $fromColumnId, toColumnId: $toColumnId, groupedCardIds: $groupedCardIds) {
            success
        }
    }
`;
