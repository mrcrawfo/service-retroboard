import { gql } from '@apollo/client';

export const GET_BOARD_PRESETS = gql`

query GetBoardPresets {
    getBoardPresets {
        columns {
            color
            id
            name
        }
        description
        id
        name
        type
    }
}`;
