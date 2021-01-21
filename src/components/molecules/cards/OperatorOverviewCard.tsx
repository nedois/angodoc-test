import React, { FC } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';
import RouterLink from 'next/link';
import {
  Box,
  Typography,
  Card,
  Table,
  TableHead,
  TableRow,
  TableBody,
  TableCell,
  Tooltip,
  IconButton,
  SvgIcon,
} from '@material-ui/core';
import { FiArrowRight as ArrowRightIcon } from 'react-icons/fi';

import { Agency } from 'src/contrats/types';

interface OperatorOverviewCardProps {
  agency: Agency;
}

const OperatorOverviewCard: FC<OperatorOverviewCardProps> = ({ agency }) => {
  return (
    <Box mt={4}>
      <Typography variant="h3" color="textPrimary">
        Minha agência
      </Typography>
      <Box mt={3}>
        <Card>
          <PerfectScrollbar>
            <Box minWidth={700}>
              <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Nome</TableCell>
                    <TableCell>Director</TableCell>
                    <TableCell>Endereço</TableCell>
                    <TableCell>Província</TableCell>
                    <TableCell align="right">Acções</TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  <TableRow hover key={agency.id}>
                    <TableCell>
                      <Typography color="inherit" variant="h6">
                        {agency.name}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Typography color="inherit" variant="h6">
                        {agency.director?.full_name || 'Sem director'}
                      </Typography>
                    </TableCell>
                    <TableCell>{agency.address}</TableCell>
                    <TableCell>{agency.province}</TableCell>
                    <TableCell align="right">
                      <Tooltip title="Ver detalhes" aria-label="ver detalhes">
                        <RouterLink href="painel-de-controle/minha-agencia">
                          <IconButton>
                            <SvgIcon fontSize="small">
                              <ArrowRightIcon />
                            </SvgIcon>
                          </IconButton>
                        </RouterLink>
                      </Tooltip>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </Box>
          </PerfectScrollbar>
        </Card>
      </Box>
    </Box>
  );
};

export default OperatorOverviewCard;
