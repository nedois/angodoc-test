/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { FC, ReactNode } from 'react';
import { TableRow, TableCell, TableHead as MuiTableHead, Checkbox } from '@material-ui/core';

export interface HeadCell {
  disablePadding?: boolean;
  id: any;
  align?: 'inherit' | 'left' | 'center' | 'right' | 'justify';
  child: ReactNode;
}

interface TableHeadProps {
  headCells: HeadCell[];
  className?: string;
  selectable?: {
    rowCount: number;
    numSelected: number;
    onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  };
}

const TableHead: FC<TableHeadProps> = ({ className, selectable, headCells, ...rest }) => {
  return (
    <MuiTableHead className={className} {...rest}>
      <TableRow>
        {selectable && (
          <TableCell padding="checkbox">
            <Checkbox
              indeterminate={selectable.numSelected > 0 && selectable.numSelected < selectable.rowCount}
              checked={selectable.rowCount > 0 && selectable.numSelected === selectable.rowCount}
              onChange={selectable.onSelectAllClick}
            />
          </TableCell>
        )}

        {headCells.map(headCell => (
          <TableCell key={headCell.id} align={headCell.align} padding={headCell.disablePadding ? 'none' : 'default'}>
            {headCell.child}
          </TableCell>
        ))}
      </TableRow>
    </MuiTableHead>
  );
};

export default TableHead;
