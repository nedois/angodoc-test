import React from 'react';

import { Radio, RadioGroup, FormControlLabel } from '@material-ui/core';

const renderOptions = (options: any) => {
  return options.map((option: any) => (
    <FormControlLabel key={option} value={option} control={<Radio />} label={option} />
  ));
};

interface FormikRadioGroupProps {
  field: any;
  form: { touched: any; errors: any };
  name: any;
  options?: any;
  children?: any;
}

const FormikRadioGroup: React.FC<FormikRadioGroupProps> = ({
  field,
  form: { touched, errors },
  name,
  options,
  children,
  ...props
}) => {
  const fieldName = name || field.name;

  return (
    <>
      <RadioGroup {...field} {...props} name={fieldName}>
        {/* Here you either map over the props and render radios from them,
         or just render the children if you're using the function as a child */}
        {options ? renderOptions(options) : children}
      </RadioGroup>

      {touched[fieldName] && errors[fieldName] && (
        // <span style={{ color: 'red', fontFamily: 'sans-serif' }}>{errors[fieldName]}</span>
        <span style={{ color: 'red' }}>{errors[fieldName]}</span>
      )}
    </>
  );
};

export default FormikRadioGroup;
