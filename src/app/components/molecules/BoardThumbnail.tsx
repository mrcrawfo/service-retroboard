import { getThemeColor } from '../../helpers/theme.js';
import BoardThumbnailColumn from '../atoms/BoardThumbnailColumn.jsx';
import { BoardPreset } from '../../../entities/BoardPreset.js';

export interface BoardThumbnailProps {
    boardPreset: BoardPreset;
}

const BoardThumbnail = ({ boardPreset }: BoardThumbnailProps) => {
    return (
        <div style={{ width: '120px', display: 'flex', flexDirection: 'row' }}>
            {boardPreset.columns.map((column, index) => (
                <BoardThumbnailColumn key={index} themeColor={getThemeColor(column.color)} />
            ))}
        </div>
    );
};

export default BoardThumbnail;
