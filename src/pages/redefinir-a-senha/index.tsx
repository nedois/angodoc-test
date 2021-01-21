import React, { useState } from 'react';
import { NextSeo } from 'next-seo';
import { Typography, Box } from '@material-ui/core';
import { Alert, AlertTitle } from '@material-ui/lab';

import { MyNextPage } from 'src/contrats/interfaces';
import AuthLayout from 'src/components/layouts/AuthLayout';
import RequestPasswordForm from 'src/components/molecules/forms/RequestPasswordForm';

const ResetPasswordPage: MyNextPage = () => {
  const [isForm, setIsForm] = useState(true);

  const handlePasswordTokenSent = () => {
    setIsForm(false);
  };

  if (isForm) {
    return (
      <>
        <NextSeo noindex title="Redefinir senha" />
        <Box mt={2}>
          <Typography variant="h2" component="h2">
            Redefinir a senha
          </Typography>
          <Box mt={2}>
            <Typography>Insira o seu email no campo abaixo</Typography>
          </Box>
          <RequestPasswordForm onSuccess={handlePasswordTokenSent} />
        </Box>
      </>
    );
  }

  return (
    <>
      <NextSeo noindex title="Redefinir senha" />
      <Box mt={2}>
        <Alert severity="success">
          <AlertTitle>Email enviado</AlertTitle>
          <Typography>Foi-lhe enviado um email com as instruções para redefinires a senha.</Typography>
        </Alert>
      </Box>
    </>
  );
};

ResetPasswordPage.layout = AuthLayout;

export default ResetPasswordPage;
