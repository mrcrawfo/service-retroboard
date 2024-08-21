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
