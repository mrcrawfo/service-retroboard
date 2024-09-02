export interface KeyValueTypographyProps {
    keyText: string;
    valueText: string;
    selected?: boolean;
}

const KeyValueTypography = ({ keyText, valueText, selected = false }: KeyValueTypographyProps) => {
    return (
        <p style={{ textTransform: 'none', color: selected ? '#fff' : '#000', textAlign: 'left', margin: '4px 0' }}>
            <span style={{ fontWeight: 'bold' }}>{keyText}:</span>{' '}
            <span style={{ fontWeight: 'normal' }}> {valueText}</span>
        </p>
    );
};

export default KeyValueTypography;
