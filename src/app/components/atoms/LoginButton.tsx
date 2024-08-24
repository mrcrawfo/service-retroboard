import { useContext } from 'react';
import { Button, ButtonProps } from '@mui/material';
import { Link, useNavigate } from '@tanstack/react-router';

import { UserContext } from '../../hocs/UserContext.js';
// import { USER_AUTH } from '../../helpers/constants.js';
import { useAuth } from '../../hooks/useAuth.js';

export interface LoginButtonProps extends ButtonProps {}

const LoginButton = ({ ...buttonProps }: LoginButtonProps) => {
    const styles = {
        button: {
            marginTop: '-8px',
            position: 'absolute',
            right: '8px',
        },
    };

    const { logout } = useAuth();

    const { user } = useContext(UserContext);

    const navigate = useNavigate();

    const onLogoutClick = () => {
        // localStorage.removeItem(USER_AUTH);
        logout();
        navigate({ to: '/' });
    };

    console.log('user:', user);

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
