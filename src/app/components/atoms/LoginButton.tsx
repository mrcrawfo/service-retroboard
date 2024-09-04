import { Button, ButtonProps } from '@mui/material';
import { Link, useNavigate } from '@tanstack/react-router';
import { useApolloClient } from '@apollo/client';

import { useAuthStoreUser, useAuthStoreActions } from '../../store/AuthStore.js';

export interface LoginButtonProps extends ButtonProps {}

const LoginButton = ({ ...buttonProps }: LoginButtonProps) => {
    const styles = {
        button: {
            marginTop: '-8px',
            position: 'absolute',
            right: '8px',
        },
    };

    const { setUser, setToken } = useAuthStoreActions();
    const user = useAuthStoreUser();

    const client = useApolloClient();

    const logout = () => {
        setUser(null);
        setToken(null);

        client.cache.reset();
    };

    const navigate = useNavigate();

    const onLogoutClick = () => {
        logout();
        navigate({ to: '/login' });
    };

    return (
        <>
            {user ? (
                // TODO: Link to User profile page instead (?)
                <Button variant='text' sx={styles.button} onClick={onLogoutClick} {...buttonProps}>
                    Logout
                </Button>
            ) : (
                <Link to='/login'>
                    <Button variant='text' sx={styles.button} {...buttonProps}>
                        Login
                    </Button>
                </Link>
            )}
        </>
    );
};

export default LoginButton;
