import React, { FC, ReactNode } from 'react';
import { useRouter } from 'next/router';
import { List, ListSubheader } from '@material-ui/core';

import { matchPath } from 'src/utils';
import useAuth from 'src/hooks/useAuth';
import SideNavItem from 'src/components/molecules/lists/SideNavItem';
import Box from 'src/components/utilities/Box';

interface Item {
  href?: string;
  icon?: ReactNode;
  info?: ReactNode;
  items?: Item[];
  title: string;
  permission?: string;
}

export interface Section {
  items: Item[];
  subheader: string;
  permission?: string;
}

interface VerticalNavigationPanelProps {
  className?: string;
  sections: Section[];
}

const VerticalNavigationPanel: FC<VerticalNavigationPanelProps> = ({ className, sections, ...rest }) => {
  const router = useRouter();
  const { can } = useAuth();

  const renderNavItems = (items: Item[]) => {
    return (
      <List disablePadding>
        {items.map((item, key) => {
          if (!can(item.permission)) return null;

          if (item.items) {
            const open = matchPath(router.pathname, item.href);

            return (
              <SideNavItem icon={item.icon} info={item.info} key={key} open={Boolean(open)} title={item.title}>
                {renderNavItems(item.items)}
              </SideNavItem>
            );
          }

          return <SideNavItem href={item.href} icon={item.icon} info={item.info} key={key} title={item.title} />;
        })}
      </List>
    );
  };

  return (
    <Box className={className} {...rest}>
      {sections.map(section => (
        <List
          key={section.subheader}
          // eslint-disable-next-line prettier/prettier
          subheader={(
            <ListSubheader disableGutters disableSticky>
              {section.subheader}
            </ListSubheader>
            // eslint-disable-next-line prettier/prettier
          )}
        >
          {renderNavItems(section.items)}
        </List>
      ))}
    </Box>
  );
};

export default VerticalNavigationPanel;
