import React, { useState } from 'react';
import Link from 'next/link';
import { RiPassportLine as DocumentsIcon } from 'react-icons/ri';
import { NextSeo } from 'next-seo';
import { MdExpandMore as ExpandMoreIcon } from 'react-icons/md';
import { Typography, Box, Button, Accordion, AccordionDetails, AccordionSummary, Container } from '@material-ui/core';

import AppLayout from 'src/components/layouts/AppLayout';
import PageBanner from 'src/components/molecules/banners/PageBanner';
import Breadcrumb from 'src/components/molecules/navigation/HeaderBreadcrumb';
import { MyNextPage } from 'src/contrats/interfaces';

const DocumentsHelpPage: MyNextPage = () => {
  const [expanded, setExpanded] = useState<string | false>(false);

  // eslint-disable-next-line @typescript-eslint/ban-types
  const handleChange = (panel: string) => (event: React.ChangeEvent<{}>, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <>
      <NextSeo title="Centro de ajuda | Documentos" description="Informações úteis relevantes aos documentos" />
      <PageBanner
        title="Centro de ajuda | Documentos"
        description="Informações úteis relevantes aos documentos"
        illustration={DocumentsIcon}
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
    label: 'Documentos',
  },
];

const questions = [
  {
    question: 'Encontrei um documento, o que fazer?',
    answer:
      'Se encontrares um documento perdido na via pública, dirija-se imediatamente à um dos nossos parceiros mais próximo e faça a entrega. A lista de parceiros encontra-se no menu Agências.',
  },
  {
    question: 'Perdi um documento o que fazer?',
    answer:
      'Se perderes algum documento, deverás aguardar 24 horas para começares a pesquisa-lo no nosso sistema de buscas.',
  },
  {
    question: 'Como pesquisar o meu documento?',
    answer:
      'A pesquisa de qualquer documento perdido, é feito na página Inicial, digitando o número do documento no campo de buscas.',
  },
  {
    question: 'Posso pesquisar pelo nome do documento?',
    answer: 'Não! A pesquisa é exclusivamente feita com o número do documento',
  },
  {
    question: 'Encontrei o meu documento na pesquisa o que fazer?',
    answer:
      'Dirija-se ao endereço indicado no resultado da pesquisa, levando consigo uma prova de identidade para a recepção do documento perdido.',
  },
];

DocumentsHelpPage.layout = AppLayout;

export default DocumentsHelpPage;
