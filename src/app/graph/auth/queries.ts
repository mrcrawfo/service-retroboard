import { gql } from '@apollo/client';

export const GET_USER_DATA = gql`
    query getUserData {
        me {
            success
            message
            user {
                email
                username
                id
            }
        }
    }
`;

export const LOGIN = gql`
    mutation login($username: String!, $password: String!) {
        login(username: $username, password: $password) {
            success
            message
            user {
                id
                username
                firstName
                lastName
                email
            }
            token
        }
    }
`;
