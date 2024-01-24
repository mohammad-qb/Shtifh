import { HStack } from '@chakra-ui/react'
import React from 'react'
import SearchField from '../../../shared/inputs/SearchField'
import { Button } from '../../../shared/buttons/Button'

const EmployeesHeader = () => {
  return (
    <HStack justify={'space-between'} w={'full'}>
      <SearchField
        placeholder="ابحث"
        getValue={(value) => console.log(value)}
      />
      <Button value="اضف موظف" />
    </HStack>
  )
}

export default EmployeesHeader
