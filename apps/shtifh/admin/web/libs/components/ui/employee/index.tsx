import { VStack } from '@chakra-ui/react';
import React from 'react';
import EmployeesHeader from './header/EmployeesHeader';
import EmployeesTable from './main/employee-table/EmployeesTable';

const EmployeesUI = () => {
  return (
    <VStack bg={'white'} align={'start'} p={5}>
      <EmployeesHeader />
      <EmployeesTable />
    </VStack>
  );
};

export default EmployeesUI;
