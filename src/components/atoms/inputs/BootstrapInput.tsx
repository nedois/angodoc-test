import React from 'react';
import { FormHelperText, makeStyles, colors, darken } from '@material-ui/core';

import { Theme } from 'src/theme';

type BootstrapInputProps = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> & {
  error?: boolean;
  fullWidth?: boolean;
  disabled?: boolean;
  helperText?: string | boolean;
};

interface BootstrapInputStyleProps {
  error?: boolean;
  fullWidth?: boolean;
  disabled?: boolean;
}

const BootstrapInput: React.FC<BootstrapInputProps> = ({
  error,
  fullWidth,
  helperText,
  disabled,
  ...rest
}) => {
  const classes = useStyles({ error, disabled, fullWidth });

  return (
    <>
      <input className={classes.root} {...rest} />
      {error && (
        <FormHelperText error variant="filled">
          {helperText}
        </FormHelperText>
      )}
    </>
  );
};

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    borderRadius: 4,
    position: 'relative',
    border: '1px solid',
    borderColor: (props: BootstrapInputStyleProps) => (props.error ? colors.red[500] : '#ced4da'),
    fontSize: 16,
    width: (props: BootstrapInputStyleProps) => (props.fullWidth ? '100%' : 'auto'),
    padding: '18.5px 14px',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    backgroundColor: (props: BootstrapInputStyleProps) =>
      props.disabled
        ? darken(theme.palette.background.default, 0.1)
        : theme.palette.background.default,
    color: (props: BootstrapInputStyleProps) =>
      props.disabled ? darken(theme.palette.text.primary, 0.1) : theme.palette.text.primary,
    '&:focus': {
      outline: 'none',
      borderColor: (props: BootstrapInputStyleProps) =>
        props.error ? colors.red[500] : theme.palette.primary.main,
      borderWidth: 2,
    },
  },
}));

export default BootstrapInput;
