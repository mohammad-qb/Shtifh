import { ComponentStyleConfig } from '@chakra-ui/react';

const buttonTheme: ComponentStyleConfig = {
  baseStyle: {
    color: 'white',
    py: 3,
    px: 16,
  },
  variants: {
    primary: {
      bg: 'primary',
      _hover: {
        bg: 'primary',
        opacity: 0.3,
      },
    },
  },
};

export default buttonTheme;
