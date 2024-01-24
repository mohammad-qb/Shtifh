import React from 'react';
import SearchField from '../../../shared/inputs/SearchField';
import { Button } from '../../../shared/buttons/Button';
import { HStack } from '@chakra-ui/react';

const SearchCitiesForm = () => {
  return (
    <HStack justify={'space-between'} w={'full'}>
      <SearchField
        placeholder="ابحث"
        getValue={(value) => console.log(value)}
      />
      <Button value="اضف مدينة" />
    </HStack>
  );
};

export default SearchCitiesForm;
