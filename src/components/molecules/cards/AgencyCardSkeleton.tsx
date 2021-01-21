import React from 'react';
import { Skeleton } from '@material-ui/lab';
import { Box, Typography, makeStyles, fade } from '@material-ui/core';

import { Theme } from 'src/theme';

const AgencyCardSkeleton: React.FC = () => {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <Typography variant="h3">
        <Skeleton />
      </Typography>
      <Box mt={2}>
        <Box display="flex">
          <Skeleton variant="circle" width={24} height={24} className={classes.icon} />
          <Typography variant="body1" className={classes.contactInfo}>
            <Skeleton />
          </Typography>
        </Box>
        <Box display="flex">
          <Skeleton variant="circle" width={24} height={24} className={classes.icon} />
          <Typography variant="body1" className={classes.contactInfo}>
            <Skeleton />
          </Typography>
        </Box>
        <Box display="flex">
          <Skeleton variant="circle" width={24} height={24} className={classes.icon} />
          <Typography variant="body1" className={classes.contactInfo}>
            <Skeleton />
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: 288,
    minHeight: '100%',
    borderRadius: 12,
    padding: theme.spacing(2),
    border: `1px solid ${fade(theme.palette.primary.main, 0.3)}`,
  },
  icon: {
    marginRight: theme.spacing(1),
  },
  contactInfo: {
    flexGrow: 1,
    marginBottom: theme.spacing(1),
  },
}));

export default AgencyCardSkeleton;
