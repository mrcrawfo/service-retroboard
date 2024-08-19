import { Stack } from '@mui/material';
import Card from '../organisms/Card';
import BoardColumn from '../organisms/BoardColumn';
import { Card as CardType } from '../../../entities/Card';
import { ThemeColorSet } from '../../helpers/theme';
import AddCardButton from '../atoms/AddCardButton';

export interface ThemeRowProps {
    theme: ThemeColorSet;
    editingCard: boolean;
}

const ThemeRow = ({ theme, editingCard }: ThemeRowProps) => {
    const styles = {
        row: {
            width: '100%',
            backgroundColor: '#80a0ff',
            margin: '8px 0',
        },
    };

    return (
        <Stack direction='row' spacing={2} sx={styles.row}>
            <AddCardButton
                theme={theme}
                onClick={() => {
                    /* do nothing */
                }}
            />
            <AddCardButton
                theme={theme}
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
                theme={theme}
                userVotes={[]}
                setUserVotes={() => {
                    /* do nothing */
                }}
                editingCard={editingCard}
                setEditingCard={() => {
                    /* do nothing */
                }}
                text='Card 1'
            />
        </Stack>
    );
};

export default ThemeRow;
