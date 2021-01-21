import React, { FC, useState } from 'react';
import { Formik, Form } from 'formik';
import { useRouter } from 'next/router';
import * as Yup from 'yup';
import { useSnackbar } from 'notistack';
import { FiSave as SaveIcon } from 'react-icons/fi';
import { AiOutlineDelete as DeleteIcon } from 'react-icons/ai';
import S from 'string';
import { makeStyles, Button, CircularProgress, TableBody, Table, TableRow, TableCell } from '@material-ui/core';

import { Role } from 'src/contrats/types';
import BootstrapInput from 'src/components/atoms/inputs/BootstrapInput';
import BootstrapTextArea from 'src/components/atoms/inputs/BootstrapTextArea';
import Box from 'src/components/utilities/Box';
import axios from 'src/utils/axios';
import { Theme } from 'src/theme';

interface EditRoleFormProps {
  role: Role;
}

const EditRoleForm: FC<EditRoleFormProps> = ({ role }) => {
  const classes = useStyles();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const { enqueueSnackbar } = useSnackbar();

  const handleDelete = () => {
    setIsLoading(true);

    axios
      .delete(`/auth/roles/${role.id}`)
      .then(() => {
        setIsLoading(false);
        enqueueSnackbar('Papel deletado', { variant: 'success' });
        router.push('/painel-de-controle/plataforma/papeis');
      })
      .catch(err => {
        if (err.status === 403) {
          window.location.reload();
        } else {
          setIsLoading(false);
          enqueueSnackbar(err.data.message || 'Erro desconhecido', { variant: 'error' });
        }
      });
  };

  return (
    <Formik
      initialValues={{
        label: role.label,
        description: role.description,
        slug: role.slug,
      }}
      validationSchema={Yup.object().shape({
        label: Yup.string().max(255, 'Estás a tentar fazer o quê?').required('A etiqueta é obrigatória'),
        description: Yup.string().required('A descrição é obrigatória'),
      })}
      onSubmit={async ({ label, description }, { setStatus, setSubmitting, setErrors }) => {
        const slug = S(label).slugify().s;

        axios
          .put(`/auth/roles/${role.id}`, { label, description, slug })
          .then(() => {
            setStatus({ success: true });
            setSubmitting(false);

            enqueueSnackbar('Papel atualizado', { variant: 'success' });
            router.push('/painel-de-controle/plataforma/papeis');
          })
          .catch(error => {
            if (error.status === 403) {
              window.location.reload();
            } else {
              setStatus({ success: false });
              if (error.status === 422) {
                error.data.errors.forEach(({ field, message }: { field: string; message: string }) => {
                  setErrors({ [field]: message });
                });
                enqueueSnackbar('Erro', { variant: 'error' });
              } else {
                enqueueSnackbar(error.data.message || 'Erro desconhecido', { variant: 'error' });
              }
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
                  <BootstrapInput
                    error={Boolean(touched.slug && errors.slug)}
                    helperText={touched.slug && errors.slug}
                    fullWidth
                    disabled
                    name="slug"
                    type="text"
                    value={S(values.label).slugify().s}
                    onBlur={handleBlur}
                    onChange={handleChange}
                  />
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
            <Button
              disabled={isSubmitting || isLoading}
              variant="contained"
              color="secondary"
              startIcon={<DeleteIcon />}
              disableElevation
              onClick={handleDelete}
            >
              Deletar
            </Button>
            <Box ml={1} clone>
              <Button
                disabled={isSubmitting || isLoading}
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

export default EditRoleForm;
