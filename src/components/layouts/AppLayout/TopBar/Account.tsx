import React from 'react';
import { MdAccountCircle as AccountCircle } from 'react-icons/md';
import { IconButton, Menu, MenuItem } from '@material-ui/core';
import useAuth from 'src/hooks/useAuth';
import { useSnackbar } from 'notistack';

const Account: React.FC = () => {
  const { logout } = useAuth();
  const { enqueueSnackbar } = useSnackbar();
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    await logout()
      .then(resp => {
        enqueueSnackbar('Sessão terminada com sucesso', {
          variant: 'success',
        });
      })
      .catch(err => {
        enqueueSnackbar(`Erro ao terminar sessão: ${err.message}`, {
          variant: 'error',
        });
      });
  };

  return (
    <div>
      <IconButton
        aria-label="account of current user"
        aria-controls="menu-appbar"
        aria-haspopup="true"
        onClick={handleMenu}
        color="inherit"
      >
        <AccountCircle />
      </IconButton>
      <Menu
        id="menu-appbar"
        anchorEl={anchorEl}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        keepMounted
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={open}
        onClose={handleClose}
      >
        <MenuItem component="a" href="/painel-de-controle">
          Painel de contrôle
        </MenuItem>
        <MenuItem onClick={handleLogout}>Sair</MenuItem>
      </Menu>
    </div>
  );
};

export default Account;
