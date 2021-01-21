import React from 'react';
import RouterLink from 'next/link';
import { VscHome as HomeIcon } from 'react-icons/vsc';
import { FaChevronRight as BreadcrumbIcon } from 'react-icons/fa';
import { Breadcrumbs, Typography, IconButton, Link } from '@material-ui/core';

export type BreadcrumbItem = {
  href?: string;
  label: string;
};

interface BreadcrumbProps {
  items: BreadcrumbItem[];
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

const Breadcrumb: React.FC<BreadcrumbProps> = ({ items, ...rest }) => {
  return (
    <Breadcrumbs {...rest} separator={<BreadcrumbIcon fontSize="small" />} maxItems={5}>
      <RouterLink href="/">
        <IconButton component="a" style={{ padding: 0 }}>
          <HomeIcon />
        </IconButton>
      </RouterLink>
      {items.map((item, key) => {
        if (item.href) {
          return (
            <RouterLink key={key} href={item.href}>
              <Link color="textPrimary" component="a" href={item.href}>
                {item.label}
              </Link>
            </RouterLink>
          );
        }
        return (
          <Typography key={key} color="textPrimary" component="span">
            {item.label}
          </Typography>
        );
      })}
    </Breadcrumbs>
  );
};

export default Breadcrumb;
