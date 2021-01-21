import React, { FC } from 'react';
import PerfectScrollbar from 'react-perfect-scrollbar';

import Box from 'src/components/utilities/Box';
import VerticalNavigationPanel from 'src/components/molecules/panels/VerticalNavigationPanel';
import sections from './sections';

const AdminNavigationPanel: FC = () => {
  return (
    <Box height="100%" display="flex" flexDirection="column">
      <PerfectScrollbar options={{ suppressScrollX: true }}>
        <Box p={2}>
          <VerticalNavigationPanel sections={sections} />
        </Box>
      </PerfectScrollbar>
    </Box>
  );
};

export default AdminNavigationPanel;
