import React, { FC, ReactNode } from 'react';
import {
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

import { Document } from 'src/contrats/types';

const useStyles = makeStyles(theme => ({
  fontWeightMedium: {
    fontWeight: theme.typography.fontWeightMedium,
  },
}));

interface DocumentCardProps {
  document: Document;
  children?: ReactNode;
}

const DocumentCard: FC<DocumentCardProps> = ({ document, children }) => {
  const classes = useStyles();

  return (
    <Card>
      <CardHeader title="Documentos" />
      <Divider />
      <Table>
        <TableBody>
          <TableRow>
            <TableCell className={classes.fontWeightMedium}>Referência</TableCell>
            <TableCell>
              <Typography variant="body2" color="textSecondary">
                {document.reference}
              </Typography>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className={classes.fontWeightMedium}>Tipo</TableCell>
            <TableCell>
              <Typography variant="body2" color="textSecondary">
                {document.type}
              </Typography>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className={classes.fontWeightMedium}>Proprietário</TableCell>
            <TableCell>
              <Typography variant="body2" color="textSecondary">
                {document.owner}
              </Typography>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className={classes.fontWeightMedium}>Data de emissão</TableCell>
            <TableCell>
              <Typography variant="body2" color="textSecondary">
                {document.emitted_at}
              </Typography>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className={classes.fontWeightMedium}>Registado por</TableCell>
            <TableCell>
              <Typography variant="body2" color="textSecondary">
                {document.recorder?.long_name}
              </Typography>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className={classes.fontWeightMedium}>Comentário</TableCell>
            <TableCell>
              <Typography variant="body2" color="textSecondary">
                {document.commentary ? document.commentary : 'Sem comentários'}
              </Typography>
            </TableCell>
          </TableRow>
          <TableRow>
            <TableCell className={classes.fontWeightMedium}>Recuperado</TableCell>
            <TableCell>
              <Typography variant="body2" color="textSecondary">
                {document.recovered_at ? document.recovered_at : 'Não'}
              </Typography>
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
      {children}
    </Card>
  );
};

export default DocumentCard;
