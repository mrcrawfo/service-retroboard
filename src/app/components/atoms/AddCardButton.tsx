import AddIcon from '@mui/icons-material/Add';
import { Button, ButtonProps } from '@mui/material';

import { ThemeColor } from 'src/app/helpers/theme';

export interface AddCardButtonProps extends ButtonProps {
    themeColor?: ThemeColor;
    onClick: () => void;
}

const AddCardButton = ({ themeColor, onClick, ...buttonProps }: AddCardButtonProps) => {
    const styles = {
        button: {
            width: '100%',
            backgroundColor: themeColor?.colors?.secondary?.base || '#004060',
            margin: '8px 0',
            ':hover': {
                backgroundColor: themeColor?.colors?.primary?.base || '#88a8ff',
            },
            ':disabled': {
                backgroundColor: themeColor?.colors?.primary?.disabled || '#004060',
            },
        },
    };

    return (
        <Button variant='contained' sx={styles.button} onClick={onClick} {...buttonProps}>
            <AddIcon />
        </Button>
    );
};

export default AddCardButton;
