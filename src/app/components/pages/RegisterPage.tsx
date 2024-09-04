import { useMutation } from '@apollo/client';
import { Link, useNavigate } from '@tanstack/react-router';
import { useForm } from 'react-hook-form';
import { Alert, Box, Container, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { zodResolver } from '@hookform/resolvers/zod';

import { REGISTER } from '../../graph/auth/queries.js';
import { useAuthStoreActions } from '../../store/AuthStore.js';
import { RegisterFormData, RegisterSchema, ValidRegisterFieldNames } from '../../helpers/types.js';
import RegisterFormField from '../forms/RegisterFormField.jsx';

export interface RegisterPageProps {}

const RegisterPage = ({}: RegisterPageProps) => {
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
    } = useForm<RegisterFormData>({
        mode: 'onChange',
        resolver: zodResolver(RegisterSchema),
    });

    const navigate = useNavigate();

    const { setUser, setToken } = useAuthStoreActions();

    const login = (loginUser: any, loginToken: string) => {
        setUser(loginUser);
        setToken(loginToken);
    };

    const [registerUser, { loading: registerLoading, error: registerError }] = useMutation(REGISTER);

    const onSubmit = async (data: RegisterFormData) => {
        try {
            const response = await registerUser({
                variables: data,
            });

            const { errors = {} } = response.data;

            const fieldErrorMapping: Record<string, ValidRegisterFieldNames> = {
                username: 'username',
                email: 'email',
                password: 'password',
                confirmPassword: 'confirmPassword',
            };

            const fieldWithError = Object.keys(fieldErrorMapping).find((field) => errors[field]);

            if (fieldWithError) {
                setError(fieldErrorMapping[fieldWithError], {
                    type: 'server',
                    message: errors[fieldWithError],
                });
            }

            console.log('response');
            console.log(response);

            if (response.data?.register) {
                const user = {
                    id: response.data.register.user.id,
                    username: response.data.register.user.username,
                    email: response.data.register.user.email,
                };

                const token = response.data.register.token;

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
                Sign up
            </Typography>
            <Box component='form' noValidate onSubmit={handleSubmit(onSubmit)} sx={{ width: '25vw', mt: 1 }}>
                <RegisterFormField
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
                    autoComplete='one-time-code'
                    autoFocus
                />
                <RegisterFormField
                    type='email'
                    placeholder='Email Address'
                    name='email'
                    register={register}
                    validationError={errors.email}
                    margin='normal'
                    required
                    fullWidth
                    id='email'
                    label='Email'
                    autoComplete='one-time-code'
                />
                <RegisterFormField
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
                    autoComplete='one-time-code'
                />
                <RegisterFormField
                    type='password'
                    placeholder='Confirm Password'
                    name='confirmPassword'
                    register={register}
                    validationError={errors.confirmPassword}
                    margin='normal'
                    required
                    fullWidth
                    id='confirmPassword'
                    label='Confirm Password'
                    autoComplete='one-time-code'
                />
                {registerError && (
                    <Alert severity='error'>
                        <b>Could not complete new user registration:</b>
                        <p>{registerError.message}</p>
                    </Alert>
                )}
                <LoadingButton
                    loading={registerLoading}
                    type='submit'
                    fullWidth
                    variant='contained'
                    sx={{ mt: 3, mb: 2 }}
                >
                    Register
                </LoadingButton>
                <Typography variant='body2' align='center'>
                    Already a member? <Link to='/login'>Sign in</Link>
                </Typography>
            </Box>
        </Container>
    );
};

export default RegisterPage;
