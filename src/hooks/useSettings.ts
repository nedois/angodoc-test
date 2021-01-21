import { useContext } from 'react';
import { SettingsContext } from 'src/contexts/SettingsContext';
import { SettingsContextData } from 'src/contexts/SettingsContext/interfaces';

function useSettings(): SettingsContextData {
  const context = useContext(SettingsContext);

  if (!context) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }

  return context;
}

export default useSettings;
