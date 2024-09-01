import { ThemeColor } from '../../helpers/theme.js';

export interface BoardThumbnailColumnProps {
    themeColor?: ThemeColor;
}

const BoardThumbnailColumn = ({ themeColor }: BoardThumbnailColumnProps) => {
    const styles = {
        column: {
            width: '100%',
            height: '80px',
            backgroundColor: themeColor?.colors?.primary?.base || '#0000e0',
            margin: '2px',
        },
    };

    return <div style={styles.column} />;
};

export default BoardThumbnailColumn;
