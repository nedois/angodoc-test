import React, { FC } from 'react';
import RouterLink from 'next/link';
import { Typography, Button } from '@material-ui/core';

import Logo from 'src/components/atoms/Logo';
import Box from 'src/components/utilities/Box';

const FullScreenPrivate: FC = () => {
  return (
    <Box display="flex" flexDirection="column" alignItems="center" height="100vh" justifyContent="center">
      <Logo height={64} />
      <Box my={2} clone>
        <Typography variant="h1" component="h1">
          Acesso restrito
        </Typography>
      </Box>
      <RouterLink href="/entrar">
        <Button variant="outlined" color="primary">
          Entrar
        </Button>
      </RouterLink>
    </Box>
  );
};

export default FullScreenPrivate;
