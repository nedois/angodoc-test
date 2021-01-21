import _ from 'lodash';
import { createMuiTheme, responsiveFontSizes } from '@material-ui/core';
import type { Theme as MuiTheme } from '@material-ui/core/styles/createMuiTheme';
import type { Shadows as MuiShadows } from '@material-ui/core/styles/shadows';
import type {
  Palette as MuiPalette,
  TypeBackground as MuiTypeBackground,
} from '@material-ui/core/styles/createPalette';

import typography from './typography';
import light from './light';
import dark from './dark';

interface TypeBackground extends MuiTypeBackground {
  dark: string;
}

interface Palette extends MuiPalette {
  background: TypeBackground;
}

export interface Theme extends MuiTheme {
  name: string;
  palette: Palette;
}

interface ThemeConfig {
  theme?: string;
}

interface ThemeOptions {
  name?: string;
  props?: Record<string, any>;
  typography?: Record<string, any>;
  overrides?: Record<string, any>;
  palette?: Record<string, any>;
  shadows?: MuiShadows;
  shape?: Record<string, any>;
}

const baseOptions: ThemeOptions = {
  typography,
  props: {
    MuiButton: {
      disableElevation: true,
    },
  },
  shape: {
    borderRadius: 8,
  },
  overrides: {
    MuiLinearProgress: {
      root: {
        borderRadius: 3,
        overflow: 'hidden',
      },
    },
    MuiListItemIcon: {
      root: {
        minWidth: 32,
      },
    },
    MuiChip: {
      root: {
        backgroundColor: 'rgba(0,0,0,0.075)',
      },
    },
    MuiButton: {
      root: {
        borderRadius: 5,
        textTransform: 'none',
      },
    },
  },
};

const themesOptions: ThemeOptions[] = [light, dark];

export const createTheme = (config: ThemeConfig = {}): Theme => {
  let themeOptions = themesOptions.find(theme => theme.name === config.theme);

  if (!themeOptions) {
    [themeOptions] = themesOptions;
  }

  let theme = createMuiTheme(_.merge({}, baseOptions, themeOptions));

  theme = responsiveFontSizes(theme);

  return theme as Theme;
};
