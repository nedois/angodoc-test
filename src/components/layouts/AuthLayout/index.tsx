import React, { FC } from 'react';
import { useRouter } from 'next/router';
import { Grid, Box, Hidden, makeStyles, Typography, Container, CircularProgress, Button } from '@material-ui/core';
import Link from 'next/link';
import { FaChevronLeft as ChevronLeftIcon } from 'react-icons/fa';

import { Theme } from 'src/theme';
import useAuth from 'src/hooks/useAuth';

const AuthLayout: FC = ({ children }) => {
  const classes = useStyles();
  const router = useRouter();
  const { isAuthenticated } = useAuth();

  if (isAuthenticated) router.push((router.query.redirectTo as string) || '/');

  return (
    <Box display="flex" flexGrow={1} flexShrink={0} flexBasis="auto" height="100vh">
      <Grid container>
        <Hidden mdDown>
          <Grid item lg={6} className={classes.wrapperInfo}>
            <Box className={classes.info}>
              <Container maxWidth="sm" className="container">
                <Typography variant="h3" component="h3" className={classes.caption}>
                  ANGODOC: Desenvolvida com ❤ pela MSA
                </Typography>
                <Typography variant="body1" component="p" className={classes.description}>
                  O ANGODOC é um motor de busca de documentos perdidos na via pública afim de facilitar a vida de todos
                  angolanos
                </Typography>
                <Link href="/">
                  <Button
                    variant="outlined"
                    component="a"
                    className={classes.button}
                    startIcon={<ChevronLeftIcon size={18} />}
                  >
                    Voltar a página inicial
                  </Button>
                </Link>
              </Container>
            </Box>
          </Grid>
        </Hidden>
        <Grid item lg={6} xs={12} className={classes.formWapper}>
          <div className="formDiv">
            <Box textAlign={isAuthenticated ? 'center' : 'left'}>
              <img src="/img/marca/logo.svg" height="52" alt="Angodoc Logotipo" />
              {isAuthenticated ? (
                <>
                  <Box my={2}>
                    <Typography component="h2" variant="h2">
                      Redirectionando
                    </Typography>
                  </Box>
                  <CircularProgress />
                </>
              ) : (
                children
              )}
            </Box>
          </div>
        </Grid>
      </Grid>
    </Box>
  );
};

const useStyles = makeStyles((theme: Theme) => ({
  wrapperInfo: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  info: {
    position: 'relative',
    padding: theme.spacing(10),
    backgroundColor: theme.palette.primary.main,
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    borderRadius: 10,
    '&::after': {
      content: "''",
      background: "url('/img/fundos/bg-abs-1.png')",
      opacity: 0.3,
      top: 0,
      left: 0,
      bottom: 0,
      right: 0,
      position: 'absolute',
    },
    '& .container': {
      zIndex: 2,
    },
  },
  caption: {
    color: '#fff',
  },
  description: {
    color: '#fff',
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
  },
  formWapper: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    paddingLeft: theme.spacing(2),
    [theme.breakpoints.down('md')]: {
      alignItems: 'center',
      paddingLeft: 0,
    },

    '& .formDiv': {
      width: 320,
    },
  },
  button: {
    border: '1px solid #fff',
    color: '#fff',
  },
}));

export default AuthLayout;
