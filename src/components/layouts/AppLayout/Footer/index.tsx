import React from 'react';
import Link from 'next/link';
import { HiOutlinePhone as PhoneIcon, HiOutlineMail as MailIcon } from 'react-icons/hi';

import { Container, Grid, Button, Box, Typography, Link as MdLink, makeStyles, fade } from '@material-ui/core';

import { Theme } from 'src/theme';
import useAuth from 'src/hooks/useAuth';

const Footer: React.FC = () => {
  const classes = useStyles();
  const { isAuthenticated } = useAuth();

  return (
    <footer className={classes.footer}>
      <Container>
        <Grid container spacing={2}>
          <Grid item xs={12} md={6} lg={5}>
            <Box display="flex" alignContent="center" mb={2}>
              <img src="/img/marca/logo.svg" alt="Angodoc Logotipo" className={classes.footerBrand} />
              <Typography variant="h4" className={classes.footerBrandText}>
                Andogoc
              </Typography>
            </Box>
            <Typography variant="body1">Motor de busca para documentos perdidos na via pública</Typography>
            <Box mt={2}>
              <Typography variant="body1" className={classes.contactInfo}>
                <PhoneIcon className={classes.icon} />
                +244 997 36 56 87
              </Typography>
              <Typography variant="body1" className={classes.contactInfo}>
                <MailIcon className={classes.icon} />
                geral@msa.ao
              </Typography>
            </Box>
            <Box mt={3}>
              <Typography variant="body1">
                {`© ${new Date().getFullYear()} `}
                <strong>AngoDoc</strong>
                {` Todos os direitos reservados. `}
              </Typography>
              <Typography variant="body1">
                {`Desenvolvido pela `}
                <MdLink href="https://www.msa.ao">MSA</MdLink>
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={6} lg={2}>
            <Typography variant="h4" className={classes.sectionHeader}>
              Navegação
            </Typography>
            {navigationLinks.map(link => (
              <Link href={link.href} key={link.href} passHref>
                <MdLink variant="body1" className={classes.sectionLink}>
                  {link.label}
                </MdLink>
              </Link>
            ))}
          </Grid>
          <Grid item xs={12} md={6} lg={5}>
            <Typography variant="h4" className={classes.sectionHeader}>
              Administração
            </Typography>
            <Box mb={2}>
              <Typography variant="body1">Utilize os botões abaixo para entrar na área administrativa</Typography>
            </Box>
            {isAuthenticated ? (
              <Button variant="contained" color="primary" component="a" href="/painel-de-controle">
                Painel de contrôle
              </Button>
            ) : (
              <a href="http://104.131.79.196/login">
                <Button variant="contained" color="primary" component="a">
                  Entrar
                </Button>
              </a>
            )}
          </Grid>
        </Grid>
      </Container>
    </footer>
  );
};

export interface NavigationLink {
  label: string;
  href: string;
}

const navigationLinks: NavigationLink[] = [
  { label: 'Página incial', href: '/' },
  { label: 'Ajuda', href: '/ajuda' },
  { label: 'Agências', href: '/agencias' },
  { label: 'Contacto', href: '/contacto' },
];

const useStyles = makeStyles((theme: Theme) => ({
  footer: {
    position: 'relative',
    color: theme.palette.text.primary,
    paddingBottom: theme.spacing(40),
    paddingTop: theme.spacing(6),
    background: `url("/img/fundos/bg-cidade.png") no-repeat center 90%, ${fade(theme.palette.primary.main, 0.03)}`,
    '&:before': {
      content: "''",
      display: 'block',
      position: 'absolute',
      bottom: '4%',
      height: 105,
      width: 330,
      background: 'url("/img/gifs/carro.gif") no-repeat center center',
      backgroundSize: '100%',
      animation: '$walk 22s linear infinite',
    },
    '&:after': {
      content: "''",
      display: 'block',
      position: 'absolute',
      bottom: '2%',
      height: 90,
      width: 70,
      background: 'url("/img/gifs/ciclista.gif") no-repeat center center',
      backgroundSize: '100%',
      animation: '$walk 30s linear infinite',
    },
  },
  footerBrand: {
    height: 32,
    width: 'auto',
  },
  footerBrandText: {
    color: theme.palette.primary.main,
    textTransform: 'uppercase',
    fontWeight: 'bold',
  },
  sectionHeader: {
    color: theme.palette.primary.main,
    marginBottom: theme.spacing(3),
  },
  sectionLink: {
    display: 'block',
    marginTop: theme.spacing(1),
    color: theme.palette.text.primary,
    '&:hover': {
      textDecoration: 'none',
      color: theme.palette.primary.main,
    },
  },
  contactInfo: {
    display: 'flex',
    alignItems: 'center',
    marginBottom: theme.spacing(1),
  },
  icon: {
    fontSize: 32,
    backgroundColor: fade(theme.palette.primary.main, 0.15),
    color: theme.palette.primary.main,
    borderRadius: 50,
    padding: theme.spacing(1),
    marginRight: theme.spacing(1),
  },
  '@keyframes walk': {
    '0%': { left: '-25%' },
    '100%': { left: '100%' },
  },
}));

export default Footer;
