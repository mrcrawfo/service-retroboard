import { gql } from '@apollo/client';

export const GET_USER_BOARDS = gql`
    query GetBoardsByUserId {
        getBoardsByUserId {
            id
            name
            columns {
                id
                name
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
