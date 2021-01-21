import React from 'react';
import { NextSeo } from 'next-seo';
import { Typography, Box } from '@material-ui/core';
import { GetServerSideProps, InferGetServerSidePropsType } from 'next';

import { MyNextPage } from 'src/contrats/interfaces';
import AuthLayout from 'src/components/layouts/AuthLayout';
import ChangePasswordForm from 'src/components/molecules/forms/ChangePasswordForm';

const ResetPasswordPage: MyNextPage<InferGetServerSidePropsType<typeof getServerSideProps>> = ({
  method,
  user,
  token,
}) => {
  return (
    <>
      <NextSeo noindex title="Redefinir senha" />
      <Box mt={2}>
        <Typography variant="h2" component="h2">
          Redefinir a senha
        </Typography>
        <ChangePasswordForm method={method} user={user} token={token} />
      </Box>
    </>
  );
};

ResetPasswordPage.layout = AuthLayout;

export const getServerSideProps: GetServerSideProps = async ({ query }) => {
  const { method, user, token } = query;

  if (user && token && method && typeof user === 'string' && typeof token === 'string' && typeof method === 'string')
    return {
      props: { method, user, token },
    };

  return {
    notFound: true,
  };
};

export default ResetPasswordPage;
