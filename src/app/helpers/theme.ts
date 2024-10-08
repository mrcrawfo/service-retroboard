export type ColorSet = {
    base: string;
    text: string;
    disabled: string;
    highlight: string;
    shadow: string;
};

export type ThemeColor = {
    name: string;
    colors: {
        primary: ColorSet;
        secondary: ColorSet;
    };
};

export enum ThemeColorName {
    Blue = 'Blue',
    Orange = 'Orange',
    Red = 'Red',
    Green = 'Green',
    Purple = 'Purple',
    Yellow = 'Yellow',
}

export const ThemeColors: ThemeColor[] = [
    {
        name: 'Blue',
        colors: {
            primary: {
                base: '#2080f0',
                text: '#ffffff',
                disabled: '#60a0f0',
                highlight: '#2888f8',
                shadow: '#0060c0',
            },
            secondary: {
                base: '#60a0ff',
                text: '#ffffff',
                disabled: '#90b8ff',
                highlight: '#70b0ff',
                shadow: '#5090f0',
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
                highlight: '#ff8f0f',
                shadow: '#f87800',
            },
            secondary: {
                base: '#ffa040',
                text: '#ffffff',
                disabled: '#604000',
                highlight: '#ffa848',
                shadow: '#e08020',
            },
        },
    },
    {
        name: 'Red',
        colors: {
            primary: {
                base: '#e00000',
                text: '#ffffff',
                disabled: '#f06060',
                highlight: '#ff0808',
                shadow: '#b00000',
            },
            secondary: {
                base: '#ff8080',
                text: '#ffffff',
                disabled: '#600000',
                highlight: '#ff8888',
                shadow: '#e06060',
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
                highlight: '#089808',
                shadow: '#008800',
            },
            secondary: {
                base: '#80ff80',
                text: '#ffffff',
                disabled: '#006000',
                highlight: '#88ff88',
                shadow: '#40b040',
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
                highlight: '#8808ff',
                shadow: '#7800f8',
            },
            secondary: {
                base: '#a080ff',
                text: '#ffffff',
                disabled: '#400060',
                highlight: '#a888ff',
                shadow: '#8060e0',
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
                highlight: '#e8b808',
                shadow: '#d8a800',
            },
            secondary: {
                base: '#ffff80',
                text: '#ffffff',
                disabled: '#606000',
                highlight: '#ffff88',
                shadow: '#d0d030',
            },
        },
    },
];

export const getThemeColor = (name: string): ThemeColor => {
    return ThemeColors.find((theme) => theme.name === name) || ThemeColors[0];
};
