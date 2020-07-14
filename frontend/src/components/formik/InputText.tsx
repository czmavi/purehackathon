import React from 'react';
import { FormikProps } from 'formik';
import TextField from '@material-ui/core/TextField';

interface IProps {
  field: any;
  form: FormikProps<any>;
}

export const InputTextComponent: React.FC<IProps> = ({
  field, // { name, value, onChange, onBlur }
  form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
  ...props
}) => (
  <TextField
    variant="outlined"
    margin="normal"
    required
    fullWidth
    onChange={field.onChange}
    onBlur={field.onBlur}
    value={field.value}
    id={field.name}
    name={field.name}
    {...props}
  />
);
