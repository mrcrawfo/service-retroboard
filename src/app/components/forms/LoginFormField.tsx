import { TextField, TextFieldProps } from '@mui/material';

import { LoginFormFieldProps } from '../../helpers/types.js';

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
            <TextField inputProps={{ type, placeholder, ...register(name, { required: true }) }} {...textFieldProps} />
            {validationError && <span className='error-message'>{validationError.message}</span>}
        </>
    );
};

export default LoginFormField;
