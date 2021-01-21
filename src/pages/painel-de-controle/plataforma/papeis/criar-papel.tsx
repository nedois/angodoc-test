import React from 'react';
import { NextSeo } from 'next-seo';
import { Box, Card, Container, Typography, CardHeader, Divider, CardContent } from '@material-ui/core';

import { MyNextPage } from 'src/contrats/interfaces';
import DashboardLayout from 'src/components/layouts/DashboardLayout';
import DontHavePermission from 'src/components/molecules/notices/FullScreenDontHavePermission';
import Breadcrumb from 'src/components/molecules/navigation/AdminBreadcrumb';
import useAuth from 'src/hooks/useAuth';
import { PERMISSIONS } from 'src/constants';
import CreateRoleForm from 'src/components/molecules/forms/CreateRoleForm';

const CreateRolePage: MyNextPage = () => {
  const { can } = useAuth();

  if (!can(PERMISSIONS.CREATE_ROLES)) return <DontHavePermission />;

  return (
    <Box minHeight="100%">
      <NextSeo noindex title="Criar papel" />
      <Box py={2}>
        <Container maxWidth="lg">
          <Breadcrumb items={breadcrumbItems} />
          <Box display="flex" my={2}>
            <Typography component="h1" variant="h1">
              Criar papel
            </Typography>
          </Box>
          <Card>
            <CardHeader title="Detalhes do papel" />
            <Divider />
            <CardContent>
              <CreateRoleForm />
            </CardContent>
          </Card>
        </Container>
      </Box>
    </Box>
  );
};

const breadcrumbItems = [
  { label: 'Painel de contrôle', href: '/painel-de-controle' },
  { label: 'Plataforma', href: '/painel-de-controle/plataforma' },
  { label: 'Papéis', href: '/painel-de-controle/plataforma/papeis' },
  { label: 'Criar papel' },
];

CreateRolePage.layout = DashboardLayout;

export default CreateRolePage;
