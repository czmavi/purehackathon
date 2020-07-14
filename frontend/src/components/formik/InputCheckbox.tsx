import React from 'react';
import { FormikProps } from 'formik';
import { Checkbox } from '@material-ui/core';

interface IProps {
  field: any;
  form: FormikProps<any>;
}

export const InputCheckboxComponent: React.FC<IProps> = ({
  field, // { name, value, onChange, onBlur }
  form: { touched, errors }, // also values, setXXXX, handleXXXX, dirty, isValid, status, etc.
  ...props
}) => (
  <Checkbox
    onChange={field.onChange}
    onBlur={field.onBlur}
    checked={field.value}
    id={field.name}
    name={field.name}
    {...props}
  />
);
