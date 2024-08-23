import { useState } from 'react';
import { createLazyFileRoute } from '@tanstack/react-router';

import { Stack } from '@mui/material';
import ThemeRow from '../components/molecules/ThemeRow.js';
import { ThemeColor, ThemeColors } from '../helpers/theme.js';

export const Route = createLazyFileRoute('/theme')({
    component: Theme,
});

function Theme() {
    const [editingCard, _setEditingCard] = useState<boolean>(false);

    return (
        <>
            <Stack direction='column' spacing={2}>
                {ThemeColors.map((themeColor: ThemeColor, index: number) => (
                    <ThemeRow key={index} themeColor={themeColor} editingCard={editingCard} />
                ))}
            </Stack>
        </>
    );
}
