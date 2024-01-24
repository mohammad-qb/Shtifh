import React from 'react';
import CustomersTable from './main/customers-table/CustomersTable';
import CustomersHeader from './header/CustomersHeader';
import { VStack } from '@chakra-ui/react';

const CustomersUI = () => {
  return (
    <VStack bg={'white'} align={'start'} p={5}>
      <CustomersHeader />
      <CustomersTable />
    </VStack>
  );
};

export default CustomersUI;
