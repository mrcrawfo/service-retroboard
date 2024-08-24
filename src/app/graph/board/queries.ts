import { gql } from '@apollo/client';

export const GET_USER_BOARDS = gql`
    query GetBoardsByUserId {
        getBoardsByUserId {
            id
            name
            columns {
                id
                name
                slot
                color
                cards {
                    id
                    text
                    votes {
                        userId
                        user {
                            email
                            username
                            id
                        }
                    }
                }
            }
            cards {
                columnId
                id
                text
                votes {
                    id
                    userId
                    user {
                        id
                        username
                        email
                    }
                }
            }
        }
    }
`;

export const GET_BOARD = gql`
    query getBoard($id: Int!) {
        getBoard(id: $id) {
            id
            name
            columns {
                id
                name
                slot
                color
            }
            cards {
                columnId
                id
                text
                votes {
                    id
                    userId
                }
            }
        }
    }
`;

export const CREATE_BOARD = gql`
    mutation createBoard($name: String!, $columns: [ColumnInput!]!) {
        createBoard(name: $name, columns: $columns) {
            id
            name
            columns {
                id
                name
                slot
                color
            }
            cards {
                columnId
                id
                text
                votes {
                    id
                    userId
                }
            }
        }
    }
`;

export const UPDATE_BOARD_NAME = gql`
    mutation updateBoardName($id: Int!, $name: String!) {
        updateBoardName(id: $id, name: $name) {
            id
            name
        }
    }
`;
