/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { FC } from 'react';
import clsx from 'clsx';
import { Button } from '@material-ui/core';

import useStyles from './styles';

interface SideNavButtonProps {
  title: string;
  className?: string;
  icon?: any;
  info?: any;
  active?: boolean;
  onClick?: () => void;
}

const SideNavButton: FC<SideNavButtonProps> = ({
  active,
  icon: Icon,
  title,
  info: Info,
  className,
  onClick,
  ...rest
}) => {
  const classes = useStyles();

  return (
    <Button
      className={clsx(classes.root, className, { [classes.active]: active })}
      component="a"
      onClick={onClick}
      {...rest}
    >
      {Icon && <Icon className={classes.icon} size="20" />}
      <span className={classes.title}>{title}</span>
      {Info && <Info />}
    </Button>
  );
};

export default SideNavButton;
