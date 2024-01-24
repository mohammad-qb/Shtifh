import React from 'react'
import { Table as ChakraTable, TableCaption } from '@chakra-ui/react';
import Thead from './head/Thead';
import { TableProps } from './types/table.type';

const Table = (props: TableProps) => {
  return (
      <ChakraTable bg="white" p={5} variant='striped' colorScheme='teal'>
          {props.caption && <TableCaption>{props.caption}</TableCaption>}
          <Thead columns={props.columns} />
      </ChakraTable>
  )
}

export default Table
