import { TextField, TextFieldProps } from '@mui/material';

import { RegisterFormFieldProps } from '../../helpers/types.js';

const RegisterFormField = ({
    type,
    placeholder,
    name,
    validationError,
    register,
    ...textFieldProps
}: RegisterFormFieldProps & TextFieldProps) => {
    return (
        <>
            <TextField
                inputProps={{ type, placeholder, ...register(name, { required: true }) }}
                error={!!validationError}
                {...textFieldProps}
            />
        </>
    );
};

export default RegisterFormField;
