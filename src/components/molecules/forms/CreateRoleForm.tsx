import React, { FC } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { useSnackbar } from 'notistack';
import { useRouter } from 'next/router';
import S from 'string';
import { makeStyles, Box, Button, CircularProgress, TableBody, Table, TableRow, TableCell } from '@material-ui/core';

import BootstrapInput from 'src/components/atoms/inputs/BootstrapInput';
import BootstrapTextArea from 'src/components/atoms/inputs/BootstrapTextArea';
import axios from 'src/utils/axios';
import { Theme } from 'src/theme';

const CreateRoleForm: FC = () => {
  const router = useRouter();
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();

  return (
    <Formik
      initialValues={{
        label: '',
        slug: '',
        description: '',
        submit: null,
      }}
      validationSchema={Yup.object().shape({
        label: Yup.string()
          .min(3, 'A étiqueta deve ter no mínimo 3 letras')
          .max(255, 'Estás a tentar fazer o quê?')
          .required('A etiqueta é obrigatória'),
        description: Yup.string()
          .min(3, 'A descrição deve ter no mínimo 3 letras')
          .required('A descrição é obrigatória'),
      })}
      onSubmit={async ({ label, description }, { setStatus, setSubmitting, setErrors }) => {
        const slug = S(label).slugify().s;

        axios
          .post('/auth/roles', { label, description, slug })
          .then(() => {
            setStatus({ success: true });
            setSubmitting(false);

            enqueueSnackbar('Papel criado com sucesso', { variant: 'success' });
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
                    onBlur={handleBlur}
                    onChange={handleChange}
                    value={S(values.label).slugify().s}
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
            <Button disabled={isSubmitting} type="submit" variant="contained" color="primary" disableElevation>
              Criar papel
              {isSubmitting && <CircularProgress size={18} className={classes.loadingIcon} />}
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

export default CreateRoleForm;
