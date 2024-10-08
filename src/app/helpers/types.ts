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
    username: z
        .string()
        .min(1, { message: 'Username is required' })
        .transform((value) => value || undefined),
    password: z
        .string()
        .min(1, { message: 'Password is required' })
        .transform((value) => value || undefined),
});

export const RegisterSchema: ZodType<RegisterFormData> = z
    .object({
        email: z.string().min(1, { message: 'Email is required' }).email({ message: 'Invalid email' }),
        username: z
            .string()
            .min(1, { message: 'Username is required' })
            .min(2, { message: 'Username is too short' })
            .max(20, { message: 'Username is too long' })
            .transform((value) => value || undefined),
        password: z
            .string()
            .min(1, { message: 'Password is required' })
            .min(8, { message: 'Password is too short' })
            .max(20, { message: 'Password is too long' })
            .transform((value) => value || undefined),
        confirmPassword: z
            .string()
            .min(1, { message: 'Password is required' })
            .transform((value) => value || undefined),
    })
    .superRefine(({ confirmPassword, password }, ctx) => {
        if (confirmPassword !== password) {
            ctx.addIssue({
                code: 'custom',
                message: 'The passwords did not match',
                path: ['confirmPassword'],
            });
        }
    });
