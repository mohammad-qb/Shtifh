import { Th, Tr } from '@chakra-ui/react';
import React from 'react';
import { Thead as ChakraThead } from '@chakra-ui/react';
import { TheadProps } from '../types/table.type';

const Thead = (props: TheadProps) => {
  return (
    <ChakraThead>
      <Tr>
        {props.columns.map((el) => (
          <Th key={Math.random()}>{el}</Th>
        ))}
      </Tr>
    </ChakraThead>
  );
};

export default Thead;
