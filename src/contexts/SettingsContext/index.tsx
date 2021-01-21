import React, { createContext, useEffect, useState } from 'react';
import _ from 'lodash';
import Cookies from 'js-cookie';

import { APP_KEYS, THEMES } from 'src/constants';
import { Settings, SettingsContextData, SettingsProviderProps } from './interfaces';

const defaultSettings: Settings = {
  theme: THEMES.LIGHT,
};

export const restoreSettings = (): Settings | null => {
  let settings = null;

  try {
    const storedData: string | null = Cookies.get(APP_KEYS.SETTINGS) || null;

    if (storedData) settings = JSON.parse(storedData);
  } catch (err) {
    console.error(err);
  }

  return settings;
};

export const storeSettings = (settings: Settings): void => {
  Cookies.set(APP_KEYS.SETTINGS, JSON.stringify(settings));
};

export const SettingsContext = createContext<SettingsContextData>({
  settings: defaultSettings,
  saveSettings: () => { }, // eslint-disable-line @typescript-eslint/no-empty-function
});

export const SettingsProvider: React.FC<SettingsProviderProps> = ({ settings, children }) => {
  const [currentSettings, setCurrentSettings] = useState<Settings>(settings || defaultSettings);

  const handleSaveSettings = (update: Settings = {}): void => {
    const mergedSettings = _.merge({}, currentSettings, update);

    setCurrentSettings(mergedSettings);
    storeSettings(mergedSettings);
  };

  useEffect(() => {
    const restoredSettings = restoreSettings();

    if (restoredSettings) {
      setCurrentSettings(restoredSettings);
    }
  }, []);

  return (
    <SettingsContext.Provider
      value={{
        settings: currentSettings,
        saveSettings: handleSaveSettings,
      }}
    >
      {children}
    </SettingsContext.Provider>
  );
};

export const SettingsConsumer = SettingsContext.Consumer;
