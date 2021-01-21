import React from 'react';
import { Typography, Box, Container, Grid } from '@material-ui/core';
import { BiMessageAltDetail as ContactIcon } from 'react-icons/bi';

import AppLayout from 'src/components/layouts/AppLayout';
import Breadcrumb from 'src/components/molecules/navigation/HeaderBreadcrumb';
import PageBanner from 'src/components/molecules/banners/PageBanner';
import MainContactForm from 'src/components/molecules/forms/contact/MainContactForm';
import { MyNextPage } from 'src/contrats/interfaces';

const ContactPage: MyNextPage = () => {
  return (
    <>
      <PageBanner
        title="Contacta-nos"
        description="Encontre aqui as nossas informações de contacto."
        illustration={ContactIcon}
      />
      <Box mt={3} pb={3}>
        <Container>
          <Breadcrumb items={breadcrumbItems} />
          <Typography variant="h2" component="h2">
            Formulário de contacto
          </Typography>
          <Typography variant="body1" component="p">
            Use o formulário abaixo para deixar uma mensagem rápida
          </Typography>
          <Grid container>
            <Grid item xs={12} lg={4}>
              <MainContactForm />
            </Grid>
            <Grid item xs={12} lg={8} />
          </Grid>
        </Container>
      </Box>
    </>
  );
};

const breadcrumbItems = [{ label: 'Contacto' }];

ContactPage.layout = AppLayout;

export default ContactPage;
