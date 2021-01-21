import React, { useState, useEffect, useCallback } from 'react';
import { NextSeo } from 'next-seo';
import RouterLink from 'next/link';
import { FiPlus as AddIcon } from 'react-icons/fi';
import { Box, Container, Typography, Button } from '@material-ui/core';
import { useSnackbar } from 'notistack';

import { MyNextPage } from 'src/contrats/interfaces';
import DashboardLayout from 'src/components/layouts/DashboardLayout';
import DontHavePermission from 'src/components/molecules/notices/FullScreenDontHavePermission';
import Breadcrumb from 'src/components/molecules/navigation/AdminBreadcrumb';
import useAuth from 'src/hooks/useAuth';
import { PERMISSIONS } from 'src/constants';
import RolesListTable, { Sort, sortOptions } from 'src/components/molecules/tables/RolesListTable';
import { Role } from 'src/contrats/types';
import useIsMountedRef from 'src/hooks/useIsMountedRef';
import axios from 'src/utils/axios';

const ManageRolesPage: MyNextPage = () => {
  const { can } = useAuth();
  const { enqueueSnackbar } = useSnackbar();
  const isMountedRef = useIsMountedRef();
  const [roles, setRoles] = useState<Role[]>([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(15);
  const [query, setQuery] = useState<string>('');
  const [sort, setSort] = useState<Sort>(sortOptions[0].value);
  const [isFetching, setIsFetching] = useState(true);

  const handleLimitChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    handleRefetch();
    setLimit(+event.target.value);
  };

  const handlePageChange = (event: any, newPage: number) => {
    handleRefetch();
    setPage(newPage);
  };

  const handleQueryChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    event.persist();
    if (event.target.value.length > 4 || event.target.value.length === 0) {
      handleRefetch();
    }
    setQuery(event.target.value);
  };

  const handleSortChange = (event: React.ChangeEvent<{ value: unknown }>): void => {
    event.persist();
    handleRefetch();
    setSort(event.target.value as Sort);
  };

  const handleRefetch = () => {
    setIsFetching(true);
  };

  const getRoles = useCallback(() => {
    axios
      .get(`/auth/roles?counts=permissions&orderBy=${sort}${query && `&filter[label]=${query}`}`)
      .then(({ data }) => {
        if (isMountedRef.current) {
          setRoles(data.data);
          setTotal(data.meta.total);
          setIsFetching(false);
        }
      })
      .catch(error => {
        enqueueSnackbar(error.message, { variant: 'error' });
        setIsFetching(false);
      });
  }, [isMountedRef, enqueueSnackbar, sort, query]);

  useEffect(() => {
    if (isFetching) {
      getRoles();
    }
  }, [getRoles, isFetching]);

  if (!can(PERMISSIONS.LIST_ROLES)) return <DontHavePermission />;

  return (
    <Box minHeight="100%">
      <NextSeo noindex title="Papéis" />
      <Box py={2}>
        <Container maxWidth="lg">
          <Breadcrumb items={breadcrumbItems} />
          <Box display="flex" my={2} flexWrap="wrap">
            <Box flexGrow={1}>
              <Typography component="h1" variant="h1">
                Papéis
              </Typography>
            </Box>
            <RouterLink href="/painel-de-controle/plataforma/papeis/criar-papel">
              <Button component="a" variant="contained" color="primary" startIcon={<AddIcon />}>
                Novo papel
              </Button>
            </RouterLink>
          </Box>
          <RolesListTable
            total={total}
            limit={limit}
            page={page}
            roles={roles}
            sort={sort}
            query={query}
            isFetching={isFetching}
            refetch={handleRefetch}
            handleLimitChange={handleLimitChange}
            handlePageChange={handlePageChange}
            handleSortChange={handleSortChange}
            handleQueryChange={handleQueryChange}
          />
        </Container>
      </Box>
    </Box>
  );
};

const breadcrumbItems = [
  { label: 'Painel de contrôle', href: '/painel-de-controle' },
  { label: 'Plataforma', href: '/painel-de-controle/plataforma' },
  { label: 'Papéis' },
];

ManageRolesPage.layout = DashboardLayout;

export default ManageRolesPage;
