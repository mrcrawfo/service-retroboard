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
                    groupedCardIds
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
                groupedCardIds
            }
        }
    }
`;

// TODO: Remove this query for version 2 - Once websockets are implemented boards can be user restricted
export const GET_ALL_BOARDS = gql`
    query GetBoards {
        getBoards {
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
                    groupedCardIds
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
                groupedCardIds
            }
        }
    }
`;

export const GET_BOARD = gql`
    query GetBoard($id: Int!) {
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
                groupedCardIds
            }
        }
    }
`;

export const CREATE_BOARD = gql`
    mutation createBoard($name: String!, $columns: [ColumnPresetTypeInput!]!) {
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
                groupedCardIds
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
