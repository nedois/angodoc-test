import React, { FC } from 'react';
import RouterLink from 'next/link';
import {
  Box,
  Button,
  makeStyles,
  Card,
  CardHeader,
  Divider,
  Table,
  TableCell,
  TableBody,
  TableRow,
  Typography,
} from '@material-ui/core';
import { MdPersonOutline as PersonIcon } from 'react-icons/md';

import { Finder } from 'src/contrats/types';

const useStyles = makeStyles(theme => ({
  fontWeightMedium: {
    fontWeight: theme.typography.fontWeightMedium,
  },
  actionIcon: {
    marginRight: theme.spacing(1),
  },
}));

interface FinderCardProps {
  finder: Finder;
}

const FinderCard: FC<FinderCardProps> = ({ finder }) => {
  const classes = useStyles();

  return (
    <Card>
      <CardHeader title="Encontrador" />
      <Divider />
      <Table>
        <TableBody>
          <TableRow>
            <TableCell className={classes.fontWeightMedium}>Nome</TableCell>
            <TableCell>
              <Typography variant="body2" color="textSecondary">
                {`${finder.first_name} ${finder.last_name}`}
              </Typography>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className={classes.fontWeightMedium}>Idade</TableCell>
            <TableCell>
              <Typography variant="body2" color="textSecondary">
                {`${finder.age} anos`}
              </Typography>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className={classes.fontWeightMedium}>N° BI</TableCell>
            <TableCell>
              <Typography variant="body2" color="textSecondary">
                {finder.bi}
              </Typography>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className={classes.fontWeightMedium}>Sexo</TableCell>
            <TableCell>
              <Typography variant="body2" color="textSecondary">
                {finder.gender === 'M' ? 'Masculino' : 'Feminino'}
              </Typography>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className={classes.fontWeightMedium}>Ocupação</TableCell>
            <TableCell>
              <Typography variant="body2" color="textSecondary">
                {finder.job}
              </Typography>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className={classes.fontWeightMedium}>Endereço</TableCell>
            <TableCell>
              <Typography variant="body2" color="textSecondary">
                {finder.address}
              </Typography>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className={classes.fontWeightMedium}>Provincia</TableCell>
            <TableCell>
              <Typography variant="body2" color="textSecondary">
                {finder.province}
              </Typography>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className={classes.fontWeightMedium}>Telefone</TableCell>
            <TableCell>
              <Typography variant="body2" color="textSecondary">
                {finder.phone}
              </Typography>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <Box p={1} display="flex" flexDirection="column" alignItems="flex-start">
        <RouterLink href={`/painel-de-controle/recursos/encontradores/${finder.id}`}>
          <Button>
            <PersonIcon className={classes.actionIcon} />
            Ver encontrador
          </Button>
        </RouterLink>
      </Box>
    </Card>
  );
};

export default FinderCard;
