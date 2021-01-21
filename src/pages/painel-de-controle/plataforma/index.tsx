import React from 'react';

import { MyNextPage } from 'src/contrats/interfaces';
import DashboardLayout from 'src/components/layouts/DashboardLayout';
import DontHavePermission from 'src/components/molecules/notices/FullScreenDontHavePermission';
import useAuth from 'src/hooks/useAuth';
import { PERMISSIONS } from 'src/constants';

const DashboardPlatformPage: MyNextPage = () => {
  const { can } = useAuth();

  if (!can(PERMISSIONS.MANAGE_PLATFORM)) return <DontHavePermission />;

  return <h1>Painel de controle</h1>;
};

DashboardPlatformPage.layout = DashboardLayout;

export default DashboardPlatformPage;
