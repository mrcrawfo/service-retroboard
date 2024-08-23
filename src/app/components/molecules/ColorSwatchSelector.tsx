import { useState } from 'react';
import { MenuItem, Select, Stack, Typography } from '@mui/material';
import { SelectChangeEvent, SelectInputProps } from '@mui/material/Select/SelectInput.js';

import { getThemeColor, ThemeColor, ThemeColors } from '../../helpers/theme.js';
import ColorSwatch from '../atoms/ColorSwatch.jsx';

export interface ColorSwatchSelectorProps extends SelectInputProps {
    onSelectColor: (color: ThemeColor) => void;
    autoWidth: boolean;
    multiple: boolean;
    native: boolean;
}

const ColorSwatchSelector = ({
    onSelectColor,
    autoWidth,
    multiple,
    native,
    ...selectProps
}: ColorSwatchSelectorProps) => {
    const styles = {
        dropdown: {
            width: '240px',
        },
        menuItem: {
            display: 'flex',
            alignItems: 'center',
            padding: '8px',
        },
    };

    const [selectedColor, setSelectedColor] = useState<string>(ThemeColors[0].name);

    return (
        <Select
            value={selectedColor}
            variant='outlined'
            autoWidth={autoWidth}
            multiple={multiple}
            native={native}
            onChange={(event: SelectChangeEvent<unknown>) => {
                const value = event.target.value as string;
                setSelectedColor(value);
            }}
            sx={styles.dropdown}
            renderValue={(themeColorName) => {
                return (
                    <Stack direction='row' spacing={2}>
                        <ColorSwatch themeColor={getThemeColor(themeColorName.toString())} />
                        <Typography variant='body2'>{themeColorName.toString()}</Typography>
                    </Stack>
                );
            }}
            {...selectProps}
        >
            {ThemeColors.map((themeColor: ThemeColor, index: number) => (
                <MenuItem sx={styles.menuItem} key={index} value={themeColor.name}>
                    <ColorSwatch themeColor={themeColor} />
                    <Typography variant='body2'>{themeColor.name}</Typography>
                </MenuItem>
            ))}
        </Select>
    );
};

export default ColorSwatchSelector;
