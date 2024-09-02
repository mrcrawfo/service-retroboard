import { ChangeEvent, SyntheticEvent, useEffect, useMemo, useRef, useState } from 'react';
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogProps,
    DialogTitle,
    Grid,
    OutlinedInput,
    Tab,
    Tabs,
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

type GroupedBoardType = {
    boardType: string;
    boardPresets: BoardPresetType[];
};

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

    const groupedBoardPresets = useMemo(() => {
        const data: GroupedBoardType[] = [];
        const allBoardPresets = boardPresetsData?.getBoardPresets || [];
        const allBoardTypes: string[] = allBoardPresets.map((boardPreset: BoardPresetType) => boardPreset.type);
        const uniqueBoardTypes: string[] = [...new Set(allBoardTypes)];
        for (const boardType of uniqueBoardTypes) {
            console.log('boardType');
            console.log(boardType);
            data.push({
                boardType,
                boardPresets: allBoardPresets.filter((boardPreset: BoardPresetType) => boardPreset.type === boardType),
            });
        }
        return data;
    }, [boardPresetsData]);

    useEffect(() => {
        if (groupedBoardPresets.length > 0) {
            setSelectedBoardType(groupedBoardPresets[0].boardType);
            setSelectedBoardPreset(groupedBoardPresets[0].boardPresets[0]);
            setSelectedGroupedBoardPresets(groupedBoardPresets[0].boardPresets);
        }
    }, [groupedBoardPresets]);

    console.log('groupedBoardPresets');
    console.log(groupedBoardPresets);

    const [selectedBoardType, setSelectedBoardType] = useState<string>();
    const [selectedBoardPreset, setSelectedBoardPreset] = useState<BoardPresetType>();
    const [selectedGroupedBoardPresets, setSelectedGroupedBoardPresets] = useState<BoardPresetType[]>();
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

    const handleGroupedBoardChange = (_event: SyntheticEvent, newValue: string) => {
        const groupedBoardType = groupedBoardPresets.find((groupedBoard) => groupedBoard.boardType === newValue);
        setSelectedBoardType(newValue);
        setSelectedBoardPreset(groupedBoardType.boardPresets[0]);
        setSelectedGroupedBoardPresets(groupedBoardType.boardPresets);
    };

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
                {groupedBoardPresets?.length > 0 && selectedBoardType && selectedBoardPreset && (
                    <>
                        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                            <Tabs value={selectedBoardType} onChange={handleGroupedBoardChange}>
                                {groupedBoardPresets.map((groupedBoard: GroupedBoardType) => (
                                    <Tab
                                        key={groupedBoard.boardType}
                                        label={groupedBoard.boardType}
                                        value={groupedBoard.boardType}
                                    />
                                ))}
                            </Tabs>
                        </Box>
                        <Grid container spacing={2}>
                            {selectedGroupedBoardPresets.map((boardPreset: BoardPresetType) => (
                                <Grid key={boardPreset.id} item xs={3}>
                                    <BoardThumbnnail
                                        boardPreset={boardPreset}
                                        selected={boardPreset.id === selectedBoardPreset.id}
                                        setSelectedBoardPreset={setSelectedBoardPreset}
                                    />
                                </Grid>
                            ))}
                        </Grid>
                    </>
                )}
            </DialogContent>
            <DialogActions>
                <Button variant='outlined' onClick={handleCloseModal}>
                    Cancel
                </Button>
                <Button
                    variant='contained'
                    onClick={onCreateBoard}
                    disabled={!selectedBoardPreset || createBoardLoading}
                >
                    Create Board
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default CreateBoardModal;
