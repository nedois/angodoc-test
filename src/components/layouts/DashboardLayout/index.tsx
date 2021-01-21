import React, { FC, ReactNode, useState } from 'react';
import clsx from 'clsx';
import { useRouter } from 'next/router';
import { Drawer, Hidden } from '@material-ui/core';

import useAuth from 'src/hooks/useAuth';
import { PERMISSIONS } from 'src/constants';
import Box from 'src/components/utilities/Box';
import FullPageLoader from 'src/components/molecules/notices/FullPageLoader';
import DashboardFooter from 'src/components/molecules/footers/DashboardFooter';
import DashboardAppBar from 'src/components/molecules/navigation/DashboardAppBar';
import FullScreenRedirect from 'src/components/molecules/notices/FullScreenRedirect';
import AdminNavigationPanel from 'src/components/molecules/panels/AdminNavigationPanel';
import FullScreenDontHavePermission from 'src/components/molecules/notices/FullScreenDontHavePermission';
import useStyles from './styles';

interface DashboardLayoutProps {
  children?: ReactNode;
}

const DashboardLayout: FC<DashboardLayoutProps> = ({ children }) => {
  const classes = useStyles();
  const router = useRouter();
  const { can, isAuthenticated, loading } = useAuth();
  const [navOpen, setNavOpen] = useState(true);

  const handleNavClose = () => {
    setNavOpen(false);
  };

  const toggleSideNav = () => {
    setNavOpen(!navOpen);
  };

  if (loading) return <FullPageLoader />;

  if (!isAuthenticated) {
    if (process.browser) router.push(`/entrar?redirectTo=${window.location.pathname}`);

    return <FullScreenRedirect />;
  }

  if (!can(PERMISSIONS.DASHBOARD_VIEW)) return <FullScreenDontHavePermission />;

  return (
    <div className={classes.root}>
      <DashboardAppBar toggleSideNav={toggleSideNav} />
      <Hidden lgUp>
        <Drawer
          anchor="left"
          classes={{ paper: classes.sidenav }}
          onClose={handleNavClose}
          open={navOpen}
          variant="temporary"
        >
          <AdminNavigationPanel />
        </Drawer>
      </Hidden>
      <Hidden mdDown>
        <Drawer anchor="left" classes={{ paper: clsx(classes.sidenav, 'desktop') }} open={navOpen} variant="persistent">
          <AdminNavigationPanel />
        </Drawer>
      </Hidden>
      <div className={classes.wrapper}>
        <div
          className={clsx(classes.content, {
            [classes.contentShift]: navOpen,
          })}
        >
          <Box px={2} component="main">
            {children}
          </Box>
          <DashboardFooter />
        </div>
      </div>
    </div>
  );
};

export default DashboardLayout;
