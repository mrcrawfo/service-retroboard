import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { useNavigate } from '@tanstack/react-router';
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

    // const [username, setUsername] = useState('');
    // const [password, setPassword] = useState('');

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

            console.log('response');
            console.log(response);

            const { errors = {} } = response.data; // Destructure the 'errors' property from the response data

            // Define a mapping between server-side field names and their corresponding client-side names
            const fieldErrorMapping: Record<string, ValidLoginFieldNames> = {
                username: 'username',
                password: 'password',
            };

            // Find the first field with an error in the response data
            const fieldWithError = Object.keys(fieldErrorMapping).find((field) => errors[field]);

            // If a field with an error is found, update the form error state using setError
            if (fieldWithError) {
                // Use the ValidFieldNames type to ensure the correct field names
                setError(fieldErrorMapping[fieldWithError], {
                    type: 'server',
                    message: errors[fieldWithError],
                });
            }

            const user = {
                id: response.data.login.user.id,
                username: response.data.login.user.username,
                firstName: response.data.login.user.firstName,
                lastName: response.data.login.user.lastName,
                email: response.data.login.user.email,
            };

            const token = response.data.login.token;

            login(user, token);

            navigate({ to: '/boards' });
        } catch (error) {
            console.error(error);
        }
    };

    // const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    //     event.preventDefault();
    //     event.preventDefault();
    //     const data = new FormData(event.currentTarget);

    //     setUsername((data.get('username') as string) || '');
    //     setPassword((data.get('password') as string) || '');

    //     loginUser({
    //         variables: {
    //             username: (data.get('username') as string) || '',
    //             password: (data.get('password') as string) || '',
    //         },
    //     })
    //         .then((res) => {
    //             const user = {
    //                 id: res.data.login.user.id,
    //                 username: res.data.login.user.username,
    //                 firstName: res.data.login.user.firstName,
    //                 lastName: res.data.login.user.lastName,
    //                 email: res.data.login.user.email,
    //             };
    //             const token = res.data.login.token;

    //             login(user, token);

    //             navigate({ to: '/boards' });
    //         })
    //         .catch((e) => {
    //             console.error(e.message);
    //         });
    // };

    return (
        <Container sx={styles.container}>
            <Typography component='h1' variant='h5'>
                Sign in
            </Typography>
            <Box component='form' onSubmit={handleSubmit(onSubmit)} sx={{ mt: 1 }}>
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
                    // error={!!loginError}
                    error={!!errors.username}
                />
                {errors.username && <Alert severity='error'>{errors.username.message}</Alert>}
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
                    // error={!!loginError}
                    error={!!errors.password}
                />
                {errors.password && <Alert severity='error'>{errors.password.message}</Alert>}
                {/* <FormControlLabel control={<Checkbox value='remember' color='primary' />} label='Remember me' /> */}
                {/* {loginError && <Alert severity='error'>Incorrect username or password</Alert>} */}
                <LoadingButton loading={loginLoading} type='submit' fullWidth variant='contained' sx={{ mt: 3, mb: 2 }}>
                    Sign In
                </LoadingButton>
            </Box>
        </Container>
    );
};

export default LoginPage;
