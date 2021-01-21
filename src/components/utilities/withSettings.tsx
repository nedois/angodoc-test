import React from 'react';

import { SettingsProvider } from 'src/contexts/SettingsContext';

const withSettings = (WrappedComponent: any) => {
  const newComponent = ({ ...props }) => {
    return (
      <SettingsProvider>
        <WrappedComponent {...props} />
      </SettingsProvider>
    );
  };

  return newComponent;
};

export default withSettings;
