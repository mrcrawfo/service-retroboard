import { ChangeEvent, useRef, useState } from 'react';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogProps,
    DialogTitle,
    OutlinedInput,
    Stack,
} from '@mui/material';
import { useMutation } from '@apollo/client';

import { CREATE_BOARD } from '../../../graph/board/queries.js';
import { useAuthStore } from '../../../store/AuthStore.js';

export interface CreateBoardModalProps extends DialogProps {
    open: boolean;
    handleCloseModal: () => void;
}

const CreateBoardModal = ({ open, handleCloseModal, ...dialogProps }: CreateBoardModalProps) => {
    const styles = {
        modalStack: {
            width: '100%',
        },
        inputText: {
            width: '100%',
            minHeight: '40px',
            borderRadius: '2px',
            backgroundColor: '#fff',
            color: '#000',
            marginBottom: '12px',
        },
    };

    const token = useAuthStore((state) => state.token);

    const [selectedBoardPreset, setSelectedBoardPreset] = useState<string>('');
    const [boardName, setBoardName] = useState<string>('');

    const boardNameInputRef = useRef<HTMLInputElement>(null);

    const [createBoard, { loading: createBoardLoading }] = useMutation(CREATE_BOARD, {
        variables: {
            // columns: selectedBoardPreset.columns,
            // name: boardNameInputRef.current?.value,
        },
        context: {
            headers: token
                ? {
                      authorization: `Bearer ${token}`,
                  }
                : {},
        },
    });

    const onCreateBoard = () => {
        createBoard().then(() => {
            handleCloseModal();
        });
    };

    return (
        <Dialog open={open} onClose={handleCloseModal} maxWidth='md' fullWidth {...dialogProps}>
            <DialogTitle sx={{ lineHeight: 1, mb: 3 }}>Create New Board</DialogTitle>
            <DialogContent>
                <OutlinedInput
                    sx={styles.inputText}
                    value={boardName}
                    ref={boardNameInputRef}
                    onFocus={(e) =>
                        e.currentTarget.setSelectionRange(e.currentTarget.value.length, e.currentTarget.value.length)
                    }
                    autoFocus
                    onChange={(event: ChangeEvent<HTMLInputElement>) => setBoardName(event.target.value)}
                />
                <Stack direction='column' spacing={2} sx={styles.modalStack}>
                    <Button variant='contained' onClick={() => setSelectedBoardPreset('A')}>
                        A
                    </Button>
                    <Button variant='contained' onClick={() => setSelectedBoardPreset('B')}>
                        B
                    </Button>
                    <Button variant='contained' onClick={() => setSelectedBoardPreset('C')}>
                        C
                    </Button>
                    <Button variant='contained' onClick={() => setSelectedBoardPreset('D')}>
                        D
                    </Button>
                </Stack>
            </DialogContent>
            <DialogActions>
                <Button variant='outlined' onClick={handleCloseModal}>
                    Cancel
                </Button>
                <Button
                    variant='contained'
                    onClick={onCreateBoard}
                    disabled={!selectedBoardPreset || selectedBoardPreset === '' || createBoardLoading}
                >
                    Create Board
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default CreateBoardModal;
