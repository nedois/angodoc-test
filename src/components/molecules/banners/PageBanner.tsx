import React from 'react';
import { IconType } from 'react-icons';

import { Box, Typography, makeStyles, fade } from '@material-ui/core';

import { Theme } from 'src/theme';

export interface PageBannerProps {
  illustration: IconType;
  title: string;
  description: string;
}

const PageBanner: React.FC<PageBannerProps> = ({ title, description, illustration, children, ...rest }) => {
  const classes = useStyles();
  const Illustration = illustration;

  return (
    <Box className={classes.root}>
      <Illustration className={classes.illustration} />
      <Typography variant="h1" component="h1">
        {title}
      </Typography>
      <Typography variant="h4" component="p">
        {description}
      </Typography>
      {children}
    </Box>
  );
};

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    paddingTop: theme.spacing(2),
    minHeight: 240,
    width: '100%',
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignContent: 'center',
    alignItems: 'center',
    textAlign: 'center',
    backgroundColor: fade(theme.palette.primary.main, 0.03),
  },
  illustration: {
    fontSize: 92,
    marginBottom: theme.spacing(2),
    backgroundColor: fade(theme.palette.primary.main, 0.15),
    color: theme.palette.primary.main,
    padding: theme.spacing(2),
    borderRadius: 50,
  },
}));

export default PageBanner;
