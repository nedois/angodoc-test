/* eslint-disable react/jsx-closing-tag-location */
/* eslint-disable react/jsx-indent */
/* eslint-disable prettier/prettier */
/* eslint-disable no-nested-ternary */
import React, { useEffect, useCallback, useState } from 'react';
import { useRouter } from 'next/router';
import { MdSearch as SearchIcon } from 'react-icons/md';
import { Typography, Box, Container, makeStyles, Grid } from '@material-ui/core';

import AppLayout from 'src/components/layouts/AppLayout';
import { Theme } from 'src/theme';
import PageBanner from 'src/components/molecules/banners/PageBanner';
import Breadcrumb from 'src/components/molecules/navigation/HeaderBreadcrumb';
import AgencyCardSkeleton from 'src/components/molecules/cards/AgencyCardSkeleton';
import AgencyCard from 'src/components/molecules/cards/AgencyCard';
import DocumentSearchResultCardSkeleton from 'src/components/molecules/cards/DocumentSearchResultCardSkeleton';
import DocumentSearchResultCard from 'src/components/molecules/cards/DocumentSearchResultCard';
import { MyNextPage } from 'src/contrats/interfaces';
import { Agency, Document } from 'src/contrats/types';
import { axios } from 'src/utils'

const breadcrumbItems = [{ label: 'Resultado da pesquisa' }];

const SearchResultPage: MyNextPage = () => {
  const classes = useStyles();
  const router = useRouter();
  const [document, setDocument] = useState<Document | null>(null)
  const [fetching, setFetching] = useState(true)

  const { documentRef } = router.query;

  const getDocument = useCallback(() => {
    axios.get(`/documents/${documentRef}`)
      .then(({ data }) => setDocument(data))
      .catch(err => console.log(err))
      .finally(() => setFetching(false))
  }, [documentRef])

  useEffect(() => {
    getDocument();
  }, [getDocument]);

  return (
    <>
      <PageBanner title="Pesquisa" description={`Resultado da pesquisa: ${documentRef}`} illustration={SearchIcon} />
      <Box mt={3} pb={3}>
        <Container className={classes.container}>
          <Breadcrumb items={breadcrumbItems} />
          <Typography variant="h1" component="h1">
            Resultado da pesquisa
          </Typography>
          <Box mt={3}>
            <Grid container spacing={2}>
              {fetching && (
                <>
                  <Grid item className={classes.documentCard}>
                    <DocumentSearchResultCardSkeleton />
                  </Grid>
                  <Grid item>
                    <AgencyCardSkeleton />
                  </Grid>
                </>
              )}

              {!fetching && (
                <>
                  {document ? (
                    <>
                      <Grid item className={classes.documentCard} xs={12} md={7} lg={9}>
                        <DocumentSearchResultCard document={document} />
                      </Grid>
                      <Grid item>
                        <AgencyCard agency={document.agency as Agency} />
                      </Grid>
                    </>
                  ) : (
                      <Grid item xs={12}>
                        <img src="/img/caixa-vazia.svg" alt="Nenhum documento encontrado" className={classes.emptyImg} />
                        <Typography variant="h3" component="p" align="center">
                          Nenhum documento encontrado com essa referência
                        </Typography>
                      </Grid>
                    )}
                </>
              )}
            </Grid>
          </Box>
        </Container>
      </Box>
    </>
  );
};

const useStyles = makeStyles((theme: Theme) => ({
  container: {},
  documentCard: {
    [theme.breakpoints.down('md')]: {
      marginBottom: theme.spacing(1),
    },
  },
  emptyImg: {
    maxWidth: 520,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom: theme.spacing(2),
    marginTop: theme.spacing(4),
    display: 'block',
    [theme.breakpoints.down('md')]: {
      maxWidth: 340,
    },
  },
}));

SearchResultPage.layout = AppLayout;

export default SearchResultPage;
