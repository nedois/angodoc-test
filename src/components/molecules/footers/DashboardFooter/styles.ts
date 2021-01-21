import { makeStyles } from '@material-ui/core';

import { Theme } from 'src/theme';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    backgroundColor: theme.palette.background.default,
    padding: theme.spacing(2),
  },
}));

export default useStyles;
