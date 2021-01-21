import React, { FC, useState, useEffect, useCallback } from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useSnackbar } from 'notistack';
import { TextField, makeStyles, Box, Button, CircularProgress, Grid } from '@material-ui/core';
import { Alert } from '@material-ui/lab';

import axios from 'src/utils/axios';
import { PROVINCES } from 'src/constants';
import { Agency, User } from 'src/contrats/types';
import useIsMountedRef from 'src/hooks/useIsMountedRef';

interface AddDocumentFormProps {
  onSuccess: (agency: Agency) => void;
}

const AddDocumentForm: FC<AddDocumentFormProps> = ({ onSuccess }) => {
  const classes = useStyles();
  const isMountedRef = useIsMountedRef();
  const { enqueueSnackbar } = useSnackbar();
  const [users, setUsers] = useState<User[]>([]);

  const getUsers = useCallback(() => {
    axios
      .get('/admin/documents/users')
      .then(({ data }) => {
        if (isMountedRef.current) {
          setUsers(data);
        }
      })
      .catch(error => {
        enqueueSnackbar(error.message, { variant: 'error' });
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isMountedRef]);

  useEffect(() => {
    getUsers();
  }, [getUsers]);

  return (
    <Formik
      initialValues={{
        name: '',
        address: '',
        phone: '',
        province: 'Luanda',
        director_id: '844daz4azdz',
        submit: null,
      }}
      validationSchema={Yup.object().shape({
        name: Yup.string().max(255).required('O nome é obrigatório').nullable(),
        address: Yup.string().max(255).required('O endereço é obrigatório').nullable(),
        phone: Yup.string().max(255).required('O telefone é obrigatório').nullable(),
        director_id: Yup.string().max(255).required('O director é obrigatório').nullable(),
      })}
      onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
        try {
          const response = await axios.post('/admin/agencies', values);

          setStatus({ success: true });
          setSubmitting(false);

          enqueueSnackbar('Agência adicionada', { variant: 'success' });

          onSuccess(response.data);
        } catch (err) {
          setStatus({ success: false });
          setErrors({ submit: err.data.message || 'Erro desconhecido' });
          setSubmitting(false);
        }
      }}
    >
      {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
        <form onSubmit={handleSubmit}>
          <Box mb={3}>
            <Grid container spacing={3}>
              <Grid item xs={12}>
                <TextField
                  error={Boolean(touched.name && errors.name)}
                  fullWidth
                  autoFocus
                  required
                  helperText={touched.name && errors.name}
                  label="Nome"
                  margin="normal"
                  name="name"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  type="text"
                  value={values.name}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12} lg={6}>
                <TextField
                  label="Director"
                  name="director_id"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  required
                  select
                  variant="outlined"
                  fullWidth
                  SelectProps={{ native: true }}
                  value={values.director_id}
                >
                  {users.map(user => (
                    <option key={user.id} value={user.id}>
                      {user.long_name}
                    </option>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={12} lg={6}>
                <TextField
                  label="Província"
                  name="province"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  required
                  select
                  variant="outlined"
                  fullWidth
                  SelectProps={{ native: true }}
                  value={values.province}
                >
                  {PROVINCES.map(({ key }) => (
                    <option key={key} value={key}>
                      {key}
                    </option>
                  ))}
                </TextField>
              </Grid>
              <Grid item xs={12}>
                <TextField
                  error={Boolean(touched.phone && errors.phone)}
                  fullWidth
                  helperText={touched.phone && errors.phone}
                  label="Telefone"
                  name="phone"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  required
                  value={values.phone}
                  variant="outlined"
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  error={Boolean(touched.address && errors.address)}
                  fullWidth
                  helperText={touched.address && errors.address}
                  label="Endereço"
                  name="address"
                  onBlur={handleBlur}
                  onChange={handleChange}
                  required
                  value={values.address}
                  variant="outlined"
                />
              </Grid>
            </Grid>
          </Box>

          {errors.submit && (
            <Box mb={2}>
              <Alert severity="error">{errors.submit}</Alert>
            </Box>
          )}

          <Button disabled={isSubmitting} fullWidth type="submit" variant="contained" color="primary">
            Adicionar
            {isSubmitting && <CircularProgress size={18} className={classes.loadingIcon} />}
          </Button>
        </form>
      )}
    </Formik>
  );
};

const useStyles = makeStyles(() => ({
  loadingIcon: {
    position: 'absolute',
    right: 12,
  },
}));

export default AddDocumentForm;
