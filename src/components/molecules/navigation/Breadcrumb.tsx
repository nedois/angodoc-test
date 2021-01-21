import React from 'react';
import RouterLink from 'next/link';
import { Breadcrumbs, Link, Typography, makeStyles } from '@material-ui/core';
import { FaChevronRight as BreadcrumbIcon } from 'react-icons/fa';
import { VscHome as HomeIcon } from 'react-icons/vsc';

import useBreadcrumb from 'src/hooks/useBreadcrumb';
import { Theme } from 'src/theme';

export interface BreadcrumbItem {
  path?: string;
  label: string;
}

const Breadcrumb: React.FC = () => {
  const { items } = useBreadcrumb();
  const classes = useStyles();

  return (
    <Breadcrumbs separator={<BreadcrumbIcon fontSize="small" />}>
      <Link className={classes.link} component={RouterLink} path="/">
        <HomeIcon size={24} />
      </Link>
      {items.map((item: BreadcrumbItem, key: number) =>
        item.path ? (
          <Link className={classes.link} path={item.path} key={key} component={RouterLink}>
            {item.label}
          </Link>
        ) : (
          <Typography key={key}>{item.label}</Typography>
        ),
      )}
    </Breadcrumbs>
  );
};

const useStyles = makeStyles((theme: Theme) => ({
  link: {
    color: theme.palette.text.primary,
    cursor: 'pointer',
    '&:hover': {
      textDecoration: 'none',
      color: theme.palette.primary.main,
    },
  },
}));

export default Breadcrumb;
