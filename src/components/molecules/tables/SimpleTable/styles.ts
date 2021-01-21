import { makeStyles } from '@material-ui/core';

import { Theme } from 'src/theme';

const useStyles = makeStyles((theme: Theme) => ({
  root: {},
  cardHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(2),
    flexWrap: 'wrap',
    [theme.breakpoints.down('sm')]: {
      flexDirection: 'column',
      alignItems: 'flex-start',
    },
  },
  title: {
    marginBottom: 0,
    flexGrow: 1,
    [theme.breakpoints.down('sm')]: {
      marginRight: theme.spacing(2),
      marginBottom: theme.spacing(2),
    },
  },
  actions: {
    '& > *': {
      [theme.breakpoints.down('sm')]: {
        width: '100%',
      },
    },
    '& > :not(:last-child)': {
      marginRight: theme.spacing(2),
      [theme.breakpoints.down('sm')]: {
        marginBottom: theme.spacing(2),
      },
    },
  },
}));

export default useStyles;
