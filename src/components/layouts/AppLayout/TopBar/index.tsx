import React, { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import clsx from 'clsx';
import { IconType } from 'react-icons';
import { MdMenu as MenuIcon, MdHelpOutline as HelpIcon } from 'react-icons/md';
import { RiHome2Line as HomeIcon } from 'react-icons/ri';
import { HiOutlineOfficeBuilding as AgenciesIcon } from 'react-icons/hi';
import { FiMessageSquare as ContactIcon } from 'react-icons/fi';

import {
  AppBar,
  Button,
  Container,
  IconButton,
  Toolbar,
  Typography,
  Hidden,
  fade,
  makeStyles,
  colors,
} from '@material-ui/core';

import { Theme } from 'src/theme';
import useAuth from 'src/hooks/useAuth';
import MobileMenu from './MobileMenu';
import Account from './Account';

const TopBar: React.FC = () => {
  const classes = useStyles();
  const { isAuthenticated } = useAuth();
  const router = useRouter();
  const [mobileMenuIsOpen, setMobileMenuIsOpen] = useState(false);

  return (
    <>
      <AppBar position="fixed" className={classes.appBar}>
        <Container className={classes.container}>
          <Toolbar>
            <Hidden lgUp>
              <IconButton edge="start" color="inherit" onClick={() => setMobileMenuIsOpen(true)}>
                <MenuIcon />
              </IconButton>
            </Hidden>
            <Link href="/">
              <Button disableElevation disableRipple disableFocusRipple component="a" className={classes.logoWrapper}>
                <img src="/img/marca/logo.svg" alt="Logótipo Angodoc" className={classes.logoIcon} />
                <Typography variant="h4" className={classes.logoText}>
                  Angodoc
                </Typography>
              </Button>
            </Link>
            <Hidden mdDown>
              {menuLinks.map(link => (
                <Link href={link.href} passHref key={link.href}>
                  <Button
                    color="inherit"
                    component="a"
                    className={clsx(classes.buttonLink, router.pathname === link.href && 'active')}
                  >
                    {link.label}
                  </Button>
                </Link>
              ))}
            </Hidden>
            {isAuthenticated && <Account />}
          </Toolbar>
        </Container>
      </AppBar>
      <Hidden lgUp>
        <MobileMenu isOpen={mobileMenuIsOpen} menuLinks={menuLinks} onClose={() => setMobileMenuIsOpen(false)} />
      </Hidden>
    </>
  );
};

export interface MenuLink {
  label: string;
  href: string;
  icon: IconType;
}

const menuLinks: MenuLink[] = [
  { label: 'Página incial', href: '/', icon: HomeIcon },
  { label: 'Ajuda', href: '/ajuda', icon: HelpIcon },
  { label: 'Agências', href: '/agencias', icon: AgenciesIcon },
  { label: 'Contacto', href: '/contacto', icon: ContactIcon },
];

const useStyles = makeStyles((theme: Theme) => ({
  appBar: {
    backgroundColor: theme.palette.background.paper,
    color: theme.palette.text.primary,
  },
  logoWrapper: {
    flexGrow: 1,
    justifyContent: 'end',
    '&:hover': {
      backgroundColor: 'transparent',
    },
    [theme.breakpoints.down('md')]: {
      justifyContent: 'center',
    },
  },
  logoIcon: {
    height: 32,
    width: 'auto',
  },
  logoText: {
    color: theme.palette.primary.main,
    textTransform: 'uppercase',
    fontWeight: 'bold',
  },
  buttonLink: {
    textTransform: 'none',
    color: colors.blueGrey[900],
    marginLeft: theme.spacing(1),
    '&:hover': {
      color: colors.common.white,
      backgroundColor: fade(theme.palette.primary.main, 0.5),
    },
    '&.active': {
      color: colors.common.white,
      backgroundColor: theme.palette.primary.main,
    },
  },
  container: {
    [theme.breakpoints.down('md')]: {
      padding: 0,
    },
  },
}));

export default TopBar;
