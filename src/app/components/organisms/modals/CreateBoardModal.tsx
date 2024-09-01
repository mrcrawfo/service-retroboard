import { ChangeEvent, useMemo, useRef, useState } from 'react';
import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogProps,
    DialogTitle,
    Grid,
    OutlinedInput,
} from '@mui/material';
import { useMutation, useQuery } from '@apollo/client';

import { CREATE_BOARD } from '../../../graph/board/queries.js';
import { useAuthStoreToken } from '../../../store/AuthStore.js';
import BoardThumbnnail from '../../molecules/BoardThumbnail.js';
import { BoardPreset as BoardPresetType } from '../../../../entities/BoardPreset.js';
import { GET_BOARD_PRESETS } from '../../../graph/boardPresets/queries.js';

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

    const token = useAuthStoreToken();

    const { data: boardPresetsData } = useQuery(GET_BOARD_PRESETS, {
        context: {
            headers: token
                ? {
                      authorization: `Bearer ${token}`,
                  }
                : {},
        },
    });

    const boardPresets = useMemo(() => boardPresetsData?.getBoardPresets || [], [boardPresetsData]);

    console.log('boardPresets');
    console.log(boardPresets);

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
                {boardPresets?.length > 0 && (
                    <Grid container spacing={2}>
                        {boardPresets?.map((boardPreset: BoardPresetType) => (
                            <Grid key={boardPreset.id} item xs={3}>
                                <BoardThumbnnail
                                    boardPreset={boardPreset}
                                    // selectedBoardPreset={selectedBoardPreset}
                                    // setSelectedBoardPreset={setSelectedBoardPreset}
                                />
                            </Grid>
                        ))}
                    </Grid>  
                )}
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
