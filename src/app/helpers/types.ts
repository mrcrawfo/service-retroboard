import { FieldError, UseFormRegister } from 'react-hook-form';
import { z, ZodType } from 'zod';

export type LoginFormData = {
    username?: string;
    password?: string;
};

export type RegisterFormData = {
    username?: string;
    email?: string;
    password?: string;
    confirmPassword?: string;
};

export type LoginFormFieldProps = {
    type: string;
    placeholder: string;
    name: ValidLoginFieldNames;
    register: UseFormRegister<LoginFormData>;
    validationError: FieldError | undefined;
};

export type RegisterFormFieldProps = {
    type: string;
    placeholder: string;
    name: ValidRegisterFieldNames;
    register: UseFormRegister<RegisterFormData>;
    validationError: FieldError | undefined;
};

export type ValidLoginFieldNames = 'username' | 'password';

export type ValidRegisterFieldNames = 'email' | 'username' | 'password' | 'confirmPassword';

export const LoginSchema: ZodType<LoginFormData> = z.object({
    username: z.string(),
    // .min(4, { message: 'Username is too short' }),
    password: z.string({
        required_error: 'required field',
        invalid_type_error: 'Password is required',
    }),
});

export const RegisterSchema: ZodType<RegisterFormData> = z
    .object({
        email: z
            .string({
                required_error: 'required field',
                invalid_type_error: 'Email is required',
            })
            .email({ message: 'Invalid email' }),
        username: z
            .string({
                required_error: 'required field',
                invalid_type_error: 'Username is required',
            })
            .min(3, { message: 'Username is too short' })
            .max(20, { message: 'Username is too long' }),
        password: z
            .string({
                required_error: 'required field',
                invalid_type_error: 'Password is required',
            })
            .min(8, { message: 'Password is too short' })
            .max(20, { message: 'Password is too long' }),
        confirmPassword: z
            .string({
                required_error: 'required field',
                invalid_type_error: 'Password Confirm is required',
            })
            .min(8, { message: 'Password is too short' })
            .max(20, { message: 'Password is too long' }),
    })
    .refine((data) => data.password === data.confirmPassword, {
        message: 'Passwords do not match',
        path: ['confirmPassword'], // path of error
    });
// .refine(async (data) => {
//     const user = await getUserByUsername({ variables: { username: data.username } });
//     return user ? { message: 'Username already exists', path: ['username'] } : null;
// ;
