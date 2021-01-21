export const APP_KEYS = {
  COOKIE_CONSENT: 'consent',
  SETTINGS: 'settings',
  SETTINGS_UPDATED: 'settings:updated',
  USER: 'user',
  ACCESS_TOKEN: 'user:token',
  EDITOR_DARK: 'editor:dark',
  EDITOR_SAVED: 'editor:saved',
};

export const THEMES = {
  LIGHT: 'LIGHT',
  DARK: 'DARK',
};

export const PROVINCES = [
  { key: 'Bengo', prepo: 'do' },
  { key: 'Benguela', prepo: 'de' },
  { key: 'Bié', prepo: 'do' },
  { key: 'Cabinda', prepo: 'de' },
  { key: 'Cuando Cubango', prepo: 'do' },
  { key: 'Cuanza Norte', prepo: 'do' },
  { key: 'Cuanza Sul', prepo: 'do' },
  { key: 'Cunene', prepo: 'do' },
  { key: 'Huambo', prepo: 'do' },
  { key: 'Huíla', prepo: 'da' },
  { key: 'Luanda', prepo: 'de' },
  { key: 'Lunda Norte', prepo: 'da' },
  { key: 'Lunda Sul', prepo: 'da' },
  { key: 'Malanje', prepo: 'de' },
  { key: 'Moxico', prepo: 'do' },
  { key: 'Namibe', prepo: 'de' },
  { key: 'Uíge', prepo: 'do' },
  { key: 'Zaire', prepo: 'do' },
];

export const PERMISSIONS = {
  MANAGE_USERS: 'users-manage',
  DASHBOARD_VIEW: 'dashboard-view',
  MANAGE_PLATFORM: 'platform-manage',

  LIST_ROLES: 'roles-index',
  CREATE_ROLES: 'roles-create',
  UPDATE_ROLES: 'roles-update',
  DELETE_ROLES: 'roles-delete',

  INDEX_AGENCIES: 'agencies-index',
  CREATE_AGENCIES: 'agencies-create',
  UPDATE_AGENCIES: 'agencies-update',
  DELETE_AGENCIES: 'agencies-delete',

  CREATE_DOCUMENTS: 'documents-create',
  UPDATE_DOCUMENTS: 'documents-update',
  DELETE_DOCUMENTS: 'documents-delete',

  CREATE_FINDERS: 'finders-create',
  UPDATE_FINDERS: 'finders-update',
  DELETE_FINDERS: 'finders-delete',

  CREATE_POSTS: 'posts-create',
  UPDATE_POSTS: 'posts-update',
  DELETE_POSTS: 'posts-delete',
};
