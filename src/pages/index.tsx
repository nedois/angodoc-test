import React from 'react';
import Particles from 'react-particles-js';
import { Typography, Container, makeStyles } from '@material-ui/core';
import { NextSeo } from 'next-seo';

import { MyNextPage } from 'src/contrats/interfaces';
import { Theme } from 'src/theme';
import AppLayout from 'src/components/layouts/AppLayout';
import DocumentSearchForm from 'src/components/molecules/forms/search/DocumentSearchForm';

const HomePage: MyNextPage = () => {
  const classes = useStyles();

  return (
    <>
      <NextSeo title="Página inicial" description="Encontre documentos perdidos na via pública" />
      <div className={classes.heroWrapper}>
        <Particles
          className={classes.particles}
          params={{
            particles: {
              number: { value: 10 },
              size: { value: 2 },
              color: { value: '#5428d5' },
              lineLinked: { color: '#5428d5' },
            },
            interactivity: {
              events: {
                onhover: {
                  enable: true,
                  mode: 'repulse',
                },
              },
            },
          }}
        />
        <Container className={classes.container}>
          <img src="/img/marca/logo.svg" alt="Angodoc Logotipo" className={classes.imgHero} />
          <Typography variant="h3" component="p">
            Encontre documentos perdidos na via pública
          </Typography>
        </Container>
        <DocumentSearchForm />
      </div>
    </>
  );
};

const useStyles = makeStyles((theme: Theme) => ({
  container: {
    textAlign: 'center',
    marginBottom: theme.spacing(4),
  },
  heroWrapper: {
    position: 'relative',
    height: 'calc(100vh - 64px)',
    display: 'flex',
    flexDirection: 'column',
    alignContent: 'center',
    justifyContent: 'center',
  },
  imgHero: {
    height: theme.spacing(25),
    width: 'auto',
    [theme.breakpoints.down('md')]: {
      height: theme.spacing(16),
    },
  },
  particles: {
    zIndex: -1,
    position: 'absolute',
    height: '100%',
    width: '100%',
  },
}));

HomePage.layout = AppLayout;

export default HomePage;
