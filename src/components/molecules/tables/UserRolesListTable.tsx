import React, { FC, useState } from 'react';
import clsx from 'clsx';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  Card,
  Box,
  TableHead,
  TableRow,
  Table,
  TableCell,
  TableBody,
  makeStyles,
  Typography,
  TextField,
  MenuItem,
  Checkbox,
  Button,
  CircularProgress,
} from '@material-ui/core';

import { Role } from 'src/contrats/types';
import { Theme } from 'src/theme';
import axios from 'src/utils/axios';
import { useSnackbar } from 'notistack';

const descendingComparator = (a: Role, b: Role, orderBy: Order): number => {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }

  if (b[orderBy] > a[orderBy]) {
    return 1;
  }

  return 0;
};

const getComparator = (order: 'asc' | 'desc', orderBy: Order) => {
  return order === 'desc'
    ? (a: Role, b: Role) => descendingComparator(a, b, orderBy)
    : (a: Role, b: Role) => -descendingComparator(a, b, orderBy);
};

const applySort = (roles: Role[], sort: Sort): Role[] => {
  const [orderBy, order] = sort.split('|') as [Order, 'asc' | 'desc'];
  const comparator = getComparator(order, orderBy);
  const stabilizedThis = roles.map((role, index) => ({ role, index }));

  stabilizedThis.sort((a, b) => {
    const newOrder = comparator(a.role, b.role);

    if (newOrder !== 0) return newOrder;

    return a.index - b.index;
  });

  return stabilizedThis.map(el => el.role);
};

interface UserRolesListTableProps {
  className?: string;
  roles: Role[];
  title: string;
  user: string;
  action: 'add' | 'remove';
  refetch: () => void;
}

const UserRolesListTable: FC<UserRolesListTableProps> = ({
  roles,
  className,
  action,
  title,
  refetch,
  user,
}) => {
  const classes = useStyles();
  const [sort, setSort] = useState<Sort>(sortOptions[0].value);
  const [isLoading, setIsLoading] = useState(false);
  const [selectedRoles, setSelectedRoles] = useState<string[]>([]);
  const { enqueueSnackbar } = useSnackbar();

  const handleSortChange = (event: React.ChangeEvent<HTMLInputElement>): void => {
    event.persist();
    setSort(event.target.value as Sort);
  };

  const handleSelectAllRoles = (event: React.ChangeEvent<HTMLInputElement>): void => {
    setSelectedRoles(event.target.checked ? roles.map(role => role.id as string) : []);
  };

  const handleSelectOneRole = (
    event: React.ChangeEvent<HTMLInputElement>,
    roleId: string,
  ): void => {
    if (!selectedRoles.includes(roleId)) {
      setSelectedRoles(prevSelected => [...prevSelected, roleId]);
    } else {
      setSelectedRoles(prevSelected => prevSelected.filter(id => id !== roleId));
    }
  };

  const handleAction = () => {
    setIsLoading(true);

    axios({
      method: action === 'add' ? 'post' : 'delete',
      url: `/admin/users/${user}/roles`,
      data: {
        roles: selectedRoles,
      },
    })
      .then(() => {
        enqueueSnackbar(`Papéis ${action === 'add' ? 'actualizados' : 'removidos'}`, {
          variant: 'success',
        });
        setIsLoading(false);
        refetch();
      })
      .catch(error => {
        enqueueSnackbar(error.data.message, {
          variant: 'error',
        });
        setIsLoading(false);
      });
  };

  const enableBulkOperations = selectedRoles.length > 0;
  const sortedRoles = applySort(roles, sort);
  const selectedSomeRoles = selectedRoles.length > 0 && selectedRoles.length < roles.length;
  const selectedAllRoles = selectedRoles.length === roles.length;

  return (
    <Card className={clsx(classes.root, className)}>
      <Box p={2} minHeight={56} display="flex" alignItems="center">
        <Typography component="h5" variant="h5">
          {title}
        </Typography>
        <Box flexGrow={1} />
        <TextField
          label="Ordernar por"
          value={sort}
          name="sort"
          onChange={handleSortChange}
          select
          variant="outlined"
        >
          {sortOptions.map(option => (
            <MenuItem key={option.value} value={option.value}>
              {option.label}
            </MenuItem>
          ))}
        </TextField>
      </Box>

      {enableBulkOperations && (
        <div className={classes.bulkOperations}>
          <div className={classes.bulkActions}>
            <Checkbox
              checked={selectedAllRoles}
              indeterminate={selectedSomeRoles}
              onChange={handleSelectAllRoles}
              color="primary"
            />
            <Button
              variant="outlined"
              className={classes.bulkAction}
              onClick={handleAction}
              disabled={isLoading}
            >
              {isLoading ? (
                <CircularProgress size={18} />
              ) : (
                <>{action === 'add' ? 'Adicionar' : 'Remover'}</>
              )}
            </Button>
          </div>
        </div>
      )}

      <PerfectScrollbar>
        <Box minWidth={700}>
          <Table>
            <TableHead>
              <TableRow>
                <TableCell padding="checkbox">
                  <Checkbox
                    checked={selectedAllRoles}
                    indeterminate={selectedSomeRoles}
                    onChange={handleSelectAllRoles}
                    color="primary"
                  />
                </TableCell>
                <TableCell>Nome</TableCell>
                <TableCell>Slug</TableCell>
                <TableCell>Description</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {roles.length ? (
                // eslint-disable-next-line no-shadow
                sortedRoles.map(role => {
                  const isRoleSelected = selectedRoles.includes(role.id as string);

                  return (
                    <TableRow hover key={role.id} selected={isRoleSelected}>
                      <TableCell padding="checkbox">
                        <Checkbox
                          checked={isRoleSelected}
                          onChange={
                            event => handleSelectOneRole(event, role.id as string)
                            //  eslint-disable-next-line react/jsx-curly-newline
                          }
                          value={isRoleSelected}
                        />
                      </TableCell>
                      <TableCell>{role.label}</TableCell>
                      <TableCell>{role.slug}</TableCell>
                      <TableCell>{role.description}</TableCell>
                    </TableRow>
                  );
                })
              ) : (
                <TableRow>
                  <TableCell colSpan={5}>
                    <Box
                      p={2}
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                      flexDirection="column"
                    >
                      <img
                        src="/img/illustracoes/sem-dados.svg"
                        alt="Sem papéis"
                        style={{ width: '90vw', maxWidth: 340 }}
                      />
                      <Box mt={2}>
                        <Typography variant="h3" component="span" align="center">
                          Sem permissões
                        </Typography>
                      </Box>
                    </Box>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </Box>
      </PerfectScrollbar>
    </Card>
  );
};

export type Sort = 'slug|asc' | 'slug|desc' | 'label|asc' | 'label|desc';

export type Order = 'id' | 'label' | 'description' | 'slug' | 'created_at' | 'updated_at';

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
];

const useStyles = makeStyles((theme: Theme) => ({
  root: {
    minWidth: 700,
  },
  bulkOperations: {
    position: 'relative',
  },
  bulkActions: {
    paddingLeft: 4,
    paddingRight: 4,
    marginTop: 6,
    position: 'absolute',
    width: '100%',
    zIndex: 2,
    backgroundColor: theme.palette.background.default,
  },
  bulkAction: {
    marginLeft: theme.spacing(2),
  },
}));

export default UserRolesListTable;
