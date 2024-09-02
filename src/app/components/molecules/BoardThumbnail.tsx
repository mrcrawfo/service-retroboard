import { Button } from '@mui/material';
import { lightBlue } from '@mui/material/colors';

import { getThemeColor } from '../../helpers/theme.js';
import BoardThumbnailColumn from '../atoms/BoardThumbnailColumn.jsx';
import { BoardPreset } from '../../../entities/BoardPreset.js';

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
    };
    return (
        <Button
            variant={selected ? 'contained' : 'outlined'}
            color='info'
            sx={styles.button}
            onClick={() => setSelectedBoardPreset(boardPreset)}
        >
            <div style={{ width: '120px', display: 'flex', flexDirection: 'row' }}>
                {boardPreset.columns.map((column, index) => (
                    <BoardThumbnailColumn key={index} themeColor={getThemeColor(column.color)} />
                ))}
            </div>
        </Button>
    );
};

export default BoardThumbnail;
