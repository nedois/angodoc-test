import React from 'react';
import Link from 'next/link';
import clsx from 'clsx';
import { Drawer, List, Button, ListItem, Typography, makeStyles, colors } from '@material-ui/core';

import { Theme } from 'src/theme';
import { MenuLink } from './index';

interface MobileMenuProps {
  isOpen: boolean;
  menuLinks: MenuLink[];
  onClose: () => void;
}

const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onClose, menuLinks }) => {
  const classes = useStyles();

  return (
    <Drawer
      anchor="left"
      open={isOpen}
      onClose={onClose}
      className={classes.drawer}
      classes={{
        paper: classes.drawerPaper,
      }}
    >
      <Link href="/">
        <Button disableElevation disableRipple disableFocusRipple component="a" className={classes.logoWrapper}>
          <img src="/img/marca/logo.svg" alt="Logótipo Angodoc" className={classes.logoIcon} />
          <Typography variant="h4" className={classes.logoText}>
            Angodoc
          </Typography>
        </Button>
      </Link>
      <List>
        {menuLinks.map(link => {
          const Icon = link.icon;
          return (
            <ListItem key={link.href}>
              <Link href={link.href} passHref key={link.href}>
                <Button color="inherit" component="a" className={clsx(classes.buttonLink, 'active')} onClick={onClose}>
                  <Icon className={classes.buttonIcon} />
                  {link.label}
                </Button>
              </Link>
            </ListItem>
          );
        })}
      </List>
    </Drawer>
  );
};

const useStyles = makeStyles((theme: Theme) => ({
  drawer: {
    width: 240,
  },
  drawerPaper: {
    width: 240,
  },
  logoWrapper: {
    '&:hover': {
      backgroundColor: 'transparent',
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
    flexGrow: 1,
  },
  buttonLink: {
    textTransform: 'none',
    color: colors.blueGrey[900],
    marginLeft: theme.spacing(1),
    justifyContent: 'initial',
    width: '100%',
    '&:hover, &:active, &:hover svg': {
      color: colors.common.white,
      backgroundColor: theme.palette.primary.main,
    },
  },
  buttonIcon: {
    color: colors.blueGrey[900],
    marginRight: theme.spacing(2),
    fontSize: 22,
  },
}));

export default MobileMenu;
