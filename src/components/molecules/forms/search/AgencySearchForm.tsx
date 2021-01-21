import React from 'react';
import { MdSearch as SearchIcon } from 'react-icons/md';
import { HiOutlineLocationMarker as AddressIcon } from 'react-icons/hi';

import {
  Container,
  Paper,
  Divider,
  Button,
  Hidden,
  TextField,
  MenuItem,
  Box,
  IconButton,
  makeStyles,
  colors,
} from '@material-ui/core';

import { Theme } from 'src/theme';
import { PROVINCES } from 'src/constants';
import RedditTextField from 'src/components/atoms/inputs/RedditTextField';

const AgencySearchForm: React.FC = () => {
  const classes = useStyles();

  return (
    <Container maxWidth="md">
      <form>
        <Paper className={classes.root} elevation={2}>
          <Box display="flex" alignItems="center" className={classes.provinceInputWrapper}>
            <AddressIcon className={classes.simpleIcon} />
            <TextField
              id="province"
              select
              value="Luanda"
              variant="outlined"
              InputProps={{
                classes: {
                  root: classes.provinceInput,
                  focused: classes.provinceInput,
                  notchedOutline: classes.provinceInput,
                },
              }}
            >
              {PROVINCES.map(option => (
                <MenuItem key={option.key} value={option.key}>
                  {option.key}
                </MenuItem>
              ))}
            </TextField>
          </Box>
          <Divider className={classes.divider} orientation="vertical" />
          <RedditTextField
            label="Procurando por uma agência?"
            className={classes.input}
            variant="filled"
            id="name"
            fullWidth
          />
          <Hidden mdDown>
            <IconButton type="submit" className={classes.iconButton} aria-label="procurar">
              <SearchIcon />
            </IconButton>
          </Hidden>
        </Paper>
        <Hidden lgUp>
          <Box display="flex" alignItems="center" justifyContent="center" mt={2}>
            <Button
              type="submit"
              variant="contained"
              color="primary"
              className={classes.searchButton}
              aria-label="procurar"
              endIcon={<SearchIcon />}
            >
              Procurar
            </Button>
          </Box>
        </Hidden>
      </form>
    </Container>
  );
};

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    display: 'flex',
    alignItems: 'center',
    backgroundColor: colors.common.white,
    padding: `${theme.spacing(0.5)}px ${theme.spacing(2)}px`,
    [theme.breakpoints.down('md')]: {
      padding: 0,
      flexDirection: 'column',
      alignItems: 'end',
    },
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  simpleIcon: {
    color: theme.palette.text.secondary,
    fontSize: 24,
  },
  searchButton: {
    padding: theme.spacing(1),
  },
  helpButton: {
    color: theme.palette.primary.main,
  },
  provinceInputWrapper: {
    [theme.breakpoints.down('md')]: {
      marginLeft: theme.spacing(2),
    },
  },
  provinceInput: {
    border: 'none',
  },
  divider: {
    height: 28,
    margin: 4,
    [theme.breakpoints.down('md')]: {
      display: 'none',
    },
  },
}));

export default AgencySearchForm;
