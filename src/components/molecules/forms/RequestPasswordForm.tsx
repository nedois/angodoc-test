import React, { FC } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { useSnackbar } from 'notistack';
import { TextField, makeStyles, Box, Button, CircularProgress } from '@material-ui/core';
import { Alert } from '@material-ui/lab';

import axios from 'src/utils/axios';

const RequestPasswordForm: FC<{ onSuccess: () => void }> = ({ onSuccess }) => {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();

  return (
    <Formik
      initialValues={{
        email: '',
        submit: null,
      }}
      validationSchema={Yup.object().shape({
        email: Yup.string().email().max(255, 'Estás a tentar fazer o quê?').required('O email é obrigatório'),
      })}
      onSubmit={async ({ email }, { setErrors, setStatus, setSubmitting }) => {
        try {
          await axios.post('/auth/password/request', { email });

          setStatus({ success: true });
          setSubmitting(false);

          enqueueSnackbar('Pedido enviado', { variant: 'success' });

          onSuccess();
        } catch (err) {
          setStatus({ success: false });
          setErrors({ submit: err.data.message || 'Erro desconhecido' });
          setSubmitting(false);
        }
      }}
    >
      {({ errors, handleBlur, handleChange, isSubmitting, touched, values }) => (
        <Form>
          <TextField
            error={Boolean(touched.email && errors.email)}
            fullWidth
            autoFocus
            required
            helperText={touched.email && errors.email}
            label="Email"
            margin="normal"
            name="email"
            onBlur={handleBlur}
            onChange={handleChange}
            type="email"
            value={values.email}
            variant="outlined"
          />

          {errors.submit && (
            <Box mb={2}>
              <Alert severity="error">{errors.submit}</Alert>
            </Box>
          )}

          <Button
            disabled={isSubmitting}
            fullWidth
            size="large"
            type="submit"
            variant="contained"
            color="primary"
            disableElevation
          >
            Enviar
            {isSubmitting && <CircularProgress size={18} className={classes.loadingIcon} />}
          </Button>
        </Form>
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

export default RequestPasswordForm;
