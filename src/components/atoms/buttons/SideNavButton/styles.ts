import { makeStyles } from '@material-ui/core';

import { Theme } from 'src/theme';

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    color: theme.palette.text.primary,
    padding: '10px 8px',
    justifyContent: 'flex-start',
    textTransform: 'none',
    letterSpacing: 0,
    width: '100%',
    fontWeight: theme.typography.fontWeightRegular,
    '& $title': {
      fontWeight: theme.typography.fontWeightMedium,
    },
  },
  active: {
    color: theme.palette.primary.main,
    '& $title': {
      fontWeight: theme.typography.fontWeightMedium,
    },
    '& $icon': {
      color: theme.palette.primary.main,
    },
  },
  icon: {
    alignSelf: 'flex-start',
    display: 'flex',
    alignItems: 'center',
    flexShrink: 0,
    marginRight: theme.spacing(1),
  },
  title: {
    marginRight: 'auto',
  },
}));

export default useStyles;
