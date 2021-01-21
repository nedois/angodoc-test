import React, { FC } from 'react';
import RouterLink from 'next/link';
import { useRouter } from 'next/router';
import { Button, Typography } from '@material-ui/core';

import Box from 'src/components/utilities/Box';

const FullScreenDontHavePermission: FC = () => {
  const router = useRouter();

  const handleBack = () => router.back();

  return (
    <Box display="flex" flexDirection="column" alignItems="center" height="100vh" justifyContent="center">
      <Typography variant="h1" component="h1" align="center">
        Proíbido
      </Typography>
      <Box mt={1} clone>
        <Typography variant="h2" component="h2" align="center">
          Não tem permissão de executar essa ação
        </Typography>
      </Box>
      <Box mb={3} clone>
        <Typography align="center">Caso ache que é um erro, entre em contacto com a equipa de suporte.</Typography>
      </Box>
      <Box mb={2} display="flex" flexDirection="row">
        <Box mr={1} clone>
          <Button variant="outlined" color="primary" onClick={handleBack}>
            Voltar
          </Button>
        </Box>
        <RouterLink href="/">
          <Button variant="outlined" color="primary">
            Voltar a página inicial
          </Button>
        </RouterLink>
      </Box>
      <img src="/img/ilustracoes/proibido.svg" alt="Não tem permissão" style={{ maxWidth: '100vw', maxHeight: 500 }} />
    </Box>
  );
};

export default FullScreenDontHavePermission;
