import AddIcon from '@mui/icons-material/Add';
import { Button, ButtonProps } from '@mui/material';

export interface AddCardButtonProps extends ButtonProps {
    onClick: () => void;
}

const AddCardButton = ({ onClick, ...buttonProps }: AddCardButtonProps) => {
    const styles = {
        button: {
            width: '100%',
            backgroundColor: '#80a0ff',
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
