import { ThemeColor } from '../../helpers/theme.js';

export interface ColorSwatchProps {
    themeColor?: ThemeColor;
}

const ColorSwatch = ({ themeColor }: ColorSwatchProps) => {
    const styles = {
        button: {
            width: '32px',
            height: '32px',
            backgroundColor: themeColor?.colors?.primary?.base || '#0000e0',
            margin: '0',
            ':hover': {
                backgroundColor: themeColor?.colors?.primary?.highlight || '#0000ff',
            },
        },
    };

    return <div style={styles.button} />;
};

export default ColorSwatch;
