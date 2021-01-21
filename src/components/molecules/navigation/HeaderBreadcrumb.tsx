import React, { FC } from 'react';
import RouterLink from 'next/link';
import { Breadcrumbs, Link, Typography } from '@material-ui/core';
import { MdNavigateNext as NavigateNextIcon } from 'react-icons/md';

interface HeaderBreadcrumbProps {
  items: HeaderBreadcrumbItem[];
}

const HeaderBreadcrumb: FC<HeaderBreadcrumbProps> = ({ items }) => {
  return (
    <Breadcrumbs separator={<NavigateNextIcon fontSize="small" />} aria-label="breadcrumb">
      {items.map((item, key) => {
        if (item.to) {
          return (
            <RouterLink href={item.to}>
              <Link key={key} variant="body1" color="inherit" href={item.to}>
                {item.label}
              </Link>
            </RouterLink>
          );
        }
        return (
          <Typography key={key} variant="body1" color={item.active ? 'textPrimary' : 'inherit'}>
            {item.label}
          </Typography>
        );
      })}
    </Breadcrumbs>
  );
};

export interface HeaderBreadcrumbItem {
  to?: string;
  label: string;
  active?: boolean;
}

export default HeaderBreadcrumb;
