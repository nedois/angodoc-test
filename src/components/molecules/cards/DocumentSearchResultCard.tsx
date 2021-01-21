import React from 'react';
import clsx from 'clsx';
import moment from 'moment';
import { BiComment as CommentaryIcon } from 'react-icons/bi';
import { IoMdInformationCircleOutline as ReferenceIcon } from 'react-icons/io';
import { FaRegUserCircle as OwnerIcon } from 'react-icons/fa';
import { MdDateRange as DateIcon } from 'react-icons/md';
import { AiOutlineFileText as TypeIcon } from 'react-icons/ai';
import { Box, Typography, Chip, makeStyles, fade, colors } from '@material-ui/core';

import { Theme } from 'src/theme';
import { Document } from 'src/contrats/types';

export interface DocumentSearchResultCardProps {
  document: Document;
}

const DocumentSearchResultCard: React.FC<DocumentSearchResultCardProps> = ({ document }) => {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <Typography variant="h3" component="h3">
        Informações do documento
      </Typography>
      <Box mt={2}>
        <Typography variant="body1" noWrap className={classes.documentInfo}>
          <ReferenceIcon className={classes.icon} />
          <span>
            <strong className={classes.label}>Referência</strong>
            {document.reference}
          </span>
        </Typography>
        <Typography variant="body1" className={classes.documentInfo}>
          <OwnerIcon className={classes.icon} />
          <span>
            <strong className={classes.label}>Proprietário</strong>
            {document.owner}
          </span>
        </Typography>
        <Typography variant="body1" className={classes.documentInfo}>
          <TypeIcon className={classes.icon} />
          <span>
            <strong className={classes.label}>Tipo</strong>
            {document.type}
          </span>
        </Typography>
        <Typography variant="body1" className={classes.documentInfo}>
          <DateIcon className={classes.icon} />
          <span>
            <strong className={classes.label}>Emitido em</strong>
            {moment(document.emitted_at).format('DD/MM/YYYY')}
          </span>
        </Typography>
        <Typography variant="body1" className={classes.documentInfo}>
          <DateIcon className={classes.icon} />
          <span>
            <strong className={classes.label}>Registado em</strong>
            {moment(document.created_at).format('DD/MM/YYYY')}
          </span>
        </Typography>
        <Typography variant="body1" component="div" noWrap className={classes.documentInfo}>
          <DateIcon className={classes.icon} />
          <span>
            <strong className={classes.label}>Recuperado em</strong>
            <Chip
              size="small"
              label={document.recovered_at ? moment(document.recovered_at).format('DD/MM/YYYY') : 'Ainda na agência'}
              className={clsx(classes.chip, document.recovered_at && 'recovered')}
            />
          </span>
        </Typography>
        <Typography variant="body1" className={classes.documentInfo}>
          <CommentaryIcon className={classes.icon} />
          <span>
            <strong className={classes.label}>Comentário</strong>
            {document.commentary}
          </span>
        </Typography>
      </Box>
    </Box>
  );
};

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    minHeight: '100%',
    borderRadius: 12,
    padding: theme.spacing(2),
    border: `1px solid ${fade(theme.palette.primary.main, 0.3)}`,
    '&:hover': {
      backgroundColor: fade(theme.palette.primary.main, 0.03),
      cursor: 'pointer',
    },
  },
  icon: {
    fontSize: 32,
    flexShrink: 0,
    backgroundColor: fade(theme.palette.primary.main, 0.15),
    color: theme.palette.primary.main,
    borderRadius: 50,
    padding: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  label: {
    marginRight: theme.spacing(1),
    color: theme.palette.primary.main,
    display: 'block',
    fontSize: 12,
  },
  documentInfo: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: theme.spacing(2),
  },
  chip: {
    color: colors.red.A700,
    backgroundColor: fade(colors.red.A700, 0.1),
    '&.recovered': {
      color: colors.green.A700,
      backgroundColor: fade(colors.green.A700, 0.1),
    },
  },
}));

export default DocumentSearchResultCard;
