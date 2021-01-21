import React, { useState, useEffect, useCallback } from 'react';
import { NextSeo } from 'next-seo';
import { Container, Typography } from '@material-ui/core';
import { useSnackbar } from 'notistack';

import { MyNextPage } from 'src/contrats/interfaces';
import DashboardLayout from 'src/components/layouts/DashboardLayout';
import DontHavePermission from 'src/components/molecules/notices/FullScreenDontHavePermission';
import Breadcrumb from 'src/components/molecules/navigation/AdminBreadcrumb';
import useAuth from 'src/hooks/useAuth';
import { PERMISSIONS } from 'src/constants';
import UsersListTable, { Sort, sortOptions } from 'src/components/molecules/tables/UsersListTable';
import { User } from 'src/contrats/types';
import useIsMountedRef from 'src/hooks/useIsMountedRef';
import axios from 'src/utils/axios';
import Box from 'src/components/utilities/Box';

const ManageUsersPage: MyNextPage = () => {
  const { can } = useAuth();
  const { enqueueSnackbar } = useSnackbar();
  const isMountedRef = useIsMountedRef();
  const [users, setUsers] = useState<User[]>([]);
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

  const getUsers = useCallback(() => {
    axios
      .get(`/admin/users?includes=roles&orderBy=${sort}${query && `&filter[first_name]=${query}`}`)
      .then(({ data }) => {
        if (isMountedRef.current) {
          setUsers(data.data);
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
      getUsers();
    }
  }, [getUsers, isFetching]);

  if (!can(PERMISSIONS.MANAGE_USERS)) return <DontHavePermission />;

  return (
    <Box minHeight="100%">
      <NextSeo noindex title="Usúarios" />
      <Box py={2}>
        <Container maxWidth="lg">
          <Breadcrumb items={breadcrumbItems} />
          <Box my={2} clone>
            <Typography component="h1" variant="h1">
              Usúarios
            </Typography>
          </Box>
          <UsersListTable
            total={total}
            limit={limit}
            page={page}
            users={users}
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
  { label: 'Usúarios' },
];

ManageUsersPage.layout = DashboardLayout;

export default ManageUsersPage;
