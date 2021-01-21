/* eslint-disable react/jsx-indent */
/* eslint-disable prettier/prettier */
/* eslint-disable react/jsx-one-expression-per-line */
import React, { useEffect, useState } from 'react';
import { NextSeo } from 'next-seo';
import { useRouter } from 'next/router';
import { useSnackbar } from 'notistack';
import { GetServerSideProps } from 'next';
import { Box, Link, Typography, CircularProgress } from '@material-ui/core';

import { MyNextPage } from 'src/contrats/interfaces';
import AuthLayout from 'src/components/layouts/AuthLayout';
import { Alert, AlertTitle } from '@material-ui/lab';

import RequestVerificationEmailForm from 'src/components/molecules/forms/RequestVerificationEmailForm';
import fetch from 'src/utils/axios';

interface VerifyEmailPageProps {
  method?: string;
  user?: string;
  token?: string;
  redirected?: boolean;
}

const VerifyEmailPage: MyNextPage<VerifyEmailPageProps> = ({ method, user, token }) => {
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const [isForm, setIsForm] = useState(false);
  const [isEmailResent, setIsEmailResent] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const handleResentEmail = () => {
    setIsForm(true);
  };

  const handleEmailResent = () => {
    // Set cookie to time limite

    setIsForm(false);
    setIsEmailResent(true);
  };

  useEffect(() => {
    if (method && user && token) {
      fetch
        .post(`/verify/email`, { token, user, method })
        .then(async () => {
          setLoading(false);
          enqueueSnackbar('Email verificado com sucesso.', {
            variant: 'success',
          });

          router.push('/entrar');
        })
        .catch(err => {
          setLoading(false);
          setError(err.message);
          enqueueSnackbar(err.message, {
            variant: 'error',
          });
        });
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [method, user, token]);

  if (method && user && token) {
    return (
      <>
        <NextSeo noindex title="Verificação de email" />
        <Typography variant="h2" component="h2">
          Verificação de email
        </Typography>
        {!loading && (
          <>
            <Box mt={1}>
              <Typography variant="body1" component="p">
                Estamos verificando o seu email, aguarde
              </Typography>
            </Box>
            <Box mt={1}>
              <CircularProgress />
            </Box>
          </>
        )}
        {error && (
          <>
            <Box mt={1}>
              <Alert severity="error">{error}</Alert>
            </Box>
          </>
        )}
        {!error && !loading && (
          <>
            <Box mt={1}>
              <Alert severity="success">Email verificado com sucesso. Redirecionando em 3s.</Alert>
            </Box>
          </>
        )}
      </>
    );
  }

  return (
    <Box mt={2}>
      {isForm ? (
        <Box pt={2}>
          <Typography component="h2" variant="h2">
            Reenviar email de verificação
          </Typography>
          <Box mt={2}>
            <Typography>Insira o seu email no campo abaixo</Typography>
          </Box>
          <RequestVerificationEmailForm onSuccess={handleEmailResent} />
        </Box>
      ) : (
          <>
            {isEmailResent ? (
              <Alert severity="success">
                <AlertTitle>Email enviado</AlertTitle>
                <Typography>
                  Foi-lhe enviado um email de verificação, verique o seu email dentro de alguns minutos.
                </Typography>
              </Alert>
            ) : (
                <Alert severity="info">
                  <AlertTitle>Verifique o seu email</AlertTitle>
                  <Typography>Foi-lhe enviado um email de verificação de nossa parte.</Typography>
                  <Typography>
                    {/* eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                    <Link component="button" variant="body2" onClick={handleResentEmail}>
                      Clique aqui
                    </Link>{' '}para reenviar o email, caso não o tenha recebido
                  </Typography>
                </Alert>
              )}
          </>
        )}
    </Box>
  );
};

VerifyEmailPage.layout = AuthLayout;

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const { method, user, token, redirected } = query;

  if (user && token && method && typeof user === 'string' && typeof token === 'string' && typeof method === 'string')
    return {
      props: { method, user, token, redirected },
    };

  if (!redirected) {
    return {
      notFound: true,
    };
  }

  return { props: {} };
};

export default VerifyEmailPage;
