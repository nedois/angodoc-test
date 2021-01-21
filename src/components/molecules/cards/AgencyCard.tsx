import React from 'react';
import clsx from 'clsx';
import { HiOutlinePhone as PhoneIcon, HiOutlineLocationMarker as AddressIcon } from 'react-icons/hi';
import { MdLocationSearching as ProvinceIcon } from 'react-icons/md';
import { Box, Typography, Chip, makeStyles, fade, colors } from '@material-ui/core';

import { Theme } from 'src/theme';
import { Agency } from 'src/contrats/types';

export interface AgencyCardProps {
  agency: Agency;
}

const AgencyCard: React.FC<AgencyCardProps> = ({ agency }) => {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <Typography variant="h3" component="h3">
        {agency.name}
        <Chip
          size="small"
          label={agency.is_open ? 'Aberta' : 'Fechada'}
          className={clsx(classes.chip, agency.is_open && 'open')}
        />
      </Typography>
      <Box mt={2}>
        <Typography variant="body1" className={classes.contactInfo}>
          <PhoneIcon className={classes.icon} />
          <span>
            <strong className={classes.label}>Telefone</strong>
            {agency.phone}
          </span>
        </Typography>
        <Typography variant="body1" className={classes.contactInfo}>
          <AddressIcon className={classes.icon} />
          <span>
            <strong className={classes.label}>Endereço</strong>
            {agency.address}
          </span>
        </Typography>
        <Typography variant="body1" className={classes.contactInfo}>
          <ProvinceIcon className={classes.icon} />
          <span>
            <strong className={classes.label}>Província</strong>
            {agency.province}
          </span>
        </Typography>
      </Box>
    </Box>
  );
};

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    width: 288,
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
  contactInfo: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: theme.spacing(2),
  },
  label: {
    marginRight: theme.spacing(1),
    color: theme.palette.primary.main,
    display: 'block',
    fontSize: 12,
  },
  chip: {
    marginLeft: theme.spacing(1),
    color: colors.red.A700,
    backgroundColor: fade(colors.red.A700, 0.1),
    '&.open': {
      color: colors.green.A700,
      backgroundColor: fade(colors.green.A700, 0.1),
    },
  },
}));

export default AgencyCard;
