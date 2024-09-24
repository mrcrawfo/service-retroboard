import { FormControl, MenuItem, Select, SelectChangeEvent, Stack, Typography } from '@mui/material';

export interface BoardSortSelectProps {
    onChange: (event: SelectChangeEvent<string>) => void;
    value: string;
}

const BoardSortSelect = ({ onChange, value }: BoardSortSelectProps) => {
    const styles = {
        select: {
            width: '120px',
        },
    };

    return (
        <Stack direction='row' spacing={1}>
            <Typography variant='h6' style={{ marginTop: '4px' }}>
                Sort by:
            </Typography>
            <FormControl size='small'>
                <Select onChange={onChange} value={value} sx={styles.select}>
                    <MenuItem value='newest'>Newest</MenuItem>
                    <MenuItem value='votes'>Votes</MenuItem>
                    <MenuItem value='random'>Random</MenuItem>
                </Select>
            </FormControl>
        </Stack>
    );
};

export default BoardSortSelect;
