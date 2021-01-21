export interface Settings {
  theme?: string;
}

export interface SettingsContextData {
  settings: Settings;
  saveSettings: (update: Settings) => void;
}

export interface SettingsProviderProps {
  settings?: Settings;
  children?: React.ReactNode;
}
