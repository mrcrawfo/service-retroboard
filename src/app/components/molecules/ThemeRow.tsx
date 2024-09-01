import { Stack } from '@mui/material';

import Card from '../organisms/Card.js';
import { ThemeColor } from '../../helpers/theme.js';
import AddCardButton from '../atoms/AddCardButton.js';

export interface ThemeRowProps {
    themeColor: ThemeColor;
    editingCard: boolean;
}

const ThemeRow = ({ themeColor, editingCard }: ThemeRowProps) => {
    const styles = {
        row: {
            width: '100%',
            backgroundColor: themeColor?.colors?.secondary?.base || '#80a0ff',
            margin: '8px 0',
            padding: '20px 4px',
        },
    };

    return (
        <Stack direction='row' spacing={2} sx={styles.row}>
            <AddCardButton
                themeColor={themeColor}
                onClick={() => {
                    /* do nothing */
                }}
            />
            <AddCardButton
                themeColor={themeColor}
                onClick={() => {
                    /* do nothing */
                }}
                disabled
            />
            <Card
                columnId={1}
                boardId={1}
                boardVotesAllowed={0}
                votes={[]}
                cardId={1}
                themeColor={themeColor}
                userVotes={[]}
                setUserVotes={() => {
                    /* do nothing */
                }}
                editingCard={editingCard}
                setEditingCard={() => {
                    /* do nothing */
                }}
                text='Card 1'
                grouped={false}
            />
        </Stack>
    );
};

export default ThemeRow;
