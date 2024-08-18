import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { Card as MuiCard, CardProps as MuiCardProps, CircularProgress } from '@mui/material';

import ClearableInputText from '../molecules/ClearableInputText';
import { CREATE_CARD } from '../../graph/cards/queries';

export interface NewCardProps extends MuiCardProps {
    boardId: number;
    columnId: number;
    setAddingCard: (adding: boolean) => void;
}

const NewCard = ({
    boardId,
    columnId,
    setAddingCard,
}: NewCardProps) => {
    const styles = {
        card: {
            width: 'calc(100% - 16px)',
            borderRadius: '8px',
            backgroundColor: '#0080ff',
            color: '#fff',
            padding: '8px',
        },
    };

    const [cardText, setCardText] = useState<string>('');

    const [createCard, { loading: createCardLoading }] = useMutation(CREATE_CARD, {
        variables: {
            boardId,
            columnId,
            text: cardText,
        },
        refetchQueries: ['getBoard'],
    });

    const onSave = () => {
        if (cardText !== '') {
            createCard().then(() => {
                setCardText('');
                setAddingCard(false);
            });
        } else {
            setCardText('');
            setAddingCard(false);
        }
    };

    return (
        <MuiCard id={`card-new`} sx={styles.card}>
            { createCardLoading ? (
                    <CircularProgress />
                ) : (
                    <ClearableInputText edit={true} text={cardText} onSave={onSave} setText={setCardText} />
                )
            }
        </MuiCard>
    );
};

export default NewCard;
