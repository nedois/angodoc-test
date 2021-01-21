/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { FC } from 'react';
import clsx from 'clsx';
import { FiChevronRight as ExpandMoreIcon, FiChevronDown as ExpandLessIcon } from 'react-icons/fi';
import { Button } from '@material-ui/core';

import useStyles from './styles';

interface ExpandibleButtonProps {
  handleExpand: () => void;
  title: string;
  open?: boolean;
  className?: string;
  icon?: any;
  active?: boolean;
}

const ExpandibleButton: FC<ExpandibleButtonProps> = ({ active, icon: Icon, title, open, handleExpand }) => {
  const classes = useStyles();

  return (
    <Button className={clsx(classes.root, { [classes.active]: active })} onClick={handleExpand}>
      {Icon && <Icon className={classes.icon} size="20" />}
      <span className={classes.title}>{title}</span>
      {/* eslint-disable-next-line prettier/prettier */}
      {open ? <ExpandLessIcon className={classes.icon} size="16" /> : <ExpandMoreIcon className={classes.icon} size="16" />}
    </Button>
  );
};

export default ExpandibleButton;
