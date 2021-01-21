import { makeStyles } from '@material-ui/core';

import { Theme } from 'src/theme';

const drawerWidth = 256;
const appBarHeight = 64;

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    backgroundColor: theme.palette.background.dark,
    display: 'flex',
    minHeight: '100vh',
    overflow: 'hidden',
    width: '100%',
  },
  wrapper: {
    display: 'flex',
    flex: '1 1 auto',
    overflow: 'hidden',
    paddingTop: appBarHeight,
  },
  content: {
    flex: '1 1 auto',
    height: '100%',
    overflowX: 'hidden',
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: 0,
  },
  contentShift: {
    [theme.breakpoints.up('lg')]: {
      transition: theme.transitions.create('margin', {
        easing: theme.transitions.easing.easeOut,
        duration: theme.transitions.duration.enteringScreen,
      }),
      marginLeft: drawerWidth,
    },
  },
  sidenav: {
    width: drawerWidth,

    '&.desktop': {
      paddingTop: appBarHeight,
    },
  },
}));

export default useStyles;
