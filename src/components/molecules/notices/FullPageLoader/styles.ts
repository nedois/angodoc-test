import { makeStyles } from '@material-ui/core';

import { Theme } from 'src/theme';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    height: '100vh',
    width: '100vw',
    overflow: 'hidden',
  },
  loader: {
    '& > *': {
      display: 'inline-block',
      width: '15px',
      height: '15px',
      borderRadius: '15px',
      backgroundColor: theme.palette.primary.main,
      marginRight: theme.spacing(1),
    },

    '& div:nth-child(1)': {
      animation: '$loading 0.6s 0.1s linear infinite',
    },

    '& div:nth-child(2)': {
      animation: '$loading 0.6s 0.2s linear infinite',
    },

    '& div:nth-child(3)': {
      marginRight: 0,
      animation: '$loading 0.6s 0.3s linear infinite',
    },
  },
  '@keyframes loading': {
    '0%': { transform: 'translate(0, 0)' },
    '50%': { transform: 'translate(0, 15px)' },
    '100%': { transform: 'translate(0, 0)' },
  },
}));

export default useStyles;
