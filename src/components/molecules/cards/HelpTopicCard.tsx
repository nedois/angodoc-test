import React from 'react';
import Link from 'next/link';
import { IconType } from 'react-icons';

import { Box, Typography, makeStyles, fade } from '@material-ui/core';

import { Theme } from 'src/theme';

export interface HelpTopicCardProps {
  description: string;
  title: string;
  path: string;
  illustration: IconType;
}

const HelpTopicCard: React.FC<HelpTopicCardProps> = ({ title, description, path, illustration }) => {
  const classes = useStyles();
  const Illustration = illustration;

  return (
    <Link href={path} passHref>
      <Box className={classes.root}>
        <Box display="flex" justifyContent="center">
          <Illustration className={classes.illustration} />
        </Box>
        <Typography variant="body2" component="p" className={classes.cardLabel}>
          Catégoria
        </Typography>
        <Typography variant="h3" component="h3">
          {title}
        </Typography>
        <Typography variant="body1" component="p" className={classes.cardDescription}>
          {description}
        </Typography>
      </Box>
    </Link>
  );
};

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    maxWidth: 288,
    minHeight: '100%',
    borderRadius: 12,
    padding: theme.spacing(2),
    border: `1px solid ${fade(theme.palette.primary.main, 0.3)}`,
    '&:hover': {
      backgroundColor: fade(theme.palette.primary.main, 0.03),
      cursor: 'pointer',
    },
  },
  illustration: {
    fontSize: 92,
    marginBottom: theme.spacing(2),
    color: theme.palette.primary.main,
  },
  cardLabel: {
    color: theme.palette.primary.main,
    textTransform: 'uppercase',
    fontWeight: 'bold',
  },
  cardDescription: {
    marginTop: theme.spacing(1),
  },
}));

export default HelpTopicCard;
