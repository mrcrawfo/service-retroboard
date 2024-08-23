import { KeyboardEvent, useEffect, useRef, useState } from 'react';
import { EditOutlined } from '@mui/icons-material';
import { Button, IconButton, InputAdornment, InputProps, OutlinedInput, Stack, Typography } from '@mui/material';
import { useMutation } from '@apollo/client';

import { UPDATE_BOARD_NAME } from '../../graph/board/queries.js';

export interface EditableBoardNameProps extends InputProps {
    boardId: number;
    boardName: string;
    editingCard: boolean;
    setEditingCard: (editing: boolean) => void;
}

const EditableBoardName = ({
    boardId,
    boardName,
    editingCard,
    setEditingCard,
    ...inputProps
}: EditableBoardNameProps) => {
    const styles = {
        headerContainer: {
            width: '100%',
            justifyContent: 'center',
        },
        header: {
            maxWidth: '90%',
            whiteSpace: 'nowrap',
            textOverflow: 'ellipsis',
            overflow: 'hidden',
        },
        input: {
            width: '100%',
            height: '64px',
            margin: '4px 0',
        },
    };

    const [editMode, setEditMode] = useState<boolean>(false);
    const [editText, setEditText] = useState<string>(boardName);
    useEffect(() => {
        setEditText(boardName);
    }, [boardName]);

    const boardNameInputElement = useRef<HTMLInputElement>(null);

    const [updateBoardName, { loading: updateBoardNameLoading }] = useMutation(UPDATE_BOARD_NAME, {
        variables: {
            id: boardId,
            name: editText,
        },
        refetchQueries: ['getBoard'],
    });

    const onSave = () => {
        if (editText !== boardName) {
            updateBoardName().then(() => {
                setEditMode(false);
                setEditingCard(false);
            });
        } else {
            setEditMode(false);
            setEditingCard(false);
        }
    };

    return (
        <>
            {editMode ? (
                <OutlinedInput
                    sx={styles.input}
                    value={editText}
                    ref={boardNameInputElement}
                    onBlur={() => {
                        // needs timeout to allow the Save button to be clicked
                        setTimeout(() => {
                            setEditMode(false);
                            setEditingCard(false);
                            setEditText(boardName);
                        }, 100);
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
                    }}
                    autoFocus
                    endAdornment={
                        <InputAdornment position='end'>
                            <Button variant='contained' onClick={onSave} disabled={updateBoardNameLoading}>
                                Save
                            </Button>
                        </InputAdornment>
                    }
                    {...inputProps}
                />
            ) : (
                <Stack direction='row' spacing={1} sx={styles.headerContainer}>
                    <Typography variant='h2' sx={styles.header}>
                        {boardName}
                    </Typography>
                    <IconButton
                        onClick={() => {
                            setEditMode(true);
                            setEditingCard(true);
                        }}
                        disabled={editingCard}
                    >
                        <EditOutlined />
                    </IconButton>
                </Stack>
            )}
        </>
    );
};

export default EditableBoardName;
