import AddIcon from '@mui/icons-material/Add';
import { Button, ButtonProps } from '@mui/material';
import { ThemeColorSet } from 'src/app/helpers/theme';

export interface AddCardButtonProps extends ButtonProps {
    theme?: ThemeColorSet;
    onClick: () => void;
}

const AddCardButton = ({ theme, onClick, ...buttonProps }: AddCardButtonProps) => {
    const styles = {
        button: {
            width: '100%',
            backgroundColor: theme?.colors?.secondary || '#80a0ff',
            margin: '8px 0',
        },
    };

    return (
        <Button variant='contained' color='primary' sx={styles.button} onClick={onClick} {...buttonProps}>
            <AddIcon />
        </Button>
    );
};

export default AddCardButton;
