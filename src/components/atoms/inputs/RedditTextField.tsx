import React from 'react';
import { makeStyles, OutlinedInputProps, TextField, TextFieldProps, colors } from '@material-ui/core';

import { Theme } from 'src/theme';

const RedditTextField = (props: TextFieldProps): React.ReactElement => {
  const classes = useDocumentInputStyles();

  return <TextField InputProps={{ classes, disableUnderline: true } as Partial<OutlinedInputProps>} {...props} />;
};

const useDocumentInputStyles = makeStyles((theme: Theme) => ({
  input: {
    border: 'none',
    overflow: 'hidden',
    backgroundColor: colors.common.white,
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    '&:hover, &:focused': {
      backgroundColor: colors.common.white,
      borderColor: theme.palette.primary.main,
    },
  },
}));

export default RedditTextField;
