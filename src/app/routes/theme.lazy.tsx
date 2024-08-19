import { useState } from 'react';
import { createLazyFileRoute } from '@tanstack/react-router';

import { Stack } from '@mui/material';
import ThemeRow from '../components/molecules/ThemeRow';
import { ThemeColorSet } from '../helpers/theme';

export const Route = createLazyFileRoute('/theme')({
    component: Theme,
});

function Theme() {
    const [editingCard, setEditingCard] = useState<boolean>(false);
    const themes: ThemeColorSet[] = [
        {
            name: 'Blue',
            colors: {
                primary: '#0080ff',
                secondary: '#80a0ff',
                primaryText: '#ffffff',
                secondaryText: '#ffffff',
                primaryDisabled: '#60a0f0',
                secondaryDisabled: '#004060',
            },
        },
        {
            name: 'Orange',
            colors: {
                primary: '#ff8000',
                secondary: '#ffa040',
                primaryText: '#ffffff',
                secondaryText: '#ffffff',
                primaryDisabled: '#f0a060',
                secondaryDisabled: '#604000',
            },
        },
        {
            name: 'Red',
            colors: {
                primary: '#ff0000',
                secondary: '#ff8080',
                primaryText: '#ffffff',
                secondaryText: '#ffffff',
                primaryDisabled: '#f06060',
                secondaryDisabled: '#600000',
            },
        },
        {
            name: 'Green',
            colors: {
                primary: '#00ff00',
                secondary: '#80ff80',
                primaryText: '#ffffff',
                secondaryText: '#ffffff',
                primaryDisabled: '#60f060',
                secondaryDisabled: '#006000',
            },
        },
        {
            name: 'Purple',
            colors: {
                primary: '#8000ff',
                secondary: '#a080ff',
                primaryText: '#ffffff',
                secondaryText: '#ffffff',
                primaryDisabled: '#a060f0',
                secondaryDisabled: '#400060',
            },
        },
        {
            name: 'Yellow',
            colors: {
                primary: '#ffff00',
                secondary: '#ffff80',
                primaryText: '#ffffff',
                secondaryText: '#ffffff',
                primaryDisabled: '#f0f060',
                secondaryDisabled: '#606000',
            },
        },
    ];
    return (
        <>
            <div className='p-2'>Hello from Theme!</div>
            <Stack direction='column' spacing={2}>
                {themes.map((theme, index) => (
                    <ThemeRow key={index} theme={theme} editingCard={editingCard} />
                ))}
            </Stack>
        </>
    );
}
