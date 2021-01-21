import React, { useState, FC } from 'react';
import { Formik, Form } from 'formik';
import Link from 'next/link';
import * as Yup from 'yup';
import { useRouter } from 'next/router';
import { useSnackbar } from 'notistack';
import {
  TextField,
  InputAdornment,
  IconButton,
  Checkbox,
  FormControlLabel,
  makeStyles,
  Box,
  Link as MdLink,
  Typography,
  Button,
  CircularProgress,
} from '@material-ui/core';
import { Alert } from '@material-ui/lab';
import { MdVisibility, MdVisibilityOff } from 'react-icons/md';

import useAuth from 'src/hooks/useAuth';

const LoginForm: FC = () => {
  const { login } = useAuth();
  const classes = useStyles();
  const router = useRouter();
  const { enqueueSnackbar } = useSnackbar();
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const { redirectTo } = router.query;

  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const handleMouseDownPassword = () => setShowPassword(!showPassword);

  return (
    <Formik
      initialValues={{
        email: '',
        password: '',
        remember: false,
        submit: null,
      }}
      validationSchema={Yup.object().shape({
        email: Yup.string().max(255, 'Estás a tentar fazer o quê?').required('Insira o seu email'),
        password: Yup.string().max(255, 'Que senha hein').required('A senha é obrigatória'),
      })}
      onSubmit={async ({ email, password, remember }, { setErrors, setStatus, setSubmitting }) => {
        try {
          await login({ email, password, remember });

          setStatus({ success: true });
          setSubmitting(false);

          enqueueSnackbar('Sessão iniciada com sucesso', { variant: 'success' });

          if (redirectTo) {
            router.push(redirectTo as string);
          } else {
            router.back();
          }
        } catch (err) {
          if (err.status === 403) {
            router.push('/verificacao?redirected=true');
          } else {
            setStatus({ success: false });
            setErrors({ submit: err.data.message || 'Erro desconhecido' });
            setSubmitting(false);
          }
        }
      }}
    >
      {({ errors, handleBlur, handleChange, isSubmitting, touched, values, setFieldValue }) => (
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

          <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
            <FormControlLabel
              control={<Checkbox color="primary" inputProps={{ 'aria-label': 'Lembrar-me' }} />}
              checked={values.remember}
              onChange={() => setFieldValue('remember', !values.remember)}
              label="Lembrar-me"
            />
            <Typography variant="body1" component="p">
              <Link href="/redefinir-a-senha" passHref>
                <MdLink component="a">Esqueceu a senha?</MdLink>
              </Link>
            </Typography>
          </Box>

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
            Entrar
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

export default LoginForm;
