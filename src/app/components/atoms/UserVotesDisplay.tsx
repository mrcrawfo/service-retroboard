import { Stack, Typography } from '@mui/material';

export interface BoardSortSelectProps {
    userVotes: number[];
    boardVotesAllowed: number;
}

const BoardSortSelect = ({ userVotes, boardVotesAllowed }: BoardSortSelectProps) => {
    const styles = {
        typography: {
            marginTop: '4px',
        },
    };

    return (
        <Stack direction='row' spacing={1}>
            <Typography variant='h6' style={styles.typography}>
                Votes Cast: {userVotes.length}
            </Typography>
            <Typography variant='h6' style={styles.typography}>
                |
            </Typography>
            <Typography variant='h6' style={styles.typography}>
                Votes Remaining: {boardVotesAllowed - userVotes.length}
            </Typography>
        </Stack>
    );
};

export default BoardSortSelect;
