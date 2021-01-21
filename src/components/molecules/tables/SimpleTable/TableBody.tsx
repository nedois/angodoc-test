/* eslint-disable @typescript-eslint/no-explicit-any */
import React, { FC, ReactNode } from 'react';
import { TableRow, TableCell, TableBody as MuiTableBody, Checkbox } from '@material-ui/core';

export interface BodyCell {
  disablePadding?: boolean;
  align?: 'inherit' | 'left' | 'center' | 'right' | 'justify';
  child: ReactNode;
}

export interface BodyRow {
  id: any;
  onClick?: () => void;
  cells: BodyCell[];
}

interface TableBodyProps {
  bodyRows: BodyRow[];
  className?: string;
  selectable?: any;
}

const TableBody: FC<TableBodyProps> = ({ className, selectable, bodyRows, ...rest }) => {
  return (
    <MuiTableBody className={className} {...rest}>
      {bodyRows.map(bodyRow => (
        <TableRow hover key={bodyRow.id} onClick={bodyRow.onClick}>
          {selectable && (
            <TableCell padding="checkbox">
              <Checkbox checked={false} />
            </TableCell>
          )}

          {bodyRow.cells.map((cell, key) => (
            <TableCell key={key} align={cell.align} padding={cell.disablePadding ? 'none' : 'default'}>
              {cell.child}
            </TableCell>
          ))}
        </TableRow>
      ))}
    </MuiTableBody>
  );
};

export default TableBody;
