import React from 'react';
import { Formik } from 'formik';
import * as Yup from 'yup';
import { useSnackbar } from 'notistack';
import { TextField, makeStyles, Button, Box, CircularProgress } from '@material-ui/core';

const MainContactForm: React.FC = () => {
  const classes = useStyles();
  const { enqueueSnackbar } = useSnackbar();

  return (
    <Formik
      initialValues={{
        name: '',
        email: '',
        phoneNumber: '',
        message: '',
        submit: null,
      }}
      validationSchema={Yup.object().shape({
        name: Yup.string().max(255).required('O nome é obrigatório'),
        email: Yup.string().email().max(255).required('O email é obrigatório'),
        phoneNumber: Yup.string().max(255),
        message: Yup.string().max(255).required('O mensagem é obrigatória'),
      })}
      onSubmit={async ({ name, email, phoneNumber, message }, { setErrors, setStatus, setSubmitting }) => {
        try {
          // TODO: ADD API CALL
          console.log({ name, email, phoneNumber, message });

          setStatus({ success: true });
          setSubmitting(false);
          enqueueSnackbar('Mensagem enviada com sucesso', { variant: 'success' });
        } catch (err) {
          setStatus({ success: false });
          setErrors({ submit: err.message });
          setSubmitting(false);
          enqueueSnackbar(err.message, { variant: 'error' });
        }
      }}
    >
      {({ errors, handleBlur, handleChange, handleSubmit, isSubmitting, touched, values }) => (
        <form noValidate onSubmit={handleSubmit}>
          <TextField
            error={Boolean(touched.name && errors.name)}
            fullWidth
            required
            autoFocus
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
          <TextField
            error={Boolean(touched.email && errors.email)}
            fullWidth
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
          <TextField
            error={Boolean(touched.phoneNumber && errors.phoneNumber)}
            fullWidth
            helperText={touched.phoneNumber && errors.phoneNumber}
            label="Telefone"
            margin="normal"
            name="phoneNumber"
            onBlur={handleBlur}
            onChange={handleChange}
            type="text"
            value={values.phoneNumber}
            variant="outlined"
          />
          <TextField
            error={Boolean(touched.message && errors.message)}
            fullWidth
            multiline
            required
            helperText={touched.message && errors.message}
            label="Mensagem"
            margin="normal"
            name="message"
            onBlur={handleBlur}
            onChange={handleChange}
            type="text"
            value={values.message}
            variant="outlined"
            rows={4}
          />
          <Box mt={2}>
            <Button
              disabled={isSubmitting}
              fullWidth
              type="submit"
              variant="contained"
              color="primary"
              disableElevation
            >
              Enviar
              {isSubmitting && <CircularProgress size={18} className={classes.loadingIcon} />}
            </Button>
          </Box>
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

export default MainContactForm;
