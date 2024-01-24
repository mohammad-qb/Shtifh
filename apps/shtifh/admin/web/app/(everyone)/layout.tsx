'use client';

import { ChakraProvider } from '@chakra-ui/react';
import { ReactNode } from 'react';
import { theme } from '@shtifh/theme-lib';
import DashboardLayout from './dashboard-layout';
import { ModalProvider } from '../../libs/utils/context/modal';

const RootLayout = ({ children }: { children: ReactNode }) => {
  return (
    <html lang="ar" dir='rtl'>
      <body>
        <ChakraProvider theme={theme}>
          <ModalProvider>
            <DashboardLayout>{children}</DashboardLayout>
          </ModalProvider>
        </ChakraProvider>
      </body>
    </html>
  );
};

export default RootLayout;
