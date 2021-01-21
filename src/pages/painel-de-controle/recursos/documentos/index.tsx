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
import { Document } from 'src/contrats/types';
import { axios } from 'src/utils';
import Box from 'src/components/utilities/Box';
// import AddDocumentModal from 'src/components/molecules/modals/AddDocumentModal';

const DocumentsPage: MyNextPage = () => {
  const { can } = useAuth();
  const { enqueueSnackbar } = useSnackbar();
  const isMountedRef = useIsMountedRef();
  const [fetching, setFetching] = useState(true);
  const [documents, setDocuments] = useState<Document[]>([]);
  const [documentsRows, setDocumentsRows] = useState<any>([]);
  const [modal, setModal] = useState(false);

  const handleDocummentAddSuccess = (document: Document) => {
    setDocuments([...documents, document]);
    setModal(false);
  };

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

  useEffect(() => {
    setDocumentsRows(
      documents.map(document => {
        return {
          id: document.id,
          cells: [
            { child: document.reference },
            { child: document.type },
            { child: document.owner },
            { child: document.finder },
            { child: document.agency?.name },
            { child: document.recorder?.full_name },
          ],
        };
      }),
    );
  }, [documents]);

  if (!can(PERMISSIONS.MANAGE_USERS)) return <DontHavePermission />;

  return (
    <>
      <NextSeo noindex title="Agências" />

      {/* <AddDocumentModal open={modal} onClose={() => setModal(false)} onSuccess={handleDocummentAddSuccess} /> */}

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
            headCells={documentsHeadCells}
            bodyRows={documentsRows}
          />
        </Box>
      </Container>
    </>
  );
};

const documentsHeadCells = [
  { id: 'reference', child: 'Referência' },
  { id: 'type', child: 'Tipo' },
  { id: 'owner', child: 'Proprietário' },
  { id: 'finder', child: 'Encontrado por' },
  { id: 'agency', child: 'Agência' },
  { id: 'recorder', child: 'Registrado por' },
];

const breadcrumbItems = [
  { label: 'Painel de contrôle', href: '/painel-de-controle' },
  { label: 'Recursos', href: '/painel-de-controle/recursos' },
  { label: 'Agências' },
];

DocumentsPage.layout = DashboardLayout;

export default DocumentsPage;
