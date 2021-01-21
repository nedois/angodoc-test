import 'react-perfect-scrollbar/dist/css/styles.css';

import React, { FC, Fragment, useEffect, useRef } from 'react';
import { Provider } from 'react-redux';
import { AppProps } from 'next/app';
import { NextComponentType } from 'next';
import NextNprogress from 'nextjs-progressbar';
import { DefaultSeo } from 'next-seo';
import { SnackbarProvider } from 'notistack';
import MomentUtils from '@date-io/moment';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import { AiOutlineBug as ErrorIcon } from 'react-icons/ai';
import {
  FiAlertCircle as WarningIcon,
  FiInfo as InfoIcon,
  FiCheckCircle as SucessIcon,
  FiX as CloseIcon,
} from 'react-icons/fi';
import { CssBaseline, ThemeProvider, IconButton, colors } from '@material-ui/core';

import * as gtag from 'src/utils/gtag';
import { createTheme } from 'src/theme';
import useSettings from 'src/hooks/useSettings';
import withSettings from 'src/components/utilities/withSettings';
import GlobalStyles from 'src/components/utilities/GlobalStyles';
import ScrollReset from 'src/components/utilities/ScrollReset';
import AuthProvider from 'src/contexts/AuthContext';
import { useStore } from 'src/hooks/useStore';

const snackbarIconVariant = {
  success: <SucessIcon size={22} style={{ marginRight: 8 }} />,
  error: <ErrorIcon size={22} style={{ marginRight: 8 }} />,
  warning: <WarningIcon size={22} style={{ marginRight: 8 }} />,
  info: <InfoIcon size={22} style={{ marginRight: 8 }} />,
};

type MyAppProps = AppProps & {
  Component: NextComponentType & { layout: FC };
};

const MyApp = ({ Component, pageProps, router }: MyAppProps) => {
  const store = useStore(pageProps.initialReduxState);
  const { settings } = useSettings();

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const notistackRef = useRef<any>();

  const theme = createTheme({
    theme: settings.theme,
  });

  const onClickDismiss = (key: React.ReactText) => () => {
    notistackRef?.current?.closeSnackbar(key);
  };

  const Layout = Component.layout || Fragment;

  useEffect(() => {
    const jssStyles = document.querySelector('#jss-server-side');

    if (jssStyles) jssStyles?.parentElement?.removeChild(jssStyles);
  }, []);

  useEffect(() => {
    const handleRouteChange = (url: URL) => {
      if (process.env.NODE_ENV === 'production') gtag.pageview(url);
    };

    router.events.on('routeChangeComplete', handleRouteChange);

    return () => {
      router.events.off('routeChangeComplete', handleRouteChange);
    };
  }, [router.events]);

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <MuiPickersUtilsProvider utils={MomentUtils}>
          <SnackbarProvider
            dense
            ref={notistackRef}
            action={key => (
              <IconButton onClick={onClickDismiss(key)} size="small">
                <CloseIcon style={{ color: colors.common.white }} />
              </IconButton>
            )}
            iconVariant={snackbarIconVariant}
            maxSnack={3}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          >
            <NextNprogress color={theme.palette.primary.main} startPosition={0.3} stopDelayMs={200} height={4} />
            <GlobalStyles />
            <CssBaseline />
            <ScrollReset />
            <AuthProvider>
              <Layout>
                <DefaultSeo titleTemplate="%s - Angodoc" />
                <Component {...pageProps} key={router.route} />
              </Layout>
            </AuthProvider>
          </SnackbarProvider>
        </MuiPickersUtilsProvider>
      </ThemeProvider>
    </Provider>
  );
};

export default withSettings(MyApp);
