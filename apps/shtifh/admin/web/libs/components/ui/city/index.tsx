import { VStack } from '@chakra-ui/react';
import React from 'react';
import CitiesHeader from './header/CityHeader';
import CitiesTable from './main/city-table/CitiesTable';

const CitiesUI = () => {
  return (
    <VStack bg={'white'} align={'start'} p={5}>
      <CitiesHeader />
      <CitiesTable />
    </VStack>
  );
};

export default CitiesUI;
