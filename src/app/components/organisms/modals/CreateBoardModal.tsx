import { ChangeEvent, SyntheticEvent, useEffect, useMemo, useRef, useState } from 'react';
import {
    Box,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogProps,
    DialogTitle,
    OutlinedInput,
    Stack,
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
        presetsContainer: {
            maxHeight: '40vh',
            minHeight: '40vh',
            overflowY: 'scroll',
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

    const [selectedBoardType, setSelectedBoardType] = useState<string>();
    const [selectedBoardPreset, setSelectedBoardPreset] = useState<BoardPresetType>();
    const [selectedGroupedBoardPresets, setSelectedGroupedBoardPresets] = useState<BoardPresetType[]>();
    const [boardName, setBoardName] = useState<string>('');

    const boardNameInputRef = useRef<HTMLInputElement>(null);

    const [createBoard, { loading: createBoardLoading }] = useMutation(CREATE_BOARD, {
        context: {
            headers: token
                ? {
                      authorization: `Bearer ${token}`,
                  }
                : {},
        },
        // refetchQueries: ['GetBoardsByUserId'],
        refetchQueries: ['GetBoards'],
    });

    const handleGroupedBoardChange = (_event: SyntheticEvent, newValue: string) => {
        const groupedBoardType = groupedBoardPresets.find((groupedBoard) => groupedBoard.boardType === newValue);
        setSelectedBoardType(newValue);
        setSelectedBoardPreset(groupedBoardType.boardPresets[0]);
        setSelectedGroupedBoardPresets(groupedBoardType.boardPresets);
    };

    const onCreateBoard = () => {
        createBoard({
            variables: {
                name: boardNameInputRef.current?.value,
                columns: selectedBoardPreset.columns.map((column) => {
                    const { __typename, id, ...rest } = column;
                    return rest;
                }),
                votesAllowed: selectedBoardPreset.votes,
            },
        }).then(() => {
            handleCloseModal();
        });
    };

    return (
        <Dialog open={open} onClose={handleCloseModal} maxWidth='lg' fullWidth {...dialogProps}>
            <DialogTitle sx={{ lineHeight: 1, mb: 1 }}>Create New Board</DialogTitle>
            <DialogContent>
                <OutlinedInput
                    sx={styles.inputText}
                    value={boardName}
                    inputRef={boardNameInputRef}
                    placeholder='Enter board name'
                    onChange={(event: ChangeEvent<HTMLInputElement>) => setBoardName(event.target.value)}
                />
                {groupedBoardPresets?.length > 0 && selectedBoardType && selectedBoardPreset && (
                    <>
                        <Box sx={{ borderBottom: 1, borderColor: 'divider', marginBottom: '8px' }}>
                            <Tabs value={selectedBoardType} onChange={handleGroupedBoardChange}>
                                {groupedBoardPresets.map((groupedBoard: GroupedBoardType) => (
                                    <Tab
                                        key={groupedBoard.boardType}
                                        label={`${groupedBoard.boardType} (${groupedBoard.boardPresets.length})`}
                                        value={groupedBoard.boardType}
                                    />
                                ))}
                            </Tabs>
                        </Box>
                        <Stack direction='column' spacing={0} sx={styles.presetsContainer}>
                            {selectedGroupedBoardPresets.map((boardPreset: BoardPresetType) => (
                                <BoardThumbnnail
                                    key={boardPreset.id}
                                    boardPreset={boardPreset}
                                    selected={boardPreset.id === selectedBoardPreset.id}
                                    setSelectedBoardPreset={setSelectedBoardPreset}
                                    disabled={createBoardLoading}
                                />
                            ))}
                        </Stack>
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
                    disabled={!selectedBoardPreset || boardNameInputRef.current?.value === '' || createBoardLoading}
                >
                    Create Board
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default CreateBoardModal;
