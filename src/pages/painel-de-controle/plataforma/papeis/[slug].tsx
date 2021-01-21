import React, { useState, useEffect, useCallback } from 'react';
import { NextSeo } from 'next-seo';
import { useRouter } from 'next/router';
import { Skeleton } from '@material-ui/lab';
import { Box, Card, Container, Typography, CardHeader, Divider, CardContent } from '@material-ui/core';

import { MyNextPage } from 'src/contrats/interfaces';
import DashboardLayout from 'src/components/layouts/DashboardLayout';
import DontHavePermission from 'src/components/molecules/notices/FullScreenDontHavePermission';
import Breadcrumb from 'src/components/molecules/navigation/AdminBreadcrumb';
import useAuth from 'src/hooks/useAuth';
import { PERMISSIONS } from 'src/constants';
import { Permission, Role } from 'src/contrats/types';
import axios from 'src/utils/axios';
import useIsMountedRef from 'src/hooks/useIsMountedRef';
import EditRoleForm from 'src/components/molecules/forms/EditRoleForm';
import PermissionsListTable from 'src/components/molecules/tables/PermissionsListTable';
import Custom404 from 'src/components/molecules/notices/Custom404';

const ShowRolePage: MyNextPage = () => {
  const { can } = useAuth();
  const router = useRouter();
  const { slug } = router.query;
  const isMountedRef = useIsMountedRef();
  const [role, setRole] = useState<Role | null>(null);
  const [permissions, setPermissions] = useState<Permission[]>([]);
  const [nonAssignedPermissions, setNonAssignedPermissions] = useState<Permission[]>([]);
  const [isFetching, setIsFetching] = useState(true);
  const [hasError, setHasError] = useState(false);

  const getRole = useCallback(() => {
    if (!slug) return;

    axios
      .get(`/auth/roles/${slug}?includes=permissions`)
      .then(({ data }) => {
        if (isMountedRef) {
          setRole(data);
        }
      })
      .catch(() => {
        setHasError(true);
      });

    axios
      .get('/auth/permissions')
      .then(({ data }) => {
        if (isMountedRef) {
          setPermissions(data);
          setIsFetching(false);
          setHasError(false);
        }
      })
      .catch(() => {
        setHasError(true);
        setIsFetching(false);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMountedRef, slug]);

  useEffect(() => {
    getRole();
  }, [getRole]);

  useEffect(() => {
    setNonAssignedPermissions(
      permissions.filter((permission: Permission) => {
        const roleHasPermission =
          role?.permissions && !!role.permissions.filter(p => p.slug === permission.slug).length;

        return !roleHasPermission;
      }),
    );
  }, [role, permissions]);

  if (!can(PERMISSIONS.UPDATE_ROLES)) return <DontHavePermission />;

  if (hasError) return <Custom404 />;

  return (
    <Box minHeight="100%">
      <NextSeo noindex title="Editar papel" />
      <Box py={2}>
        <Container maxWidth="lg">
          <Breadcrumb items={breadcrumbItems} />
          <Box display="flex" my={2}>
            <Typography component="h1" variant="h1">
              Editar papel
            </Typography>
          </Box>
          <Card>
            <CardHeader title="Detalhes do papel" />
            <Divider />
            <CardContent>
              {isFetching && (
                <>
                  <Skeleton variant="rect" width="100%" height={50} />
                  <Box my={2}>
                    <Skeleton variant="rect" width="100%" height={50} />
                  </Box>
                  <Skeleton variant="rect" width="100%" height={50} />
                </>
              )}
              {!isFetching && role && <EditRoleForm role={role} />}
            </CardContent>
          </Card>
          {!isFetching && role && (
            <>
              <Box my={2}>
                <PermissionsListTable
                  permissions={role.permissions}
                  action="remove"
                  title="Permissões do papel"
                  refetch={getRole}
                  role={role.id as string}
                />
              </Box>
              <PermissionsListTable
                permissions={nonAssignedPermissions}
                action="add"
                title="Adicionar permissões"
                refetch={getRole}
                role={role.id as string}
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
  { label: 'Papéis', href: '/painel-de-controle/plataforma/papeis' },
  { label: 'Editar papel' },
];

ShowRolePage.layout = DashboardLayout;

export default ShowRolePage;
