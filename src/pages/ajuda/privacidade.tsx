import React, { useState } from 'react';
import Link from 'next/link';
import { BiUserX as PrivacityIcon } from 'react-icons/bi';
import { NextSeo } from 'next-seo';
import { MdExpandMore as ExpandMoreIcon } from 'react-icons/md';
import { Typography, Box, Button, Accordion, AccordionDetails, AccordionSummary, Container } from '@material-ui/core';

import AppLayout from 'src/components/layouts/AppLayout';
import PageBanner from 'src/components/molecules/banners/PageBanner';
import Breadcrumb from 'src/components/molecules/navigation/HeaderBreadcrumb';
import { MyNextPage } from 'src/contrats/interfaces';

const PrivacityHelpPage: MyNextPage = () => {
  const [expanded, setExpanded] = useState<string | false>(false);

  // eslint-disable-next-line @typescript-eslint/ban-types
  const handleChange = (panel: string) => (event: React.ChangeEvent<{}>, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <>
      <NextSeo
        title="Centro de ajuda | Privacidade"
        description="Informações úteis relevantes a privacidade dos cidadãos"
      />
      <PageBanner
        title="Centro de ajuda | Privacidade"
        description="Informações úteis relevantes a privacidade dos cidadãos"
        illustration={PrivacityIcon}
      />
      <Box mt={3} pb={3}>
        <Container>
          <Breadcrumb items={breadcrumbItems} />
          <Typography variant="h2" component="h2">
            Perguntas frequentes
          </Typography>
          <Box mt={3}>
            {questions.map((question, key) => (
              <Accordion
                expanded={expanded === `question${key}`}
                onChange={handleChange(`question${key}`)}
                key={`question${key}`}
              >
                <AccordionSummary expandIcon={<ExpandMoreIcon />}>
                  <Typography variant="h5" component="h5">
                    {question.question}
                  </Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <Typography variant="body1" component="p">
                    {question.answer}
                  </Typography>
                </AccordionDetails>
              </Accordion>
            ))}
          </Box>
          <Box mt={3}>
            <Typography variant="body1" component="p">
              <Box component="span" mr={2}>
                Não encontrou uma resposta para a sua pergunta?
              </Box>
              <Link href="/contacto">
                <Button variant="outlined" color="primary" component="a" size="small">
                  Entrar em contacto
                </Button>
              </Link>
            </Typography>
          </Box>
        </Container>
      </Box>
    </>
  );
};

const breadcrumbItems = [
  {
    to: '/ajuda',
    label: 'Ajuda',
  },
  {
    label: 'Privacidade',
  },
];

const questions = [
  {
    question: 'Pergunta 1',
    answer: 'Resposta 1',
  },
];

PrivacityHelpPage.layout = AppLayout;

export default PrivacityHelpPage;
