import { Stack } from '@chakra-ui/react';
import React from 'react';
import SearchField from '../../../shared/inputs/SearchField';

const SearchCustomersForm = () => {
  return (
    <Stack>
      <SearchField
        placeholder="ابحث"
        getValue={(value) => console.log(value)}
      />
    </Stack>
  );
};

export default SearchCustomersForm;
