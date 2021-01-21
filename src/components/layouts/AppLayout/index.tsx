import React, { FC } from 'react';
import { useRouter } from 'next/router';
import { Box, makeStyles } from '@material-ui/core';

import PageTransition from 'src/components/utilities/PageTransition';
import TopBar from './TopBar';
import Footer from './Footer';

const AppLayout: FC = ({ children }) => {
  const classes = useStyles();
  const router = useRouter();

  return (
    <>
      <TopBar />
      <PageTransition location={router.pathname}>
        <Box className={classes.pageContent}>{children}</Box>
      </PageTransition>
      <Footer />
    </>
  );
};

const useStyles = makeStyles(() => ({
  pageContent: {
    paddingTop: 64,
    overflowX: 'hidden',
  },
}));

export default AppLayout;
