import { useState } from 'react';
import { createLazyFileRoute } from '@tanstack/react-router';

import { Stack } from '@mui/material';
import ThemeRow from '../components/molecules/ThemeRow';
import { ColorSet, ThemeColor } from '../helpers/theme';

export const Route = createLazyFileRoute('/theme')({
    component: Theme,
});

function Theme() {
    const [editingCard, setEditingCard] = useState<boolean>(false);
    const themes: ThemeColor[] = [
        {
            name: 'Blue',
            colors: {
                primary: {
                    base: '#2080f0',
                    text: '#ffffff',
                    disabled: '#60a0f0',
                    highlight: '#2888f8',
                    shadow: '#1878e8',
                },
                secondary: {
                    base: '#80a0ff',
                    text: '#ffffff',
                    disabled: '#004060',
                    highlight: '#88a8ff',
                    shadow: '#7898f8',
                },
            },
        },
        {
            name: 'Orange',
            colors: {
                primary: {
                    base: '#ff8000',
                    text: '#ffffff',
                    disabled: '#f0a060',
                    highlight: '#f0a060',
                    shadow: '#604000',
                },
                secondary: {
                    base: '#ffa040',
                    text: '#ffffff',
                    disabled: '#604000',
                    highlight: '#604000',
                    shadow: '#604000',
                },
            },
        },
        {
            name: 'Red',
            colors: {
                primary: {
                    base: '#ff0000',
                    text: '#ffffff',
                    disabled: '#f06060',
                    highlight: '#f06060',
                    shadow: '#600000',
                },
                secondary: {
                    base: '#ff8080',
                    text: '#ffffff',
                    disabled: '#600000',
                    highlight: '#600000',
                    shadow: '#600000',
                },
            },
        },
        {
            name: 'Green',
            colors: {
                primary: {
                    base: '#009000',
                    text: '#ffffff',
                    disabled: '#60f060',
                    highlight: '#60f060',
                    shadow: '#006000',
                },
                secondary: {
                    base: '#80ff80',
                    text: '#ffffff',
                    disabled: '#006000',
                    highlight: '#006000',
                    shadow: '#006000',
                },
            },
        },
        {
            name: 'Purple',
            colors: {
                primary: {
                    base: '#8000ff',
                    text: '#ffffff',
                    disabled: '#a060f0',
                    highlight: '#a060f0',
                    shadow: '#400060',
                },
                secondary: {
                    base: '#a080ff',
                    text: '#ffffff',
                    disabled: '#400060',
                    highlight: '#400060',
                    shadow: '#400060',
                },
            },
        },
        {
            name: 'Yellow',
            colors: {
                primary: {
                    base: '#e0b000',
                    text: '#ffffff',
                    disabled: '#f0f060',
                    highlight: '#f0f060',
                    shadow: '#605000',
                },
                secondary: {
                    base: '#ffff80',
                    text: '#ffffff',
                    disabled: '#606000',
                    highlight: '#606000',
                    shadow: '#606000',
                },
            },
        },
    ];
    return (
        <>
            <div className='p-2'>Hello from Theme!</div>
            <Stack direction='column' spacing={2}>
                {themes.map((themeColor, index) => (
                    <ThemeRow key={index} themeColor={themeColor} editingCard={editingCard} />
                ))}
            </Stack>
        </>
    );
}
