import React, { FC, useState } from 'react';
import { Formik, Form } from 'formik';
import * as Yup from 'yup';
import { useRouter } from 'next/router';
import { useSnackbar } from 'notistack';
import { TextField, InputAdornment, IconButton, makeStyles, Box, Button, CircularProgress } from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { MdVisibility, MdVisibilityOff } from 'react-icons/md';

import axios from 'src/utils/axios';

interface ChangePasswordFormProps {
  token: string;
  user: string;
  method: string;
}

const ChangePasswordForm: FC<ChangePasswordFormProps> = ({ token, user, method }) => {
  const classes = useStyles();
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const [showPassword, setShowPassword] = useState<boolean>(false);

  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);

  return (
    <Formik
      initialValues={{
        password: '',
        password_confirmation: '',
        token,
        user,
        method,
        submit: null,
      }}
      validationSchema={Yup.object().shape({
        password: Yup.string()
          .min(6, 'A senha deve ter no mínimo 6 letras')
          .max(255, 'Que senha hein')
          .required('A senha é obrigatória'),
        password_confirmation: Yup.string().oneOf([Yup.ref('password')], 'As senhas devem ser identicas'),
      })}
      onSubmit={async (values, { setErrors, setStatus, setSubmitting }) => {
        try {
          await axios.post('/auth/password/change', values);

          setStatus({ success: true });
          setSubmitting(false);

          enqueueSnackbar('Senha actualizada com sucesso', { variant: 'success' });

          router.push('/entrar');
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
            error={Boolean(touched.password && errors.password)}
            fullWidth
            required
            helperText={touched.password && errors.password}
            label="Senha"
            margin="normal"
            name="password"
            onBlur={handleBlur}
            onChange={handleChange}
            type={showPassword ? 'text' : 'password'}
            value={values.password}
            variant="outlined"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="Mudar a visibilidade da senha"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <MdVisibility /> : <MdVisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <TextField
            error={Boolean(touched.password_confirmation && errors.password_confirmation)}
            fullWidth
            required
            helperText={touched.password_confirmation && errors.password_confirmation}
            label="Confirmar senha"
            margin="normal"
            name="password_confirmation"
            onBlur={handleBlur}
            onChange={handleChange}
            type={showPassword ? 'text' : 'password'}
            value={values.password_confirmation}
            variant="outlined"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="Mudar a visibilidade da senha"
                    onClick={handleClickShowPassword}
                    onMouseDown={handleMouseDownPassword}
                    edge="end"
                  >
                    {showPassword ? <MdVisibility /> : <MdVisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          {errors.submit && (
            <Box mb={2}>
              <Alert severity="error">{errors.submit}</Alert>
            </Box>
          )}

          <Box mt={2}>
            <Button
              disabled={isSubmitting}
              fullWidth
              size="large"
              type="submit"
              variant="contained"
              color="primary"
              disableElevation
            >
              Mudar senha
              {isSubmitting && <CircularProgress size={18} className={classes.loadingIcon} />}
            </Button>
          </Box>
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

export default ChangePasswordForm;
