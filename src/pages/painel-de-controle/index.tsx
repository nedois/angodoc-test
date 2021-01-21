import React from 'react';
import { NextSeo } from 'next-seo';

import { MyNextPage } from 'src/contrats/interfaces';
import useAuth from 'src/hooks/useAuth';
import DashboardLayout from 'src/components/layouts/DashboardLayout';
import Box from 'src/components/utilities/Box';
import AdminOverviewCard from 'src/components/molecules/cards/AdminOverviewCard';
import OperatorOverviewCard from 'src/components/molecules/cards/OperatorOverviewCard';

const DashboardPage: MyNextPage = () => {
  const { user } = useAuth();

  return (
    <>
      <NextSeo noindex title="Painel de contrôle" />
      <Box minHeight="100%">
        <Box py={2}>
          {user?.can('is_admin') ? <AdminOverviewCard /> : <OperatorOverviewCard agency={user?.agency} />}
        </Box>
      </Box>
    </>
  );
};

DashboardPage.layout = DashboardLayout;

export default DashboardPage;
