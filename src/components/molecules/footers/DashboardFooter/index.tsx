import React, { FC } from 'react';
import clsx from 'clsx';
import { Typography } from '@material-ui/core';

import useStyles from './styles';

interface DashboardFooterProps {
  className?: string;
}

const DashboardFooter: FC<DashboardFooterProps> = ({ className, ...rest }) => {
  const classes = useStyles();

  return (
    <footer className={clsx(classes.root, className)} {...rest}>
      <Typography>{`Todos direitos reservados © ${new Date().getFullYear()} Angodoc`}</Typography>
    </footer>
  );
};

export default DashboardFooter;
