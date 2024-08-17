import { useRef } from 'react';
import { IconButton, InputAdornment, OutlinedInput } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';

const styles = {
    inputText: {
        width: '100%',
        borderRadius: '2px',
        backgroundColor: '#fff',
        color: '#000',
    },
    disabledButton: {
        color: '#ccc',
        pointerEvents: 'none',
    }
};

export interface ClearableInputTextProps {
    text: string;
    setText: (text: string) => void;
}

const ClearableInputText = ({
    text,
    setText,
}: ClearableInputTextProps) => {

    const inputElement = useRef<HTMLInputElement>(null);

    const clearInput = () => {
        // Clear input text after adding it to terms array/chips - Use setTimeout because
        // calling this synchronously interferes with event bubbling and performs unreliably
        // setTimeout(() => {
        //     if (inputElement && inputElement.current) {
        //         inputElement.current.value = '';
        //     }
        // }, 0);
        // inputElement?.current?.value = '';
        setText('');
    };

    return (
        <OutlinedInput
            sx={styles.inputText}
            value={text}
            ref={inputElement}
            onChange={(event: React.ChangeEvent<HTMLInputElement>) => setText(event.target.value)}
            endAdornment={
                <InputAdornment position="end">
                    <IconButton
                        aria-label="clear card input text"
                        onClick={clearInput}
                        edge="end"
                        disabled={!text || text === ''}
                    >
                        {text && text !== '' ? <ClearIcon /> : <ClearIcon sx={styles.disabledButton} />}
                    </IconButton>
                </InputAdornment>
            }
        />
    );
};

export default ClearableInputText;
