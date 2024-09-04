import { Alert, TextField, TextFieldProps } from '@mui/material';

import { LoginFormFieldProps } from '../../../helpers/types.js';

const LoginFormField = ({
    type,
    placeholder,
    name,
    validationError,
    register,
    ...textFieldProps
}: LoginFormFieldProps & TextFieldProps) => {
    return (
        <>
            <TextField
                inputProps={{ type, placeholder, ...register(name, { required: true }) }}
                error={!!validationError}
                {...textFieldProps}
            />
            {validationError && <Alert severity='error'>{validationError.message}</Alert>}
        </>
    );
};

export default LoginFormField;
