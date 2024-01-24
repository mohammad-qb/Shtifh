import { FormControl, Input } from '@chakra-ui/react';
import React, { ChangeEvent } from 'react';
import { SearchFieldProps } from './types/inputs.type';

const SearchField = (props: SearchFieldProps) => {
  return (
    <FormControl>
      <Input
        // width={width}
        variant={'filled'}
        name="name"
        type="search"
        placeholder={props.placeholder}
        onChange={(e: ChangeEvent<HTMLInputElement>) =>
          props.getValue(e.target.value)
        }
      />
    </FormControl>
  );
};

export default SearchField;
