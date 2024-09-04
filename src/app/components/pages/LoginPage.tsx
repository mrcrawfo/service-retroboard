import { useMutation } from '@apollo/client';
import { Link, useNavigate } from '@tanstack/react-router';
import { useForm } from 'react-hook-form';
import { Alert, Box, Container, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { zodResolver } from '@hookform/resolvers/zod';

import { LOGIN } from '../../graph/auth/queries.js';
import { useAuthStoreActions } from '../../store/AuthStore.js';
import { LoginFormData, LoginSchema, ValidLoginFieldNames } from '../../helpers/types.js';
import LoginFormField from '../forms/LoginFormField.jsx';

export interface LoginPageProps {}

const LoginPage = ({}: LoginPageProps) => {
    const styles = {
        container: {
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
        },
    };

    const {
        register,
        handleSubmit,
        formState: { errors },
        setError,
    } = useForm<LoginFormData>({
        resolver: zodResolver(LoginSchema),
    });

    const navigate = useNavigate();

    const { setUser, setToken } = useAuthStoreActions();

    const login = (loginUser: any, loginToken: string) => {
        setUser(loginUser);
        setToken(loginToken);
    };

    const [loginUser, { loading: loginLoading, error: loginError }] = useMutation(LOGIN);

    const onSubmit = async (data: LoginFormData) => {
        try {
            const response = await loginUser({
                variables: data,
            });

            const { errors = {} } = response.data;

            const fieldErrorMapping: Record<string, ValidLoginFieldNames> = {
                username: 'username',
                password: 'password',
            };

            const fieldWithError = Object.keys(fieldErrorMapping).find((field) => errors[field]);

            if (fieldWithError) {
                setError(fieldErrorMapping[fieldWithError], {
                    type: 'server',
                    message: errors[fieldWithError],
                });
            }

            if (response.data?.login) {
                const user = {
                    id: response.data.login.user.id,
                    username: response.data.login.user.username,
                    email: response.data.login.user.email,
                };

                const token = response.data.login.token;

                login(user, token);

                navigate({ to: '/boards' });
            }
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <Container sx={styles.container}>
            <Typography component='h1' variant='h2'>
                Sign in
            </Typography>
            <Box component='form' noValidate onSubmit={handleSubmit(onSubmit)} sx={{ width: '25vw', mt: 1 }}>
                <LoginFormField
                    type='text'
                    placeholder='Username'
                    name='username'
                    register={register}
                    validationError={errors.username}
                    margin='normal'
                    required
                    fullWidth
                    id='username'
                    label='Username'
                    autoComplete='username'
                    autoFocus
                />
                <LoginFormField
                    type='password'
                    placeholder='Password'
                    name='password'
                    register={register}
                    validationError={errors.password}
                    margin='normal'
                    required
                    fullWidth
                    id='password'
                    label='Password'
                    autoComplete='current-password'
                />
                {loginError && <Alert severity='error'>Incorrect username or password</Alert>}
                <LoadingButton loading={loginLoading} type='submit' fullWidth variant='contained' sx={{ mt: 3, mb: 2 }}>
                    Sign In
                </LoadingButton>
                <Typography variant='body2' align='center'>
                    Not already a member? <Link to='/register'>Sign up</Link>
                </Typography>
            </Box>
        </Container>
    );
};

export default LoginPage;
