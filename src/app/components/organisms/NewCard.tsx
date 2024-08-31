import { useMutation } from '@apollo/client';
import { CircularProgress, Card as MuiCard, CardProps as MuiCardProps } from '@mui/material';
import { useState } from 'react';

import { CREATE_CARD } from '../../graph/cards/queries.js';
import ClearableInputText from '../molecules/ClearableInputText.js';
import { ThemeColor } from '../../helpers/theme.js';
import { useAuthStoreToken } from '../../store/AuthStore.js';

export interface NewCardProps extends MuiCardProps {
    boardId: number;
    columnId: number;
    themeColor: ThemeColor;
    setAddingCard: (adding: boolean) => void;
    editingCard: boolean;
    setEditingCard: (editing: boolean) => void;
}

const NewCard = ({ boardId, columnId, themeColor, setAddingCard, editingCard, setEditingCard }: NewCardProps) => {
    const styles = {
        card: {
            width: 'calc(100% - 16px)',
            borderRadius: '8px',
            backgroundColor: themeColor?.colors?.secondary?.shadow || '#0080ff',
            color: '#fff',
            padding: '8px',
            display: 'contents',
            minHeight: '100%',
        },
    };

    const token = useAuthStoreToken();

    const [cardText, setCardText] = useState<string>('');

    const [createCard, { loading: createCardLoading }] = useMutation(CREATE_CARD, {
        refetchQueries: ['getBoard'],
        context: {
            headers: token
                ? {
                      authorization: `Bearer ${token}`,
                  }
                : {},
        },
    });

    const onSave = async (inputText: string) => {
        if (inputText !== '') {
            await createCard({ variables: { boardId, columnId, text: inputText } });
        }

        setCardText('');
        setAddingCard(false);
        setEditingCard(false);
    };

    const onCancel = () => {
        setCardText('');
        setAddingCard(false);
        setEditingCard(false);
    };

    return (
        <MuiCard id={`cardBase-new`} sx={styles.card}>
            {createCardLoading ? (
                <CircularProgress />
            ) : (
                <ClearableInputText
                    edit={true}
                    newCard={true}
                    text={cardText}
                    setText={setCardText}
                    editingCard={editingCard}
                    setEditingCard={setEditingCard}
                    onSave={onSave}
                    onCancel={onCancel}
                />
            )}
        </MuiCard>
    );
};

export default NewCard;
