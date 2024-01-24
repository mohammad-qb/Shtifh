import { extendTheme } from '@chakra-ui/react';
import colorsTheme from './colors.theme';
import buttonTheme from './components/button.theme';

const override = {
  colors: colorsTheme,
  components: {
    Button: buttonTheme,
  },
  config: {
    initialColorMode: 'light',
    useSystemColorMode: false,
  },
};

export const theme = extendTheme(override);
