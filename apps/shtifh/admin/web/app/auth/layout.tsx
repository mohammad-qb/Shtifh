'use client';

import { ChakraProvider } from '@chakra-ui/react';
import { ReactNode } from 'react';
import { theme } from '@shtifh/theme-lib';

const RootAuthLayout = ({ children }: { children: ReactNode }) => {
  return (
    <html lang="ar" dir='rtl'>
      <body>
        <ChakraProvider theme={theme}>{children}</ChakraProvider>
      </body>
    </html>
  );
};

export default RootAuthLayout;
