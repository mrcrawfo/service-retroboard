import { gql } from '@apollo/client';

export const UPDATE_BOARD_COLUMN_NAME = gql`
    mutation UpdateBoardColumnName($id: Int!, $name: String!) {
        updateBoardColumnName(id: $id, name: $name) {
            id
            name
        }
    }
`;
