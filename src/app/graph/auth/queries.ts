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
    mutation login($email: String!, $password: String!) {
        login(email: $email, password: $password) {
            id
            username
            firstName
            lastName
            email
            token
        }
    }
`;
