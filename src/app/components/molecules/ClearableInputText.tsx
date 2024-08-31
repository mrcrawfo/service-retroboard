import { CheckOutlined, ClearOutlined, EditOutlined } from '@mui/icons-material';
import { IconButton, InputAdornment, OutlinedInput, Stack, Typography } from '@mui/material';
import { ChangeEvent, KeyboardEvent, useEffect, useRef, useState } from 'react';

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
    },
};

export interface ClearableInputTextProps {
    text: string;
    edit?: boolean;
    newCard?: boolean;
    onSave: (inputText: string) => void;
    onCancel: () => void;
    setText: (text: string) => void;
    editingCard: boolean;
    setEditingCard: (editing: boolean) => void;
}

const ClearableInputText = ({
    text,
    edit = false,
    newCard = false,
    onSave,
    onCancel,
    setText,
    editingCard,
    setEditingCard,
}: ClearableInputTextProps) => {
    const inputElement = useRef<HTMLInputElement>(null);

    const [editMode, setEditMode] = useState<boolean>(edit);
    const [editText, setEditText] = useState<string>(text);
    useEffect(() => {
        setEditText(text);
    }, [text]);

    const clearInput = () => {
        setEditText('');
        inputElement?.current?.focus();
    };

    const onSaveClick = () => {
        setText(editText);
        onSave(editText);
        setEditMode(false);
        setEditingCard(false);
    };

    const onCancelClick = () => {
        setEditText(text);
        setEditMode(false);
        setEditingCard(false);
        onCancel();
    };

    const onEditClick = () => {
        setEditMode(true);
        setEditingCard(true);
    };

    return (
        <>
            {editMode ? (
                <Stack direction='row' spacing={1}>
                    <OutlinedInput
                        sx={styles.inputText}
                        value={editText}
                        inputRef={inputElement}
                        onFocus={(e) =>
                            e.currentTarget.setSelectionRange(
                                e.currentTarget.value.length,
                                e.currentTarget.value.length,
                            )
                        }
                        multiline
                        autoFocus
                        onChange={(event: ChangeEvent<HTMLInputElement>) => setEditText(event.target.value)}
                        endAdornment={
                            <InputAdornment position='end'>
                                <IconButton
                                    aria-label='clear card input text'
                                    id='clear-card-input-text'
                                    onClick={clearInput}
                                    edge='end'
                                    disabled={!editText || editText === '' || (!newCard && (!text || text === ''))}
                                >
                                    {editText && editText !== '' ? (
                                        <ClearOutlined />
                                    ) : (
                                        <ClearOutlined sx={styles.disabledButton} />
                                    )}
                                </IconButton>
                            </InputAdornment>
                        }
                        onBlur={(e) => {
                            if (
                                e.relatedTarget?.id !== 'clear-card-input-text' &&
                                e.relatedTarget?.id !== 'save-card-input-text'
                            ) {
                                // needs timeout to allow the Save button to be clicked
                                setTimeout(() => {
                                    onCancelClick();
                                }, 100);
                            }
                        }}
                        onSubmit={() => onSave(editText)}
                        onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => {
                            if (e.key === 'Tab') {
                                e.preventDefault();
                                onSaveClick();
                            }
                            if (e.key === 'Escape') {
                                e.preventDefault();
                                onCancelClick();
                            }
                        }}
                    />
                    <IconButton id='save-card-input-text' onClick={onSaveClick}>
                        <CheckOutlined />
                    </IconButton>
                </Stack>
            ) : (
                <Stack direction='row' spacing={1}>
                    <Typography variant='body1' sx={styles.outputText}>
                        {text}
                    </Typography>
                    <IconButton onClick={onEditClick} disabled={editingCard}>
                        <EditOutlined />
                    </IconButton>
                </Stack>
            )}
        </>
    );
};

export default ClearableInputText;
