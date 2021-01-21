/* eslint-disable react/jsx-indent */
/* eslint-disable prettier/prettier */
import React, { FC } from 'react';
import clsx from 'clsx';
import RouterLink from 'next/link';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { FiSearch as SearchIcon } from 'react-icons/fi';
import {
  Card,
  Box,
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
  FormControl,
  Link,
  InputLabel,
} from '@material-ui/core';
import { Skeleton } from '@material-ui/lab';

import { Role } from 'src/contrats/types';
import moment from 'src/utils/moment';

interface RolesListTableProps {
  className?: string;
  total: number;
  limit: number;
  page: number;
  sort: Sort;
  query: string;
  roles: Role[];
  isFetching: boolean;
  refetch: () => void;
  handlePageChange: (event: any, newPage: number) => void;
  handleLimitChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleQueryChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleSortChange: (event: React.ChangeEvent<{ value: unknown }>) => void;
}

const RolesListTable: FC<RolesListTableProps> = ({
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
  roles,
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
          placeholder="Procurar papel"
          value={query}
          variant="outlined"
        />
        <Box flexGrow={1} />
        <FormControl variant="outlined">
          <InputLabel id="role-sort">Ordernar por</InputLabel>
          <Select labelId="role-sort" label="Ordernar por" value={sort} name="sort" onChange={handleSortChange}>
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
                <TableCell>Slug</TableCell>
                <TableCell>Permissões</TableCell>
                <TableCell>Criado</TableCell>
                <TableCell>Atualizado</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {!!total && !!roles.length ? (
                roles.map(role => (
                  <TableRow hover key={role.id}>
                    <TableCell>
                      <RouterLink href={`/painel-de-controle/plataforma/papeis/${role.slug}`}>
                        <Link href={`/painel-de-controle/plataforma/papeis/${role.slug}`} color="textPrimary">
                          {role.label}
                        </Link>
                      </RouterLink>
                    </TableCell>
                    <TableCell>{role.slug}</TableCell>
                    <TableCell>{role.permissions_count}</TableCell>
                    <TableCell>{moment(role.created_at).fromNow()}</TableCell>
                    <TableCell>{moment(role.updated_at).fromNow()}</TableCell>
                  </TableRow>
                ))
              ) : (
                  <>
                    {isFetching ? (
                      [...Array(5).keys()].map(key => (
                        <TableRow key={key}>
                          <TableCell>
                            <Skeleton variant="text" />
                          </TableCell>
                          <TableCell>
                            <Skeleton variant="text" />
                          </TableCell>
                          <TableCell>
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
          labelRowsPerPage="Papéis por página"
          labelDisplayedRows={({ from, to, count }) => `${from}-${to} de ${count !== -1 ? count : `mais de ${to}`}`}
        />
      )}
    </Card>
  );
};

export type Sort =
  | 'updated_at|desc'
  | 'updated_at|asc'
  | 'created_at|asc'
  | 'created_at|desc'
  | 'slug|asc'
  | 'slug|desc'
  | 'label|asc'
  | 'label|desc';

export interface SortOption {
  value: Sort;
  label: string;
}

export const sortOptions: SortOption[] = [
  {
    value: 'label|asc',
    label: 'Nome (A-Z)',
  },
  {
    value: 'label|desc',
    label: 'Nome (Z-A)',
  },
  {
    value: 'slug|asc',
    label: 'Slug (A-Z)',
  },
  {
    value: 'slug|desc',
    label: 'Slug (Z-A)',
  },
  {
    value: 'created_at|desc',
    label: 'Data de atualização (antigos primeiro)',
  },
  {
    value: 'created_at|asc',
    label: 'Data de atualização (antigos primeiro)',
  },
  {
    value: 'updated_at|desc',
    label: 'Data de atualização (recentes primeiro)',
  },
  {
    value: 'updated_at|asc',
    label: 'Data de atualização (antigos primeiro)',
  },
];

const useStyles = makeStyles(() => ({
  root: {
    minWidth: 700,
  },
}));

export default RolesListTable;
