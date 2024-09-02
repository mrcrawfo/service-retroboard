import { useMemo } from 'react';
import { Button, Stack, Typography } from '@mui/material';
import { lightBlue } from '@mui/material/colors';

import { getThemeColor } from '../../helpers/theme.js';
import BoardThumbnailColumn from '../atoms/BoardThumbnailColumn.jsx';
import { BoardPreset as BoardPresetType } from '../../../entities/BoardPreset.js';
import { ColumnPreset as ColumnPresetType } from '../../../entities/ColumnPreset.js';
import KeyValueTypography from '../atoms/KeyValueTypography.jsx';

export interface BoardThumbnailProps {
    boardPreset: BoardPresetType;
    selected: boolean;
    setSelectedBoardPreset: (boardPreset: BoardPresetType) => void;
    disabled?: boolean;
}

const BoardThumbnail = ({ boardPreset, selected, setSelectedBoardPreset, disabled = false }: BoardThumbnailProps) => {
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

    const orderedColumns: ColumnPresetType[] = useMemo(() => {
        const columns = [...boardPreset.columns];
        return columns.sort((a, b) => a.id - b.id);
    }, [boardPreset]);

    return (
        <Button
            variant={selected ? 'contained' : 'outlined'}
            color='info'
            sx={styles.button}
            onClick={() => setSelectedBoardPreset(boardPreset)}
            disabled={disabled}
        >
            <div style={{ minWidth: '120px', width: '120px', display: 'flex', flexDirection: 'row' }}>
                {orderedColumns?.map((column, index) => (
                    <BoardThumbnailColumn key={index} themeColor={getThemeColor(column.color)} />
                ))}
            </div>
            <Stack direction='column' spacing={0} sx={styles.textContainer}>
                <Typography variant='h6'>{boardPreset.name}</Typography>
                <KeyValueTypography selected={selected} keyText='Description' valueText={boardPreset.description} />
            </Stack>
        </Button>
    );
};

export default BoardThumbnail;
