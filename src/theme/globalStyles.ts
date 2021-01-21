import { createStyles, makeStyles } from '@material-ui/core';

import { Theme } from 'src/theme';
import colors from 'src/theme/colors';

export default makeStyles((theme: Theme) =>
  createStyles({
    '@global': {
      '*': {
        boxSizing: 'border-box',
        margin: 0,
        padding: 0,
      },
      html: {
        '-webkit-font-smoothing': 'antialiased',
        '-moz-osx-font-smoothing': 'grayscale',
        height: '100%',
        width: '100%',
      },
      body: {
        height: '100%',
        width: '100%',
        backgroundColor: theme.palette.background.default,
      },
      '#root': {
        height: '100%',
        width: '100%',
      },
      '#nprogress .spinner': {
        zIndex: 99999999,
      },
      '.SnackbarItem-variantError-21': {
        color: colors.md.common.white,
      },
      '.unorderedList': {
        listStyle: 'none',
        outline: 'none',
        '& li': {
          position: 'relative',
          paddingLeft: '1.6rem',
          marginBottom: '1rem',
          '&::before': {
            content: '"—"',
            color: theme.palette.primary.main,
            width: '15px',
            overflow: 'hidden',
            position: 'absolute',
            left: 0,
          },
        },
      },
      '.orderedList': {
        outline: 'none',
        counterReset: 'moona-counter',
        listStyle: 'none',
        '& li': {
          display: 'flex',
          alignItems: 'center',
          position: 'relative',
          paddingLeft: '2rem',
          marginBottom: '1rem',
          counterIncrement: 'moona-counter',
          '&::before': {
            content: 'counter(moona-counter)',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            width: '1.3rem',
            height: '1.3rem',
            fontSize: '0.9rem',
            backgroundColor: theme.palette.primary.main,
            color: theme.palette.primary.contrastText,
            borderRadius: 50,
            overflow: 'hidden',
            position: 'absolute',
            left: 0,
          },
        },
      },
    },
  }),
);
