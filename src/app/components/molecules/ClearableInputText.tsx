import { useRef, useState } from 'react';
import { IconButton, InputAdornment, OutlinedInput, Stack, Typography } from '@mui/material';
import ClearIcon from '@mui/icons-material/Clear';
import { CheckOutlined, EditOutlined } from '@mui/icons-material';

const styles = {
    inputText: {
        width: '90%',
        minHeight: '40px',
        borderRadius: '2px',
        backgroundColor: '#fff',
        color: '#000',
    },
    outputText: {
        width: '90%',
        height: '100%',
        minHeight: '40px',
        lineHeight: '1.25em',
        color: '#fff',
        whiteSpace: 'pre-wrap',
    },
    disabledButton: {
        color: '#ccc',
        pointerEvents: 'none',
    }
};

export interface ClearableInputTextProps {
    text: string;
    edit?: boolean;
    onSave: () => void;
    setText: (text: string) => void;
    editingCard?: boolean;
    setEditingCard?: (editing: boolean) => void;
}

const ClearableInputText = ({
    text,
    edit = false,
    onSave,
    setText,
    editingCard = false,
    setEditingCard = null,
}: ClearableInputTextProps) => {

    const inputElement = useRef<HTMLInputElement>(null);

    const [editMode, setEditMode] = useState<boolean>(edit);

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

    const onSaveClick = () => {
        onSave();
        setEditMode(false);
    };

    const onEditClick = () => {
        setEditMode(true);
        setEditingCard(true);
    };

    return (
        <>
            { editMode ? (
                    <Stack direction="row" spacing={1}>
                        <OutlinedInput
                            sx={styles.inputText}
                            value={text}
                            ref={inputElement}
                            multiline
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
                        <IconButton onClick={onSaveClick}>
                            <CheckOutlined />
                        </IconButton>
                    </Stack>
                ) : (
                    <Stack direction="row" spacing={1}>
                        <Typography variant="body1" sx={styles.outputText}>{text}</Typography>
                        <IconButton onClick={onEditClick} disabled={editingCard}>
                            <EditOutlined />
                        </IconButton>
                    </Stack>
                )
            }
        </>
    );
};

export default ClearableInputText;
