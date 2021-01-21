/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { FC, ReactNode, useState } from 'react';
import clsx from 'clsx';
import RouterLink from 'next/link';
import { ListItem, Collapse } from '@material-ui/core';

import SideNavButton from 'src/components/atoms/buttons/SideNavButton';
import ExpandibleButton from 'src/components/atoms/buttons/ExpandibleButton';
import useStyles from './styles';

interface SideNavItemProps {
  className?: string;
  children?: ReactNode;
  icon?: any;
  info?: any;
  title: string;
  active?: boolean;
  href?: string;
  open?: boolean;
  onClick?: () => void;
}

const SideNavItem: FC<SideNavItemProps> = ({
  active,
  icon,
  title,
  info,
  open: openProp,
  href,
  className,
  onClick,
  children,
  ...rest
}) => {
  const classes = useStyles();
  const [open, setOpen] = useState<boolean | undefined>(openProp);

  const handleExpand = (): void => {
    setOpen(prevOpen => !prevOpen);
  };

  const renderButton = <SideNavButton title={title} onClick={onClick} active={active} info={info} icon={icon} />;

  if (children) {
    return (
      <ListItem className={clsx(classes.item, className)} disableGutters key={title} {...rest}>
        <ExpandibleButton title={title} handleExpand={handleExpand} active={active} icon={icon} open={open} />
        <Collapse in={open}>{children}</Collapse>
      </ListItem>
    );
  }

  return (
    <ListItem className={clsx(classes.itemLeaf, className)} disableGutters key={title} {...rest}>
      {href ? <RouterLink href={href}>{renderButton}</RouterLink> : renderButton}
    </ListItem>
  );
};

export default SideNavItem;
