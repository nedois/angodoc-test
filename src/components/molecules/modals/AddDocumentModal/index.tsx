import React from 'react';
import { Modal, Typography, makeStyles } from '@material-ui/core';

import Box from 'src/components/utilities/Box';
import { Theme } from 'src/theme';
import { Agency } from 'src/contrats/types';
import AddAgencyForm from './AddDocumentForm';

export interface AddAgencyModalProps {
  open: boolean;
  onClose: () => void;
  onSuccess: (agency: Agency) => void;
}

const AddAgencyModal: React.FC<AddAgencyModalProps> = ({ open, onClose, onSuccess }) => {
  const classes = useStyles();
  return (
    <Modal open={open} onClose={onClose}>
      <Box className={classes.root}>
        <Box>
          <Box mb={2} clone>
            <Typography variant="h2" component="h2">
              Adicionar agência
            </Typography>
          </Box>

          <Box mb={2} clone>
            <AddAgencyForm onSuccess={onSuccess} />
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    position: 'absolute',
    minWidth: 520,
    outline: 'none',
    borderRadius: theme.spacing(1),
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
  },
}));

export default AddAgencyModal;
