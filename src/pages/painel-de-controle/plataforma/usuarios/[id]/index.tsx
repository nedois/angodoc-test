import React, { useState, useEffect, useCallback } from 'react';
import { NextSeo } from 'next-seo';
import { useRouter } from 'next/router';
import { Box, Container, Typography } from '@material-ui/core';

import { MyNextPage } from 'src/contrats/interfaces';
import DashboardLayout from 'src/components/layouts/DashboardLayout';
import DontHavePermission from 'src/components/molecules/notices/FullScreenDontHavePermission';
import Breadcrumb from 'src/components/molecules/navigation/AdminBreadcrumb';
import useAuth from 'src/hooks/useAuth';
import { PERMISSIONS } from 'src/constants';
import { User, Role } from 'src/contrats/types';
import axios from 'src/utils/axios';
import useIsMountedRef from 'src/hooks/useIsMountedRef';
import UserRolesListTable from 'src/components/molecules/tables/UserRolesListTable';
import Custom404 from 'src/components/molecules/notices/Custom404';

const UserRolePage: MyNextPage = () => {
  const { can } = useAuth();
  const router = useRouter();
  const { id } = router.query;
  const isMountedRef = useIsMountedRef();
  const [user, setUser] = useState<User | null>(null);
  const [roles, setRoles] = useState<Role[]>([]);
  const [nonAssignedRoles, setNonAssignedRoles] = useState<Role[]>([]);
  const [isFetching, setIsFetching] = useState(true);
  const [hasError, setHasError] = useState(false);

  const getUser = useCallback(() => {
    if (!id) return;

    axios
      .get(`/admin/users/${id}/roles`)
      .then(({ data }) => {
        if (isMountedRef) {
          setUser(data);
        }
      })
      .catch(() => {
        setHasError(true);
      });

    axios
      .get('/admin/users/roles')
      .then(({ data }) => {
        if (isMountedRef) {
          setRoles(data);
          setIsFetching(false);
          setHasError(false);
        }
      })
      .catch(() => {
        setHasError(true);
        setIsFetching(false);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMountedRef, id]);

  useEffect(() => {
    getUser();
  }, [getUser]);

  useEffect(() => {
    setNonAssignedRoles(
      roles.filter((role: Role) => {
        const userHasRole = user?.roles && !!user.roles.filter(r => r.id === role.id).length;

        return !userHasRole;
      }),
    );
  }, [user, roles]);

  if (!can(PERMISSIONS.MANAGE_USERS)) return <DontHavePermission />;

  if (hasError) return <Custom404 />;

  return (
    <Box minHeight="100%">
      <NextSeo noindex title="Papéis do usúario" />
      <Box py={2}>
        <Container maxWidth="lg">
          <Breadcrumb items={breadcrumbItems} />
          <Box display="flex" my={2}>
            <Typography component="h1" variant="h1">
              {`Papéis de ${user?.long_name || '...processando'}`}
            </Typography>
          </Box>

          {!isFetching && user && (
            <>
              <Box my={2}>
                <UserRolesListTable
                  roles={user.roles as Role[]}
                  action="remove"
                  title="Papéis do usúario"
                  refetch={getUser}
                  user={user.id as string}
                />
              </Box>
              <UserRolesListTable
                roles={nonAssignedRoles}
                action="add"
                title="Adicionar papel"
                refetch={getUser}
                user={user.id as string}
              />
            </>
          )}
        </Container>
      </Box>
    </Box>
  );
};

const breadcrumbItems = [
  { label: 'Painel de contrôle', href: '/painel-de-controle' },
  { label: 'Plataforma', href: '/painel-de-controle/plataforma' },
  { label: 'Usúarios', href: '/painel-de-controle/plataforma/usuarios' },
  { label: 'Editar usúario' },
];

UserRolePage.layout = DashboardLayout;

export default UserRolePage;
