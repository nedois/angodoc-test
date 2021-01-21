import React, { useState, useEffect, useCallback } from 'react';
import { NextSeo } from 'next-seo';
import { useSnackbar } from 'notistack';
import { Container, Typography } from '@material-ui/core';

import useAuth from 'src/hooks/useAuth';
import { PERMISSIONS } from 'src/constants';
import useIsMountedRef from 'src/hooks/useIsMountedRef';
import { MyNextPage } from 'src/contrats/interfaces';
import DashboardLayout from 'src/components/layouts/DashboardLayout';
import SimpleTable from 'src/components/molecules/tables/SimpleTable';
import DontHavePermission from 'src/components/molecules/notices/FullScreenDontHavePermission';
import Breadcrumb from 'src/components/molecules/navigation/AdminBreadcrumb';
import { Agency } from 'src/contrats/types';
import { axios } from 'src/utils';
import Box from 'src/components/utilities/Box';
import AddAgencyModal from 'src/components/molecules/modals/AddAgencyModal';

const AgenciesPage: MyNextPage = () => {
  const { can } = useAuth();
  const { enqueueSnackbar } = useSnackbar();
  const isMountedRef = useIsMountedRef();
  const [fetching, setFetching] = useState(true);
  const [agencies, setAgencies] = useState<Agency[]>([]);
  const [agenciesRows, setAgenciesRows] = useState<any>([]);
  const [modal, setModal] = useState(false);

  const handleAddAgencySuccess = (agency: Agency) => {
    setAgencies([...agencies, agency]);
    setModal(false);
  };

  const getAgencies = useCallback(() => {
    axios
      .get('/admin/agencies')
      .then(({ data }) => {
        if (isMountedRef.current) {
          setAgencies(data);
        }
      })
      .catch(error => {
        enqueueSnackbar(error.message, { variant: 'error' });
      })
      .finally(() => setFetching(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMountedRef]);

  useEffect(() => {
    if (fetching) {
      getAgencies();
    }
  }, [getAgencies, fetching]);

  useEffect(() => {
    setAgenciesRows(
      agencies.map(agencie => {
        return {
          id: agencie.id,
          cells: [
            { child: agencie.name },
            { child: agencie.address },
            { child: agencie.director?.long_name },
            { child: agencie.phone },
            { child: agencie.province },
          ],
        };
      }),
    );
  }, [agencies]);

  if (!can(PERMISSIONS.MANAGE_USERS)) return <DontHavePermission />;

  return (
    <>
      <NextSeo noindex title="Agências" />

      <AddAgencyModal open={modal} onClose={() => setModal(false)} onSuccess={handleAddAgencySuccess} />

      <Container>
        <Box my={3}>
          <Breadcrumb items={breadcrumbItems} />
          <Box my={2} clone>
            <Typography component="h1" variant="h1">
              Agências
            </Typography>
          </Box>
          <SimpleTable
            title="Agências"
            addResource={{ label: 'Adicionar', onClick: () => setModal(true) }}
            headCells={agenciesHeadCells}
            bodyRows={agenciesRows}
          />
        </Box>
      </Container>
    </>
  );
};

const agenciesHeadCells = [
  { id: 'name', child: 'Nome' },
  { id: 'address', child: 'Endereço' },
  { id: 'director', child: 'Director' },
  { id: 'phone', child: 'Telefone' },
  { id: 'province', child: 'Província' },
];

const breadcrumbItems = [
  { label: 'Painel de contrôle', href: '/painel-de-controle' },
  { label: 'Recursos', href: '/painel-de-controle/recursos' },
  { label: 'Agências' },
];

AgenciesPage.layout = DashboardLayout;

export default AgenciesPage;
