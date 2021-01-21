import React, { FC } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { useSnackbar } from 'notistack';
import { FiSave as SaveIcon } from 'react-icons/fi';
import { AiOutlineDelete as DeleteIcon } from 'react-icons/ai';
import { makeStyles, Box, Button, CircularProgress, TableBody, Table, TableRow, TableCell } from '@material-ui/core';

import { Role } from 'src/contrats/types';
import BootstrapInput from 'src/components/atoms/inputs/BootstrapInput';
import BootstrapTextArea from 'src/components/atoms/inputs/BootstrapTextArea';
import axios from 'src/utils/axios';
import { Theme } from 'src/theme';

interface EditRolePermissionsFormProps {
  role: Role;
}

const EditRolePermissionsForm: FC<EditRolePermissionsFormProps> = ({ role }) => {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();

  return (
    <Formik
      initialValues={{
        label: role.label,
        description: role.description,
      }}
      validationSchema={Yup.object().shape({
        label: Yup.string().max(255, 'Estás a tentar fazer o quê?').required('A etiqueta é obrigatória'),
        description: Yup.string().required('A descrição é obrigatória'),
      })}
      onSubmit={async ({ label, description }, { setStatus, setSubmitting }) => {
        axios
          .post(`/auth/roles/${role.slug}`, { label, description })
          .then(() => {
            setStatus({ success: true });
            setSubmitting(false);

            enqueueSnackbar('Sessão iniciada com sucesso', { variant: 'success' });
          })
          .catch(err => {
            if (err.status === 403) {
              window.location.reload();
            } else {
              setStatus({ success: false });
              enqueueSnackbar(err.data.message || 'Erro desconhecido', { variant: 'error' });
              setSubmitting(false);
            }
          });
      }}
    >
      {({ errors, handleBlur, handleChange, isSubmitting, touched, values }) => (
        <Form>
          <Table>
            <TableBody>
              <TableRow>
                <TableCell className={classes.fontWeightMedium}>Etiqueta</TableCell>
                <TableCell>
                  <BootstrapInput
                    error={Boolean(touched.label && errors.label)}
                    helperText={touched.label && errors.label}
                    fullWidth
                    required
                    name="label"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    type="text"
                    value={values.label}
                  />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className={classes.fontWeightMedium}>Slug</TableCell>
                <TableCell>
                  <BootstrapInput fullWidth disabled type="text" value={role.slug} />
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell className={classes.fontWeightMedium}>Descrição</TableCell>
                <TableCell>
                  <BootstrapTextArea
                    error={Boolean(touched.description && errors.description)}
                    helperText={touched.description && errors.description}
                    fullWidth
                    required
                    name="description"
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={values.description}
                  />
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
          <Box mt={2}>
            <Box mr={1}>
              <Button
                disabled={isSubmitting}
                type="submit"
                variant="contained"
                color="primary"
                startIcon={<SaveIcon />}
                disableElevation
              >
                Salvar
                {isSubmitting && <CircularProgress size={18} className={classes.loadingIcon} />}
              </Button>
            </Box>
            <Button
              disabled={isSubmitting}
              variant="contained"
              color="secondary"
              startIcon={<DeleteIcon />}
              disableElevation
            >
              Deletar
            </Button>
          </Box>
        </Form>
      )}
    </Formik>
  );
};

const useStyles = makeStyles((theme: Theme) => ({
  loadingIcon: {
    position: 'absolute',
    right: 12,
  },
  fontWeightMedium: {
    fontWeight: theme.typography.fontWeightMedium,
  },
}));

export default EditRolePermissionsForm;
