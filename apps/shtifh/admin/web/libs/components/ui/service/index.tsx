import { VStack } from '@chakra-ui/react';
import React from 'react';
import ServicesHeader from './header/ServicesHeader';
import ServicesTable from './main/service-table/ServicesTable';

const ServicesUI = () => {
  return (
    <VStack bg={'white'} align={'start'} p={5}>
      <ServicesHeader />
      <ServicesTable />
    </VStack>
  );
};

export default ServicesUI;
