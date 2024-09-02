import { Button, Stack, Typography } from '@mui/material';
import { lightBlue } from '@mui/material/colors';

import { getThemeColor } from '../../helpers/theme.js';
import BoardThumbnailColumn from '../atoms/BoardThumbnailColumn.jsx';
import { BoardPreset } from '../../../entities/BoardPreset.js';
import KeyValueTypography from '../atoms/KeyValueTypography.jsx';

export interface BoardThumbnailProps {
    boardPreset: BoardPreset;
    selected: boolean;
    setSelectedBoardPreset: (boardPreset: BoardPreset) => void;
}

const BoardThumbnail = ({ boardPreset, selected, setSelectedBoardPreset }: BoardThumbnailProps) => {
    const styles = {
        button: {
            '&.MuiButton-contained': {
                backgroundColor: lightBlue[400],
            },
        },
        textContainer: {
            marginLeft: '16px',
            justifyContent: 'left',
        },
    };
    return (
        <Button
            variant={selected ? 'contained' : 'outlined'}
            color='info'
            sx={styles.button}
            onClick={() => setSelectedBoardPreset(boardPreset)}
        >
            <div style={{ minWidth: '120px', width: '120px', display: 'flex', flexDirection: 'row' }}>
                {boardPreset.columns.map((column, index) => (
                    <BoardThumbnailColumn key={index} themeColor={getThemeColor(column.color)} />
                ))}
            </div>
            <Stack direction='column' spacing={0} sx={styles.textContainer}>
                <Typography variant='h6'>{boardPreset.name}</Typography>
                <KeyValueTypography selected={selected} keyText='Description' valueText={boardPreset.description} />
                <KeyValueTypography selected={selected} keyText='Votes' valueText={boardPreset.votes.toString()} />
            </Stack>
        </Button>
    );
};

export default BoardThumbnail;
