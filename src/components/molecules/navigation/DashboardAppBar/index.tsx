import React, { FC } from 'react';
import RouterLink from 'next/link';
import clsx from 'clsx';
import { FiMenu as MenuIcon } from 'react-icons/fi';
import { AppBar, Toolbar, Link, Hidden, IconButton } from '@material-ui/core';

import Logo from 'src/components/atoms/Logo';
import Box from 'src/components/utilities/Box';
import ElevationScroll from 'src/components/utilities/ElevationScroll';
import useStyles from './styles';

interface DashboardAppBarProps {
  className?: string;
  toggleSideNav: () => void;
}

const DashboardAppBar: FC<DashboardAppBarProps> = ({ className, toggleSideNav, ...rest }) => {
  const classes = useStyles();

  return (
    <ElevationScroll>
      <AppBar className={clsx(classes.root, className)} color="default" {...rest}>
        <Toolbar className={classes.toolbar}>
          <Box ml="-12px" clone>
            <IconButton color="inherit" onClick={toggleSideNav}>
              <MenuIcon />
            </IconButton>
          </Box>
          <Hidden lgUp>
            <RouterLink href="/">
              <Link href="/">
                <Logo className={classes.logo} />
              </Link>
            </RouterLink>
          </Hidden>
          <Box flexGrow={1} />
          {/* <Hidden mdDown>
          <FullPageSearch />
          <MessagesDropdown />
          <NotificationsDropdown />
        </Hidden>
        <FullPageSearch />
        <Divider className={classes.divider} />
        <ProfileDrawer /> */}
        </Toolbar>
      </AppBar>
    </ElevationScroll>
  );
};

export default DashboardAppBar;
