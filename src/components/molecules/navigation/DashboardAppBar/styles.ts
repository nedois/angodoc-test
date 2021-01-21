import { makeStyles } from '@material-ui/core';

import { Theme } from 'src/theme';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    backgroundColor: theme.palette.background.default,
    zIndex: theme.zIndex.drawer + 100,
  },
  toolbar: {
    height: 64,
  },
  logo: {
    marginRight: theme.spacing(4),
  },
  divider: {
    width: 1,
    height: 32,
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
  },
}));

export default useStyles;
