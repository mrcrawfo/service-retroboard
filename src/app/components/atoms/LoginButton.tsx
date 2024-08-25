import { Button, ButtonProps } from '@mui/material';
import { Link, useNavigate } from '@tanstack/react-router';

import { useAuthStore } from '../../store/AuthStore.js';

export interface LoginButtonProps extends ButtonProps {}

const LoginButton = ({ ...buttonProps }: LoginButtonProps) => {
    const styles = {
        button: {
            marginTop: '-8px',
            position: 'absolute',
            right: '8px',
        },
    };

    const setUser = useAuthStore((state) => state.setUser);
    const setToken = useAuthStore((state) => state.setToken);
    const user = useAuthStore((state) => state.user);

    const logout = () => {
        setUser(null);
        setToken(null);
    };

    const navigate = useNavigate();

    const onLogoutClick = () => {
        logout();
        navigate({ to: '/' });
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
