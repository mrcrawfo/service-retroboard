import { gql } from '@apollo/client';

export const GET_USER_DATA = gql`
    query getUserData {
        me {
            email
            username
            id
        }
    }
`;

export const LOGIN = gql`
    mutation login($username: String!, $password: String!) {
        login(username: $username, password: $password) {
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
