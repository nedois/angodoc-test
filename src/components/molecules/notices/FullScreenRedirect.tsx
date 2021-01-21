import React, { FC } from 'react';
import { CircularProgress, Typography } from '@material-ui/core';

import Logo from 'src/components/atoms/Logo';
import Box from 'src/components/utilities/Box';

const FullScreenRedirect: FC = () => {
  return (
    <Box display="flex" flexDirection="column" alignItems="center" height="100vh" justifyContent="center">
      <Box mb={2} clone>
        <Logo height={64} />
      </Box>
      <Box my={2} clone>
        <Typography variant="h1" component="h1">
          Redirectionando
        </Typography>
      </Box>
      <CircularProgress />
    </Box>
  );
};

export default FullScreenRedirect;
