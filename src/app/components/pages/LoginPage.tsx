import { FormEvent, useState } from 'react';
import { useMutation } from '@apollo/client';
import { useNavigate } from '@tanstack/react-router';
import { Alert, Box, Container, TextField, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';

import { LOGIN } from '../../graph/auth/queries.js';
import { useAuth } from '../../hooks/useAuth.js';
import { User } from 'src/entities/User.js';
import { SaveOptions, RemoveOptions } from 'typeorm';

export interface LoginPageProps {}

const LoginPage = ({}: LoginPageProps) => {
    const styles = {
        container: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
        },
    };

    const navigate = useNavigate();

    const { login } = useAuth();

    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');

    const [loginUser, { loading: loginLoading, error: loginError }] = useMutation(LOGIN, {
        variables: {
            username,
            password,
        },
    });

    const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const data = new FormData(event.currentTarget);

        console.log({
            username: data.get('username'),
            password: data.get('password'),
        });

        setUsername((data.get('username') as string) || '');
        setPassword((data.get('password') as string) || '');

        loginUser().then((res) => {
            console.log(res);

            login({
                id: res.data.login.id,
                username: res.data.login.username,
                firstName: res.data.login.firstName,
                lastName: res.data.login.lastName,
                email: res.data.login.email,
                password: '',
                hasId: function (): boolean {
                    throw new Error('Function not implemented.');
                },
                save: function (_options?: SaveOptions): Promise<User> {
                    throw new Error('Function not implemented.');
                },
                remove: function (_options?: RemoveOptions): Promise<User> {
                    throw new Error('Function not implemented.');
                },
                softRemove: function (_options?: SaveOptions): Promise<User> {
                    throw new Error('Function not implemented.');
                },
                recover: function (_options?: SaveOptions): Promise<User> {
                    throw new Error('Function not implemented.');
                },
                reload: function (): Promise<void> {
                    throw new Error('Function not implemented.');
                },
            });

            // TODO: Handle login error

            navigate({ to: '/boards' });
        });
    };

    return (
        <Container sx={styles.container}>
            <Typography component='h1' variant='h5'>
                Sign in
            </Typography>
            <Box component='form' onSubmit={handleSubmit} noValidate sx={{ mt: 1 }}>
                <TextField
                    margin='normal'
                    required
                    fullWidth
                    id='username'
                    label='Username'
                    name='username'
                    autoComplete='username'
                    autoFocus
                    error={!!loginError}
                />
                <TextField
                    margin='normal'
                    required
                    fullWidth
                    name='password'
                    label='Password'
                    type='password'
                    id='password'
                    autoComplete='current-password'
                    error={!!loginError}
                />
                {/* <FormControlLabel control={<Checkbox value='remember' color='primary' />} label='Remember me' /> */}
                {loginError && <Alert severity='error'>Incorrect username or password</Alert>}
                <LoadingButton loading={loginLoading} type='submit' fullWidth variant='contained' sx={{ mt: 3, mb: 2 }}>
                    Sign In
                </LoadingButton>
            </Box>
        </Container>
    );
};

export default LoginPage;
