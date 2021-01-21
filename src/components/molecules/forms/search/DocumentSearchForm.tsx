import React, { useState } from 'react';
import clsx from 'clsx';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { MdSearch as SearchIcon, MdHelp as HelpIcon } from 'react-icons/md';
import { Container, Paper, Divider, Button, Hidden, Box, IconButton, makeStyles, colors } from '@material-ui/core';

import { Theme } from 'src/theme';

import RedditTextField from 'src/components/atoms/inputs/RedditTextField';

const DocumentSearchForm: React.FC = () => {
  const classes = useStyles();
  const router = useRouter();
  const [documentRef, setDocumentRef] = useState('');

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    router.push(`/resultado-pesquisa?documentRef=${documentRef}`);
  };

  return (
    <Container maxWidth="md">
      <form onSubmit={handleSubmit}>
        <Paper className={classes.root} elevation={2}>
          <RedditTextField
            required
            label="Digite a referência do documento"
            className={classes.input}
            variant="filled"
            onChange={e => setDocumentRef(e.target.value)}
            id="documentReference"
            fullWidth
          />
          <Hidden mdDown>
            <IconButton type="submit" className={classes.iconButton} aria-label="procurar">
              <SearchIcon />
            </IconButton>
            <Divider className={classes.divider} orientation="vertical" />
            <Link href="/ajuda/documentos">
              <IconButton
                component="a"
                color="primary"
                className={clsx(classes.iconButton, classes.helpButton)}
                aria-label="ajuda"
              >
                <HelpIcon />
              </IconButton>
            </Link>
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
            <Divider className={classes.divider} orientation="vertical" />
            <IconButton color="primary" className={clsx(classes.iconButton, classes.helpButton)} aria-label="ajuda">
              <HelpIcon />
            </IconButton>
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
    border: `1px solid ${colors.grey[300]}`,
    transition: '0.2s',
    padding: `${theme.spacing(0.5)}px ${theme.spacing(2)}px`,
    [theme.breakpoints.down('md')]: {
      padding: 0,
    },
    '&:hover': {
      border: `1px solid ${theme.palette.primary.main}`,
    },
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
  iconButton: {
    padding: 10,
  },
  searchButton: {
    padding: theme.spacing(1),
  },
  helpButton: {
    color: theme.palette.primary.main,
  },
  divider: {
    height: 28,
    margin: 4,
    [theme.breakpoints.down('md')]: {
      marginLeft: theme.spacing(2.5),
    },
  },
}));

export default DocumentSearchForm;
