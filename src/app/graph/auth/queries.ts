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
