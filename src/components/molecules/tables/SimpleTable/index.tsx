/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { FC, ChangeEvent } from 'react';
import clsx from 'clsx';
import PerfectScrollbar from 'react-perfect-scrollbar';
import { Card, Typography, Table } from '@material-ui/core';

import Box from 'src/components/utilities/Box';
import useStyles from './styles';
import HeaderActions from './HeaderActions';
import TableHead, { HeadCell } from './TableHead';
import TableBody, { BodyRow } from './TableBody';

export interface SortOption {
  value: string;
  label: string;
}

interface SimpleTableProps {
  headCells: HeadCell[];
  bodyRows: BodyRow[];
  className?: string;
  title?: string;
  searcheable?: {
    placeholder: string;
    value: string;
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
  };
  sortable?: {
    options: SortOption[];
  };
  addResource?: {
    label: string;
    onClick: () => void;
  };
}

const SimpleTable: FC<SimpleTableProps> = ({
  className,
  title,
  searcheable,
  addResource,
  sortable,
  headCells,
  bodyRows,
  ...rest
}) => {
  const classes = useStyles();

  return (
    <Card className={clsx(classes.root, className)} {...rest}>
      <Box className={classes.cardHeader}>
        {title && (
          <Typography variant="h4" component="h4" className={classes.title}>
            {title}
          </Typography>
        )}

        <HeaderActions
          className={classes.actions}
          searcheable={searcheable}
          addResource={addResource}
          sortable={sortable}
        />
      </Box>

      <PerfectScrollbar>
        <Box minWidth={700}>
          <Table>
            <TableHead headCells={headCells} />
            <TableBody bodyRows={bodyRows} />
          </Table>
        </Box>
      </PerfectScrollbar>
    </Card>
  );
};

export default SimpleTable;
