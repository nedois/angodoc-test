import React, { FC } from 'react';
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
import { MdBusiness as BusinessIcon } from 'react-icons/md';

import { Agency } from 'src/contrats/types';

const useStyles = makeStyles(theme => ({
  fontWeightMedium: {
    fontWeight: theme.typography.fontWeightMedium,
  },
  actionIcon: {
    marginRight: theme.spacing(1),
  },
}));

interface AdminAgencyCardProps {
  agency: Agency;
}

const AdminAgencyCard: FC<AdminAgencyCardProps> = ({ agency }) => {
  const classes = useStyles();

  return (
    <Card>
      <CardHeader title="Agência" />
      <Divider />
      <Table>
        <TableBody>
          <TableRow>
            <TableCell className={classes.fontWeightMedium}>Nome</TableCell>
            <TableCell>
              <Typography variant="body2" color="textSecondary">
                {agency.name}
              </Typography>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className={classes.fontWeightMedium}>Endereço</TableCell>
            <TableCell>
              <Typography variant="body2" color="textSecondary">
                {agency.address}
              </Typography>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className={classes.fontWeightMedium}>Província</TableCell>
            <TableCell>
              <Typography variant="body2" color="textSecondary">
                {agency.province}
              </Typography>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
      <Box p={1} display="flex" flexDirection="column" alignItems="flex-start">
        <Button>
          <BusinessIcon className={classes.actionIcon} />
          Ver agência
        </Button>
      </Box>
    </Card>
  );
};

export default AdminAgencyCard;
