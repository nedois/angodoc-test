import React from 'react';
import { Box, Typography } from '@material-ui/core';
import { NextSeo } from 'next-seo';

import AuthLayout from 'src/components/layouts/AuthLayout';
import LoginForm from 'src/components/molecules/forms/auth/LoginForm';
import { MyNextPage } from 'src/contrats/interfaces';

const LoginPage: MyNextPage = () => {
  return (
    <>
      <NextSeo title="Entrar" />
      <Box my={2}>
        <Typography variant="h1" component="h1" color="inherit">
          Entrar
        </Typography>
        <Typography variant="body1" component="p" color="inherit">
          Entre as suas credenciais para aceder a plataforma
        </Typography>
      </Box>
      <LoginForm />
    </>
  );
};

LoginPage.layout = AuthLayout;

export default LoginPage;
