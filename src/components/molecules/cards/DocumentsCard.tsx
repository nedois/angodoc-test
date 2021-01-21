/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable no-shadow */
import React, { useState, FC } from 'react';
import RouterLink from 'next/link';
import clsx from 'clsx';
import PerfectScrollbar from 'react-perfect-scrollbar';
import {
  Box,
  Card,
  IconButton,
  Link,
  SvgIcon,
  CardHeader,
  Divider,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TablePagination,
  TableRow,
  Tooltip,
  Typography,
  makeStyles,
} from '@material-ui/core';
import { FiEdit as EditIcon, FiArrowRight as ArrowRightIcon } from 'react-icons/fi';

import { Document } from 'src/contrats/types';

const sortOptions = [
  {
    value: 'reference|desc',
    label: 'Referência (Z-A)',
  },
  {
    value: 'reference|asc',
    label: 'Referência (A-Z)',
  },
  {
    value: 'owner|desc',
    label: 'Proprietario (Z-A)',
  },
  {
    value: 'owner|asc',
    label: 'Proprietario (A-Z)',
  },
];

function applyFilters(documents: any, query: any, filters: any) {
  return documents.filter((document: any) => {
    let matches = true;

    if (query) {
      const properties = ['reference', 'owner'];
      let containsQuery = false;

      properties.forEach(property => {
        if (document[property].toLowerCase().includes(query.toLowerCase())) {
          containsQuery = true;
        }
      });

      if (!containsQuery) {
        matches = false;
      }
    }

    Object.keys(filters).forEach(key => {
      const value = filters[key];

      if (value && !document[key] !== value) {
        matches = false;
      }
    });

    return matches;
  });
}

function applyPagination(documents: any, page: any, limit: any) {
  return documents.slice(page * limit, page * limit + limit);
}

function descendingComparator(a: any, b: any, orderBy: any) {
  if (b[orderBy] < a[orderBy]) {
    return -1;
  }

  if (b[orderBy] > a[orderBy]) {
    return 1;
  }

  return 0;
}

function getComparator(order: any, orderBy: any) {
  return order === 'desc'
    ? (a: any, b: any) => descendingComparator(a, b, orderBy)
    : (a: any, b: any) => -descendingComparator(a, b, orderBy);
}

function applySort(documents: any, sort: any) {
  const [orderBy, order] = sort.split('|');
  const comparator = getComparator(order, orderBy);
  const stabilizedThis = documents.map((el: any, index: number) => [el, index]);

  stabilizedThis.sort((a: any, b: any) => {
    const order = comparator(a[0], b[0]);

    if (order !== 0) return order;

    return a[1] - b[1];
  });

  return stabilizedThis.map((el: any) => el[0]);
}

const useStyles = makeStyles(theme => ({
  root: {},
  queryField: {
    width: 500,
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
  avatar: {
    height: 42,
    width: 42,
    marginRight: theme.spacing(1),
  },
}));

interface DocumentsTableProps {
  className?: string;
  documents: Document[];
}

const DocumentsTable: FC<DocumentsTableProps> = ({ className, documents, ...rest }) => {
  const classes = useStyles();
  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(5);
  const [query, setQuery] = useState('');
  const [sort, setSort] = useState(sortOptions[0].value);
  const [filters, setFilters] = useState({
    recovered: null,
    deleted: null,
  });

  const handlePageChange = (event: any, newPage: any) => {
    setPage(newPage);
  };

  const handleLimitChange = (event: any) => {
    setLimit(event.target.value);
  };

  const filteredDocuments = applyFilters(documents, query, filters);
  const sortedDocuments = applySort(filteredDocuments, sort);
  const paginatedDocuments = applyPagination(sortedDocuments, page, limit);

  return (
    <Card className={clsx(classes.root, className)} {...rest}>
      <CardHeader title="Documentos encontrados" />
      <Divider />
      <PerfectScrollbar>
        <Box minWidth={700}>
          {documents.length === 0 ? (
            <Box py={4}>
              <Typography align="center">Encontrador não encontrou nenhum documento</Typography>
            </Box>
          ) : (
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell>Referência</TableCell>
                  <TableCell>Tipo</TableCell>
                  <TableCell>Proprietário</TableCell>
                  <TableCell align="right">Acções</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {paginatedDocuments.map((document: Document) => {
                  if (document.type !== 'documents') return null;
                  return (
                    <TableRow hover key={document.id}>
                      <TableCell>
                        <RouterLink href={`/${document.id}`}>
                          <Link color="inherit" variant="h6" href={`/${document.id}`}>
                            {document.reference}
                          </Link>
                        </RouterLink>
                      </TableCell>
                      <TableCell>{document.type}</TableCell>
                      <TableCell>{document.owner}</TableCell>
                      <TableCell align="right">
                        <Tooltip title="Editar" aria-label="editar">
                          <RouterLink href={`/painel-de-controle/recursos/documentos/${document.id}/editar`}>
                            <IconButton>
                              <SvgIcon fontSize="small">
                                <EditIcon />
                              </SvgIcon>
                            </IconButton>
                          </RouterLink>
                        </Tooltip>
                        <Tooltip title="Ver detalhes" aria-label="ver detalhes">
                          <RouterLink href={`/painel-de-controle/recursos/documentos/${document.id}`}>
                            <IconButton>
                              <SvgIcon fontSize="small">
                                <ArrowRightIcon />
                              </SvgIcon>
                            </IconButton>
                          </RouterLink>
                        </Tooltip>
                      </TableCell>
                    </TableRow>
                  );
                })}
              </TableBody>
            </Table>
          )}
        </Box>
      </PerfectScrollbar>
      <TablePagination
        component="div"
        count={filteredDocuments.length}
        onChangePage={handlePageChange}
        onChangeRowsPerPage={handleLimitChange}
        backIconButtonText="Página anterior"
        nextIconButtonText="Próxima página"
        labelRowsPerPage="Documentos por página"
        page={page}
        rowsPerPage={limit}
        rowsPerPageOptions={[5, 10, 25]}
      />
    </Card>
  );
};

export default DocumentsTable;
