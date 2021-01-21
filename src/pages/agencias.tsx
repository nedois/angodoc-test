/* eslint-disable prettier/prettier */
/* eslint-disable no-nested-ternary */
import React, { useEffect, useState } from 'react';
import { HiOutlineOfficeBuilding as AgenciesIcon } from 'react-icons/hi';
import { NextSeo } from 'next-seo';
import {
  Typography,
  Container,
  Box,
  Button,
  TextField,
  MenuItem,
  Grid,
  makeStyles,
  CircularProgress,
} from '@material-ui/core';

import AppLayout from 'src/components/layouts/AppLayout';
import PageBanner from 'src/components/molecules/banners/PageBanner';
import Breadcrumb from 'src/components/molecules/navigation/HeaderBreadcrumb';
import AgencyCard from 'src/components/molecules/cards/AgencyCard';
import AgencyCardSkeleton from 'src/components/molecules/cards/AgencyCardSkeleton';
import AgencySearchForm from 'src/components/molecules/forms/search/AgencySearchForm';
import { Theme } from 'src/theme';
import { PROVINCES } from 'src/constants';
import useFetch from 'src/hooks/useFetch';
import usePrevious from 'src/hooks/usePrevious';
import { MyNextPage } from 'src/contrats/interfaces';
import { Agency } from 'src/contrats/types';

const AgenciesPage: MyNextPage = () => {
  const classes = useStyles();
  const [province, setProvince] = useState('Luanda');
  const prevProvince = usePrevious(province);
  const [page, setPage] = useState(1);
  const [prepo, setPrepo] = useState('de');
  const [agencies, setAgencies] = useState<Agency[]>([]);
  const { data, error } = useFetch(`/agencies/${province}`);

  const handleProvinceChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setProvince(event.target.value);
    const newPrepo = PROVINCES.filter(_province => _province.key === event.target.value)[0].prepo;
    setPrepo(newPrepo || '');
  };

  useEffect(() => {
    if (data) {
      setAgencies(agencies.concat(data.data));
    }

    if ((prevProvince as unknown as string) !== province) {
      setAgencies([]);
      setPage(1);
    }
  }, [data, province, prevProvince, agencies]);

  return (
    <>
      <NextSeo title="Agências" description="Lista das agências ANGODOC" />
      <PageBanner title="Agências" description="Lista das agências ANGODOC" illustration={AgenciesIcon}>
        <Box my={3} width="100%">
          <AgencySearchForm />
        </Box>
      </PageBanner>
      <Box mt={3} pb={3}>
        <Container>
          <Breadcrumb items={breadcrumbItems} />
          <Typography variant="h2" component="h2">
            {`Agências na província ${prepo} `}
            <TextField
              id="province"
              select
              variant="outlined"
              value={province}
              onChange={handleProvinceChange}
              InputProps={{
                classes: {
                  root: classes.provinceInput,
                  focused: classes.provinceInput,
                  notchedOutline: classes.provinceInput,
                },
              }}
            >
              {PROVINCES.map(option => (
                <MenuItem key={option.key} value={option.key}>
                  {option.key}
                </MenuItem>
              ))}
            </TextField>
          </Typography>
          <Box mt={3}>
            <Grid container spacing={2}>
              {!data && !agencies.length && !error ? (
                Array.from(Array(10)).map((skeleton, key) => (
                  <Grid item key={`${skeleton}-${key}`} className={classes.agencyCard}>
                    <AgencyCardSkeleton />
                  </Grid>
                ))
              ) : !agencies.length ? (
                <Grid item xs={12}>
                  <img className={classes.emptyImg} src="/img/cidade-vazia.svg" alt="Nenhuma agência foi encontrada" />
                  <Typography variant="h3" component="p" align="center">
                    Não existem agências nesta província
                  </Typography>
                </Grid>
              ) : (
                    agencies.map(agency => (
                      <Grid item key={agency.id} className={classes.agencyCard}>
                        <AgencyCard agency={agency} />
                      </Grid>
                    ))
                  )}
              {data && !!data.data.length && (
                <Grid item xs={12}>
                  <Button
                    variant="outlined"
                    color="primary"
                    onClick={() => setPage(page + 1)}
                    className={classes.fetchMoreButton}
                    disabled={!data}
                  >
                    Ver mais agências
                    {!data && <CircularProgress size={18} className={classes.fetchMoreButtonLoadingIcon} />}
                  </Button>
                </Grid>
              )}
            </Grid>
          </Box>
        </Container>
      </Box>
    </>
  );
};

const breadcrumbItems = [{ label: 'Agências' }];

const useStyles = makeStyles((theme: Theme) => ({
  agencyCard: {
    [theme.breakpoints.down('md')]: {
      marginBottom: theme.spacing(1),
    },
  },
  provinceInput: {
    border: 'none',
    fontSize: 29,
    letterSpacing: '-0.24px',
    fontWeight: 500,
    color: theme.palette.primary.main,
    [theme.breakpoints.down('md')]: {
      fontSize: 22.5,
    },
    '& .MuiOutlinedInput-input': {
      paddingTop: 0,
      paddingBottom: 0,
      paddingLeft: 0,
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
  fetchMoreButton: {
    margin: '0 auto',
    display: 'flex',
    alignContent: 'center',
  },
  fetchMoreButtonLoadingIcon: {
    marginLeft: theme.spacing(2),
    right: 12,
  },
}));

AgenciesPage.layout = AppLayout;

export default AgenciesPage;
