import React, { FC } from 'react';
import clsx from 'clsx';
import RouterLink from 'next/link';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { FiSearch as SearchIcon } from 'react-icons/fi';
import {
  Card,
  TableHead,
  TableRow,
  Table,
  TableCell,
  TablePagination,
  TableBody,
  makeStyles,
  Typography,
  TextField,
  InputAdornment,
  SvgIcon,
  Select,
  MenuItem,
  Link,
  FormControl,
  Avatar,
  InputLabel,
} from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';

import { User } from 'src/contrats/types';
import { Theme } from 'src/theme';
import Box from 'src/components/utilities/Box';
import Label from 'src/components/atoms/info/Label';

interface UsersListTableProps {
  className?: string;
  total: number;
  limit: number;
  page: number;
  sort: Sort;
  query: string;
  users: User[];
  isFetching: boolean;
  refetch: () => void;
  handlePageChange: (event: any, newPage: number) => void;
  handleLimitChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleQueryChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleSortChange: (event: React.ChangeEvent<{ value: unknown }>) => void;
}

const UsersListTable: FC<UsersListTableProps> = ({
  className,
  total,
  limit,
  page,
  handleLimitChange,
  handlePageChange,
  handleQueryChange,
  handleSortChange,
  sort,
  query,
  users,
  isFetching,
}) => {
  const classes = useStyles();

  return (
    <Card className={clsx(classes.root, className)}>
      <Box p={2} minHeight={56} display="flex" alignItems="center">
        <TextField
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SvgIcon fontSize="small" color="action">
                  <SearchIcon />
                </SvgIcon>
              </InputAdornment>
            ),
          }}
          onChange={handleQueryChange}
          placeholder="Procurar usúario"
          value={query}
          variant="outlined"
        />
        <Box flexGrow={1} />
        <FormControl variant="outlined">
          <InputLabel id="user-sort">Ordernar por</InputLabel>
          <Select labelId="user-sort" label="Ordernar por" value={sort} name="sort" onChange={handleSortChange}>
            {sortOptions.map(option => (
              <MenuItem key={option.value} value={option.value}>
                {option.label}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      <PerfectScrollbar>
        <Box minWidth={700}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell>Nome</TableCell>
                <TableCell>Verificado</TableCell>
                <TableCell>Papéis</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {!!total && !!users.length ? (
                users.map(user => (
                  <TableRow hover key={user.id}>
                    <TableCell>
                      <Box display="flex" alignItems="center">
                        <Avatar className={classes.avatar} src={user.avatar} />
                        <div>
                          <RouterLink href={`/painel-de-controle/plataforma/usuarios/${user.id}`}>
                            <Link
                              href={`/painel-de-controle/plataforma/usuarios/${user.id}`}
                              color="inherit"
                              variant="h5"
                            >
                              {user.long_name}
                            </Link>
                          </RouterLink>

                          <Typography variant="body2" color="textSecondary">
                            {user.email}
                          </Typography>
                        </div>
                      </Box>
                    </TableCell>
                    <TableCell>
                      {user.account_verified_at ? (
                        <Label color="success">Verificada</Label>
                      ) : (
                          <Label color="error">Não verificada</Label>
                        )}
                    </TableCell>
                    <TableCell>
                      {!user?.roles?.length && 'Sem papéis'}

                      {user?.roles?.map((role, index) => {
                        if (index === 0) return role.label;

                        return `, ${role.label}`;
                      })}
                    </TableCell>
                  </TableRow>
                ))
              ) : (
                  <>
                    {isFetching ? (
                      [...Array(5).keys()].map(key => (
                        <TableRow key={key}>
                          <TableCell>
                            <Box display="flex" alignItems="center">
                              <Skeleton variant="circle" className={classes.avatar} />
                              <Box width="100%">
                                <Skeleton variant="text" width="100%" />
                                <Skeleton variant="text" width="100%" />
                              </Box>
                            </Box>
                            <Skeleton variant="text" />
                          </TableCell>
                          <TableCell>
                            <Skeleton variant="text" />
                          </TableCell>
                          <TableCell>
                            <Skeleton variant="text" />
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                        <TableRow>
                          <TableCell colSpan={5}>
                            <Box p={2} display="flex" justifyContent="center" alignItems="center" flexDirection="column">
                              <img
                                src="/img/illustracoes/sem-dados.svg"
                                alt="Sem papéis"
                                style={{ width: '90vw', maxWidth: 340 }}
                              />
                              <Box mt={2}>
                                <Typography variant="h3" component="span" align="center">
                                  Sem dados
                            </Typography>
                              </Box>
                            </Box>
                          </TableCell>
                        </TableRow>
                      )}
                  </>
                )}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
      {!!total && (
        <TablePagination
          component="div"
          count={total}
          onChangePage={handlePageChange}
          onChangeRowsPerPage={handleLimitChange}
          page={page}
          rowsPerPage={limit}
          rowsPerPageOptions={[15, 30, 45]}
          labelRowsPerPage="Usúarios por página"
          labelDisplayedRows={({ from, to, count }) => `${from}-${to} de ${count !== -1 ? count : `mais de ${to}`}`}
        />
      )}
    </Card>
  );
};

export type Sort = 'first_name|desc' | 'first_name|asc';

export interface SortOption {
  value: Sort;
  label: string;
}

export const sortOptions: SortOption[] = [
  {
    value: 'first_name|asc',
    label: 'Nome (A-Z)',
  },
  {
    value: 'first_name|desc',
    label: 'Nome (Z-A)',
  },
];

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    minWidth: 700,
  },
  avatar: {
    height: 42,
    width: 42,
    marginRight: theme.spacing(1),
  },
}));

export default UsersListTable;
