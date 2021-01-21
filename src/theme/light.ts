import { colors } from '@material-ui/core';

import { THEMES } from 'src/constants';
import { softShadows } from './shadows';

const light = {
  name: THEMES.LIGHT,
  overrides: {
    MuiInputBase: {
      input: {
        '&::placeholder': {
          opacity: 1,
          color: colors.blueGrey[600],
        },
      },
    },
  },
  palette: {
    type: 'light',
    action: {
      active: colors.blueGrey[600],
    },
    background: {
      default: colors.common.white,
      dark: '#fbfbfd',
      paper: colors.common.white,
    },
    primary: {
      main: '#5f40b9',
    },
    secondary: {
      main: '#5f40b9',
    },
    text: {
      primary: colors.blueGrey[900],
      secondary: colors.blueGrey[600],
    },
  },
  shadows: softShadows,
};

export default light;
