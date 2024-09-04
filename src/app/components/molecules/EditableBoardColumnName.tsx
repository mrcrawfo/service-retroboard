import { KeyboardEvent, useEffect, useRef, useState } from 'react';
import { Button, InputAdornment, InputProps, OutlinedInput, Stack, Typography } from '@mui/material';
import { useMutation } from '@apollo/client';

import { UPDATE_BOARD_COLUMN_NAME } from '../../graph/boardColumns/queries.js';
import { useAuthStoreToken } from '../../store/AuthStore.js';

export interface EditableBoardColumnNameProps extends InputProps {
    boardColumnId: number;
    boardColumnName: string;
    editingCard: boolean;
    setEditingCard: (editing: boolean) => void;
}

const EditableBoardColumnName = ({
    boardColumnId,
    boardColumnName,
    editingCard,
    setEditingCard,
    ...inputProps
}: EditableBoardColumnNameProps) => {
    const styles = {
        headerContainer: {
            width: '100%',
            justifyContent: 'center',
        },
        input: {
            width: '100%',
            height: '64px',
            margin: '4px 0',
        },
        h2: {
            maxWidth: '100%',
            height: '2.25em',
            overflow: 'hidden',
            textOverflow: 'ellipsis',
            display: '-webkit-box',
            lineClamp: 2,
            WebkitLineClamp: 2,
            WebkitBoxOrient: 'vertical',
            textAlign: 'center',
            verticalAlign: 'middle',
            lineHeight: '1.125em',
            fontFamily: 'Roboto',
            fontWeight: 'normal',
            fontSize: '1.75rem',
            marginBottom: '9px',
            cursor: editingCard ? 'auto' : 'pointer',
            pointerEvents: editingCard ? 'none' : 'auto',
        },
    };

    const token = useAuthStoreToken();

    const [editMode, setEditMode] = useState<boolean>(false);
    const [editText, setEditText] = useState<string>(boardColumnName);
    useEffect(() => {
        setEditText(boardColumnName);
    }, [boardColumnName]);

    const boardColumnNameInputElement = useRef<HTMLInputElement>(null);

    const [updateBoardName, { loading: updateBoardNameLoading }] = useMutation(UPDATE_BOARD_COLUMN_NAME, {
        variables: {
            id: boardColumnId,
            name: editText,
        },
        context: {
            headers: token
                ? {
                      authorization: `Bearer ${token}`,
                  }
                : {},
        },
        refetchQueries: ['GetBoard'],
    });

    const onSave = () => {
        if (editText !== boardColumnName) {
            updateBoardName().then(() => {
                setEditMode(false);
                setEditingCard(false);
            });
        } else {
            setEditMode(false);
            setEditingCard(false);
        }
    };

    const onCancel = () => {
        setEditMode(false);
        setEditingCard(false);
        setEditText(boardColumnName);
    };

    return (
        <>
            {editMode && editText ? (
                <OutlinedInput
                    sx={styles.input}
                    value={editText}
                    ref={boardColumnNameInputElement}
                    onBlur={(e) => {
                        if (e.relatedTarget?.id !== 'save-boardColumn-input-text') {
                            // needs timeout to allow the Save button to be clicked
                            setTimeout(() => {
                                onCancel();
                            }, 100);
                        }
                    }}
                    onSubmit={onSave}
                    onChange={(e) => setEditText(e.target.value)}
                    onFocus={(e) =>
                        e.currentTarget.setSelectionRange(e.currentTarget.value.length, e.currentTarget.value.length)
                    }
                    onKeyDown={(e: KeyboardEvent<HTMLInputElement>) => {
                        if (e.key === 'Enter') {
                            onSave();
                        }
                        if (e.key === 'Tab') {
                            e.preventDefault();
                            onSave();
                        }
                        if (e.key === 'Escape') {
                            e.preventDefault();
                            onCancel();
                        }
                    }}
                    autoFocus
                    endAdornment={
                        <InputAdornment position='end'>
                            <Button
                                id='save-boardColumn-input-text'
                                variant='contained'
                                onClick={onSave}
                                disabled={updateBoardNameLoading}
                            >
                                Save
                            </Button>
                        </InputAdornment>
                    }
                    {...inputProps}
                />
            ) : (
                <Typography
                    variant='h4'
                    sx={styles.h2}
                    onClick={() => {
                        if (!editingCard) {
                            setEditMode(true);
                            setEditingCard(true);
                        }
                    }}
                >
                    {boardColumnName}
                </Typography>
            )}
        </>
    );
};

export default EditableBoardColumnName;
