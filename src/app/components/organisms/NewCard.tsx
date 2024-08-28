import { useMutation } from '@apollo/client';
import { CircularProgress, Card as MuiCard, CardProps as MuiCardProps } from '@mui/material';
import { useState } from 'react';

import { CREATE_CARD } from '../../graph/cards/queries.js';
import ClearableInputText from '../molecules/ClearableInputText.js';
import { useAuthStoreToken } from '../../store/AuthStore.js';

export interface NewCardProps extends MuiCardProps {
    boardId: number;
    columnId: number;
    setAddingCard: (adding: boolean) => void;
    setEditingCard: (editing: boolean) => void;
}

const NewCard = ({ boardId, columnId, setAddingCard, setEditingCard }: NewCardProps) => {
    const styles = {
        card: {
            width: 'calc(100% - 16px)',
            borderRadius: '8px',
            backgroundColor: '#0080ff',
            color: '#fff',
            padding: '8px',
        },
    };

    const token = useAuthStoreToken();

    const [cardText, setCardText] = useState<string>('');

    const [createCard, { loading: createCardLoading }] = useMutation(CREATE_CARD, {
        variables: {
            boardId,
            columnId,
            text: cardText,
        },
        refetchQueries: ['getBoard'],
        context: {
            headers: token
                ? {
                      authorization: `Bearer ${token}`,
                  }
                : {},
        },
    });

    const onSave = () => {
        if (cardText !== '') {
            createCard().then(() => {
                setCardText('');
                setAddingCard(false);
                setEditingCard(false);
            });
        } else {
            setCardText('');
            setAddingCard(false);
            setEditingCard(false);
        }
    };

    return (
        <MuiCard id={`cardBase-new`} sx={styles.card}>
            {createCardLoading ? (
                <CircularProgress />
            ) : (
                <ClearableInputText edit={true} text={cardText} onSave={onSave} setText={setCardText} />
            )}
        </MuiCard>
    );
};

export default NewCard;
