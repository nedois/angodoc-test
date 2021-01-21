import React from 'react';
import { FormHelperText, TextareaAutosize, TextareaAutosizeProps, makeStyles, colors, darken } from '@material-ui/core';

import { Theme } from 'src/theme';

interface BootstrapTextAreaStyleProps {
  error?: boolean;
  fullWidth?: boolean;
  disabled?: boolean;
}

type BootstrapTextAreaProps = TextareaAutosizeProps & {
  error?: boolean;
  fullWidth?: boolean;
  helperText?: string | boolean;
  disabled?: boolean;
};

const BootstrapTextArea: React.FC<BootstrapTextAreaProps> = ({ error, fullWidth, helperText, disabled, ...rest }) => {
  const classes = useStyles({ error, fullWidth, disabled });

  return (
    <>
      <TextareaAutosize className={classes.root} {...rest} />
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
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
    resize: 'vertical',
    borderColor: (props: BootstrapTextAreaStyleProps) => (props.error ? colors.red[500] : '#ced4da'),
    fontSize: 16,
    width: (props: BootstrapTextAreaStyleProps) => (props.fullWidth ? '100%' : 'auto'),
    padding: '18.5px 14px',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    backgroundColor: (props: BootstrapTextAreaStyleProps) =>
      props.disabled ? darken(theme.palette.background.default, 0.1) : theme.palette.background.default,
    color: (props: BootstrapTextAreaStyleProps) =>
      props.disabled ? darken(theme.palette.text.primary, 0.1) : theme.palette.text.primary,
    '&:focus': {
      outline: 'none',
      borderColor: (props: BootstrapTextAreaStyleProps) => (props.error ? colors.red[500] : theme.palette.primary.main),
      borderWidth: 2,
    },
  },
}));

export default BootstrapTextArea;
