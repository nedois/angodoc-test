import React from 'react';
import { HiOutlineOfficeBuilding as AgenciesIcon } from 'react-icons/hi';
import { RiPassportLine as DocumentsIcon, RiAdminLine as AdminIcon } from 'react-icons/ri';
import { NextSeo } from 'next-seo';
import { BiUserX as PrivacityIcon } from 'react-icons/bi';
import { IoMdHelp as HelpIcon } from 'react-icons/io';
import { Typography, Box, Grid, Container, makeStyles } from '@material-ui/core';

import { Theme } from 'src/theme';
import AppLayout from 'src/components/layouts/AppLayout';
import PageBanner from 'src/components/molecules/banners/PageBanner';
import HelpTopicCard, { HelpTopicCardProps } from 'src/components/molecules/cards/HelpTopicCard';
import Breadcrumb from 'src/components/molecules/navigation/HeaderBreadcrumb';
import { MyNextPage } from 'src/contrats/interfaces';

const HelpPage: MyNextPage = () => {
  const classes = useStyles();

  return (
    <>
      <NextSeo title="Centro de ajuda" description="Encontre respostas para as suas dúvidas" />
      <PageBanner
        title="Centro de ajuda"
        description="Encontre respostas para as suas dúvidas"
        illustration={HelpIcon}
      />
      <Box mt={3} pb={3}>
        <Container>
          <Breadcrumb items={breadcrumbItems} />
          <Typography variant="h2" component="h2">
            Tópicos
          </Typography>
          <Box mt={3}>
            <Grid container spacing={2}>
              {helpTopics.map(topic => (
                <Grid item key={topic.path} className={classes.helpTopicCard}>
                  <HelpTopicCard
                    illustration={topic.illustration}
                    title={topic.title}
                    description={topic.description}
                    path={topic.path}
                  />
                </Grid>
              ))}
            </Grid>
          </Box>
        </Container>
      </Box>
    </>
  );
};

const breadcrumbItems = [{ label: 'Ajuda' }];

const helpTopics: HelpTopicCardProps[] = [
  {
    illustration: AgenciesIcon,
    path: '/ajuda/agencias',
    title: 'Agências',
    description: 'Saiba quais são as agências Angodoc ou como se tornar uma agência Angodoc.',
  },
  {
    illustration: DocumentsIcon,
    path: '/ajuda/documentos',
    title: 'Documentos',
    description:
      'O que fazer quando encontrar um documento, onde encontrar o seu documento ou como e onde tratar um certo documento',
  },
  {
    illustration: AdminIcon,
    path: '/ajuda/administracao',
    title: 'Administração',
    description: 'Problemas de acesso a área administrativa?',
  },
  {
    illustration: PrivacityIcon,
    path: '/ajuda/privacidade',
    title: 'Privacidade',
    description: 'Como os meus dados são tratados na plataforma? Para que fim eles são utilizados?',
  },
];

const useStyles = makeStyles((theme: Theme) => ({
  helpTopicCard: {
    [theme.breakpoints.down('md')]: {
      marginBottom: theme.spacing(1),
    },
  },
}));

HelpPage.layout = AppLayout;

export default HelpPage;
