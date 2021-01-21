import React, { useState, useEffect, useCallback } from 'react';
import { NextSeo } from 'next-seo';
import { useSnackbar } from 'notistack';

import useAuth from 'src/hooks/useAuth';
import { PERMISSIONS } from 'src/constants';
import useIsMountedRef from 'src/hooks/useIsMountedRef';
import { MyNextPage } from 'src/contrats/interfaces';
import DashboardLayout from 'src/components/layouts/DashboardLayout';
import DontHavePermission from 'src/components/molecules/notices/FullScreenDontHavePermission';
import { Document } from 'src/contrats/types';
import { axios } from 'src/utils';

const DocumentsPage: MyNextPage = () => {
  const { can } = useAuth();
  const { enqueueSnackbar } = useSnackbar();
  const isMountedRef = useIsMountedRef();
  const [fetching, setFetching] = useState(true);
  const [documents, setDocuments] = useState<Document[]>([]);

  const getDocuments = useCallback(() => {
    axios
      .get('/admin/documents')
      .then(({ data }) => {
        if (isMountedRef.current) {
          setDocuments(data);
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
      getDocuments();
    }
  }, [getDocuments, fetching]);

  if (!can(PERMISSIONS.MANAGE_USERS)) return <DontHavePermission />;

  return (
    <>
      <NextSeo noindex title="Documentos" />
      <h1>Painel de contrôle</h1>
    </>
  );
};

DocumentsPage.layout = DashboardLayout;

export default DocumentsPage;
